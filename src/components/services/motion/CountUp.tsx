'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';

type AnimatedProgressBarProps = {
  progress: number;
  className?: string;
};

/**
 * Animates a horizontal progress indicator once on viewport entry using transform `scaleX` only.
 * Renders at final progress without JS or at Tier 0.
 */
export function AnimatedProgressBar({ progress, className }: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ratio = Math.max(0, Math.min(1, progress / 100));

  useMotionEffect(ref, ({ gsap }, tier, root) => {
    if (tier === 0) return;
    gsap.fromTo(
      root,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: ratio,
        duration: tier === 2 ? 0.95 : 0.65,
        ease: 'peakRise',
        scrollTrigger: { trigger: root, start: 'top 92%', once: true },
      },
    );
  });

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `scaleX(${ratio})`, transformOrigin: 'left center' }}
    />
  );
}

type CountUpProps = {
  target: number;
  suffix?: string;
  className?: string;
};

/**
 * Animates a numeric target readout (e.g. "90+") once when visible at Tier >= 1;
 * displays final static target immediately under SSR, Tier 0, and reduced motion.
 */
export function CountUp({ target, suffix = '+', className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useMotionEffect(ref, ({ gsap }, tier, root) => {
    if (tier === 0) return;
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
  });

  return (
    <span ref={ref} className={className}>
      {target}
      {suffix}
    </span>
  );
}
