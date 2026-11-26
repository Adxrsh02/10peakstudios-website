import type { Metadata } from 'next';
import type { BreadcrumbList, Service, WithContext } from 'schema-dts';
import type { ServicePageContent } from '@/content/services/types';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';

const ORG_ID = `${site.url}/#organization`;

export function servicePageMetadata(content: ServicePageContent): Metadata {
  return pageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: `/services/${content.slug}`,
    noindex: !content.seo.indexable,
    ogImage: content.seo.ogImage,
  });
}

/** Service JSON-LD per PRD 8.3: Service with Organization provider and areaServed India; no prices. */
export function serviceJsonLd(opts: {
  slug: string;
  name: string;
  description: string;
}): WithContext<Service> {
  const url = `${site.url}/services/${opts.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  };
}

export function serviceBreadcrumbJsonLd(opts: {
  slug: string;
  name: string;
}): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
      {
        '@type': 'ListItem',
        position: 3,
        name: opts.name,
        item: `${site.url}/services/${opts.slug}`,
      },
    ],
  };
}
