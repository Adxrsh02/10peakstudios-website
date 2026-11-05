import { expect, test } from '@playwright/test';
import { blockThirdParty } from './helpers';

/**
 * PRD 10.3. Run against a build with dummy IDs (NEXT_PUBLIC_GA4_ID, NEXT_PUBLIC_CLARITY_ID) so the
 * gating is exercised; third-party requests are intercepted and aborted.
 */
test.describe('Consent (PRD-ANL-02 to 08)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('tps.loader.seen', '1'));
  });

  test('no GA4 or Clarity request before consent; banner has equal Accept and Reject', async ({
    page,
    context,
  }) => {
    const hits = await blockThirdParty(context);
    await page.goto('/');
    const banner = page.getByRole('region', { name: 'Privacy choices' });
    await expect(banner).toBeVisible();
    const accept = banner.getByRole('button', { name: 'Accept all' });
    const reject = banner.getByRole('button', { name: 'Reject all' });
    expect(await accept.getAttribute('class')).toBe(await reject.getAttribute('class'));
    await page.waitForTimeout(1500);
    expect(hits.filter((u) => /googletagmanager|clarity/.test(u))).toEqual([]);
  });

  test('Reject all keeps trackers off', async ({ page, context }) => {
    const hits = await blockThirdParty(context);
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject all' }).click();
    await expect(page.getByRole('region', { name: 'Privacy choices' })).toBeHidden();
    await page.waitForTimeout(1200);
    expect(hits.filter((u) => /googletagmanager|clarity/.test(u))).toEqual([]);
    const stored = await page.evaluate(() => localStorage.getItem('tps.consent.v1'));
    expect(JSON.parse(stored ?? '{}')).toMatchObject({
      version: 1,
      analytics: false,
      sessionInsights: false,
    });
  });

  test('Accept all loads GA4 and Clarity (when configured)', async ({ page, context }) => {
    const hits = await blockThirdParty(context);
    await page.goto('/');
    await page.getByRole('button', { name: 'Accept all' }).click();
    const configured = await page.evaluate(
      () => !!document.getElementById('ga4') || !!document.getElementById('clarity'),
    );
    test.skip(!configured, 'build has no GA4/Clarity IDs');
    await expect.poll(() => hits.some((u) => u.includes('googletagmanager'))).toBe(true);
    await expect.poll(() => hits.some((u) => u.includes('clarity.ms'))).toBe(true);
  });

  test('Privacy choices in the footer re-opens preferences', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Reject all' }).click();
    await page.getByRole('button', { name: 'Privacy choices' }).click();
    const dialog = page.getByRole('dialog', { name: 'Privacy choices' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('switch', { name: 'Necessary' })).toBeDisabled();
    await dialog.getByRole('switch', { name: 'Analytics' }).click();
    await dialog.getByRole('button', { name: 'Save choices' }).click();
    const stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('tps.consent.v1') ?? '{}'),
    );
    expect(stored.analytics).toBe(true);
  });
});
