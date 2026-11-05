import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { quietVisit } from './helpers';

test.describe('Accessibility (WCAG 2.2 AA, Rules.md 9)', () => {
  for (const path of ['/', '/services', '/styleguide', '/does-not-exist']) {
    test(`axe: no serious or critical violations on ${path}`, async ({ page }) => {
      await quietVisit(page, path);
      await page.mouse.wheel(0, 20000);
      await page.waitForTimeout(1500);
      await page.evaluate(() => window.scrollTo(0, 0));
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .exclude('canvas')
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

  test('one h1 and no skipped heading levels on home', async ({ page }) => {
    await quietVisit(page);
    const levels = await page
      .locator('main :is(h1,h2,h3,h4,h5,h6)')
      .evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    for (let i = 1; i < levels.length; i++)
      expect((levels[i] ?? 0) - (levels[i - 1] ?? 0)).toBeLessThanOrEqual(1);
  });
});

test.describe('Security headers and HTTP behaviour (Architecture.md 13)', () => {
  test('static responses carry the security headers @smoke', async ({ request }) => {
    const res = await request.get('/');
    const h = res.headers();
    expect(h['content-security-policy']).toContain("frame-ancestors 'none'");
    expect(h['content-security-policy']).toContain("object-src 'none'");
    expect(h['strict-transport-security']).toContain('max-age=31536000');
    expect(h['x-content-type-options']).toBe('nosniff');
    expect(h['x-frame-options']).toBe('DENY');
    expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });

  test('custom 404 page with HTTP 404 (PRD-GLB-09)', async ({ request }) => {
    const res = await request.get('/no-such-page');
    expect(res.status()).toBe(404);
    expect(await res.text()).toContain('Page not found');
  });

  test('no CSP violations or console errors on home', async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (m) => {
      // CSP upgrade-insecure-requests upgrades some prefetches to https://localhost during plain-HTTP
      // local runs; impossible in production (HTTPS), so only that artefact is ignored here.
      if (m.type() === 'error' && !m.text().includes('ERR_SSL_PROTOCOL_ERROR'))
        problems.push(m.text());
    });
    page.on('pageerror', (e) => problems.push(String(e)));
    await quietVisit(page);
    await page.mouse.wheel(0, 20000);
    await page.waitForTimeout(2000);
    expect(problems).toEqual([]);
  });
});
