// RUL-CNT-03: production builds fail if "[PLACEHOLDER" appears in out/; preview builds warn.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const OUT = 'out';
const isProduction = process.env.SITE_BUILD_ENV === 'production';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (/\.(html|txt|xml|json)$/.test(entry.name)) yield p;
  }
}

const hits = new Map();
for await (const file of walk(OUT)) {
  const text = await readFile(file, 'utf8');
  const matches = text.match(/\[PLACEHOLDER[^\]]*\]/g);
  if (matches) hits.set(relative(OUT, file), [...new Set(matches)]);
}

if (hits.size === 0) {
  console.log('[placeholders] none found');
  process.exit(0);
}

const htmlHits = [...hits].filter(([f]) => f.endsWith('.html'));
console.log(`[placeholders] ${htmlHits.length} HTML file(s) contain placeholders:`);
for (const [file, list] of htmlHits) {
  console.log(`  ${file}`);
  for (const item of list) console.log(`    - ${item}`);
}
if (isProduction) {
  console.error('[placeholders] FAIL: production build contains placeholders (RUL-CNT-03)');
  process.exit(1);
}
console.log('[placeholders] preview build: warning only');
