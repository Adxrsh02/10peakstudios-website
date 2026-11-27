import { Reveal } from '@/components/motion/Reveal';
import type { SignalPathData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type SignalPathProps = {
  data: SignalPathData;
};

/**
 * 5-step rising progression roadmap (`01 Audit` -> `05 Measure`) laying out how ongoing
 * Search & AI visibility work compounds over time.
 */
export function SignalPath({ data }: SignalPathProps) {
  return (
    <section aria-labelledby="signal-path-heading" className="space-y-8">
      <div className="flex max-w-2xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="signal-path-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <Reveal className="relative grid grid-cols-1 gap-4 md:grid-cols-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-7 right-8 left-8 hidden h-px bg-gradient-to-r from-[#8e21fc] via-[#c38bff] to-[#4cd7f6] opacity-55 md:block"
        />

        {data.steps.map((step) => {
          const tone = getServiceAccent(step.accent);
          return (
            <GlassSpotlight
              key={step.number}
              className="relative flex flex-col justify-between gap-5 rounded-lg p-5"
            >
              <div className="space-y-2.5">
                <span className={cn('block font-mono text-h5 font-semibold', tone.text)}>
                  {step.number}
                </span>
                <h3 className="m-0 font-heading text-h5 font-semibold text-(--glass-text)">
                  {step.title}
                </h3>
                <p className="text-small leading-relaxed text-(--glass-text-muted)">
                  {step.description}
                </p>
              </div>

              <span className="border-t border-white/10 pt-3 font-mono text-[11px] text-(--glass-text-meta) uppercase">
                {step.phaseLabel}
              </span>
            </GlassSpotlight>
          );
        })}
      </Reveal>
    </section>
  );
}
