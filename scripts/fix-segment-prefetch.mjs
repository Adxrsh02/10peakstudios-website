// Post-build fix for Next 16.4 static export segment prefetch paths.
// The exporter writes  <route>/__next.<seg1>/<seg2>/__PAGE__.txt  (nested folders) while the client
// router requests     <route>/__next.<seg1>.<seg2>.__PAGE__.txt  (dot-joined), which 404s on a
// static host. This copies each nested segment file to its dot-joined name. Idempotent.
import { copyFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const OUT = 'out';
let copied = 0;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (p === join(OUT, '_next')) continue;
      yield* walk(p);
    } else {
      yield p;
    }
  }
}

for await (const file of walk(OUT)) {
  const parts = relative(OUT, file).split(sep);
  const idx = parts.findIndex((part, i) => part.startsWith('__next.') && i < parts.length - 1);
  if (idx === -1) continue;
  const routeDir = join(OUT, ...parts.slice(0, idx));
  const flat = parts.slice(idx).join('.');
  await copyFile(file, join(routeDir, flat));
  copied += 1;
}

console.log(`[segment-prefetch] wrote ${copied} dot-joined segment file(s)`);
