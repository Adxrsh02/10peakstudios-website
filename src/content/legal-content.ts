import { legalConfig } from './legal-config';

export type CookieDisclosureRow = {
  nameOrProvider: string;
  mechanism: string;
  purpose: string;
  category: 'Strictly Necessary' | 'Analytics' | 'Session Insights' | 'Performance & Security';
  duration: string;
  consentRequired: 'No' | 'Yes' | 'No (Cookieless)';
};

export type ProcessorRow = {
  provider: string;
  role: string;
  dataHandled: string;
  condition: string;
  privacyUrl: string;
};

export type DataRequestOption = {
  id: 'access' | 'correction' | 'erasure' | 'withdraw' | 'grievance';
  title: string;
  description: string;
  subject: string;
  bodyTemplate: string;
};

export const PRIVACY_AT_A_GLANCE = [
  {
    label: 'What We Collect',
    summary:
      'Details you type into our enquiry form (name, email, phone, project scope), anti-spam checks (Turnstile + salted IP hash), and optional analytics only if you opt in.',
  },
  {
    label: 'Why We Use It',
    summary:
      'To respond to project enquiries, send an acknowledgement email, block automated spam, and understand site usage when consented.',
  },
  {
    label: 'Who Processes It',
    summary:
      'Cloudflare (hosting, Turnstile, cookieless Web Analytics, optional D1), Resend (email), Cloudinary (media), and conditionally GA4, Microsoft Clarity, and YouTube nocookie.',
  },
  {
    label: 'Your Rights',
    summary:
      'Access, correct, update, erase personal data, withdraw cookie consent anytime in one click, or contact our Grievance Officer and the Data Protection Board of India.',
  },
] as const;

export const COOKIE_AND_STORAGE_TABLE: CookieDisclosureRow[] = [
  {
    nameOrProvider: 'tps.consent.v1 (10PeakStudio)',
    mechanism: 'Browser localStorage',
    purpose:
      'Remembers your privacy preferences (Necessary, Analytics, Session insights) and version.',
    category: 'Strictly Necessary',
    duration: '12 months',
    consentRequired: 'No',
  },
  {
    nameOrProvider: 'tps.loader.seen (10PeakStudio)',
    mechanism: 'Browser sessionStorage',
    purpose:
      'Prevents replaying the opening logo transition multiple times during one browser session.',
    category: 'Strictly Necessary',
    duration: 'Browser session',
    consentRequired: 'No',
  },
  {
    nameOrProvider: 'tps.lead_submitted (10PeakStudio)',
    mechanism: 'Browser sessionStorage',
    purpose:
      'One-time confirmation token so reloading the thank-you page does not re-fire a conversion event.',
    category: 'Strictly Necessary',
    duration: 'Cleared after confirmation / session',
    consentRequired: 'No',
  },
  {
    nameOrProvider: 'Cloudflare & Turnstile (__cf_bm / challenge)',
    mechanism: 'HTTP cookie / challenge token',
    purpose:
      'Distinguishes human visitors from automated bots on /api/contact and protects edge infrastructure.',
    category: 'Strictly Necessary',
    duration: 'Session / up to 30 mins',
    consentRequired: 'No',
  },
  {
    nameOrProvider: 'Cloudflare Web Analytics',
    mechanism: 'Cookieless JS beacon (no cookies)',
    purpose:
      'Measures aggregate page views and Core Web Vitals performance without tracking individual visitors.',
    category: 'Performance & Security',
    duration: 'None (no cookies stored)',
    consentRequired: 'No (Cookieless)',
  },
  {
    nameOrProvider: 'Google Analytics 4 (_ga, _ga_*)',
    mechanism: 'First-party cookies & script',
    purpose:
      'Aggregated page usage and CTA interaction metrics with Google signals and ad personalization disabled.',
    category: 'Analytics',
    duration: 'Up to 14 months (deleted on withdrawal)',
    consentRequired: 'Yes',
  },
  {
    nameOrProvider: 'Microsoft Clarity (_clck, _clsk, CLID)',
    mechanism: 'First & third-party cookies',
    purpose:
      'Anonymized UX heatmaps and session flow with strict input masking (data-clarity-mask) on all form fields.',
    category: 'Session Insights',
    duration: 'Up to 12 months / session (deleted on withdrawal)',
    consentRequired: 'Yes',
  },
];

export const THIRD_PARTY_PROCESSORS: ProcessorRow[] = [
  {
    provider: 'Cloudflare (Workers, Static Assets, Turnstile, D1, Web Analytics)',
    role: 'Website hosting, CDN, bot verification, cookieless RUM telemetry, and optional lead/rate-limit storage',
    dataHandled:
      'IP security signals, Turnstile verification tokens, hashed IPs (SHA-256), and form payloads sent to /api/contact',
    condition: 'Always active for hosting & security; Turnstile runs on contact form',
    privacyUrl: 'https://www.cloudflare.com/privacypolicy/',
  },
  {
    provider: 'Resend',
    role: 'Transactional email delivery',
    dataHandled:
      'Enquiry sender name, email, phone, selected services, budget/timeline, and message for studio notifications and auto-replies',
    condition: 'Active when submitting the contact enquiry form',
    privacyUrl: 'https://resend.com/legal/privacy-policy',
  },
  {
    provider: 'Cloudinary',
    role: 'Image & media optimization CDN',
    dataHandled:
      'Standard HTTP request headers (IP address, browser user agent) to serve optimized images/videos',
    condition:
      'Active on pages displaying studio photography, case study visuals, or Cloudinary video',
    privacyUrl: 'https://cloudinary.com/privacy',
  },
  {
    provider: 'Google Analytics 4 (Google LLC)',
    role: 'Website traffic and event measurement',
    dataHandled:
      'Pseudonymous page views, CTA events, device/viewport metadata (no personal contact fields sent)',
    condition: 'Loaded ONLY if you grant Analytics consent (and GPC is not blocking)',
    privacyUrl: 'https://policies.google.com/privacy',
  },
  {
    provider: 'Microsoft Clarity',
    role: 'Session UX heatmaps and interaction insights',
    dataHandled: 'Anonymized click/scroll interactions; all contact inputs masked strictly in code',
    condition: 'Loaded ONLY if you grant Session insights consent (and GPC is not blocking)',
    privacyUrl: 'https://www.microsoft.com/en-us/privacy/privacystatement',
  },
  {
    provider: 'YouTube (youtube-nocookie.com)',
    role: 'Embedded portfolio demonstration video player',
    dataHandled: 'Video stream request data sent to Google/YouTube in privacy-enhanced mode',
    condition: 'Loaded ONLY if a case study contains a YouTube demo AND you click Play',
    privacyUrl: 'https://policies.google.com/privacy',
  },
];

export const DATA_REQUEST_OPTIONS: DataRequestOption[] = [
  {
    id: 'access',
    title: 'Request a Copy / Access Your Data',
    description:
      'Ask what personal data (such as past contact enquiries or emails) we hold associated with your email address.',
    subject: 'Data Access Request — 10PeakStudio',
    bodyTemplate:
      'Hello 10PeakStudio Legal & Privacy Desk,\n\nI would like to request access to a summary/copy of any personal data held under my details.\n\nName:\nEmail used on enquiry:\nApproximate date (if known):\n',
  },
  {
    id: 'correction',
    title: 'Correct or Update Your Details',
    description:
      'Ask us to correct, complete, or update inaccurate contact or project information you submitted.',
    subject: 'Data Correction / Update Request — 10PeakStudio',
    bodyTemplate:
      'Hello 10PeakStudio Legal & Privacy Desk,\n\nPlease update or correct the following personal details held from my prior contact:\n\nName:\nEmail:\nDetails to update:\n',
  },
  {
    id: 'erasure',
    title: 'Request Erasure (Deletion)',
    description:
      'Ask us to delete enquiry records or emails where retention is no longer necessary for an ongoing project or law.',
    subject: 'Data Erasure Request — 10PeakStudio',
    bodyTemplate:
      'Hello 10PeakStudio Legal & Privacy Desk,\n\nI request the deletion/erasure of personal data submitted via your website or email.\n\nName:\nEmail used on enquiry:\n',
  },
  {
    id: 'withdraw',
    title: 'Withdraw Consent for Communications',
    description:
      'Withdraw consent for enquiry follow-ups or nominate another person to exercise your rights under Indian law.',
    subject: 'Consent Withdrawal / Nomination Request — 10PeakStudio',
    bodyTemplate:
      'Hello 10PeakStudio Legal & Privacy Desk,\n\nI am writing to withdraw consent / submit a rights nomination request.\n\nName:\nEmail:\nRequest details:\n',
  },
  {
    id: 'grievance',
    title: 'Contact Grievance Officer',
    description: `Escalate a privacy concern directly to ${legalConfig.grievanceOfficer.title}.`,
    subject: 'Privacy Grievance — 10PeakStudio',
    bodyTemplate:
      'Hello Grievance Officer,\n\nI would like to raise a privacy grievance regarding:\n\nName:\nEmail:\nConcern description:\n',
  },
];

export function buildMailtoUrl(email: string, subject: string, body: string): string {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
