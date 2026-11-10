import { pillars, servicePath, services, servicesByPillar } from './services';
import type { NavLink, PillarId, RouteEntry } from './types';

/**
 * Route table (PRD 6.1). Stub routes exist so links resolve (plan Q3 default); they are
 * noindex and excluded from the sitemap until each page is built and switched to "live".
 */
export const routes: RouteEntry[] = [
  { path: '/', title: 'Home', status: 'live', prd: '8.1' },
  { path: '/services', title: 'Services', status: 'stub', prd: '8.2' },
  ...services.map<RouteEntry>((s) => ({
    path: servicePath(s.slug),
    title: s.name,
    status: 'stub',
    prd: '8.3',
  })),
  { path: '/about', title: 'About', status: 'stub', prd: '8.4' },
  { path: '/about/process', title: 'How We Work', status: 'stub', prd: '8.5' },
  { path: '/security', title: 'Security by Design', status: 'stub', prd: '8.6' },
  { path: '/contact', title: 'Contact', status: 'live', prd: '8.7' },
  { path: '/privacy', title: 'Privacy Policy', status: 'stub', prd: '8.9' },
  { path: '/terms', title: 'Terms and Conditions', status: 'stub', prd: '8.9' },
];

export const contactPath = '/contact';

/** Mega-menu columns: Build, Automate, Grow (PRD 6.3). */
export const megaMenu = pillars.map((p) => ({
  id: p.id,
  name: p.name,
  definition: p.definition,
  href: `/services#${p.id}`,
  items: servicesByPillar(p.id).map<NavLink>((s) => ({
    label: s.name,
    href: servicePath(s.slug),
    description: s.oneLine,
  })),
}));

export const companyLinks: NavLink[] = [
  { label: 'About', href: '/about', description: 'Our story, mission and values.' },
  {
    label: 'How We Work',
    href: '/about/process',
    description: 'From first conversation to launch.',
  },
  {
    label: 'Security by Design',
    href: '/security',
    description: 'How we protect data and build trust.',
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.name, href: servicePath(s.slug) })),
  },
  {
    title: 'Company',
    links: [
      ...companyLinks.map(({ label, href }) => ({ label, href })),
      { label: 'Contact', href: contactPath },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms and Conditions', href: '/terms' },
    ],
  },
];

export const pillarHref = (id: PillarId) => `/services#${id}`;
