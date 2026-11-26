import { z } from 'zod';

export const INDUSTRY_VALUES = [
  'Healthcare',
  'Real Estate',
  'E-commerce & Retail',
  'Finance & Fintech',
  'Education & EdTech',
  'Hospitality & Restaurants',
  'SaaS & Startups',
  'Manufacturing & Logistics',
] as const;

export const CAPABILITY_VALUES = [
  'Websites',
  'Web Apps & SaaS',
  'AI & Automation',
  'Mobile Apps',
  'Custom Software',
  'Digital Marketing',
  'Branding & Design',
] as const;

export const PROJECT_TYPES = ['client', 'in-house', 'concept'] as const;
export const PROJECT_STATUSES = ['Live', 'In development', 'Completed', 'Concept'] as const;
export const COMPLEXITY_LEVELS = [
  'Foundational',
  'Intermediate',
  'Advanced',
  'Enterprise',
] as const;
export const GALLERY_LABELS = [
  'Dashboard',
  'Desktop',
  'Mobile',
  'Architecture',
  'Analytics',
  'Admin',
  'AI & RAG',
  'Model',
] as const;

const CLOUDINARY_PREFIX = 'https://res.cloudinary.com/';

const trustedMediaUrl = z
  .string()
  .trim()
  .min(1)
  .refine(
    (val) => val.startsWith(CLOUDINARY_PREFIX) || val.startsWith('/'),
    'Media URL must be a Cloudinary URL (https://res.cloudinary.com/...) or verified local / asset path; un-uploaded Section_images paths are not allowed.',
  );

const publicHttpsUrl = z
  .string()
  .trim()
  .url()
  .refine((val) => val.startsWith('https://'), 'Public link must use https://');

export const mediaAssetSchema = z.object({
  url: trustedMediaUrl,
  alt: z.string().trim().min(5, 'Descriptive alt text is required (min 5 chars)'),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const galleryItemSchema = mediaAssetSchema.extend({
  caption: z.string().trim().min(3),
  label: z.enum(GALLERY_LABELS),
  device: z.enum(['desktop', 'mobile', 'none']).default('none'),
});

export const architectureDiagramSchema = mediaAssetSchema.extend({
  caption: z.string().trim().min(3),
});

export const techStackSchema = z.object({
  frontend: z.array(z.string().trim().min(1)).default([]),
  backend: z.array(z.string().trim().min(1)).default([]),
  aiMl: z.array(z.string().trim().min(1)).default([]),
  database: z.array(z.string().trim().min(1)).default([]),
  cloud: z.array(z.string().trim().min(1)).default([]),
  deployment: z.array(z.string().trim().min(1)).default([]),
  devops: z.array(z.string().trim().min(1)).default([]),
  tools: z.array(z.string().trim().min(1)).default([]),
});

export const metricSchema = z.object({
  value: z.string().trim().min(1),
  label: z.string().trim().min(1),
  context: z.string().trim().optional(),
  confirmed: z.boolean(),
});

export const videoSchema = z.object({
  provider: z.enum(['youtube', 'cloudinary']),
  src: z.string().trim().min(3),
  posterUrl: trustedMediaUrl,
  title: z.string().trim().min(3),
});

export const publicationSchema = z.object({
  title: z.string().trim().min(5),
  venue: z.string().trim().min(2),
  paperId: z.string().trim().optional(),
  venueUrl: publicHttpsUrl.optional(),
  abstract: z.string().trim().min(20),
  pdfUrl: trustedMediaUrl,
});

export const portfolioFrontmatterSchema = z.object({
  published: z.boolean(),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase hyphenated (PRD-NAV-01)'),
  title: z.string().trim().min(5).max(140),
  tagline: z.string().trim().min(10).max(180),
  shortDescription: z.string().trim().min(20).max(320),
  inShort: z.string().trim().min(30).max(520),
  type: z.enum(PROJECT_TYPES),
  clientName: z.string().trim().nullable().optional(),
  clientPermission: z.boolean().default(false),
  status: z.enum(PROJECT_STATUSES),
  statusNote: z.string().trim().optional(),
  disclaimer: z.string().trim().optional(),
  industry: z.enum(INDUSTRY_VALUES),
  capabilities: z.array(z.enum(CAPABILITY_VALUES)).min(1),
  complexity: z.enum(COMPLEXITY_LEVELS),
  platform: z.string().trim().min(2),
  role: z.string().trim().min(2),
  year: z.number().int().min(2020).max(2035),
  duration: z.string().trim().min(2),
  featured: z.boolean().default(false),
  order: z.number().int().min(1).default(100),
  teamSummary: z.string().trim().min(2),
  teamMembers: z.array(z.string().trim().min(1)).default([]),
  thumbnail: mediaAssetSchema,
  heroImage: mediaAssetSchema,
  techStack: techStackSchema,
  architecture: z
    .object({
      summary: z.string().trim().optional(),
      diagrams: z.array(architectureDiagramSchema).default([]),
      mermaid: z.string().trim().optional(),
    })
    .nullable()
    .optional(),
  gallery: z.array(galleryItemSchema).default([]),
  video: videoSchema.nullable().optional(),
  githubUrl: publicHttpsUrl.nullable().optional(),
  liveUrl: publicHttpsUrl.nullable().optional(),
  metrics: z.array(metricSchema).default([]),
  publication: publicationSchema.nullable().optional(),
  seo: z.object({
    title: z
      .string()
      .trim()
      .min(5)
      .max(44, 'seo.title must be <= 44 chars so "<title> | 10PeakStudio" stays <= 60 chars'),
    description: z
      .string()
      .trim()
      .min(110, 'seo.description must be 110-160 chars (RUL-SEO-01)')
      .max(160, 'seo.description must be 110-160 chars (RUL-SEO-01)'),
  }),
});

export type PortfolioFrontmatter = z.infer<typeof portfolioFrontmatterSchema>;
export type IndustryValue = (typeof INDUSTRY_VALUES)[number];
export type CapabilityValue = (typeof CAPABILITY_VALUES)[number];
export type ComplexityLevel = (typeof COMPLEXITY_LEVELS)[number];
export type GalleryLabel = (typeof GALLERY_LABELS)[number];
export type TechStackGroup = z.infer<typeof techStackSchema>;
export type ProjectMetric = z.infer<typeof metricSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type ProjectVideo = z.infer<typeof videoSchema>;
export type ProjectPublication = z.infer<typeof publicationSchema>;

export const PORTFOLIO_SORT_VALUES = ['featured', 'newest', 'complexity'] as const;
export type PortfolioSort = (typeof PORTFOLIO_SORT_VALUES)[number];

export const portfolioQuerySchema = z.object({
  q: z.string().max(120).catch(''),
  industry: z.union([z.literal('all'), z.enum(INDUSTRY_VALUES)]).catch('all'),
  capability: z.union([z.literal('all'), z.enum(CAPABILITY_VALUES)]).catch('all'),
  tech: z.string().max(60).catch('all'),
  sort: z.enum(PORTFOLIO_SORT_VALUES).catch('featured'),
});

export type PortfolioQueryState = z.infer<typeof portfolioQuerySchema>;
