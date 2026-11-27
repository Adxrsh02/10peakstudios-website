import { ArrowRight, Check, CheckCircle2 } from 'lucide-react';
import type { ResolvedProcessContent } from '@/content/process';
import { cn } from '@/lib/cn';
import { MaskReveal } from './MaskReveal';
import { ProcessPhotoFrame } from './ProcessPhotoFrame';
import { ProcessTrackLink } from './ProcessTrackLink';

type ProcessHeroProps = {
  hero: ResolvedProcessContent['hero'];
};

export function ProcessHero({ hero }: ProcessHeroProps) {
  return (
    <section
      aria-labelledby="process-hero-heading"
      className="relative overflow-hidden bg-(--ascent-white) pt-10 pb-16 text-(--ascent-ink) sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      {/* Subtle daylight gradient glow fields */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -left-24 size-96 rounded-full bg-(--color-peak-violet)/8 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 size-[28rem] rounded-full bg-(--color-lilac-spark)/10 blur-[120px]"
      />

      <div className="relative z-10 container-content">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: LCP heading and copy stay visible immediately with zero opacity-0 lock */}
          <div className="flex flex-col items-start lg:col-span-6">
            <span className="mb-4 inline-flex items-center rounded-pill border border-(--color-peak-violet)/20 bg-(--color-peak-violet)/6 px-3.5 py-1 font-mono text-caption font-medium tracking-[0.08em] text-(--color-deep-violet) uppercase">
              [ {hero.eyebrow} ]
            </span>

            <h1
              id="process-hero-heading"
              className="m-0 font-heading text-h1 leading-[1.08] font-bold tracking-[-0.025em] text-(--ascent-ink) lg:text-display"
            >
              {hero.titleLead}
              <span className="mt-1 block text-arrow-rise">{hero.titleAccent}</span>
            </h1>

            <p className="mt-5 max-w-xl text-body-lg leading-relaxed text-(--ascent-ink-muted)">
              {hero.lead}
            </p>

            <div className="mt-8 flex w-full flex-wrap items-center gap-3.5 sm:w-auto">
              <ProcessTrackLink
                href={hero.primaryCta.href}
                event="process_cta_click"
                params={{ position: 'hero_primary', cta_text: hero.primaryCta.label }}
                className="ascent-cta-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-7 py-3 text-small font-semibold tracking-wide"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
              </ProcessTrackLink>

              <ProcessTrackLink
                href={hero.secondaryCta.href}
                event="process_cta_click"
                params={{ position: 'hero_secondary', cta_text: hero.secondaryCta.label }}
                className="inline-flex min-h-12 items-center justify-center rounded-pill border border-(--color-peak-violet)/25 bg-(--ascent-white)/80 px-7 py-3 text-small font-semibold tracking-wide text-(--ascent-ink) backdrop-blur-md transition-colors hover:border-(--color-peak-violet)/45 hover:bg-(--ascent-paper)"
              >
                {hero.secondaryCta.label}
              </ProcessTrackLink>
            </div>

            <ul className="mt-8 flex w-full flex-wrap items-center gap-x-6 gap-y-2.5 border-t border-(--ascent-ink)/8 pt-5 text-small text-(--ascent-ink-muted)">
              {hero.trustItems.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2
                    className="size-4 shrink-0 text-(--color-peak-violet)"
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: editorial frame + mountain silhouette + floating approval chips */}
          <div className="relative mt-4 lg:col-span-6 lg:mt-0">
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 -right-4 h-[112%] w-full stroke-(--color-peak-violet) opacity-20"
              fill="none"
              viewBox="0 0 500 500"
            >
              <path
                d="M40 450 L180 260 L240 320 L370 140 L480 300"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <path d="M120 450 L280 200 L340 270 L430 110" strokeWidth="2" />
              <circle cx="430" cy="110" r="5" fill="var(--color-lilac-spark)" />
            </svg>

            <div className="relative mx-auto max-w-[440px] px-2 sm:px-0">
              <div className="ascent-light-frame relative overflow-hidden rounded-[28px] p-2">
                <MaskReveal immediate>
                  <ProcessPhotoFrame
                    image={hero.image}
                    priority
                    sizes="(max-width: 1023px) 92vw, 440px"
                    className="rounded-[22px]"
                  />
                </MaskReveal>
              </div>

              {hero.chips.map((chip) => {
                const isTopLeft = chip.position === 'top-left';
                return (
                  <div
                    key={chip.label}
                    className={cn(
                      'ascent-chip-light absolute flex items-center gap-2 rounded-pill px-3.5 py-2 sm:px-4 sm:py-2.5',
                      isTopLeft
                        ? '-top-3 left-0 sm:-top-4 sm:-left-6'
                        : 'right-0 -bottom-3 sm:-right-5 sm:-bottom-4',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'flex size-6 items-center justify-center rounded-full',
                        isTopLeft
                          ? 'bg-(--color-peak-violet)/12 text-(--color-deep-violet)'
                          : 'bg-(--color-lilac-spark)/14 text-(--color-deep-violet)',
                      )}
                    >
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="text-caption font-semibold text-(--ascent-ink) sm:text-small">
                      {chip.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
