import fs from 'node:fs';
import path from 'node:path';

/**
 * Prebuild guard for production builds.
 * Ensures production builds do not accidentally inline missing or Cloudflare test Turnstile keys.
 */
const CLOUDFLARE_TEST_KEYS = new Set([
  '1x00000000000000000000AA',
  '2x00000000000000000000AB',
  '3x00000000000000000000FF',
]);

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  const env = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val;
  }
  return env;
}

// Only enforce in production builds
const isProdBuild =
  process.env.NODE_ENV === 'production' ||
  process.env.CF_PAGES === '1' ||
  process.argv.includes('--production');

if (isProdBuild) {
  const prodLocalEnv = parseEnvFile(path.resolve('.env.production.local'));
  const prodEnv = parseEnvFile(path.resolve('.env.production'));

  // Prioritize environment variables (e.g. Cloudflare Build Variables), then .env.production.local, then .env.production
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    prodLocalEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    prodEnv.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error('\n❌ [prebuild-check] Production build failed:');
    console.error('   NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing.');
    console.error('   Production builds require your real Cloudflare Turnstile site key.');
    console.error(
      '   - Local deploy/build: Create .env.production.local with NEXT_PUBLIC_TURNSTILE_SITE_KEY=<key>',
    );
    console.error(
      '   - Cloudflare Workers Builds: Add NEXT_PUBLIC_TURNSTILE_SITE_KEY in Settings -> Build Variables.\n',
    );
    process.exit(1);
  }

  const isTestKey =
    CLOUDFLARE_TEST_KEYS.has(siteKey) ||
    siteKey.startsWith('1x00000000000000000000') ||
    siteKey.startsWith('2x00000000000000000000') ||
    siteKey.startsWith('3x00000000000000000000');

  if (isTestKey) {
    console.error('\n❌ [prebuild-check] Production build rejected:');
    console.error('   NEXT_PUBLIC_TURNSTILE_SITE_KEY is set to a Cloudflare TEST key.');
    console.error('   Cloudflare test keys are strictly prohibited in production builds.');
    console.error(
      '   Please provide your real Cloudflare Turnstile site key in .env.production.local or Cloudflare Build Variables.\n',
    );
    process.exit(1);
  }

  // Ensure process.env has the production key so next build picks it up
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = siteKey;
  console.log('✓ [prebuild-check] Valid production Turnstile site key detected.');
}
