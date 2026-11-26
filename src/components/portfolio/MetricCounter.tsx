'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';

type MetricCounterProps = {
  value: string;
  label: string;
  context?: string;
};

/**
 * Renders confirmed metric immediately in SSR HTML (Tier 0 & no-JS safe) and animates count-up once on scroll.
 */
export function MetricCounter({ value, label, context }: MetricCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLParagraphElement>(null);

  useMotionEffect(containerRef, ({ gsap }, _tier, root) => {
    const match = /^([^0-9-]*)(-?\d+(?:\.\d+)?)(.*)$/.exec(value.trim());
    const numEl = numRef.current;
    if (!match || !match[2] || !numEl) return;

    const prefix = match[1] ?? '';
    const target = Number(match[2]);
    const decimals = match[2].includes('.') ? (match[2].split('.')[1]?.length ?? 0) : 0;
    const suffix = match[3] ?? '';

    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 1.1,
      ease: 'peakRise',
      scrollTrigger: { trigger: root, start: 'top 88%', once: true },
      onUpdate: () => {
        numEl.textContent = `${prefix}${proxy.val.toFixed(decimals)}${suffix}`;
      },
      onComplete: () => {
        numEl.textContent = value;
      },
    });
  });

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-5"
    >
      <p ref={numRef} className="price font-heading text-h2 font-bold text-primary">
        {value}
      </p>
      <p className="text-small font-semibold text-foreground">{label}</p>
      {context && <p className="text-caption text-muted-foreground">{context}</p>}
    </div>
  );
}
