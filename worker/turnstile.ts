export interface TurnstileVerifyResult {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Server-side Turnstile token verification (Architecture.md §6.1, Rules.md RUL-SEC-04).
 * Calls the Cloudflare Turnstile siteverify endpoint.
 */
export async function verifyTurnstileToken(opts: {
  secretKey: string;
  token: string;
  remoteIp?: string | undefined;
  idempotencyKey?: string | undefined;
  expectedHostname?: string | undefined;
}): Promise<{ valid: boolean; error?: string | undefined }> {
  const { secretKey, token, remoteIp, idempotencyKey, expectedHostname } = opts;

  // Always pass for dev test secret key
  if (secretKey === '1x0000000000000000000000000000000AA') {
    return { valid: true };
  }

  const formData = new FormData();
  formData.append('secret', secretKey);
  formData.append('response', token);
  if (remoteIp) {
    formData.append('remoteip', remoteIp);
  }
  if (idempotencyKey) {
    formData.append('idempotency_key', idempotencyKey);
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      return { valid: false, error: `Turnstile HTTP ${res.status}` };
    }

    const outcome = (await res.json()) as TurnstileVerifyResult;
    if (!outcome.success) {
      const err = outcome['error-codes']?.join(', ') || 'Verification failed';
      return { valid: false, error: err };
    }

    if (expectedHostname && outcome.hostname) {
      const allowed = expectedHostname
        .split(',')
        .map((h) => h.trim().toLowerCase())
        .filter(Boolean);
      const tokenHostname = outcome.hostname.toLowerCase();

      const isValidHostname =
        allowed.includes(tokenHostname) ||
        tokenHostname === '10peakstudios.com' ||
        tokenHostname === 'www.10peakstudios.com' ||
        tokenHostname === 'localhost' ||
        tokenHostname === '127.0.0.1';

      if (!isValidHostname) {
        return { valid: false, error: 'Hostname verification failed' };
      }
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Network error during verification' };
  }
}
