import type { LeadInput } from '../src/lib/schemas/lead';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendEmailViaFetch(opts: {
  apiKey: string;
  from: string;
  to: string | string[];
  replyTo?: string | undefined;
  subject: string;
  html: string;
  text: string;
  idempotencyKey?: string | undefined;
}): Promise<{ ok: boolean; id?: string | undefined; error?: string | undefined }> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${opts.apiKey}`,
    'User-Agent': '10PeakStudio-Web/1.0',
  };
  if (opts.idempotencyKey) {
    headers['Idempotency-Key'] = opts.idempotencyKey;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        from: opts.from,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        reply_to: opts.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      return { ok: false, error: `Resend error (${res.status}): ${errBody}` };
    }

    const data = (await res.json()) as { id: string };
    return { ok: true, id: data.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown network failure';
    return { ok: false, error: msg };
  }
}

export function buildInternalNotificationEmail(lead: LeadInput, leadId: string, istTime: string) {
  const safeName = escapeHtml(lead.name);
  const safeEmail = escapeHtml(lead.email);
  const safePhone = lead.phone ? escapeHtml(lead.phone) : 'Not provided';
  const safeServices = escapeHtml(lead.services.join(', '));
  const safeBudget = lead.budgetBand ? escapeHtml(lead.budgetBand) : 'Not specified';
  const safeTimeline = lead.timeline ? escapeHtml(lead.timeline) : 'Not specified';
  const safeMessage = escapeHtml(lead.message).replace(/\n/g, '<br/>');

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><title>New Lead: ${safeName}</title></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#F6F5FA;color:#14111E;">
  <div style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #D7D6E1;border-radius:12px;overflow:hidden;padding:32px;">
    <div style="border-bottom:2px solid #8E21FC;padding-bottom:16px;margin-bottom:24px;">
      <h2 style="margin:0;color:#14111E;font-size:20px;">New Project Enquiry</h2>
      <p style="margin:4px 0 0 0;color:#5E5A70;font-size:14px;">Received at ${istTime} IST | ID: ${leadId}</p>
    </div>
    
    <table style="width:100%;border-collapse:collapse;font-size:15px;margin-bottom:24px;">
      <tr><td style="padding:8px 0;color:#5E5A70;width:140px;"><strong>Client Name:</strong></td><td style="padding:8px 0;">${safeName}</td></tr>
      <tr><td style="padding:8px 0;color:#5E5A70;"><strong>Work Email:</strong></td><td style="padding:8px 0;"><a href="mailto:${safeEmail}" style="color:#8E21FC;">${safeEmail}</a></td></tr>
      <tr><td style="padding:8px 0;color:#5E5A70;"><strong>Phone/WhatsApp:</strong></td><td style="padding:8px 0;">${safePhone}</td></tr>
      <tr><td style="padding:8px 0;color:#5E5A70;"><strong>Services of Interest:</strong></td><td style="padding:8px 0;color:#8E21FC;"><strong>${safeServices}</strong></td></tr>
      <tr><td style="padding:8px 0;color:#5E5A70;"><strong>Budget Band:</strong></td><td style="padding:8px 0;">${safeBudget}</td></tr>
      <tr><td style="padding:8px 0;color:#5E5A70;"><strong>Estimated Timeline:</strong></td><td style="padding:8px 0;">${safeTimeline}</td></tr>
    </table>

    <div style="background:#F6F5FA;border-left:4px solid #8E21FC;border-radius:4px;padding:16px;margin-bottom:24px;">
      <h4 style="margin:0 0 8px 0;color:#14111E;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;">Project Requirements:</h4>
      <p style="margin:0;line-height:1.6;color:#14111E;font-size:15px;">${safeMessage}</p>
    </div>

    <div style="font-size:12px;color:#8D8CA4;border-top:1px solid #D7D6E1;padding-top:16px;">
      Attribution: Source: ${escapeHtml(lead.utmSource || 'direct')} | Campaign: ${escapeHtml(lead.utmCampaign || 'none')}
    </div>
  </div>
</body>
</html>`;

  const text = `NEW PROJECT ENQUIRY (ID: ${leadId})
Time: ${istTime} IST

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || 'Not provided'}
Services: ${lead.services.join(', ')}
Budget: ${lead.budgetBand || 'Not specified'}
Timeline: ${lead.timeline || 'Not specified'}

Message:
${lead.message}

Attribution: Source: ${lead.utmSource || 'direct'} | Campaign: ${lead.utmCampaign || 'none'}
`;

  return { html, text };
}

export function buildClientAutoReplyEmail(lead: LeadInput) {
  const firstName = escapeHtml(lead.name.split(' ')[0] || lead.name);

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><title>Thank you for reaching out to 10PeakStudio</title></head>
<body style="margin:0;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#F6F5FA;color:#14111E;">
  <div style="max-width:580px;margin:0 auto;background:#FFFFFF;border:1px solid #D7D6E1;border-radius:12px;overflow:hidden;padding:36px;">
    <div style="margin-bottom:28px;">
      <h1 style="margin:0 0 8px 0;color:#14111E;font-size:22px;font-weight:700;">10PeakStudio</h1>
      <p style="margin:0;color:#8E21FC;font-size:14px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">Build. Automate. Grow.</p>
    </div>

    <p style="font-size:16px;line-height:1.6;color:#14111E;margin:0 0 16px 0;">Hi ${firstName},</p>
    
    <p style="font-size:15px;line-height:1.6;color:#5E5A70;margin:0 0 20px 0;">
      Thank you for connecting with 10PeakStudio. We have received your project details and our lead engineering team has begun reviewing your requirements.
    </p>

    <div style="background:#F6F5FA;border-radius:8px;padding:20px;margin-bottom:24px;">
      <h3 style="margin:0 0 12px 0;color:#14111E;font-size:15px;">What Happens Next:</h3>
      <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.7;color:#5E5A70;">
        <li><strong style="color:#14111E;">Technical Review:</strong> We examine your architecture and scope during active studio hours.</li>
        <li><strong style="color:#14111E;">Discovery Call:</strong> We reach out via email or WhatsApp to schedule a focused 30-minute consultation.</li>
        <li><strong style="color:#14111E;">Milestone Proposal:</strong> You receive a transparent proposal with fixed deliverables and timelines.</li>
      </ol>
    </div>

    <p style="font-size:14px;line-height:1.6;color:#5E5A70;margin:0 0 24px 0;">
      Our studio operates <strong>Monday to Saturday, 7:00 AM – 9:00 PM IST</strong>. If your requirement is urgent, you can also message our team directly on WhatsApp at <a href="https://wa.me/917678083589" style="color:#8E21FC;text-decoration:none;font-weight:600;">+91 7678083589</a>.
    </p>

    <div style="border-top:1px solid #D7D6E1;padding-top:20px;margin-top:24px;font-size:13px;color:#8D8CA4;">
      <p style="margin:0 0 4px 0;font-weight:600;color:#14111E;">10PeakStudio</p>
      <p style="margin:0;">Navi Mumbai, Maharashtra, India &bull; <a href="https://10peakstudios.com" style="color:#8E21FC;text-decoration:none;">10peakstudios.com</a></p>
    </div>
  </div>
</body>
</html>`;

  const text = `Hi ${lead.name.split(' ')[0] || lead.name},

Thank you for connecting with 10PeakStudio. We have received your project enquiry and our engineering leadership has begun reviewing your requirements.

WHAT HAPPENS NEXT:
1. Technical Review: We examine your scope and requirements during active studio hours.
2. Discovery Call: We will reach out to schedule a focused 30-minute consultation.
3. Milestone Proposal: You will receive a transparent architecture plan with fixed deliverables.

Our studio operates Monday to Saturday, 7:00 AM – 9:00 PM IST. If your requirement is urgent, message us on WhatsApp at +91 7678083589.

Best regards,
The 10PeakStudio Team
Navi Mumbai, India | https://10peakstudios.com
`;

  return { html, text };
}
