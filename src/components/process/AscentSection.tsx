import dynamic from 'next/dynamic';
import type { ResolvedProcessContent } from '@/content/process';

/* Dynamic bundle splitting WITH SSR enabled (`ssr: false` omitted intentionally) so the semantic
   `<ol>` of all six camps renders directly in initial static HTML for SEO and no-JS readability. */
const AscentExperience = dynamic(() =>
  import('./AscentExperience').then((m) => m.AscentExperience),
);

type AscentSectionProps = {
  ascent: ResolvedProcessContent['ascent'];
};

export function AscentSection({ ascent }: AscentSectionProps) {
  const { summitBanner } = ascent;

  return (
    <section
      id="the-ascent"
      data-ascent-section=""
      aria-labelledby="process-ascent-heading"
      className="ascent-stage-sky relative overflow-hidden py-section"
    >
      {/* Smooth dusk-to-night scrim starting cleanly below the light heading zone */}
      <div
        aria-hidden="true"
        className="ascent-stage-night-layer pointer-events-none absolute inset-x-0 top-36 bottom-0"
      />

      <AscentExperience ascent={ascent} />

      {/* Post-launch continuity banner */}
      <div className="relative z-10 container-content mt-10">
        <div className="ascent-dark-glass flex flex-col items-center justify-between gap-4 rounded-2xl p-6 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-(--color-peak-violet) font-heading text-h5 font-bold text-white shadow-[0_0_24px_var(--color-glow-violet)]">
              {summitBanner.mark}
            </div>
            <div>
              <p className="font-heading text-body-lg font-semibold text-(--ascent-dark-text)">
                {summitBanner.title}
              </p>
              <p className="text-small text-(--ascent-dark-muted)">{summitBanner.subtitle}</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-pill border border-(--ascent-cyan)/35 bg-(--ascent-cyan-soft) px-4 py-2 font-mono text-caption font-medium text-(--ascent-cyan)">
            <span aria-hidden="true" className="size-2 rounded-full bg-(--ascent-cyan)" />
            <span>{summitBanner.statusLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
