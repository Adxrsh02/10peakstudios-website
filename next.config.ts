import type { NextConfig } from 'next';

/**
 * Static export for Cloudflare Workers Static Assets (Architecture.md 4, ADR-001).
 * cacheComponents must stay unset: it is incompatible with `output: 'export'` (ADR-009).
 */
const config: NextConfig = {
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    loader: 'custom',
    loaderFile: './src/lib/cloudinary-loader.ts',
  },
};

export default config;
