'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { legalConfig } from '@/content/legal-config';
import { buildMailtoUrl, DATA_REQUEST_OPTIONS } from '@/content/legal-content';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  createConsent,
  isGpcEnabled,
  parseConsent,
  withdrawAnalyticsTracking,
  writeConsent,
  type ConsentState,
} from '@/lib/consent';

function subscribeConsent(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY) callback();
  };
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
    window.removeEventListener('storage', onStorage);
  };
}

function readConsentSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerConsentSnapshot(): string | null {
  return null;
}

function subscribeGpc() {
  return () => {};
}

function readGpcSnapshot(): boolean {
  return isGpcEnabled();
}

function getServerGpcSnapshot(): boolean {
  return false;
}

type PrivacyChoicesPanelProps = {
  ga4Id?: string | undefined;
};

/**
 * Interactive Privacy Choices & Data Request controls (/privacy-choices).
 * Integrates directly with ConsentManager via CONSENT_STORAGE_KEY & CONSENT_CHANGED_EVENT,
 * honors navigator.globalPrivacyControl, and executes immediate GA4/Clarity withdrawal.
 */
export function PrivacyChoicesPanel({ ga4Id }: PrivacyChoicesPanelProps) {
  const rawStored = useSyncExternalStore(
    subscribeConsent,
    readConsentSnapshot,
    getServerConsentSnapshot,
  );
  const gpcActive = useSyncExternalStore(subscribeGpc, readGpcSnapshot, getServerGpcSnapshot);
  const stored: ConsentState | null = parseConsent(rawStored);

  const [overrideDraft, setOverrideDraft] = useState<{
    analytics: boolean;
    sessionInsights: boolean;
  } | null>(null);
  const [liveStatus, setLiveStatus] = useState<string>('');

  const effectiveAnalytics = overrideDraft ? overrideDraft.analytics : (stored?.analytics ?? false);
  const effectiveSession = overrideDraft
    ? overrideDraft.sessionInsights
    : (stored?.sessionInsights ?? false);

  const persistChoice = (analytics: boolean, sessionInsights: boolean, label: string) => {
    const previous = stored;
    const next = createConsent(analytics, sessionInsights);
    writeConsent(next);
    setOverrideDraft(null);

    const turnedOff =
      (previous?.analytics && !analytics) ||
      (previous?.sessionInsights && !sessionInsights) ||
      (!analytics && !sessionInsights);

    if (turnedOff) {
      withdrawAnalyticsTracking(ga4Id);
    }
    setLiveStatus(label);
  };

  const statusSummary = stored
    ? stored.analytics && stored.sessionInsights
      ? 'All optional analytics enabled'
      : !stored.analytics && !stored.sessionInsights
        ? 'Optional analytics rejected (only strictly necessary tools run)'
        : 'Custom preferences saved'
    : gpcActive
      ? 'Global Privacy Control (GPC) active — optional analytics disabled by default'
      : 'No saved choice yet (all optional analytics stay disabled until you accept)';

  return (
    <div className="flex flex-col gap-12">
      {/* Live Status Summary Card */}
      <div className="rounded-md border border-border bg-surface-sunken p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-sm border border-border bg-background text-brand-accent"
            >
              <ShieldCheck className="size-5" strokeWidth={1.75} />
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-caption font-semibold tracking-[0.1em] text-brand-accent uppercase">
                Current Status
              </p>
              <h2 className="text-h4 text-foreground">{statusSummary}</h2>
              {stored && (
                <p className="text-small text-muted-foreground">
                  Last saved:{' '}
                  <time dateTime={stored.timestamp} className="price font-medium text-foreground">
                    {new Date(stored.timestamp).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </time>{' '}
                  (version v{stored.version})
                </p>
              )}
              {gpcActive && (
                <p className="mt-1 inline-flex items-center gap-1.5 text-small font-medium text-primary">
                  <CheckCircle2 className="size-4" aria-hidden="true" strokeWidth={1.75} />
                  Global Privacy Control (`navigator.globalPrivacyControl`) detected and honored.
                </p>
              )}
            </div>
          </div>

          <Link href="/privacy" className="text-small font-semibold text-link hover:underline">
            Read full Privacy Policy &rarr;
          </Link>
        </div>

        <p
          role="status"
          aria-live="polite"
          className="mt-4 min-h-6 text-small font-semibold text-success"
        >
          {liveStatus}
        </p>

        {/* Consent Categories List */}
        <ul className="mt-4 flex flex-col divide-y divide-border rounded-md border border-border bg-card px-5">
          <li className="flex items-start justify-between gap-6 py-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="page-consent-necessary" className="font-semibold text-foreground">
                Strictly Necessary
              </label>
              <p
                id="page-consent-necessary-desc"
                className="max-w-[60ch] text-small text-muted-foreground"
              >
                Required for Cloudflare security checks, Turnstile spam protection on /api/contact,
                one-time intro state, and remembering your privacy preferences. Cannot be disabled.
              </p>
            </div>
            <Switch
              id="page-consent-necessary"
              checked
              disabled
              aria-describedby="page-consent-necessary-desc"
            />
          </li>

          <li className="flex items-start justify-between gap-6 py-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="page-consent-analytics" className="font-semibold text-foreground">
                Analytics (Google Analytics 4)
              </label>
              <p
                id="page-consent-analytics-desc"
                className="max-w-[60ch] text-small text-muted-foreground"
              >
                Measures aggregate page popularity and button interactions without sending form
                details, Google Signals, or personalized ad identifiers.
              </p>
            </div>
            <Switch
              id="page-consent-analytics"
              checked={effectiveAnalytics}
              aria-describedby="page-consent-analytics-desc"
              onCheckedChange={(checked) =>
                setOverrideDraft({ analytics: checked, sessionInsights: effectiveSession })
              }
            />
          </li>

          <li className="flex items-start justify-between gap-6 py-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="page-consent-clarity" className="font-semibold text-foreground">
                Session Insights (Microsoft Clarity)
              </label>
              <p
                id="page-consent-clarity-desc"
                className="max-w-[60ch] text-small text-muted-foreground"
              >
                Anonymized scroll and interaction heatmaps used to spot layout bugs. All contact
                form inputs are masked directly in code.
              </p>
            </div>
            <Switch
              id="page-consent-clarity"
              checked={effectiveSession}
              aria-describedby="page-consent-clarity-desc"
              onCheckedChange={(checked) =>
                setOverrideDraft({ analytics: effectiveAnalytics, sessionInsights: checked })
              }
            />
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() =>
              persistChoice(
                effectiveAnalytics,
                effectiveSession,
                'Your privacy preferences have been saved and applied immediately.',
              )
            }
          >
            Save choices
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() =>
              persistChoice(true, true, 'All optional analytics tools have been enabled.')
            }
          >
            Accept all
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() =>
              persistChoice(
                false,
                false,
                'Optional analytics rejected. Tracking signals denied and analytics cookies cleared.',
              )
            }
          >
            Reject all
          </Button>
        </div>

        <p className="mt-5 text-small text-muted-foreground">
          <strong>How withdrawal works:</strong> Turning off Analytics or Session Insights
          immediately sends a denial signal (`analytics_storage: &apos;denied&apos;` / Clarity{' '}
          `consentv2` denied), removes injected analytics script tags from the page, and deletes
          first-party `_ga*`, `_gid`, `_clck`, and `_clsk` cookies across your browser domain.
        </p>
      </div>

      {/* Your Data Requests Block (Mailto Templates — Zero Extra Backend) */}
      <section aria-labelledby="data-requests-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[0.8125rem] font-medium tracking-[0.12em] text-brand-accent uppercase">
            Your Rights Under Indian Law (DPDP Act 2023)
          </p>
          <h2 id="data-requests-heading" className="text-h2 text-foreground">
            Your Data Requests
          </h2>
          <p className="max-w-[68ch] text-body text-muted-foreground">
            Use the buttons below to open your email application with a prefilled request addressed
            to{' '}
            <a
              href={`mailto:${legalConfig.privacyEmail}`}
              className="font-medium text-link underline underline-offset-2"
            >
              {legalConfig.privacyEmail}
            </a>
            . Target response window: {legalConfig.requestResponseTime}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DATA_REQUEST_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="flex flex-col justify-between gap-4 rounded-md border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-h5 text-foreground">{opt.title}</h3>
                <p className="text-small text-muted-foreground">{opt.description}</p>
              </div>
              <div>
                <Button asChild variant="secondary" size="sm">
                  <a href={buildMailtoUrl(legalConfig.privacyEmail, opt.subject, opt.bodyTemplate)}>
                    <Mail className="size-4" aria-hidden="true" strokeWidth={1.75} />
                    Email privacy request
                    <ArrowRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
