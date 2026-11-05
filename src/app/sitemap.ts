import type { MetadataRoute } from 'next';
import { routes } from '@/content/navigation';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** Only live, indexed routes (PRD-SEO-03, RUL-SEO-03). Stubs join when their page is built. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes
    .filter((r) => r.status === 'live')
    .map((r) => ({
      url: `${site.url}${r.path === '/' ? '' : r.path}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: r.path === '/' ? 1 : 0.7,
    }));
}
