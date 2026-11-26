'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import type { EngineRoomData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type EngineRoomProps = {
  data: EngineRoomData;
};

/**
 * 2x2 technology stack terminal windows (`frontend.env`, `server.runtime`, `storage.config`,
 * `cloud.mesh`). Always server-renders full readable stack text and enhances with a single
 * one-shot entry highlight on scroll when motionTier >= 1.
 */
export function EngineRoom({ data }: EngineRoomProps) {
  const { tier } = useMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (tier < 1) return;
    const node = gridRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [tier]);

  return (
    <section aria-labelledby="engine-room-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="engine-room-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="max-w-xl text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <div ref={gridRef} className="mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        {data.terminals.map((term) => {
          const tone = getServiceAccent(term.accent);
          return (
            <GlassSpotlight
              key={term.filename}
              className={cn(
                'glass-card-strong flex flex-col gap-3 rounded-lg p-5 font-mono transition-all duration-500',
                entered && tier >= 1 && 'border-white/20',
              )}
            >
              <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/4 px-3 py-1.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-rose-400/75" />
                  <span className="size-2.5 rounded-full bg-amber-300/75" />
                  <span className="size-2.5 rounded-full bg-emerald-400/75" />
                </div>
                <span className={cn('text-caption', tone.text)}>{term.filename}</span>
              </div>

              <div className="flex flex-col gap-1.5 text-small">
                <span className="text-caption text-(--glass-text-meta)">{term.comment}</span>
                <span className={cn('font-semibold', tone.text)}>{term.stackLine}</span>
                <span className="mt-1 text-[11px] text-(--glass-text-muted)">
                  {term.outputLine}
                </span>
              </div>
            </GlassSpotlight>
          );
        })}
      </div>
    </section>
  );
}
