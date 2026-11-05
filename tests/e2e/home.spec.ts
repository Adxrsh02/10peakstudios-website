import { expect, test } from '@playwright/test';
import { quietVisit } from './helpers';

const SERVICE_SLUGS = [
  'website-development',
  'web-app-development',
  'mobile-app-development',
  'custom-software',
  'ai-automation',
  'digital-marketing',
  'branding-design',
  'video-ugc-ads',
];

test.describe('Home page (PRD 8.1)', () => {
  test('renders all sections in PRD order @smoke', async ({ page }) => {
    await quietVisit(page);
    const ids = await page
      .locator('main section[aria-labelledby]')
      .evaluateAll((els) => els.map((e) => e.getAttribute('aria-labelledby')));
    expect(ids).toEqual([
      'hero-title',
      'statement-title',
      'pillars-title',
      'build-title',
      'automate-title',
      'grow-title',
      'process-title',
      'audience-title',
      'why-title',
      'callout-title',
      'faq-title',
    ]);
    await expect(page.getByRole('region', { name: 'Security by design' })).toBeVisible();
    // Exactly two Obsidian surfaces: Automate spotlight + footer (Design.md 6.5)
    await expect(page.locator('.surface-inverse')).toHaveCount(2);
  });

  test('PRD-HOME-01: H1 is in server HTML and visible at first paint', async ({
    page,
    request,
  }) => {
    const html = await (await request.get('/')).text();
    expect(html).toMatch(/<h1[^>]*>.*Build\. Automate\..*Grow\./s);
    await page.goto('/', { waitUntil: 'commit' });
    const h1 = page.locator('h1');
    await h1.waitFor();
    expect(await h1.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
    const lead = page.locator('#hero-title + p');
    expect(await lead.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  });

  test('PRD-HOME-04: every service is one click away', async ({ page }) => {
    await quietVisit(page);
    for (const slug of SERVICE_SLUGS) {
      await expect(page.locator(`main a[href="/services/${slug}"]`).first()).toBeAttached();
    }
  });

  test('PRD-HOME-05: no testimonials, client logos, metrics or awards', async ({ page }) => {
    await quietVisit(page);
    const text = (await page.locator('main').innerText()).toLowerCase();
    for (const banned of [
      'testimonial',
      'award',
      'certified',
      'trusted by',
      'clients served',
      '5-star',
    ]) {
      expect(text).not.toContain(banned);
    }
  });

  test('SEO metadata and JSON-LD (PRD 11)', async ({ page }) => {
    await quietVisit(page);
    await expect(page).toHaveTitle('Premium Websites, Web Apps & AI Automation | 10PeakStudio');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /^10PeakStudio builds premium websites/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://10peakstudios.com',
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /\/og\/home\.png$/,
    );
    const types = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
      els.flatMap((e) => {
        const data = JSON.parse(e.textContent ?? '[]');
        return (Array.isArray(data) ? data : [data]).map((d: { '@type': string }) => d['@type']);
      }),
    );
    expect(types).toEqual(
      expect.arrayContaining(['Organization', 'WebSite', 'WebPage', 'FAQPage']),
    );
    expect(types).not.toContain('LocalBusiness');
  });

  test('sitemap, robots and llms.txt', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('<loc>https://10peakstudios.com</loc>');
    expect(sitemap).not.toContain('/services'); // stubs stay out until built
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Disallow: /api/');
    expect(robots).toContain('Sitemap: https://10peakstudios.com/sitemap.xml');
    const llms = await (await request.get('/llms.txt')).text();
    expect(llms).toContain('10PeakStudio is a premium digital innovation and technology studio');
  });
});

test.describe('Viewport checks', () => {
  test('PRD-HOME-02: hero CTAs above the fold at 360 x 640', async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 360, height: 640 } });
    await quietVisit(page);
    const box = await page.getByRole('link', { name: 'Explore services' }).first().boundingBox();
    expect(box && box.y + box.height).toBeLessThanOrEqual(640);
    await page.close();
  });

  test('PRD-HOME-02: hero CTAs above the fold at 1440 x 900', async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await quietVisit(page);
    const box = await page.getByRole('link', { name: 'Explore services' }).first().boundingBox();
    expect(box && box.y + box.height).toBeLessThanOrEqual(900);
    await page.close();
  });

  test('RUL-ST-07: no horizontal scroll at 320 px', async ({ browser }) => {
    const page = await browser.newPage({ viewport: { width: 320, height: 700 } });
    await quietVisit(page);
    await page.mouse.wheel(0, 6000);
    const [sw, cw] = await page.evaluate(() => [
      document.documentElement.scrollWidth,
      document.documentElement.clientWidth,
    ]);
    expect(sw).toBeLessThanOrEqual(cw);
    await page.close();
  });
});
