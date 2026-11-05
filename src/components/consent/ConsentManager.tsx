'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, m } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { track } from '@/lib/analytics';
import {
  OPEN_CONSENT_EVENT,
  consumePendingOpen,
  createConsent,
  readConsent,
  writeConsent,
  type ConsentState,
} from '@/lib/consent';
import { AnalyticsScripts } from './AnalyticsScripts';

const loadFeatures = () => import('motion/react').then((mod) => mod.domAnimation);

type ConsentManagerProps = {
  ga4Id?: string | undefined;
  clarityId?: string | undefined;
  cfToken?: string | undefined;
};

/**
 * Global consent management (PRD 10.3, Design.md 10.11). Banner appears only after the loader,
 * with equal-weight Accept all / Reject all and a Customise dialog. Choices persist locally with
 * version and timestamp; "Privacy choices" re-opens the dialog. GA4 and Clarity never load before
 * the matching consent (PRD-ANL-04).
 */
export function ConsentManager({ ga4Id, clarityId, cfToken }: ConsentManagerProps) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, sessionInsights: false });

  // Show the banner when no valid consent exists, but never on top of the loader (PRD-ANL-08).
  useEffect(() => {
    const stored = readConsent();
    const html = document.documentElement;
    const reveal = () => {
      if (html.getAttribute('data-loader') === 'on') return false;
      setBannerOpen(true);
      return true;
    };
    let observer: MutationObserver | undefined;
    const init = window.setTimeout(() => {
      if (stored) {
        setConsent(stored);
        return;
      }
      if (!reveal()) {
        observer = new MutationObserver(() => {
          if (reveal()) observer?.disconnect();
        });
        observer.observe(html, { attributes: true, attributeFilter: ['data-loader'] });
      }
    }, 0);
    const onOpen = () => {
      const current = readConsent();
      setDraft({
        analytics: current?.analytics ?? false,
        sessionInsights: current?.sessionInsights ?? false,
      });
      setDialogOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    // A click that triggered lazy loading before this listener existed
    const queued = window.setTimeout(() => {
      if (consumePendingOpen()) onOpen();
    }, 0);
    return () => {
      window.clearTimeout(queued);
      window.clearTimeout(init);
      observer?.disconnect();
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
    };
  }, []);

  // Let other fixed UI (sticky CTA bar) and scroll padding react to the banner.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-consent-open', bannerOpen);
  }, [bannerOpen]);

  const save = useCallback(
    (analytics: boolean, sessionInsights: boolean) => {
      const previous = consent;
      const next = createConsent(analytics, sessionInsights);
      writeConsent(next);
      setConsent(next);
      setBannerOpen(false);
      setDialogOpen(false);
      const withdrawn =
        (previous?.analytics && !analytics) || (previous?.sessionInsights && !sessionInsights);
      if (withdrawn) {
        // Delete first-party analytics cookies and reload to unload scripts (Architecture.md 11.2)
        for (const c of document.cookie.split(';')) {
          const name = c.split('=')[0]?.trim() ?? '';
          if (/^(_ga|_gid|_clck|_clsk|_cl)/.test(name)) {
            document.cookie = `${name}=; Max-Age=0; path=/`;
            document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname}`;
          }
        }
        window.location.reload();
        return;
      }
      if (analytics) {
        window.setTimeout(
          () =>
            track('consent_update', {
              analytics: analytics ? 'granted' : 'denied',
              session_insights: sessionInsights ? 'granted' : 'denied',
            }),
          1500,
        );
      }
    },
    [consent],
  );

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <AnalyticsScripts consent={consent} ga4Id={ga4Id} clarityId={clarityId} cfToken={cfToken} />
        <AnimatePresence>
          {bannerOpen && (
            <m.section
              key="consent-banner"
              role="region"
              aria-label="Privacy choices"
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.25, ease: [0.2, 0.7, 0.2, 1] },
              }}
              exit={{ opacity: 0, y: 12, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }}
              className="fixed inset-x-3 bottom-3 z-(--z-consent) rounded-md border border-border bg-background p-5 shadow-lg sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px] sm:p-6"
            >
              <h2 className="font-heading text-h5 text-foreground">Your privacy choices</h2>
              <p className="mt-2 text-small text-muted-foreground">
                We use optional analytics to improve this site. You can accept, reject or choose.{' '}
                <a
                  href="/privacy#cookies"
                  className="font-medium text-link underline underline-offset-2"
                >
                  How we use cookies
                </a>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => save(true, true)}
                >
                  Accept all
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => save(false, false)}
                >
                  Reject all
                </Button>
              </div>
              <button
                type="button"
                className="mt-3 inline-flex min-h-11 items-center text-small font-semibold text-link underline-offset-4 hover:underline"
                onClick={() => {
                  setDraft({
                    analytics: consent?.analytics ?? false,
                    sessionInsights: consent?.sessionInsights ?? false,
                  });
                  setDialogOpen(true);
                }}
              >
                Customise
              </button>
            </m.section>
          )}
        </AnimatePresence>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent aria-describedby="consent-dialog-desc">
            <DialogTitle>Privacy choices</DialogTitle>
            <DialogDescription id="consent-dialog-desc">
              Choose which optional tools may run. Necessary features always stay on. You can change
              this at any time from &quot;Privacy choices&quot; in the footer.
            </DialogDescription>
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              <ConsentRow
                id="consent-necessary"
                title="Necessary"
                description="Security, spam protection on forms and remembering these choices. Always on."
                checked
                disabled
              />
              <ConsentRow
                id="consent-analytics"
                title="Analytics"
                description="Google Analytics 4 helps us understand which pages are useful. No personal details are sent."
                checked={draft.analytics}
                onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
              />
              <ConsentRow
                id="consent-session"
                title="Session insights"
                description="Microsoft Clarity shows anonymised heatmaps of how pages are used. Form fields are masked."
                checked={draft.sessionInsights}
                onChange={(v) => setDraft((d) => ({ ...d, sessionInsights: v }))}
              />
            </ul>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" size="md" onClick={() => save(false, false)}>
                Reject all
              </Button>
              <Button size="md" onClick={() => save(draft.analytics, draft.sessionInsights)}>
                Save choices
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </MotionConfig>
    </LazyMotion>
  );
}

type ConsentRowProps = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};

function ConsentRow({
  id,
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: ConsentRowProps) {
  return (
    <li className="flex items-start justify-between gap-6 py-4">
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="font-semibold text-foreground">
          {title}
        </label>
        <p id={`${id}-desc`} className="text-small text-muted-foreground">
          {description}
        </p>
      </div>
      <Switch
        id={id}
        checked={checked}
        disabled={disabled}
        aria-describedby={`${id}-desc`}
        {...(onChange ? { onCheckedChange: onChange } : {})}
      />
    </li>
  );
}
