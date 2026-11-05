import type { BrowserContext, Page } from '@playwright/test';

/** Skip the loader (already seen this session) and pre-set consent so overlays do not interfere. */
export async function quietVisit(page: Page, path = '/', opts: { consent?: boolean } = {}) {
  await page.addInitScript((withConsent) => {
    try {
      sessionStorage.setItem('tps.loader.seen', '1');
      if (withConsent) {
        localStorage.setItem(
          'tps.consent.v1',
          JSON.stringify({
            version: 1,
            timestamp: new Date().toISOString(),
            analytics: false,
            sessionInsights: false,
          }),
        );
      }
    } catch {
      /* ignore */
    }
  }, opts.consent ?? true);
  await page.goto(path);
}

/** Waits until the lazy motion layer (GSAP, ScrollTrigger, Lenis on Tier 2) is initialised. */
export async function waitForMotion(page: Page) {
  await page.waitForSelector('html[data-motion-ready], html[data-motion-tier="0"]', {
    state: 'attached',
    timeout: 15000,
  });
}

export async function blockThirdParty(context: BrowserContext) {
  const hits: string[] = [];
  await context.route(
    /(googletagmanager|google-analytics|clarity\.ms|cloudflareinsights)/,
    (route) => {
      hits.push(route.request().url());
      return route.abort();
    },
  );
  return hits;
}

export const isDesktop = (width: number) => width >= 1024;
