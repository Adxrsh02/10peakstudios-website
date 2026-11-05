import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'node_modules/**',
    '.claude/**',
    'design-system/**',
    'Project_spec/**',
    'public/**',
    'next-env.d.ts',
    'playwright-report/**',
    'test-results/**',
    '.lighthouseci/**',
    '.wrangler/**',
  ]),
  {
    rules: {
      // Rules.md 5
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'import/no-default-export': 'error',
    },
  },
  {
    // Next.js requires default exports in these files (RUL-TS-08 overrides)
    files: [
      'src/app/**/{page,layout,not-found,error,loading,template,default}.tsx',
      'src/app/**/{sitemap,robots,manifest}.ts',
      'src/lib/cloudinary-loader.ts',
      '*.config.{ts,mjs,js}',
      'eslint.config.mjs',
    ],
    rules: { 'import/no-default-export': 'off' },
  },
  {
    files: ['scripts/**/*.mjs'],
    rules: { 'no-console': 'off' },
  },
]);
