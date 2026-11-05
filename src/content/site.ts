/** Site-wide facts (PRD 2.2, user decisions D1 to D5, 2026-11-05). */
export const site = {
  name: '10PeakStudio',
  /** Schema alternateName only (D1). */
  alternateName: '10PeakStudios',
  url: 'https://10peakstudios.com',
  locale: 'en-IN',
  tagline: 'Build. Automate. Grow.',
  philosophy: 'Transform business ideas into powerful digital experiences.',
  /** Entity sentence (PRD-SEO-11, conflict C1 resolution). */
  entityDescription:
    '10PeakStudio is a premium digital innovation and technology studio that designs and engineers websites, full-stack web applications and AI automation for ambitious businesses in India and beyond.',
  /** Active official social profiles only (D4, PH-13). None confirmed yet. */
  social: [] as { label: string; href: string }[],
  /** Legal entity name pending (PRD OQ-5). */
  legalName: null as string | null,
} as const;
