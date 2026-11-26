import { Reveal } from '@/components/motion/Reveal';
import type { GrowthPathData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type GrowthPathProps = {
  data: GrowthPathData;
};

/**
 * 3-stage product evolution roadmap (`MVP -> Version 1 -> Scale`).
 * Unconfirmed duration tags stay omitted via `registry.ts`, showing verified fallback badges.
 */
export function GrowthPath({ data }: GrowthPathProps) {
  return (
    <section aria-labelledby="growth-path-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="growth-path-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
      </div>

      <Reveal className="relative mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-9 right-12 left-12 hidden h-px bg-gradient-to-r from-(--color-peak-violet)/50 via-(--color-lilac-spark)/50 to-(--glass-cyan)/50 md:block"
        />

        {data.stages.map((stage) => {
          const tone = getServiceAccent(stage.accent);
          const displayBadge = stage.badge ?? stage.fallbackBadge;
          return (
            <GlassSpotlight
              key={stage.stageLabel}
              className="relative flex flex-col justify-between gap-5 rounded-lg p-6"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'font-mono text-caption font-medium tracking-wider uppercase',
                      tone.text,
                    )}
                  >
                    {stage.stageLabel}
                  </span>
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-0.5 font-mono text-[10px]',
                      tone.badge,
                    )}
                  >
                    {displayBadge}
                  </span>
                </div>

                <h3 className="m-0 font-heading text-h4 font-semibold text-(--glass-text)">
                  {stage.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-(--glass-text-muted)">
                  {stage.description}
                </p>
              </div>

              <div className={cn('border-t border-white/10 pt-3 font-mono text-[11px]', tone.text)}>
                {stage.deliverableLabel}
              </div>
            </GlassSpotlight>
          );
        })}
      </Reveal>
    </section>
  );
}
