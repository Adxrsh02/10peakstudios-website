export const PORTFOLIO_INDEXABLE_THRESHOLD = 1;

export const PORTFOLIO_INDUSTRIES = [
  {
    id: 'Healthcare',
    label: 'Healthcare',
    icon: 'heart-pulse',
    description: 'Clinical tools, diagnostic AI, and patient workflows.',
  },
  {
    id: 'Real Estate',
    label: 'Real Estate',
    icon: 'building',
    description: 'Property portals, lead pipelines, and CRM tools.',
  },
  {
    id: 'E-commerce & Retail',
    label: 'E-commerce & Retail',
    icon: 'shopping-bag',
    description: 'High-converting storefronts and inventory systems.',
  },
  {
    id: 'Finance & Fintech',
    label: 'Finance & Fintech',
    icon: 'landmark',
    description: 'Auditable ledgers, dashboards, and secure workflows.',
  },
  {
    id: 'Education & EdTech',
    label: 'Education & EdTech',
    icon: 'graduation-cap',
    description: 'Learning portals, assessments, and student systems.',
  },
  {
    id: 'Hospitality & Restaurants',
    label: 'Hospitality & Restaurants',
    icon: 'utensils',
    description: 'Booking engines, menus, and local growth systems.',
  },
  {
    id: 'SaaS & Startups',
    label: 'SaaS & Startups',
    icon: 'rocket',
    description: 'Multi-tenant web products, MVPs, and AI copilots.',
  },
  {
    id: 'Manufacturing & Logistics',
    label: 'Manufacturing & Logistics',
    icon: 'boxes',
    description: 'Operations dashboards, supply tracking, and ERPs.',
  },
] as const;

export const PORTFOLIO_CAPABILITIES = [
  { label: 'Websites', serviceSlug: 'website-development' },
  { label: 'Web Apps & SaaS', serviceSlug: 'web-app-development' },
  { label: 'AI & Automation', serviceSlug: 'ai-automation' },
  { label: 'Mobile Apps', serviceSlug: 'mobile-app-development' },
  { label: 'Custom Software', serviceSlug: 'custom-software' },
  { label: 'Digital Marketing', serviceSlug: 'digital-marketing' },
  { label: 'Branding & Design', serviceSlug: 'branding-design' },
] as const;

export type EngineeringStep = {
  number: string;
  title: string;
  description: string;
};

export const PORTFOLIO_WORKFLOW_STEPS: EngineeringStep[] = [
  {
    number: '01',
    title: 'Research',
    description:
      'Audit business constraints, domain rules, user workflows, and data quality before writing code.',
  },
  {
    number: '02',
    title: 'Planning',
    description:
      'Define system boundaries, data schemas, API contracts, and measurable delivery milestones.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Craft accessible interfaces, responsive layouts, and clear information architecture.',
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Engineer typed frontend, backend, and AI pipelines with strict validation and clean modularity.',
  },
  {
    number: '05',
    title: 'Testing',
    description:
      'Verify accuracy benchmarks, accessibility, edge cases, and real-device performance.',
  },
  {
    number: '06',
    title: 'Deployment',
    description:
      'Ship optimized static or cloud production builds with security headers and telemetry.',
  },
  {
    number: '07',
    title: 'Maintenance',
    description:
      'Monitor system health, refine models and SEO, and iterate safely as operations grow.',
  },
];

export const PORTFOLIO_COPY = {
  meta: {
    title: 'Portfolio: Engineering Case Studies',
    description:
      "Explore 10PeakStudio's production engineering case studies across web apps, AI automation, and custom software built for real business outcomes.",
  },
  hero: {
    eyebrow: 'Our Work',
    titleLead: 'Real Systems',
    titleAccent: 'Built To Scale.',
    lead: 'Deep technical case studies showing how our team architects production web platforms, custom software, and applied AI systems.',
  },
  approach: {
    eyebrow: 'Our Engineering Approach',
    titleLead: 'Seven stages from',
    titleAccent: 'research to production.',
    lead: 'Every project follows a disciplined engineering lifecycle focused on maintainability, measurable quality, and reliable delivery.',
  },
  industriesSection: {
    eyebrow: 'Industries',
    titleLead: 'Domain systems across',
    titleAccent: 'eight sectors.',
    lead: 'Select an industry with published case studies to filter our work, or reach out to discuss your sector.',
  },
} as const;
