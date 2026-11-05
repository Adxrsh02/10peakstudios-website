import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chip, Eyebrow, TwoToneText } from '@/components/ui/primitives';

type HeroProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  chips?: readonly string[];
  visual?: ReactNode;
};

const order = (n: number) => ({ '--intro-order': n }) as CSSProperties;

/**
 * Hero (PRD 8.1 row 1, Design.md 10.15). H1 (Display) and the lead paragraph are visible at first
 * paint (LCP, RUL-MOT-03); eyebrow, CTAs and chips use the CSS intro ([data-intro]).
 * Mobile: text, CTAs (stacked), chips, visual below. Desktop: text 6/12, visual 6/12.
 */
export function Hero({
  eyebrow,
  titleLead,
  titleAccent,
  lead,
  primaryCta,
  secondaryCta,
  chips,
  visual,
}: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-background">
      <div className="container-wide grid items-center gap-10 pt-6 pb-16 sm:pt-12 lg:min-h-[min(calc(100dvh-5rem),46rem)] lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="flex flex-col gap-5 sm:gap-6 lg:col-span-6 xl:col-span-6">
          <div data-intro="" style={order(0)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 id="hero-title" className="text-display text-foreground">
            <TwoToneText text={titleLead} accent={titleAccent} tone="gradient" sweep />
          </h1>
          <p className="max-w-[52ch] text-body-lg text-muted-foreground">{lead}</p>
          <div data-intro="" style={order(1)} className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={primaryCta.href} data-cta="hero-primary" data-cta-location="hero">
                {primaryCta.label}
                <ArrowRight aria-hidden="true" strokeWidth={1.75} />
              </Link>
            </Button>
            {secondaryCta && (
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href={secondaryCta.href} data-cta="hero-secondary" data-cta-location="hero">
                  {secondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
          {chips && chips.length > 0 && (
            <ul
              data-intro=""
              style={order(2)}
              className="flex flex-wrap gap-2"
              aria-label="Core capabilities"
            >
              {chips.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
          )}
        </div>
        {visual && <div className="lg:col-span-6 xl:col-span-6">{visual}</div>}
      </div>
    </section>
  );
}
