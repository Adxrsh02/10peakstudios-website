import type { Metadata } from 'next';
import type { FAQPage, Organization, WebPage, WebSite, WithContext } from 'schema-dts';
import type { Faq } from '@/content/types';
import { site } from '@/content/site';

/** Metadata builder (Architecture.md 10, RUL-SEO-01). */
export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of the "%s | 10PeakStudio" template (Home). */
  absoluteTitle?: boolean;
  noindex?: boolean;
  ogImage?: string;
}): Metadata {
  const {
    title,
    description,
    path,
    absoluteTitle = false,
    noindex = false,
    ogImage = '/og/home.png',
  } = opts;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en_IN',
      url: path,
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ? title : `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** Organization (PRD 11.2): no LocalBusiness, no address, no phone (D5). */
export function organizationJsonLd(email: string): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    alternateName: site.alternateName,
    url: site.url,
    logo: `${site.url}/icons/icon-512.png`,
    description: site.entityDescription,
    email,
    ...(site.social.length > 0 ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': ORG_ID },
  };
}

export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
}): WithContext<WebPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.url}${opts.path}#webpage`,
    url: `${site.url}${opts.path}`,
    name: opts.name,
    description: opts.description,
    inLanguage: site.locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
}

/** FAQPage built from the same content as the visible accordion (Design.md 10.8). */
export function faqJsonLd(faqs: Faq[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Serialise for a <script type="application/ld+json"> with "<" escaped (Architecture.md 10). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
