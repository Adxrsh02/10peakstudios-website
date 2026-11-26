import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SplitHeading } from '@/components/motion/SplitHeading';
import type { WorkTeaserData } from '@/content/services/types';
import { ServiceCtaLink } from './ServiceCtaLink';
import { GlassSpotlight } from './motion/GlassSpotlight';

type WorkTeaserProps = {
  slug: string;
  workTeaser: WorkTeaserData;
};

export function WorkTeaser({ slug, workTeaser }: WorkTeaserProps) {
  return (
    <section id="work" aria-label={workTeaser.title} className="space-y-6">
      <div className="flex flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {workTeaser.eyebrow}
        </span>
        <SplitHeading className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)">
          {workTeaser.title}
        </SplitHeading>
      </div>

      <GlassSpotlight className="flex flex-col items-start justify-between gap-6 overflow-hidden rounded-lg p-6 sm:p-8 md:flex-row md:items-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-16 size-72 rounded-full bg-(--color-peak-violet)/20 blur-[90px]"
        />

        <div className="relative z-10 max-w-xl space-y-2">
          <span className="font-mono text-caption tracking-wider text-(--glass-cyan) uppercase">
            {workTeaser.cardEyebrow}
          </span>
          <h3 className="font-heading text-h3 font-bold text-(--glass-text)">
            {workTeaser.cardTitle}
          </h3>
          <p className="text-body leading-relaxed text-(--glass-text-muted)">
            {workTeaser.cardDescription}
          </p>
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-5">
          {workTeaser.workImage && (
            <div className="hidden w-40 overflow-hidden rounded-md border border-white/15 bg-black/40 lg:block">
              <Image
                src={workTeaser.workImage}
                alt={workTeaser.workImageAlt ?? workTeaser.cardTitle}
                width={320}
                height={180}
                sizes="160px"
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <ServiceCtaLink
            href={workTeaser.ctaHref}
            serviceSlug={slug}
            position="work_teaser"
            className="glass-cta-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 text-small font-semibold backdrop-blur-md"
          >
            <span>{workTeaser.ctaLabel}</span>
            <ArrowRight className="size-4 text-[#c38bff]" aria-hidden="true" strokeWidth={1.75} />
          </ServiceCtaLink>
        </div>
      </GlassSpotlight>
    </section>
  );
}
