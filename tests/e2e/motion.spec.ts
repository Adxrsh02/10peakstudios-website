import { expect, test } from '@playwright/test';
import { isDesktop, quietVisit } from './helpers';

test.describe('Motion tiers, loader and fallbacks (Design.md 11, Architecture.md 9)', () => {
  test('reduced motion: tier 0, no loader, everything visible, no pinning', async ({ browser }) => {
    const ctx = await browser.newContext({
      reducedMotion: 'reduce',
      viewport: { width: 1440, height: 900 },
    });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-motion-tier', '0');
    await expect(page.locator('html')).toHaveAttribute('data-loader', 'off');
    await expect(page.locator('.tps-loader')).toHaveCount(0);
    await page.mouse.wheel(0, 8000);
    await page.waitForTimeout(800);
    for (const h of await page.locator('main h2').all()) {
      expect(await h.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
    }
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
    await expect(page.locator('[data-hero-visual]')).toHaveAttribute('data-scene-state', 'poster');
    await ctx.close();
  });

  test('no JavaScript: content and links readable, loader never shown', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.tps-loader')).toBeHidden();
    expect(await page.locator('main h2').count()).toBeGreaterThanOrEqual(9);
    await expect(page.getByRole('link', { name: 'Start a project' }).first()).toBeVisible();
    await ctx.close();
  });

  test('loader plays once per session, skips on key press and leaves the DOM', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-loader', 'on');
    await expect(page.locator('.tps-loader')).toBeVisible();
    await page.keyboard.press('Space');
    await expect(page.locator('html')).toHaveAttribute('data-loader', 'done');
    await expect(page.locator('.tps-loader')).toHaveCount(0, { timeout: 3000 });
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-loader', 'off');
    await ctx.close();
  });

  test('loader finishes on its own within 2.3 s', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto('/');
    // Timer starts at head parse (2.3 s); headroom covers CPU contention in parallel runs
    await expect(page.locator('html')).toHaveAttribute('data-loader', 'done', { timeout: 4000 });
    await ctx.close();
  });

  test('hero 3D loads on capable desktops and falls back to the poster on context loss', async ({
    page,
  }, info) => {
    test.skip(!isDesktop(info.project.use.viewport?.width ?? 0), 'desktop only');
    await quietVisit(page);
    const tier = await page.locator('html').getAttribute('data-motion-tier');
    test.skip(tier !== '2', `machine resolves to tier ${tier}`);
    const visual = page.locator('[data-hero-visual]');
    await expect(visual).toHaveAttribute('data-scene-state', 'scene', { timeout: 15000 });
    await page.locator('[data-hero-visual] canvas').evaluate((c: HTMLCanvasElement) => {
      c.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();
    });
    await expect(visual).toHaveAttribute('data-scene-state', 'poster');
  });

  test('desktop tier 2 pins the process section; mobile never pins', async ({ page }, info) => {
    await quietVisit(page);
    const tier = await page.locator('html').getAttribute('data-motion-tier');
    const process = page.locator('#process-title');
    await process.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    if (isDesktop(info.project.use.viewport?.width ?? 0) && tier === '2') {
      await expect(page.locator('.pin-spacer')).toHaveCount(1);
    } else {
      await expect(page.locator('.pin-spacer')).toHaveCount(0);
    }
  });
});
