import { expect, test } from '@playwright/test';

test('home renders the brand line @smoke', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Build. Automate. Grow.');
});

test('unknown URL returns HTTP 404', async ({ request }) => {
  const res = await request.get('/this-page-does-not-exist');
  expect(res.status()).toBe(404);
});
