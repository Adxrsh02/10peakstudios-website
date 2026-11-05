import type { ComponentProps, ElementType, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/* ------------------------------------------------------------------ Section */

export type Surface = 'white' | 'paper' | 'inverse';

const SURFACE_CLASS: Record<Surface, string> = {
  white: 'bg-background text-foreground',
  paper: 'bg-surface-sunken text-foreground',
  inverse: 'surface-inverse',
};

type SectionProps = ComponentProps<'section'> & {
  surface?: Surface;
  /** Full-bleed rounded top edge for Obsidian sections (Design.md 11.5). */
  roundedTop?: boolean;
  width?: 'content' | 'wide';
  bare?: boolean;
  /** Vertical section rhythm (py-section). Disable when a child owns the padding. */
  padded?: boolean;
};

/** Page section with surface tokens and vertical rhythm (Design.md 6.5). */
export function Section({
  surface = 'white',
  roundedTop = false,
  width = 'content',
  bare = false,
  padded = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-x-clip',
        padded && 'py-section',
        SURFACE_CLASS[surface],
        roundedTop && 'rounded-t-[2rem] sm:rounded-t-[2.5rem]',
        className,
      )}
      {...props}
    >
      {bare ? (
        children
      ) : (
        <div className={width === 'wide' ? 'container-wide' : 'container-content'}>{children}</div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ Eyebrow */

type EyebrowProps = { children: ReactNode; variant?: 'bracket' | 'dot'; className?: string };

/** Eyebrow label (Design.md 5.5): Inter 500, 13 px, uppercase, brand accent. */
export function Eyebrow({ children, variant = 'bracket', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-sans text-[0.8125rem] leading-5 font-medium tracking-[0.12em] text-brand-accent uppercase',
        variant === 'bracket' ? 'eyebrow-bracket' : 'inline-flex items-center gap-2',
        className,
      )}
    >
      {variant === 'dot' && (
        <span aria-hidden="true" className="size-1.5 rounded-pill bg-brand-accent" />
      )}
      {variant === 'dot' ? <span>{children}</span> : children}
    </p>
  );
}

/* ------------------------------------------------------------- TwoToneText */

type TwoToneProps = {
  text: string;
  accent: string;
  /** "color" uses the brand accent; "gradient" uses Arrow rise (only at >= 28 px). */
  tone?: 'color' | 'gradient';
  sweep?: boolean;
};

/** Headline with an accented ending (reference structure, Design.md 5.5). */
export function TwoToneText({ text, accent, tone = 'color', sweep = false }: TwoToneProps) {
  return (
    <>
      {text}
      {text.endsWith(' ') ? '' : ' '}
      <span
        className={tone === 'gradient' ? 'text-arrow-rise' : 'text-brand-accent'}
        {...(sweep ? { 'data-sweep': '' } : {})}
      >
        {accent}
      </span>
    </>
  );
}

/* ---------------------------------------------------------- SectionHeading */

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  align?: 'left' | 'center';
  size?: 'h1' | 'h2' | 'h3';
  className?: string;
};

const HEADING_SIZE = { h1: 'text-h1', h2: 'text-h2', h3: 'text-h3' } as const;

/** Eyebrow + heading + optional lead (Design.md 10.4). */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = 'h2',
  id,
  align = 'left',
  size = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal-item=""
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        id={id}
        className={cn('text-balance text-foreground', HEADING_SIZE[size])}
        data-heading=""
      >
        {title}
      </Tag>
      {lead && <p className="max-w-[60ch] text-body-lg text-muted-foreground">{lead}</p>}
    </div>
  );
}

/* --------------------------------------------------------------- ArrowLink */

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  external?: boolean;
  className?: string;
};

/** Text link with arrow that nudges right on hover (Design.md 10.2, 9). */
export function ArrowLink({
  href,
  external = false,
  className,
  children,
  ...props
}: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const cls = cn(
    'group/arrow inline-flex items-center gap-2 font-semibold text-link underline-offset-[6px] [@media(hover:hover)]:hover:underline',
    className,
  );
  const icon = (
    <Icon
      aria-hidden="true"
      strokeWidth={1.75}
      className="size-[1.125em] transition-transform duration-(--duration-fast) [@media(hover:hover)]:group-hover/arrow:translate-x-0.5"
    />
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
      {icon}
    </Link>
  );
}

/* -------------------------------------------------------------------- Chip */

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 items-center rounded-pill border border-border bg-background/70 px-3.5 text-small font-medium text-foreground',
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------- IconBadge */

type IconBadgeProps = { icon: ElementType; className?: string; size?: 'md' | 'lg' };

/** Line icon in a soft tile (Design.md 9: 24/32 px icons in --brand-accent). */
export function IconBadge({ icon: Icon, className, size = 'md' }: IconBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-sm border border-border bg-surface-sunken text-brand-accent [.surface-inverse_&]:bg-obsidian',
        size === 'md' ? 'size-12' : 'size-14',
        className,
      )}
    >
      <Icon strokeWidth={1.75} className={size === 'md' ? 'size-6' : 'size-8'} />
    </span>
  );
}
