import type { TabContent } from '@/types/about-section';

export const ABOUT_TABS: TabContent[] = [
  {
    id: 'our-mission',
    tabLabel: 'Our Mission',
    heading: 'Growth And Clarity- Businesses Deserve Both.',
    description:
      '10PeakStudios was founded on the belief that businesses shouldn’t choose between growth and clarity. We analyze processes to build practical, scalable technology that connects fragmented systems, eliminates hidden inefficiencies, and delivers solutions that create real impact on operations and revenue.',
    bulletPoints: [
      'Fractured workflows connected into one unified, intelligent system',
      'Hidden inefficiencies surfaced and eliminated before they cost you more',
      'Technology that creates measurable impact on your operations and revenue',
    ],
    bannerType: 'orbital-dome',
  },
  {
    id: 'our-vision',
    tabLabel: 'Our Vision',
    heading: 'In a World Where AI Is Everywhere, We Make It Meaningful.',
    description:
      'As a premier digital engineering studio, we turn AI and custom software into real results. We make technology adoption clear, manageable, and valuable. Our clients are not just customers, they are co-builders, aligned with us to create impactful solutions and grow together toward shared success.',
    bulletPoints: [
      'Making enterprise-grade AI development accessible to growth-driven businesses',
      'Building AI-first infrastructure that solves real operational problems at scale',
      'Creating intelligent systems that evolve with your ambitions and compound over time',
    ],
    bannerType: 'network-matrix',
  },
  {
    id: 'our-belief',
    tabLabel: 'Our Belief',
    heading: 'AI Isn’t a Replacement, It’s a Time-Saving Assistant.',
    description:
      'AI is not a replacement for human intelligence, it’s a trained assistant that gives people back their time. By handling repetitive tasks, AI lets humans focus on creativity and strategy. We build responsible solutions that deliver measurable outcomes for our clients within months.',
    bulletPoints: [
      'Average 60% reduction in manual task time across delivered projects',
      'ROI-focused builds with defined success metrics agreed upfront',
      'Ongoing support and optimisation to keep your AI systems performing',
    ],
    bannerType: 'isometric-stack',
  },
];
