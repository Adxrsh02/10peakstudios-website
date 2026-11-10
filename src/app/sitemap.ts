import type { MetadataRoute } from 'next';
import { routes } from '@/content/navigation';
import { site } from '@/content/site';

export const dynamic = 'force-static';

function getPriority(path: string): number {
  if (path === '/') return 1.0;
  if (path === '/contact') return 0.8;
  if (path === '/privacy' || path === '/terms') return 0.5;
  return 0.7;
}

/** PRD-SEO-03: XML sitemap listing every public, indexable page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes
    .filter((r) => r.status === 'live')
    .map((r) => ({
      url: `${site.url}${r.path === '/' ? '' : r.path}`,
      lastModified,
      changeFrequency: (r.path === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: getPriority(r.path),
    }));
}
