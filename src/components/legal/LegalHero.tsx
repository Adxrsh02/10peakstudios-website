import Link from 'next/link';
import { AlertCircle, Calendar } from 'lucide-react';
import { Eyebrow, TwoToneText } from '@/components/ui/primitives';
import { legalConfig } from '@/content/legal-config';

type LegalHeroProps = {
  titleLead: string;
  titleAccent: string;
  summary: string;
  breadcrumbLabel: string;
};

/**
 * Obsidian Legal Header Band (.surface-inverse). Shows "Draft: under legal review"
 * automatically while legalConfig.legalReviewed is false.
 */
export function LegalHero({ titleLead, titleAccent, summary, breadcrumbLabel }: LegalHeroProps) {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className="surface-inverse relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div
        aria-hidden="true"
        className="glow-violet no-print pointer-events-none absolute -top-24 left-1/2 -z-10 h-[28rem] w-[min(56rem,110vw)] -translate-x-1/2"
      />

      <div className="container-content flex flex-col gap-6">
        <nav aria-label="Breadcrumb" className="no-print">
          <ol className="flex flex-wrap items-center gap-2 text-small text-muted-foreground">
            <li>
              <Link
                href="/"
                className="transition-colors [@media(hover:hover)]:hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-foreground">
              {breadcrumbLabel}
            </li>
          </ol>
        </nav>

        <div className="flex max-w-3xl flex-col gap-4">
          <Eyebrow>Legal</Eyebrow>
          <h1 id="legal-hero-heading" className="text-h1 text-foreground">
            <TwoToneText text={titleLead} accent={titleAccent} />
          </h1>
          <p className="max-w-[65ch] text-body-lg text-muted-foreground">{summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Calendar className="size-4 text-brand-accent" aria-hidden="true" strokeWidth={1.75} />
            Last updated:{' '}
            <time dateTime={legalConfig.lastUpdated} className="price font-medium text-foreground">
              {legalConfig.lastUpdated}
            </time>
          </span>
          <span className="inline-flex items-center gap-2">
            Effective:{' '}
            <time
              dateTime={legalConfig.effectiveDate}
              className="price font-medium text-foreground"
            >
              {legalConfig.effectiveDate}
            </time>
          </span>
        </div>

        {!legalConfig.legalReviewed && (
          <div
            role="note"
            className="flex max-w-3xl items-start gap-3 rounded-md border border-warning-inverse/40 bg-card/85 px-4 py-3 text-small text-foreground"
          >
            <AlertCircle
              className="mt-0.5 size-4 shrink-0 text-warning-inverse"
              aria-hidden="true"
              strokeWidth={1.75}
            />
            <span>
              <strong>Draft: under legal review.</strong> This document reflects how the website
              currently operates in code and is awaiting final review by our legal advisor and
              business owner.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
