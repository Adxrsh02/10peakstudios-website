import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { isDesktop, quietVisit } from './helpers';

test.describe('Web App Development service page', () => {
  test('renders dark-glass theme, zero placeholders/banned copy, clean headings, and JSON-LD @smoke', async ({
    page,
  }) => {
    await quietVisit(page, '/services/web-app-development');

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
    expect(bodyText).not.toContain('[CONFIRM');
    expect(bodyText).not.toContain('[X]');
    expect(bodyText).not.toContain('[CLOUDINARY_URL');
    expect(bodyText).toContain('Custom quote');
    expect(bodyText).toContain('Post-launch bug-fix support included');
    expect(bodyText).toContain('Regular demos on a staging link');
    expect(bodyText).not.toContain('Who owns the code?');
    expect(bodyText).not.toContain('Do you sign NDAs?');

    const jsonLdScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const combined = jsonLdScripts.join('\n');
    expect(combined).toContain('"@type":"Service"');
    expect(combined).toContain('"@type":"BreadcrumbList"');
    expect(combined).toContain('"@type":"FAQPage"');
    expect(combined).not.toContain('Do you sign NDAs');
  });

  test('interactive slider, switchers, pause controls, mega-menu, and /contact prefill work', async ({
    page,
  }) => {
    await quietVisit(page, '/services/web-app-development');

    // Before/After slider keyboard interaction
    const slider = page.getByRole('slider', { name: /Compare before and after workflow/i });
    await slider.scrollIntoViewIfNeeded();
    await slider.focus();
    const beforeVal = Number(await slider.getAttribute('aria-valuenow'));
    await page.keyboard.press('ArrowRight');
    const afterVal = Number(await slider.getAttribute('aria-valuenow'));
    expect(afterVal).toBeGreaterThan(beforeVal);

    // Product switcher
    const crmTab = page.getByRole('tab', { name: /CRM Systems/i });
    await crmTab.click();
    await expect(crmTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('CRM Pipeline / Sales Operations')).toBeVisible();

    // Security fingerprint scan Pause button
    const pauseOrbitBtn = page.getByRole('button', { name: /Pause motion/i });
    await pauseOrbitBtn.click();
    await expect(page.getByRole('button', { name: /Resume motion/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Role switcher masks restricted modules for Staff
    const staffTab = page.getByRole('tab', { name: 'Staff', exact: true });
    await staffTab.click();
    await expect(staffTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Current View: Staff (Assigned Tasks Only)')).toBeVisible();
    await expect(page.getByLabel('Revenue & Margin (not available for Staff)')).toBeVisible();

    // Activity stream Pause control + sr-only static items exist
    const pauseFeedBtn = page.getByRole('button', { name: /^Pause$/i });
    await pauseFeedBtn.click();
    await expect(page.getByRole('button', { name: /^Play$/i })).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    // Engagement model toggle
    const fixedBtn = page.getByRole('button', { name: 'Fixed-scope project' });
    await fixedBtn.click();
    await expect(fixedBtn).toHaveAttribute('aria-pressed', 'true');

    // Desktop mega-menu readable on dark-glass navbar
    const width = page.viewportSize()?.width ?? 1440;
    if (isDesktop(width)) {
      const servicesTrigger = page.getByRole('button', { name: 'Services' });
      await servicesTrigger.click();
      await expect(page.getByRole('link', { name: /View all services/i })).toBeVisible();
      await page.keyboard.press('Escape');
    }

    // Zero horizontal overflow
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflow).toBe(false);

    // Hero CTA navigates to /contact?service=web-app-development and preselects Web App Development
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page
      .locator('main')
      .getByRole('link', { name: /Start a project/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contact\?service=web-app-development/);
    await expect(
      page.getByRole('checkbox', { name: /Full-Stack Web Applications/i }),
    ).toHaveAttribute('aria-checked', 'true');
  });

  test('passes WCAG 2.2 AA axe scan with zero serious or critical violations', async ({ page }) => {
    await quietVisit(page, '/services/web-app-development');
    await page.mouse.wheel(0, 1400);
    await page.waitForTimeout(350);
    await page.evaluate(() => window.scrollTo(0, 0));

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(
      serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
    ).toEqual([]);
  });
});
