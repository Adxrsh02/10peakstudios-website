import type { ServiceSlug } from '@/lib/schemas/lead';

/**
 * Single client-safe source of truth listing which service routes use the scoped
 * "Dark Glass Aurora" layout & navbar treatment. Kept free of copy strings so layout/client
 * components never bundle service page content across unrelated routes.
 */
export const GLASS_SERVICE_SLUGS: readonly ServiceSlug[] = [
  'website-development',
  'web-app-development',
  'digital-marketing',
];

export const GLASS_SERVICE_ROUTES: readonly string[] = GLASS_SERVICE_SLUGS.map(
  (slug) => `/services/${slug}`,
);

export type ServiceStickyCtaOverride = {
  label: string;
  href: string;
};

/**
 * Config-driven mobile sticky bar overrides keyed cleanly by route path so `StickyCtaBar`
 * never bundles page copy strings across unrelated routes. Keep in sync with each
 * service content file's optional `stickyCta` field (verified by unit tests).
 */
export const SERVICE_STICKY_CTA_OVERRIDES: Partial<Record<string, ServiceStickyCtaOverride>> = {
  '/services/digital-marketing': {
    label: 'Free audit',
    href: '/contact?service=digital-marketing',
  },
  '/about/process': {
    label: 'Book a call',
    href: '/contact',
  },
};

export function normalizeServicePathname(pathname: string | null | undefined): string | null {
  if (!pathname) return null;
  return pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isGlassServiceRoute(pathname: string | null | undefined): boolean {
  const normalized = normalizeServicePathname(pathname);
  return normalized ? GLASS_SERVICE_ROUTES.includes(normalized) : false;
}

export function getServiceStickyCta(
  pathname: string | null | undefined,
): ServiceStickyCtaOverride | null {
  const normalized = normalizeServicePathname(pathname);
  if (!normalized) return null;
  return SERVICE_STICKY_CTA_OVERRIDES[normalized] ?? null;
}
