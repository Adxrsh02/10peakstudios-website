'use client';

import { useRef, type ReactNode } from 'react';
import { useMotionEffect } from './MotionProvider';

/**
 * "Arrow draw" motif (Design.md 11.2): clip-path reveal left to right. Fully drawn without JS
 * and at Tier 0; drawn once on enter at Tier 1; scrubbed with scroll at Tier 2.
 */
export function DrawLine({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotionEffect(ref, ({ gsap }, tier, root) => {
    if (root.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    const from = { clipPath: 'inset(0% 100% 0% 0%)' };
    const to = { clipPath: 'inset(0% 0% 0% 0%)', ease: tier === 2 ? 'none' : 'peakRise' };
    if (tier === 2) {
      gsap.fromTo(root, from, {
        ...to,
        scrollTrigger: { trigger: root, start: 'top 85%', end: 'bottom 45%', scrub: 1 },
      });
    } else {
      gsap.fromTo(root, from, {
        ...to,
        duration: 1.4,
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
      });
    }
  });

  return (
    <div ref={ref} aria-hidden="true" className={className}>
      {children}
    </div>
  );
}
