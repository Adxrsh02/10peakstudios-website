/**
 * Typed analytics events (PRD 10.2, Architecture.md 11.3). No-op until GA4 is loaded with consent.
 * Parameters outside the allow-list are dropped so personal data can never be sent (PRD-ANL-01).
 */
export type AnalyticsEvent =
  | 'cta_click'
  | 'service_view'
  | 'service_cta_click'
  | 'service_tab_change'
  | 'service_product_switch'
  | 'service_role_switch'
  | 'service_engagement_toggle'
  | 'service_faq_open'
  | 'before_after_drag'
  | 'brand_simulator_used'
  | 'visibility_ladder_complete'
  | 'quiz_start'
  | 'quiz_complete'
  | 'audit_cta_click'
  | 'traffic_type_change'
  | 'control_node_open'
  | 'code_flip_toggle'
  | 'growth_plan_change'
  | 'process_cta_click'
  | 'ascent_camp_view'
  | 'ascent_complete'
  | 'process_faq_open'
  | 'form_start'
  | 'form_step'
  | 'form_error'
  | 'generate_lead'
  | 'whatsapp_click'
  | 'email_click'
  | 'consent_update'
  | 'portfolio_search'
  | 'portfolio_filter'
  | 'case_study_view'
  | 'case_study_cta_click'
  | 'github_click'
  | 'live_demo_click'
  | 'gallery_open'
  | 'video_play';

const ALLOWED_PARAMS = new Set([
  'cta_id',
  'cta_text',
  'location',
  'position',
  'service_slug',
  'pillar',
  'tab_id',
  'product_id',
  'role_id',
  'model_id',
  'slider_pct',
  'faq_index',
  'form_id',
  'step',
  'error_type',
  'services',
  'budget_band',
  'timeline',
  'analytics',
  'session_insights',
  'project_slug',
  'industry',
  'filter_type',
  'filter_value',
  'results_count',
  'query_length',
  'media_label',
  'provider',
  'quiz_level',
  'node_id',
  'traffic_type',
  'view_mode',
  'plan_id',
  'camp_number',
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
