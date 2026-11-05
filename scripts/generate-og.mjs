// Generates public/og/home.png (1200 x 630) from the supplied logo artwork (unmodified) and the
// brand line (Architecture.md 10: static OG images, not next/og). Fonts load from Google Fonts at
// generation time only; nothing is fetched at runtime.
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const logo = (
  await readFile('public/brand/01-Primary/10PeakStudio_Primary_Horizontal_Light.svg', 'utf8')
).replace(/<metadata>[\s\S]*?<\/metadata>/g, '');

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;700&family=Inter:wght@500&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#FFFFFF;font-family:Inter,sans-serif;position:relative;overflow:hidden}
  .glow{position:absolute;right:-140px;top:-160px;width:760px;height:760px;border-radius:50%;
    background:radial-gradient(closest-side,rgb(91 16 224 / .20),rgb(91 16 224 / 0))}
  .band{position:absolute;left:0;bottom:0;height:14px;width:100%;
    background:linear-gradient(90deg,#480BB4 0%,#6617EA 25%,#8F31F9 60%,#A743F8 100%)}
  .wrap{position:absolute;inset:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
  .logo svg{width:430px;height:auto}
  h1{font-family:Sora,sans-serif;font-weight:700;font-size:88px;line-height:1.02;letter-spacing:-0.02em;color:#14111E}
  h1 span{background:linear-gradient(90deg,#480BB4 0%,#6617EA 25%,#8F31F9 60%,#A743F8 100%);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  p{font-size:26px;color:#5E5A70;margin-top:22px;max-width:820px;line-height:1.45}
  .eyebrow{font-weight:500;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#8E21FC}
</style></head><body>
<div class="glow"></div>
<div class="wrap">
  <div class="logo">${logo}</div>
  <div>
    <div class="eyebrow">Digital innovation and technology studio</div>
    <h1 style="margin-top:18px">Build. Automate. <span>Grow.</span></h1>
    <p>Premium websites, full-stack web applications and AI automation.</p>
  </div>
</div>
<div class="band"></div>
</body></html>`;

await mkdir('public/og', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og/home.png' });
await browser.close();
console.log('[og] public/og/home.png written (1200 x 630)');
