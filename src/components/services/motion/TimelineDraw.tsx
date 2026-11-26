'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';

type TimelineDrawProps = {
  className?: string;
};

/**
 * Scroll-driven vertical timeline spine using GPU `scaleY` transform via GSAP ScrollTrigger.
 * Renders fully visible immediately without JS and under Tier 0 / prefers-reduced-motion.
 */
export function TimelineDraw({ className }: TimelineDrawProps) {
  const ref = useRef<HTMLDivElement>(null);

  useMotionEffect(ref, ({ gsap }, tier, root) => {
    if (root.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    const target = root.parentElement ?? root;
    const from = { scaleY: 0, transformOrigin: 'top center' };
    if (tier === 2) {
      gsap.fromTo(root, from, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top 78%',
          end: 'bottom 68%',
          scrub: 0.8,
        },
      });
    } else {
      gsap.fromTo(root, from, {
        scaleY: 1,
        duration: 1.1,
        ease: 'peakRise',
        scrollTrigger: {
          trigger: target,
          start: 'top 82%',
          once: true,
        },
      });
    }
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'w-0.5 origin-top rounded-full bg-gradient-to-b from-(--color-peak-violet) via-(--color-lilac-spark) to-(--glass-cyan) shadow-[0_0_12px_rgb(167_67_248/0.45)]',
        className,
      )}
    />
  );
}
