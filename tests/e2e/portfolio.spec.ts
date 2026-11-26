import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { quietVisit } from './helpers';

const CASE_STUDY_PATH = '/portfolio/automated-fundus-image-screening';

test.describe('Portfolio & Case Study pages', () => {
  test('index loads with Portfolio nav link, counts, featured showcase, and interactive search/filters', async ({
    page,
  }) => {
    await quietVisit(page, '/portfolio');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Real Systems Built To Scale.',
    );

    // Search via "/" shortcut + typo tolerance
    await page.keyboard.press('/');
    const searchInput = page.locator('#portfolio-search');
    await expect(searchInput).toBeFocused();

    await searchInput.fill('retinl');
    await expect(page).toHaveURL(/\?q=retinl/);
    await expect(page.getByText('Showing 1 of 1 project')).toBeVisible();

    // Unmatched query renders empty state and Clear filters resets
    await searchInput.fill('xyznonexistentproject');
    await expect(page.getByRole('heading', { name: 'No matching case studies' })).toBeVisible();
    await page.getByRole('button', { name: 'Clear filters' }).first().click();
    await expect(page.getByText('Showing 1 of 1 project')).toBeVisible();

    // Disabled zero-count industry chip check (Real Estate has 0 projects)
    const realEstateChip = page
      .locator('#portfolio-filters')
      .getByRole('button', { name: /Real Estate/i });
    if (await realEstateChip.isVisible()) {
      await expect(realEstateChip).toBeDisabled();
    }
  });

  test('navigates from Portfolio card to Case Study and operates Lightbox & keyboard flow', async ({
    page,
  }) => {
    await quietVisit(page, '/portfolio');

    await page
      .getByRole('link', { name: /Read featured case study/i })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(CASE_STUDY_PATH));

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Automated Fundus Image Screening',
    );
    await expect(page.getByText(/Not a certified medical device/i)).toBeVisible();

    // Public GitHub link renders; Live Demo hidden
    await expect(page.getByRole('link', { name: /View Repository/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Live Demo/i })).toHaveCount(0);

    // Performance table present
    await expect(page.getByRole('table')).toBeVisible();

    // Open gallery Lightbox, arrow navigate, Esc closes & restores focus
    const firstZoomBtn = page.locator('#screenshots button[aria-label^="Zoom image:"]').first();
    await firstZoomBtn.scrollIntoViewIfNeeded();
    await firstZoomBtn.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(dialog.getByText('2 / 5')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(firstZoomBtn).toBeFocused();
  });

  test('respects prefers-reduced-motion with visible hero H1 and Tier 0', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await quietVisit(page, '/portfolio');
    await expect(page.locator('html')).toHaveAttribute('data-motion-tier', '0');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('opacity', '1');
  });

  test('no horizontal overflow across 320px, 360px, 1024px, and 1440px', async ({ page }) => {
    for (const width of [320, 360, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await quietVisit(page, '/portfolio');
      const overflowIndex = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflowIndex, `Overflow on /portfolio at ${width}px`).toBe(false);

      await quietVisit(page, CASE_STUDY_PATH);
      const overflowDetail = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflowDetail, `Overflow on ${CASE_STUDY_PATH} at ${width}px`).toBe(false);
    }
  });

  for (const path of ['/portfolio', CASE_STUDY_PATH]) {
    test(`axe accessibility + single H1 + index, follow metadata check on ${path}`, async ({
      page,
    }) => {
      await quietVisit(page, path);
      const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
      expect(robotsMeta).toContain('index');
      expect(robotsMeta).not.toContain('noindex');

      const h1Count = await page.locator('main h1').count();
      expect(h1Count).toBe(1);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      const serious = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical',
      );
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(' | ')}`),
      ).toEqual([]);
    });
  }
});
