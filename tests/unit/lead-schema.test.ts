import { describe, expect, it } from 'vitest';
import { leadSchema } from '@/lib/schemas/lead';

describe('leadSchema (PRD §9, Rules.md RUL-TS-04, RUL-SEC-03)', () => {
  const validLead = {
    name: 'Adarsh Korade',
    email: 'adarsh@example.com',
    phone: '+91 7678083589',
    services: ['website-development', 'ai-automation'] as const,
    budgetBand: '50k-100k' as const,
    timeline: '1-3-months' as const,
    message: 'We are planning to build a high-performance web platform and AI assistants.',
    consent: true,
    website: '',
    startedAt: Date.now() - 5000,
    turnstileToken: 'test-turnstile-token',
  };

  it('validates a complete, compliant lead payload', () => {
    const result = leadSchema.safeParse(validLead);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Adarsh Korade');
      expect(result.data.email).toBe('adarsh@example.com');
      expect(result.data.services).toEqual(['website-development', 'ai-automation']);
    }
  });

  it('allows optional phone to be empty or omitted', () => {
    const resultNoPhone = leadSchema.safeParse({ ...validLead, phone: '' });
    expect(resultNoPhone.success).toBe(true);

    const resultUndefinedPhone = leadSchema.safeParse({ ...validLead, phone: undefined });
    expect(resultUndefinedPhone.success).toBe(true);
  });

  it('rejects invalid email formats', () => {
    const result = leadSchema.safeParse({ ...validLead, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects short messages (< 20 characters)', () => {
    const result = leadSchema.safeParse({ ...validLead, message: 'Too short' });
    expect(result.success).toBe(false);
  });

  it('requires at least one service selection', () => {
    const result = leadSchema.safeParse({ ...validLead, services: [] });
    expect(result.success).toBe(false);
  });

  it('rejects submissions without consent', () => {
    const result = leadSchema.safeParse({ ...validLead, consent: false });
    expect(result.success).toBe(false);
  });

  it('preserves honeypot field for server-side bot defence', () => {
    const result = leadSchema.safeParse({ ...validLead, website: 'http://spam-link.com' });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.website).toBe('http://spam-link.com');
    }
  });

  it('rejects missing turnstile token', () => {
    const result = leadSchema.safeParse({ ...validLead, turnstileToken: '' });
    expect(result.success).toBe(false);
  });
});
