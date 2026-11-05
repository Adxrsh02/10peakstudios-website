'use client';

import { useRef, type ReactNode } from 'react';
import { useMotionEffect } from './MotionProvider';

type ParallaxLayerProps = { children?: ReactNode; className?: string; speed?: number };

/** Restrained parallax for decorative layers, Tier 2 only, max 10% (Design.md 11.3). */
export function ParallaxLayer({ children, className, speed = 1 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMotionEffect(
    ref,
    ({ gsap }, _tier, root) => {
      gsap.fromTo(
        root,
        { yPercent: 5 * speed },
        {
          yPercent: -5 * speed,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    },
    { minTier: 2 },
  );

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {children}
    </div>
  );
}
