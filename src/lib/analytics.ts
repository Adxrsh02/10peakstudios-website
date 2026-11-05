/**
 * Typed analytics events (PRD 10.2, Architecture.md 11.3). No-op until GA4 is loaded with consent.
 * Parameters outside the allow-list are dropped so personal data can never be sent (PRD-ANL-01).
 */
export type AnalyticsEvent =
  | 'cta_click'
  | 'service_view'
  | 'form_start'
  | 'form_step'
  | 'form_error'
  | 'generate_lead'
  | 'whatsapp_click'
  | 'email_click'
  | 'consent_update';

const ALLOWED_PARAMS = new Set([
  'cta_id',
  'cta_text',
  'location',
  'service_slug',
  'pillar',
  'form_id',
  'step',
  'error_type',
  'services',
  'budget_band',
  'timeline',
  'analytics',
  'session_insights',
]);

type Params = Record<string, string | number | undefined>;

export function sanitizeParams(params: Params = {}): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(params)) {
    if (ALLOWED_PARAMS.has(k) && v !== undefined)
      out[k] = typeof v === 'string' ? v.slice(0, 100) : v;
  }
  return out;
}

type Gtag = (command: 'event', name: string, params: Record<string, string | number>) => void;

export function track(event: AnalyticsEvent, params?: Params): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === 'function') gtag('event', event, sanitizeParams(params));
}
