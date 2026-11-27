import { ArrowRight, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { ResolvedProcessContent } from '@/content/process';
import { ProcessPhotoFrame } from './ProcessPhotoFrame';
import { ProcessTrackLink } from './ProcessTrackLink';
import { Starfield } from './Starfield';

type ProcessSummitCtaProps = {
  cta: ResolvedProcessContent['cta'];
  whatsappHref: string | null;
};

export function ProcessSummitCta({ cta, whatsappHref }: ProcessSummitCtaProps) {
  return (
    <section
      aria-labelledby="process-cta-heading"
      className="ascent-dark relative overflow-hidden border-t border-white/10 py-section"
    >
      <Starfield opacityClassName="opacity-55" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 -bottom-24 h-80 w-[min(38rem,90vw)] rounded-full bg-gradient-to-r from-(--color-peak-violet)/30 via-(--color-lilac-spark)/25 to-(--ascent-cyan)/20 blur-[130px]"
      />

      <Reveal className="relative z-10 container-content">
        <div className="ascent-dark-glass rounded-[28px] p-6 sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="flex flex-col items-start lg:col-span-7">
              <span className="mb-2 block font-mono text-caption font-medium tracking-[0.08em] text-(--color-inverse-link) uppercase">
                [ {cta.eyebrow} ]
              </span>

              <h2
                id="process-cta-heading"
                className="m-0 mb-4 font-heading text-h2 font-bold tracking-tight text-(--ascent-dark-text)"
              >
                {cta.titleLead}{' '}
                <span className="bg-gradient-to-r from-(--color-inverse-link) to-(--ascent-cyan) bg-clip-text text-transparent">
                  {cta.titleAccent}
                </span>
              </h2>

              <p className="mb-8 max-w-lg text-body-lg leading-relaxed text-(--ascent-dark-muted)">
                {cta.lead}
              </p>

              <div className="flex w-full flex-wrap items-center gap-3.5 sm:w-auto">
                <ProcessTrackLink
                  href={cta.primaryCta.href}
                  event="process_cta_click"
                  params={{ position: 'final_cta', cta_text: cta.primaryCta.label }}
                  className="ascent-cta-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-7 py-3.5 text-small font-semibold tracking-wide"
                >
                  <span>{cta.primaryCta.label}</span>
                  <ArrowRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
                </ProcessTrackLink>

                {whatsappHref && (
                  <ProcessTrackLink
                    href={whatsappHref}
                    external
                    event="whatsapp_click"
                    params={{ location: 'process_summit' }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-pill border border-white/25 bg-white/6 px-7 py-3.5 text-small font-semibold text-(--ascent-dark-text) backdrop-blur-md transition-colors hover:border-white/45 hover:bg-white/12"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" strokeWidth={1.75} />
                    <span>{cta.whatsappLabel}</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </ProcessTrackLink>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[24px] border border-white/20 shadow-[0_0_40px_rgb(91_16_224/0.35)]">
                <ProcessPhotoFrame dark image={cta.image} sizes="(max-width: 1023px) 92vw, 440px" />
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-black/78 px-4 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span aria-hidden="true" className="size-2.5 rounded-full bg-(--ascent-cyan)" />
                    <span className="text-caption font-medium text-(--ascent-dark-text)">
                      {cta.chipTitle}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-medium tracking-wider text-(--color-inverse-link)">
                    {cta.chipTag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
