import { z } from 'zod';

/**
 * Public build-time environment (Architecture.md 12). Parsed with Zod (RUL-TS-04).
 * Import only from Server Components; pass derived values to client components as props.
 * process.env.* must be referenced literally so Next.js can inline them.
 */
const optionalString = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

const isProduction = process.env.NODE_ENV === 'production';

const turnstileKeySchema = isProduction
  ? z
      .string()
      .trim()
      .min(
        1,
        'NEXT_PUBLIC_TURNSTILE_SITE_KEY is required for production builds. Provide it in Cloudflare Build Variables or .env.production.local.',
      )
      .refine(
        (key) => !key.startsWith('1x000') && !key.startsWith('2x000') && !key.startsWith('3x000'),
        'Cloudflare Turnstile test keys (1x000..., 2x000..., 3x000...) are prohibited in production builds.',
      )
  : optionalString.default('1x00000000000000000000AA');

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url().default('https://10peakstudios.com'),
  // Pending PRD OQ-2 (supplied as Connect@10peakstudio.com, whose domain differs)
  NEXT_PUBLIC_CONTACT_EMAIL: z.email().default('connect@10peakstudios.com'),
  NEXT_PUBLIC_WHATSAPP_NUMBER: optionalString.pipe(
    z
      .string()
      .regex(/^\d{8,15}$/, 'digits only, country code first')
      .optional(),
  ),
  NEXT_PUBLIC_GA4_ID: optionalString,
  NEXT_PUBLIC_CLARITY_ID: optionalString,
  NEXT_PUBLIC_CF_WA_TOKEN: optionalString,
  // Production builds strictly require real key; dev/test may default to test key
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: turnstileKeySchema,
  NEXT_PUBLIC_SHOW_TESTIMONIALS: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
});

export const env = schema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || undefined,
  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  NEXT_PUBLIC_CF_WA_TOKEN: process.env.NEXT_PUBLIC_CF_WA_TOKEN,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SHOW_TESTIMONIALS: process.env.NEXT_PUBLIC_SHOW_TESTIMONIALS,
});
