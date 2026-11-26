import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { blockThirdParty, isDesktop, quietVisit } from './helpers';

test.describe('Legal pages, Privacy Choices & GPC', () => {
  for (const path of ['/privacy', '/terms', '/privacy-choices'] as const) {
    test(`axe WCAG 2.2 AA & heading structure clean on ${path}`, async ({ page }) => {
      await quietVisit(page, path);
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(400);
      await page.evaluate(() => window.scrollTo(0, 0));

      const levels = await page
        .locator('main :is(h1,h2,h3,h4,h5,h6)')
        .evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
      expect(levels.filter((l) => l === 1)).toHaveLength(1);
      for (let i = 1; i < levels.length; i++) {
        expect((levels[i] ?? 0) - (levels[i - 1] ?? 0)).toBeLessThanOrEqual(1);
      }

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(
        serious.map(
          (v) =>
            `${v.id}: ${v.nodes
              .map((n) => n.target.join(' '))
              .slice(0, 3)
              .join(' | ')}`,
        ),
      ).toEqual([]);
    });
  }

  test('robots meta directives: /privacy and /terms are indexable, /privacy-choices is noindex', async ({
    request,
  }) => {
    const privacyHtml = await (await request.get('/privacy')).text();
    const termsHtml = await (await request.get('/terms')).text();
    const choicesHtml = await (await request.get('/privacy-choices')).text();

    expect(privacyHtml).not.toContain('noindex');
    expect(termsHtml).not.toContain('noindex');
    expect(choicesHtml).toMatch(/name="robots"\s+content="noindex/i);
  });

  test('/privacy renders summary, tables, TOC navigation, and grievance details', async ({
    page,
  }) => {
    await quietVisit(page, '/privacy');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy');
    await expect(page.getByText('Draft: under legal review')).toBeVisible();
    await expect(page.getByRole('heading', { name: /At a glance/i })).toBeVisible();
    await expect(page.getByText('tps.consent.v1')).toBeVisible();
    await expect(page.getByText('Cloudflare (Pages, Workers, Turnstile, D1)')).toBeVisible();

    const width = page.viewportSize()?.width ?? 1440;
    if (isDesktop(width)) {
      const toc = page.getByRole('navigation', { name: 'Table of contents' });
      await expect(toc).toBeVisible();
      await toc.getByRole('link', { name: /Grievance Officer/i }).click();
      await expect(page).toHaveURL(/#grievance-officer/);
    } else {
      const drawerBtn = page.getByRole('button', { name: /On this page/i });
      await expect(drawerBtn).toBeVisible();
      await drawerBtn.click();
      await page.getByRole('link', { name: /13\s+Grievance Officer/i }).click();
      await expect(page).toHaveURL(/#grievance-officer/);
    }
  });

  test('/terms renders studio notice, research disclaimer, and governing law', async ({ page }) => {
    await quietVisit(page, '/terms');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Terms and Conditions');
    await expect(
      page.getByText(/Research project\. Not a certified medical device/i),
    ).toBeVisible();
    await expect(page.getByText(/laws of India/i).first()).toBeVisible();
  });

  test('/privacy-choices toggles persist, withdraw tracking, and support keyboard operation', async ({
    page,
    context,
  }) => {
    const hits = await blockThirdParty(context);
    await quietVisit(page, '/privacy-choices', { consent: false });

    const analyticsSwitch = page.getByRole('switch', { name: /Analytics \(Google Analytics 4\)/i });
    const claritySwitch = page.getByRole('switch', {
      name: /Session Insights \(Microsoft Clarity\)/i,
    });
    const necessarySwitch = page.getByRole('switch', { name: /Strictly Necessary/i });

    await expect(necessarySwitch).toBeDisabled();
    await analyticsSwitch.focus();
    await page.keyboard.press('Space');
    await expect(analyticsSwitch).toHaveAttribute('aria-checked', 'true');

    await claritySwitch.click();
    await page.getByRole('button', { name: 'Save choices' }).click();
    await expect(page.getByRole('status')).toContainText('saved and applied');

    let stored = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('tps.consent.v1') ?? '{}'),
    );
    expect(stored).toMatchObject({ version: 1, analytics: true, sessionInsights: true });

    await page.getByRole('button', { name: 'Reject all' }).click();
    await expect(page.getByRole('status')).toContainText('rejected');
    stored = await page.evaluate(() => JSON.parse(localStorage.getItem('tps.consent.v1') ?? '{}'));
    expect(stored).toMatchObject({ version: 1, analytics: false, sessionInsights: false });

    await page.waitForTimeout(800);
    expect(hits.filter((u) => /googletagmanager|clarity/.test(u))).toEqual([]);
  });

  test('Global Privacy Control (GPC) automatically opts out without banner interruption', async ({
    page,
    context,
  }) => {
    const hits = await blockThirdParty(context);
    await page.addInitScript(() => {
      sessionStorage.setItem('tps.loader.seen', '1');
      Object.defineProperty(navigator, 'globalPrivacyControl', {
        get: () => true,
        configurable: true,
      });
    });

    await page.goto('/privacy-choices');
    await expect(page.getByRole('region', { name: 'Privacy choices' })).toBeHidden();
    await expect(page.getByText(/Global Privacy Control \(GPC\) signal detected/i)).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate(() => JSON.parse(localStorage.getItem('tps.consent.v1') ?? '{}')),
      )
      .toMatchObject({ version: 1, analytics: false, sessionInsights: false });
    expect(hits.filter((u) => /googletagmanager|clarity/.test(u))).toEqual([]);
  });

  test('footer Legal links and Privacy choices button work cleanly', async ({ page }) => {
    await quietVisit(page, '/privacy');
    const footer = page.locator('footer');
    await expect(footer.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy',
    );
    await expect(footer.getByRole('link', { name: 'Terms and Conditions' })).toHaveAttribute(
      'href',
      '/terms',
    );
    await footer.getByRole('button', { name: 'Privacy choices' }).click();
    await expect(page.getByRole('dialog', { name: 'Privacy choices' })).toBeVisible();
  });
});
