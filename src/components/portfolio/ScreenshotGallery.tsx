'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Expand } from 'lucide-react';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import type { GalleryItem } from '@/lib/portfolio/schema';
import { MediaLightbox } from './MediaLightbox';

type ScreenshotGalleryProps = {
  items: GalleryItem[];
  projectSlug: string;
};

/**
 * Filterable screenshot gallery with aspect-ratio-safe device framing (desktop/mobile/natural)
 * and persistent MediaLightbox restoring focus to the exact trigger button on close.
 */
export function ScreenshotGallery({ items, projectSlug }: ScreenshotGalleryProps) {
  const [activeLabel, setActiveLabel] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  if (items.length === 0) return null;

  const labels = ['All', ...new Set(items.map((item) => item.label))];
  const filtered =
    activeLabel === 'All' ? items : items.filter((item) => item.label === activeLabel);

  const openLightbox = (idx: number, label: string, buttonEl: HTMLButtonElement) => {
    triggerRef.current = buttonEl;
    track('gallery_open', { project_slug: projectSlug, media_label: label });
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {labels.length > 2 && (
        <div
          role="tablist"
          aria-label="Filter project screenshots"
          className="flex flex-wrap gap-2"
        >
          {labels.map((label) => {
            const selected = activeLabel === label;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveLabel(label)}
                className={cn(
                  'min-h-10 rounded-pill border px-4 text-small font-medium transition-colors',
                  selected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-surface-sunken text-foreground [@media(hover:hover)]:hover:border-primary/50',
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((item, idx) => {
          const isMobileDevice = item.device === 'mobile';
          const isDesktopDevice = item.device === 'desktop';

          return (
            <figure
              key={`${item.url}-${idx}`}
              className="flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm"
            >
              {isDesktopDevice && (
                <div
                  aria-hidden="true"
                  className="flex items-center gap-1.5 border-b border-border bg-surface-sunken px-3.5 py-2"
                >
                  <span className="size-2.5 rounded-pill bg-mist" />
                  <span className="size-2.5 rounded-pill bg-mist" />
                  <span className="size-2.5 rounded-pill bg-mist" />
                  <span className="ml-2 text-caption font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => openLightbox(idx, item.label, e.currentTarget)}
                aria-label={`Zoom image: ${item.caption}`}
                className="group relative flex w-full items-center justify-center overflow-hidden bg-surface-sunken p-3 text-left"
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-sm',
                    isMobileDevice &&
                      'mx-auto max-w-[16rem] rounded-[1.25rem] border-4 border-ink shadow-md',
                  )}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 767px) 92vw, 44vw"
                    className="h-auto max-h-[24rem] w-auto max-w-full object-contain transition-transform duration-(--duration-base) [@media(hover:hover)]:group-hover:scale-[1.02]"
                  />
                </div>
                <span
                  aria-hidden="true"
                  className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-pill border border-border bg-background/95 text-foreground shadow-sm transition-transform [@media(hover:hover)]:group-hover:scale-105"
                >
                  <Expand className="size-4" strokeWidth={1.75} />
                </span>
              </button>

              <figcaption className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
                <span className="text-small font-medium text-foreground">{item.caption}</span>
                <span className="shrink-0 rounded-pill border border-border bg-surface-sunken px-2.5 py-0.5 text-caption text-muted-foreground">
                  {item.label}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      <MediaLightbox
        items={filtered}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        onRestoreFocus={() => triggerRef.current?.focus()}
      />
    </div>
  );
}
