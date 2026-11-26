import { Layers, Briefcase, Cpu } from 'lucide-react';
import { Eyebrow, TwoToneText } from '@/components/ui/primitives';
import { PORTFOLIO_COPY } from '@/content/portfolio-config';
import { PortfolioParallaxLayer } from './PortfolioParallaxLayer';

type PortfolioHeroProps = {
  stats: {
    projectCount: number;
    industryCount: number;
    technologyCount: number;
  };
};

/**
 * Obsidian Portfolio Hero (Design.md 6.5).
 * H1 is rendered immediately at opacity: 1 in server HTML so LCP is never blocked (RUL-MOT-03).
 */
export function PortfolioHero({ stats }: PortfolioHeroProps) {
  const counters = [
    {
      icon: Briefcase,
      value: stats.projectCount,
      label: stats.projectCount === 1 ? 'Case Study' : 'Case Studies',
    },
    {
      icon: Layers,
      value: stats.industryCount,
      label: stats.industryCount === 1 ? 'Active Industry' : 'Active Industries',
    },
    {
      icon: Cpu,
      value: stats.technologyCount,
      label: 'Technologies Shipped',
    },
  ];

  return (
    <section
      aria-labelledby="portfolio-hero-heading"
      className="surface-inverse relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28"
    >
      <PortfolioParallaxLayer />

      {/* Direct skip link to filter bar for keyboard efficiency */}
      <a
        href="#portfolio-filters"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-(--z-toast) focus:rounded-pill focus:bg-primary focus:px-4 focus:py-2 focus:text-small focus:font-semibold focus:text-primary-foreground"
      >
        Skip to portfolio filters
      </a>

      <div className="relative container-content flex flex-col gap-8">
        <div className="flex max-w-4xl flex-col gap-5">
          <Eyebrow>{PORTFOLIO_COPY.hero.eyebrow}</Eyebrow>
          <h1 id="portfolio-hero-heading" className="text-display text-foreground">
            <TwoToneText
              text={PORTFOLIO_COPY.hero.titleLead}
              accent={PORTFOLIO_COPY.hero.titleAccent}
            />
          </h1>
          <p className="max-w-[58ch] text-body-lg text-muted-foreground">
            {PORTFOLIO_COPY.hero.lead}
          </p>
        </div>

        {/* Verified counts computed strictly from published case study files */}
        <ul className="grid grid-cols-1 gap-3 pt-2 sm:flex sm:flex-wrap sm:gap-4">
          {counters.map(({ icon: Icon, value, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-md border border-border bg-card/80 px-4 py-3"
            >
              <span
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-sm border border-border bg-obsidian text-brand-accent"
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <div className="flex items-baseline gap-2">
                <span className="price font-heading text-h4 font-semibold text-foreground">
                  {value}
                </span>
                <span className="text-small text-muted-foreground">{label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
