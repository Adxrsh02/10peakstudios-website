/**
 * Brand logo (Design.md 3.2) as an <img> of the supplied artwork (unmodified; only the C2PA
 * metadata is stripped in public/logos/). Using <img> keeps large SVG path data out of the HTML
 * and the React payload, which cuts hydration cost. The loader keeps the inline SVG because it
 * animates the parts.
 * Minimum artwork widths: horizontal 3D 160 px, flat 120 px, mark 3D 48 px (Design.md 3.4).
 */
const VARIANTS = {
  'horizontal-3d-light': { src: '/logos/horizontal-3d-light.svg', w: 1869, h: 429 },
  'horizontal-flat-light': { src: '/logos/horizontal-flat-light.svg', w: 1869, h: 429 },
  'horizontal-3d-dark': { src: '/logos/horizontal-3d-dark.svg', w: 1869, h: 429 },
  'mark-3d-light': { src: '/logos/mark-3d-light.svg', w: 745, h: 429 },
} as const;

export type LogoVariant = keyof typeof VARIANTS;

type LogoProps = {
  variant: LogoVariant;
  /**
   * Art-directed variant from 1024 px (the `lg` breakpoint) up. Must share the base variant's
   * aspect ratio. Only one file is downloaded.
   */
  lgVariant?: LogoVariant;
  /** Accessible name. Ignored when `decorative` is true. */
  title?: string;
  /** Hide from assistive tech when adjacent text (or a link label) already names the brand. */
  decorative?: boolean;
  className?: string;
  /** Above-the-fold logos (header): eager and high fetch priority. Others load lazily. */
  priority?: boolean;
};

export function Logo({
  variant,
  lgVariant,
  title = '10PeakStudio',
  decorative = false,
  className,
  priority = false,
}: LogoProps) {
  const v = VARIANTS[variant];
  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG brand asset; next/image adds nothing here
    <img
      src={v.src}
      width={v.w}
      height={v.h}
      alt={decorative ? '' : title}
      className={className}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
    />
  );
  if (!lgVariant) return img;
  return (
    <picture>
      <source media="(min-width: 64rem)" srcSet={VARIANTS[lgVariant].src} />
      {img}
    </picture>
  );
}
