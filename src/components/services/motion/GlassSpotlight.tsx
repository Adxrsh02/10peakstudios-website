'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';

type GlassSpotlightProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  'data-reveal-item'?: string;
};

/**
 * Interactive glass spotlight card wrapper. Tracks cursor coordinates via CSS custom properties
 * (--spot-x, --spot-y) inside a single rAF callback on fine-pointer hover devices only.
 * Zero React re-renders on pointermove; inactive at Motion Tier 0 / reduced-motion.
 */
export function GlassSpotlight({
  children,
  className,
  as: Tag = 'div',
  ...rest
}: GlassSpotlightProps) {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef(0);
  const { tier } = useMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (tier === 0 || e.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--spot-x', `${Math.round(clientX - rect.left)}px`);
      node.style.setProperty('--spot-y', `${Math.round(clientY - rect.top)}px`);
    });
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={tier > 0 ? handlePointerMove : undefined}
      className={cn(
        'glass-card glass-specular glass-spotlight transition-[border-color,transform] duration-(--duration-base) ease-(--ease-standard) [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-white/25',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
