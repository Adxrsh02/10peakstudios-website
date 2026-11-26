import type { BreadcrumbList, WithContext } from 'schema-dts';
import { site } from '@/content/site';

export function legalBreadcrumbJsonLd(title: string, path: string): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: title, item: `${site.url}${path}` },
    ],
  };
}
