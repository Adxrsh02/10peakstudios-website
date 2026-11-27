import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { isDesktop, quietVisit, waitForMotion } from './helpers';

test.describe('How We Work (/about/process)', () => {
  test('renders light-to-dark Ascent theme, light navbar, ordered camps, and valid JSON-LD @smoke', async ({
    page,
  }) => {
    await quietVisit(page, '/about/process');

    await expect(page.locator('[data-theme="ascent"]')).toBeVisible();
    await expect(page.locator('header[data-header-theme="dark-glass"]')).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://10peakstudios.com/about/process',
    );

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
    expect(bodyText).not.toContain('[CLOUDINARY_URL');

    const campItems = page.locator('#the-ascent ol > li');
    await expect(campItems).toHaveCount(6);

    const jsonLdScripts = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const combined = jsonLdScripts.join('\n');
    expect(combined).toContain('"@type":"WebPage"');
    expect(combined).toContain('"@type":"BreadcrumbList"');
    expect(combined).toContain('"@type":"FAQPage"');
  });

  test('Ascent prev/next, scroll progression, mobile trail, FAQ, CTAs, and responsive widths work', async ({
    page,
  }) => {
    await quietVisit(page, '/about/process');
    await waitForMotion(page);

    // Hero and final CTAs point cleanly to /contact
    const heroPrimary = page.getByRole('link', { name: /Book a free call/i }).first();
    await expect(heroPrimary).toHaveAttribute('href', '/contact');
    await expect(page.getByRole('link', { name: 'Start a project' }).last()).toHaveAttribute(
      'href',
      '/contact',
    );

    // Step through The Ascent via Next/Prev controls and keyboard arrows
    const nextBtn = page.getByRole('button', { name: 'Next camp' });
    const prevBtn = page.getByRole('button', { name: 'Previous camp' });
    await nextBtn.scrollIntoViewIfNeeded();
    await expect(page.getByText('Camp 1 of 6')).toBeVisible();

    await nextBtn.click();
    await expect(page.getByText('Camp 2 of 6')).toBeVisible();

    await nextBtn.focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText('Camp 3 of 6')).toBeVisible();

    await prevBtn.click();
    await expect(page.getByText('Camp 2 of 6')).toBeVisible();
    await prevBtn.click();
    await expect(page.getByText('Camp 1 of 6')).toBeVisible();

    const width = page.viewportSize()?.width ?? 1440;
    if (!isDesktop(width)) {
      await expect(page.locator('[data-mobile-trail-fill]')).toBeVisible();
    } else {
      // Desktop ScrollTrigger scrubs toward later camps without getting stuck
      const ascentTop = await page.locator('#the-ascent').evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return window.scrollY + rect.top + window.innerHeight * 0.9;
      });
      await page.evaluate((y) => window.scrollTo(0, y), ascentTop);
      await expect(page.locator('#the-ascent')).toBeVisible();
    }

    // FAQ accordion (first open by default, toggle 4th item)
    await expect(
      page.getByText(
        'It depends on scope. You get a clear timeline in your proposal before anything starts.',
      ),
    ).toBeVisible();

    const faq4 = page.getByRole('button', {
      name: 'Do you work with clients outside Navi Mumbai?',
    });
    await faq4.scrollIntoViewIfNeeded();
    await faq4.click();
    await expect(faq4).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByText('We work with businesses across India and beyond')).toBeVisible();

    // Zero horizontal overflow across mobile, tablet, and desktop widths
    for (const vw of [360, 390, 414, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width: vw, height: 844 });
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
      expect(sw, `horizontal overflow at ${vw}px`).toBeLessThanOrEqual(cw);
    }

    // Mobile sticky CTA override ("Book a call") with >= 44px touch target
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 1000));
    const stickyCta = page.locator('[data-sticky-cta]').getByRole('link', { name: /Book a call/i });
    await expect(stickyCta).toBeVisible();
    const box = await stickyCta.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  });

  test('renders statically under reduced motion and passes WCAG 2.2 AA axe scan', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await quietVisit(page, '/about/process');
    await waitForMotion(page);

    await expect(page.locator('#the-ascent ol > li')).toHaveCount(6);
    await expect(page.getByText('06 SUMMIT')).toBeVisible();

    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze();
    const serious = scan.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
