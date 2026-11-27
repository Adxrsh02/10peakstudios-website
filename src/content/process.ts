export type ProcessImageSlot = {
  /** Single field to replace with a Cloudinary URL or public ID once uploaded. */
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectClass: 'aspect-[4/5]' | 'aspect-[4/3]';
  blurDataURL: string;
  fallbackLabel: string;
};

export type ResolvedProcessImage = Omit<ProcessImageSlot, 'src'> & {
  src: string | undefined;
};

export type MeetingOption = {
  id: 'in-person' | 'online';
  badge: string;
  title: string;
  description: string;
  footerLabel: string;
  icon: 'building-2' | 'video';
  image: ProcessImageSlot;
};

export type CampCodedVisual =
  | {
      kind: 'gate';
      code: string;
      icon: 'lock-open' | 'pen-tool';
    }
  | {
      kind: 'prototype';
      badge: string;
      screens: readonly { title: string; subtitle: string }[];
    }
  | {
      kind: 'build';
      badge: string;
      checks: readonly string[];
    };

export type AscentCamp = {
  step: number;
  code: string;
  stageBadge: string;
  title: string;
  description: string;
  whatYouGet: string;
  yourPart: string;
  hasApprovalGate?: boolean;
  isSummit?: boolean;
  /** Swappable single field: replace `image.src` with a Cloudinary URL to replace the glass panel. */
  image?: ProcessImageSlot;
  codedVisual?: CampCodedVisual;
};

export type ApprovalGateItem = {
  code: string;
  title: string;
  description: string;
  icon: 'lock' | 'palette' | 'pointer' | 'rocket';
};

export type AlwaysHaveItem = {
  label: string;
  icon: 'user-check' | 'link' | 'message-square' | 'calendar-check';
};

export type ProcessFaqItem = {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
  published: boolean;
};

export type ProcessPageContent = {
  seo: {
    title: string;
    description: string;
    path: '/about/process';
    indexable: boolean;
    ogImage: string;
  };
  stickyCta: {
    label: string;
    href: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    trustItems: readonly string[];
    chips: readonly { label: string; position: 'top-left' | 'bottom-right' }[];
    image: ProcessImageSlot;
  };
  meeting: {
    eyebrow: string;
    title: string;
    closingNote: string;
    options: readonly MeetingOption[];
  };
  ascent: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    progressLabel: string;
    camps: readonly AscentCamp[];
    summitBanner: {
      mark: string;
      title: string;
      subtitle: string;
      statusLabel: string;
    };
  };
  gates: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    items: readonly ApprovalGateItem[];
    alwaysTitle: string;
    alwaysItems: readonly AlwaysHaveItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: readonly ProcessFaqItem[];
  };
  cta: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    primaryCta: { label: string; href: string };
    whatsappLabel: string;
    chipTitle: string;
    chipTag: string;
    image: ProcessImageSlot;
  };
};

const HERO_BLUR =
  'data:image/webp;base64,UklGRsgAAABXRUJQVlA4ILwAAABQBACdASoQABUAPtFUo0uoJKMhsAgBABoJaACdMoAlthJKmENKh/EktkTgAP7x92YRkhMHSwXd79pMi2BoLSqH0u89XmSYjYm1rOGFOAlX0dKh4ioidN4/HhNQ/jrMuMuH0R8+hKKgLFnJxkLX0HCaKdf7KvPZ212Gir/xHxYp+hXNnP7WN+KaqRPA2lO9fOMcu0Uc9rK0ctk0A6VlfXkQKTPo/PhxFAupx5u0pVuArEEVXv9C25gW7AAAAA==';

const ONLINE_CALL_BLUR =
  'data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAABwAgCdASoQAAwAAsBMJYgCdAYsFwXBIIIrSStAAP7nWEyoW1oBKKcgAO/00UzblBwHuGJ35yC0+sPMnstnGvNS7o3/+bY/K39qLOduX52817AoeJ5adC+LFJx2GThSm/wHfF7RP2OxUOQpdOkzpI+QfIUAz4EAAAA=';

const LAUNCH_BLUR =
  'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAwAgCdASoQAAwAAsBMJYgCdAEPEA7qHWJcoAD+93mmKIG0pNKxt0xoogjtKYEKXl0ZRH4t4vYEXeLuXlnf8EV87junmMrVD+cAAA==';

const HERO_MEETING_IMAGE: ProcessImageSlot = {
  src: 'https://res.cloudinary.com/lta722n4/image/upload/v1795792385/hww-hero-meeting.png',
  alt: 'Engineers and designers sketching product wireframes with a client around a sunlit studio table',
  width: 896,
  height: 1200,
  aspectClass: 'aspect-[4/5]',
  blurDataURL: HERO_BLUR,
  fallbackLabel: 'hww-hero-meeting · Discovery workshop',
};

const IN_PERSON_CARD_IMAGE: ProcessImageSlot = {
  src: 'https://res.cloudinary.com/lta722n4/image/upload/v1795792385/hww-hero-meeting.png',
  alt: 'In-person project discovery workshop seated around wireframe sketches',
  width: 896,
  height: 1200,
  aspectClass: 'aspect-[4/3]',
  blurDataURL: HERO_BLUR,
  fallbackLabel: 'hww-hero-meeting · On-site discovery',
};

const ONLINE_CALL_IMAGE: ProcessImageSlot = {
  src: 'https://res.cloudinary.com/lta722n4/image/upload/v1795792461/hww-online-call.png',
  alt: 'Studio strategist on a remote video call reviewing interface wireframes on a laptop',
  width: 1200,
  height: 896,
  aspectClass: 'aspect-[4/3]',
  blurDataURL: ONLINE_CALL_BLUR,
  fallbackLabel: 'hww-online-call · Remote video room',
};

const LAUNCH_IMAGE: ProcessImageSlot = {
  src: 'https://res.cloudinary.com/lta722n4/image/upload/v1795791792/screen.png',
  alt: 'Evening product launch telemetry displayed across mobile and desktop analytics views',
  width: 1200,
  height: 896,
  aspectClass: 'aspect-[4/3]',
  blurDataURL: LAUNCH_BLUR,
  fallbackLabel: 'hww-launch · Go-live telemetry',
};

/**
 * Typed content singleton for How We Work (/about/process, PRD 8.5, Rules.md RUL-CNT-09).
 */
export const processContent: ProcessPageContent = {
  seo: {
    title: 'How We Work',
    description:
      'See how 10PeakStudio takes a project from first call to prototype, validation, build and launch with clear approvals at every step.',
    path: '/about/process',
    indexable: true,
    ogImage: '/og/home.png',
  },

  stickyCta: {
    label: 'Book a call',
    href: '/contact',
  },

  hero: {
    eyebrow: 'How we work',
    titleLead: 'From first call to launch.',
    titleAccent: 'No surprises.',
    lead: "We listen first, show you a working prototype before we build, and ask for your approval at every major step. You always know what's happening and what comes next.",
    primaryCta: { label: 'Book a free call', href: '/contact' },
    secondaryCta: { label: 'Start a project', href: '/contact' },
    trustItems: ['Clear scope', 'You approve every step', 'One point of contact'],
    chips: [
      { label: 'Requirements captured', position: 'top-left' },
      { label: 'Prototype approved', position: 'bottom-right' },
    ],
    image: HERO_MEETING_IMAGE,
  },

  meeting: {
    eyebrow: "Let's talk",
    title: 'In your office or on a call. Your choice.',
    closingNote: 'Either way, you leave the first call with clear next steps.',
    options: [
      {
        id: 'in-person',
        badge: 'Face-to-face',
        title: 'In person',
        description:
          'At your office where possible, or on a call — focused around your goals and workflow.',
        footerLabel: 'LOCATION: ON-SITE WHERE AVAILABLE',
        icon: 'building-2',
        image: IN_PERSON_CARD_IMAGE,
      },
      {
        id: 'online',
        badge: 'Digital room',
        title: 'Online',
        description: 'A video call from anywhere, with a shared screen to sketch ideas together.',
        footerLabel: 'CONNECT: GOOGLE MEET / ZOOM',
        icon: 'video',
        image: ONLINE_CALL_IMAGE,
      },
    ],
  },

  ascent: {
    eyebrow: 'The ascent',
    titleLead: 'Six camps from idea to',
    titleAccent: 'summit.',
    progressLabel: 'ALTITUDE PROFILE',
    camps: [
      {
        step: 1,
        code: '01 BASE CAMP',
        stageBadge: 'Camp 01 · Discovery',
        title: 'Discover',
        description: 'We learn your business, your customers and what success looks like.',
        whatYouGet: 'A written summary of your requirements.',
        yourPart: 'A focused discovery conversation.',
        image: {
          ...IN_PERSON_CARD_IMAGE,
          alt: 'Initial discovery conversation mapping requirements and user goals',
        },
      },
      {
        step: 2,
        code: '02 ROUTE',
        stageBadge: 'Camp 02 · Scope',
        title: 'Plan & scope',
        description: 'We turn requirements into a clear plan: features, timeline and cost.',
        whatYouGet: 'A proposal with scope, milestones and price.',
        yourPart: 'Review and sign off the scope.',
        hasApprovalGate: true,
        codedVisual: {
          kind: 'gate',
          code: 'APPROVAL GATE 01',
          icon: 'lock-open',
        },
      },
      {
        step: 3,
        code: '03 BASECAMP 2',
        stageBadge: 'Camp 03 · Prototype',
        title: 'Design & prototype',
        description: 'We design the key screens and make a clickable prototype.',
        whatYouGet: 'A prototype you can click through on your phone and laptop.',
        yourPart: 'Try it and tell us what feels wrong.',
        // Swappable field: add regenerated Cloudinary URL here to replace the coded glass panel
        image: {
          src: '',
          alt: 'Clickable desktop and mobile interface prototype review',
          width: 1200,
          height: 896,
          aspectClass: 'aspect-[4/3]',
          blurDataURL: HERO_BLUR,
          fallbackLabel: 'Clickable Prototype Preview',
        },
        codedVisual: {
          kind: 'prototype',
          badge: 'INTERACTIVE MOCKUP · READY FOR REVIEW',
          screens: [
            { title: 'Customer Flow', subtitle: 'Mobile + desktop navigation' },
            { title: 'Core Screens', subtitle: 'Interactive tap targets' },
            { title: 'Brand Polish', subtitle: 'Typography & contrast check' },
          ],
        },
      },
      {
        step: 4,
        code: '04 RIDGE',
        stageBadge: 'Camp 04 · Validation',
        title: 'Validate',
        description: "We refine the prototype with your feedback until it's right.",
        whatYouGet: 'An approved design, before any heavy development.',
        yourPart: 'Approve the final design.',
        hasApprovalGate: true,
        codedVisual: {
          kind: 'gate',
          code: 'DESIGN APPROVAL GATE',
          icon: 'pen-tool',
        },
      },
      {
        step: 5,
        code: '05 THE CLIMB',
        stageBadge: 'Camp 05 · Engineering',
        title: 'Build & test',
        description: 'We develop in stages and share progress on a private preview link.',
        whatYouGet: 'Regular demos on a private preview link and a test version to try.',
        yourPart: 'Test and give feedback.',
        // Swappable field: add regenerated Cloudinary URL here to replace the coded glass panel
        image: {
          src: '',
          alt: 'Staged engineering build with automated checks and private preview link',
          width: 1200,
          height: 896,
          aspectClass: 'aspect-[4/3]',
          blurDataURL: LAUNCH_BLUR,
          fallbackLabel: 'Staged Engineering Build',
        },
        codedVisual: {
          kind: 'build',
          badge: 'STAGING PREVIEW · BUILD PIPELINE',
          checks: [
            'Milestone features built cleanly',
            'Cross-device & accessibility QA',
            'Private preview link updated',
          ],
        },
      },
      {
        step: 6,
        code: '06 SUMMIT',
        stageBadge: 'Camp 06 · Summit',
        title: 'Launch & grow',
        description: 'We test, secure and launch, then keep improving with real data.',
        whatYouGet: 'A live product, handover notes and support options.',
        yourPart: 'Approve go-live.',
        hasApprovalGate: true,
        isSummit: true,
        image: LAUNCH_IMAGE,
      },
    ],
    summitBanner: {
      mark: '10P',
      title: 'And then we keep climbing with you:',
      subtitle: 'Ongoing technical support, planned updates, and continuous platform growth.',
      statusLabel: 'POST-LAUNCH READINESS',
    },
  },

  gates: {
    eyebrow: 'You stay in control',
    titleLead: 'Nothing moves forward without',
    titleAccent: 'your yes.',
    items: [
      {
        code: 'GATE 01',
        title: 'Scope sign-off',
        description: "You agree on what we're building.",
        icon: 'lock',
      },
      {
        code: 'GATE 02',
        title: 'Design approval',
        description: 'You approve how it looks.',
        icon: 'palette',
      },
      {
        code: 'GATE 03',
        title: 'Prototype approval',
        description: 'You approve how it works.',
        icon: 'pointer',
      },
      {
        code: 'GATE 04',
        title: 'Go-live approval',
        description: 'You decide when it launches.',
        icon: 'rocket',
      },
    ],
    alwaysTitle: "What you'll always have",
    alwaysItems: [
      { label: 'One point of contact', icon: 'user-check' },
      { label: 'A private preview link', icon: 'link' },
      { label: 'Plain-language updates', icon: 'message-square' },
      { label: 'A shared project plan', icon: 'calendar-check' },
    ],
  },

  faq: {
    eyebrow: 'Questions',
    title: 'Good to know before we start.',
    items: [
      {
        id: 'timeline',
        question: 'How long does a project take?',
        answer:
          'It depends on scope. You get a clear timeline in your proposal before anything starts.',
        defaultOpen: true,
        published: true,
      },
      {
        id: 'involvement',
        question: 'How involved do I need to be?',
        answer:
          'Most at the start and at each approval step. In between, short regular check-ins keep things on track.',
        published: true,
      },
      {
        id: 'changes-midway',
        question: 'What if I want changes midway?',
        answer:
          'Small changes fit into the current stage. Bigger ones are agreed in writing first, so there are no surprise costs.',
        published: true,
      },
      {
        id: 'outside-navi-mumbai',
        question: 'Do you work with clients outside Navi Mumbai?',
        answer:
          'Yes. We work with businesses across India and beyond, and most of our process works smoothly online.',
        published: true,
      },
    ],
  },

  cta: {
    eyebrow: 'Ready for the ascent?',
    titleLead: "Let's start at",
    titleAccent: 'base camp.',
    lead: "Book a free call. Tell us what you're planning, and we'll map the route together.",
    primaryCta: { label: 'Book a free call', href: '/contact' },
    whatsappLabel: 'Chat on WhatsApp',
    chipTitle: 'Free discovery call · No obligation',
    chipTag: 'CLEAR NEXT STEPS',
    image: ONLINE_CALL_IMAGE,
  },
};

function hasUnresolvedMarker(value: string): boolean {
  return /\[(PLACEHOLDER|CONFIRM|CLOUDINARY_URL)/i.test(value);
}

/**
 * Resolves a Cloudinary slot safely for static export: unset `[CLOUDINARY_URL]` values resolve to
 * `undefined` so Components render coded fallbacks and `out/` never leaks unresolved strings.
 */
export function resolveProcessImage(slot: ProcessImageSlot): ResolvedProcessImage {
  const valid =
    slot.src.trim().length > 0 &&
    !hasUnresolvedMarker(slot.src) &&
    (slot.src.startsWith('https://res.cloudinary.com/') || slot.src.startsWith('/'));

  return {
    src: valid ? slot.src : undefined,
    alt: slot.alt,
    width: slot.width,
    height: slot.height,
    aspectClass: slot.aspectClass,
    blurDataURL: slot.blurDataURL,
    fallbackLabel: slot.fallbackLabel,
  };
}

export type ResolvedAscentCamp = Omit<AscentCamp, 'image'> & {
  image: ResolvedProcessImage | undefined;
};

export type ResolvedProcessContent = Omit<
  ProcessPageContent,
  'hero' | 'meeting' | 'ascent' | 'faq' | 'cta'
> & {
  hero: Omit<ProcessPageContent['hero'], 'image'> & { image: ResolvedProcessImage };
  meeting: Omit<ProcessPageContent['meeting'], 'options'> & {
    options: readonly (Omit<MeetingOption, 'image'> & { image: ResolvedProcessImage })[];
  };
  ascent: Omit<ProcessPageContent['ascent'], 'camps'> & {
    camps: readonly ResolvedAscentCamp[];
  };
  faq: Omit<ProcessPageContent['faq'], 'items'> & {
    items: readonly ProcessFaqItem[];
  };
  cta: Omit<ProcessPageContent['cta'], 'image'> & { image: ResolvedProcessImage };
};

export function getResolvedProcessContent(): ResolvedProcessContent {
  return {
    ...processContent,
    hero: {
      ...processContent.hero,
      image: resolveProcessImage(processContent.hero.image),
    },
    meeting: {
      ...processContent.meeting,
      options: processContent.meeting.options.map((opt) => ({
        ...opt,
        image: resolveProcessImage(opt.image),
      })),
    },
    ascent: {
      ...processContent.ascent,
      camps: processContent.ascent.camps.map((camp) => ({
        ...camp,
        image: camp.image ? resolveProcessImage(camp.image) : undefined,
      })),
    },
    faq: {
      ...processContent.faq,
      items: processContent.faq.items.filter(
        (item) =>
          item.published &&
          !hasUnresolvedMarker(item.question) &&
          !hasUnresolvedMarker(item.answer),
      ),
    },
    cta: {
      ...processContent.cta,
      image: resolveProcessImage(processContent.cta.image),
    },
  };
}

/**
 * Only allow `/about/process` to be indexed and listed in `sitemap.xml` when `seo.indexable` is true
 * and every core image slot + copy string has zero `[PLACEHOLDER]`, `[CONFIRM]`, or `[CLOUDINARY_URL]` tokens.
 */
export function isProcessPageIndexable(): boolean {
  if (!processContent.seo.indexable) return false;
  const serialized = JSON.stringify({
    seo: processContent.seo,
    hero: processContent.hero,
    meeting: processContent.meeting,
    ascent: processContent.ascent,
    gates: processContent.gates,
    faq: processContent.faq.items.filter((i) => i.published),
    cta: processContent.cta,
  });
  return !hasUnresolvedMarker(serialized);
}
