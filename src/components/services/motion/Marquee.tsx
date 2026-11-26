'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/cn';

type MarqueeProps = {
  items: string[];
  label: string;
  className?: string;
};

/**
 * Infinite horizontal tech marquee with hover/focus pause and explicit Play/Pause control
 * satisfying WCAG 2.2.2 (Pause, Stop, Hide) and reduced-motion preferences.
 */
export function Marquee({ items, label, className }: MarqueeProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div className={cn('glass-card rounded-lg px-4 py-5 sm:px-6 sm:py-6', className)}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-sans text-[0.8125rem] font-semibold tracking-[0.12em] text-(--glass-text-muted) uppercase">
          {label}
        </p>
        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? 'Resume technology marquee' : 'Pause technology marquee'}
          onClick={() => setPaused((prev) => !prev)}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-pill border border-white/15 bg-white/5 px-3.5 text-caption font-medium text-(--glass-text) transition-colors [@media(hover:hover)]:hover:border-white/30 [@media(hover:hover)]:hover:bg-white/10"
        >
          {paused ? (
            <>
              <Play className="size-3.5 text-(--glass-cyan)" aria-hidden="true" />
              <span>Play</span>
            </>
          ) : (
            <>
              <Pause className="size-3.5 text-(--glass-cyan)" aria-hidden="true" />
              <span>Pause</span>
            </>
          )}
        </button>
      </div>

      <div
        className="service-marquee-viewport relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        data-paused={paused ? 'true' : undefined}
      >
        <div className="service-marquee-track items-center gap-3">
          {items.map((tech) => (
            <span
              key={`a-${tech}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-caption text-(--glass-text)"
            >
              <span className="size-1.5 rounded-full bg-(--glass-cyan)" aria-hidden="true" />
              {tech}
            </span>
          ))}
          {items.map((tech) => (
            <span
              key={`b-${tech}`}
              aria-hidden="true"
              className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-caption text-(--glass-text)"
            >
              <span className="size-1.5 rounded-full bg-(--glass-cyan)" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
