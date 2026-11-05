'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { useMotionEffect } from './MotionProvider';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  'aria-labelledby'?: string;
};

/**
 * Section reveal (Design.md 11.2 "peak rise", 11.3). Animates descendants marked
 * [data-reveal-item] (or the wrapper itself). No-flash rule: only items still below the fold when
 * GSAP initialises are hidden; anything already visible renders final. Tier 0: nothing runs.
 */
export function Reveal({ children, as: Tag = 'div', className, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useMotionEffect(ref, ({ gsap, ScrollTrigger }, tier, root) => {
    const found = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal-item]'));
    const items = found.length > 0 ? found : [root];
    const below = items.filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (below.length === 0) return;
    const y = tier === 2 ? 24 : 12;
    gsap.set(below, { opacity: 0, y, scale: 0.985 });
    ScrollTrigger.batch(below, {
      start: 'top 88%',
      once: true,
      batchMax: 8,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: tier === 2 ? 0.8 : 0.5,
          stagger: 0.06,
          ease: 'peakRise',
          overwrite: true,
          clearProps: 'transform,opacity',
        }),
    });
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
