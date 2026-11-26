'use client';

import { useRef, useSyncExternalStore, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, SearchX } from 'lucide-react';
import { domAnimation, LazyMotion, m, MotionConfig } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/primitives';
import { contactPath } from '@/content/navigation';
import { PORTFOLIO_INDUSTRIES } from '@/content/portfolio-config';
import { track } from '@/lib/analytics';
import type { PortfolioCardData } from '@/lib/portfolio/loader';
import type { IndustryValue, PortfolioQueryState } from '@/lib/portfolio/schema';
import {
  filterAndSortProjects,
  parsePortfolioQuery,
  serializePortfolioQuery,
  tokenizeQuery,
} from '@/lib/portfolio/search';
import { IndustryGridBand } from './IndustryGridBand';
import { PortfolioCard } from './PortfolioCard';
import { PortfolioFilterBar } from './PortfolioFilterBar';

const URL_EVENT = 'tps:portfolio-url-change';

function subscribeUrl(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener(URL_EVENT, callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(URL_EVENT, callback);
  };
}

function getSearchSnapshot() {
  return typeof window === 'undefined' ? '' : window.location.search;
}

function getServerSearchSnapshot() {
  return '';
}

type PortfolioCatalogProps = {
  projects: PortfolioCardData[];
  topTech: string[];
  approachSection: ReactNode;
};

/**
 * Interactive portfolio filter, search, FLIP card grid, and linked industry grid.
 * Syncs cleanly with URL query parameters via useSyncExternalStore + LazyMotion.
 */
export function PortfolioCatalog({ projects, topTech, approachSection }: PortfolioCatalogProps) {
  const searchString = useSyncExternalStore(
    subscribeUrl,
    getSearchSnapshot,
    getServerSearchSnapshot,
  );
  const query = parsePortfolioQuery(searchString);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const industryCounts = PORTFOLIO_INDUSTRIES.map((ind) => ({
    id: ind.id,
    label: ind.label,
    description: ind.description,
    count: projects.filter((p) => p.industry === ind.id).length,
  }));

  const results = filterAndSortProjects(projects, query);
  const highlightTokens = tokenizeQuery(query.q);

  const commitQuery = (
    nextState: PortfolioQueryState,
    filterEvent?: { type: string; value: string },
  ) => {
    const nextSearch = serializePortfolioQuery(nextState);
    const nextUrl = `${window.location.pathname}${nextSearch}`;
    window.history.replaceState(null, '', nextUrl);
    window.dispatchEvent(new Event(URL_EVENT));

    const nextResultsCount = filterAndSortProjects(projects, nextState).length;
    if (filterEvent) {
      track('portfolio_filter', {
        filter_type: filterEvent.type,
        filter_value: filterEvent.value,
        results_count: nextResultsCount,
      });
    } else if (nextState.q !== query.q) {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      searchTimerRef.current = setTimeout(() => {
        track('portfolio_search', {
          query_length: nextState.q.trim().length,
          results_count: nextResultsCount,
        });
      }, 400);
    }
  };

  const handleUpdate = (
    patch: Partial<PortfolioQueryState>,
    filterEvent?: { type: string; value: string },
  ) => {
    commitQuery({ ...query, ...patch }, filterEvent);
  };

  const handleClear = () => {
    commitQuery(
      { q: '', industry: 'all', capability: 'all', tech: 'all', sort: 'featured' },
      { type: 'reset', value: 'all' },
    );
  };

  const handleSelectIndustryFromGrid = (industry: IndustryValue) => {
    const nextIndustry = query.industry === industry ? 'all' : industry;
    commitQuery(
      { ...query, industry: nextIndustry },
      { type: 'industry_grid', value: nextIndustry },
    );
    const bar = document.getElementById('portfolio-filters');
    if (bar) bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <PortfolioFilterBar
          query={query}
          industries={industryCounts}
          topTech={topTech}
          totalCount={projects.length}
          filteredCount={results.length}
          onUpdate={handleUpdate}
          onClear={handleClear}
        />

        <Section surface="white" aria-labelledby="portfolio-catalog-heading">
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="portfolio-catalog-heading" className="text-h3 text-foreground">
                Project Case Studies
              </h2>
              <p aria-live="polite" className="text-small text-muted-foreground">
                Showing{' '}
                <strong className="price font-semibold text-foreground">{results.length}</strong> of{' '}
                <span className="price">{projects.length}</span>{' '}
                {projects.length === 1 ? 'project' : 'projects'}
              </p>
            </div>

            {results.length > 0 ? (
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {results.map(({ project }) => (
                  <m.li key={project.slug} layout="position" className="min-w-0">
                    <PortfolioCard project={project} highlightTokens={highlightTokens} />
                  </m.li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-5 rounded-lg border border-border bg-surface-sunken px-6 py-16 text-center">
                <span
                  aria-hidden="true"
                  className="grid size-14 place-items-center rounded-pill border border-border bg-card text-brand-accent"
                >
                  <SearchX className="size-7" strokeWidth={1.75} />
                </span>
                <div className="flex max-w-md flex-col gap-2">
                  <h3 className="text-h4 text-foreground">No matching case studies</h3>
                  <p className="text-body text-muted-foreground">
                    Try adjusting your search keywords or clearing filters. Looking for a specific
                    capability we haven&apos;t published yet? Let&apos;s discuss your project.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Button type="button" onClick={handleClear}>
                    Clear filters
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href={contactPath}>
                      Talk to our team
                      <ArrowRight aria-hidden="true" strokeWidth={1.75} />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Section>

        {approachSection}

        <IndustryGridBand
          industries={industryCounts}
          activeIndustry={query.industry}
          onSelectIndustry={handleSelectIndustryFromGrid}
        />
      </MotionConfig>
    </LazyMotion>
  );
}
