import { Reveal } from '@/components/motion/Reveal';
import type { ProblemCardsData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

export function ProblemCards({ problems }: { problems: ProblemCardsData }) {
  return (
    <section aria-labelledby="problems-heading" className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {problems.eyebrow}
        </span>
        <h2
          id="problems-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {problems.titleLead} <span className="glass-gradient-text">{problems.titleAccent}</span>
        </h2>
      </div>

      <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {problems.items.map((item) => {
          const tone = getServiceAccent(item.accent);
          return (
            <GlassSpotlight
              key={item.title}
              data-reveal-item=""
              className="flex flex-col gap-5 rounded-lg p-6"
            >
              <div className={cn('grid size-12 place-items-center rounded-md border', tone.badge)}>
                <ServiceIcon name={item.icon} className="size-6" />
              </div>
              <div>
                <h3 className="mb-2 font-heading text-h4 font-semibold text-(--glass-text)">
                  {item.title}
                </h3>
                <p className="text-body leading-relaxed text-(--glass-text-muted)">
                  {item.description}
                </p>
              </div>
            </GlassSpotlight>
          );
        })}
      </Reveal>
    </section>
  );
}
