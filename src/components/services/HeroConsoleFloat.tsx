'use client';

import { useRef, type ReactNode } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';

/**
 * Gentle continuous vertical float for the hero workflow console on Tier >= 1 desktop devices.
 * Disabled automatically on mobile (Tier 0/1 reduced) or `prefers-reduced-motion`.
 */
export function HeroConsoleFloat({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useMotionEffect(
    ref,
    ({ gsap }, _tier, root) => {
      const tween = gsap.to(root, {
        y: -7,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      return () => {
        tween.kill();
      };
    },
    { minTier: 2 },
  );

  return (
    <div ref={ref} className={cn('w-full max-w-md', className)}>
      {children}
    </div>
  );
}
