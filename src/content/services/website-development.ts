import type { ServicePageContent } from './types';

/**
 * Website Development Service Content (PRD 8.3 + Stitch "Dark Glass Aurora" export).
 * Uses the composable `sections[]` architecture.
 *
 * [CONFIRM] Items to supply before setting real prices/copy:
 * - packages tier Launch & Growth price + scopeNote
 * - faq item "Who owns the website?" answer -> set published: true
 * - serviceHero heroPreviewImage & workTeaser workImage ([CLOUDINARY_URL] once uploaded)
 * - seo.ogImage ([CLOUDINARY_URL] custom 1200x630 OG image; currently falls back to '/og/home.png')
 */
export const websiteDevelopmentContent: ServicePageContent = {
  slug: 'website-development',
  theme: 'glass',
  seo: {
    title: 'Website Development Services',
    description:
      'Premium business, corporate and e-commerce websites designed and engineered by 10PeakStudio: responsive, accessible and built for search visibility.',
    ogImage: '/og/home.png',
    indexable: true,
  },
  sections: [
    {
      type: 'serviceHero',
      data: {
        eyebrow: 'Build / Website Development',
        icon: 'globe',
        titleLead: 'Websites That Look Premium',
        titleAccent: 'and Turn Visitors Into Clients.',
        summary:
          'We design and engineer fast, secure, search-ready websites for growing businesses: custom design, mobile-first build, and SEO built in from day one.',
        primaryCtaLabel: 'Start a project',
        secondaryCtaLabel: 'View our work',
        secondaryCtaHref: '/portfolio',
        miniStats: [
          { value: '90+', suffix: 'pts', label: 'Lighthouse target', accent: 'cyan' },
          { value: 'Mobile-first', label: 'Every build', accent: 'violet' },
          { value: 'SEO + GEO + AEO', label: 'Built in', accent: 'lilac' },
        ],
        pipelineCard: {
          title: 'Website Delivery Workflow',
          badge: 'ILLUSTRATIVE',
          footerLabel: 'Launch readiness target',
          footerBadge: 'STAGED QA',
          footerProgress: 84,
          previewUrl: 'staging.10peakstudios.com',
          stages: [
            {
              title: 'Design System',
              subtitle: 'Custom UI crafted in Figma',
              progress: 100,
              statusText: 'Step 01',
              accent: 'violet',
              verified: true,
            },
            {
              title: 'Development',
              subtitle: 'Next.js build, mobile-first, accessible',
              progress: 72,
              statusText: 'Step 02',
              accent: 'lilac',
            },
            {
              title: 'Search Readiness',
              subtitle: 'Metadata, schema, sitemap, speed',
              progress: 58,
              statusText: 'Step 03',
              accent: 'cyan',
            },
          ],
        },
        heroPreviewImage: undefined, // [CONFIRM]: Replace with Cloudinary URL once uploaded ([CLOUDINARY_URL])
        heroPreviewAlt: '10PeakStudio website development interface preview',
      },
    },
    {
      type: 'trustMarquee',
      data: {
        label: 'Built with a modern, production-grade stack',
        items: [
          'Next.js',
          'React',
          'TypeScript',
          'Tailwind CSS',
          'Cloudflare',
          'Cloudinary',
          'Framer Motion',
          'GSAP',
          'Resend',
          'Google Search Console',
        ],
      },
    },
    {
      type: 'problemCards',
      data: {
        eyebrow: 'The problem',
        titleLead: 'Most business websites',
        titleAccent: 'quietly lose customers.',
        items: [
          {
            title: 'Slow to load',
            description: 'Visitors leave before your page appears, especially on mobile data.',
            icon: 'gauge',
            accent: 'violet',
          },
          {
            title: 'Hard to find',
            description: 'No search foundations, so Google and AI assistants never recommend you.',
            icon: 'eye-off',
            accent: 'lilac',
          },
          {
            title: 'Built to look, not to convert',
            description: 'No clear message, no clear next step, no enquiries.',
            icon: 'mouse-pointer-click',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'featureBento',
      data: {
        eyebrow: 'What you get',
        titleLead: 'Everything a',
        titleAccent: 'premium website',
        titleEnd: 'needs.',
        spotlightTile: {
          eyebrow: 'Architectural Design',
          title: 'Custom design, not templates',
          description: 'A unique design system built around your brand and your customers.',
        },
        gaugeTile: {
          eyebrow: 'Core Web Vitals',
          title: 'Performance engineered',
          description:
            'Optimized images, lean JavaScript, and Core Web Vitals targets on every page.',
          centerLabel: '90+ Target',
          caption: 'Static Edge Delivery',
        },
        smallTiles: [
          {
            title: 'Mobile-first and responsive',
            description:
              'Clear typography, touch targets, and responsive layouts on every screen size.',
            icon: 'smartphone',
            accent: 'lilac',
          },
          {
            title: 'SEO foundations built in',
            description:
              'Semantic HTML, structured JSON-LD schema, XML sitemaps, and clean canonicals.',
            icon: 'search-check',
            accent: 'cyan',
          },
          {
            title: 'Contact forms, WhatsApp and booking',
            description:
              'Spam-protected direct inbox leads, WhatsApp links, and clear conversion paths.',
            icon: 'message-square',
            accent: 'violet',
          },
          {
            title: 'CMS so you can edit content',
            description:
              'Straightforward editing workflows to publish posts and update service copy.',
            icon: 'file-edit',
            accent: 'lilac',
          },
          {
            title: 'E-commerce and secure payments',
            description:
              'Modern storefronts integrated with trusted payment gateways and catalog flows.',
            icon: 'lock',
            accent: 'cyan',
          },
          {
            title: 'Analytics and conversion tracking',
            description: 'Consent-respecting GA4 and event measurement without invasive tracking.',
            icon: 'bar-chart-3',
            accent: 'violet',
          },
        ],
      },
    },
    {
      type: 'typeTabs',
      data: {
        eyebrow: 'What we build',
        title: 'The right website for your stage.',
        tabs: [
          {
            id: 'business',
            label: 'Business Websites',
            categoryTag: 'Tier 01 / Core Platform',
            title: 'Business Websites',
            description: 'A credible online home that brings in enquiries.',
            features: ['Service pages', 'Lead forms', 'Google Maps and WhatsApp', 'Local SEO'],
            chips: ['Fast Turnaround', 'Lead Focused', 'Local Search', 'Mobile First'],
            viewportLabel: 'viewport: 1440 x 900',
          },
          {
            id: 'corporate',
            label: 'Corporate Websites',
            categoryTag: 'Tier 02 / Multi-Team',
            title: 'Corporate Websites',
            description:
              'Multi-page web systems engineered for growing organizations, trust, and hiring.',
            features: [
              'Structured service & industry hubs',
              'Case study architecture',
              'Careers & partner pages',
              'Accessibility compliance focus',
            ],
            chips: ['Design System', 'Role Clarity', 'WCAG AA Target', 'Clean Governance'],
            viewportLabel: 'corporate: multi-route',
          },
          {
            id: 'ecommerce',
            label: 'E-commerce Stores',
            categoryTag: 'Tier 03 / Commerce',
            title: 'E-commerce Stores',
            description: 'High-speed storefronts designed for smooth mobile browsing and checkout.',
            features: [
              'Custom catalog & filtering',
              'Payment gateway integration',
              'Order & enquiry workflows',
              'Product schema markup',
            ],
            chips: ['Fast Catalog', 'Mobile Checkout', 'Rich Snippets', 'Scalable'],
            viewportLabel: 'storefront: edge cached',
          },
          {
            id: 'landing',
            label: 'Landing Pages',
            categoryTag: 'Tier 04 / Acquisition',
            title: 'Landing Pages',
            description: 'Focused campaign pages built to convert ad and search traffic cleanly.',
            features: [
              'Fast first paint on mobile',
              'Clear offer & proof hierarchy',
              'Consent-safe event tracking',
              'Direct enquiry & WhatsApp CTAs',
            ],
            chips: ['High Intent', 'Minimal Payload', 'Clear CTA', 'Trackable'],
            viewportLabel: 'campaign: high conversion',
          },
          {
            id: 'portfolio',
            label: 'Portfolio Sites',
            categoryTag: 'Tier 05 / Showcase',
            title: 'Portfolio Sites',
            description:
              'Editorial showcases with refined motion to present engineering or creative work.',
            features: [
              'Case study markdown pipeline',
              'Responsive media optimization',
              'Custom typography & hierarchy',
              'Search & filterable index',
            ],
            chips: ['Case Studies', 'Cloudinary Media', 'Sora Typography', 'Tasteful Motion'],
            viewportLabel: 'showcase: editorial grid',
          },
        ],
      },
    },
    {
      type: 'searchVisibility',
      data: {
        eyebrow: 'Found everywhere',
        titleLead: 'Built to be found on Google and in',
        titleAccent: 'AI answers.',
        lead: 'Search has changed. Customers ask Google, ChatGPT, Gemini and Perplexity. We build every website so search engines and AI assistants can understand, trust and recommend your business.',
        cards: [
          {
            code: 'SEO',
            title: 'Search Engine Optimization',
            description: 'Fast pages, clean structure, metadata, sitemaps and schema.',
            footerLabel: 'Clean Semantic Search Structure',
            icon: 'search',
            accent: 'cyan',
          },
          {
            code: 'GEO',
            title: 'Generative Engine Optimization',
            description: 'Content structured so AI models can cite you accurately.',
            footerLabel: 'AI Citation Readiness',
            icon: 'brain',
            accent: 'lilac',
          },
          {
            code: 'AEO',
            title: 'Answer Engine Optimization',
            description: 'Clear answers to the questions your customers ask.',
            footerLabel: 'Direct Q&A Extraction',
            icon: 'message-circle-question',
            accent: 'violet',
          },
          {
            code: 'AIO',
            title: 'AI Overview Readiness',
            description: 'Structured data and factual entity signals for AI summaries.',
            footerLabel: 'Structured Schema Signals',
            icon: 'sparkles',
            accent: 'lilac',
          },
        ],
        preview: {
          searchHeading: 'Structured Search Result',
          aiHeading: 'AI Synthesis Preview',
          aiBadge: 'Illustrative entity citation format',
        },
      },
    },
    {
      type: 'audienceGrid',
      data: {
        eyebrow: "Who it's for",
        title: 'Websites for businesses ready to grow.',
        items: [
          {
            title: 'Startups & Founders',
            description: 'Launch a credible website and clear product story fast.',
            icon: 'rocket',
            accent: 'violet',
          },
          {
            title: 'Real Estate',
            description: 'Property listings, lead capture and site-visit enquiries.',
            icon: 'building-2',
            accent: 'cyan',
          },
          {
            title: 'Restaurants & Hospitality',
            description: 'Fast mobile menus, direct table enquiry and location discovery.',
            icon: 'utensils',
            accent: 'lilac',
          },
          {
            title: 'E-commerce Brands',
            description: 'Fast storefronts, streamlined checkout and product discoverability.',
            icon: 'shopping-bag',
            accent: 'violet',
          },
          {
            title: 'Healthcare & Clinics',
            description: 'Doctor profiles, appointment request flows and accessible design.',
            icon: 'stethoscope',
            accent: 'cyan',
          },
          {
            title: 'Education & Coaching',
            description: 'Course pages, batch enquiry forms and structured FAQs.',
            icon: 'graduation-cap',
            accent: 'lilac',
          },
          {
            title: 'Professional Services',
            description: 'Clear authority, case studies and consultative lead forms.',
            icon: 'briefcase',
            accent: 'violet',
          },
          {
            title: 'Manufacturing & B2B',
            description: 'Product catalogs, RFQ inquiry workflows and export readiness.',
            icon: 'factory',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'processTimeline',
      data: {
        eyebrow: 'How we work',
        title: 'From idea to launch, without the chaos.',
        steps: [
          {
            number: '01',
            code: '01 DISCOVER',
            title: 'Discover',
            description: 'We learn your business, customers and goals.',
            accent: 'violet',
          },
          {
            number: '02',
            code: '02 DESIGN',
            title: 'Design',
            description: 'You review and approve the design before any code.',
            accent: 'lilac',
          },
          {
            number: '03',
            code: '03 BUILD',
            title: 'Build',
            description: 'We develop in stages with regular previews.',
            accent: 'violet',
          },
          {
            number: '04',
            code: '04 LAUNCH',
            title: 'Launch',
            description: 'Testing, speed and security checks, then go-live.',
            accent: 'cyan',
          },
          {
            number: '05',
            code: '05 GROW',
            title: 'Grow',
            description: 'Support, analytics, SEO and improvements after launch.',
            accent: 'lilac',
          },
        ],
      },
    },
    {
      type: 'performanceSecurity',
      data: {
        speed: {
          eyebrow: 'Engineering Targets',
          title: 'Speed we build for',
          description: 'Every build is audited against Lighthouse targets before launch.',
          footnote: 'Targets on every build',
          gauges: [
            { label: 'Performance', targetValue: 90, displayValue: '90+', accent: 'cyan' },
            { label: 'Accessibility', targetValue: 90, displayValue: '90+', accent: 'violet' },
            { label: 'SEO', targetValue: 90, displayValue: '90+', accent: 'lilac' },
          ],
        },
        security: {
          eyebrow: 'Hardened Architecture',
          title: 'Secure by default',
          description: 'Practical security safeguards built into the delivery stack.',
          items: [
            { label: 'HTTPS everywhere', icon: 'shield-check' },
            { label: 'Cloudflare protection', icon: 'cloud' },
            { label: 'Spam-protected forms', icon: 'mail-check' },
            { label: 'Secrets kept out of code', icon: 'key-round' },
            { label: 'Regular updates', icon: 'refresh-cw' },
          ],
          linkLabel: 'See our Security approach',
          linkHref: '/security',
        },
      },
    },
    {
      type: 'packages',
      data: {
        eyebrow: 'Packages',
        title: 'Clear packages. No surprises.',
        footnote: 'Final pricing depends on scope. Every project starts with a free consultation.',
        tiers: [
          {
            id: 'launch',
            name: 'Launch',
            subtitle: 'For new businesses',
            price: '₹[PLACEHOLDER]',
            priceConfirmed: false, // [CONFIRM]: Set price and flip priceConfirmed to true
            fallbackPrice: 'Custom quote',
            scopeNote: 'Up to [X] pages',
            scopeConfirmed: false, // [CONFIRM]: Set real page count and flip scopeConfirmed to true
            resolvedScopeFirstItem: 'Focused multi-page website',
            features: [
              'Mobile-first design',
              'Basic SEO foundations',
              'Contact form and WhatsApp',
              '1 month post-launch support',
            ],
            ctaLabel: 'Get a quote',
            ctaHref: '/contact?service=website-development',
          },
          {
            id: 'growth',
            name: 'Growth',
            subtitle: 'For growing businesses',
            price: '₹[PLACEHOLDER]',
            priceConfirmed: false, // [CONFIRM]: Set price and flip priceConfirmed to true
            fallbackPrice: 'Custom quote',
            featured: true,
            badgeText: 'Most popular',
            scopeNote: 'Up to [X] pages',
            scopeConfirmed: false, // [CONFIRM]: Set real page count and flip scopeConfirmed to true
            resolvedScopeFirstItem: 'Expanded multi-page site',
            features: [
              'Custom design system',
              'Full SEO + GEO setup',
              'CMS integration',
              'Consent-safe analytics',
              '3 months post-launch support',
            ],
            ctaLabel: 'Start a project',
            ctaHref: '/contact?service=website-development',
          },
          {
            id: 'custom',
            name: 'Custom',
            subtitle: 'For complex or e-commerce sites',
            price: 'Custom quote',
            priceConfirmed: true,
            fallbackPrice: 'Custom quote',
            scopeConfirmed: true,
            resolvedScopeFirstItem: 'E-commerce storefront or custom architecture',
            features: [
              'Third-party integrations',
              'Multi-language support',
              'Performance engineering',
              'Priority support options',
            ],
            ctaLabel: 'Talk to us',
            ctaHref: '/contact?service=website-development',
          },
        ],
      },
    },
    {
      type: 'workTeaser',
      data: {
        eyebrow: 'Our work',
        title: 'See how we build.',
        cardEyebrow: 'Case Archives',
        cardTitle: 'Explore our case studies',
        cardDescription: 'Real projects, explained as engineering case studies.',
        ctaLabel: 'View portfolio',
        ctaHref: '/portfolio',
        workImage: undefined, // [CONFIRM]: Replace with Cloudinary URL once uploaded ([CLOUDINARY_URL])
        workImageAlt: 'Selected engineering case study preview',
      },
    },
    {
      type: 'serviceFaq',
      data: {
        eyebrow: 'FAQ',
        title: 'Frequently asked questions.',
        items: [
          {
            id: 'timeline',
            question: 'How long does a website take?',
            answer: 'It depends on scope. You get a clear timeline in your proposal.',
            published: true,
          },
          {
            id: 'cms',
            question: 'Can I update the website myself?',
            answer: 'Yes. We can set up a simple CMS so you can edit content.',
            published: true,
          },
          {
            id: 'seo',
            question: 'Will my website rank on Google?',
            answer:
              'We build strong search foundations. Rankings depend on content, competition and time, and no honest agency can guarantee position one.',
            published: true,
          },
          {
            id: 'ecommerce',
            question: 'Do you build e-commerce websites?',
            answer: 'Yes, including catalogs, cart, checkout and payment gateways.',
            published: true,
          },
          {
            id: 'hosting',
            question: 'Do you provide hosting and maintenance?',
            answer: 'Yes, we offer support and maintenance plans after launch.',
            published: true,
          },
          {
            id: 'ownership',
            question: 'Who owns the website?',
            answer: '[PLACEHOLDER: ownership policy]', // [CONFIRM]: Fill policy and set published: true
            published: false,
          },
        ],
      },
    },
    {
      type: 'serviceCta',
      data: {
        eyebrow: 'Ready when you are',
        titleLead: 'Have an idea?',
        titleAccent: "Let's build it.",
        description: 'Tell us about your project and get a free consultation.',
        primaryLabel: 'Start a project',
        whatsappLabel: 'Chat on WhatsApp',
      },
    },
  ],
};
