import Image from 'next/image';
import { ArrowRight, CheckCircle2, Eye } from 'lucide-react';
import type { ServicePageContent } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { HeroConsoleFloat } from './HeroConsoleFloat';
import { ServiceCtaLink } from './ServiceCtaLink';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { AnimatedProgressBar } from './motion/CountUp';

type ServiceHeroProps = {
  slug: string;
  hero: ServicePageContent['hero'];
};

export function ServiceHero({ slug, hero }: ServiceHeroProps) {
  const { pipelineCard } = hero;

  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative pt-10 pb-6 sm:pt-14 lg:pt-18 lg:pb-10"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-5 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/6 px-3.5 py-1.5 backdrop-blur-md">
            <ServiceIcon name={hero.icon} className="size-4 text-(--glass-cyan)" />
            <span className="font-mono text-caption font-medium tracking-[0.08em] text-[#c38bff] uppercase">
              {hero.eyebrow}
            </span>
          </div>

          <h1
            id="service-hero-heading"
            className="m-0 font-heading text-[2.25rem] leading-[1.08] font-bold tracking-[-0.03em] text-(--glass-text) sm:text-[3rem] lg:text-[3.75rem] xl:text-[4.125rem]"
          >
            <span className="block">{hero.titleLead}</span>
            <span className="glass-gradient-text mt-1 block">{hero.titleAccent}</span>
          </h1>

          <p className="max-w-2xl text-body-lg leading-relaxed text-(--glass-text-muted)">
            {hero.summary}
          </p>

          <div className="flex w-full flex-wrap items-center gap-3.5 pt-1 sm:w-auto">
            <ServiceCtaLink
              href={`/contact?service=${encodeURIComponent(slug)}`}
              serviceSlug={slug}
              position="hero"
              className="glass-cta-primary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-7 py-3 text-small font-semibold tracking-wide"
            >
              <span>{hero.primaryCtaLabel}</span>
              <ArrowRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
            </ServiceCtaLink>

            <ServiceCtaLink
              href={hero.secondaryCtaHref}
              serviceSlug={slug}
              position="hero_secondary"
              className="glass-cta-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 text-small font-semibold tracking-wide backdrop-blur-md"
            >
              <Eye className="size-4 text-(--glass-cyan)" aria-hidden="true" strokeWidth={1.75} />
              <span>{hero.secondaryCtaLabel}</span>
            </ServiceCtaLink>
          </div>

          {/* 3 Mini-Stats Pills */}
          <div className="grid w-full max-w-xl grid-cols-1 gap-3 pt-3 sm:grid-cols-3">
            {hero.miniStats.map((stat) => {
              const tone = getServiceAccent(stat.accent);
              return (
                <div
                  key={stat.label}
                  className="glass-card flex flex-col justify-center rounded-md px-4 py-3.5"
                >
                  <div className="flex items-baseline gap-1 font-heading text-h5 font-bold text-(--glass-text)">
                    <span className={stat.accent === 'lilac' ? tone.text : undefined}>
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className={cn('text-small font-semibold', tone.text)}>
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 text-caption text-(--glass-text-muted)">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Floating Build Workflow Console */}
        <div className="relative flex items-center justify-center lg:col-span-5 lg:justify-end">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -right-6 size-64 rounded-full bg-[rgb(167_67_248/0.25)] blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-6 size-56 rounded-full bg-[rgb(76_215_246/0.18)] blur-[80px]"
          />

          <HeroConsoleFloat>
            <div className="glass-card-strong glass-specular flex flex-col gap-4 rounded-lg p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/12 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full bg-(--glass-cyan) shadow-[0_0_8px_#4cd7f6]"
                  />
                  <span className="font-heading text-small font-semibold text-(--glass-text)">
                    {pipelineCard.title}
                  </span>
                </div>
                <span className="rounded-sm bg-(--glass-cyan-soft) px-2 py-0.5 font-mono text-[11px] font-medium tracking-wider text-(--glass-cyan)">
                  {pipelineCard.badge}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {pipelineCard.stages.map((stage) => {
                  const tone = getServiceAccent(stage.accent);
                  return (
                    <div
                      key={stage.title}
                      className="flex flex-col gap-2 rounded-md border border-white/10 bg-white/4 p-3.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading text-small font-semibold text-(--glass-text)">
                            {stage.title}
                          </span>
                          {stage.verified && (
                            <CheckCircle2
                              className="size-4 text-(--glass-cyan)"
                              aria-hidden="true"
                              strokeWidth={1.75}
                            />
                          )}
                        </div>
                        <span className={cn('font-mono text-caption font-semibold', tone.text)}>
                          {stage.statusText}
                        </span>
                      </div>
                      <p className="text-caption text-(--glass-text-muted)">{stage.subtitle}</p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <AnimatedProgressBar
                          progress={stage.progress}
                          className={cn('h-full w-full rounded-full bg-gradient-to-r', tone.bar)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 border-t border-white/12 pt-3">
                <div className="flex items-center justify-between text-caption">
                  <span className="font-medium tracking-wider text-(--glass-text-muted) uppercase">
                    {pipelineCard.footerLabel}
                  </span>
                  <span className="font-mono font-semibold text-[#c38bff]">
                    {pipelineCard.footerBadge}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <AnimatedProgressBar
                    progress={pipelineCard.footerProgress}
                    className="h-full w-full rounded-full bg-gradient-to-r from-[#480bb4] via-[#a743f8] to-[#4cd7f6]"
                  />
                </div>
              </div>

              {hero.heroPreviewImage ? (
                <div className="overflow-hidden rounded-md border border-white/12 bg-black/40">
                  <Image
                    src={hero.heroPreviewImage}
                    alt={hero.heroPreviewAlt ?? pipelineCard.title}
                    width={640}
                    height={360}
                    priority
                    sizes="(max-width: 1023px) 92vw, 420px"
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : (
                <div
                  aria-hidden="true"
                  className="flex flex-col gap-2 rounded-md border border-white/12 bg-black/40 p-3"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-rose-400/75" />
                    <span className="size-2 rounded-full bg-purple-400/70" />
                    <span className="size-2 rounded-full bg-cyan-400/75" />
                    <span className="ml-2 font-mono text-[11px] text-(--glass-text-meta)">
                      {pipelineCard.previewUrl}
                    </span>
                  </div>
                  <div className="space-y-1.5 py-1">
                    <div className="h-2 w-3/4 rounded bg-(--color-peak-violet)/35" />
                    <div className="h-1.5 w-full rounded bg-white/12" />
                    <div className="h-1.5 w-5/6 rounded bg-white/8" />
                  </div>
                </div>
              )}
            </div>
          </HeroConsoleFloat>
        </div>
      </div>
    </section>
  );
}
