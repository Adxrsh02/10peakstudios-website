import type { ServicePageContent } from './types';

/**
 * Digital Marketing Service Content (PRD 8.3 + Stitch "Dark Glass Aurora" export).
 * Uses the composable `sections[]` architecture.
 *
 * [CONFIRM] Items kept hidden (`published: false` or omitted) in production until confirmed:
 * - Client account/ad-account ownership policy and FAQ #5 (`published: false`)
 * - Retainer contract/lock-in terms ("no long contracts" / "no long lock-ins" omitted)
 * - Tier pricing (all 3 plans render `fallbackPrice`: "Custom quote" until `priceConfirmed: true`)
 * - seo.ogImage falls back to '/og/home.png' until dedicated Digital Marketing OG art is uploaded.
 */
export const digitalMarketingContent: ServicePageContent = {
  slug: 'digital-marketing',
  theme: 'glass',
  stickyCta: {
    label: 'Free audit',
    href: '/contact?service=digital-marketing',
  },
  seo: {
    title: 'Digital Marketing, SEO, GEO & AEO',
    description:
      'SEO, AEO, GEO, AIO, Google Business Profile and performance campaigns built by 10PeakStudio with clean measurement and transparent reporting.',
    ogImage: '/og/home.png',
    indexable: true,
  },
  sections: [
    {
      type: 'signalHero',
      data: {
        eyebrowPillar: 'Grow',
        eyebrowService: 'Digital Marketing Architecture',
        titleLead: 'Get found on Google.',
        titleAccent: 'Get recommended by AI.',
        summary:
          'Your customers don’t just search anymore. They ask. We structure your website, local profiles and citations so you show up in search results and generative AI answers.',
        simulatorTitle: 'Live brand simulator',
        simulatorTag: 'Client-side preview',
        brandLabel: 'Try it with your brand',
        brandPlaceholder: 'e.g. Your Brand',
        defaultBrand: 'Your Brand',
        cityLabel: 'Target city',
        cityPlaceholder: 'e.g. Navi Mumbai',
        defaultCity: 'Navi Mumbai',
        submitLabel: 'Show my visibility',
        secondaryCtaLabel: 'Take 2-min self-check',
        secondaryCtaHref: '#audit-section',
        tertiaryCtaLabel: 'How it works',
        tertiaryCtaHref: '#visibility-ladder',
        privacyNote: 'Simulated preview. No data is sent or stored.',
        radarBadges: [
          { label: 'Organic Search', icon: 'search', tone: 'cyan' },
          { label: 'AI Assistants', icon: 'brain', tone: 'violet' },
          { label: 'Maps & Local', icon: 'map-pin', tone: 'lilac' },
          { label: 'Paid Campaigns', icon: 'target', tone: 'cyan' },
        ],
      },
    },
    {
      type: 'visibilityLadder',
      data: {
        eyebrow: 'The four levels of visibility',
        titleLead: 'Being listed',
        titleAccent: 'isn’t enough anymore.',
        lead: 'Search has evolved from ranked blue links to direct answers, conversational recommendations and agent actions. Inspect how your brand moves through each tier.',
        stages: [
          {
            id: 'seo',
            stepNumber: '01',
            code: 'SEO',
            title: 'SEO · Search List',
            shortTagline: 'Appear in ranked organic search listings.',
            stageCode: 'STAGE 01 · ORGANIC SEARCH',
            queryTemplate: 'best service provider in {city}',
            simulatedLabel: 'Simulated preview',
            explanationTitle: '01 SEO',
            explanation:
              'Search engine optimization strengthens site structure, local citations and speed so people searching for what you offer can find and click your page.',
            accent: 'violet',
          },
          {
            id: 'aeo',
            stepNumber: '02',
            code: 'AEO',
            title: 'AEO · Answer Engine',
            shortTagline: 'Become the clear extracted direct answer.',
            stageCode: 'STAGE 02 · DIRECT ANSWER SNIPPET',
            queryTemplate: 'questions customers ask in {city}',
            simulatedLabel: 'Simulated preview',
            explanationTitle: '02 AEO',
            explanation:
              'Answer engine optimization structures key service questions cleanly so Google snippets and zero-click answer boxes quote your explanation verbatim.',
            accent: 'cyan',
          },
          {
            id: 'geo',
            stepNumber: '03',
            code: 'GEO',
            title: 'GEO · Generative AI',
            shortTagline: 'Earn citations in conversational AI replies.',
            stageCode: 'STAGE 03 · GENERATIVE AI CHAT',
            queryTemplate: 'recommended local providers in {city}',
            simulatedLabel: 'Simulated preview',
            explanationTitle: '03 GEO',
            explanation:
              'Generative engine optimization builds authoritative service pages and consistent external mentions so assistants like ChatGPT, Gemini and Perplexity cite you with confidence.',
            accent: 'lilac',
          },
          {
            id: 'aio',
            stepNumber: '04',
            code: 'AIO',
            title: 'AIO · AI Optimization',
            shortTagline: 'Structured, consistent data AI agents can act on.',
            stageCode: 'STAGE 04 · MACHINE-READABLE AGENTS',
            queryTemplate: 'verified booking workflow in {city}',
            simulatedLabel: 'Simulated preview',
            explanationTitle: '04 AIO',
            explanation:
              'AI optimization pairs structured Schema.org data with consistent hours, offerings and booking endpoints so AI agents can understand, trust and act on your business.',
            accent: 'violet',
          },
        ],
        summaryFormula: [
          { code: 'SEO', text: 'gets you listed', tone: 'cyan' },
          { code: 'AEO', text: 'gets you answered', tone: 'lilac' },
          { code: 'GEO', text: 'gets you recommended', tone: 'violet' },
          { code: 'AIO', text: 'lets AI act for you', tone: 'cyan' },
        ],
        summaryCtaLabel: 'Check your current level',
        summaryCtaHref: '#audit-section',
      },
    },
    {
      type: 'visibilityQuiz',
      data: {
        eyebrow: 'Free self-check',
        title: 'How visible is your brand today?',
        lead: 'Answer 10 diagnostic questions to get an instant score out of 100 and see your highest-impact gaps. Calculated locally in your browser.',
        questions: [
          {
            id: 'q1-nap',
            tag: 'NAP Sync',
            question:
              'Are your phone number and address identical across Google, JustDial, and Apple Maps?',
            detail:
              'Inconsistent suite numbers, abbreviations or old phone digits split local authority signals.',
            gapRecommendation: 'Standardize Name, Address and Phone (NAP) across local directories',
            priority: 2,
          },
          {
            id: 'q2-media',
            tag: 'GBP Media',
            question:
              'Have you uploaded high-resolution geo-tagged photos to your profile within the last 14 days?',
            detail:
              'Regular visual updates show active business operations across maps and local search packs.',
            gapRecommendation:
              'Publish fresh location photos and updates on Google Business Profile',
            priority: 6,
          },
          {
            id: 'q3-speed',
            tag: 'Mobile Speed',
            question:
              'Does your mobile web page load completely in under 2.5 seconds on a 4G connection?',
            detail:
              'Slow mobile experiences cause visitors to abandon before reading your offer or submitting an enquiry.',
            gapRecommendation: 'Improve mobile load speed and Core Web Vitals targets',
            priority: 4,
          },
          {
            id: 'q4-pages',
            tag: 'Service URLs',
            question:
              'Does your website have a dedicated, content-rich landing page for each distinct service you provide?',
            detail:
              'Search engines and AI assistants struggle to recommend multi-service companies when everything sits on one generic homepage.',
            gapRecommendation:
              'Build dedicated landing pages with clear scope for each core service',
            priority: 5,
          },
          {
            id: 'q5-schema',
            tag: 'Schema JSON-LD',
            question: 'Is your site injected with structured Schema.org JSON-LD business data?',
            detail:
              'Structured schema helps search crawlers and AI systems verify your services, hours and area served cleanly.',
            gapRecommendation:
              'Implement structured JSON-LD Schema.org organization and service data',
            priority: 3,
          },
          {
            id: 'q6-faq',
            tag: 'AEO FAQs',
            question:
              'Do you have clear FAQs that directly answer real questions asked by your customers?',
            detail:
              'Answer engines extract concise, well-formatted Q&A blocks directly into zero-click summaries.',
            gapRecommendation:
              'Add explicit FAQ answers so search and AI bots quote you accurately',
            priority: 1,
          },
          {
            id: 'q7-reviews',
            tag: 'Reviews',
            question: 'Do you actively generate fresh, genuine customer reviews every month?',
            detail:
              'Steady review velocity reinforces buyer confidence and local search consistency.',
            gapRecommendation:
              'Set up an ethical, consistent review request workflow for happy clients',
            priority: 7,
          },
          {
            id: 'q8-bots',
            tag: 'AI Crawling',
            question:
              'Is your robots.txt file configured to permit safe crawling by search engines and AI assistants?',
            detail:
              'Overly strict blocks prevent AI search crawlers from indexing your verified pages.',
            gapRecommendation: 'Audit robots.txt and XML sitemaps so public pages remain indexable',
            priority: 8,
          },
          {
            id: 'q9-citations',
            tag: 'Citations',
            question:
              'Is your brand cited in reputable local publications, industry directories or portals?',
            detail:
              'Independent third-party mentions strengthen trust when generative assistants evaluate who to recommend.',
            gapRecommendation:
              'Build genuine third-party citations across trusted industry portals',
            priority: 9,
          },
          {
            id: 'q10-booking',
            tag: 'Online Booking',
            question:
              'Can customers directly schedule visits or submit structured enquiries through an online flow?',
            detail:
              'Clear conversion flows help both human visitors and assistive tools act without phone tag.',
            gapRecommendation:
              'Streamline enquiry and appointment booking directly on key landing pages',
            priority: 10,
          },
        ],
        levels: [
          {
            level: 'Invisible',
            badge: 'Stage: Level 1',
            minScore: 0,
            maxScore: 29,
            summary:
              'Your brand is difficult to locate on both local search listings and AI assistants. Start with core profile accuracy and dedicated service pages.',
          },
          {
            level: 'Listed',
            badge: 'Stage: Level 2',
            minScore: 30,
            maxScore: 54,
            summary:
              'You appear in basic search listings, but missing structured answers and schema hold back recommendations.',
          },
          {
            level: 'Answered',
            badge: 'Stage: Level 3',
            minScore: 55,
            maxScore: 79,
            summary:
              'Strong foundation on search. Adding explicit FAQ schema and verified citations will push AI assistants to recommend you.',
          },
          {
            level: 'Recommended',
            badge: 'Stage: Level 4',
            minScore: 80,
            maxScore: 100,
            summary:
              'Well-structured across search, local maps and machine-readable signals. Focus on ongoing freshness and paid conversion efficiency.',
          },
        ],
        ctaLabel: 'Get my full audit →',
      },
    },
    {
      type: 'trafficFlow',
      data: {
        eyebrow: 'How brands get customers',
        title: 'Traffic isn’t luck. It’s a system.',
        lead: 'Switch business model below to see how search, AI answers, maps, content and ads work together into real enquiries.',
        exampleNote: 'Example mix. Every business is different.',
        hubTitle: 'Your Digital Hub',
        hubSubtitle: 'High-Conversion Core',
        hubFootnote: 'Structured Schema & Fast Delivery',
        types: [
          {
            id: 'product-brand',
            label: 'Product brand',
            sources: [
              { id: 'search', label: 'Google Search', weight: 30, icon: 'search', tone: 'cyan' },
              {
                id: 'ai',
                label: 'AI Assistants (ChatGPT / Perplexity)',
                weight: 18,
                icon: 'brain',
                tone: 'violet',
              },
              {
                id: 'social',
                label: 'Social Media & Reels',
                weight: 26,
                icon: 'film',
                tone: 'lilac',
              },
              {
                id: 'ads',
                label: 'Paid Meta & Search Ads',
                weight: 20,
                icon: 'target',
                tone: 'cyan',
              },
              {
                id: 'maps',
                label: 'Maps & Directories',
                weight: 6,
                icon: 'map-pin',
                tone: 'lilac',
              },
            ],
            outcomes: [
              {
                id: 'checkout',
                title: 'Storefront Orders',
                detail: 'Direct product purchases & cart recovery',
                icon: 'shopping-bag',
                tone: 'cyan',
              },
              {
                id: 'enquiries',
                title: 'Bulk & Wholesale Enquiries',
                detail: 'Qualified dealer requests via form',
                icon: 'message-square',
                tone: 'violet',
              },
              {
                id: 'repeat',
                title: 'Repeat Brand Discovery',
                detail: 'Organic & AI product comparisons',
                icon: 'trending-up',
                tone: 'lilac',
              },
            ],
          },
          {
            id: 'local-service',
            label: 'Local service',
            sources: [
              {
                id: 'search',
                label: 'Google Search Engine',
                weight: 36,
                icon: 'search',
                tone: 'cyan',
              },
              {
                id: 'maps',
                label: 'Maps & Local Pack',
                weight: 34,
                icon: 'map-pin',
                tone: 'violet',
              },
              {
                id: 'ai',
                label: 'AI Assistants (Perplexity / ChatGPT)',
                weight: 14,
                icon: 'brain',
                tone: 'lilac',
              },
              {
                id: 'social',
                label: 'Social Media & Short Video',
                weight: 8,
                icon: 'film',
                tone: 'cyan',
              },
              {
                id: 'ads',
                label: 'Paid Local Lead Ads',
                weight: 8,
                icon: 'target',
                tone: 'violet',
              },
            ],
            outcomes: [
              {
                id: 'calls',
                title: 'Direct Phone & WhatsApp Calls',
                detail: 'From high-intent mobile searches',
                icon: 'phone-call',
                tone: 'cyan',
              },
              {
                id: 'bookings',
                title: 'Online Calendar Bookings',
                detail: 'Through structured web forms & links',
                icon: 'calendar-check',
                tone: 'violet',
              },
              {
                id: 'visits',
                title: 'In-Person Visits',
                detail: 'Directions tapped via Google Maps',
                icon: 'map-pin',
                tone: 'lilac',
              },
            ],
          },
          {
            id: 'b2b-saas',
            label: 'B2B / SaaS',
            sources: [
              {
                id: 'search',
                label: 'Solution & Comparison Search',
                weight: 34,
                icon: 'search',
                tone: 'cyan',
              },
              {
                id: 'ai',
                label: 'AI Assistants & Research Prompts',
                weight: 24,
                icon: 'brain',
                tone: 'violet',
              },
              {
                id: 'social',
                label: 'LinkedIn & Educational Content',
                weight: 18,
                icon: 'file-text',
                tone: 'lilac',
              },
              {
                id: 'ads',
                label: 'High-Intent Search Ads',
                weight: 18,
                icon: 'target',
                tone: 'cyan',
              },
              { id: 'maps', label: 'Partner Directories', weight: 6, icon: 'globe', tone: 'lilac' },
            ],
            outcomes: [
              {
                id: 'demos',
                title: 'Qualified Demo Requests',
                detail: 'Decision-makers matching your ICP',
                icon: 'calendar-check',
                tone: 'violet',
              },
              {
                id: 'proposals',
                title: 'Written Scope Briefs',
                detail: 'Clear pre-qualified project leads',
                icon: 'file-text',
                tone: 'cyan',
              },
              {
                id: 'trials',
                title: 'Direct Product Signups',
                detail: 'Self-serve onboarding pipeline',
                icon: 'rocket',
                tone: 'lilac',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'growthControlRoom',
      data: {
        eyebrow: 'What we do',
        title: 'Every channel, working together.',
        lead: 'No disconnected silos. Explore the eight coordinated disciplines inside our growth engine.',
        hubTitle: '10Peak Growth',
        hubSubtitle: 'Unified System',
        nodes: [
          {
            id: 'technical-seo',
            number: '01',
            shortLabel: 'Technical SEO',
            title: '01 Technical SEO',
            summary:
              'Core site fixes, dedicated service pages, internal linking and fast load performance.',
            deliverables: [
              'Indexation audit & sitemap cleanup',
              'Dedicated high-intent service landing pages',
              'Core Web Vitals speed engineering',
            ],
            icon: 'search-check',
            accent: 'cyan',
          },
          {
            id: 'aeo',
            number: '02',
            shortLabel: 'AEO Answers',
            title: '02 Answer Engine (AEO)',
            summary:
              'Question-and-answer structures built clearly for Google snippets and answer boxes.',
            deliverables: [
              'Customer question cluster mapping',
              'Concise verifiable answer blocks',
              'FAQPage schema markup',
            ],
            icon: 'message-circle-question',
            accent: 'lilac',
          },
          {
            id: 'geo',
            number: '03',
            shortLabel: 'GEO Citations',
            title: '03 Generative Engine (GEO)',
            summary:
              'Consistent entity pages and third-party web mentions that AI models cite accurately.',
            deliverables: [
              'Entity consistency audit across portals',
              'Detailed proof & documentation copy',
              'AI crawler accessibility checks',
            ],
            icon: 'brain',
            accent: 'violet',
          },
          {
            id: 'aio',
            number: '04',
            shortLabel: 'AIO Schema',
            title: '04 Agent Structuring (AIO)',
            summary:
              'Machine-readable JSON-LD metadata so assistants parse your offerings, areas and actions reliably.',
            deliverables: [
              'Deep Service & Organization JSON-LD',
              'Clear action URLs & booking endpoints',
              'Consistent NAP & service area specs',
            ],
            icon: 'code-2',
            accent: 'cyan',
          },
          {
            id: 'gbp',
            number: '05',
            shortLabel: 'Google Profile',
            title: '05 Google Profile (GBP)',
            summary:
              'Complete profile hygiene, accurate categories, photo updates and ethical review workflows.',
            deliverables: [
              'Primary & secondary category tuning',
              'Regular geo-relevant profile updates',
              'Consistent genuine review workflow',
            ],
            icon: 'map-pin',
            accent: 'violet',
          },
          {
            id: 'social',
            number: '06',
            shortLabel: 'Social Video',
            title: '06 Social Authority',
            summary:
              'Focused short-form educational clips and social assets tailored to customer trust.',
            deliverables: [
              'Monthly content calendar planning',
              'Educational reel & visual asset production',
              'Clear calls to enquire or book',
            ],
            icon: 'film',
            accent: 'lilac',
          },
          {
            id: 'ads',
            number: '07',
            shortLabel: 'Search & Meta Ads',
            title: '07 Performance Ads',
            summary:
              'Focused Google and Meta campaigns targeting qualified enquiries instead of vanity impressions.',
            deliverables: [
              'High-intent keyword & negative list setup',
              'Aligned fast landing page messaging',
              'Consent-respecting conversion events',
            ],
            icon: 'target',
            accent: 'cyan',
          },
          {
            id: 'reporting',
            number: '08',
            shortLabel: 'Clear Reports',
            title: '08 Plain-Language Reports',
            summary:
              'Monthly debriefs summarizing work completed, qualified enquiries and upcoming priorities.',
            deliverables: [
              'Human-readable executive summary',
              'Qualified enquiry & call tracking breakdown',
              'Next month action roadmap',
            ],
            icon: 'bar-chart-3',
            accent: 'violet',
          },
        ],
      },
    },
    {
      type: 'codeFlip',
      data: {
        eyebrow: 'Behind the scenes',
        title: 'We write for people. We structure it for machines.',
        lead: 'Toggle between how a human visitor reads your answer and how Schema.org JSON-LD exposes the exact same facts to Google, ChatGPT, Claude and Perplexity.',
        filename: 'faq-entity-preview.jsonld',
        humanQuestion: 'Do you optimize websites for both traditional search and AI assistants?',
        humanAnswer:
          'Yes. We pair fast semantic HTML and clear Q&A copy with structured Schema.org JSON-LD markup, so search crawlers and generative assistants read accurate services, hours and contact actions.',
        humanMeta: [
          'Clear direct answer format',
          'Plain human phrasing',
          'Matches FAQPage schema verbatim',
        ],
        jsonLdLines: [
          { indent: 0, value: '{', isPunctuation: true },
          { indent: 1, key: '@context', value: '"https://schema.org",' },
          { indent: 1, key: '@type', value: '"FAQPage",' },
          { indent: 1, key: 'mainEntity', value: '[{' },
          { indent: 2, key: '@type', value: '"Question",' },
          {
            indent: 2,
            key: 'name',
            value: '"Do you optimize websites for both traditional search and AI assistants?",',
          },
          { indent: 2, key: 'acceptedAnswer', value: '{' },
          { indent: 3, key: '@type', value: '"Answer",' },
          {
            indent: 3,
            key: 'text',
            value:
              '"Yes. We pair fast semantic HTML and clear Q&A copy with structured Schema.org JSON-LD markup."',
          },
          { indent: 2, value: '}', isPunctuation: true },
          { indent: 1, value: '}]', isPunctuation: true },
          { indent: 0, value: '}', isPunctuation: true },
        ],
        footnote:
          'Same truth, zero duplication. Clean HTML for people paired with exact structured data for machines.',
      },
    },
    {
      type: 'trustNeverAlways',
      data: {
        eyebrow: 'Honest marketing',
        titleLead: "We can't promise #1. Anyone who does is",
        titleAccent: 'guessing.',
        lead: 'Search positions and AI recommendations depend on competition, domain history and consistent execution. Here is how we operate.',
        neverTitle: "What We'll Never Do",
        neverItems: [
          'Buy fake reviews or automated engagement',
          'Purchase spam link packages that risk search penalties',
          'Promise guaranteed "#1 rankings in 7 days"',
          'Hide what engineering or content tasks happened each month',
          'Pad reports with vanity impressions instead of qualified enquiries',
        ],
        alwaysTitle: 'What We Always Do',
        alwaysItems: [
          'Document every technical fix, page update and schema change clearly',
          'Summarize results in plain language without jargon',
          'Follow published Search Engine and white-hat content guidelines',
          'Configure privacy-first, consent-respecting analytics measurement',
          'Tell you candidly when a channel underperforms so we can pivot fast',
        ],
      },
    },
    {
      type: 'reportPreview',
      data: {
        eyebrow: 'Reporting',
        title: "You'll always know what your budget did.",
        lead: 'No bloated spreadsheets. Your monthly debrief highlights qualified enquiries, search health, AI citations and next actions.',
        reportTitle: 'Monthly Growth Summary',
        reportSubtitle: 'Sample Business · Illustrative Reporting Format',
        sampleBadge: 'Sample report',
        kpis: [
          {
            label: 'Visibility Stage',
            value: 'Stage 3',
            note: 'Answer + Citation readiness',
            tone: 'violet',
          },
          {
            label: 'Enquiry Sources',
            value: 'Forms & Calls',
            note: 'Tagged by landing page & channel',
            tone: 'cyan',
          },
          {
            label: 'Top Discovery Theme',
            value: 'Local Intent',
            note: 'Service + city query alignment',
            tone: 'lilac',
          },
          {
            label: 'Technical Hygiene',
            value: 'Monitored',
            note: 'Schema, sitemaps & speed targets',
            tone: 'cyan',
          },
        ],
        aiSweepTitle: 'AI Recommendation Check (Sample):',
        aiPlatforms: [
          { platform: 'Google', status: 'Structured', tone: 'cyan' },
          { platform: 'ChatGPT', status: 'Tracked', tone: 'violet' },
          { platform: 'Gemini', status: 'Tracked', tone: 'lilac' },
          { platform: 'Perplexity', status: 'Tracked', tone: 'cyan' },
        ],
        highlights: [
          'Plain-language summary of completed work',
          'Qualified enquiry attribution over vanity clicks',
          'Prioritized roadmap for the coming cycle',
        ],
      },
    },
    {
      type: 'signalPath',
      data: {
        eyebrow: 'How we work',
        title: 'A clear plan, stage by stage.',
        lead: 'Structured progression from technical baseline audit to repeatable organic and paid growth.',
        steps: [
          {
            number: '01',
            title: 'Audit',
            description:
              'Check where you stand across Google search, Maps, schema markup and AI assistant visibility.',
            phaseLabel: 'Phase 1 · Baseline',
            accent: 'violet',
          },
          {
            number: '02',
            title: 'Fix',
            description:
              'Clean broken listings, indexation blockers, slow mobile pages and profile inaccuracies.',
            phaseLabel: 'Phase 2 · Hygiene',
            accent: 'cyan',
          },
          {
            number: '03',
            title: 'Build',
            description:
              'Publish dedicated service pages, structured FAQ blocks and Schema.org entity metadata.',
            phaseLabel: 'Phase 3 · Structure',
            accent: 'lilac',
          },
          {
            number: '04',
            title: 'Amplify',
            description:
              'Roll out consistent local posts, visual content and focused Search & Meta lead campaigns.',
            phaseLabel: 'Phase 4 · Reach',
            accent: 'violet',
          },
          {
            number: '05',
            title: 'Measure',
            description:
              'Review real enquiry quality, refine underperforming channels and plan next-cycle priorities.',
            phaseLabel: 'Phase 5 · Ongoing',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'growthSpeedSlider',
      data: {
        eyebrow: 'Plans',
        title: 'Start where you are.',
        lead: 'Slide between engagement scopes tailored to your current stage. Every scope begins with a free baseline audit.',
        sliderLabel: 'Select growth scope',
        plans: [
          {
            id: 'get-found',
            tierLabel: 'Tier 01',
            title: 'Get Found',
            subtitle: 'Technical SEO, Google Business Profile and local discovery fundamentals.',
            price: 'Custom quote',
            priceConfirmed: false,
            fallbackPrice: 'Custom quote',
            billingCaption: 'Scoped monthly after baseline audit',
            features: [
              'Technical site & indexation audit',
              'Google Business Profile optimization',
              'Local citation & NAP consistency sync',
              'Plain-language monthly debrief',
            ],
            ctaLabel: 'Request scope',
            ctaHref: '/contact?service=digital-marketing',
            accent: 'cyan',
          },
          {
            id: 'get-recommended',
            tierLabel: 'Tier 02 · Full Visibility',
            title: 'Get Recommended',
            subtitle: 'Everything in Get Found, plus AEO, GEO and AIO structured data systems.',
            price: 'Custom quote',
            priceConfirmed: false,
            fallbackPrice: 'Custom quote',
            billingCaption: 'Scoped monthly · Search + AI optimization',
            popular: true,
            badgeText: 'Most popular',
            features: [
              'Everything in Get Found',
              'AEO customer Q&A content architecture',
              'GEO citation & authority footprint tuning',
              'Schema.org JSON-LD entity structuring',
              'Ongoing technical & search check-ins',
            ],
            ctaLabel: 'Choose plan',
            ctaHref: '/contact?service=digital-marketing',
            accent: 'violet',
          },
          {
            id: 'full-growth',
            tierLabel: 'Tier 03',
            title: 'Full Growth',
            subtitle:
              'Complete system combining search visibility, social content and paid lead campaigns.',
            price: 'Custom quote',
            priceConfirmed: false,
            fallbackPrice: 'Custom quote',
            billingCaption: 'Complete multi-channel scope',
            features: [
              'Everything in Get Recommended',
              'Content calendar & short-form creative guidance',
              'Google & Meta campaign management',
              'Dedicated monthly roadmap planning',
            ],
            ctaLabel: 'Request scope',
            ctaHref: '/contact?service=digital-marketing',
            accent: 'lilac',
          },
        ],
        footnote:
          'Ad spend is paid directly to advertising platforms and is not included. Every partnership starts with a free visibility review.',
      },
    },
    {
      type: 'serviceFaq',
      data: {
        eyebrow: 'Frequently asked',
        title: 'Frequently asked questions.',
        items: [
          {
            id: 'guarantee-top-rank',
            question: 'Can you guarantee #1 on Google or ChatGPT?',
            answer:
              'No honest agency can guarantee a specific ranking because search engines and AI systems update constantly and consider market competition. We focus on technical structure, clean entity signals and high-intent content that put your brand in the strongest factual position.',
            published: true,
          },
          {
            id: 'seo-aeo-geo-aio-diff',
            question: 'What is the difference between SEO, AEO, GEO and AIO?',
            answer:
              'SEO helps your pages appear in search results. AEO organizes Q&A answers for direct snippets. GEO strengthens authoritative mentions so conversational AI assistants recommend your brand. AIO adds consistent, structured business data so AI agents can understand and act on your details.',
            published: true,
          },
          {
            id: 'time-to-results',
            question: 'How long until we see measurable impact?',
            answer:
              'Google Business Profile fixes and paid campaigns typically show initial movement faster than organic SEO. Broader organic search and AI assistant recommendations compound progressively as search crawlers and AI systems re-index improved pages and citations.',
            published: true,
          },
          {
            id: 'ad-spend-included',
            question: 'Is ad spend included in the monthly retainer?',
            answer:
              'No. Your advertising media budget is paid directly to Google or Meta. Our fee covers campaign strategy, targeting structure, landing page alignment, copy and conversion tracking without marking up media spend.',
            published: true,
          },
          {
            id: 'account-ownership',
            question: 'Do we keep full ownership of our accounts?',
            answer: '[CONFIRM]',
            published: false,
          },
          {
            id: 'outside-mumbai',
            question: 'Do you work with businesses outside Mumbai?',
            answer:
              'Yes. We work with businesses across India and globally through remote workshops, shared staging reviews and clear monthly reporting cycles.',
            published: true,
          },
        ],
      },
    },
    {
      type: 'serviceCta',
      data: {
        eyebrow: 'Initiate the signal',
        titleLead: "Let's make your brand",
        titleAccent: 'the one they recommend.',
        description:
          'Request a free visibility audit. We will review how your business shows up on Search and AI today and outline what to fix first.',
        primaryLabel: 'Get my free audit',
        whatsappLabel: 'Chat on WhatsApp',
        variant: 'signal',
      },
    },
  ],
};
