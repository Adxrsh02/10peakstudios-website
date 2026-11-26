'use client';

import {
  Boxes,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Rocket,
  ShoppingBag,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { PORTFOLIO_COPY } from '@/content/portfolio-config';
import { cn } from '@/lib/cn';
import type { IndustryValue } from '@/lib/portfolio/schema';
import type { IndustryFilterCount } from './PortfolioFilterBar';

const INDUSTRY_ICONS: Record<IndustryValue, LucideIcon> = {
  Healthcare: HeartPulse,
  'Real Estate': Building2,
  'E-commerce & Retail': ShoppingBag,
  'Finance & Fintech': Landmark,
  'Education & EdTech': GraduationCap,
  'Hospitality & Restaurants': UtensilsCrossed,
  'SaaS & Startups': Rocket,
  'Manufacturing & Logistics': Boxes,
};

type IndustryGridBandProps = {
  industries: Array<IndustryFilterCount & { description: string }>;
  activeIndustry: IndustryValue | 'all';
  onSelectIndustry: (industry: IndustryValue) => void;
};

/**
 * Interactive 8-industry grid. Clicking an active industry applies that filter and scrolls to catalog.
 */
export function IndustryGridBand({
  industries,
  activeIndustry,
  onSelectIndustry,
}: IndustryGridBandProps) {
  return (
    <Section surface="white" aria-labelledby="industries-heading">
      <Reveal className="flex flex-col gap-12">
        <SectionHeading
          id="industries-heading"
          eyebrow={PORTFOLIO_COPY.industriesSection.eyebrow}
          title={
            <TwoToneText
              text={PORTFOLIO_COPY.industriesSection.titleLead}
              accent={PORTFOLIO_COPY.industriesSection.titleAccent}
            />
          }
          lead={PORTFOLIO_COPY.industriesSection.lead}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {industries.map((ind) => {
            const Icon = INDUSTRY_ICONS[ind.id];
            const isDisabled = ind.count === 0;
            const isActive = activeIndustry === ind.id;

            return (
              <button
                key={ind.id}
                type="button"
                disabled={isDisabled}
                aria-pressed={isActive}
                onClick={() => onSelectIndustry(ind.id)}
                data-reveal-item=""
                className={cn(
                  'group flex min-h-36 flex-col items-start gap-4 rounded-md border p-6 text-left transition-[box-shadow,border-color,transform] duration-(--duration-base)',
                  isActive
                    ? 'border-primary bg-surface-sunken shadow-sm'
                    : 'border-border bg-card [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-primary/40 [@media(hover:hover)]:hover:shadow-md',
                  isDisabled && 'opacity-60',
                )}
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span
                    aria-hidden="true"
                    className="grid size-11 place-items-center rounded-sm border border-border bg-surface-sunken text-brand-accent"
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span
                    className={cn(
                      'price rounded-pill border px-2.5 py-0.5 text-caption font-medium',
                      ind.count > 0
                        ? 'border-primary/30 bg-surface-sunken text-primary'
                        : 'border-border bg-surface-sunken text-muted-foreground',
                    )}
                  >
                    {ind.count > 0
                      ? `${ind.count} ${ind.count === 1 ? 'project' : 'projects'}`
                      : 'Coming soon'}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-h5 text-foreground">{ind.label}</h3>
                  <p className="text-small text-muted-foreground">{ind.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
