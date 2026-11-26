'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';

/**
 * Reading progress bar fixed directly beneath the sticky header.
 * Driven via GSAP ScrollTrigger on Tier 1/2 (no standalone RAF); hidden on Tier 0.
 */
export function ReadingProgressBar({ targetSelector }: { targetSelector: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useMotionEffect(barRef, ({ gsap }, _tier, barEl) => {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    gsap.set(barEl, { scaleX: 0 });
    gsap.to(barEl, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-[var(--header-height)] right-0 left-0 z-(--z-raised) h-[3px] bg-transparent"
    >
      <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-arrow-rise" />
    </div>
  );
}
