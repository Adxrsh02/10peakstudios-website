import { contactPath, pillarHref } from './navigation';
import { site } from './site';
import type { IconKey } from './types';

/**
 * Home page content (PRD 8.1), in section order. DRAFT copy for approval: facts only,
 * no clients, metrics, testimonials or awards (PRD-HOME-05). Edit copy here, not in components.
 */
export const home = {
  meta: {
    title: 'Premium Websites, Web Apps & AI Automation | 10PeakStudio',
    description:
      '10PeakStudio builds premium websites, full-stack web applications and AI automation that help businesses in India and beyond build, automate and grow.',
  },

  hero: {
    eyebrow: 'Digital innovation and technology studio',
    titleLead: 'Build. Automate.',
    titleAccent: 'Grow.',
    // C1 resolution: entity sentence as the first paragraph (PRD-SEO-11)
    lead: site.entityDescription,
    primaryCta: { label: 'Start a project', href: contactPath },
    secondaryCta: { label: 'Explore services', href: '/services' },
    chips: ['Websites', 'Web apps', 'AI automation'],
  },

  philosophy: {
    eyebrow: 'Our philosophy',
    quoteLead: 'Transform business ideas into',
    quoteAccent: 'powerful digital experiences.',
    statements: [
      {
        title: 'Premium craft',
        body: 'Every detail is designed with care, from the first sketch to the final pixel.',
      },
      {
        title: 'Engineering-led delivery',
        body: 'Solid architecture, clean code and performance are built in from day one.',
      },
      {
        title: 'Customer-focused partnership',
        body: 'We start with your goals and keep you involved at every step.',
      },
    ],
  },

  pillars: {
    eyebrow: 'What we do',
    titleLead: 'One studio to',
    titleAccent: 'build, automate and grow.',
    lead: 'Two primary capabilities, Build and Automate, supported by the marketing and creative work that helps you grow.',
  },

  build: {
    eyebrow: 'Build',
    titleLead: 'Websites and web apps,',
    titleAccent: 'engineered to perform.',
    lead: 'From premium business and e-commerce websites to SaaS platforms, CRMs and portals, we design and engineer digital products end to end.',
    capabilities: [
      {
        icon: 'monitor-smartphone' as IconKey,
        title: 'Responsive',
        body: 'Designed for phones first, refined for every screen.',
      },
      {
        icon: 'accessibility' as IconKey,
        title: 'Accessible',
        body: 'Built to WCAG 2.2 AA so everyone can use it.',
      },
      {
        icon: 'search' as IconKey,
        title: 'Search-ready',
        body: 'Clean structure, metadata and schema from launch.',
      },
      {
        icon: 'gauge' as IconKey,
        title: 'Performance-first',
        body: 'Built to Core Web Vitals targets on real devices.',
      },
    ],
    cta: { label: 'Explore Build services', href: pillarHref('build') },
  },

  automate: {
    eyebrow: 'Automate',
    titleLead: 'Put AI to work',
    titleAccent: 'across your business.',
    lead: 'AI chatbots, intelligent assistants, AI integrations and workflow automation that handle repetitive work so your team can focus on customers.',
    examplesLabel: 'Example use cases',
    examples: [
      {
        icon: 'message-square' as IconKey,
        title: 'Answer routine questions',
        body: 'An AI assistant on your website that answers common questions and hands complex ones to your team.',
      },
      {
        icon: 'route' as IconKey,
        title: 'Route new enquiries',
        body: 'New leads are qualified, tagged and sent to the right person or tool the moment they arrive.',
      },
      {
        icon: 'refresh' as IconKey,
        title: 'Keep data in sync',
        body: 'Workflows keep your CRM, spreadsheets and inboxes aligned without manual copy and paste.',
      },
      {
        icon: 'file-text' as IconKey,
        title: 'Draft first versions',
        body: 'AI integrations prepare first drafts of replies, summaries and reports for your team to review.',
      },
    ],
    cta: { label: 'Explore AI and Automation', href: '/services/ai-automation' },
  },

  grow: {
    eyebrow: 'Grow',
    titleLead: 'Grow with search, social',
    titleAccent: 'and standout creative.',
    lead: 'Supporting services that help the right customers find you, remember you and choose you.',
    cta: { label: 'Explore Grow services', href: pillarHref('grow') },
  },

  process: {
    eyebrow: 'How we work',
    titleLead: 'A clear path from',
    titleAccent: 'idea to launch.',
    // DRAFT steps, confirm with owner (PRD OQ-12)
    steps: [
      { title: 'Discover', body: 'We learn your goals, your users and your requirements.' },
      { title: 'Plan', body: 'Scope, sitemap, architecture and timeline, agreed before we build.' },
      { title: 'Design', body: 'UX flows, interface design and prototypes you can review.' },
      { title: 'Build', body: 'Development, integrations and quality assurance.' },
      { title: 'Launch', body: 'Deployment, SEO setup and analytics, checked before go-live.' },
      { title: 'Support and grow', body: 'Maintenance, optimisation and marketing after launch.' },
    ],
    cta: { label: 'See how we work', href: '/about/process' },
  },

  audience: {
    eyebrow: 'Who we work with',
    titleLead: 'Built for',
    titleAccent: 'ambitious businesses.',
    items: [
      { icon: 'rocket' as IconKey, label: 'Startups and founders' },
      { icon: 'store' as IconKey, label: 'SMEs and business owners' },
      { icon: 'building' as IconKey, label: 'Real estate and property' },
      { icon: 'shopping-bag' as IconKey, label: 'E-commerce brands' },
      { icon: 'utensils' as IconKey, label: 'Restaurants, hospitality and local businesses' },
      { icon: 'landmark' as IconKey, label: 'Established companies and AI adopters' },
    ],
    cta: { label: 'Start a project', href: contactPath },
  },

  why: {
    eyebrow: 'Why 10PeakStudio',
    titleLead: 'A partner you can',
    titleAccent: 'build with.',
    lead: 'What you can expect when you work with us.',
    items: [
      {
        title: 'One partner to build, automate and grow',
        body: 'Websites, software, AI automation and marketing from one team, so nothing gets lost between agencies.',
      },
      {
        title: 'Modern technology',
        body: 'Current, proven tools chosen for performance, security and long-term maintainability.',
      },
      {
        title: 'Transparent process',
        body: 'Clear steps and shared milestones from the first conversation to launch.',
      },
      {
        title: 'Security by design',
        body: 'Security and data protection are considered from the first plan, not added at the end.',
      },
      {
        title: 'Mobile-first craft',
        body: 'Every experience is designed for phones first, then refined for tablets and desktops.',
      },
    ],
  },

  security: {
    title: 'Security by design',
    // Implemented controls only (PRD-SEC-01). DRAFT.
    body: 'Security and data protection are part of every plan we make. This website itself uses HTTPS, strict security headers and consent-first analytics.',
    cta: { label: 'Read our security approach', href: '/security' },
  },

  faq: {
    eyebrow: 'FAQ',
    titleLead: 'Questions,',
    titleAccent: 'answered.',
    lead: 'Straight answers about how we work. Something else on your mind? Get in touch.',
  },

  ctaBand: {
    titleLead: 'Ready to build',
    titleAccent: "what's next?",
    body: 'Tell us about your idea. We will help you plan it, build it and grow it.',
  },
} as const;
