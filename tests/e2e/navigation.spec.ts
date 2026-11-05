import { expect, test } from '@playwright/test';
import { isDesktop, quietVisit, waitForMotion } from './helpers';

test.describe('Global shell (PRD 6, 7)', () => {
  test('skip link is the first focusable element and targets main', async ({ page }) => {
    await quietVisit(page);
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skip).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('desktop mega-menu works by keyboard', async ({ page }, info) => {
    test.skip(!isDesktop(info.project.use.viewport?.width ?? 0), 'desktop only');
    await quietVisit(page);
    const trigger = page.getByRole('button', { name: 'Services' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const menu = page.locator('[data-slot="navigation-menu-content"]');
    await expect(menu.locator('a[href^="/services/"]')).toHaveCount(8);
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('mobile drawer traps focus, closes on Escape and returns focus', async ({ page }, info) => {
    test.skip(isDesktop(info.project.use.viewport?.width ?? 0), 'mobile/tablet only');
    await quietVisit(page);
    const open = page.getByRole('button', { name: 'Open menu' });
    await open.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    for (let i = 0; i < 25; i++) {
      await page.keyboard.press('Tab');
      expect(await dialog.evaluate((d) => d.contains(document.activeElement))).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });

  test('sticky CTA bar appears on mobile after the hero', async ({ page }, info) => {
    test.skip(isDesktop(info.project.use.viewport?.width ?? 0), 'mobile/tablet only');
    await quietVisit(page);
    const bar = page.locator('[data-sticky-cta]');
    await expect(bar).toBeHidden();
    await page.mouse.wheel(0, 1600);
    await expect(bar).toBeVisible();
    await expect(bar.getByRole('link', { name: /Start a project/ })).toBeVisible();
  });

  test('back-to-top appears after two viewports and returns to the top', async ({ page }) => {
    await quietVisit(page);
    const btn = page.getByRole('button', { name: 'Back to top' });
    await expect(btn).toBeHidden();
    // Hydrated, GSAP loaded and ScrollTrigger refreshed: a late refresh would cancel the smooth scroll
    await waitForMotion(page);
    for (let i = 0; i < 6; i++) await page.mouse.wheel(0, 800);
    await expect(btn).toBeVisible();
    await btn.click();
    await expect
      .poll(() => page.evaluate(() => window.scrollY), { timeout: 12000 })
      .toBeLessThan(5);
  });

  test('FAQ accordion expands and answers stay in the DOM', async ({ page }) => {
    await quietVisit(page);
    const q = page.getByRole('button', { name: 'What does 10PeakStudio do?' });
    await q.scrollIntoViewIfNeeded();
    await expect(page.getByText('Our work is organised around three pillars')).toBeAttached();
    await q.click();
    await expect(q).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('Our work is organised around three pillars')).toBeVisible();
  });

  test('stub routes resolve and are noindex', async ({ page }) => {
    await quietVisit(page, '/services/ai-automation');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('AI and Automation');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  });
});
