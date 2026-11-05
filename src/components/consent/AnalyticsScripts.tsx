'use client';

import { useEffect } from 'react';
import { track, type AnalyticsEvent } from '@/lib/analytics';
import type { ConsentState } from '@/lib/consent';

type Props = {
  consent: ConsentState | null;
  ga4Id?: string | undefined;
  clarityId?: string | undefined;
  cfToken?: string | undefined;
};

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
};

function inject(id: string, src: string, attrs: Record<string, string> = {}) {
  if (document.getElementById(id)) return;
  const s = document.createElement('script');
  s.id = id;
  s.async = true;
  s.src = src;
  for (const [k, v] of Object.entries(attrs)) s.setAttribute(k, v);
  document.head.appendChild(s);
}

/**
 * Script loading per Architecture.md 11.2. Cloudflare Web Analytics (cookieless) loads when a token
 * is configured; GA4 only with Analytics consent; Clarity only with Session insights consent.
 * Also hosts the delegated click tracking for [data-cta] and [data-track] elements.
 */
export function AnalyticsScripts({ consent, ga4Id, clarityId, cfToken }: Props) {
  // Cloudflare Web Analytics (PRD OQ-18: always on, cookieless; switchable after legal review)
  useEffect(() => {
    if (!cfToken) return;
    inject('cf-web-analytics', 'https://static.cloudflareinsights.com/beacon.min.js', {
      defer: '',
      'data-cf-beacon': JSON.stringify({ token: cfToken }),
    });
  }, [cfToken]);

  // GA4 (Analytics consent)
  useEffect(() => {
    if (!ga4Id || !consent?.analytics) return;
    const w = window as W;
    w.dataLayer = w.dataLayer ?? [];
    w.gtag = function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };
    w.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
    });
    w.gtag('js', new Date());
    w.gtag('config', ga4Id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    inject('ga4', `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`);
  }, [ga4Id, consent?.analytics]);

  // Microsoft Clarity (Session insights consent) + consentv2
  useEffect(() => {
    if (!clarityId || !consent?.sessionInsights) return;
    const w = window as W;
    if (!w.clarity) {
      const q: unknown[] = [];
      const fn = ((...args: unknown[]) => {
        q.push(args);
      }) as NonNullable<W['clarity']>;
      fn.q = q;
      w.clarity = fn;
    }
    inject('clarity', `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`);
    w.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'granted' });
  }, [clarityId, consent?.sessionInsights]);

  // Delegated CTA / contact click tracking (no per-component client code)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-cta],[data-track]');
      if (!el) return;
      const location = el.dataset.ctaLocation;
      if (el.dataset.track) {
        track(el.dataset.track as AnalyticsEvent, { location });
      } else {
        track('cta_click', { cta_id: el.dataset.cta, cta_text: el.textContent?.trim(), location });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
