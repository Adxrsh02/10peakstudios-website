import { describe, expect, it } from 'vitest';
import { isGlassServiceRoute } from '@/content/services/glass-routes';
import {
  findServiceSection,
  getServicePageContent,
  isServicePageLiveAndIndexable,
} from '@/content/services/registry';
import { serviceBreadcrumbJsonLd, serviceJsonLd, servicePageMetadata } from '@/lib/seo-service';

const BANNED_WORDS = [
  'elevate',
  'unlock',
  'seamless',
  'cutting-edge',
  'revolutionize',
  'empower',
  'game-changer',
  'next-level',
  'synergy',
  'harness',
  'robust',
  'leverage',
];

describe('Web App Development service content & gating', () => {
  it('resolves unconfirmed prices/timelines, omits unpublished FAQs, and avoids banned copy', () => {
    const content = getServicePageContent('web-app-development');
    expect(content).not.toBeNull();
    if (!content) return;

    const engagement = findServiceSection(content, 'engagementModels');
    const growth = findServiceSection(content, 'growthPath');
    const faq = findServiceSection(content, 'serviceFaq');
    const hero = findServiceSection(content, 'appWindowHero');

    expect(engagement).toBeDefined();
    expect(growth).toBeDefined();
    expect(faq).toBeDefined();
    expect(hero).toBeDefined();

    for (const model of engagement?.models ?? []) {
      expect(model.price).toBe('Custom quote');
      expect(model.price).not.toContain('PLACEHOLDER');
      expect(model.features.some((f) => f.includes('14-day warranty'))).toBe(false);
    }

    expect(growth?.stages[0]?.badge).toBe('Focused launch');
    expect(hero?.heroMockImage).toBeUndefined();

    // Confirmed policy: NDA and Ownership FAQs remain unpublished; 5 general FAQs stay live
    expect(faq?.items.length).toBe(5);
    expect(faq?.items.some((i) => i.question.includes('Who owns the code'))).toBe(false);
    expect(faq?.items.some((i) => i.question.includes('NDA'))).toBe(false);

    const serialized = JSON.stringify(content);
    expect(serialized).not.toContain('[PLACEHOLDER');
    expect(serialized).not.toContain('[CONFIRM');
    expect(serialized).not.toContain('[X]');
    expect(serialized).not.toContain('[CLOUDINARY_URL');

    const lower = serialized.toLowerCase();
    for (const word of BANNED_WORDS) {
      expect(lower).not.toContain(word);
    }
  });

  it('registers /services/web-app-development as live glass route with index, follow and valid JSON-LD', () => {
    expect(isGlassServiceRoute('/services/web-app-development')).toBe(true);
    expect(isGlassServiceRoute('/services/web-app-development/')).toBe(true);
    expect(isServicePageLiveAndIndexable('web-app-development')).toBe(true);

    const content = getServicePageContent('web-app-development');
    expect(content).not.toBeNull();
    if (!content) return;

    const meta = servicePageMetadata(content);
    expect(meta.robots).toEqual({ index: true, follow: true });
    expect(meta.alternates?.canonical).toBe('/services/web-app-development');

    const svc = serviceJsonLd({
      slug: content.slug,
      name: 'Full-Stack Web Applications',
      description: content.seo.description,
    }) as unknown as Record<string, unknown>;
    expect(svc['@type']).toBe('Service');
    expect(svc.offers).toBeUndefined();
    expect(svc.areaServed).toEqual({ '@type': 'Country', name: 'India' });

    const crumbs = serviceBreadcrumbJsonLd({
      slug: content.slug,
      name: 'Full-Stack Web Applications',
    }) as unknown as { itemListElement: unknown[] };
    expect(crumbs.itemListElement).toHaveLength(3);
  });
});
