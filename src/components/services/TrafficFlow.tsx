'use client';

import { useEffect, useRef, useState } from 'react';
import { Network, Pause, Play } from 'lucide-react';
import type { TrafficFlowData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';

type TrafficFlowProps = {
  slug: string;
  data: TrafficFlowData;
};

const SOURCE_Y = [42, 102, 162, 222, 282];
const OUTCOME_Y = [72, 162, 252];

/**
 * Interactive multi-channel traffic flow visualizer with 3 business-type toggles,
 * precomputed SVG Bézier paths that morph width per mix, hover/focus path highlighting,
 * pauseable animated flow particles, and clean vertical stacking on mobile viewports.
 */
export function TrafficFlow({ slug, data }: TrafficFlowProps) {
  const [activeTypeId, setActiveTypeId] = useState(
    data.types[1]?.id ?? data.types[0]?.id ?? 'local-service',
  );
  const [hoveredSourceId, setHoveredSourceId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) setInView(entries[0].isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const activeType = data.types.find((t) => t.id === activeTypeId) ?? data.types[0];
  const effectivePaused = paused || !inView || tabHidden;

  const handleSelectType = (id: TrafficFlowData['types'][number]['id']) => {
    if (id === activeTypeId) return;
    setActiveTypeId(id);
    setHoveredSourceId(null);
    track('traffic_type_change', { service_slug: slug, traffic_type: id });
  };

  return (
    <section
      ref={sectionRef}
      data-paused={effectivePaused ? 'true' : 'false'}
      aria-labelledby="traffic-flow-heading"
      className="space-y-8"
    >
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col items-start gap-2">
          <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
            {data.eyebrow}
          </span>
          <h2
            id="traffic-flow-heading"
            className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
          >
            {data.title}
          </h2>
          <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="tablist"
            aria-label="Select business type"
            className="flex flex-wrap rounded-full border border-white/15 bg-white/5 p-1"
          >
            {data.types.map((t) => {
              const isSelected = activeType?.id === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectType(t.id)}
                  className={cn(
                    'min-h-10 rounded-full px-4 py-1.5 font-heading text-caption font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                    isSelected
                      ? 'glass-cta-primary text-white'
                      : 'text-(--glass-text-muted) hover:text-(--glass-text)',
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={paused}
            aria-label={paused ? 'Resume traffic particles' : 'Pause traffic particles'}
            onClick={() => setPaused((p) => !p)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-(--glass-text-muted) hover:bg-white/10"
          >
            {paused ? (
              <Play className="size-3.5" aria-hidden="true" />
            ) : (
              <Pause className="size-3.5" aria-hidden="true" />
            )}
            <span>{paused ? 'Resume' : 'Pause'}</span>
          </button>
        </div>
      </div>

      {activeType && (
        <div className="glass-card-strong glass-specular relative overflow-hidden rounded-lg p-5 sm:p-8">
          {/* Desktop Precomputed SVG Connector Paths Behind Columns */}
          <svg
            viewBox="0 0 900 324"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            {activeType.sources.map((src, idx) => {
              const sy = SOURCE_Y[idx] ?? 162;
              const isHighlighted = hoveredSourceId === null || hoveredSourceId === src.id;
              const strokeW = Math.max(2, Number((1.5 + src.weight * 0.14).toFixed(2)));
              const strokeColor =
                src.tone === 'cyan' ? '#4cd7f6' : src.tone === 'lilac' ? '#e1c4ff' : '#a743f8';
              const d = `M 285 ${sy} C 355 ${sy}, 370 162, 430 162`;
              return (
                <g
                  key={src.id}
                  className="transition-opacity duration-300"
                  opacity={isHighlighted ? 0.9 : 0.2}
                >
                  <path
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeW}
                    strokeLinecap="round"
                    opacity={0.3}
                    className="transition-[stroke-width] duration-500"
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={Math.max(1.5, strokeW * 0.65)}
                    strokeDasharray="6 10"
                    strokeLinecap="round"
                    className="service-flow-particle"
                  />
                </g>
              );
            })}

            {activeType.outcomes.map((out, idx) => {
              const oy = OUTCOME_Y[idx] ?? 162;
              const strokeColor =
                out.tone === 'cyan' ? '#4cd7f6' : out.tone === 'lilac' ? '#e1c4ff' : '#a743f8';
              const d = `M 470 162 C 535 162, 550 ${oy}, 615 ${oy}`;
              return (
                <g key={out.id} opacity={0.85}>
                  <path d={d} fill="none" stroke={strokeColor} strokeWidth={2.5} opacity={0.3} />
                  <path
                    d={d}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={2}
                    strokeDasharray="6 10"
                    className="service-flow-particle"
                  />
                </g>
              );
            })}
          </svg>

          {/* 3-Column Desktop Grid / Vertical Stack Mobile */}
          <div className="relative z-10 grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            {/* Sources */}
            <div className="flex flex-col gap-2.5 lg:col-span-4">
              <span className="font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
                01 / Acquisition Sources
              </span>
              {activeType.sources.map((src) => {
                const tone = getServiceAccent(src.tone);
                const isActive = hoveredSourceId === src.id;
                return (
                  <button
                    key={src.id}
                    type="button"
                    onMouseEnter={() => setHoveredSourceId(src.id)}
                    onMouseLeave={() => setHoveredSourceId(null)}
                    onFocus={() => setHoveredSourceId(src.id)}
                    onBlur={() => setHoveredSourceId(null)}
                    className={cn(
                      'flex min-h-11 w-full items-center justify-between gap-2 rounded-md border px-3.5 py-2 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                      isActive
                        ? 'border-[#c38bff]/60 bg-[#8e21fc]/18'
                        : 'border-white/12 bg-[#14111f]/90 hover:border-white/25',
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2 text-small text-(--glass-text)">
                      <ServiceIcon name={src.icon} className={cn('size-4 shrink-0', tone.text)} />
                      <span className="truncate">{src.label}</span>
                    </span>
                    <span
                      className={cn('shrink-0 font-mono text-caption font-semibold', tone.text)}
                    >
                      {src.weight}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Vertical Arrow Connector */}
            <div aria-hidden="true" className="flex justify-center lg:hidden">
              <div className="h-6 w-0.5 bg-gradient-to-b from-[#8e21fc] to-[#4cd7f6]" />
            </div>

            {/* Hub */}
            <div className="flex justify-center lg:col-span-4">
              <div className="glass-card-strong flex size-40 flex-col items-center justify-center rounded-2xl border border-[#c38bff]/50 bg-[#0d0a16]/95 p-4 text-center shadow-[0_0_40px_-10px_rgb(142_33_252/0.55)]">
                <div className="mb-2 flex size-11 items-center justify-center rounded-full bg-[#8e21fc]/25 text-[#e1c4ff]">
                  <Network className="size-5.5" aria-hidden="true" />
                </div>
                <div className="font-heading text-small font-semibold text-(--glass-text)">
                  {data.hubTitle}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-(--glass-cyan)">
                  {data.hubSubtitle}
                </div>
                <div className="mt-1 text-[10px] text-(--glass-text-meta)">{data.hubFootnote}</div>
              </div>
            </div>

            {/* Mobile Vertical Arrow Connector */}
            <div aria-hidden="true" className="flex justify-center lg:hidden">
              <div className="h-6 w-0.5 bg-gradient-to-b from-[#4cd7f6] to-[#c38bff]" />
            </div>

            {/* Outcomes */}
            <div className="flex flex-col gap-3 lg:col-span-4">
              <span className="font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
                02 / Qualified Outcomes
              </span>
              {activeType.outcomes.map((out) => {
                const tone = getServiceAccent(out.tone);
                return (
                  <div
                    key={out.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-white/12 bg-[#14111f]/90 px-4 py-3"
                  >
                    <div>
                      <div className="font-heading text-small font-semibold text-(--glass-text)">
                        {out.title}
                      </div>
                      <div className="mt-0.5 text-caption text-(--glass-text-muted)">
                        {out.detail}
                      </div>
                    </div>
                    <ServiceIcon name={out.icon} className={cn('size-5 shrink-0', tone.text)} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-caption">
            <span className="font-mono text-(--glass-cyan)">{data.exampleNote}</span>
            <span className="text-(--glass-text-meta)">
              Stream weights shift based on how your buyers discover you
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
