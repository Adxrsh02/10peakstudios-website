'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { CheckCircle2, GripVertical } from 'lucide-react';
import { useMotion } from '@/components/motion/MotionProvider';
import type { BeforeAfterSliderData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { getServiceExtendedTone, ServiceIcon } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type BeforeAfterSliderProps = {
  slug: string;
  data: BeforeAfterSliderData;
};

/**
 * Interactive Before / After comparison slider contrasting fragmented manual tools
 * against a unified software engine. Supports pointer drag and keyboard navigation
 * (`ArrowLeft`/`ArrowRight`/`Home`/`End`), performs one subtle auto-nudge on viewport entry
 * at Tier >= 1, and renders statically at 50% under SSR and reduced motion.
 */
export function BeforeAfterSlider({ slug, data }: BeforeAfterSliderProps) {
  const { tier } = useMotion();
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef(false);
  const trackedRef = useRef(false);

  // Single gentle intro peek on scroll into view at Tier >= 1
  useEffect(() => {
    if (tier < 1) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    let timerA: ReturnType<typeof setTimeout> | undefined;
    let timerB: ReturnType<typeof setTimeout> | undefined;
    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (fired || interactedRef.current) return;
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        fired = true;
        observer.disconnect();
        timerA = setTimeout(() => {
          if (!interactedRef.current) setPct(64);
          timerB = setTimeout(() => {
            if (!interactedRef.current) setPct(50);
          }, 520);
        }, 180);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timerA) clearTimeout(timerA);
      if (timerB) clearTimeout(timerB);
    };
  }, [tier]);

  const commitPosition = (next: number) => {
    const clamped = Math.max(8, Math.min(92, Math.round(next)));
    interactedRef.current = true;
    setPct(clamped);
    if (!trackedRef.current) {
      trackedRef.current = true;
      track('before_after_drag', { service_slug: slug, slider_pct: clamped });
    }
  };

  const updateFromClientX = (clientX: number) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box || box.width <= 0) return;
    const raw = ((clientX - box.left) / box.width) * 100;
    commitPosition(raw);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
    handleRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    if (handleRef.current?.hasPointerCapture(e.pointerId)) {
      handleRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 15 : 5;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      commitPosition(pct - step);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      commitPosition(pct + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      commitPosition(8);
    } else if (e.key === 'End') {
      e.preventDefault();
      commitPosition(92);
    }
  };

  return (
    <section aria-labelledby="before-after-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="before-after-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.titleLead} <span className="glass-gradient-text">{data.titleAccent}</span>
        </h2>
      </div>

      {/* Draggable Comparison Surface */}
      <div
        ref={containerRef}
        className="glass-card-strong relative mx-auto min-h-[400px] w-full max-w-5xl overflow-hidden rounded-lg select-none sm:min-h-[430px]"
      >
        {/* Underneath Layer: AFTER - Unified */}
        <div className="flex h-full min-h-[400px] flex-col justify-between bg-[#12101c] p-5 sm:min-h-[430px] sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/12 px-3 py-1 font-mono text-caption text-(--glass-emerald)">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
              {data.after.badge}
            </span>
            <span className="rounded-full border border-white/12 bg-white/6 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase">
              {data.after.tag}
            </span>
          </div>

          <div className="my-auto grid grid-cols-1 gap-3 py-5 sm:grid-cols-3 sm:gap-4">
            {data.after.cards.map((card) => {
              const tone = getServiceExtendedTone(card.tone);
              return (
                <div
                  key={card.label}
                  className="flex flex-col gap-1.5 rounded-md border border-white/12 bg-white/5 p-4"
                >
                  <span className="text-caption text-(--glass-text-muted)">{card.label}</span>
                  <div className={cn('font-heading text-h4 font-semibold', tone.text)}>
                    {card.value}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-(--glass-text-muted)">
                    <CheckCircle2 className="size-3.5 text-emerald-400" aria-hidden="true" />
                    <span>{card.note}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2.5 text-caption">
            <span className="inline-flex items-center gap-2 font-mono text-(--glass-text)">
              <CheckCircle2 className="size-4 text-(--glass-cyan)" aria-hidden="true" />
              {data.after.footerLeft}
            </span>
            <span className="font-mono text-(--glass-emerald)">{data.after.footerRight}</span>
          </div>
        </div>

        {/* Overlaid Clipped Layer: BEFORE - Fragmented */}
        <div
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          className={cn(
            'pointer-events-none absolute inset-0 flex flex-col justify-between bg-[#0b0a11] p-5 sm:p-9',
            !dragging && 'transition-[clip-path] duration-300 ease-out',
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/35 bg-rose-500/15 px-3 py-1 font-mono text-caption text-rose-200">
              <span className="size-2 rounded-full bg-rose-400" aria-hidden="true" />
              {data.before.badge}
            </span>
            <span className="rounded-full border border-white/12 bg-white/6 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase">
              {data.before.tag}
            </span>
          </div>

          <div className="my-auto grid grid-cols-1 gap-3 py-5 opacity-90 sm:grid-cols-3 sm:gap-4">
            {data.before.cards.map((card, idx) => (
              <div
                key={card.title}
                className={cn(
                  'rounded-md border p-3.5 text-caption',
                  card.tone === 'error' && 'border-rose-400/25 bg-rose-950/20 text-rose-100',
                  card.tone === 'amber' && 'border-amber-400/25 bg-amber-950/20 text-amber-100',
                  card.tone === 'neutral' && 'border-white/12 bg-white/5 text-(--glass-text-muted)',
                  idx === 0 && 'sm:-rotate-1',
                  idx === 1 && 'sm:rotate-1',
                  idx === 2 && 'sm:-rotate-1',
                )}
              >
                <div className="mb-1.5 font-mono text-[11px] font-semibold text-(--glass-text)">
                  {card.title}
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  {card.lines.map((line) => (
                    <div key={line} className="rounded bg-black/30 px-2 py-1">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-rose-400/25 bg-rose-950/25 px-4 py-2.5 font-mono text-caption text-rose-200">
            <span>{data.before.footerLeft}</span>
            <span>{data.before.footerRight}</span>
          </div>
        </div>

        {/* Draggable Divider + Keyboard Slider Handle */}
        <div
          ref={handleRef}
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after workflow view"
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={pct}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          style={{ left: `${pct}%` }}
          className={cn(
            'absolute inset-y-0 z-30 w-1 -translate-x-1/2 cursor-ew-resize bg-gradient-to-b from-(--glass-cyan) via-(--color-peak-violet) to-(--color-lilac-spark) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--glass-cyan)',
            !dragging && 'transition-[left] duration-300 ease-out',
          )}
        >
          <div className="glass-cta-primary absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg">
            <GripVertical className="size-4 text-white" aria-hidden="true" />
          </div>
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-[#0d0b14]/95 px-2.5 py-1 font-mono text-[10px] tracking-wider whitespace-nowrap text-(--glass-text) uppercase">
            {data.dragLabel}
          </div>
        </div>
      </div>

      {/* 3 Pain Point Bullets Beneath */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
        {data.painPoints.map((point) => {
          const tone = getServiceExtendedTone(point.accent);
          return (
            <GlassSpotlight key={point.title} className="flex items-start gap-3.5 rounded-lg p-5">
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full border',
                  tone.badge,
                )}
              >
                <ServiceIcon name={point.icon} className="size-4.5" />
              </div>
              <div>
                <h3 className="font-heading text-small font-semibold text-(--glass-text)">
                  {point.title}
                </h3>
                <p className="mt-1 text-caption leading-relaxed text-(--glass-text-muted)">
                  {point.description}
                </p>
              </div>
            </GlassSpotlight>
          );
        })}
      </div>
    </section>
  );
}
