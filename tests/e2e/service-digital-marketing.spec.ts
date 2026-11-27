import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { isDesktop, quietVisit } from './helpers';

test.describe('Digital Marketing service page', () => {
  test('renders dark-glass theme, zero placeholders/banned copy, and valid JSON-LD @smoke', async ({
    page,
  }) => {
    await quietVisit(page, '/services/digital-marketing');

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
    expect(bodyText).not.toContain('Sharma Dental');
    expect(bodyText).not.toContain('Do you keep full ownership of our accounts?');
    expect(bodyText).toContain('Custom quote');

    const jsonLdScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const combined = jsonLdScripts.join('\n');
    expect(combined).toContain('"@type":"Service"');
    expect(combined).toContain('"@type":"BreadcrumbList"');
    expect(combined).toContain('"@type":"FAQPage"');
    expect(combined).not.toContain('ownership of our accounts');
  });

  test('visibility ladder stepping, zero horizontal overflow across viewports, and sticky audit bar work', async ({
    page,
  }) => {
    await quietVisit(page, '/services/digital-marketing');

    const nextBtn = page.getByRole('button', { name: /Next step/i });
    await nextBtn.scrollIntoViewIfNeeded();
    await nextBtn.click();
    await expect(page.getByText('STAGE 02 · DIRECT ANSWER SNIPPET')).toBeVisible();

    // Responsive overflow check across target widths & mobile sticky "Free audit" CTA bar
    for (const width of [360, 390, 414, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 844 });
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );
      const [sw, cw] = await page.evaluate(() => [
        document.documentElement.scrollWidth,
        document.documentElement.clientWidth,
      ]);
      expect(sw, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(cw);
    }

    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(
      page.locator('[data-sticky-cta]').getByRole('link', { name: /Free audit/i }),
    ).toBeVisible();
  });

  test('brand simulator updates ladder, quiz scores & prefills contact form cleanly', async ({
    page,
  }) => {
    await quietVisit(page, '/services/digital-marketing');

    // A) Simulator flow
    const brandInput = page.getByLabel('Try it with your brand');
    const cityInput = page.getByLabel('Target city');
    await brandInput.fill('<script>Kiran Dental</script>');
    await cityInput.fill('Pune');
    await page.getByRole('button', { name: /Show my visibility/i }).click();

    const ladder = page.locator('#visibility-ladder');
    await expect(ladder).toContainText('scriptKiran Dental/script');
    await expect(ladder).toContainText('Pune');

    // B) TrafficFlow toggle
    const b2bTab = page.getByRole('tab', { name: 'B2B / SaaS' });
    await b2bTab.scrollIntoViewIfNeeded();
    await b2bTab.click();
    await expect(b2bTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByText('Qualified Demo Requests')).toBeVisible();

    // C) CodeFlip switch
    const switchBtn = page.getByRole('switch');
    await switchBtn.scrollIntoViewIfNeeded();
    await switchBtn.click();
    await expect(switchBtn).toHaveAttribute('aria-checked', 'true');
    await expect(page.getByText('"https://schema.org"')).toBeVisible();

    // D) GrowthSpeedSlider range control
    const rangeSlider = page.getByLabel('Select growth scope');
    await rangeSlider.scrollIntoViewIfNeeded();
    await rangeSlider.focus();
    await page.keyboard.press('ArrowRight');
    await expect(rangeSlider).toHaveAttribute('aria-valuetext', 'Full Growth');

    // E) GrowthControlRoom: desktop detail panel vs mobile accessible bottom sheet
    const width = page.viewportSize()?.width ?? 1440;
    if (isDesktop(width)) {
      const geoBtn = page.getByRole('button', { name: /GEO Citations/i }).first();
      await geoBtn.scrollIntoViewIfNeeded();
      await geoBtn.click();
      await expect(page.getByText('03 Generative Engine (GEO)')).toBeVisible();

      // Mega-menu readable & dismissible
      const servicesBtn = page.getByRole('button', { name: 'Services' });
      await servicesBtn.click();
      const viewAll = page.getByRole('link', { name: /View all services/i });
      await expect(viewAll).toBeVisible();
      await page.mouse.move(0, 300);
      await page.keyboard.press('Escape');
      await expect(viewAll).toBeHidden();
    } else {
      const geoMobileBtn = page.getByRole('button', { name: /03.*GEO Citations/i });
      await geoMobileBtn.scrollIntoViewIfNeeded();
      await geoMobileBtn.click();
      const sheet = page.getByRole('dialog');
      await expect(sheet).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(sheet).toBeHidden();
    }

    // F) VisibilityQuiz 10-question flow -> Contact form sessionStorage prefill
    const quizSection = page.locator('#audit-section');
    await quizSection.scrollIntoViewIfNeeded();
    for (let i = 0; i < 6; i++) {
      await quizSection.getByRole('button', { name: /^Yes \(1\)/i }).click();
    }
    for (let i = 6; i < 10; i++) {
      await quizSection.getByRole('button', { name: /^No \(3\)/i }).click();
    }
    await expect(quizSection).toContainText('Level: Answered');

    await quizSection.getByRole('link', { name: /Get my full audit/i }).click();
    await expect(page).toHaveURL(/\/contact\?service=digital-marketing/);
    await expect(page.getByRole('checkbox', { name: /Digital Marketing/i })).toHaveAttribute(
      'aria-checked',
      'true',
    );
    await expect(page.locator('#message')).toHaveValue(/60\/100 \(Answered\)/);
  });

  test('stacks ladder under reduced motion and passes WCAG 2.2 AA axe scan', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await quietVisit(page, '/services/digital-marketing');

    const visibleStages = await page.locator('#visibility-ladder article:visible').count();
    expect(visibleStages).toBe(4);

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
