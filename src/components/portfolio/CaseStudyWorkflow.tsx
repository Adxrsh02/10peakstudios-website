'use client';

import { useRef } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import type { EngineeringStep } from '@/content/portfolio-config';

/**
 * Animated vertical timeline of development steps (always rendered as semantic <ol>).
 * Connecting Arrow-rise line draws cleanly on scroll at Tier 1/2; static final state at Tier 0.
 */
export function CaseStudyWorkflow({ steps }: { steps: EngineeringStep[] }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useMotionEffect(scopeRef, ({ gsap }, _tier, root) => {
    const line = root.querySelector('[data-workflow-line]');
    if (!line) return;
    gsap.set(line, { scaleY: 0 });
    gsap.to(line, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: root,
        start: 'top 80%',
        end: 'bottom 65%',
        scrub: 0.6,
      },
    });
  });

  return (
    <div ref={scopeRef} className="relative pl-4 sm:pl-6">
      <div
        data-workflow-line=""
        aria-hidden="true"
        className="absolute top-3 bottom-3 left-[1.125rem] w-0.5 origin-top bg-arrow-rise-vertical sm:left-[1.625rem]"
      />
      <ol className="relative flex flex-col gap-5">
        {steps.map((step, idx) => (
          <li key={step.number} className="relative flex gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className="price relative z-10 grid size-9 shrink-0 place-items-center rounded-pill border-2 border-primary bg-background font-heading text-small font-semibold text-primary sm:size-10"
            >
              {step.number}
            </span>
            <div className="flex flex-1 flex-col gap-1 rounded-md border border-border bg-surface-sunken p-4 sm:p-5">
              <h3 className="text-h5 text-foreground">
                <span className="sr-only">Step {idx + 1}: </span>
                {step.title}
              </h3>
              {step.description && (
                <p className="text-body text-muted-foreground">{step.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
