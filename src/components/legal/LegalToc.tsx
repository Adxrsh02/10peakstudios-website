'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, List, Printer } from 'lucide-react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';

export type LegalTocItem = {
  id: string;
  number: string;
  title: string;
};

type LegalTocProps = {
  items: LegalTocItem[];
  articleSelector: string;
};

/**
 * Sticky desktop Table of Contents + Reading Progress Bar + Mobile collapsible menu.
 * Zero heavy scroll effects (Design.md 15 pages/legal).
 */
export function LegalToc({ items, articleSelector }: LegalTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useMotionEffect(barRef, ({ gsap }, _tier, barEl) => {
    const target = document.querySelector(articleSelector);
    if (!target) return;
    gsap.set(barEl, { scaleX: 0 });
    gsap.to(barEl, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: target, start: 'top top', end: 'bottom bottom', scrub: true },
    });
  });

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0.05 },
    );

    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, [items]);

  return (
    <>
      <div
        data-slot="legal-reading-progress"
        aria-hidden="true"
        className="no-print pointer-events-none fixed top-[var(--header-height)] right-0 left-0 z-(--z-raised) h-[3px]"
      >
        <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-arrow-rise" />
      </div>

      {/* Mobile Collapsible On-This-Page Menu */}
      <div
        data-legal-toc=""
        className="no-print mb-8 rounded-md border border-border bg-surface-sunken lg:hidden"
      >
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
                      'flex min-h-11 items-center rounded-sm px-2.5 text-small transition-colors',
                      activeId === item.id
                        ? 'bg-background font-semibold text-primary'
                        : 'text-muted-foreground',
                    )}
                  >
                    <span className="price mr-2 w-5 shrink-0">{item.number}.</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside
        data-legal-toc=""
        className="no-print hidden lg:sticky lg:top-24 lg:col-span-4 lg:flex lg:flex-col lg:gap-4"
      >
        <nav aria-label="Document sections" className="rounded-md border border-border bg-card p-5">
          <p className="mb-3 font-sans text-[0.8125rem] font-semibold tracking-[0.12em] text-brand-accent uppercase">
            On This Page
          </p>
          <ul className="flex flex-col gap-1 border-l border-border">
            {items.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? 'location' : undefined}
                    className={cn(
                      '-ml-px flex items-baseline gap-2 border-l-2 py-1.5 pl-3.5 text-small transition-colors duration-(--duration-fast)',
                      active
                        ? 'border-primary font-semibold text-primary'
                        : 'border-transparent text-muted-foreground [@media(hover:hover)]:hover:border-slate-lavender [@media(hover:hover)]:hover:text-foreground',
                    )}
                  >
                    <span className="price shrink-0">{item.number}.</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-pill border border-border bg-surface-sunken px-4 text-small font-medium text-foreground transition-colors [@media(hover:hover)]:hover:border-primary/50"
        >
          <Printer className="size-4 text-primary" aria-hidden="true" strokeWidth={1.75} />
          Print this page
        </button>
      </aside>
    </>
  );
}
