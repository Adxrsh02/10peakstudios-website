import type { ServicePageContent, ServiceSectionBlock } from './types';
import { websiteDevelopmentContent } from './website-development';

const SERVICE_CONTENT_REGISTRY: Partial<Record<string, ServicePageContent>> = {
  [websiteDevelopmentContent.slug]: websiteDevelopmentContent,
};

const hasForbiddenToken = (value: string | undefined): boolean =>
  typeof value === 'string' &&
  (value.includes('[PLACEHOLDER') ||
    value.includes('[CONFIRM') ||
    value.includes('[X]') ||
    value.includes('[CLOUDINARY_URL'));

function sanitizeOptionalImageUrl(value: string | undefined): string | undefined {
  if (!value || hasForbiddenToken(value)) return undefined;
  return value;
}

function sanitizeSection(block: ServiceSectionBlock): ServiceSectionBlock {
  switch (block.type) {
    case 'serviceHero':
      return {
        type: 'serviceHero',
        data: {
          ...block.data,
          heroPreviewImage: sanitizeOptionalImageUrl(block.data.heroPreviewImage),
        },
      };
    case 'packages':
      return {
        type: 'packages',
        data: {
          ...block.data,
          tiers: block.data.tiers.map((tier) => ({
            ...tier,
            price:
              tier.priceConfirmed && !hasForbiddenToken(tier.price)
                ? tier.price
                : tier.fallbackPrice,
            scopeNote:
              tier.scopeConfirmed && tier.scopeNote && !hasForbiddenToken(tier.scopeNote)
                ? tier.scopeNote
                : undefined,
          })),
        },
      };
    case 'workTeaser':
      return {
        type: 'workTeaser',
        data: {
          ...block.data,
          workImage: sanitizeOptionalImageUrl(block.data.workImage),
        },
      };
    case 'serviceFaq':
      return {
        type: 'serviceFaq',
        data: {
          ...block.data,
          items: block.data.items.filter(
            (item) =>
              item.published &&
              !hasForbiddenToken(item.question) &&
              !hasForbiddenToken(item.answer),
          ),
        },
      };
    case 'appWindowHero':
      return {
        type: 'appWindowHero',
        data: {
          ...block.data,
          heroMockImage: sanitizeOptionalImageUrl(block.data.heroMockImage),
        },
      };
    case 'growthPath':
      return {
        type: 'growthPath',
        data: {
          ...block.data,
          stages: block.data.stages.map((stage) => ({
            ...stage,
            badge:
              stage.timelineConfirmed && stage.badge && !hasForbiddenToken(stage.badge)
                ? stage.badge
                : stage.fallbackBadge,
          })),
        },
      };
    case 'engagementModels':
      return {
        type: 'engagementModels',
        data: {
          ...block.data,
          models: block.data.models.map((model) => ({
            ...model,
            price:
              model.priceConfirmed && !hasForbiddenToken(model.price)
                ? model.price
                : model.fallbackPrice,
          })),
        },
      };
    default:
      return block;
  }
}

/**
 * Resolves a service page's composable `sections[]` cleanly for production builds:
 * - Unconfirmed prices resolve to `fallbackPrice` ("Custom quote") and drop raw placeholders.
 * - Unconfirmed page/week badges omit placeholders (`[X]`, `[PLACEHOLDER weeks]`).
 * - Unpublished or placeholder/confirm-containing FAQs are stripped from DOM & FAQPage JSON-LD.
 * - Unset `[CLOUDINARY_URL]` slots stay `undefined`.
 */
export function getServicePageContent(slug: string): ServicePageContent | null {
  const raw = SERVICE_CONTENT_REGISTRY[slug];
  if (!raw) return null;

  return {
    ...raw,
    sections: raw.sections.map(sanitizeSection),
  };
}

type SectionDataByType = {
  [B in ServiceSectionBlock as B['type']]: B['data'];
};

export function findServiceSection<T extends ServiceSectionBlock['type']>(
  content: ServicePageContent,
  type: T,
): SectionDataByType[T] | undefined {
  for (const section of content.sections) {
    if (section.type === type) {
      return section.data as SectionDataByType[T];
    }
  }
  return undefined;
}

export function isServicePageLiveAndIndexable(slug: string): boolean {
  const content = getServicePageContent(slug);
  return Boolean(content?.seo.indexable);
}
