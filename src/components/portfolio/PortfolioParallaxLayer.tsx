'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';

/**
 * Tier 2 decorative parallax orbs for the Obsidian Portfolio hero (transform-only, <= 10% yPercent).
 * Zero effect on Tier 0/1; GSAP context automatically reverts on unmount (RUL-MOT-05).
 */
export function PortfolioParallaxLayer() {
  const scopeRef = useRef<HTMLDivElement>(null);

  useMotionEffect(
    scopeRef,
    ({ gsap }, _tier, root) => {
      const glowA = root.querySelector('[data-parallax-a]');
      const glowB = root.querySelector('[data-parallax-b]');
      if (!glowA || !glowB) return;

      gsap.to(glowA, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to(glowB, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    },
    { minTier: 2 },
  );

  return (
    <div
      ref={scopeRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        data-parallax-a=""
        className="glow-violet absolute -top-24 right-[-10%] h-[30rem] w-[min(42rem,95vw)] rounded-full"
      />
      <div
        data-parallax-b=""
        className="glow-violet absolute -bottom-28 left-[-8%] h-[22rem] w-[min(32rem,85vw)] rounded-full opacity-75"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] bg-[size:48px_48px]" />
    </div>
  );
}
