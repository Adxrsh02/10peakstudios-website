import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ArrowLink, Section } from '@/components/ui/primitives';
import { PORTFOLIO_CAPABILITIES } from '@/content/portfolio-config';
import { servicePath } from '@/content/services';
import type { PortfolioCardData } from '@/lib/portfolio/loader';
import type { CapabilityValue } from '@/lib/portfolio/schema';
import { PortfolioCard } from './PortfolioCard';
import { ViewTransitionLink } from './ViewTransitionLink';

type ProjectPaginationProps = {
  capabilities: CapabilityValue[];
  prev: PortfolioCardData | null;
  next: PortfolioCardData | null;
  related: PortfolioCardData[];
};

export function ProjectPagination({ capabilities, prev, next, related }: ProjectPaginationProps) {
  const matchedServices = PORTFOLIO_CAPABILITIES.filter((cap) => capabilities.includes(cap.label));

  return (
    <Section surface="paper" aria-label="Related services and projects">
      <div className="flex flex-col gap-12">
        {/* Relevant Services Cross-Links */}
        {matchedServices.length > 0 && (
          <div className="flex flex-col gap-4 rounded-md border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-caption font-semibold tracking-[0.1em] text-brand-accent uppercase">
                Explore Related Capabilities
              </p>
              <p className="text-body text-muted-foreground">
                See how 10PeakStudio packages and delivers these engineering capabilities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {matchedServices.map((item) => (
                <ArrowLink key={item.serviceSlug} href={servicePath(item.serviceSlug)}>
                  {item.label}
                </ArrowLink>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next Navigation (shown when >= 2 published projects exist) */}
        {(prev || next) && (
          <nav aria-label="Adjacent case studies" className="grid gap-4 sm:grid-cols-2">
            {prev ? (
              <ViewTransitionLink
                href={`/portfolio/${prev.slug}`}
                className="group flex flex-col gap-2 rounded-md border border-border bg-card p-5 transition-colors [@media(hover:hover)]:hover:border-primary/40"
              >
                <span className="inline-flex items-center gap-1.5 text-caption font-medium text-muted-foreground">
                  <ArrowLeft className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                  Previous project
                </span>
                <span className="font-heading text-h5 text-foreground group-hover:text-primary">
                  {prev.title}
                </span>
              </ViewTransitionLink>
            ) : (
              <div />
            )}

            {next ? (
              <ViewTransitionLink
                href={`/portfolio/${next.slug}`}
                className="group flex flex-col items-end gap-2 rounded-md border border-border bg-card p-5 text-right transition-colors [@media(hover:hover)]:hover:border-primary/40"
              >
                <span className="inline-flex items-center gap-1.5 text-caption font-medium text-muted-foreground">
                  Next project
                  <ArrowRight className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
                </span>
                <span className="font-heading text-h5 text-foreground group-hover:text-primary">
                  {next.title}
                </span>
              </ViewTransitionLink>
            ) : null}
          </nav>
        )}

        {/* Related Projects Grid (hidden gracefully when none) */}
        {related.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-h3 text-foreground">Related Case Studies</h2>
              <Link
                href="/portfolio"
                className="text-small font-semibold text-link hover:underline"
              >
                View all projects
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PortfolioCard key={item.slug} project={item} highlightTokens={[]} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
