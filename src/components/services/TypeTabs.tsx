'use client';

import { useState, type KeyboardEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { ServicePageContent } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

type TypeTabsProps = {
  slug: string;
  typeTabs: ServicePageContent['typeTabs'];
};

/**
 * Accessible website-type tab switcher with ArrowLeft/ArrowRight/Home/End keyboard navigation,
 * crossfade panel transition, and GA4 tracking via `track('service_tab_change', ...)`.
 */
export function TypeTabs({ slug, typeTabs }: TypeTabsProps) {
  const [activeId, setActiveId] = useState(typeTabs.tabs[0]?.id ?? '');
  const activeTab = typeTabs.tabs.find((t) => t.id === activeId) ?? typeTabs.tabs[0];

  const selectTab = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    track('service_tab_change', { service_slug: slug, tab_id: id });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = typeTabs.tabs.length;
    if (count === 0) return;

    let nextIdx = -1;
    if (e.key === 'ArrowRight') nextIdx = (index + 1) % count;
    else if (e.key === 'ArrowLeft') nextIdx = (index - 1 + count) % count;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = count - 1;

    if (nextIdx >= 0) {
      e.preventDefault();
      const target = typeTabs.tabs[nextIdx];
      if (target) {
        selectTab(target.id);
        document.getElementById(`service-tab-${target.id}`)?.focus();
      }
    }
  };

  if (!activeTab) return null;

  return (
    <section id="website-types" aria-labelledby="types-heading" className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {typeTabs.eyebrow}
        </span>
        <h2
          id="types-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {typeTabs.title}
        </h2>
      </div>

      {/* Tablist */}
      <div
        role="tablist"
        aria-label={typeTabs.title}
        className="glass-card flex w-fit max-w-full flex-wrap gap-1.5 rounded-pill p-1.5"
      >
        {typeTabs.tabs.map((tab, index) => {
          const selected = tab.id === activeTab.id;
          return (
            <button
              key={tab.id}
              id={`service-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`service-tabpanel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                'min-h-11 rounded-pill px-4 py-2 text-small font-semibold transition-all duration-(--duration-fast) sm:px-5',
                selected
                  ? 'bg-(--color-peak-violet) text-white shadow-[0_0_20px_rgb(142_33_252/0.45)]'
                  : 'text-(--glass-text-muted) [@media(hover:hover)]:hover:bg-white/6 [@media(hover:hover)]:hover:text-(--glass-text)',
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active Tabpanel */}
      <div
        key={activeTab.id}
        id={`service-tabpanel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`service-tab-${activeTab.id}`}
        className="glass-card-strong glass-specular animate-in rounded-lg p-6 duration-200 fade-in-0 motion-reduce:animate-none sm:p-8 lg:p-10"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-6">
            <div>
              <span className="font-mono text-caption font-semibold tracking-wider text-(--glass-cyan) uppercase">
                {activeTab.categoryTag}
              </span>
              <h3 className="mt-1.5 font-heading text-h3 font-bold text-(--glass-text)">
                {activeTab.title}
              </h3>
              <p className="mt-2 text-body-lg leading-relaxed text-(--glass-text-muted)">
                {activeTab.description}
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
              {activeTab.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2.5 text-small text-(--glass-text)">
                  <CheckCircle2
                    className="size-4.5 shrink-0 text-(--glass-cyan)"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 border-t border-white/12 pt-4">
              {activeTab.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-pill border border-white/12 bg-white/5 px-3 py-1 font-mono text-caption text-(--glass-text-muted)"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Viewport Wireframe Preview */}
          <div aria-hidden="true" className="flex justify-center lg:col-span-6">
            <div className="w-full max-w-md rounded-lg border border-white/16 bg-white/4 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-rose-400/75" />
                  <span className="size-2.5 rounded-full bg-purple-400/70" />
                  <span className="size-2.5 rounded-full bg-cyan-400/75" />
                </div>
                <span className="font-mono text-[11px] text-(--glass-text-meta)">
                  {activeTab.viewportLabel}
                </span>
              </div>
              <div className="space-y-3 py-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-20 rounded bg-(--color-peak-violet)/45" />
                  <div className="flex gap-2">
                    <div className="h-2 w-8 rounded bg-white/15" />
                    <div className="h-2 w-8 rounded bg-white/15" />
                  </div>
                </div>
                <div className="flex flex-col gap-3 rounded-md border border-white/10 bg-black/35 p-5">
                  <div className="h-4 w-3/5 rounded bg-gradient-to-r from-[#8e21fc] to-[#c38bff]" />
                  <div className="h-2 w-full rounded bg-white/16" />
                  <div className="h-2 w-4/5 rounded bg-white/12" />
                  <div className="mt-2 h-7 w-28 rounded-pill border border-[#c38bff]/40 bg-(--color-peak-violet)/35" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="h-14 rounded-sm border border-white/10 bg-black/25" />
                  <div className="h-14 rounded-sm border border-white/10 bg-black/25" />
                  <div className="h-14 rounded-sm border border-white/10 bg-black/25" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
