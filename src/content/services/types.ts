import type { ServiceSlug } from '@/lib/schemas/lead';

export type ServiceIconName =
  | 'globe'
  | 'layers'
  | 'gauge'
  | 'eye-off'
  | 'mouse-pointer-click'
  | 'smartphone'
  | 'search-check'
  | 'message-square'
  | 'file-edit'
  | 'lock'
  | 'bar-chart-3'
  | 'search'
  | 'brain'
  | 'message-circle-question'
  | 'sparkles'
  | 'rocket'
  | 'building-2'
  | 'utensils'
  | 'shopping-bag'
  | 'stethoscope'
  | 'graduation-cap'
  | 'briefcase'
  | 'factory'
  | 'shield-check'
  | 'cloud'
  | 'mail-check'
  | 'key-round'
  | 'refresh-cw'
  | 'check-circle-2'
  | 'zap'
  | 'handshake'
  | 'user-check'
  | 'calendar-check'
  | 'wrench'
  | 'database'
  | 'network'
  | 'server'
  | 'terminal'
  | 'trending-up'
  | 'clock'
  | 'check'
  | 'activity'
  | 'users'
  | 'file-spreadsheet'
  | 'git-branch'
  | 'radar'
  | 'map-pin'
  | 'sliders-horizontal'
  | 'code-2'
  | 'circle-x'
  | 'file-text'
  | 'film'
  | 'phone-call'
  | 'target';

export type ServiceAccentTone = 'violet' | 'lilac' | 'cyan';

export type ServicePipelineStage = {
  title: string;
  subtitle: string;
  progress: number;
  statusText: string;
  accent: ServiceAccentTone;
  verified?: boolean;
};

export type ServiceTypeTab = {
  id: string;
  label: string;
  categoryTag: string;
  title: string;
  description: string;
  features: string[];
  chips: string[];
  viewportLabel: string;
};

export type ServicePackageTier = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  /** Keep false while price contains [PLACEHOLDER]; displays fallbackPrice instead in production. */
  priceConfirmed: boolean;
  fallbackPrice: string;
  featured?: boolean;
  badgeText?: string;
  /** Optional raw placeholder template; omitted unless scopeConfirmed is true. */
  scopeNote?: string | undefined;
  scopeConfirmed?: boolean | undefined;
  resolvedScopeFirstItem: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
};

export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
  /** Hidden from DOM and FAQPage JSON-LD until true and free of placeholders. */
  published: boolean;
};

/* ---------- Existing Website Development Section Data Shapes ---------- */

export type ServiceHeroData = {
  eyebrow: string;
  icon: ServiceIconName;
  titleLead: string;
  titleAccent: string;
  summary: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  miniStats: {
    value: string;
    suffix?: string;
    label: string;
    accent: ServiceAccentTone;
  }[];
  pipelineCard: {
    title: string;
    badge: string;
    footerLabel: string;
    footerBadge: string;
    footerProgress: number;
    previewUrl: string;
    stages: ServicePipelineStage[];
  };
  /** Optional Cloudinary URL or public ID ([CLOUDINARY_URL] left unset until uploaded). */
  heroPreviewImage?: string | undefined;
  heroPreviewAlt?: string | undefined;
};

export type TrustMarqueeData = {
  label: string;
  items: string[];
};

export type ProblemCardsData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  items: {
    title: string;
    description: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
};

export type FeatureBentoData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  titleEnd: string;
  spotlightTile: {
    eyebrow: string;
    title: string;
    description: string;
  };
  gaugeTile: {
    eyebrow: string;
    title: string;
    description: string;
    centerLabel: string;
    caption: string;
  };
  smallTiles: {
    title: string;
    description: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
};

export type TypeTabsData = {
  eyebrow: string;
  title: string;
  tabs: ServiceTypeTab[];
};

export type SearchVisibilityData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  cards: {
    code: string;
    title: string;
    description: string;
    footerLabel: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
  preview: {
    searchHeading: string;
    aiHeading: string;
    aiBadge: string;
  };
};

export type AudienceGridData = {
  eyebrow: string;
  title: string;
  items: {
    title: string;
    description: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
};

export type ProcessTimelineData = {
  eyebrow: string;
  title: string;
  steps: {
    number: string;
    code: string;
    title: string;
    description: string;
    accent: ServiceAccentTone;
  }[];
};

export type PerformanceSecurityData = {
  speed: {
    eyebrow: string;
    title: string;
    description: string;
    footnote: string;
    gauges: {
      label: string;
      targetValue: number;
      displayValue: string;
      accent: ServiceAccentTone;
    }[];
  };
  security: {
    eyebrow: string;
    title: string;
    description: string;
    items: {
      label: string;
      icon: ServiceIconName;
    }[];
    linkLabel: string;
    linkHref: string;
  };
};

export type PackagesData = {
  eyebrow: string;
  title: string;
  footnote: string;
  tiers: ServicePackageTier[];
};

export type WorkTeaserData = {
  eyebrow: string;
  title: string;
  cardEyebrow: string;
  cardTitle: string;
  cardDescription: string;
  ctaLabel: string;
  ctaHref: string;
  /** Optional Cloudinary URL or public ID ([CLOUDINARY_URL] left unset until uploaded). */
  workImage?: string | undefined;
  workImageAlt?: string | undefined;
};

export type ServiceFaqData = {
  eyebrow: string;
  title: string;
  items: ServiceFaqItem[];
};

export type ServiceCtaData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  primaryLabel: string;
  whatsappLabel: string;
  variant?: 'default' | 'signal';
  trustNotes?: string[];
};

/* ---------- Full-Stack Web App Section Data Shapes ---------- */

export type AppWindowHeroData = {
  eyebrowPillar: string;
  eyebrowService: string;
  titleLead: string;
  titleAccent: string;
  summary: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  highlights: string[];
  windowUrl: string;
  userInitials: string;
  sampleLabel: string;
  navItems: string[];
  kpis: {
    label: string;
    value: string;
    meta: string;
    tone: ServiceAccentTone;
  }[];
  chartTitle: string;
  chartTag: string;
  orders: {
    id: string;
    label: string;
    status: string;
    tone: 'emerald' | 'amber' | 'lilac';
  }[];
  toasts: {
    title: string;
    detail: string;
    tone: 'emerald' | 'lilac';
  }[];
  heroMockImage?: string | undefined;
  heroMockAlt?: string | undefined;
};

export type BeforeAfterSliderData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  dragLabel: string;
  before: {
    badge: string;
    tag: string;
    cards: {
      title: string;
      lines: string[];
      tone: 'error' | 'amber' | 'neutral';
    }[];
    footerLeft: string;
    footerRight: string;
  };
  after: {
    badge: string;
    tag: string;
    cards: {
      label: string;
      value: string;
      note: string;
      tone: ServiceAccentTone;
    }[];
    footerLeft: string;
    footerRight: string;
  };
  painPoints: {
    title: string;
    description: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
};

export type ProductSwitcherItem = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  fitText: string;
  mockup: {
    headerLabel: string;
    sampleLabel: string;
    metrics: { label: string; value: string; delta: string; tone: ServiceAccentTone }[];
    rowsTitle: string;
    rows: {
      primary: string;
      secondary: string;
      badge: string;
      tone: 'emerald' | 'amber' | 'cyan';
    }[];
  };
};

export type ProductSwitcherData = {
  eyebrow: string;
  title: string;
  products: ProductSwitcherItem[];
};

export type ExplodedArchitectureData = {
  eyebrow: string;
  title: string;
  lead: string;
  layers: {
    number: string;
    title: string;
    tag: string;
    description: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
};

export type FingerprintScanData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  titleEnd: string;
  statusBadge: string;
  capabilities: {
    label: string;
    icon: ServiceIconName;
    accent: ServiceAccentTone;
  }[];
  disclaimer: string;
};

export type RoleModuleItem = {
  id: string;
  label: string;
  value: string;
  status: string;
  locked: boolean;
  ariaLockedLabel?: string;
};

export type RoleViewItem = {
  id: string;
  label: string;
  indicatorTitle: string;
  badgeText: string;
  modules: RoleModuleItem[];
};

export type RoleSwitcherData = {
  eyebrow: string;
  title: string;
  lead: string;
  roles: RoleViewItem[];
};

export type ActivityIntegrationsData = {
  eyebrow: string;
  title: string;
  lead: string;
  feedTitle: string;
  sampleLabel: string;
  events: {
    text: string;
    timeAgo: string;
    icon: ServiceIconName;
    tone: ServiceAccentTone | 'emerald' | 'amber';
  }[];
  hubTitle: string;
  hubSubtitle: string;
  coreLabel: string;
  coreSublabel: string;
  nodes: {
    label: string;
    tone: ServiceAccentTone | 'emerald' | 'amber';
  }[];
  protocols: string[];
};

export type SprintBoardData = {
  eyebrow: string;
  title: string;
  columns: {
    step: string;
    cardTag: string;
    title: string;
    status: string;
    accent: ServiceAccentTone | 'emerald' | 'amber';
    active?: boolean;
  }[];
  guarantees: string[];
};

export type GrowthPathData = {
  eyebrow: string;
  title: string;
  stages: {
    stageLabel: string;
    badge?: string | undefined;
    timelineConfirmed: boolean;
    fallbackBadge: string;
    title: string;
    description: string;
    deliverableLabel: string;
    accent: ServiceAccentTone;
  }[];
};

export type EngineRoomData = {
  eyebrow: string;
  title: string;
  lead: string;
  terminals: {
    filename: string;
    comment: string;
    stackLine: string;
    outputLine: string;
    accent: ServiceAccentTone;
  }[];
};

export type EngagementModelItem = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  price: string;
  priceConfirmed: boolean;
  fallbackPrice: string;
  priceCaption: string;
  popular?: boolean;
  badgeText?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  accent: ServiceAccentTone;
};

export type EngagementModelsData = {
  eyebrow: string;
  title: string;
  lead: string;
  models: EngagementModelItem[];
};

export type TerminalCtaData = {
  promptText: string;
  titleLead: string;
  titleAccent: string;
  titleEnd: string;
  description: string;
  primaryLabel: string;
  whatsappLabel: string;
};

/* ---------- Digital Marketing Section Data Shapes ---------- */

export type SignalHeroData = {
  eyebrowPillar: string;
  eyebrowService: string;
  titleLead: string;
  titleAccent: string;
  summary: string;
  simulatorTitle: string;
  simulatorTag: string;
  brandLabel: string;
  brandPlaceholder: string;
  defaultBrand: string;
  cityLabel: string;
  cityPlaceholder: string;
  defaultCity: string;
  submitLabel: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  tertiaryCtaLabel: string;
  tertiaryCtaHref: string;
  privacyNote: string;
  radarBadges: { label: string; icon: ServiceIconName; tone: ServiceAccentTone }[];
};

export type VisibilityLadderStage = {
  id: string;
  stepNumber: string;
  code: string;
  title: string;
  shortTagline: string;
  stageCode: string;
  queryTemplate: string;
  simulatedLabel: string;
  explanationTitle: string;
  explanation: string;
  accent: ServiceAccentTone;
};

export type VisibilityLadderData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  stages: VisibilityLadderStage[];
  summaryFormula: { code: string; text: string; tone: ServiceAccentTone }[];
  summaryCtaLabel: string;
  summaryCtaHref: string;
};

export type VisibilityQuizQuestion = {
  id: string;
  tag: string;
  question: string;
  detail: string;
  gapRecommendation: string;
  priority: number;
};

export type VisibilityQuizLevel = {
  level: 'Invisible' | 'Listed' | 'Answered' | 'Recommended';
  badge: string;
  minScore: number;
  maxScore: number;
  summary: string;
};

export type VisibilityQuizData = {
  eyebrow: string;
  title: string;
  lead: string;
  questions: VisibilityQuizQuestion[];
  levels: VisibilityQuizLevel[];
  ctaLabel: string;
};

export type TrafficFlowBusinessType = {
  id: 'product-brand' | 'local-service' | 'b2b-saas';
  label: string;
  sources: {
    id: string;
    label: string;
    weight: number;
    icon: ServiceIconName;
    tone: ServiceAccentTone;
  }[];
  outcomes: {
    id: string;
    title: string;
    detail: string;
    icon: ServiceIconName;
    tone: ServiceAccentTone;
  }[];
};

export type TrafficFlowData = {
  eyebrow: string;
  title: string;
  lead: string;
  exampleNote: string;
  hubTitle: string;
  hubSubtitle: string;
  hubFootnote: string;
  types: TrafficFlowBusinessType[];
};

export type GrowthControlNode = {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  summary: string;
  deliverables: string[];
  icon: ServiceIconName;
  accent: ServiceAccentTone;
};

export type GrowthControlRoomData = {
  eyebrow: string;
  title: string;
  lead: string;
  hubTitle: string;
  hubSubtitle: string;
  nodes: GrowthControlNode[];
};

export type CodeFlipData = {
  eyebrow: string;
  title: string;
  lead: string;
  filename: string;
  humanQuestion: string;
  humanAnswer: string;
  humanMeta: string[];
  jsonLdLines: { indent: number; key?: string; value: string; isPunctuation?: boolean }[];
  footnote: string;
};

export type TrustNeverAlwaysData = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  neverTitle: string;
  neverItems: string[];
  alwaysTitle: string;
  alwaysItems: string[];
};

export type ReportPreviewData = {
  eyebrow: string;
  title: string;
  lead: string;
  reportTitle: string;
  reportSubtitle: string;
  sampleBadge: string;
  kpis: {
    label: string;
    value: string;
    note: string;
    tone: ServiceAccentTone;
  }[];
  aiSweepTitle: string;
  aiPlatforms: {
    platform: string;
    status: string;
    tone: ServiceAccentTone;
  }[];
  highlights: string[];
};

export type SignalPathData = {
  eyebrow: string;
  title: string;
  lead: string;
  steps: {
    number: string;
    title: string;
    description: string;
    phaseLabel: string;
    accent: ServiceAccentTone;
  }[];
};

export type GrowthSpeedPlan = {
  id: string;
  tierLabel: string;
  title: string;
  subtitle: string;
  price: string;
  priceConfirmed: boolean;
  fallbackPrice: string;
  billingCaption: string;
  popular?: boolean;
  badgeText?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  accent: ServiceAccentTone;
};

export type GrowthSpeedSliderData = {
  eyebrow: string;
  title: string;
  lead: string;
  sliderLabel: string;
  plans: GrowthSpeedPlan[];
  footnote: string;
};

/* ---------- Composable Sections Discriminated Union ---------- */

export type ServiceSectionBlock =
  | { type: 'serviceHero'; data: ServiceHeroData }
  | { type: 'trustMarquee'; data: TrustMarqueeData }
  | { type: 'problemCards'; data: ProblemCardsData }
  | { type: 'featureBento'; data: FeatureBentoData }
  | { type: 'typeTabs'; data: TypeTabsData }
  | { type: 'searchVisibility'; data: SearchVisibilityData }
  | { type: 'audienceGrid'; data: AudienceGridData }
  | { type: 'processTimeline'; data: ProcessTimelineData }
  | { type: 'performanceSecurity'; data: PerformanceSecurityData }
  | { type: 'packages'; data: PackagesData }
  | { type: 'workTeaser'; data: WorkTeaserData }
  | { type: 'serviceFaq'; data: ServiceFaqData }
  | { type: 'serviceCta'; data: ServiceCtaData }
  | { type: 'appWindowHero'; data: AppWindowHeroData }
  | { type: 'beforeAfterSlider'; data: BeforeAfterSliderData }
  | { type: 'productSwitcher'; data: ProductSwitcherData }
  | { type: 'explodedArchitecture'; data: ExplodedArchitectureData }
  | { type: 'fingerprintScan'; data: FingerprintScanData }
  | { type: 'roleSwitcher'; data: RoleSwitcherData }
  | { type: 'activityIntegrations'; data: ActivityIntegrationsData }
  | { type: 'sprintBoard'; data: SprintBoardData }
  | { type: 'growthPath'; data: GrowthPathData }
  | { type: 'engineRoom'; data: EngineRoomData }
  | { type: 'engagementModels'; data: EngagementModelsData }
  | { type: 'terminalCta'; data: TerminalCtaData }
  | { type: 'signalHero'; data: SignalHeroData }
  | { type: 'visibilityLadder'; data: VisibilityLadderData }
  | { type: 'visibilityQuiz'; data: VisibilityQuizData }
  | { type: 'trafficFlow'; data: TrafficFlowData }
  | { type: 'growthControlRoom'; data: GrowthControlRoomData }
  | { type: 'codeFlip'; data: CodeFlipData }
  | { type: 'trustNeverAlways'; data: TrustNeverAlwaysData }
  | { type: 'reportPreview'; data: ReportPreviewData }
  | { type: 'signalPath'; data: SignalPathData }
  | { type: 'growthSpeedSlider'; data: GrowthSpeedSliderData };

export type ServicePageContent = {
  slug: ServiceSlug;
  theme: 'glass';
  stickyCta?: {
    label: string;
    href: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string;
    indexable: boolean;
  };
  sections: ServiceSectionBlock[];
};
