'use client';

import type { RefObject } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Starfield } from './Starfield';

type AscentStageHeaderProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  progressLabel: string;
  activeCamp: number;
  totalCamps: number;
  onPrev: () => void;
  onNext: () => void;
};

export function AscentStageControls({
  eyebrow,
  titleLead,
  titleAccent,
  progressLabel,
  activeCamp,
  totalCamps,
  onPrev,
  onNext,
}: AscentStageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        <span className="mb-2 block font-mono text-caption font-medium tracking-[0.08em] text-(--color-deep-violet) uppercase">
          [ {eyebrow} ]
        </span>
        <h2
          id="process-ascent-heading"
          className="m-0 font-heading text-h2 font-bold tracking-tight text-(--ascent-ink)"
        >
          {titleLead} <span className="text-arrow-rise">{titleAccent}</span>
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div
          aria-live="polite"
          className="flex items-center gap-3 rounded-pill border border-white/15 bg-(--ascent-dark-elevated)/90 px-4 py-2 text-(--ascent-dark-text) backdrop-blur-md"
        >
          <span className="hidden font-mono text-[11px] font-medium tracking-wider text-(--ascent-cyan) sm:inline">
            {progressLabel}
          </span>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: totalCamps }, (_, i) => {
              const step = i + 1;
              const isCurrent = step === activeCamp;
              const isPassed = step < activeCamp;
              return (
                <span
                  key={step}
                  className={
                    isCurrent
                      ? 'size-2.5 rounded-full bg-(--ascent-cyan) ring-2 ring-(--ascent-cyan)/50'
                      : isPassed
                        ? 'size-2 rounded-full bg-(--color-lilac-spark)'
                        : 'size-2 rounded-full bg-white/30'
                  }
                />
              );
            })}
          </div>
          <span className="font-mono text-caption font-semibold text-(--ascent-dark-text)">
            Camp {activeCamp} of {totalCamps}
          </span>
        </div>

        <div className="flex items-center gap-2" role="group" aria-label="Step through camps">
          <button
            type="button"
            onClick={onPrev}
            disabled={activeCamp <= 1}
            aria-label="Previous camp"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-pill border border-white/20 bg-(--ascent-dark-elevated)/90 px-3.5 text-small font-medium text-(--ascent-dark-text) transition-colors hover:border-(--color-lilac-spark) disabled:cursor-not-allowed disabled:opacity-45"
          >
            <ChevronLeft className="size-4" aria-hidden="true" strokeWidth={2} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={activeCamp >= totalCamps}
            aria-label="Next camp"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-pill border border-white/20 bg-(--ascent-dark-elevated)/90 px-3.5 text-small font-medium text-(--ascent-dark-text) transition-colors hover:border-(--color-lilac-spark) disabled:cursor-not-allowed disabled:opacity-45"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="size-4" aria-hidden="true" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}

type DesktopMountainProfileProps = {
  pathRef: RefObject<SVGPathElement | null>;
  starsOpacity: number;
};

/**
 * SVG mountain profile & scrub-drawn SVG trail line (`stroke-dashoffset` animated on desktop ScrollTrigger).
 * Stars appear progressively near the summit camps.
 */
export function AscentStage({ pathRef, starsOpacity }: DesktopMountainProfileProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 top-36 bottom-0 transition-opacity duration-300"
        style={{ opacity: starsOpacity }}
      >
        <Starfield />
      </div>

      <div aria-hidden="true" className="relative mb-6 hidden h-14 w-full lg:block">
        <svg className="h-full w-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1200 56">
          <defs>
            <linearGradient id="ascent-trail-grad" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="var(--color-peak-violet)" />
              <stop offset="55%" stopColor="var(--color-lilac-spark)" />
              <stop offset="100%" stopColor="var(--ascent-cyan)" />
            </linearGradient>
          </defs>
          <path
            d="M 32 46 Q 240 42 440 31 T 840 20 T 1168 8"
            stroke="rgb(255 255 255 / 0.14)"
            strokeLinecap="round"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
          <path
            ref={pathRef}
            d="M 32 46 Q 240 42 440 31 T 840 20 T 1168 8"
            stroke="url(#ascent-trail-grad)"
            strokeLinecap="round"
            strokeWidth="3.5"
          />
        </svg>
      </div>
    </>
  );
}
