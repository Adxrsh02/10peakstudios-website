// RUL-SEO-05: every internal link in out/ must resolve to a file, and #fragments to an id.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const OUT = 'out';

async function* walkHtml(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walkHtml(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

/** Map a URL path to the exported file, mirroring html_handling "auto-trailing-slash". */
async function resolveTarget(pathname) {
  const clean = decodeURIComponent(pathname).replace(/\/$/, '');
  const candidates =
    clean === ''
      ? ['index.html']
      : [clean.slice(1), `${clean.slice(1)}.html`, `${clean.slice(1)}/index.html`];
  for (const c of candidates) {
    const full = join(OUT, c);
    if (await exists(full)) return full;
  }
  return null;
}

const idCache = new Map();
async function idsIn(file) {
  if (!idCache.has(file)) {
    const html = await readFile(file, 'utf8');
    idCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return idCache.get(file);
}

const broken = [];
let checked = 0;
for await (const file of walkHtml(OUT)) {
  const html = await readFile(file, 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const url = new URL(raw, 'https://local.test');
    checked += 1;
    const target = await resolveTarget(url.pathname);
    if (!target) {
      broken.push(`${relative(OUT, file)} -> ${raw} (missing file)`);
      continue;
    }
    if (url.hash && target.endsWith('.html')) {
      const ids = await idsIn(target);
      if (!ids.has(url.hash.slice(1)))
        broken.push(`${relative(OUT, file)} -> ${raw} (missing #id)`);
    }
  }
}

if (broken.length > 0) {
  console.error(`[links] FAIL: ${broken.length} broken internal link(s) of ${checked}`);
  for (const b of [...new Set(broken)]) console.error(`  ${b}`);
  process.exit(1);
}
console.log(`[links] OK: ${checked} internal links checked`);
