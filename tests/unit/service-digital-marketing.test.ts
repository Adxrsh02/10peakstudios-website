import { describe, expect, it } from 'vitest';
import { getServiceStickyCta, isGlassServiceRoute } from '@/content/services/glass-routes';
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
  'skyrocket',
  'dominate',
];

describe('Digital Marketing service content & policy gating', () => {
  it('resolves pricing to Custom quote, hides unconfirmed FAQs, and contains zero banned words', () => {
    const content = getServicePageContent('digital-marketing');
    expect(content).not.toBeNull();
    if (!content) return;

    const slider = findServiceSection(content, 'growthSpeedSlider');
    const faq = findServiceSection(content, 'serviceFaq');
    const quiz = findServiceSection(content, 'visibilityQuiz');
    const hero = findServiceSection(content, 'signalHero');

    expect(slider).toBeDefined();
    expect(faq).toBeDefined();
    expect(quiz).toBeDefined();
    expect(hero).toBeDefined();
    expect(quiz?.questions).toHaveLength(10);

    for (const plan of slider?.plans ?? []) {
      expect(plan.price).toBe('Custom quote');
      expect(plan.price).not.toContain('PLACEHOLDER');
    }

    // Account ownership FAQ must remain unpublished until confirmed
    expect(faq?.items.length).toBe(5);
    expect(faq?.items.some((i) => i.question.includes('ownership'))).toBe(false);

    const serialized = JSON.stringify(content);
    expect(serialized).not.toContain('[PLACEHOLDER');
    expect(serialized).not.toContain('[CONFIRM');
    expect(serialized).not.toContain('[X]');
    expect(serialized).not.toContain('[CLOUDINARY_URL');
    expect(serialized).not.toContain('Sharma Dental');

    const lower = serialized.toLowerCase();
    for (const banned of BANNED_WORDS) {
      expect(lower).not.toContain(banned);
    }
  });

  it('registers /services/digital-marketing as dark-glass, indexable, and synced with sticky CTA config', () => {
    const content = getServicePageContent('digital-marketing');
    expect(content).not.toBeNull();
    if (!content) return;

    expect(isGlassServiceRoute('/services/digital-marketing')).toBe(true);
    expect(isGlassServiceRoute('/services/digital-marketing/')).toBe(true);
    expect(isServicePageLiveAndIndexable('digital-marketing')).toBe(true);

    expect(getServiceStickyCta('/services/digital-marketing')).toEqual(content.stickyCta);
    expect(getServiceStickyCta('/')).toBeNull();
    expect(getServiceStickyCta('/services/website-development')).toBeNull();

    const meta = servicePageMetadata(content);
    expect(meta.robots).toEqual({ index: true, follow: true });
    expect(meta.alternates?.canonical).toBe('/services/digital-marketing');

    const svc = serviceJsonLd({
      slug: content.slug,
      name: 'Digital Marketing',
      description: content.seo.description,
    }) as unknown as Record<string, unknown>;
    expect(svc['@type']).toBe('Service');
    expect(svc.offers).toBeUndefined();

    const crumbs = serviceBreadcrumbJsonLd({
      slug: content.slug,
      name: 'Digital Marketing',
    }) as unknown as { itemListElement: unknown[] };
    expect(crumbs.itemListElement).toHaveLength(3);
  });
});
