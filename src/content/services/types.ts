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
  | 'zap';

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

export type ServicePageContent = {
  slug: ServiceSlug;
  theme: 'glass';
  seo: {
    title: string;
    description: string;
    ogImage: string;
    indexable: boolean;
  };
  hero: {
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
  marquee: {
    label: string;
    items: string[];
  };
  problems: {
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
  features: {
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
  typeTabs: {
    eyebrow: string;
    title: string;
    tabs: ServiceTypeTab[];
  };
  searchVisibility: {
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
  audience: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      description: string;
      icon: ServiceIconName;
      accent: ServiceAccentTone;
    }[];
  };
  process: {
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
  benchmarks: {
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
  packages: {
    eyebrow: string;
    title: string;
    footnote: string;
    tiers: ServicePackageTier[];
  };
  workTeaser: {
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
  faq: {
    eyebrow: string;
    title: string;
    items: ServiceFaqItem[];
  };
  finalCta: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    primaryLabel: string;
    whatsappLabel: string;
  };
};
