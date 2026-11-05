// Minimal static server for out/ used by local capture scripts (no dependencies, no child processes).
// Mirrors the Cloudflare Workers Static Assets behaviour this site relies on:
// html_handling "auto-trailing-slash" (/x -> x.html), not_found_handling "404-page" (404 status),
// and the "/*" rules from public/_headers. E2E tests still run against `wrangler dev`.
// Usage: node scripts/serve-out.mjs [port] [root-dir]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = process.argv[3] ?? 'out';
const PORT = Number(process.argv[2] ?? 8799);
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.pdf': 'application/pdf',
};

async function globalHeaders() {
  try {
    const text = await readFile(join(ROOT, '_headers'), 'utf8');
    const block = text.split(/\n(?=\S)/).find((b) => b.startsWith('/*'));
    if (!block) return {};
    return Object.fromEntries(
      block
        .split('\n')
        .slice(1)
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]),
    );
  } catch {
    return {};
  }
}

async function isFile(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

const headers = await globalHeaders();
createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname)).replace(
    /\\/g,
    '/',
  );
  const clean = path.replace(/\/$/, '');
  const candidates =
    clean === ''
      ? ['index.html']
      : [clean.slice(1), `${clean.slice(1)}.html`, `${clean.slice(1)}/index.html`];
  let file = null;
  for (const c of candidates)
    if (await isFile(join(ROOT, c))) {
      file = join(ROOT, c);
      break;
    }
  const status = file ? 200 : 404;
  file ??= join(ROOT, '404.html');
  const body = await readFile(file);
  res.writeHead(status, {
    'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
    ...headers,
  });
  res.end(body);
}).listen(PORT, () => console.log(`[serve-out] http://localhost:${PORT}`));
