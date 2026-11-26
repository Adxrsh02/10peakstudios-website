'use client';

import { useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink, GitBranch } from 'lucide-react';
import { useMotion } from '@/components/motion/MotionProvider';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import type { PortfolioCardData } from '@/lib/portfolio/loader';
import { findMatchSegments } from '@/lib/portfolio/search';
import { ViewTransitionLink } from './ViewTransitionLink';

const TYPE_LABELS: Record<PortfolioCardData['type'], string> = {
  client: 'Client project',
  'in-house': 'In-house build',
  concept: 'Concept',
};

function HighlightedText({ text, tokens }: { text: string; tokens: string[] }) {
  const segments = findMatchSegments(text, tokens);
  return (
    <>
      {segments.map((seg, i) =>
        seg.matched ? (
          <mark key={i} className="rounded-[3px] bg-primary/15 px-0.5 text-foreground">
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

type PortfolioCardProps = {
  project: PortfolioCardData;
  highlightTokens: string[];
};

/**
 * Interactive case study card with Tier 2 pointer-only 3D tilt + radial Glow Violet spotlight.
 * Whole card navigates via stretched link overlay while keeping GitHub/Live links separately focusable.
 */
export function PortfolioCard({ project, highlightTokens }: PortfolioCardProps) {
  const { tier } = useMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [tiltStyle, setTiltStyle] = useState<CSSProperties>({});

  const href = `/portfolio/${project.slug}`;
  const visibleTech = project.techList.slice(0, 4);
  const overflowTech = Math.max(0, project.techList.length - visibleTech.length);

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (tier < 2 || e.pointerType !== 'mouse' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 4; // max +/- 2deg
    const rotateX = (0.5 - y) * 4;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`,
      '--mx': `${(x * 100).toFixed(1)}%`,
      '--my': `${(y * 100).toFixed(1)}%`,
    } as CSSProperties);
  };

  const handlePointerLeave = () => {
    if (tier < 2) return;
    setTiltStyle({});
  };

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={tiltStyle}
      className={cn(
        'group/card relative flex h-full flex-col overflow-hidden rounded-md border border-border bg-card text-card-foreground',
        'transition-[box-shadow,border-color,transform] duration-(--duration-base) ease-(--ease-standard)',
        '[@media(hover:hover)]:hover:border-primary/40 [@media(hover:hover)]:hover:shadow-md',
      )}
    >
      {/* Subtle Glow Violet (20%) spotlight on desktop pointer hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-(--duration-base) [@media(hover:hover)]:group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgb(91 16 224 / 0.12), transparent 70%)',
        }}
      />

      {/* Thumbnail 16:10 */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-surface-sunken">
        <Image
          src={project.thumbnail.url}
          alt={project.thumbnail.alt}
          width={project.thumbnail.width}
          height={project.thumbnail.height}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 400px"
          data-vt-slug={`card-${project.slug}`}
          className="size-full object-cover transition-transform duration-(--duration-base) ease-(--ease-standard) [@media(hover:hover)]:group-hover/card:scale-[1.03]"
        />
        <div className="pointer-events-none absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          <span className="rounded-pill border border-border bg-background/95 px-2.5 py-1 text-caption font-medium text-foreground shadow-sm">
            {project.industry}
          </span>
          <span className="rounded-pill border border-inverse-rule bg-ink/90 px-2.5 py-1 text-caption font-medium text-summit-white">
            {TYPE_LABELS[project.type]}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 text-caption text-muted-foreground">
            <span>{project.complexity}</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              <span aria-hidden="true" className="size-1.5 rounded-pill bg-primary" />
              {project.status}
            </span>
          </div>

          <h3 className="text-h4 text-foreground">
            <ViewTransitionLink
              href={href}
              transitionSlug={`card-${project.slug}`}
              className="text-foreground after:absolute after:inset-0 after:z-0 focus-visible:outline-none"
            >
              <HighlightedText text={project.title} tokens={highlightTokens} />
            </ViewTransitionLink>
          </h3>

          <p className="text-small font-medium text-primary">
            <HighlightedText text={project.tagline} tokens={highlightTokens} />
          </p>

          <p className="line-clamp-2 text-body text-muted-foreground">
            <HighlightedText text={project.shortDescription} tokens={highlightTokens} />
          </p>
        </div>

        {/* Top 4 Tech Chips + Overflow */}
        <div className="flex flex-wrap gap-1.5">
          {visibleTech.map((tech) => (
            <span
              key={tech}
              className="rounded-pill border border-border bg-surface-sunken px-2.5 py-1 text-caption font-medium text-foreground"
            >
              <HighlightedText text={tech} tokens={highlightTokens} />
            </span>
          ))}
          {overflowTech > 0 && (
            <span className="rounded-pill border border-border bg-surface-sunken px-2.5 py-1 text-caption font-medium text-muted-foreground">
              +{overflowTech}
            </span>
          )}
        </div>

        {/* Footer Action Row: outer card link vs separately focusable GitHub/Live buttons */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1.5 text-small font-semibold text-link [@media(hover:hover)]:group-hover/card:underline">
            View case study
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.75}
              className="size-4 transition-transform duration-(--duration-fast) [@media(hover:hover)]:group-hover/card:translate-x-0.5"
            />
          </span>

          {(project.githubUrl || project.liveUrl) && (
            <div className="relative z-10 flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
                  onClick={() =>
                    track('github_click', {
                      project_slug: project.slug,
                      location: 'portfolio_card',
                    })
                  }
                  className="grid size-10 place-items-center rounded-pill border border-border bg-background text-foreground transition-colors [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:text-primary"
                >
                  <GitBranch className="size-4" aria-hidden="true" strokeWidth={1.75} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Live demo for ${project.title} (opens in a new tab)`}
                  onClick={() =>
                    track('live_demo_click', {
                      project_slug: project.slug,
                      location: 'portfolio_card',
                    })
                  }
                  className="grid size-10 place-items-center rounded-pill border border-border bg-background text-foreground transition-colors [@media(hover:hover)]:hover:border-primary [@media(hover:hover)]:hover:text-primary"
                >
                  <ExternalLink className="size-4" aria-hidden="true" strokeWidth={1.75} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
