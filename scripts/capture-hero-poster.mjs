// Captures the hero scene's rest pose as the poster (Architecture.md 7, 9.4):
// public/hero-poster{,-720}.avif (<= 60 KB) and .webp fallbacks, chosen by srcset in HeroVisual.
// Usage: npm run build, then with `node scripts/serve-out.mjs 8799` running: node scripts/capture-hero-poster.mjs
import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BASE = process.env.CAPTURE_URL ?? 'http://localhost:8799';
const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
await page.addInitScript(() => {
  try {
    sessionStorage.setItem('tps.loader.seen', '1');
  } catch {}
});
await page.goto(`${BASE}/?poster-capture`, { waitUntil: 'load' });
await page.waitForFunction(() => window.__heroReady === true, null, { timeout: 30000 });
// Transparent page so only the scene is captured (no baked-in white background). Injected after
// hydration so React does not remove it.
await page.addStyleTag({
  content:
    'html,body{background:transparent!important}body *{visibility:hidden!important}[data-hero-visual] canvas{visibility:visible!important}',
});
await page.waitForTimeout(800);
const canvas = page.locator('[data-hero-visual] canvas');
const png = await canvas.screenshot({ omitBackground: true });
await browser.close();

// Two widths: 1000 (desktop, high-DPR phones) and 720 (mid-DPR phones); selected via srcset.
let avif = Buffer.alloc(0);
for (const width of [1000, 720]) {
  const base = sharp(png).resize({
    width,
    height: Math.round((width * 4) / 5),
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  const a = await base.clone().avif({ quality: 50, effort: 6 }).toBuffer();
  const w = await base.clone().webp({ quality: 60, alphaQuality: 70, effort: 6 }).toBuffer();
  const suffix = width === 1000 ? '' : `-${width}`;
  // Write the encoded bytes as-is (sharp(buf).toFile would decode and re-encode at defaults)
  await writeFile(`public/hero-poster${suffix}.avif`, a);
  await writeFile(`public/hero-poster${suffix}.webp`, w);
  console.log(
    `[poster] ${width}w avif ${(a.length / 1024).toFixed(1)} KB, webp ${(w.length / 1024).toFixed(1)} KB`,
  );
  if (width === 1000) avif = a;
}
if (avif.length > 60 * 1024) {
  console.error('[poster] FAIL: AVIF exceeds the 60 KB budget');
  process.exit(1);
}
