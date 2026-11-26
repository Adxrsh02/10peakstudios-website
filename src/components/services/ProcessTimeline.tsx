import { Reveal } from '@/components/motion/Reveal';
import type { ServicePageContent } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';
import { TimelineDraw } from './motion/TimelineDraw';

export function ProcessTimeline({ process }: { process: ServicePageContent['process'] }) {
  return (
    <section aria-labelledby="process-heading" className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {process.eyebrow}
        </span>
        <h2
          id="process-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {process.title}
        </h2>
      </div>

      <Reveal className="relative space-y-5 pl-7 sm:pl-11">
        <TimelineDraw className="absolute top-4 bottom-4 left-3 sm:left-4.5" />

        {process.steps.map((step) => {
          const tone = getServiceAccent(step.accent);
          return (
            <div key={step.number} data-reveal-item="" className="relative flex items-start">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-6 -left-7 flex size-6.5 items-center justify-center rounded-full border-2 bg-(--glass-canvas) sm:-left-11',
                  tone.border,
                )}
              >
                <span className={cn('size-2 rounded-full', tone.dot)} />
              </span>

              <GlassSpotlight className="w-full rounded-lg p-6">
                <span className={cn('font-mono text-caption font-bold tracking-wider', tone.text)}>
                  {step.code}
                </span>
                <h3 className="mt-1 font-heading text-h4 font-semibold text-(--glass-text)">
                  {step.title}
                </h3>
                <p className="mt-2 text-body leading-relaxed text-(--glass-text-muted)">
                  {step.description}
                </p>
              </GlassSpotlight>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
