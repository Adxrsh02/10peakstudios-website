'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/cn';

type LenisLike = { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };

/** Back-to-top (PRD-GLB-06, Design.md 10.13). Appears after 2 viewport heights; moves focus to top. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 2);
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

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: reduce });
    else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.getElementById('top')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : true}
      className={cn(
        'fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-(--z-sticky-cta) grid size-11 place-items-center rounded-pill border border-border bg-background text-foreground shadow-md lg:right-8 lg:bottom-8',
        'transition-[opacity,transform,visibility] duration-(--duration-base) ease-(--ease-standard) [@media(hover:hover)]:hover:border-primary',
        visible ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0',
      )}
    >
      <ArrowUp aria-hidden="true" strokeWidth={1.75} className="size-5" />
    </button>
  );
}
