import { Reveal } from '@/components/motion/Reveal';
import type { AudienceGridData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

export function AudienceGrid({ audience }: { audience: AudienceGridData }) {
  return (
    <section aria-labelledby="audience-heading" className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {audience.eyebrow}
        </span>
        <h2
          id="audience-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {audience.title}
        </h2>
      </div>

      <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {audience.items.map((item) => {
          const tone = getServiceAccent(item.accent);
          return (
            <GlassSpotlight
              key={item.title}
              data-reveal-item=""
              className="flex flex-col gap-3 rounded-lg p-6"
            >
              <div className={cn('grid size-10 place-items-center rounded-sm border', tone.badge)}>
                <ServiceIcon name={item.icon} className="size-5" />
              </div>
              <h3 className="font-heading text-h5 font-semibold text-(--glass-text)">
                {item.title}
              </h3>
              <p className="text-small leading-relaxed text-(--glass-text-muted)">
                {item.description}
              </p>
            </GlassSpotlight>
          );
        })}
      </Reveal>
    </section>
  );
}
