'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { contactPath } from '@/content/navigation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { TrackedLink } from './TrackedLink';

export type TocItem = {
  id: string;
  label: string;
};

type CaseStudyTocProps = {
  items: TocItem[];
  projectSlug: string;
};

/**
 * Sticky desktop Table of Contents highlighting active section via IntersectionObserver,
 * plus collapsible "On this page" drawer on < 1024px viewports.
 */
export function CaseStudyToc({ items, projectSlug }: CaseStudyTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0 && visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-18% 0px -65% 0px', threshold: 0.05 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile / Tablet Collapsible TOC */}
      <div className="mb-8 rounded-md border border-border bg-surface-sunken lg:hidden">
        <button
          type="button"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left font-heading text-small font-semibold text-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <List className="size-4 text-primary" aria-hidden="true" strokeWidth={1.75} />
            On this page ({items.length} sections)
          </span>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform duration-(--duration-fast)',
              mobileOpen && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>
        {mobileOpen && (
          <nav aria-label="On this page" className="border-t border-border px-4 py-3">
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex min-h-10 items-center rounded-sm px-2.5 text-small transition-colors',
                      activeId === item.id
                        ? 'bg-background font-semibold text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:sticky lg:top-24 lg:col-span-3 lg:flex lg:flex-col lg:gap-6">
        <nav
          aria-label="Case study sections"
          className="rounded-md border border-border bg-card p-5"
        >
          <p className="mb-3 font-sans text-[0.8125rem] font-semibold tracking-[0.12em] text-brand-accent uppercase">
            Contents
          </p>
          <ul className="flex flex-col gap-1 border-l border-border">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      '-ml-px block border-l-2 py-1.5 pl-3.5 text-small transition-colors duration-(--duration-fast)',
                      isActive
                        ? 'border-primary font-semibold text-primary'
                        : 'border-transparent text-muted-foreground [@media(hover:hover)]:hover:border-slate-lavender [@media(hover:hover)]:hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="rounded-md border border-border bg-surface-sunken p-5">
          <p className="font-heading text-h5 text-foreground">Build something similar</p>
          <p className="mt-1.5 text-small text-muted-foreground">
            Discuss architecture, timelines, and AI integration with our engineering team.
          </p>
          <Button asChild size="sm" className="mt-4 w-full">
            <TrackedLink
              href={contactPath}
              event="case_study_cta_click"
              params={{ project_slug: projectSlug, location: 'toc_sidebar' }}
              onClick={() =>
                track('case_study_cta_click', {
                  project_slug: projectSlug,
                  location: 'toc_sidebar',
                })
              }
            >
              Start a project
              <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </TrackedLink>
          </Button>
        </div>
      </aside>
    </>
  );
}
