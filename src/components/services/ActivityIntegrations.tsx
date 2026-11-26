'use client';

import { useEffect, useRef, useState } from 'react';
import { Network, Pause, Play } from 'lucide-react';
import type { ActivityIntegrationsData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceExtendedTone, ServiceIcon } from './ServiceIcon';

type ActivityIntegrationsProps = {
  data: ActivityIntegrationsData;
};

/**
 * Paired showcase: continuous live-style sample activity stream (strictly paused offscreen,
 * on hover/focus, on reduced motion, and via an explicit Pause control; static `sr-only` list
 * avoids `aria-live` chatter) alongside the central 10Peak Core integrations hub diagram.
 */
export function ActivityIntegrations({ data }: ActivityIntegrationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setInView(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const effectivePaused = paused || !inView;

  return (
    <section aria-labelledby="activity-integrations-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="activity-integrations-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="max-w-xl text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Left: Live Activity Stream (Visual loop + static sr-only readout) */}
        <div className="glass-card-strong flex flex-col rounded-lg p-5 sm:p-6 lg:col-span-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-white/4 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span className="font-heading text-small font-semibold text-(--glass-text)">
                {data.feedTitle}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/12 bg-white/6 px-2 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase">
                {data.sampleLabel}
              </span>
              <button
                type="button"
                aria-pressed={paused}
                onClick={() => setPaused((p) => !p)}
                className="inline-flex min-h-8 items-center gap-1 rounded-full border border-white/15 bg-white/6 px-2.5 py-0.5 font-mono text-[10px] text-(--glass-text-muted) hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
              >
                {paused ? (
                  <>
                    <Play className="size-3" aria-hidden="true" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="size-3" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <ul className="sr-only">
            {data.events.map((ev) => (
              <li key={ev.text}>
                {ev.text} ({ev.timeAgo})
              </li>
            ))}
          </ul>

          <div
            data-paused={effectivePaused ? 'true' : 'false'}
            aria-hidden="true"
            className="service-feed-viewport relative h-[310px] overflow-hidden"
          >
            <div className="service-feed-track space-y-2.5">
              {[...data.events, ...data.events].map((ev, idx) => {
                const tone = getServiceExtendedTone(ev.tone);
                return (
                  <div
                    key={`${ev.text}-${idx}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/5 px-3.5 py-2.5 text-caption"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <ServiceIcon name={ev.icon} className={cn('size-4 shrink-0', tone.text)} />
                      <span className="truncate text-(--glass-text)">{ev.text}</span>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-(--glass-text-meta)">
                      {ev.timeAgo}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Integrations Hub */}
        <div className="glass-card-strong glass-specular flex flex-col justify-between rounded-lg p-5 sm:p-7 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2.5">
            <span className="font-mono text-caption tracking-wider text-(--glass-cyan) uppercase">
              {data.hubTitle}
            </span>
            <span className="font-mono text-caption text-(--glass-text-meta)">
              {data.hubSubtitle}
            </span>
          </div>

          <div className="my-6 flex flex-col items-center justify-center">
            <div className="glass-cta-primary flex size-28 flex-col items-center justify-center rounded-2xl p-3 text-center shadow-[0_0_36px_rgb(142_33_252/0.45)] sm:size-32">
              <Network className="size-7 text-white" aria-hidden="true" />
              <span className="mt-1.5 font-heading text-small font-semibold text-white">
                {data.coreLabel}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-white/80 uppercase">
                {data.coreSublabel}
              </span>
            </div>

            <div className="mt-6 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {data.nodes.map((node) => {
                const tone = getServiceExtendedTone(node.tone);
                return (
                  <div
                    key={node.label}
                    className="flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-3 text-center font-mono text-[11px] text-(--glass-text)"
                  >
                    <span
                      className={cn('size-2 shrink-0 rounded-full', tone.dot)}
                      aria-hidden="true"
                    />
                    <span>{node.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10 pt-3 text-center font-mono text-caption text-(--glass-text-meta)">
            {data.protocols.join(' · ')}
          </div>
        </div>
      </div>
    </section>
  );
}
