import type { Metadata } from 'next';
import type {
  BreadcrumbList,
  CollectionPage,
  CreativeWork,
  SoftwareApplication,
  WithContext,
} from 'schema-dts';
import { PORTFOLIO_COPY } from '@/content/portfolio-config';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { isPortfolioIndexable, type PortfolioProject } from './portfolio/loader';

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

function cloudinaryOgUrl(src: string): string {
  if (!src.includes('res.cloudinary.com/') || !src.includes('/image/upload/')) {
    return '/og/home.png';
  }
  return src.replace('/image/upload/', '/image/upload/c_fill,w_1200,h_630,f_auto,q_auto/');
}

export function portfolioIndexMetadata(): Metadata {
  const indexable = isPortfolioIndexable();
  return pageMetadata({
    title: PORTFOLIO_COPY.meta.title,
    description: PORTFOLIO_COPY.meta.description,
    path: '/portfolio',
    noindex: !indexable,
  });
}

export function portfolioCaseStudyMetadata(project: PortfolioProject): Metadata {
  const indexable = isPortfolioIndexable() && project.published;
  return pageMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/portfolio/${project.slug}`,
    noindex: !indexable,
    ogImage: cloudinaryOgUrl(project.heroImage.url),
  });
}

export function portfolioIndexJsonLd(projects: PortfolioProject[]): WithContext<CollectionPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${site.url}/portfolio#webpage`,
    url: `${site.url}/portfolio`,
    name: `${PORTFOLIO_COPY.meta.title} | ${site.name}`,
    description: PORTFOLIO_COPY.meta.description,
    inLanguage: site.locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${site.url}/portfolio/${project.slug}`,
        name: project.title,
      })),
    },
  };
}

export function portfolioIndexBreadcrumbJsonLd(): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${site.url}/portfolio` },
    ],
  };
}

export function portfolioCaseStudyJsonLd(
  project: PortfolioProject,
): WithContext<SoftwareApplication | CreativeWork> {
  const isSoftware =
    project.capabilities.includes('Web Apps & SaaS') ||
    project.capabilities.includes('AI & Automation') ||
    project.capabilities.includes('Custom Software') ||
    project.capabilities.includes('Mobile Apps');

  const url = `${site.url}/portfolio/${project.slug}`;

  if (isSoftware) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': `${url}#work`,
      name: project.title,
      description: project.inShort,
      applicationCategory: project.industry,
      operatingSystem: project.platform,
      url,
      image: cloudinaryOgUrl(project.heroImage.url),
      datePublished: `${project.year}-01-01`,
      inLanguage: site.locale,
      creator: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      keywords: project.techList.join(', '),
      ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#work`,
    name: project.title,
    description: project.inShort,
    url,
    image: cloudinaryOgUrl(project.heroImage.url),
    datePublished: `${project.year}-01-01`,
    inLanguage: site.locale,
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    keywords: project.techList.join(', '),
  };
}

export function portfolioCaseStudyBreadcrumbJsonLd(
  project: PortfolioProject,
): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${site.url}/portfolio` },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `${site.url}/portfolio/${project.slug}`,
      },
    ],
  };
}
