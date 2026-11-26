import type { ServicePageContent } from './types';

/**
 * Full-Stack Web Applications Service Content (PRD 8.3 + Stitch "Dark Glass Aurora" export).
 * Uses the composable `sections[]` architecture.
 *
 * [CONFIRM] Items supplied safely or withheld behind published/confirmed flags:
 * - Engagement models display "Custom quote" until confirmed figures are supplied.
 * - Growth path Stage 01 displays fallback badge until sprint week count is confirmed.
 * - NDA and Code Ownership FAQs remain `published: false` until confirmed.
 * - Regular demo cadence stays neutral ("Regular demos on a staging link").
 * - Warranty copy uses "Post-launch bug-fix support included".
 * - seo.ogImage falls back to '/og/home.png' until dedicated web-app OG artwork is uploaded.
 */
export const webAppDevelopmentContent: ServicePageContent = {
  slug: 'web-app-development',
  theme: 'glass',
  seo: {
    title: 'Full-Stack Web Application Development',
    description:
      'Custom SaaS platforms, CRMs, admin dashboards, customer portals and internal tools engineered by 10PeakStudio with clean documentation.',
    ogImage: '/og/home.png',
    indexable: true,
  },
  sections: [
    {
      type: 'appWindowHero',
      data: {
        eyebrowPillar: 'Build',
        eyebrowService: 'Full-Stack Web Applications',
        titleLead: 'Software built around',
        titleAccent: 'how your business actually runs.',
        summary:
          "SaaS platforms, CRMs, dashboards and customer portals. We design them with your team, build them on a stack that grows with your users, and document everything so you're never stuck.",
        primaryCtaLabel: 'Start a project',
        secondaryCtaLabel: 'See how we build',
        secondaryCtaHref: '#sprint-board',
        highlights: [
          'Secure sign-in',
          'Role-based access',
          'Real-time data',
          'Clean, documented code',
        ],
        windowUrl: 'app.internal/dashboard',
        userInitials: 'TP',
        sampleLabel: 'Sample data',
        navItems: ['Dashboard', 'Orders', 'Customers', 'Invoices', 'Reports', 'Settings'],
        kpis: [
          { label: 'Orders today', value: '128', meta: '+14% sample', tone: 'cyan' },
          { label: 'Collections', value: '₹2.4L', meta: 'Synced', tone: 'violet' },
          { label: 'Queued items', value: '9', meta: 'Pending', tone: 'lilac' },
        ],
        chartTitle: 'Operational Volume Overview',
        chartTag: 'Sample view',
        orders: [
          { id: '#1042', label: 'Enterprise Account', status: 'Paid', tone: 'emerald' },
          { id: '#1041', label: 'Retail Partner', status: 'Pending', tone: 'amber' },
          { id: '#1040', label: 'Distribution Order', status: 'Dispatched', tone: 'lilac' },
        ],
        toasts: [
          { title: 'Invoice #1042 settled', detail: '₹34,800', tone: 'emerald' },
          { title: 'New booking confirmed', detail: 'Verified', tone: 'lilac' },
        ],
        heroMockImage: undefined,
        heroMockAlt: '10PeakStudio full-stack web application dashboard preview',
      },
    },
    {
      type: 'beforeAfterSlider',
      data: {
        eyebrow: 'The real problem',
        titleLead: 'Your business runs on five tools that',
        titleAccent: "don't talk to each other.",
        dragLabel: 'Drag to compare',
        before: {
          badge: 'BEFORE: Fragmented Workflow',
          tag: 'Common daily bottlenecks',
          cards: [
            {
              title: 'Q4_Operations_Final_v3.xlsx',
              lines: ['Cell D12 -> #REF! ERROR', 'Vendor_GST -> #VALUE!'],
              tone: 'error',
            },
            {
              title: 'Urgent sticky note',
              lines: ['CALL SUPPLIER BACK', 'Where is the signed copy?'],
              tone: 'amber',
            },
            {
              title: 'Team chat thread',
              lines: ['"Did payment clear? Client is waiting at desk."'],
              tone: 'neutral',
            },
          ],
          footerLeft: 'Multiple outdated spreadsheets across desktops',
          footerRight: 'Manual re-entry required',
        },
        after: {
          badge: 'AFTER: Unified Studio Engine',
          tag: 'Sample data',
          cards: [
            {
              label: 'Payments Ledger',
              value: '₹6,82,400',
              note: 'Reconciled automatically',
              tone: 'violet',
            },
            {
              label: 'Active Team Tasks',
              value: '42 Open',
              note: 'Clear ownership per role',
              tone: 'cyan',
            },
            {
              label: 'Connected Notifications',
              value: 'Synchronized',
              note: 'Linked to email & messaging',
              tone: 'lilac',
            },
          ],
          footerLeft: 'Every department works from one verified source of truth',
          footerRight: 'Realtime sync active',
        },
        painPoints: [
          {
            title: 'Data copied by hand',
            description:
              'Manual transfers between spreadsheets, chat threads and billing sheets create costly human error.',
            icon: 'file-spreadsheet',
            accent: 'violet',
          },
          {
            title: 'No single latest number',
            description:
              'Different departments rely on disconnected copies, hiding real cash flow, stock and open tasks.',
            icon: 'eye-off',
            accent: 'lilac',
          },
          {
            title: 'Customers wait on hold',
            description:
              'Teams spend minutes searching email threads for status updates that a portal can surface instantly.',
            icon: 'clock',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'productSwitcher',
      data: {
        eyebrow: 'What we build',
        title: 'One studio. Every kind of business software.',
        products: [
          {
            id: 'saas-platforms',
            title: 'SaaS Platforms',
            description: 'Subscription products with sign-up, billing and multi-tenant accounts.',
            icon: 'layers',
            fitText:
              'you have commercial software to offer as recurring subscriptions with tiered workspace access.',
            mockup: {
              headerLabel: 'SaaS Multi-Tenant / Workspace Portal',
              sampleLabel: 'Sample data',
              metrics: [
                {
                  label: 'Recurring Subscriptions',
                  value: '₹12,40,000',
                  delta: 'Sample billing metric',
                  tone: 'violet',
                },
                {
                  label: 'Active Seats',
                  value: '1,480 Seats',
                  delta: 'Workspace tier',
                  tone: 'cyan',
                },
              ],
              rowsTitle: 'Tenant Workspaces',
              rows: [
                {
                  primary: 'Workspace Group Alpha',
                  secondary: '340 member seats',
                  badge: 'Active Plan',
                  tone: 'emerald',
                },
                {
                  primary: 'Workspace Group Beta',
                  secondary: '180 member seats',
                  badge: 'Active Plan',
                  tone: 'emerald',
                },
                {
                  primary: 'Workspace Group Gamma',
                  secondary: '520 member seats',
                  badge: 'Renewal Due',
                  tone: 'amber',
                },
              ],
            },
          },
          {
            id: 'crm-systems',
            title: 'CRM Systems',
            description:
              'Leads, follow-ups and deals in one pipeline your sales team actually uses.',
            icon: 'handshake',
            fitText:
              'your enquiries live across chat threads, inbox attachments and unorganized spreadsheets.',
            mockup: {
              headerLabel: 'CRM Pipeline / Sales Operations',
              sampleLabel: 'Sample data',
              metrics: [
                {
                  label: 'Proposals In Review',
                  value: '₹18.2L Value',
                  delta: '14 open enquiries',
                  tone: 'violet',
                },
                {
                  label: 'Closed Deals',
                  value: '6 Won',
                  delta: 'Pipeline tracked',
                  tone: 'cyan',
                },
              ],
              rowsTitle: 'Scheduled Follow-Ups',
              rows: [
                {
                  primary: 'Commercial Account Inquiry',
                  secondary: 'Follow-up scheduled 11:30 AM',
                  badge: 'Qualified',
                  tone: 'emerald',
                },
                {
                  primary: 'Enterprise Implementation Scope',
                  secondary: 'Proposal under review',
                  badge: 'In Review',
                  tone: 'cyan',
                },
              ],
            },
          },
          {
            id: 'admin-dashboards',
            title: 'Admin Dashboards',
            description: 'Live numbers, reports and controls for owners and managers.',
            icon: 'bar-chart-3',
            fitText:
              'leadership needs live operational visibility without waiting on end-of-day spreadsheet summaries.',
            mockup: {
              headerLabel: 'Operations Command Center',
              sampleLabel: 'Sample data',
              metrics: [
                {
                  label: 'Gross Margin View',
                  value: 'Sample KPI',
                  delta: 'Live breakdown',
                  tone: 'cyan',
                },
                {
                  label: 'Reconciliation Queue',
                  value: 'Zero Variance',
                  delta: 'Scheduled checks',
                  tone: 'violet',
                },
              ],
              rowsTitle: 'Automated Summaries',
              rows: [
                {
                  primary: 'Daily ledger reconciliation',
                  secondary: 'Completed at 06:00 IST',
                  badge: 'Verified',
                  tone: 'emerald',
                },
                {
                  primary: 'Regional dispatch report',
                  secondary: 'Exported to PDF & CSV',
                  badge: 'Ready',
                  tone: 'cyan',
                },
              ],
            },
          },
          {
            id: 'customer-portals',
            title: 'Customer & Vendor Portals',
            description: 'Let clients and suppliers log in, track orders and download documents.',
            icon: 'user-check',
            fitText:
              'clients call your front office repeatedly for invoices, order updates or compliance documents.',
            mockup: {
              headerLabel: 'Client & Supplier Gateway',
              sampleLabel: 'Sample data',
              metrics: [
                {
                  label: 'Self-Service Documents',
                  value: '320 Files',
                  delta: 'Signed & archived',
                  tone: 'violet',
                },
                {
                  label: 'Open Support Tickets',
                  value: '4 Active',
                  delta: 'Assigned by SLA',
                  tone: 'cyan',
                },
              ],
              rowsTitle: 'Recent Portal Actions',
              rows: [
                {
                  primary: 'Purchase Order #9812',
                  secondary: 'E-way bill and invoice uploaded',
                  badge: 'Approved',
                  tone: 'emerald',
                },
                {
                  primary: 'Vendor Onboarding Checklist',
                  secondary: 'Awaiting compliance signature',
                  badge: 'Pending',
                  tone: 'amber',
                },
              ],
            },
          },
          {
            id: 'booking-operations',
            title: 'Booking & Operations Systems',
            description: 'Appointments, staff schedules, inventory and dispatch.',
            icon: 'calendar-check',
            fitText:
              'you coordinate appointments or dispatch teams where double-bookings cost time and revenue.',
            mockup: {
              headerLabel: 'Dispatch & Schedule Console',
              sampleLabel: 'Sample data',
              metrics: [
                {
                  label: 'Scheduled Slots',
                  value: '48 / 50 Filled',
                  delta: 'Conflict guard active',
                  tone: 'cyan',
                },
                {
                  label: 'Field Assignments',
                  value: '12 Active',
                  delta: 'Live check-ins',
                  tone: 'lilac',
                },
              ],
              rowsTitle: 'Today’s Schedule',
              rows: [
                {
                  primary: 'Morning Service Window',
                  secondary: 'Region West · Assigned team',
                  badge: 'In Progress',
                  tone: 'cyan',
                },
                {
                  primary: 'Afternoon Handover Slot',
                  secondary: 'Client notified automatically',
                  badge: 'Confirmed',
                  tone: 'emerald',
                },
              ],
            },
          },
          {
            id: 'internal-tools',
            title: 'Internal Tools',
            description: 'Replace the spreadsheet everyone is afraid to touch.',
            icon: 'wrench',
            fitText:
              'critical workflows depend on a fragile shared sheet that breaks whenever two people edit it.',
            mockup: {
              headerLabel: 'Custom Operations Console',
              sampleLabel: 'Sample data',
              metrics: [
                {
                  label: 'Batch Exports',
                  value: '1-Click Run',
                  delta: 'Replaces manual prep',
                  tone: 'violet',
                },
                {
                  label: 'Validation Rules',
                  value: 'Strict Schema',
                  delta: 'Zero broken formulas',
                  tone: 'cyan',
                },
              ],
              rowsTitle: 'Automated Jobs',
              rows: [
                {
                  primary: 'Auto-generated delivery slips',
                  secondary: 'Batched cleanly with PDF receipts',
                  badge: 'Complete',
                  tone: 'emerald',
                },
                {
                  primary: 'Stock threshold notification',
                  secondary: 'Alerts sent when buffer drops',
                  badge: 'Monitoring',
                  tone: 'cyan',
                },
              ],
            },
          },
        ],
      },
    },
    {
      type: 'explodedArchitecture',
      data: {
        eyebrow: 'Under the hood',
        title: "What's inside every app we ship.",
        lead: 'A multi-layered application structure built for reliable uptime, fast response times and consistent data integrity.',
        layers: [
          {
            number: '01',
            title: 'Interface Layer',
            tag: 'Fast & Responsive',
            description:
              'Responsive screens for desktop and mobile with immediate UI feedback and keyboard accessibility.',
            icon: 'smartphone',
            accent: 'violet',
          },
          {
            number: '02',
            title: 'API Gateway',
            tag: 'REST / GraphQL',
            description:
              'A structured, documented API layer that mobile apps, vendor portals and third-party tools can call safely.',
            icon: 'network',
            accent: 'cyan',
          },
          {
            number: '03',
            title: 'Business Logic Engine',
            tag: 'Deterministic Workflows',
            description:
              'Your operational rules codified cleanly: custom pricing logic, multi-step approvals, webhooks and notifications.',
            icon: 'git-branch',
            accent: 'lilac',
          },
          {
            number: '04',
            title: 'Relational Database',
            tag: 'ACID Compliant',
            description:
              'Strictly typed, normalized records that stay consistent across concurrent updates with scheduled backups.',
            icon: 'database',
            accent: 'violet',
          },
          {
            number: '05',
            title: 'Cloud & Security Shield',
            tag: 'Access Controlled',
            description:
              'Managed cloud hosting, health checks, encrypted connections and environment-isolated credentials.',
            icon: 'shield-check',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'fingerprintScan',
      data: {
        eyebrow: 'Security by design',
        titleLead: 'Built secure from the',
        titleAccent: 'first sprint',
        titleEnd: ', not patched later.',
        statusBadge: 'Access verified ✓',
        capabilities: [
          {
            label: 'Secure sign-in (password, OTP, Google)',
            icon: 'key-round',
            accent: 'violet',
          },
          {
            label: 'Optional two-factor login',
            icon: 'smartphone',
            accent: 'cyan',
          },
          {
            label: 'Role-based permissions',
            icon: 'user-check',
            accent: 'lilac',
          },
          {
            label: 'Encrypted connections (SSL/TLS)',
            icon: 'lock',
            accent: 'violet',
          },
          {
            label: 'Activity and audit logs',
            icon: 'activity',
            accent: 'cyan',
          },
          {
            label: 'Automatic encrypted backups',
            icon: 'cloud',
            accent: 'lilac',
          },
        ],
        disclaimer:
          "We follow security best practices on every project. We don't claim certifications we don't hold.",
      },
    },
    {
      type: 'roleSwitcher',
      data: {
        eyebrow: 'Access control',
        title: 'Everyone sees exactly what they need. Nothing more.',
        lead: 'Permissions are enforced per role, so a new team member never sees your margins or billing keys.',
        roles: [
          {
            id: 'owner',
            label: 'Owner',
            indicatorTitle: 'Current View: Owner (Full Access)',
            badgeText: 'Role Policy Active',
            modules: [
              {
                id: 'revenue',
                label: 'Revenue & Margin',
                value: '₹42.8 Lakhs',
                status: 'Visible · 32% Net',
                locked: false,
              },
              {
                id: 'orders',
                label: 'Orders Pipeline',
                value: '1,820 Active',
                status: 'Editable by team',
                locked: false,
              },
              {
                id: 'team',
                label: 'Team & Tasks',
                value: '24 Members',
                status: 'Full assignment',
                locked: false,
              },
              {
                id: 'settings',
                label: 'System Settings',
                value: 'Keys & Rules',
                status: 'Root configuration',
                locked: false,
              },
            ],
          },
          {
            id: 'manager',
            label: 'Manager',
            indicatorTitle: 'Current View: Manager (Operational View)',
            badgeText: 'Financial Fields Masked',
            modules: [
              {
                id: 'revenue',
                label: 'Revenue & Margin',
                value: '••••••••',
                status: 'Restricted to Owner',
                locked: true,
                ariaLockedLabel: 'Revenue & Margin (not available for Manager)',
              },
              {
                id: 'orders',
                label: 'Orders Pipeline',
                value: '1,820 Active',
                status: 'Operational edit',
                locked: false,
              },
              {
                id: 'team',
                label: 'Team & Tasks',
                value: '24 Members',
                status: 'Shift & task assignment',
                locked: false,
              },
              {
                id: 'settings',
                label: 'System Settings',
                value: '••••••••',
                status: 'Owner only',
                locked: true,
                ariaLockedLabel: 'System Settings (not available for Manager)',
              },
            ],
          },
          {
            id: 'staff',
            label: 'Staff',
            indicatorTitle: 'Current View: Staff (Assigned Tasks Only)',
            badgeText: 'Task Scope Enforced',
            modules: [
              {
                id: 'revenue',
                label: 'Revenue & Margin',
                value: '••••••••',
                status: 'Hidden from role',
                locked: true,
                ariaLockedLabel: 'Revenue & Margin (not available for Staff)',
              },
              {
                id: 'orders',
                label: 'Orders Pipeline',
                value: '14 Assigned',
                status: 'Queue updates only',
                locked: false,
              },
              {
                id: 'team',
                label: 'Team & Tasks',
                value: 'Assigned (4)',
                status: 'Personal task list',
                locked: false,
              },
              {
                id: 'settings',
                label: 'System Settings',
                value: '••••••••',
                status: 'Restricted access',
                locked: true,
                ariaLockedLabel: 'System Settings (not available for Staff)',
              },
            ],
          },
          {
            id: 'customer',
            label: 'Customer',
            indicatorTitle: 'Current View: Customer (Portal Mode)',
            badgeText: 'External Account Isolation',
            modules: [
              {
                id: 'revenue',
                label: 'Revenue & Margin',
                value: 'Hidden',
                status: 'Not in portal scope',
                locked: true,
                ariaLockedLabel: 'Revenue & Margin (not available for Customer)',
              },
              {
                id: 'orders',
                label: 'My Orders',
                value: '3 Active',
                status: 'Invoices & status',
                locked: false,
              },
              {
                id: 'team',
                label: 'Account Support',
                value: 'Ticket Portal',
                status: 'Direct updates',
                locked: false,
              },
              {
                id: 'settings',
                label: 'System Settings',
                value: 'Hidden',
                status: 'Not in portal scope',
                locked: true,
                ariaLockedLabel: 'System Settings (not available for Customer)',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'activityIntegrations',
      data: {
        eyebrow: 'Live operations',
        title: "Know what's happening without asking anyone.",
        lead: 'We connect your application to the tools you already use, wherever they offer an API.',
        feedTitle: 'Live Activity Stream',
        sampleLabel: 'Sample activity',
        events: [
          {
            text: 'Invoice #1042 marked paid',
            timeAgo: 'just now',
            icon: 'check-circle-2',
            tone: 'emerald',
          },
          {
            text: 'New booking: Saturday 11:00 AM',
            timeAgo: '1 min',
            icon: 'calendar-check',
            tone: 'violet',
          },
          {
            text: 'Stock threshold reached: SKU-221',
            timeAgo: '3 min',
            icon: 'zap',
            tone: 'amber',
          },
          {
            text: 'Enquiry assigned to Sales team',
            timeAgo: '6 min',
            icon: 'users',
            tone: 'cyan',
          },
          {
            text: 'Tax summary report exported',
            timeAgo: '12 min',
            icon: 'file-spreadsheet',
            tone: 'lilac',
          },
          {
            text: 'Customer replied on ticket #88',
            timeAgo: '15 min',
            icon: 'message-square',
            tone: 'cyan',
          },
        ],
        hubTitle: 'Integrations Hub',
        hubSubtitle: 'Two-way API sync',
        coreLabel: '10Peak Core',
        coreSublabel: 'Engine',
        nodes: [
          { label: 'Payment gateway', tone: 'emerald' },
          { label: 'Email', tone: 'cyan' },
          { label: 'WhatsApp updates', tone: 'emerald' },
          { label: 'SMS', tone: 'lilac' },
          { label: 'Google Sheets', tone: 'amber' },
          { label: 'Accounting software', tone: 'violet' },
          { label: 'Maps & location', tone: 'cyan' },
          { label: 'Existing APIs', tone: 'violet' },
        ],
        protocols: ['Webhook ingestion', 'Polling fallbacks', 'Real-time event logs'],
      },
    },
    {
      type: 'sprintBoard',
      data: {
        eyebrow: 'How we work',
        title: 'Visible progress at every stage, not a black box.',
        columns: [
          {
            step: '01 Discover',
            cardTag: 'Requirement Matrix',
            title: 'User roles & permissions mapped',
            status: '✓ Approved',
            accent: 'emerald',
          },
          {
            step: '02 Design',
            cardTag: 'Interactive Prototype',
            title: 'Dashboard & portal views reviewed',
            status: '✓ Approved',
            accent: 'emerald',
          },
          {
            step: '03 Build',
            cardTag: 'Active Iteration',
            title: 'Core workflows & database connected',
            status: 'Staging link live',
            accent: 'violet',
            active: true,
          },
          {
            step: '04 Test',
            cardTag: 'QA & Integrity',
            title: 'Permission checks & workflow validation',
            status: 'Staged QA',
            accent: 'amber',
          },
          {
            step: '05 Launch',
            cardTag: 'Production Handover',
            title: 'Go-live, monitoring & documentation',
            status: 'Scheduled',
            accent: 'cyan',
          },
        ],
        guarantees: [
          'Regular demos on a staging link',
          'You approve designs before code',
          'You test everything before it goes live',
        ],
      },
    },
    {
      type: 'growthPath',
      data: {
        eyebrow: 'Start small, grow steadily',
        title: 'Launch the version that matters. Then grow it.',
        stages: [
          {
            stageLabel: 'Stage 01',
            badge: undefined,
            timelineConfirmed: false,
            fallbackBadge: 'Focused launch',
            title: 'MVP',
            description:
              'The focused first release that gets real work out of spreadsheets and processes transactions safely.',
            deliverableLabel: 'Core workflow + Essential data',
            accent: 'violet',
          },
          {
            stageLabel: 'Stage 02',
            badge: 'Expansion',
            timelineConfirmed: true,
            fallbackBadge: 'Expansion',
            title: 'Version 1',
            description:
              'Expanded capabilities shaped by real team feedback after launch, including automated billing and reports.',
            deliverableLabel: 'Analytics + Customer self-service',
            accent: 'lilac',
          },
          {
            stageLabel: 'Stage 03',
            badge: 'Scale Ready',
            timelineConfirmed: true,
            fallbackBadge: 'Scale Ready',
            title: 'Scale',
            description:
              'More users, teams and external integrations without slowing down core daily operations.',
            deliverableLabel: 'Multi-region + Advanced role rules',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'engineRoom',
      data: {
        eyebrow: 'Our stack',
        title: 'Proven technology, chosen for your product.',
        lead: 'We choose the stack to fit your product, budget and team, not the other way around.',
        terminals: [
          {
            filename: 'frontend.env',
            comment: '// Modern reactive web interfaces',
            stackLine: 'Next.js · React · TypeScript · Tailwind CSS',
            outputLine: '> Server-rendered UI and accessible component architecture',
            accent: 'violet',
          },
          {
            filename: 'server.runtime',
            comment: '// Event-driven application logic',
            stackLine: 'Node.js · REST & GraphQL APIs · Webhooks',
            outputLine: '> Background workers, queues and structured validation',
            accent: 'cyan',
          },
          {
            filename: 'storage.config',
            comment: '// Relational integrity',
            stackLine: 'PostgreSQL · Supabase · Row-level access control',
            outputLine: '> Strict schema rules and automated backup policies',
            accent: 'lilac',
          },
          {
            filename: 'cloud.mesh',
            comment: '// Edge hosting & external services',
            stackLine: 'Cloudflare · Vercel · Resend · Gemini',
            outputLine: '> Global edge delivery and monitored health endpoints',
            accent: 'violet',
          },
        ],
      },
    },
    {
      type: 'engagementModels',
      data: {
        eyebrow: 'Working together',
        title: 'Three ways to work with us.',
        lead: 'Every project starts with a free consultation and a clear written proposal.',
        models: [
          {
            id: 'fixed-scope',
            eyebrow: 'Clear Deliverable',
            title: 'Fixed-scope project',
            subtitle: 'A defined product, a clear plan and an agreed milestone schedule.',
            price: 'Custom quote',
            priceConfirmed: false,
            fallbackPrice: 'Custom quote',
            priceCaption: 'Scoped from written specification',
            features: [
              'Custom UI design + full-stack build',
              'Regular demos on a staging link',
              'Technical handover documentation',
              'Launch deployment & walkthrough',
              'Post-launch support options',
            ],
            ctaLabel: 'Get a proposal',
            ctaHref: '/contact?service=web-app-development',
            accent: 'violet',
          },
          {
            id: 'mvp-sprint',
            eyebrow: 'Focused First Release',
            title: 'MVP sprint',
            subtitle: 'A focused build to launch your first working version quickly.',
            price: 'Custom quote',
            priceConfirmed: false,
            fallbackPrice: 'Custom quote',
            priceCaption: 'Prioritized around core workflows',
            popular: true,
            badgeText: 'Recommended',
            features: [
              'Focused UX + Next.js implementation',
              'Regular live staging check-ins',
              'Architecture handover documentation',
              'Post-launch bug-fix support included',
              'Direct path to Phase 2 expansion',
            ],
            ctaLabel: 'Start MVP sprint',
            ctaHref: '/contact?service=web-app-development',
            accent: 'lilac',
          },
          {
            id: 'dedicated-team',
            eyebrow: 'Ongoing Product Engineering',
            title: 'Dedicated team',
            subtitle: 'Our designers and engineers work alongside your team month to month.',
            price: 'Custom quote',
            priceConfirmed: false,
            fallbackPrice: 'Custom quote',
            priceCaption: 'Monthly retainer based on capacity',
            features: [
              'Dedicated design & engineering squad',
              'Ongoing sprint planning & staging demos',
              'Priority issue resolution & maintenance',
              'Continuous feature releases',
              'Flexible roadmap prioritization',
            ],
            ctaLabel: 'Discuss retained team',
            ctaHref: '/contact?service=web-app-development',
            accent: 'cyan',
          },
        ],
      },
    },
    {
      type: 'workTeaser',
      data: {
        eyebrow: 'Engineering depth',
        title: 'Real projects, explained like engineering case studies.',
        cardEyebrow: 'Case archives',
        cardTitle: 'Explore our portfolio',
        cardDescription:
          'Review architecture choices, data models and how our engineering work holds up in practice.',
        ctaLabel: 'Explore our portfolio',
        ctaHref: '/portfolio',
        workImage: undefined,
        workImageAlt: '10PeakStudio engineering case studies preview',
      },
    },
    {
      type: 'serviceFaq',
      data: {
        eyebrow: 'Frequently asked',
        title: 'Answers to how we build.',
        items: [
          {
            id: 'start-smaller',
            question: 'Can we start with a smaller version first?',
            answer:
              'Yes. Most application builds start with a focused first release covering the core workflow, then expand in stages based on team adoption and real customer requests.',
            published: true,
          },
          {
            id: 'connect-existing-tools',
            question: 'Can it connect to the tools we already use?',
            answer:
              'Usually yes, whenever those tools provide an API or webhook interface. We review their API documentation during discovery before confirming the integration scope.',
            published: true,
          },
          {
            id: 'data-security',
            question: 'How do you keep our data secure?',
            answer:
              'Role-based access controls, encrypted TLS connections, server-side input validation and scheduled database backups are built into the application architecture from the first sprint.',
            published: true,
          },
          {
            id: 'scaling-users',
            question: 'Will the app handle more users later?',
            answer:
              'We design your database schema and API boundaries around expected growth so adding new teams, modules or higher traffic does not force a ground-up rewrite.',
            published: true,
          },
          {
            id: 'post-launch-support',
            question: 'What happens after launch?',
            answer:
              'You can choose an ongoing maintenance and feature retainer with our team, or take over operations internally supported by complete architecture documentation and walkthroughs.',
            published: true,
          },
          {
            id: 'code-ownership',
            question: 'Who owns the code?',
            answer: '[PLACEHOLDER: ownership policy]',
            published: false,
          },
          {
            id: 'nda-policy',
            question: 'Do you sign NDAs?',
            answer: '[CONFIRM]',
            published: false,
          },
        ],
      },
    },
    {
      type: 'terminalCta',
      data: {
        promptText: 'Describe what your team does manually today',
        titleLead: "That's where your",
        titleAccent: 'next app',
        titleEnd: 'begins.',
        description:
          "Tell us how your business works. We'll map out what it could look like as reliable software.",
        primaryLabel: 'Start a project',
        whatsappLabel: 'Chat on WhatsApp',
      },
    },
  ],
};
