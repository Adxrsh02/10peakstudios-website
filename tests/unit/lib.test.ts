import { describe, expect, it } from 'vitest';
import { sanitizeParams } from '@/lib/analytics';
import { CONSENT_MAX_AGE_MS, createConsent, parseConsent } from '@/lib/consent';
import { faqJsonLd, organizationJsonLd, pageMetadata, serializeJsonLd } from '@/lib/seo';
import { whatsappUrl } from '@/lib/whatsapp';
import { homeFaqs } from '@/content/faqs';

describe('consent storage (Architecture.md 11.1)', () => {
  it('round-trips a valid record', () => {
    const c = createConsent(true, false, new Date('2026-11-05T00:00:00Z'));
    expect(parseConsent(JSON.stringify(c), Date.parse('2026-11-06T00:00:00Z'))).toEqual(c);
  });
  it('rejects expired, malformed and outdated records', () => {
    const c = createConsent(true, true, new Date('2025-01-01T00:00:00Z'));
    expect(
      parseConsent(JSON.stringify(c), Date.parse('2025-01-01T00:00:00Z') + CONSENT_MAX_AGE_MS + 1),
    ).toBeNull();
    expect(parseConsent('{not json')).toBeNull();
    expect(parseConsent(JSON.stringify({ ...c, version: 0 }))).toBeNull();
    expect(parseConsent(JSON.stringify({ ...c, analytics: 'yes' }))).toBeNull();
    expect(parseConsent(null)).toBeNull();
  });
});

describe('analytics allow-list (PRD-ANL-01)', () => {
  it('drops anything that could carry personal data', () => {
    expect(
      sanitizeParams({ location: 'hero', email: 'a@b.com', name: 'X', cta_id: 'hero-primary' }),
    ).toEqual({
      location: 'hero',
      cta_id: 'hero-primary',
    });
  });
});

describe('whatsappUrl (PRD OQ-3)', () => {
  it('hides WhatsApp when no valid number is configured', () => {
    expect(whatsappUrl(undefined)).toBeNull();
    expect(whatsappUrl('+91 98')).toBeNull();
  });
  it('builds a wa.me link with an encoded message', () => {
    expect(whatsappUrl('919800000000', 'Hi there')).toBe(
      'https://wa.me/919800000000?text=Hi%20there',
    );
  });
});

describe('SEO builders', () => {
  it('uses the brand title template and noindex for stubs', () => {
    const m = pageMetadata({ title: 'About', description: 'x', path: '/about', noindex: true });
    expect(m.robots).toEqual({ index: false, follow: true });
    expect(m.alternates?.canonical).toBe('/about');
  });
  it('Organization has alternateName and no address or phone (D1, D5)', () => {
    const org = organizationJsonLd('connect@10peakstudios.com') as unknown as Record<
      string,
      unknown
    >;
    expect(org.name).toBe('10PeakStudio');
    expect(org.alternateName).toBe('10PeakStudios');
    expect(org).not.toHaveProperty('address');
    expect(org).not.toHaveProperty('telephone');
  });
  it('FAQPage mirrors the visible FAQ', () => {
    const faq = faqJsonLd(homeFaqs) as unknown as { mainEntity: unknown[] };
    expect(faq.mainEntity).toHaveLength(homeFaqs.length);
  });
  it('escapes "<" in JSON-LD', () => {
    expect(serializeJsonLd({ a: '</script>' })).not.toContain('</script>');
  });
});
