import type { ElementType, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ArrowLink, IconBadge } from './primitives';

/* Cards (Design.md 10.5). Body copy is always left-aligned (never justified). */

type LinkItem = { label: string; href: string; description?: string };

type PillarCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  links: LinkItem[];
  cta?: LinkItem;
  emphasis?: 'primary' | 'supporting';
  visual?: ReactNode;
  className?: string;
  id?: string;
};

/** Large pillar tile used in bento grids. */
export function PillarCard({
  eyebrow,
  title,
  description,
  links,
  cta,
  emphasis = 'primary',
  visual,
  className,
  id,
}: PillarCardProps) {
  return (
    <article
      id={id}
      data-reveal-item=""
      className={cn(
        'relative flex flex-col gap-6 overflow-hidden rounded-lg border border-border p-6 sm:p-8',
        emphasis === 'primary' ? 'bg-card' : 'bg-surface-sunken',
        className,
      )}
    >
      {visual && <div aria-hidden="true">{visual}</div>}
      <div className="flex flex-col gap-3">
        <p className="font-sans text-[0.8125rem] font-medium tracking-[0.12em] text-brand-accent uppercase">
          {eyebrow}
        </p>
        <h3 className={cn(emphasis === 'primary' ? 'text-h3' : 'text-h4', 'text-foreground')}>
          {title}
        </h3>
        <p className="max-w-[52ch] text-body text-muted-foreground">{description}</p>
      </div>
      <ul className="mt-auto flex flex-col divide-y divide-border border-t border-border">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group/row flex min-h-12 items-center justify-between gap-4 py-3 font-medium text-foreground transition-colors duration-(--duration-fast) [@media(hover:hover)]:hover:text-primary"
            >
              <span>{l.label}</span>
              <ArrowRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-5 text-brand-accent transition-transform duration-(--duration-fast) [@media(hover:hover)]:group-hover/row:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
      {cta && <ArrowLink href={cta.href}>{cta.label}</ArrowLink>}
    </article>
  );
}

type FeatureCardProps = {
  icon?: ElementType;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  index?: string;
  className?: string;
};

/** Feature or service card. With `href` the whole card is one link (single tab stop). */
export function FeatureCard({
  icon,
  title,
  description,
  href,
  linkLabel,
  index,
  className,
}: FeatureCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        {icon ? <IconBadge icon={icon} /> : <span />}
        {index && (
          <span
            aria-hidden="true"
            className="font-heading text-small font-semibold text-muted-foreground"
          >
            {index}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-h5 text-primary [.surface-inverse_&]:text-link">{title}</h3>
        <p className="text-body text-muted-foreground">{description}</p>
      </div>
      {href && linkLabel && (
        <span className="mt-auto inline-flex items-center gap-2 font-semibold text-link">
          {linkLabel}
          <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-[1.125em]" />
        </span>
      )}
    </>
  );
  const cls = cn(
    'flex h-full flex-col gap-6 rounded-md border border-border bg-card p-6 text-card-foreground sm:p-8',
    className,
  );
  return href ? (
    <Link href={href} data-reveal-item="" className={cn(cls, 'card-lift')}>
      {body}
    </Link>
  ) : (
    <article data-reveal-item="" className={cls}>
      {body}
    </article>
  );
}

type CalloutCardProps = {
  icon: ElementType;
  title: string;
  body: string;
  cta: LinkItem;
  className?: string;
  /** Use h2 when the callout is a section of its own (correct outline for screen readers). */
  headingLevel?: 'h2' | 'h3';
  headingId?: string;
};

/** Narrow highlighted callout (security teaser). Visual size is the same at either heading level. */
export function CalloutCard({
  icon,
  title,
  body,
  cta,
  className,
  headingLevel: Heading = 'h3',
  headingId,
}: CalloutCardProps) {
  return (
    <div
      data-reveal-item=""
      className={cn(
        'flex flex-col gap-6 rounded-lg border border-border bg-card p-6 sm:flex-row sm:items-start sm:gap-8 sm:p-10',
        className,
      )}
    >
      <IconBadge icon={icon} size="lg" />
      <div className="flex flex-col gap-4">
        <Heading id={headingId} className="text-h3 text-foreground">
          {title}
        </Heading>
        <p className="max-w-[62ch] text-body-lg text-muted-foreground">{body}</p>
        <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
      </div>
    </div>
  );
}
