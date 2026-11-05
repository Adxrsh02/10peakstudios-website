import type { Pillar, PillarId, Service } from './types';

/** Pillars (user decision D3). Placement of Mobile, Custom Software, Branding, Video: PRD OQ-17. */
export const pillars: Pillar[] = [
  {
    id: 'build',
    name: 'Build',
    role: 'primary',
    definition: 'Premium websites and full-stack web applications.',
    // DRAFT copy (needs approval)
    title: 'Premium websites and full-stack web applications.',
    description:
      'Websites, web apps, mobile apps and custom software, planned, designed and engineered end to end.',
  },
  {
    id: 'automate',
    name: 'Automate',
    role: 'primary',
    definition: 'AI-powered solutions, intelligent workflows and business automation.',
    title: 'AI-powered solutions and intelligent workflows.',
    description:
      'Chatbots, assistants, AI integrations and workflow automation that take repetitive work off your team.',
  },
  {
    id: 'grow',
    name: 'Grow',
    role: 'supporting',
    definition: 'SEO, GEO, AEO, digital marketing and ongoing optimisation.',
    title: 'SEO, GEO, AEO and ongoing optimisation.',
    description:
      'Digital marketing, branding and video that help the right customers find you and choose you.',
  },
];

/** Service catalogue (PRD 5.2, Company_info.md section 1). Slugs are fixed (PRD-NAV-04). */
export const services: Service[] = [
  {
    slug: 'website-development',
    name: 'Website Development',
    pillar: 'build',
    oneLine: 'Premium business, corporate and e-commerce websites.',
    offerings: [
      'Premium business websites',
      'Corporate websites',
      'E-commerce websites',
      'Responsive websites',
    ],
    icon: 'globe',
  },
  {
    slug: 'web-app-development',
    name: 'Full-Stack Web Applications',
    pillar: 'build',
    oneLine: 'SaaS platforms, CRMs, admin dashboards and portals.',
    offerings: ['SaaS platforms', 'CRM systems', 'Admin dashboards', 'Portals', 'Custom apps'],
    icon: 'layout-dashboard',
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    pillar: 'build',
    oneLine: 'Android, iOS and cross-platform apps.',
    offerings: ['Android', 'iOS', 'Cross-platform'],
    icon: 'smartphone',
  },
  {
    slug: 'custom-software',
    name: 'Custom Software Development',
    pillar: 'build',
    oneLine: 'Business systems, integrations and tailored software.',
    offerings: ['Business management systems', 'Integrations', 'Tailored software'],
    icon: 'boxes',
  },
  {
    slug: 'ai-automation',
    name: 'AI and Automation',
    pillar: 'automate',
    oneLine: 'Chatbots, assistants, AI integrations and workflows.',
    offerings: ['AI chatbots', 'Intelligent assistants', 'AI integrations', 'Workflow automation'],
    icon: 'bot',
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    pillar: 'grow',
    oneLine: 'SEO, GEO, AEO, social and paid campaigns.',
    offerings: [
      'SEO, GEO and AEO',
      'Social media marketing',
      'Google Ads',
      'Meta Ads',
      'Lead generation',
      'Ongoing optimisation',
    ],
    icon: 'trending-up',
  },
  {
    slug: 'branding-design',
    name: 'Branding and Creative Design',
    pillar: 'grow',
    oneLine: 'Logos, brand identity and visual communication.',
    offerings: ['Logo design', 'Brand identity', 'Graphics', 'Visual communication'],
    icon: 'palette',
  },
  {
    slug: 'video-ugc-ads',
    name: 'Video and UGC Ads',
    pillar: 'grow',
    oneLine: 'Promotional videos and creator-style ad campaigns.',
    offerings: ['Promotional videos', 'AI-generated ads', 'Creator-style ad campaigns'],
    icon: 'clapperboard',
  },
];

export const servicePath = (slug: string) => `/services/${slug}`;

export function servicesByPillar(id: PillarId): Service[] {
  return services.filter((s) => s.pillar === id);
}
