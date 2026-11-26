import { Zap } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { FeatureBentoData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

export function FeatureBento({ features }: { features: FeatureBentoData }) {
  const { spotlightTile, gaugeTile, smallTiles } = features;

  return (
    <section aria-labelledby="features-heading" className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {features.eyebrow}
        </span>
        <h2
          id="features-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {features.titleLead} <span className="glass-gradient-text">{features.titleAccent}</span>{' '}
          {features.titleEnd}
        </h2>
      </div>

      <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Large Bento Tile 1: Custom design wireframe visual */}
        <GlassSpotlight
          data-reveal-item=""
          className="flex flex-col justify-between overflow-hidden rounded-lg p-6 sm:p-8 lg:col-span-2"
        >
          <div className="flex max-w-xl flex-col gap-2">
            <span className="font-mono text-caption tracking-wider text-[#c38bff] uppercase">
              {spotlightTile.eyebrow}
            </span>
            <h3 className="font-heading text-h3 font-semibold text-(--glass-text)">
              {spotlightTile.title}
            </h3>
            <p className="text-body leading-relaxed text-(--glass-text-muted)">
              {spotlightTile.description}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-6 rounded-md border border-white/12 bg-white/4 p-4 sm:p-5"
          >
            <div className="grid grid-cols-12 items-center gap-3">
              <div className="col-span-4 space-y-2.5">
                <div className="h-4 w-3/4 rounded bg-(--color-peak-violet)/55" />
                <div className="h-2 w-full rounded bg-white/16" />
                <div className="h-2 w-2/3 rounded bg-white/10" />
                <div className="mt-3 h-6 w-2/3 rounded-pill bg-gradient-to-r from-[#480bb4] to-[#a743f8] opacity-80" />
              </div>
              <div className="col-span-8 flex gap-2.5 rounded-md border border-white/10 bg-black/30 p-3">
                <div className="flex h-24 w-1/2 flex-col justify-end rounded-sm border border-[#c38bff]/25 bg-white/4 p-2.5">
                  <div className="h-1.5 w-3/4 rounded bg-[#c38bff]/55" />
                </div>
                <div className="flex h-24 w-1/2 flex-col justify-end rounded-sm border border-[#4cd7f6]/25 bg-white/4 p-2.5">
                  <div className="h-1.5 w-1/2 rounded bg-[#4cd7f6]/55" />
                </div>
              </div>
            </div>
          </div>
        </GlassSpotlight>

        {/* Large Bento Tile 2: Core Web Vitals Ring */}
        <GlassSpotlight
          data-reveal-item=""
          className="flex flex-col justify-between rounded-lg p-6 sm:p-8"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-caption tracking-wider text-(--glass-cyan) uppercase">
              {gaugeTile.eyebrow}
            </span>
            <h3 className="font-heading text-h4 font-semibold text-(--glass-text)">
              {gaugeTile.title}
            </h3>
            <p className="text-body leading-relaxed text-(--glass-text-muted)">
              {gaugeTile.description}
            </p>
          </div>

          <div className="my-5 flex flex-col items-center justify-center">
            <div className="relative flex size-36 items-center justify-center">
              <svg className="size-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="rgb(255 255 255 / 0.1)"
                  strokeWidth="7"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="url(#serviceVitalsRing)"
                  strokeDasharray="264"
                  strokeDashoffset="32"
                  strokeLinecap="round"
                  strokeWidth="7"
                />
                <defs>
                  <linearGradient id="serviceVitalsRing" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#4cd7f6" />
                    <stop offset="50%" stopColor="#c38bff" />
                    <stop offset="100%" stopColor="#8e21fc" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <Zap
                  className="mb-0.5 size-6 text-(--glass-cyan)"
                  aria-hidden="true"
                  strokeWidth={1.75}
                />
                <span className="font-mono text-caption font-bold tracking-wider text-(--glass-text)">
                  {gaugeTile.centerLabel}
                </span>
              </div>
            </div>
            <span className="mt-2 font-mono text-caption text-(--glass-text-muted)">
              {gaugeTile.caption}
            </span>
          </div>
        </GlassSpotlight>

        {/* 6 Small Bento Tiles */}
        {smallTiles.map((tile) => {
          const tone = getServiceAccent(tile.accent);
          return (
            <GlassSpotlight
              key={tile.title}
              data-reveal-item=""
              className="flex items-start gap-4 rounded-lg p-6"
            >
              <div className={cn('mt-0.5 shrink-0 rounded-sm border p-2.5', tone.badge)}>
                <ServiceIcon name={tile.icon} className="size-5" />
              </div>
              <div>
                <h3 className="font-heading text-h5 font-semibold text-(--glass-text)">
                  {tile.title}
                </h3>
                <p className="mt-1.5 text-small leading-relaxed text-(--glass-text-muted)">
                  {tile.description}
                </p>
              </div>
            </GlassSpotlight>
          );
        })}
      </Reveal>
    </section>
  );
}
