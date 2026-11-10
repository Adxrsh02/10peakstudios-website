import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export const dynamic = 'force-static';

/** PRD-SEO-04: allow public pages, explicitly allow Googlebot, disallow /api/, reference sitemap. */
export default function robots(): MetadataRoute.Robots {
  const hostDomain = new URL(site.url).host;
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/styleguide'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/styleguide'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: hostDomain,
  };
}
