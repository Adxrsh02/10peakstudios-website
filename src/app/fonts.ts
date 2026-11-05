import { Inter, Sora } from 'next/font/google';

/** Brand fonts, self-hosted at build (Architecture.md 8, ADR-007). Variable fonts. */
export const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
});

/** Inter carries the rupee sign (U+20B9 is in latin-ext); Sora has none (brand rule). */
export const inter = Inter({
  subsets: ['latin'], // preload latin only (RUL-PERF-03); next/font still emits the latin-ext face that carries ₹
  variable: '--font-inter',
  display: 'swap',
});
