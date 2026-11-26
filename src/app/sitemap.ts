import type { MetadataRoute } from 'next';
import { routes } from '@/content/navigation';
import { site } from '@/content/site';
import { getAllPortfolioProjects, isPortfolioIndexable } from '@/lib/portfolio/loader';

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
  const baseEntries = routes
    .filter((r) => r.status === 'live')
    .map((r) => ({
      url: `${site.url}${r.path === '/' ? '' : r.path}`,
      lastModified,
      changeFrequency: (r.path === '/' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
      priority: getPriority(r.path),
    }));

  if (!isPortfolioIndexable()) {
    return baseEntries;
  }

  const portfolioEntries: MetadataRoute.Sitemap = [
    ...(baseEntries.some((e) => e.url === `${site.url}/portfolio`)
      ? []
      : [
          {
            url: `${site.url}/portfolio`,
            lastModified,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          },
        ]),
    ...getAllPortfolioProjects().map((p) => ({
      url: `${site.url}/portfolio/${p.slug}`,
      lastModified: p.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...baseEntries, ...portfolioEntries];
}
