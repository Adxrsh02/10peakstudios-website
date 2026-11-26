import { describe, expect, it } from 'vitest';
import { isGlassServiceRoute } from '@/content/services/glass-routes';
import {
  findServiceSection,
  getServicePageContent,
  isServicePageLiveAndIndexable,
} from '@/content/services/registry';
import { serviceBreadcrumbJsonLd, serviceJsonLd, servicePageMetadata } from '@/lib/seo-service';

describe('Website Development service content & gating', () => {
  it('resolves unconfirmed prices to Custom quote and strips unpublished/placeholder FAQs', () => {
    const content = getServicePageContent('website-development');
    expect(content).not.toBeNull();
    if (!content) return;

    const packages = findServiceSection(content, 'packages');
    const faq = findServiceSection(content, 'serviceFaq');
    const hero = findServiceSection(content, 'serviceHero');
    const workTeaser = findServiceSection(content, 'workTeaser');

    expect(packages).toBeDefined();
    expect(faq).toBeDefined();
    expect(hero).toBeDefined();
    expect(workTeaser).toBeDefined();

    for (const tier of packages?.tiers ?? []) {
      expect(tier.price).toBe('Custom quote');
      expect(tier.price).not.toContain('PLACEHOLDER');
      expect(tier.scopeNote).toBeUndefined();
    }

    expect(faq?.items.length).toBe(5);
    expect(faq?.items.some((i) => i.question.includes('Who owns'))).toBe(false);
    expect(hero?.heroPreviewImage).toBeUndefined();
    expect(workTeaser?.workImage).toBeUndefined();

    const serialized = JSON.stringify(content);
    expect(serialized).not.toContain('[PLACEHOLDER');
    expect(serialized).not.toContain('[CONFIRM');
    expect(serialized).not.toContain('[X]');
    expect(serialized).not.toContain('[CLOUDINARY_URL');
  });

  it('derives dark-glass navbar routes cleanly from single config', () => {
    expect(isGlassServiceRoute('/services/website-development')).toBe(true);
    expect(isGlassServiceRoute('/services/website-development/')).toBe(true);
    expect(isGlassServiceRoute('/services/web-app-development')).toBe(true);
    expect(isGlassServiceRoute('/')).toBe(false);
    expect(isGlassServiceRoute('/services/ai-automation')).toBe(false);
    expect(isGlassServiceRoute('/contact')).toBe(false);
    expect(isServicePageLiveAndIndexable('website-development')).toBe(true);
    expect(isServicePageLiveAndIndexable('ai-automation')).toBe(false);
  });

  it('builds Service and BreadcrumbList JSON-LD without offers/prices', () => {
    const content = getServicePageContent('website-development');
    expect(content).not.toBeNull();
    if (!content) return;

    const meta = servicePageMetadata(content);
    expect(meta.robots).toEqual({ index: true, follow: true });
    expect(meta.alternates?.canonical).toBe('/services/website-development');

    const svc = serviceJsonLd({
      slug: content.slug,
      name: 'Website Development',
      description: content.seo.description,
    }) as unknown as Record<string, unknown>;
    expect(svc['@type']).toBe('Service');
    expect(svc.offers).toBeUndefined();
    expect(svc.areaServed).toEqual({ '@type': 'Country', name: 'India' });

    const crumbs = serviceBreadcrumbJsonLd({
      slug: content.slug,
      name: 'Website Development',
    }) as unknown as { itemListElement: unknown[] };
    expect(crumbs.itemListElement).toHaveLength(3);
  });
});
