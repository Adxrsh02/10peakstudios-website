'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';

type MaskRevealProps = {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
};

/**
 * Rising clip-path + gentle scale-down image reveal (`transform`, `clip-path`, `opacity` only).
 * Hero imagery passes `immediate` or remains unhidden so LCP is never blocked before hydration.
 */
export function MaskReveal({ children, className, immediate = false }: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(immediate);

  useMotionEffect(ref, ({ ScrollTrigger }, tier, root) => {
    if (tier === 0 || immediate) {
      setRevealed(true);
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 86%',
      once: true,
      onEnter: () => setRevealed(true),
    });

    if (root.getBoundingClientRect().top <= window.innerHeight * 0.92) {
      setRevealed(true);
    }

    return () => trigger.kill();
  });

  return (
    <div
      ref={ref}
      data-revealed={revealed ? 'true' : undefined}
      className={cn('ascent-mask-reveal', className)}
    >
      {children}
    </div>
  );
}
