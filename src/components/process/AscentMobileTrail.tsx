'use client';

import type { RefObject } from 'react';

type AscentMobileTrailProps = {
  lineRef: RefObject<HTMLSpanElement | null>;
};

/**
 * Vertical trail rail rendered to the left of the stacked `<ol>` on `< 1024px` viewports.
 * Animated via `scaleY` in ScrollTrigger without pinning (RUL-MOT-07).
 */
export function AscentMobileTrail({ lineRef }: AscentMobileTrailProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-2 bottom-2 left-3 w-1 rounded-full bg-white/15 lg:hidden"
    >
      <span
        ref={lineRef}
        data-mobile-trail-fill=""
        className="block h-full w-full origin-top rounded-full bg-gradient-to-b from-(--color-peak-violet) via-(--color-lilac-spark) to-(--ascent-cyan)"
      />
    </div>
  );
}
