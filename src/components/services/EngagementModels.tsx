'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import type { EngagementModelsData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { ServiceCtaLink } from './ServiceCtaLink';
import { getServiceAccent } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type EngagementModelsProps = {
  slug: string;
  data: EngagementModelsData;
};

/**
 * Interactive engagement model comparison cards (`Fixed-scope project`, `MVP sprint`,
 * `Dedicated team`). Uses confirmed custom-quote fallback until exact figures are supplied.
 */
export function EngagementModels({ slug, data }: EngagementModelsProps) {
  const defaultPopular = data.models.find((m) => m.popular)?.id ?? data.models[0]?.id ?? '';
  const [selectedId, setSelectedId] = useState(defaultPopular);

  const selectModel = (id: string) => {
    setSelectedId(id);
    track('service_engagement_toggle', { service_slug: slug, model_id: id });
  };

  return (
    <section aria-labelledby="engagement-models-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="engagement-models-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="max-w-xl text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>

        {/* Interactive Focus Pill Toggle */}
        <div
          role="group"
          aria-label="Highlight an engagement model"
          className="mt-3 flex flex-wrap justify-center gap-2 rounded-full border border-white/12 bg-white/4 p-1"
        >
          {data.models.map((model) => {
            const isSelected = selectedId === model.id;
            return (
              <button
                key={model.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectModel(model.id)}
                className={cn(
                  'min-h-9 rounded-full px-4 py-1.5 font-heading text-caption font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                  isSelected
                    ? 'glass-cta-primary text-white'
                    : 'text-(--glass-text-muted) hover:bg-white/6 hover:text-(--glass-text)',
                )}
              >
                {model.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {data.models.map((model) => {
          const tone = getServiceAccent(model.accent);
          const isHighlighted = selectedId === model.id;
          return (
            <GlassSpotlight
              key={model.id}
              className={cn(
                'relative flex flex-col justify-between rounded-lg p-6 transition-all',
                isHighlighted
                  ? 'glass-card-strong border-[#c38bff]/50 shadow-[0_0_32px_-8px_rgb(142_33_252/0.55)]'
                  : '',
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      'font-mono text-caption font-medium tracking-wider uppercase',
                      tone.text,
                    )}
                  >
                    {model.eyebrow}
                  </span>
                  {model.badgeText && (
                    <span className="rounded-full border border-[#c38bff]/40 bg-[#8e21fc]/25 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-[#e1c4ff] uppercase">
                      {model.badgeText}
                    </span>
                  )}
                </div>

                <h3 className="mt-1.5 font-heading text-h4 font-semibold text-(--glass-text)">
                  {model.title}
                </h3>
                <p className="mt-1.5 text-small text-(--glass-text-muted)">{model.subtitle}</p>

                <div className="my-5 rounded-md border border-white/10 bg-white/4 p-4">
                  <div className="font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
                    Investment
                  </div>
                  <div className={cn('mt-1 font-heading text-h4 font-semibold', tone.text)}>
                    {model.price}
                  </div>
                  <div className="mt-0.5 font-mono text-[11px] text-(--glass-text-muted)">
                    {model.priceCaption}
                  </div>
                </div>

                <ul className="space-y-2.5 text-small text-(--glass-text)">
                  {model.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-(--glass-emerald)"
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <ServiceCtaLink
                  href={model.ctaHref}
                  serviceSlug={slug}
                  position={`engagement-${model.id}`}
                  className={cn(
                    'inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-2.5 font-heading text-small font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                    isHighlighted ? 'glass-cta-primary' : 'glass-cta-secondary',
                  )}
                >
                  {model.ctaLabel}
                </ServiceCtaLink>
              </div>
            </GlassSpotlight>
          );
        })}
      </div>
    </section>
  );
}
