import { leadSchema, type LeadInput } from '../src/lib/schemas/lead';
import {
  buildClientAutoReplyEmail,
  buildInternalNotificationEmail,
  sendEmailViaFetch,
} from './resend';
import { verifyTurnstileToken } from './turnstile';
import type { WorkerEnv } from './types';

const FALLBACK_DIRECT = {
  phone: '+91 7678083589',
  phoneDisplay: '+91 7678083589',
  whatsappUrl: 'https://wa.me/917678083589',
  email: 'connect@10peakstudios.com',
};

const FALLBACK_MESSAGE_SUFFIX =
  'Please reach us directly via Call: +91 7678083589, WhatsApp: https://wa.me/917678083589, or Email: connect@10peakstudios.com.';

async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(buffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function jsonResponse(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      ...headers,
    },
  });
}

export async function handleContactRequest(request: Request, env: WorkerEnv): Promise<Response> {
  const origin = request.headers.get('origin') || '';
  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': origin || '*',
  };

  const isProduction =
    env.ENVIRONMENT === 'production' ||
    (Boolean(request.headers.get('cf-ray')) &&
      !origin.startsWith('http://localhost:') &&
      !origin.startsWith('http://127.0.0.1:'));

  // 1. Method check
  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'Method Not Allowed' }, 405, corsHeaders);
  }

  // 2. Content type check
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return jsonResponse({ ok: false, error: 'Unsupported Media Type' }, 415, corsHeaders);
  }

  // 3. Size check (<= 16 KB)
  const contentLength = Number(request.headers.get('content-length') || '0');
  if (contentLength > 16384) {
    return jsonResponse({ ok: false, error: 'Payload Too Large' }, 413, corsHeaders);
  }

  // 4. Origin validation
  const allowedOrigins = (env.ALLOWED_ORIGINS || 'https://10peakstudios.com')
    .split(',')
    .map((o) => o.trim());
  const isAllowedOrigin =
    allowedOrigins.includes(origin) ||
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:');

  if (origin && !isAllowedOrigin) {
    return jsonResponse({ ok: false, error: 'Forbidden Origin' }, 403, corsHeaders);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'Invalid JSON body' }, 400, corsHeaders);
  }

  // 5. Parse schema
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return jsonResponse({ ok: false, error: 'validation', fields: fieldErrors }, 400, corsHeaders);
  }

  const lead: LeadInput = parsed.data;

  // 6. Anti-spam checks
  // Honeypot check
  if (lead.website && lead.website.length > 0) {
    return jsonResponse({ ok: false, error: 'verification_failed' }, 403, corsHeaders);
  }

  // Minimum submission time (3 seconds)
  const elapsedMs = Date.now() - lead.startedAt;
  if (elapsedMs < 3000) {
    return jsonResponse({ ok: false, error: 'verification_failed' }, 403, corsHeaders);
  }

  // 7. Turnstile verification (fail-closed in production)
  const clientIp = request.headers.get('cf-connecting-ip') || '127.0.0.1';
  const turnstileSecret =
    env.TURNSTILE_SECRET_KEY || (isProduction ? '' : '1x0000000000000000000000000000000AA');

  if (isProduction) {
    if (!turnstileSecret) {
      console.error('TURNSTILE_SECRET_KEY is missing in production environment.');
      return jsonResponse(
        {
          ok: false,
          error: 'service_unavailable',
          message: `Security verification service is misconfigured. ${FALLBACK_MESSAGE_SUFFIX}`,
          fallback: FALLBACK_DIRECT,
        },
        503,
        corsHeaders,
      );
    }

    const isTestSecret =
      turnstileSecret.startsWith('1x00000000000000000000') ||
      turnstileSecret.startsWith('2x00000000000000000000') ||
      turnstileSecret.startsWith('3x00000000000000000000');

    const isTestToken =
      lead.turnstileToken.startsWith('1x00000000000000000000') ||
      lead.turnstileToken.startsWith('2x00000000000000000000') ||
      lead.turnstileToken.startsWith('3x00000000000000000000') ||
      lead.turnstileToken.startsWith('XXXX.') ||
      lead.turnstileToken === 'test-token';

    if (isTestSecret || isTestToken) {
      return jsonResponse(
        {
          ok: false,
          error: 'test_credentials_rejected',
          message: `Test security verification credentials are not accepted in production. ${FALLBACK_MESSAGE_SUFFIX}`,
          fallback: FALLBACK_DIRECT,
        },
        403,
        corsHeaders,
      );
    }
  }

  const turnstileResult = await verifyTurnstileToken({
    secretKey: turnstileSecret,
    token: lead.turnstileToken,
    remoteIp: clientIp,
    expectedHostname: env.TURNSTILE_EXPECTED_HOSTNAME,
  });

  if (!turnstileResult.valid) {
    return jsonResponse(
      { ok: false, error: 'turnstile_failed', details: turnstileResult.error },
      403,
      corsHeaders,
    );
  }

  // 8. IP Hashing & Rate limiting
  const salt = env.IP_HASH_SALT || 'development_salt_key_default_32_characters';
  const ipHash = await sha256(`${clientIp}:${salt}`);

  if (env.LEADS_DB) {
    try {
      const oneHourAgo = new Date(Date.now() - 3600 * 1000).toISOString();
      const countResult = await env.LEADS_DB.prepare(
        'SELECT COUNT(*) as cnt FROM leads WHERE ip_hash = ? AND created_at > ?',
      )
        .bind(ipHash, oneHourAgo)
        .first<{ cnt: number }>();

      if (countResult && countResult.cnt >= 5) {
        return jsonResponse(
          {
            ok: false,
            error: 'rate_limited',
            message: `Too many requests. Please try again later. ${FALLBACK_MESSAGE_SUFFIX}`,
            fallback: FALLBACK_DIRECT,
          },
          429,
          corsHeaders,
        );
      }
    } catch (err) {
      console.error('Rate limit query warning:', err);
    }
  }

  // 9. Store lead in D1
  const leadId = crypto.randomUUID();
  const nowIso = new Date().toISOString();
  const istTimeStr = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  if (env.LEADS_DB) {
    try {
      await env.LEADS_DB.prepare(
        `INSERT INTO leads (
          id, created_at, name, email, company, phone, preferred_contact,
          services, budget_band, timeline, message, utm, consent_version, ip_hash, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          leadId,
          nowIso,
          lead.name,
          lead.email,
          null, // company
          lead.phone || null,
          'email',
          JSON.stringify(lead.services),
          lead.budgetBand || null,
          lead.timeline || null,
          lead.message,
          JSON.stringify({
            source: lead.utmSource || null,
            medium: lead.utmMedium || null,
            campaign: lead.utmCampaign || null,
          }),
          'v1',
          ipHash,
          'received',
        )
        .run();
    } catch (err) {
      console.error('D1 lead insertion failure:', err);
      return jsonResponse(
        { ok: false, error: 'storage_failed', message: 'Could not record enquiry.' },
        500,
        corsHeaders,
      );
    }
  }

  // 10. Email dispatch (fail-closed in production if RESEND_API_KEY is missing)
  const resendKey = env.RESEND_API_KEY;

  if (isProduction && !resendKey) {
    console.error('RESEND_API_KEY is missing in production environment.');
    return jsonResponse(
      {
        ok: false,
        error: 'service_unavailable',
        message: `Enquiry notification service is currently offline. ${FALLBACK_MESSAGE_SUFFIX}`,
        fallback: FALLBACK_DIRECT,
      },
      503,
      corsHeaders,
    );
  }

  let emailDispatched = false;

  if (resendKey) {
    const notifyTo = env.LEAD_NOTIFY_TO || 'connect@10peakstudios.com';
    const fromAddress = env.LEAD_FROM || '10PeakStudio <connect@10peakstudios.com>';

    // Internal notification
    const internalEmail = buildInternalNotificationEmail(lead, leadId, istTimeStr);
    const notifyRes = await sendEmailViaFetch({
      apiKey: resendKey,
      from: fromAddress,
      to: notifyTo,
      replyTo: lead.email,
      subject: `[New Lead] ${lead.name} – ${lead.services.join(', ')}`,
      html: internalEmail.html,
      text: internalEmail.text,
      idempotencyKey: `lead-internal-${leadId}`,
    });

    if (notifyRes.ok) {
      emailDispatched = true;
    } else {
      console.error('Resend internal notification error:', notifyRes.error);
      if (isProduction) {
        return jsonResponse(
          {
            ok: false,
            error: 'email_delivery_failed',
            message: `We could not deliver your enquiry to our studio team. ${FALLBACK_MESSAGE_SUFFIX}`,
            fallback: FALLBACK_DIRECT,
          },
          502,
          corsHeaders,
        );
      }
    }

    // Client auto-reply (optional flag)
    if (env.AUTO_REPLY_ENABLED === 'true') {
      const clientEmail = buildClientAutoReplyEmail(lead);
      const autoReplyRes = await sendEmailViaFetch({
        apiKey: resendKey,
        from: fromAddress,
        to: lead.email,
        subject: 'We received your project enquiry – 10PeakStudio',
        html: clientEmail.html,
        text: clientEmail.text,
        idempotencyKey: `lead-autoreply-${leadId}`,
      });

      if (!autoReplyRes.ok) {
        console.error('Resend auto-reply error:', autoReplyRes.error);
      }
    }

    // Update D1 status
    if (env.LEADS_DB) {
      const newStatus = emailDispatched ? 'notified' : 'email_failed';
      try {
        await env.LEADS_DB.prepare('UPDATE leads SET status = ? WHERE id = ?')
          .bind(newStatus, leadId)
          .run();
      } catch (err) {
        console.error('Failed to update lead status in D1:', err);
      }
    }
  }

  return jsonResponse({ ok: true, leadId }, 200, corsHeaders);
}
