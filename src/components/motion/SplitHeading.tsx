'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { useMotionEffect } from './MotionProvider';

type SplitHeadingProps = {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'p' | 'blockquote';
};

/**
 * Word-by-word reveal for short headlines (<= 8 words), Tier 2 only (RUL-MOT-08). Uses SplitText
 * with masks and its built-in aria handling; reverted after it plays. Never used on the LCP heading.
 */
export function SplitHeading({ children, className, as: Tag = 'h2' }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const Comp = Tag as ElementType;

  useMotionEffect(
    ref,
    ({ gsap, SplitText }, _tier, root) => {
      if (root.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      const split = SplitText.create(root, { type: 'words', mask: 'words', aria: 'auto' });
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'peakRise',
        scrollTrigger: { trigger: root, start: 'top 85%', once: true },
        onComplete: () => split.revert(),
      });
      return () => split.revert();
    },
    { minTier: 2 },
  );

  return (
    <Comp ref={ref} className={className}>
      {children}
    </Comp>
  );
}
