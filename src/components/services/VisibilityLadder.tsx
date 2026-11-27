'use client';

import { useRef, useState, type TouchEvent } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import type { VisibilityLadderData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useDigitalMarketingSimulator } from './DigitalMarketingSimulator';
import { getServiceAccent } from './ServiceIcon';

type VisibilityLadderProps = {
  slug: string;
  data: VisibilityLadderData;
};

/**
 * 4-tier progression stage (`SEO -> AEO -> GEO -> AIO`).
 * - Desktop >= 1024px (Tier 2): pinned ScrollTrigger scrubbed through stages + interactive controls.
 * - Mobile < 768px: touch-swipeable card deck with progress bar + Prev/Next buttons (zero pinning).
 * - Reduced motion (`tier === 0` or `prefers-reduced-motion`): clean stacked vertical list via CSS.
 */
export function VisibilityLadder({ slug, data }: VisibilityLadderProps) {
  const { brand, city } = useDigitalMarketingSimulator();
  const sectionRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const count = data.stages.length;
  const safeBrandSlug =
    brand
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '')
      .slice(0, 22) || 'yourbrand';

  const selectStage = (idx: number) => {
    const clamped = Math.max(0, Math.min(count - 1, idx));
    setActiveIdx(clamped);
    if (clamped === count - 1 && !completedRef.current) {
      completedRef.current = true;
      track('visibility_ladder_complete', { service_slug: slug });
    }
  };

  useMotionEffect(
    sectionRef,
    ({ gsap, ScrollTrigger }, _t, root) => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: root,
          start: 'top 14%',
          end: '+=105%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = Math.min(count - 1, Math.floor(self.progress * count));
            setActiveIdx(next);
            if (next === count - 1 && !completedRef.current) {
              completedRef.current = true;
              track('visibility_ladder_complete', { service_slug: slug });
            }
          },
        });
      });

      return () => {
        mm.revert();
      };
    },
    { minTier: 2 },
  );

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) touchStartXRef.current = touch.clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const touch = e.changedTouches[0];
    touchStartXRef.current = null;
    if (startX === null || !touch) return;
    const dx = touch.clientX - startX;
    if (Math.abs(dx) < 42) return;
    if (dx < 0 && activeIdx < count - 1) selectStage(activeIdx + 1);
    if (dx > 0 && activeIdx > 0) selectStage(activeIdx - 1);
  };

  const renderSimulatedCard = (stageId: string, queryText: string) => {
    if (stageId === 'seo') {
      return (
        <div className="space-y-3 pt-1">
          <div className="rounded-md border border-white/10 bg-white/3 p-3 opacity-70">
            <div className="font-mono text-[11px] text-(--glass-cyan)">
              https://local-directory.example
            </div>
            <div className="mt-0.5 font-heading text-small font-medium text-(--glass-text)">
              Service Providers in {city}
            </div>
          </div>

          <div className="rounded-md border border-[#c38bff]/45 bg-[#8e21fc]/12 p-4 shadow-[0_0_24px_-8px_rgb(142_33_252/0.5)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#c38bff]">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                <span>https://{safeBrandSlug}.com</span>
              </span>
              <span className="rounded bg-[#8e21fc]/25 px-2 py-0.5 font-mono text-[10px] text-[#e1c4ff] uppercase">
                Organic Listing
              </span>
            </div>
            <div className="mt-1.5 font-heading text-small font-semibold text-(--glass-text)">
              {brand} — Trusted Services in {city}
            </div>
            <p className="mt-1 text-caption leading-relaxed text-(--glass-text-muted)">
              Dedicated service pages, verified local business details, and clear pricing for {city}{' '}
              customers searching {queryText}.
            </p>
          </div>
        </div>
      );
    }

    if (stageId === 'aeo') {
      return (
        <div className="space-y-3 rounded-md border border-(--glass-cyan)/40 bg-white/5 p-5">
          <div className="flex items-center gap-2 font-mono text-caption text-(--glass-cyan)">
            <Sparkles className="size-4" aria-hidden="true" />
            <span>Direct Answer Box · Google Search</span>
          </div>
          <p className="text-small leading-relaxed text-(--glass-text)">
            In <strong className="font-semibold text-(--glass-text)">{city}</strong>,{' '}
            <strong className="font-semibold text-[#c38bff]">{brand}</strong> publishes structured
            answers covering scope, appointment hours and process clarity, making the page easy for
            search engines to extract directly.
          </p>
          <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-2.5 font-mono text-[11px] text-(--glass-text-meta)">
            <span>Cited page:</span>
            <span className="rounded border border-(--glass-cyan)/30 bg-(--glass-cyan-soft) px-2 py-0.5 text-(--glass-cyan)">
              {safeBrandSlug}.com/answers
            </span>
          </div>
        </div>
      );
    }

    if (stageId === 'geo') {
      return (
        <div className="space-y-3">
          <div className="ml-auto max-w-md rounded-xl rounded-tr-none border border-white/12 bg-white/8 px-4 py-2.5 text-small text-(--glass-text)">
            &ldquo;Who is worth considering for this service in {city}?&rdquo;
          </div>
          <div className="max-w-lg space-y-2 rounded-xl rounded-tl-none border border-[#c38bff]/35 bg-[#0b0912]/90 p-4">
            <div className="font-mono text-[11px] tracking-wider text-[#c38bff] uppercase">
              Assistant response · ChatGPT / Perplexity / Gemini
            </div>
            <p className="text-small leading-relaxed text-(--glass-text-muted)">
              Based on consistent citations and clear service documentation,{' '}
              <strong className="font-semibold text-(--glass-text)">{brand}</strong> in{' '}
              <strong className="font-semibold text-(--glass-text)">{city}</strong> is frequently
              highlighted for transparent specifications and verified customer answers.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4 rounded-md border border-[#c38bff]/40 bg-white/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-caption text-[#c38bff] uppercase">
            AI Action Card · Claude / Assistant Agents
          </span>
          <span className="rounded-full border border-emerald-400/35 bg-emerald-500/12 px-2.5 py-0.5 font-mono text-[10px] text-(--glass-emerald)">
            Structured Feed Ready
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-[#0b0912]/80 p-3.5">
          <div>
            <div className="font-heading text-small font-semibold text-(--glass-text)">
              Request consultation with {brand}
            </div>
            <div className="mt-0.5 font-mono text-caption text-(--glass-text-muted)">
              Location: {city} · Machine-readable booking endpoint
            </div>
          </div>
          <span className="glass-cta-primary inline-flex min-h-9 items-center rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold">
            Confirm action
          </span>
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-[11px] text-(--glass-text-muted)">
          <span className="rounded border border-white/12 bg-white/4 px-2.5 py-1">
            Schema: Organization
          </span>
          <span className="rounded border border-white/12 bg-white/4 px-2.5 py-1">
            Area: {city}
          </span>
          <span className="rounded border border-white/12 bg-white/4 px-2.5 py-1">
            Actions: Verified
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="visibility-ladder"
      aria-labelledby="visibility-ladder-heading"
      className="scroll-mt-24 space-y-8"
    >
      <div className="flex max-w-3xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="visibility-ladder-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.titleLead} <span className="glass-gradient-text">{data.titleAccent}</span>
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      {/* Pinned Desktop Stage / Swipeable Mobile Container / Reduced-Motion Stacked List */}
      <div ref={sectionRef} className="space-y-4">
        {/* Progress bar for narrow/mobile swipe view */}
        <div className="flex items-center justify-between gap-3 md:hidden">
          <span className="font-mono text-caption text-(--glass-cyan)">
            Step {activeIdx + 1} of {count}: {data.stages[activeIdx]?.code}
          </span>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/12">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#8e21fc] to-[#4cd7f6] transition-all duration-300"
              style={{ width: `${((activeIdx + 1) / count) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Left Rail (clickable step tabs on md+, hidden on reduced-motion stacked view where all stages show) */}
          <div
            role="tablist"
            aria-label="Visibility ladder stages"
            className="hidden flex-col gap-3 motion-reduce:hidden! md:flex lg:col-span-4"
          >
            {data.stages.map((stage, idx) => {
              const tone = getServiceAccent(stage.accent);
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={stage.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => selectStage(idx)}
                  className={cn(
                    'flex w-full items-start gap-3.5 rounded-lg border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                    isSelected
                      ? 'border-[#c38bff]/55 bg-[rgb(142_33_252/0.16)] shadow-[0_0_24px_-8px_rgb(142_33_252/0.5)]'
                      : 'border-white/10 bg-white/4 hover:border-white/25',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-md border font-mono text-caption font-semibold',
                      isSelected ? 'glass-cta-primary text-white' : tone.badge,
                    )}
                  >
                    {stage.stepNumber}
                  </span>
                  <div className="min-w-0">
                    <div className="font-heading text-small font-semibold text-(--glass-text)">
                      {stage.title}
                    </div>
                    <div className="mt-0.5 text-caption text-(--glass-text-muted)">
                      {stage.shortTagline}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stage Deck */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="space-y-4 lg:col-span-8 motion-reduce:lg:col-span-12"
          >
            {data.stages.map((stage, idx) => {
              const tone = getServiceAccent(stage.accent);
              const queryText = stage.queryTemplate.replace('{city}', city);
              const isActive = activeIdx === idx;
              return (
                <article
                  key={stage.id}
                  aria-hidden={!isActive ? true : undefined}
                  className={cn(
                    'glass-card-strong glass-specular rounded-lg p-5 motion-reduce:block! sm:p-7',
                    isActive ? 'block' : 'hidden [html[data-motion-tier="0"]_&]:block!',
                  )}
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={cn('font-mono text-caption font-semibold', tone.text)}>
                        {stage.stageCode}
                      </span>
                      <span className="font-mono text-[11px] text-(--glass-text-meta)">
                        · {queryText}
                      </span>
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/6 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase">
                      {stage.simulatedLabel}
                    </span>
                  </div>

                  {renderSimulatedCard(stage.id, queryText)}

                  <p className="mt-5 border-t border-white/10 pt-3.5 text-small leading-relaxed text-(--glass-text-muted)">
                    <strong className={cn('font-semibold', tone.text)}>
                      {stage.stepNumber} {stage.code}:
                    </strong>{' '}
                    {stage.explanation}
                  </p>
                </article>
              );
            })}

            {/* Non-scroll Controls (Prev / Next buttons for mobile swipe + desktop keyboard users) */}
            <div className="flex items-center justify-between gap-3 pt-1 motion-reduce:hidden">
              <button
                type="button"
                disabled={activeIdx === 0}
                onClick={() => selectStage(activeIdx - 1)}
                className="glass-cta-secondary inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-caption disabled:opacity-40"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                disabled={activeIdx === count - 1}
                onClick={() => selectStage(activeIdx + 1)}
                className="glass-cta-secondary inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 font-mono text-caption disabled:opacity-40"
              >
                <span>Next step</span>
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Formula Strip */}
      <div className="glass-card flex flex-col items-start justify-between gap-4 rounded-lg px-5 py-4 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-small text-(--glass-text)">
          {data.summaryFormula.map((item, idx) => {
            const tone = getServiceAccent(item.tone);
            return (
              <span key={item.code} className="inline-flex items-center gap-2">
                {idx > 0 && (
                  <span className="text-(--glass-text-meta)" aria-hidden="true">
                    →
                  </span>
                )}
                <span>
                  <strong className={tone.text}>{item.code}</strong> {item.text}
                </span>
              </span>
            );
          })}
        </div>
        <a
          href={data.summaryCtaHref}
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full border border-[#c38bff]/45 bg-[#8e21fc]/20 px-4 py-1.5 font-mono text-caption text-[#e1c4ff] hover:bg-[#8e21fc]/35"
        >
          <span>{data.summaryCtaLabel}</span>
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
