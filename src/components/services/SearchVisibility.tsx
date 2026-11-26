import { Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { ServicePageContent } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

export function SearchVisibility({
  searchVisibility,
}: {
  searchVisibility: ServicePageContent['searchVisibility'];
}) {
  return (
    <section aria-labelledby="search-visibility-heading" className="space-y-8">
      <div className="flex max-w-3xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {searchVisibility.eyebrow}
        </span>
        <h2
          id="search-visibility-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {searchVisibility.titleLead}{' '}
          <span className="glass-gradient-text">{searchVisibility.titleAccent}</span>
        </h2>
        <p className="mt-1 text-body-lg leading-relaxed text-(--glass-text-muted)">
          {searchVisibility.lead}
        </p>
      </div>

      <Reveal className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {searchVisibility.cards.map((card) => {
          const tone = getServiceAccent(card.accent);
          return (
            <GlassSpotlight
              key={card.code}
              data-reveal-item=""
              className="flex flex-col justify-between rounded-lg p-6"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className={cn('font-mono text-h4 font-bold', tone.text)}>{card.code}</span>
                  <ServiceIcon name={card.icon} className={cn('size-5', tone.text)} />
                </div>
                <h3 className="mb-2 font-heading text-h5 font-semibold text-(--glass-text)">
                  {card.title}
                </h3>
                <p className="text-small leading-relaxed text-(--glass-text-muted)">
                  {card.description}
                </p>
              </div>
              <div className="mt-5 border-t border-white/10 pt-3.5">
                <span className="font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
                  {card.footerLabel}
                </span>
              </div>
            </GlassSpotlight>
          );
        })}
      </Reveal>

      {/* Coded Glass UI Card: Illustrative Search Result & AI Citation Preview */}
      <div
        aria-hidden="true"
        className="glass-card glass-specular grid grid-cols-1 items-center gap-6 rounded-lg p-6 md:grid-cols-2 md:p-8"
      >
        <div className="space-y-3 rounded-md border border-white/12 bg-black/45 p-5">
          <div className="flex items-center gap-2">
            <span className="size-3.5 rounded-full bg-white/25" />
            <span className="font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
              {searchVisibility.preview.searchHeading}
            </span>
          </div>
          <div className="h-3 w-48 rounded bg-(--glass-cyan)/65" />
          <div className="space-y-1.5">
            <div className="h-2 w-full rounded bg-white/14" />
            <div className="h-2 w-5/6 rounded bg-white/10" />
          </div>
          <div className="flex items-center justify-between rounded-md border border-[#c38bff]/40 bg-(--color-peak-violet)/20 p-3 shadow-[0_0_24px_rgb(142_33_252/0.25)]">
            <div className="w-3/4 space-y-1.5">
              <div className="h-2.5 w-36 rounded bg-[#c38bff]" />
              <div className="h-2 w-44 rounded bg-white/30" />
            </div>
            <Sparkles className="size-5 text-[#e1c4ff]" strokeWidth={1.6} />
          </div>
        </div>

        <div className="space-y-3 rounded-md border border-[#c38bff]/30 bg-black/45 p-5 shadow-[0_0_28px_rgb(167_67_248/0.14)]">
          <div className="flex items-center gap-2">
            <ServiceIcon name="brain" className="size-4.5 text-[#c38bff]" />
            <span className="font-mono text-caption font-semibold text-[#c38bff]">
              {searchVisibility.preview.aiHeading}
            </span>
          </div>
          <div className="space-y-2 py-1">
            <div className="h-2 w-full rounded bg-white/18" />
            <div className="h-2 w-11/12 rounded bg-white/15" />
            <div className="mt-2 inline-flex items-center gap-2 rounded-pill border border-[#c38bff]/45 bg-(--color-peak-violet)/25 px-3 py-1 font-mono text-[11px] text-(--glass-text)">
              <span className="size-1.5 rounded-full bg-(--glass-cyan)" />
              <span>{searchVisibility.preview.aiBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
