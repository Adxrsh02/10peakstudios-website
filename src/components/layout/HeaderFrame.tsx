'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { isGlassServiceRoute } from '@/content/services/glass-routes';
import { cn } from '@/lib/cn';

/**
 * Sticky header frame (PRD-GLB-03, Design.md 10.3): 80 px at top, 64 px after 24 px of scroll on
 * desktop, translucent white with an 8 px blur and a hairline border once scrolled. Supports an
 * optional dark-glass variant (or auto-enables on routes listed in `glass-routes.ts`).
 */
export function HeaderFrame({
  children,
  variant,
}: {
  children: ReactNode;
  variant?: 'default' | 'dark-glass';
}) {
  const pathname = usePathname();
  const isDarkGlass =
    variant === 'dark-glass' || (variant !== 'default' && isGlassServiceRoute(pathname));
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
      data-header-theme={isDarkGlass ? 'dark-glass' : undefined}
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
