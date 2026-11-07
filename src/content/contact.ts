import type { Faq } from './types';

export type ContactEmail = {
  address: string;
  label: string;
  description: string;
};

export type ContactPhone = {
  number: string;
  display: string;
  label: string;
};

export type ClientEntry = {
  name: string;
  industry: string;
  logoUrl?: string | undefined;
  isPlaceholder?: boolean;
};

export type StatEntry = {
  value: string;
  numeric: number;
  suffix: string;
  label: string;
  description: string;
  // [CONFIRM]: Formal verification status before public promotion
  status: 'confirm_pending' | 'verified';
};

export type TestimonialEntry = {
  clientName: string;
  role: string;
  company: string;
  quote: string;
};

/**
 * Contact Us page content singleton (PRD §8.7, Design.md §10, Rules.md RUL-CNT-09).
 * All copy and structural data for /contact live here.
 */
export const contact = {
  meta: {
    title: 'Contact Us: Start a Project | 10PeakStudio',
    description:
      'Tell us about your project. Connect with 10PeakStudio to discuss custom websites, web applications, and AI workflow automations.',
  },

  hero: {
    eyebrow: 'Start a Conversation',
    titleLead: "Let's build something",
    titleAccent: 'extraordinary.',
    lead: 'Whether you need a high-performance web platform, an enterprise web application, or custom AI automation, our engineering team is ready to help.',
    trustLine:
      'Fast response during studio hours. Direct engineering consultation, no sales fluff.',
    bgImage:
      'https://res.cloudinary.com/qlxaljlj/image/upload/v1794033471/Gemini_Generated_Image_wqy0lswqy0lswqy0.png',
  },

  channels: {
    phones: [
      {
        number: '+917678083589',
        display: '+91 7678083589',
        label: 'Direct Line (Primary)',
      },
      {
        number: '+919004892091',
        display: '+91 9004892091',
        label: 'Secondary Line',
      },
    ] as const satisfies readonly ContactPhone[],

    emails: [
      {
        address: 'connect@10peakstudios.com',
        label: 'General Enquiries',
        description: 'New client projects, technical questions and scopes',
      },
      {
        address: 'partner@10peakstudios.com',
        label: 'Partnerships & Agency',
        description: 'Agency collaborations and technology alliances',
      },
      {
        address: 'rutik@10peakstudios.com',
        label: 'Founder & Engineering',
        description: 'Direct architectural and executive discussions',
      },
    ] as const satisfies readonly ContactEmail[],

    location: {
      city: 'Navi Mumbai',
      state: 'Maharashtra',
      country: 'India',
      note: 'Serving ambitious clients across India, North America, UK, and the Middle East.',
      mapsUrl: 'https://maps.google.com/?q=Navi+Mumbai,+Maharashtra,+India',
    },

    hours: {
      days: 'Monday – Saturday',
      time: '7:00 AM – 9:00 PM IST',
      closedDays: 'Sunday: Closed',
      openHourIst: 7,
      closeHourIst: 21,
    },
  },

  form: {
    eyebrow: 'Project Enquiry',
    titleLead: 'Tell us about your',
    titleAccent: 'next project.',
    lead: 'Fill in your details below and our lead engineers will get back to you with a structured proposal.',
    privacyNote:
      'We respect your data. Your details are securely transmitted and will only be used to respond to your enquiry.',
  },

  whatHappensNext: {
    eyebrow: 'Our Process',
    title: 'What happens after you reach out?',
    lead: 'We respect your time. Here is our transparent 3-step consultation pipeline:',
    steps: [
      {
        number: '01',
        title: 'Scope & Architecture Review',
        body: 'Our lead engineers review your technical requirements and objectives during our active studio hours.',
      },
      {
        number: '02',
        title: 'Discovery & Alignment Call',
        body: 'We schedule a focused 30-minute discovery conversation to align on tech stack, product roadmap, and feasibility.',
      },
      {
        number: '03',
        title: 'Milestone-Driven Proposal',
        body: 'You receive a transparent, fixed-scope architecture proposal with milestone commitments and clear deliverables.',
      },
    ],
  },

  // Stats: all marked [CONFIRM] in code comments (verify before production promotion)
  stats: {
    eyebrow: 'Proven Track Record',
    titleLead: 'Scale, Efficiency & Execution',
    titleAccent: 'by the Numbers.',
    lead: 'Performance metrics engineered for measurable business impact.',
    items: [
      {
        value: '120+',
        numeric: 120,
        suffix: '+',
        label: 'Businesses Scaled',
        description: 'Digital platforms engineered for startup and SME expansion.',
        status: 'confirm_pending', // [CONFIRM]
      },
      {
        value: '12+',
        numeric: 12,
        suffix: '+',
        label: 'Enterprise AI Systems',
        description: 'Custom intelligent assistants and automation pipelines deployed.',
        status: 'confirm_pending', // [CONFIRM]
      },
      {
        value: '6+',
        numeric: 6,
        suffix: '+',
        label: 'Core Industries Served',
        description: 'Proven experience spanning Fintech, Real Estate, E-Commerce and SaaS.',
        status: 'confirm_pending', // [CONFIRM]
      },
      {
        value: '100%',
        numeric: 100,
        suffix: '%',
        label: 'ROI-First Delivery',
        description: 'Dedicated architectural focus on performance, conversion and speed.',
        status: 'confirm_pending', // [CONFIRM]
      },
    ] as const satisfies readonly StatEntry[],
  },

  clients: {
    eyebrow: 'Selected Partnerships',
    titleLead: 'Partners in Growth: Trusted by',
    titleAccent: 'Industry Leaders.',
    lead: 'Delivering transformative digital products for forward-thinking enterprises.',
    items: [
      {
        name: 'Sai Prestige',
        industry: 'Real Estate & Infrastructure',
        logoUrl:
          'https://res.cloudinary.com/qlxaljlj/image/upload/v1793422198/Sai_prestige__logo_HD.jpg',
        isPlaceholder: false,
      },
      {
        name: 'Gogs India',
        industry: 'Fintech & Digital Payments',
        // [PLACEHOLDER: Pending official vector logo asset]
        logoUrl: undefined,
        isPlaceholder: true,
      },
    ] as const satisfies readonly ClientEntry[],
  },

  // Testimonials: gated by NEXT_PUBLIC_SHOW_TESTIMONIALS=true
  testimonials: {
    eyebrow: 'Client Feedback',
    titleLead: 'Client Perspectives &',
    titleAccent: 'Collaboration Stories.',
    lead: 'What partners say about building digital products with 10PeakStudio.',
    items: [
      {
        clientName: '[Client Name]',
        role: '[Founder / Executive]',
        company: 'Sai Prestige',
        quote:
          '10PeakStudio transformed our digital presence with unmatched speed and engineering quality.',
      },
      {
        clientName: '[Client Name]',
        role: '[CTO / Product Head]',
        company: 'Gogs India',
        quote:
          'Their full-stack technical capability and AI integration elevated our operational efficiency.',
      },
    ] as const satisfies readonly TestimonialEntry[],
  },

  faq: {
    eyebrow: 'FAQ',
    titleLead: 'Frequently Asked',
    titleAccent: 'Questions.',
    lead: 'Straightforward answers about our engagement models, timelines, and how we work.',
    items: [
      {
        question: 'How quickly can we expect a response after submitting an enquiry?',
        answer:
          'Our engineering leads review every submission during active studio hours (Mon–Sat, 7:00 AM – 9:00 PM IST). You can expect a response within our active hours, typically within 2 to 4 hours on business days.',
      },
      {
        question: 'What typical project budgets and timelines do you support?',
        answer:
          'We cater to projects ranging from focused sprint MVPs (2–4 weeks) to comprehensive enterprise web platforms and custom AI automations (1–3+ months). We tailor scopes with milestone-based fixed pricing.',
      },
      {
        question: 'Can we sign a Non-Disclosure Agreement (NDA) before sharing project details?',
        answer:
          'Yes. We are happy to execute a mutual NDA prior to receiving proprietary workflows, intellectual property, or technical design specifications.',
      },
      {
        question: 'Can we consult with you directly via WhatsApp or Phone instead of the form?',
        answer:
          'Certainly. You can tap the WhatsApp or Call buttons in the contact section to connect directly with our engineering team for immediate inquiries.',
      },
      {
        question: 'Do you work with international clients outside of India?',
        answer:
          'Yes. While our headquarters are in Navi Mumbai, India, we regularly engineer and deliver software for clients across North America, the UK, Europe, and the Middle East with seamless async communication.',
      },
    ] as const satisfies readonly Faq[],
  },

  directSupport: {
    eyebrow: 'Direct Escalation',
    titleLead: 'Need immediate technical',
    titleAccent: 'assistance?',
    lead: 'Our engineering leadership is active Mon–Sat from 7:00 AM to 9:00 PM IST. Reach out directly on WhatsApp or call our line.',
    ctaCall: 'Call +91 7678083589',
    ctaWhatsApp: 'Message on WhatsApp',
  },
} as const;
