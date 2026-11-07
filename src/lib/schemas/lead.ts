import { z } from 'zod';

export const SERVICE_SLUGS = [
  'website-development',
  'web-app-development',
  'mobile-app-development',
  'custom-software',
  'ai-automation',
  'digital-marketing',
  'branding-design',
  'video-ugc-ads',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const BUDGET_BANDS = [
  'under-50k',
  '50k-100k',
  '100k-250k',
  '250k-plus',
  'prefer-not-to-say',
] as const;

export type BudgetBand = (typeof BUDGET_BANDS)[number];

export const TIMELINES = ['asap', '1-3-months', '3-6-months', 'flexible'] as const;

export type Timeline = (typeof TIMELINES)[number];

/**
 * Shared lead validation schema (Architecture.md §6, Rules.md RUL-TS-04, RUL-SEC-03).
 * Used both on client (form validation) and Cloudflare Worker (/api/contact).
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name (at least 2 characters)')
    .max(100, 'Name must be 100 characters or fewer'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid work email address')
    .max(254, 'Email must be 254 characters or fewer'),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s\-()]{7,20}$/, 'Please enter a valid phone number with country code')
    .optional()
    .or(z.literal('')),
  services: z.array(z.enum(SERVICE_SLUGS)).min(1, 'Please select at least one service of interest'),
  budgetBand: z.enum(BUDGET_BANDS).optional(),
  timeline: z.enum(TIMELINES).optional(),
  message: z
    .string()
    .trim()
    .min(20, 'Please describe your project (at least 20 characters)')
    .max(2000, 'Message must be 2,000 characters or fewer'),
  consent: z.literal(true, {
    message: 'You must agree to the privacy policy to submit',
  }),
  // Anti-spam honeypot (visually hidden; bots fill it)
  website: z.string().optional(),
  // Timestamp when user opened form (must be >= 3 seconds before submit)
  startedAt: z.number().int().positive(),
  // Cloudflare Turnstile token
  turnstileToken: z.string().min(1, 'Please complete the verification check'),
  // Attribution parameters
  utmSource: z.string().max(100).optional(),
  utmMedium: z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
