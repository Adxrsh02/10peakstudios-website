'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';

type AnimatedProgressBarProps = {
  progress: number;
  className?: string;
};

/**
 * Animates a horizontal progress indicator using a pure CSS GPU `scaleX` keyframe
 * (`service-progress-grow`) with zero main-thread JS or GSAP overhead.
 */
export function AnimatedProgressBar({ progress, className }: AnimatedProgressBarProps) {
  const ratio = Math.max(0, Math.min(1, progress / 100));

  return (
    <div
      className={cn('service-progress-bar origin-left', className)}
      style={
        {
          transform: `scaleX(${ratio})`,
          '--target-scale': String(ratio),
        } as React.CSSProperties
      }
    />
  );
}

type CountUpProps = {
  target: number;
  suffix?: string;
  className?: string;
};

/**
 * Animates a numeric target readout (e.g. "90+") once when visible at Tier 2 desktop;
 * renders final static target immediately under SSR, Tier 0/1 mobile, and reduced motion.
 */
export function CountUp({ target, suffix = '+', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotionEffect(
    ref,
    ({ gsap }, _tier, root) => {
      const state = { val: Math.max(0, target - 24) };
      gsap.to(state, {
        val: target,
        duration: 0.9,
        ease: 'peakRise',
        scrollTrigger: { trigger: root, start: 'top 90%', once: true },
        onUpdate: () => {
          root.textContent = `${Math.round(state.val)}${suffix}`;
        },
      });
    },
    { minTier: 2 },
  );

  return (
    <span ref={ref} className={className}>
      {target}
      {suffix}
    </span>
  );
}
