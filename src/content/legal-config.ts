/**
 * Centralized Legal & Compliance Configuration (Content Integrity Rule).
 * Replace and verify every item marked with [CONFIRM] before flipping legalReviewed to true.
 */
export const legalConfig = {
  /** Set to true once owner & Legal & Compliance Advisor sign off on all [CONFIRM] values. */
  legalReviewed: false, // [CONFIRM]: Set to true after legal review is complete

  brandName: '10PeakStudio',
  alternateName: '10PeakStudios',
  websiteUrl: 'https://10peakstudios.com',

  /** [CONFIRM]: Legal registered entity name (e.g., 10PeakStudio LLP / Private Limited / Sole Proprietorship). */
  legalEntityName: '10PeakStudio (Registration details pending legal confirmation)',
  /** [CONFIRM]: Legal business structure. */
  entityType: 'Digital Innovation and Technology Studio (Entity form pending confirmation)',
  /** [CONFIRM]: Complete registered postal address when approved for public legal disclosure. */
  registeredAddress: 'Navi Mumbai, Maharashtra, India (Full street address pending confirmation)',
  /** Known city verified from studio info. */
  city: 'Navi Mumbai, Maharashtra, India',
  /** [CONFIRM]: GSTIN / company registration number if applicable and required on legal pages. */
  registrationNumber: 'Pending confirmation',

  /** Verified studio public contact email (src/lib/env.ts). */
  contactEmail: 'connect@10peakstudios.com',
  /** [CONFIRM]: Dedicated privacy / grievance inbox (defaults to public studio email). */
  privacyEmail: 'connect@10peakstudios.com',

  /** [CONFIRM]: Appoint and confirm designated Grievance Officer name, title, and direct inbox. */
  grievanceOfficer: {
    name: 'Legal & Compliance Desk (Officer name pending confirmation)',
    title: 'Grievance Officer & Compliance Advisor',
    email: 'connect@10peakstudios.com',
  },

  /** [CONFIRM]: Exact court jurisdiction city under Indian law. */
  jurisdictionCity: 'Navi Mumbai, Maharashtra',

  /** [CONFIRM]: Response commitment for data access, correction, erasure, and withdrawal requests. */
  requestResponseTime:
    'Within 15 business days (target; subject to applicable DPDP Rules timelines)',

  /** [CONFIRM]: Effective and last-updated dates aligned with formal legal sign-off. */
  effectiveDate: '2026-11-26',
  lastUpdated: '2026-11-26',

  /** [CONFIRM]: Confirm actual retention schedules per system & D1 provisioning status. */
  retention: {
    contactEnquiries:
      'Retained only as long as needed to evaluate enquiries, prepare proposals, and satisfy business or legal obligations (Architecture target: 12 months if stored in Cloudflare D1 — confirm D1 activation & purge schedule).', // [CONFIRM]
    rateLimitHashes:
      'Salted SHA-256 IP hashes used for anti-spam rate limiting (5 enquiries per hour window) when Cloudflare D1 is active (confirm exact purge cadence).', // [CONFIRM]
    resendEmailLogs:
      'Transactional notification & auto-reply delivery logs are retained by Resend according to account plan retention settings (confirm Resend log window).', // [CONFIRM]
    cloudflareEdgeLogs:
      'Security, firewall, and Turnstile challenge logs processed transiently by Cloudflare per Cloudflare free-plan log retention.', // [CONFIRM]
    consentStorage:
      '12 months (365 days) stored locally in your browser (localStorage key tps.consent.v1).',
    ga4Analytics:
      'Up to 14 months event retention in Google Analytics 4 only when Analytics consent is granted (confirm property retention setting in GA4 Admin).', // [CONFIRM]
    claritySessions:
      'Retained per Microsoft Clarity standard project window (typically 30 days on standard plans) only when Session insights consent is granted (confirm Clarity dashboard setting).', // [CONFIRM]
  },

  /** Controls disclosure clarity around optional Cloudflare D1 storage (wrangler.jsonc currently has D1 commented out). */
  storageStatus: {
    d1DatabaseConfiguredInCode: true, // [CONFIRM]: Confirm whether Cloudflare D1 (10peakstudio-leads) is provisioned in production yet
    resendEmailActiveInCode: true,
    cloudflareWebAnalyticsCookieless: true,
  },
} as const;

export type LegalConfig = typeof legalConfig;
