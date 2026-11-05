/**
 * Consent state (Architecture.md 11.1, PRD 10.3). Stored locally with version and timestamp;
 * re-prompted on version change or after 12 months. No server, no cookies of our own.
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
