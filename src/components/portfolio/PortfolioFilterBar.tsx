'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PORTFOLIO_CAPABILITIES } from '@/content/portfolio-config';
import { cn } from '@/lib/cn';
import {
  type CapabilityValue,
  type IndustryValue,
  type PortfolioQueryState,
  type PortfolioSort,
} from '@/lib/portfolio/schema';

export type IndustryFilterCount = {
  id: IndustryValue;
  label: string;
  count: number;
};

type PortfolioFilterBarProps = {
  query: PortfolioQueryState;
  industries: IndustryFilterCount[];
  topTech: string[];
  totalCount: number;
  filteredCount: number;
  onUpdate: (
    patch: Partial<PortfolioQueryState>,
    filterEvent?: { type: string; value: string },
  ) => void;
  onClear: () => void;
};

const selectClass =
  'h-11 rounded-sm border border-input bg-background px-3 text-small font-medium text-foreground transition-colors focus-visible:border-primary';

/**
 * Sticky search, industry chips (with 0-count disabled state), capability/tech/sort controls,
 * and mobile bottom Sheet filter drawer (Design.md 14, RUL-A11Y-07).
 */
export function PortfolioFilterBar({
  query,
  industries,
  topTech,
  totalCount,
  filteredCount,
  onUpdate,
  onClear,
}: PortfolioFilterBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Press "/" to focus search unless already inside an input/textarea/select
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable) {
        return;
      }
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeFilterCount =
    (query.industry !== 'all' ? 1 : 0) +
    (query.capability !== 'all' ? 1 : 0) +
    (query.tech !== 'all' ? 1 : 0) +
    (query.sort !== 'featured' ? 1 : 0);

  const hasAnyFilter = activeFilterCount > 0 || query.q.trim() !== '';

  return (
    <div
      id="portfolio-filters"
      className="sticky top-[var(--header-height)] z-(--z-raised) border-b border-border bg-background/95 py-4 shadow-sm"
    >
      <div className="container-content flex flex-col gap-3">
        {/* Top Row: Search Input + Desktop Dropdowns + Mobile Filter Sheet Trigger */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-0 flex-1 basis-[16rem]">
            <label htmlFor="portfolio-search" className="sr-only">
              Search case studies by title, technology, capability, or industry
            </label>
            <Search
              aria-hidden="true"
              strokeWidth={1.75}
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              ref={inputRef}
              id="portfolio-search"
              type="search"
              value={query.q}
              onChange={(e) => onUpdate({ q: e.target.value })}
              placeholder="Search projects, AI models, stacks..."
              className="h-12 w-full rounded-sm border border-input bg-background pr-20 pl-10 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary"
            />
            {query.q.trim() !== '' ? (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => {
                  onUpdate({ q: '' });
                  inputRef.current?.focus();
                }}
                className="absolute top-1/2 right-1.5 grid size-10 -translate-y-1/2 place-items-center rounded-sm text-muted-foreground transition-colors [@media(hover:hover)]:hover:bg-secondary [@media(hover:hover)]:hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" strokeWidth={1.75} />
              </button>
            ) : (
              <kbd
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-sm border border-border bg-surface-sunken px-2 py-0.5 font-mono text-caption text-muted-foreground lg:inline-block"
              >
                /
              </kbd>
            )}
          </div>

          {/* Desktop Inline Controls */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <label htmlFor="filter-capability" className="sr-only">
              Filter by capability
            </label>
            <select
              id="filter-capability"
              value={query.capability}
              onChange={(e) =>
                onUpdate(
                  { capability: e.target.value as CapabilityValue | 'all' },
                  { type: 'capability', value: e.target.value },
                )
              }
              className={selectClass}
            >
              <option value="all">All Capabilities</option>
              {PORTFOLIO_CAPABILITIES.map((cap) => (
                <option key={cap.label} value={cap.label}>
                  {cap.label}
                </option>
              ))}
            </select>

            <label htmlFor="filter-tech" className="sr-only">
              Filter by technology
            </label>
            <select
              id="filter-tech"
              value={query.tech}
              onChange={(e) =>
                onUpdate({ tech: e.target.value }, { type: 'tech', value: e.target.value })
              }
              className={selectClass}
            >
              <option value="all">All Technologies</option>
              {topTech.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <label htmlFor="filter-sort" className="sr-only">
              Sort case studies
            </label>
            <select
              id="filter-sort"
              value={query.sort}
              onChange={(e) =>
                onUpdate(
                  { sort: e.target.value as PortfolioSort },
                  { type: 'sort', value: e.target.value },
                )
              }
              className={selectClass}
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest</option>
              <option value="complexity">Sort: Complexity</option>
            </select>

            {hasAnyFilter && (
              <Button type="button" variant="ghost" onClick={onClear} className="px-2 text-small">
                Clear filters
              </Button>
            )}
          </div>

          {/* Mobile Filter Sheet Trigger (< 1024px) */}
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open portfolio filters"
                className="inline-flex h-12 items-center gap-2 rounded-sm border border-input bg-background px-4 text-small font-semibold text-foreground transition-colors lg:hidden [@media(hover:hover)]:hover:bg-secondary"
              >
                <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="grid size-5 place-items-center rounded-pill bg-primary text-caption font-semibold text-primary-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              closeLabel="Close portfolio filters"
              className="inset-x-0 inset-y-auto bottom-0 h-auto max-h-[85dvh] max-w-none rounded-t-[1.5rem] border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
            >
              <div className="border-b border-border px-5 py-4">
                <SheetTitle className="font-heading text-h5 text-foreground">
                  Filter Case Studies
                </SheetTitle>
                <SheetDescription>
                  Narrow projects by industry, capability, technology, or order.
                </SheetDescription>
              </div>

              <div className="flex flex-col gap-5 overflow-y-auto px-5 py-5">
                <div className="flex flex-col gap-2">
                  <p className="text-small font-semibold text-foreground">Industry</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      aria-pressed={query.industry === 'all'}
                      onClick={() =>
                        onUpdate({ industry: 'all' }, { type: 'industry', value: 'all' })
                      }
                      className={cn(
                        'min-h-11 rounded-pill border px-3.5 text-small font-medium transition-colors',
                        query.industry === 'all'
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border bg-surface-sunken text-foreground',
                      )}
                    >
                      All ({totalCount})
                    </button>
                    {industries.map((ind) => {
                      const selected = query.industry === ind.id;
                      const empty = ind.count === 0;
                      return (
                        <button
                          key={ind.id}
                          type="button"
                          disabled={empty}
                          aria-pressed={selected}
                          onClick={() =>
                            onUpdate({ industry: ind.id }, { type: 'industry', value: ind.id })
                          }
                          className={cn(
                            'min-h-11 rounded-pill border px-3.5 text-small font-medium transition-colors',
                            selected
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border bg-surface-sunken text-foreground',
                            empty && 'opacity-45',
                          )}
                        >
                          {ind.label} ({ind.count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="mobile-capability"
                      className="text-small font-semibold text-foreground"
                    >
                      Capability
                    </label>
                    <select
                      id="mobile-capability"
                      value={query.capability}
                      onChange={(e) =>
                        onUpdate(
                          { capability: e.target.value as CapabilityValue | 'all' },
                          { type: 'capability', value: e.target.value },
                        )
                      }
                      className={cn(selectClass, 'h-12 text-base')}
                    >
                      <option value="all">All Capabilities</option>
                      {PORTFOLIO_CAPABILITIES.map((cap) => (
                        <option key={cap.label} value={cap.label}>
                          {cap.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="mobile-tech"
                      className="text-small font-semibold text-foreground"
                    >
                      Technology
                    </label>
                    <select
                      id="mobile-tech"
                      value={query.tech}
                      onChange={(e) =>
                        onUpdate({ tech: e.target.value }, { type: 'tech', value: e.target.value })
                      }
                      className={cn(selectClass, 'h-12 text-base')}
                    >
                      <option value="all">All Technologies</option>
                      {topTech.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="mobile-sort" className="text-small font-semibold text-foreground">
                    Sort by
                  </label>
                  <select
                    id="mobile-sort"
                    value={query.sort}
                    onChange={(e) =>
                      onUpdate(
                        { sort: e.target.value as PortfolioSort },
                        { type: 'sort', value: e.target.value },
                      )
                    }
                    className={cn(selectClass, 'h-12 text-base')}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="complexity">Complexity</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-border p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={onClear}
                  disabled={!hasAnyFilter}
                >
                  Clear filters
                </Button>
                <SheetClose asChild>
                  <Button type="button" size="md" className="flex-1">
                    Show {filteredCount} {filteredCount === 1 ? 'project' : 'projects'}
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Industry Chips Row */}
        <div
          role="group"
          aria-label="Filter by industry"
          className="no-scrollbar hidden items-center gap-2 overflow-x-auto pb-1 lg:flex"
        >
          <button
            type="button"
            aria-pressed={query.industry === 'all'}
            onClick={() => onUpdate({ industry: 'all' }, { type: 'industry', value: 'all' })}
            className={cn(
              'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-pill border px-3.5 text-small font-medium transition-colors',
              query.industry === 'all'
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface-sunken text-foreground [@media(hover:hover)]:hover:border-primary/50',
            )}
          >
            All <span className="price opacity-80">({totalCount})</span>
          </button>
          {industries.map((ind) => {
            const selected = query.industry === ind.id;
            const empty = ind.count === 0;
            return (
              <button
                key={ind.id}
                type="button"
                disabled={empty}
                aria-pressed={selected}
                onClick={() => onUpdate({ industry: ind.id }, { type: 'industry', value: ind.id })}
                className={cn(
                  'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-pill border px-3.5 text-small font-medium transition-colors',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface-sunken text-foreground [@media(hover:hover)]:hover:border-primary/50',
                  empty && 'opacity-45',
                )}
              >
                {ind.label} <span className="price opacity-80">({ind.count})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
