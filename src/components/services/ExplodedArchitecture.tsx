'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import type { ExplodedArchitectureData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type ExplodedArchitectureProps = {
  data: ExplodedArchitectureData;
};

/**
 * 5-layer system anatomy showcase (`Interface -> API -> Business Logic -> Database -> Cloud`).
 * Renders a crisp vertical glass stack on SSR, mobile, and reduced motion; enhances desktop
 * Tier 2 scroll depth via subtle GSAP stagger spacing on fine-pointer wide screens.
 */
export function ExplodedArchitecture({ data }: ExplodedArchitectureProps) {
  const stackRef = useRef<HTMLDivElement>(null);

  useMotionEffect(
    stackRef,
    ({ gsap }, _tier, root) => {
      if (window.innerWidth < 1024) return;
      const cards = root.querySelectorAll<HTMLElement>('[data-arch-layer]');
      if (cards.length === 0) return;

      const tween = gsap.fromTo(
        cards,
        { y: 20 },
        {
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: 'peakRise',
          scrollTrigger: { trigger: root, start: 'top 84%', once: true },
        },
      );

      return () => {
        tween.kill();
      };
    },
    { minTier: 2 },
  );

  return (
    <section aria-labelledby="architecture-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="architecture-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="max-w-xl text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <div ref={stackRef} className="relative mx-auto flex max-w-4xl flex-col gap-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-6 bottom-6 left-7 w-0.5 bg-gradient-to-b from-(--color-peak-violet) via-(--color-lilac-spark) to-(--glass-cyan) opacity-55 sm:left-11"
        />

        {data.layers.map((layer) => {
          const tone = getServiceAccent(layer.accent);
          return (
            <GlassSpotlight
              key={layer.number}
              data-arch-layer=""
              className="relative flex items-center gap-4 rounded-lg p-5 sm:gap-6 sm:p-6"
            >
              <div
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-md border font-mono text-small font-semibold sm:size-12',
                  tone.badge,
                )}
              >
                {layer.number}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="m-0 font-heading text-h4 font-semibold text-(--glass-text)">
                    {layer.title}
                  </h3>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase',
                      tone.badge,
                    )}
                  >
                    {layer.tag}
                  </span>
                </div>
                <p className="mt-1.5 text-small leading-relaxed text-(--glass-text-muted)">
                  {layer.description}
                </p>
              </div>

              <ServiceIcon
                name={layer.icon}
                className="hidden size-6 shrink-0 text-(--glass-text-meta) sm:block"
              />
            </GlassSpotlight>
          );
        })}
      </div>
    </section>
  );
}
