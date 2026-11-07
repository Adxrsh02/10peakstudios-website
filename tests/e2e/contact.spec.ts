import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { quietVisit } from './helpers';

async function mockTurnstile(page: Page, token = 'test-mock-token-xyz-123') {
  await page.addInitScript((mockToken) => {
    (window as unknown as { turnstile?: unknown }).turnstile = {
      render: (_container: unknown, params: { callback?: (t: string) => void }) => {
        setTimeout(() => params.callback?.(mockToken), 20);
        return 'mock-widget-id';
      },
      reset: () => {},
      remove: () => {},
    };
  }, token);
}

test.describe('Contact Us Page (/contact)', () => {
  test('renders full page with hero, direct channels, form and FAQ', async ({ page }) => {
    await quietVisit(page, '/contact');
    await expect(page.locator('h1')).toBeVisible();

    // H1 check
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Let's build something");

    // Quick action buttons
    const callButton = page.locator('a[href^="tel:+917678083589"]');
    await expect(callButton.first()).toBeVisible();

    const emailButton = page.locator('a[href^="mailto:connect@10peakstudios.com"]');
    await expect(emailButton.first()).toBeVisible();

    // 4 Channel Cards
    await expect(page.getByRole('heading', { name: 'Call Directly' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Email Inboxes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Studio Location' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Studio Hours' })).toBeVisible();

    // Live Hours badge
    const hoursBadge = page.getByText(/Open Now|Closed Now|Closed Today/);
    await expect(hoursBadge.first()).toBeVisible();

    // Form elements
    await expect(page.getByRole('checkbox', { name: 'Website Development' })).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();

    // What Happens Next
    await expect(
      page.getByRole('heading', { name: 'What happens after you reach out?' }),
    ).toBeVisible();

    // FAQ section
    await expect(page.getByRole('heading', { name: 'Frequently Asked' })).toBeVisible();
  });

  test('validates form and shows accessible error summary on empty submit', async ({ page }) => {
    await quietVisit(page, '/contact');
    await expect(page.locator('h1')).toBeVisible();

    // Click submit button without filling fields
    const submitBtn = page.getByRole('button', { name: 'Send Project Enquiry' });
    await submitBtn.click();

    // Error summary should appear
    const errorSummary = page.locator('[role="alert"]').first();
    await expect(errorSummary).toBeVisible();
    await expect(errorSummary).toContainText('There was a problem with your submission');

    // Field-level errors
    await expect(page.locator('#services-error')).toBeVisible();
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();
  });

  test('submits valid enquiry with mocked API and redirects to thank-you', async ({ page }) => {
    await mockTurnstile(page);

    // Mock the /api/contact endpoint
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, leadId: 'test-lead-uuid-12345' }),
      });
    });

    await quietVisit(page, '/contact');
    await expect(page.locator('h1')).toBeVisible();

    // 1. Select a service
    await page.getByRole('checkbox', { name: 'Website Development' }).click();

    // 2. Fill required inputs
    await page.locator('#name').fill('Adarsh Tester');
    await page.locator('#email').fill('tester@example.com');
    await page.locator('#phone').fill('+91 7678083589');
    await page
      .locator('#message')
      .fill('This is a verified test project description of at least twenty characters.');

    // 3. Check consent
    await page.locator('input[type="checkbox"]').check();

    // Wait a brief tick for Turnstile mock callback
    await page.waitForTimeout(100);

    // 4. Submit
    const submitBtn = page.getByRole('button', { name: 'Send Project Enquiry' });
    await submitBtn.click();

    // 5. Verify redirection to /contact/thank-you
    await page.waitForURL('**/contact/thank-you');
    await expect(page.locator('h1')).toContainText('Thank you for reaching out');
  });

  test('handles 429 rate limit with WhatsApp fallback', async ({ page }) => {
    await mockTurnstile(page);

    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ ok: false, error: 'rate_limited' }),
      });
    });

    await quietVisit(page, '/contact');
    await expect(page.locator('h1')).toBeVisible();

    await page.getByRole('checkbox', { name: 'Website Development' }).click();
    await page.locator('#name').fill('Rate Tester');
    await page.locator('#email').fill('rate@example.com');
    await page
      .locator('#message')
      .fill('Valid project requirements message exceeding twenty chars.');
    await page.locator('input[type="checkbox"]').check();

    // Wait a brief tick for Turnstile mock callback
    await page.waitForTimeout(100);

    await page.getByRole('button', { name: 'Send Project Enquiry' }).click();

    // Should display rate limit alert with WhatsApp button
    await expect(page.locator('#form-status-alert')).toContainText('Submission limit reached');
  });

  test('axe: zero serious or critical violations on /contact', async ({ page }) => {
    await quietVisit(page, '/contact');
    await expect(page.locator('h1')).toBeVisible();

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

  test('responsive viewport checks: no horizontal scroll', async ({ page }) => {
    for (const width of [360, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await quietVisit(page, '/contact');
      await expect(page.locator('h1')).toBeVisible();

      const hasHorizontalScroll = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(hasHorizontalScroll, `Horizontal scroll at ${width}px`).toBe(false);
    }
  });

  test('reduced-motion: renders final static state cleanly', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await quietVisit(page, '/contact');
    await expect(page.locator('h1')).toBeVisible();

    // Stats counter should show final numeric values immediately
    await expect(page.locator('text=120+')).toBeVisible();
    await expect(page.locator('text=100%')).toBeVisible();
  });
});
