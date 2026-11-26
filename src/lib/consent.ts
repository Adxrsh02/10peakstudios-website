/**
 * Consent state (Architecture.md 11.1, PRD 10.3). Stored locally with version and timestamp;
 * re-prompted on version change or after 12 months. Honors Global Privacy Control (GPC).
 */
export const CONSENT_STORAGE_KEY = 'tps.consent.v1';
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
export const OPEN_CONSENT_EVENT = 'tps:open-consent';
export const CONSENT_CHANGED_EVENT = 'tps:consent-changed';

export type ConsentState = {
  version: number;
  timestamp: string;
  analytics: boolean;
  sessionInsights: boolean;
};

type NavigatorWithGpc = Navigator & { globalPrivacyControl?: boolean };

export function isGpcEnabled(
  nav: NavigatorWithGpc | undefined = typeof navigator !== 'undefined'
    ? (navigator as NavigatorWithGpc)
    : undefined,
): boolean {
  return Boolean(nav?.globalPrivacyControl === true);
}

export function createConsent(
  analytics: boolean,
  sessionInsights: boolean,
  now = new Date(),
): ConsentState {
  return { version: CONSENT_VERSION, timestamp: now.toISOString(), analytics, sessionInsights };
}

/** Returns a valid stored consent, or null when absent, malformed, outdated or expired. */
export function parseConsent(raw: string | null, now = Date.now()): ConsentState | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== 'object' || value === null) return null;
    const v = value as Record<string, unknown>;
    if (v.version !== CONSENT_VERSION) return null;
    if (typeof v.analytics !== 'boolean' || typeof v.sessionInsights !== 'boolean') return null;
    if (typeof v.timestamp !== 'string') return null;
    const ts = Date.parse(v.timestamp);
    if (Number.isNaN(ts) || now - ts > CONSENT_MAX_AGE_MS) return null;
    return {
      version: CONSENT_VERSION,
      timestamp: v.timestamp,
      analytics: v.analytics,
      sessionInsights: v.sessionInsights,
    };
  } catch {
    return null;
  }
}

export function readConsent(): ConsentState | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null; // storage blocked: treated as no consent (Architecture.md 15)
  }
}

export function writeConsent(state: ConsentState): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage blocked: choice applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_CHANGED_EVENT, { detail: state }));
}

type TrackingWindow = Window & {
  [key: `ga-disable-${string}`]: boolean | undefined;
  gtag?: (...args: unknown[]) => void;
  clarity?: (...args: unknown[]) => void;
};

/** Clears first-party analytics cookies across host and parent domain variants. */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0]?.trim() ?? '';
    if (/^(_ga|_gid|_clck|_clsk|_cl|CLID)/.test(name)) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      if (typeof location !== 'undefined' && location.hostname) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
      }
    }
  }
}

/**
 * Immediately signals denial to loaded GA4/Clarity instances, deletes first-party analytics cookies,
 * and removes injected script tags so tracking stops at once. Returns true if scripts were loaded.
 */
export function withdrawAnalyticsTracking(ga4Id?: string): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  const w = window as unknown as TrackingWindow;

  if (ga4Id) {
    w[`ga-disable-${ga4Id}`] = true;
  }
  if (typeof w.gtag === 'function') {
    w.gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
  if (typeof w.clarity === 'function') {
    w.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' });
  }

  clearAnalyticsCookies();

  const gaScript = document.getElementById('ga4');
  const clarityScript = document.getElementById('clarity');
  const hadLiveScripts = Boolean(gaScript || clarityScript);
  gaScript?.remove();
  clarityScript?.remove();

  return hadLiveScripts;
}

/** A "Privacy choices" click that arrives before the lazily loaded manager is queued, not lost. */
let pendingOpen = false;
export function markPendingOpen(): void {
  pendingOpen = true;
}
export function consumePendingOpen(): boolean {
  const value = pendingOpen;
  pendingOpen = false;
  return value;
}
