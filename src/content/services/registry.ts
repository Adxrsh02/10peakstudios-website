import type { ServicePageContent } from './types';
import { websiteDevelopmentContent } from './website-development';

const SERVICE_CONTENT_REGISTRY: Partial<Record<string, ServicePageContent>> = {
  [websiteDevelopmentContent.slug]: websiteDevelopmentContent,
};

const hasForbiddenToken = (value: string | undefined): boolean =>
  typeof value === 'string' &&
  (value.includes('[PLACEHOLDER') || value.includes('[X]') || value.includes('[CLOUDINARY_URL'));

function sanitizeOptionalImageUrl(value: string | undefined): string | undefined {
  if (!value || hasForbiddenToken(value)) return undefined;
  return value;
}

/**
 * Resolves a service page's content cleanly for production builds:
 * - Unconfirmed package prices resolve to `fallbackPrice` ("Custom quote") and drop raw placeholders.
 * - Unconfirmed package page counts resolve to confirmed deliverables without `[X]`.
 * - Unpublished or placeholder-containing FAQs are stripped before passing to UI or FAQPage JSON-LD.
 * - Unset `[CLOUDINARY_URL]` slots stay `undefined`.
 */
export function getServicePageContent(slug: string): ServicePageContent | null {
  const raw = SERVICE_CONTENT_REGISTRY[slug];
  if (!raw) return null;

  return {
    ...raw,
    hero: {
      ...raw.hero,
      heroPreviewImage: sanitizeOptionalImageUrl(raw.hero.heroPreviewImage),
    },
    packages: {
      ...raw.packages,
      tiers: raw.packages.tiers.map((tier) => ({
        ...tier,
        price:
          tier.priceConfirmed && !hasForbiddenToken(tier.price) ? tier.price : tier.fallbackPrice,
        scopeNote:
          tier.scopeConfirmed && tier.scopeNote && !hasForbiddenToken(tier.scopeNote)
            ? tier.scopeNote
            : undefined,
      })),
    },
    workTeaser: {
      ...raw.workTeaser,
      workImage: sanitizeOptionalImageUrl(raw.workTeaser.workImage),
    },
    faq: {
      ...raw.faq,
      items: raw.faq.items.filter(
        (item) =>
          item.published && !hasForbiddenToken(item.question) && !hasForbiddenToken(item.answer),
      ),
    },
  };
}

export function isServicePageLiveAndIndexable(slug: string): boolean {
  const content = getServicePageContent(slug);
  return Boolean(content?.seo.indexable);
}
