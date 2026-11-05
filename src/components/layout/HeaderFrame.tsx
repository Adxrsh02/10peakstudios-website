'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Sticky header frame (PRD-GLB-03, Design.md 10.3): 80 px at top, 64 px after 24 px of scroll on
 * desktop, translucent white with an 8 px blur and a hairline border once scrolled. No layout shift:
 * the frame is fixed-height in flow; only its inner padding and background change.
 */
export function HeaderFrame({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled ? '' : undefined}
      className={cn(
        'sticky top-0 z-(--z-header) w-full border-b transition-[background-color,border-color,height] duration-(--duration-base) ease-(--ease-standard)',
        'h-16 lg:h-20 lg:data-scrolled:h-16',
        scrolled
          ? 'border-border bg-background/90 backdrop-blur-[8px]'
          : 'border-transparent bg-background/0',
      )}
    >
      {children}
    </header>
  );
}
