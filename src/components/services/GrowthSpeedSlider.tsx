'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import type { GrowthSpeedSliderData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { ServiceCtaLink } from './ServiceCtaLink';
import { getServiceAccent } from './ServiceIcon';
import { GlassSpotlight } from './motion/GlassSpotlight';

type GrowthSpeedSliderProps = {
  slug: string;
  data: GrowthSpeedSliderData;
};

/**
 * Interactive 3-stop growth plan selector with a styled keyboard-accessible `<input type="range">`
 * (`aria-valuetext`), synced 3-card comparison grid, and `"Custom quote"` fallback until priced.
 */
export function GrowthSpeedSlider({ slug, data }: GrowthSpeedSliderProps) {
  const defaultIdx = Math.max(
    0,
    data.plans.findIndex((p) => p.popular),
  );
  const [selectedIdx, setSelectedIdx] = useState(defaultIdx);

  const selectedPlan = data.plans[selectedIdx] ?? data.plans[0];

  const selectIndex = (nextIdx: number) => {
    const clamped = Math.max(0, Math.min(data.plans.length - 1, nextIdx));
    setSelectedIdx(clamped);
    const plan = data.plans[clamped];
    if (plan) {
      track('growth_plan_change', { service_slug: slug, plan_id: plan.id });
    }
  };

  const valueText = selectedPlan
    ? `${selectedPlan.title}${selectedPlan.badgeText ? `, ${selectedPlan.badgeText.toLowerCase()}` : ''}`
    : '';

  return (
    <section
      id="packages-section"
      aria-labelledby="growth-speed-heading"
      className="scroll-mt-24 space-y-8"
    >
      <div className="flex max-w-2xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="growth-speed-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      {/* Interactive 3-Stop Styled Range Control */}
      <div className="glass-card mx-auto max-w-xl rounded-lg p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <label
            htmlFor="growth-speed-range"
            className="font-mono text-caption text-(--glass-text)"
          >
            {data.sliderLabel}
          </label>
          {selectedPlan && (
            <span className="rounded-full bg-[#8e21fc]/25 px-3 py-0.5 font-mono text-[11px] text-[#e1c4ff]">
              {selectedPlan.title}
            </span>
          )}
        </div>

        <input
          id="growth-speed-range"
          type="range"
          min={0}
          max={Math.max(0, data.plans.length - 1)}
          step={1}
          value={selectedIdx}
          aria-valuetext={valueText}
          onChange={(e) => selectIndex(Number(e.target.value))}
          className="h-3 w-full cursor-pointer accent-[#a743f8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--glass-cyan)"
        />

        <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[11px]">
          {data.plans.map((plan, idx) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => selectIndex(idx)}
              className={cn(
                'min-h-8 rounded px-2 py-1 text-center transition-colors',
                idx === 0 && 'text-left',
                idx === data.plans.length - 1 && 'text-right',
                selectedIdx === idx
                  ? 'font-semibold text-[#e1c4ff]'
                  : 'text-(--glass-text-meta) hover:text-(--glass-text)',
              )}
            >
              {plan.title}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Plan Cards */}
      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {data.plans.map((plan, idx) => {
          const tone = getServiceAccent(plan.accent);
          const isSelected = selectedIdx === idx;
          return (
            <GlassSpotlight
              key={plan.id}
              className={cn(
                'relative flex flex-col justify-between rounded-lg p-6 transition-all sm:p-7',
                isSelected
                  ? 'glass-card-strong border-[#c38bff]/60 shadow-[0_0_32px_-8px_rgb(142_33_252/0.55)]'
                  : '',
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn('font-mono text-caption uppercase', tone.text)}>
                    {plan.tierLabel}
                  </span>
                  {plan.badgeText && (
                    <span className="rounded-full border border-[#c38bff]/40 bg-[#8e21fc]/25 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-[#e1c4ff] uppercase">
                      {plan.badgeText}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="m-0 font-heading text-h4 font-semibold text-(--glass-text)">
                    {plan.title}
                  </h3>
                  <p className="mt-1.5 text-small leading-relaxed text-(--glass-text-muted)">
                    {plan.subtitle}
                  </p>
                </div>

                <div className="border-t border-white/12 pt-3">
                  <div className={cn('font-heading text-h3 font-semibold', tone.text)}>
                    {plan.price}
                  </div>
                  <span className="font-mono text-[11px] text-(--glass-text-meta)">
                    {plan.billingCaption}
                  </span>
                </div>

                <ul className="space-y-2.5 pt-2 text-small text-(--glass-text)">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        className={cn('mt-0.5 size-4 shrink-0', tone.text)}
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-2">
                <ServiceCtaLink
                  href={`${plan.ctaHref}&plan=${plan.id}`}
                  serviceSlug={slug}
                  position={`plan-${plan.id}`}
                  className={cn(
                    'inline-flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 font-heading text-small font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                    isSelected ? 'glass-cta-primary' : 'glass-cta-secondary',
                  )}
                >
                  {plan.ctaLabel}
                </ServiceCtaLink>
              </div>
            </GlassSpotlight>
          );
        })}
      </div>

      <p className="text-center font-mono text-caption text-(--glass-text-meta)">{data.footnote}</p>
    </section>
  );
}
