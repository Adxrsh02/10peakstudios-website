import { describe, expect, it } from 'vitest';
import { handleContactRequest } from '../../worker/contact';
import type { WorkerEnv } from '../../worker/types';

describe('Worker /api/contact endpoint (Architecture.md §6)', () => {
  const mockEnv: WorkerEnv = {
    ALLOWED_ORIGINS: 'https://10peakstudios.com',
    TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
  };

  it('rejects non-POST requests with 405 Method Not Allowed', async () => {
    const req = new Request('https://10peakstudios.com/api/contact', {
      method: 'GET',
    });
    const res = await handleContactRequest(req, mockEnv);
    expect(res.status).toBe(405);
  });

  it('rejects non-JSON requests with 415 Unsupported Media Type', async () => {
    const req = new Request('https://10peakstudios.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'hello',
    });
    const res = await handleContactRequest(req, mockEnv);
    expect(res.status).toBe(415);
  });

  it('rejects disallowed foreign origins with 403 Forbidden', async () => {
    const req = new Request('https://10peakstudios.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://malicious-attacker.com',
      },
      body: JSON.stringify({}),
    });
    const res = await handleContactRequest(req, mockEnv);
    expect(res.status).toBe(403);
  });

  it('returns 400 validation error on invalid lead payload', async () => {
    const req = new Request('https://10peakstudios.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://10peakstudios.com',
      },
      body: JSON.stringify({
        name: 'A', // too short
        email: 'invalid-email',
      }),
    });
    const res = await handleContactRequest(req, mockEnv);
    expect(res.status).toBe(400);
    const data = (await res.json()) as {
      ok: boolean;
      error: string;
      fields?: Record<string, string>;
    };
    expect(data.ok).toBe(false);
    expect(data.error).toBe('validation');
    expect(data.fields?.name).toBeDefined();
    expect(data.fields?.email).toBeDefined();
  });

  it('rejects submissions with honeypot filled (403 bot defence)', async () => {
    const req = new Request('https://10peakstudios.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://10peakstudios.com',
      },
      body: JSON.stringify({
        name: 'Valid Name',
        email: 'valid@example.com',
        services: ['website-development'],
        message: 'A sufficiently long project message for validation.',
        consent: true,
        website: 'http://spam-bot.com', // honeypot filled
        startedAt: Date.now() - 5000,
        turnstileToken: 'test-token',
      }),
    });
    const res = await handleContactRequest(req, mockEnv);
    expect(res.status).toBe(403);
    const data = (await res.json()) as { ok: boolean; error: string };
    expect(data.error).toBe('verification_failed');
  });

  it('rejects submissions under 3 seconds minimum fill time (403 fast submit)', async () => {
    const req = new Request('https://10peakstudios.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://10peakstudios.com',
      },
      body: JSON.stringify({
        name: 'Valid Name',
        email: 'valid@example.com',
        services: ['website-development'],
        message: 'A sufficiently long project message for validation.',
        consent: true,
        website: '',
        startedAt: Date.now() - 500, // only 500ms elapsed
        turnstileToken: 'test-token',
      }),
    });
    const res = await handleContactRequest(req, mockEnv);
    expect(res.status).toBe(403);
    const data = (await res.json()) as { ok: boolean; error: string };
    expect(data.error).toBe('verification_failed');
  });
});
