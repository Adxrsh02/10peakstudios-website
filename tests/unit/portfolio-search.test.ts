import { describe, expect, it } from 'vitest';
import type { PortfolioCardData } from '@/lib/portfolio/loader';
import {
  filterAndSortProjects,
  findMatchSegments,
  parsePortfolioQuery,
  serializePortfolioQuery,
} from '@/lib/portfolio/search';

const MOCK_PROJECTS: PortfolioCardData[] = [
  {
    slug: 'fundus-ai',
    title: 'Automated Fundus Image Screening',
    tagline: 'Deep learning ophthalmology screening with ConvNeXtV2-Tiny and RAG.',
    shortDescription: 'Multi-label retinal screening system trained on ODIR-2019.',
    type: 'in-house',
    status: 'Completed',
    statusNote: undefined,
    industry: 'Healthcare',
    capabilities: ['AI & Automation', 'Web Apps & SaaS'],
    complexity: 'Advanced',
    year: 2026,
    duration: '5 months',
    featured: true,
    order: 1,
    thumbnail: {
      url: 'https://res.cloudinary.com/lta722n4/image/upload/v1/thumb.png',
      alt: 'Fundus AI screen',
      width: 1200,
      height: 750,
    },
    techList: ['Python', 'FastAPI', 'ConvNeXtV2-Tiny', 'React'],
    githubUrl: 'https://github.com/Adxrsh02/Automated-Fundus-Disease-Detection',
    liveUrl: null,
    featuresText: ['Retinal screening', 'RAG clinical assistant'],
  },
  {
    slug: 'enterprise-prop-crm',
    title: 'PropFlow Real Estate CRM',
    tagline: 'Automated property lead routing and WhatsApp follow-up engine.',
    shortDescription: 'Custom CRM platform for brokerage pipelines and multi-agent routing.',
    type: 'client',
    status: 'Live',
    statusNote: undefined,
    industry: 'Real Estate',
    capabilities: ['Web Apps & SaaS', 'Custom Software'],
    complexity: 'Enterprise',
    year: 2025,
    duration: '4 months',
    featured: false,
    order: 2,
    thumbnail: {
      url: 'https://res.cloudinary.com/lta722n4/image/upload/v1/crm.png',
      alt: 'PropFlow CRM dashboard',
      width: 1200,
      height: 750,
    },
    techList: ['Next.js', 'PostgreSQL', 'TypeScript'],
    githubUrl: null,
    liveUrl: null,
    featuresText: ['Lead qualification', 'Brokerage analytics'],
  },
];

describe('portfolio search, filtering, and URL sync', () => {
  it('ranks title matches cleanly and tolerates minor typos', () => {
    const exact = filterAndSortProjects(MOCK_PROJECTS, {
      q: 'Fundus',
      industry: 'all',
      capability: 'all',
      tech: 'all',
      sort: 'featured',
    });
    expect(exact).toHaveLength(1);
    expect(exact[0]?.project.slug).toBe('fundus-ai');

    const typo = filterAndSortProjects(MOCK_PROJECTS, {
      q: 'retinl',
      industry: 'all',
      capability: 'all',
      tech: 'all',
      sort: 'featured',
    });
    expect(typo).toHaveLength(1);
    expect(typo[0]?.project.slug).toBe('fundus-ai');
  });

  it('filters by industry, capability, tech, and sorts by complexity', () => {
    const byIndustry = filterAndSortProjects(MOCK_PROJECTS, {
      q: '',
      industry: 'Real Estate',
      capability: 'all',
      tech: 'all',
      sort: 'featured',
    });
    expect(byIndustry.map((r) => r.project.slug)).toEqual(['enterprise-prop-crm']);

    const byComplexity = filterAndSortProjects(MOCK_PROJECTS, {
      q: '',
      industry: 'all',
      capability: 'all',
      tech: 'all',
      sort: 'complexity',
    });
    expect(byComplexity.map((r) => r.project.slug)).toEqual(['enterprise-prop-crm', 'fundus-ai']);
  });

  it('highlights search matches without HTML injection', () => {
    const segments = findMatchSegments('Automated Fundus Screening', ['fundus']);
    expect(segments).toEqual([
      { text: 'Automated ', matched: false },
      { text: 'Fundus', matched: true },
      { text: ' Screening', matched: false },
    ]);
  });

  it('round-trips URL query parameters and sanitizes invalid values via Zod', () => {
    const qs = serializePortfolioQuery({
      q: 'retinal',
      industry: 'Healthcare',
      capability: 'AI & Automation',
      tech: 'FastAPI',
      sort: 'newest',
    });
    expect(qs).toBe(
      '?q=retinal&industry=Healthcare&capability=AI+%26+Automation&tech=FastAPI&sort=newest',
    );
    expect(parsePortfolioQuery(qs)).toEqual({
      q: 'retinal',
      industry: 'Healthcare',
      capability: 'AI & Automation',
      tech: 'FastAPI',
      sort: 'newest',
    });

    const sanitized = parsePortfolioQuery('?industry=InvalidIndustry&sort=hack');
    expect(sanitized.industry).toBe('all');
    expect(sanitized.sort).toBe('featured');
  });
});
