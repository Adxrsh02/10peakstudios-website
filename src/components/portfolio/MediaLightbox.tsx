'use client';

import { useEffect, useState, type TouchEvent, type WheelEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { useMotion } from '@/components/motion/MotionProvider';

export type LightboxMediaItem = {
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type MediaLightboxProps = {
  items: LightboxMediaItem[];
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestoreFocus?: () => void;
};

/**
 * Accessible full-screen media lightbox built on Radix Dialog (focus trap, Esc, focus restore).
 * Supports keyboard ArrowLeft/ArrowRight, touch swipe, wheel zoom, and captions.
 */
export function MediaLightbox({
  items,
  index,
  onIndexChange,
  open,
  onOpenChange,
  onRestoreFocus,
}: MediaLightboxProps) {
  const { tier } = useMotion();
  const [zoom, setZoom] = useState<number>(1);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const current = items[index] ?? items[0];
  const hasMultiple = items.length > 1;

  const goPrev = () => {
    setZoom(1);
    onIndexChange((index - 1 + items.length) % items.length);
  };

  const goNext = () => {
    setZoom(1);
    onIndexChange((index + 1) % items.length);
  };

  useEffect(() => {
    if (!open || !hasMultiple) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setZoom(1);
        onIndexChange((index - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setZoom(1);
        onIndexChange((index + 1) % items.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, hasMultiple, index, items.length, onIndexChange]);

  if (!current) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setZoom(1);
    onOpenChange(nextOpen);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || Math.abs(e.deltaY) > 10) {
      setZoom((prev) => {
        const next = e.deltaY < 0 ? prev + 0.25 : prev - 0.25;
        return Math.min(2.5, Math.max(1, Number(next.toFixed(2))));
      });
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || !e.changedTouches[0]) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 48 && hasMultiple) {
      if (diff > 0) goPrev();
      else goNext();
    }
    setTouchStartX(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        onCloseAutoFocus={(e) => {
          if (onRestoreFocus) {
            e.preventDefault();
            requestAnimationFrame(() => onRestoreFocus());
          }
        }}
        className="surface-inverse max-w-[min(96vw,78rem)] border-inverse-rule bg-obsidian p-4 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pr-12">
          <DialogTitle className="text-h5 text-summit-white">{current.caption}</DialogTitle>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={zoom > 1 ? 'Zoom out image' : 'Zoom in image'}
              onClick={() => setZoom((z) => (z > 1 ? 1 : 2))}
              className="inline-flex h-10 items-center gap-1.5 rounded-pill border border-border bg-card px-3 text-caption font-medium text-foreground [@media(hover:hover)]:hover:border-brand-accent"
            >
              {zoom > 1 ? (
                <>
                  <ZoomOut className="size-4" aria-hidden="true" strokeWidth={1.75} />
                  Reset ({zoom}x)
                </>
              ) : (
                <>
                  <ZoomIn className="size-4" aria-hidden="true" strokeWidth={1.75} />
                  Zoom
                </>
              )}
            </button>
            {hasMultiple && (
              <span className="price text-small text-muted-foreground">
                {index + 1} / {items.length}
              </span>
            )}
          </div>
        </div>
        <DialogDescription className="sr-only">{current.alt}</DialogDescription>

        <div
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative flex max-h-[72dvh] min-h-[16rem] items-center justify-center overflow-auto rounded-sm border border-border bg-ink/80 p-2"
        >
          <div
            className={tier === 0 ? '' : 'transition-transform duration-(--duration-fast)'}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            <Image
              src={current.url}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="95vw"
              className="max-h-[68dvh] w-auto max-w-full rounded-sm object-contain"
            />
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={goPrev}
                className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-pill border border-border bg-obsidian/90 text-foreground shadow-md transition-colors [@media(hover:hover)]:hover:border-brand-accent"
              >
                <ChevronLeft className="size-5" aria-hidden="true" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={goNext}
                className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-pill border border-border bg-obsidian/90 text-foreground shadow-md transition-colors [@media(hover:hover)]:hover:border-brand-accent"
              >
                <ChevronRight className="size-5" aria-hidden="true" strokeWidth={1.75} />
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
