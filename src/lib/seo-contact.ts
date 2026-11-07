import type { BreadcrumbList, ContactPage, Organization, WithContext } from 'schema-dts';
import { site } from '@/content/site';

/**
 * ContactPage and Organization ContactPoint JSON-LD generator (PRD §8.7, §11.1).
 * Strictly omits streetAddress and postalCode since none was provided (PRD-SEO-10).
 */
export function contactPageJsonLd(): WithContext<ContactPage> {
  const orgId = `${site.url}/#organization`;
  const contactPageUrl = `${site.url}/contact`;

  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${contactPageUrl}#webpage`,
    url: contactPageUrl,
    name: 'Contact 10PeakStudio | Start a Project',
    description:
      'Connect with 10PeakStudio to discuss custom software development, web applications, and enterprise AI automations.',
    isPartOf: { '@id': `${site.url}/#website` },
    about: {
      '@type': 'Organization',
      '@id': orgId,
      name: site.name,
      alternateName: site.alternateName,
      url: site.url,
      description: site.entityDescription,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+91-7678083589',
          contactType: 'sales',
          areaServed: ['IN', 'US', 'GB', 'AE'],
          availableLanguage: ['English', 'Hindi'],
        },
        {
          '@type': 'ContactPoint',
          email: 'connect@10peakstudios.com',
          contactType: 'customer support',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Navi Mumbai, Maharashtra',
        addressCountry: 'IN',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '07:00',
          closes: '21:00',
        },
      ],
    } as Organization,
  };
}

export function contactBreadcrumbJsonLd(): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: site.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: `${site.url}/contact`,
      },
    ],
  };
}
