import { ArrowRight, Building2, Video } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { ResolvedProcessContent } from '@/content/process';
import { cn } from '@/lib/cn';
import { ProcessPhotoFrame } from './ProcessPhotoFrame';

type MeetingOptionsProps = {
  meeting: ResolvedProcessContent['meeting'];
};

export function MeetingOptions({ meeting }: MeetingOptionsProps) {
  return (
    <section
      aria-labelledby="process-meeting-heading"
      className="border-t border-(--ascent-glass-border) bg-(--ascent-paper) py-section text-(--ascent-ink)"
    >
      <Reveal className="container-content">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-14">
          <span className="mb-2 block font-mono text-caption font-medium tracking-[0.08em] text-(--color-deep-violet) uppercase">
            [ {meeting.eyebrow} ]
          </span>
          <h2
            id="process-meeting-heading"
            className="m-0 font-heading text-h2 font-bold tracking-tight text-(--ascent-ink)"
          >
            {meeting.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {meeting.options.map((option) => {
            const Icon = option.icon === 'building-2' ? Building2 : Video;
            const isOnline = option.id === 'online';

            return (
              <article
                key={option.id}
                data-reveal-item=""
                className="ascent-light-glass group flex flex-col justify-between rounded-[24px] p-6 transition-shadow duration-300 hover:shadow-(--ascent-purple-shadow)"
              >
                <div>
                  <div className="relative mb-5 overflow-hidden rounded-2xl">
                    <ProcessPhotoFrame
                      image={option.image}
                      sizes="(max-width: 767px) 92vw, 560px"
                      imageClassName="transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={cn(
                        'ascent-chip-light absolute top-3 left-3 rounded-pill px-3 py-1 text-caption font-semibold',
                        isOnline ? 'text-(--color-deep-violet)' : 'text-(--color-peak-violet)',
                      )}
                    >
                      {option.badge}
                    </span>
                  </div>

                  <div className="mb-2 flex items-center gap-2.5">
                    <Icon
                      aria-hidden="true"
                      className={cn(
                        'size-5 shrink-0',
                        isOnline ? 'text-(--color-lilac-spark)' : 'text-(--color-peak-violet)',
                      )}
                      strokeWidth={1.75}
                    />
                    <h3 className="m-0 font-heading text-h4 font-semibold text-(--ascent-ink)">
                      {option.title}
                    </h3>
                  </div>

                  <p className="text-body leading-relaxed text-(--ascent-ink-muted)">
                    {option.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-(--ascent-glass-border) pt-4">
                  <span className="font-mono text-caption font-medium text-(--color-deep-violet)">
                    {option.footerLabel}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 text-(--color-deep-violet) transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-10 text-center font-heading text-h5 font-medium text-(--ascent-ink-muted)">
          {meeting.closingNote}
        </p>
      </Reveal>
    </section>
  );
}
