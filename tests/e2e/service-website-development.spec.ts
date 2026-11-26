import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { isDesktop, quietVisit } from './helpers';

test.describe('Website Development service page', () => {
  test('renders dark-glass theme, zero placeholders, clean heading hierarchy, and valid JSON-LD @smoke', async ({
    page,
  }) => {
    await quietVisit(page, '/services/website-development');

    await expect(page.locator('[data-theme="glass"]')).toBeVisible();
    await expect(page.locator('header[data-header-theme="dark-glass"]')).toBeVisible();

    const levels = await page
      .locator('main :is(h1,h2,h3,h4,h5,h6)')
      .evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
    expect(levels.filter((l) => l === 1)).toHaveLength(1);
    for (let i = 1; i < levels.length; i++) {
      expect((levels[i] ?? 0) - (levels[i - 1] ?? 0)).toBeLessThanOrEqual(1);
    }

    const bodyText = await page.locator('main').innerText();
    expect(bodyText).not.toContain('[PLACEHOLDER');
    expect(bodyText).not.toContain('[X]');
    expect(bodyText).not.toContain('[CLOUDINARY_URL');
    expect(bodyText).toContain('Custom quote');

    const jsonLdScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const combined = jsonLdScripts.join('\n');
    expect(combined).toContain('"@type":"Service"');
    expect(combined).toContain('"@type":"FAQPage"');
    expect(combined).not.toContain('Who owns the website');
  });

  test('interactive tabs, marquee pause control, FAQ accordion, and /contact service prefill work', async ({
    page,
  }) => {
    await quietVisit(page, '/services/website-development');

    // Marquee Pause/Play toggle
    const pauseBtn = page.getByRole('button', { name: /Pause technology marquee/i });
    await pauseBtn.click();
    await expect(page.getByRole('button', { name: /Resume technology marquee/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Tabs keyboard navigation
    const businessTab = page.getByRole('tab', { name: 'Business Websites' });
    await businessTab.focus();
    await page.keyboard.press('ArrowRight');
    const corporateTab = page.getByRole('tab', { name: 'Corporate Websites' });
    await expect(corporateTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name: 'Corporate Websites' })).toBeVisible();

    // FAQ accordion open
    const secondFaq = page.getByRole('button', { name: /Can I update the website myself/i });
    await secondFaq.click();
    await expect(page.getByText(/simple CMS so you can edit content/i)).toBeVisible();

    // Desktop mega-menu stays readable & unclipped on dark-glass header
    const width = page.viewportSize()?.width ?? 1440;
    if (isDesktop(width)) {
      const servicesTrigger = page.getByRole('button', { name: 'Services' });
      await servicesTrigger.click();
      await expect(page.getByRole('link', { name: /View all services/i })).toBeVisible();
      await page.keyboard.press('Escape');
    }

    // CTA navigates to /contact?service=website-development and preselects chip
    await page
      .locator('main')
      .getByRole('link', { name: /Start a project/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contact\?service=website-development/);
    await expect(page.getByRole('checkbox', { name: /Website Development/i })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  test('passes WCAG 2.2 AA axe scan with zero serious or critical violations', async ({ page }) => {
    await quietVisit(page, '/services/website-development');
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));

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
});
