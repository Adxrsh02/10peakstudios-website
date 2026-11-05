'use client';

import { useRef, type ReactNode } from 'react';
import { useMotionEffect } from './MotionProvider';

/**
 * Process storytelling (Design.md 10.6, 11.5). Default (no JS, Tier 0, Tier 1, < 1024 px): the
 * steps stay a normal grid / vertical timeline and the timeline line draws once on enter (Tier 1+).
 * Tier 2 at >= 1024 px: the section pins and the steps track scrolls horizontally with an
 * Arrow-rise progress line (scrub: 1, <= 150% viewport of scroll, RUL-MOT-07).
 * Expects descendants: [data-pin-viewport], [data-pin-track], [data-pin-progress], [data-pin-line].
 */
export function PinnedSteps({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useMotionEffect(ref, ({ gsap }, tier, root) => {
    const mm = gsap.matchMedia();
    const line = root.querySelector<HTMLElement>('[data-pin-line]');

    mm.add('(max-width: 1023px)', () => {
      if (line && line.getBoundingClientRect().top > window.innerHeight * 0.9) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: 'peakRise',
            transformOrigin: 'top center',
            scrollTrigger: { trigger: line, start: 'top 80%', once: true },
          },
        );
      }
    });

    if (tier === 2) {
      mm.add('(min-width: 1024px)', () => {
        const viewport = root.querySelector<HTMLElement>('[data-pin-viewport]');
        const track = root.querySelector<HTMLElement>('[data-pin-track]');
        const progress = root.querySelector<HTMLElement>('[data-pin-progress]');
        if (!viewport || !track) return;
        root.setAttribute('data-pinned', '');
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        if (distance() <= 0) {
          root.removeAttribute('data-pinned');
          return;
        }
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${Math.min(distance() * 1.1, window.innerHeight * 1.5)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            // No anticipatePin: Lenis updates ScrollTrigger in the same frame as the scroll, so
            // anticipation only pins early (measured: a 37 px snap before the section reached the top).
          },
        });
        tl.to(track, { x: () => -distance(), ease: 'none' }, 0);
        if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: 'none' }, 0);
        return () => root.removeAttribute('data-pinned');
      });
    }

    return () => mm.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
