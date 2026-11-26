import { Check } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import type { ServicePageContent } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { ServiceCtaLink } from './ServiceCtaLink';
import { GlassSpotlight } from './motion/GlassSpotlight';

type PackagesProps = {
  slug: string;
  packages: ServicePageContent['packages'];
};

export function Packages({ slug, packages }: PackagesProps) {
  return (
    <section aria-label={packages.title} className="space-y-8">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {packages.eyebrow}
        </span>
        <SplitHeading className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)">
          {packages.title}
        </SplitHeading>
      </div>

      <Reveal className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
        {packages.tiers.map((tier) => {
          const allFeatures = [
            ...(tier.scopeNote ? [tier.scopeNote] : [tier.resolvedScopeFirstItem]),
            ...tier.features,
          ];

          return (
            <GlassSpotlight
              key={tier.id}
              data-reveal-item=""
              className={cn(
                'flex flex-col justify-between rounded-lg p-6 sm:p-8',
                tier.featured
                  ? 'glass-card-strong border-2 border-[#a743f8]/65 lg:-translate-y-2'
                  : 'glass-card',
              )}
            >
              {tier.featured && tier.badgeText && (
                <div className="glass-cta-primary absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-pill px-4 py-1 font-mono text-[11px] font-bold tracking-wider uppercase shadow-md">
                  {tier.badgeText}
                </div>
              )}

              <div className={cn('space-y-5', tier.featured && 'pt-2')}>
                <div>
                  <h3 className="font-heading text-h4 font-bold text-(--glass-text)">
                    {tier.name}
                  </h3>
                  <p className="mt-1 text-small text-(--glass-text-muted)">{tier.subtitle}</p>
                </div>

                <div className="price font-heading text-h3 font-bold text-(--glass-text)">
                  {tier.price}
                </div>

                <ul className="space-y-2.5 border-t border-white/12 pt-4">
                  {allFeatures.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-small text-(--glass-text)"
                    >
                      <Check
                        className={cn(
                          'mt-0.5 size-4.5 shrink-0',
                          tier.featured
                            ? 'text-[#e1c4ff]'
                            : tier.id === 'custom'
                              ? 'text-(--glass-cyan)'
                              : 'text-[#c38bff]',
                        )}
                        aria-hidden="true"
                        strokeWidth={2}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-7">
                <ServiceCtaLink
                  href={tier.ctaHref}
                  serviceSlug={slug}
                  position={`package_${tier.id}`}
                  className={cn(
                    'inline-flex min-h-12 w-full items-center justify-center rounded-pill px-5 py-3 text-small font-semibold',
                    tier.featured ? 'glass-cta-primary' : 'glass-cta-secondary',
                  )}
                >
                  {tier.ctaLabel}
                </ServiceCtaLink>
              </div>
            </GlassSpotlight>
          );
        })}
      </Reveal>

      <p className="pt-1 text-center text-small text-(--glass-text-muted)">{packages.footnote}</p>
    </section>
  );
}
