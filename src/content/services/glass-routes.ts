import type { ServiceSlug } from '@/lib/schemas/lead';

/**
 * Single client-safe source of truth listing which service routes use the scoped
 * "Dark Glass Aurora" layout & navbar treatment. Kept free of copy strings so layout/client
 * components never bundle service page content across unrelated routes.
 */
export const GLASS_SERVICE_SLUGS: readonly ServiceSlug[] = ['website-development'];

export const GLASS_SERVICE_ROUTES: readonly string[] = GLASS_SERVICE_SLUGS.map(
  (slug) => `/services/${slug}`,
);

export function isGlassServiceRoute(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return GLASS_SERVICE_ROUTES.includes(normalized);
}
