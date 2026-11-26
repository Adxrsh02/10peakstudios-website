'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import { track } from '@/lib/analytics';
import type { PortfolioProject } from '@/lib/portfolio/loader';
import { MediaLightbox, type LightboxMediaItem } from './MediaLightbox';
import { MermaidBlock } from './MermaidBlock';

type ArchitectureShowcaseProps = {
  architecture: NonNullable<PortfolioProject['architecture']>;
  projectSlug: string;
};

/**
 * Elevated Ink (#14111E) inset Architecture Showcase inside case study body,
 * preserving Design.md 6.5 (max 2 full-bleed Obsidian bands per page).
 */
export function ArchitectureShowcase({ architecture, projectSlug }: ArchitectureShowcaseProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const items: LightboxMediaItem[] = architecture.diagrams;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-inverse-rule bg-ink p-5 text-summit-white shadow-md sm:p-8">
      {architecture.summary && (
        <p className="max-w-[70ch] text-body-lg text-inverse-muted">{architecture.summary}</p>
      )}

      {items.length > 0 && (
        <div className="grid grid-cols-1 gap-5">
          {items.map((diagram, idx) => (
            <figure
              key={`${diagram.url}-${idx}`}
              className="overflow-hidden rounded-md border border-inverse-rule bg-obsidian"
            >
              <button
                type="button"
                aria-label={`Click to zoom: ${diagram.caption}`}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  track('gallery_open', {
                    project_slug: projectSlug,
                    media_label: 'Architecture',
                  });
                  setLightboxIndex(idx);
                  setLightboxOpen(true);
                }}
                className="group relative flex w-full items-center justify-center overflow-hidden p-3"
              >
                <Image
                  src={diagram.url}
                  alt={diagram.alt}
                  width={diagram.width}
                  height={diagram.height}
                  sizes="(max-width: 1023px) 92vw, 62vw"
                  className="h-auto max-h-[26rem] w-auto max-w-full rounded-sm object-contain transition-transform duration-(--duration-base) [@media(hover:hover)]:group-hover:scale-[1.01]"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-pill border border-inverse-rule bg-ink/95 px-3 py-1.5 text-caption font-medium text-summit-white shadow-sm"
                >
                  <Expand className="size-3.5 text-inverse-link" strokeWidth={1.75} />
                  Click to zoom
                </span>
              </button>
              <figcaption className="border-t border-inverse-rule px-4 py-3 text-small text-inverse-muted">
                {diagram.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {architecture.mermaid && <MermaidBlock code={architecture.mermaid} />}

      {items.length > 0 && (
        <MediaLightbox
          items={items}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          onRestoreFocus={() => triggerRef.current?.focus()}
        />
      )}
    </div>
  );
}
