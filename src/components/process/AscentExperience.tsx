'use client';

import { useCallback, useRef, useState } from 'react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import type { ResolvedProcessContent } from '@/content/process';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { AscentMobileTrail } from './AscentMobileTrail';
import { AscentStage, AscentStageControls } from './AscentStage';
import { CampCard } from './CampCard';

type AscentExperienceProps = {
  ascent: ResolvedProcessContent['ascent'];
};

export function AscentExperience({ ascent }: AscentExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<HTMLSpanElement>(null);
  const scrollTriggerRef = useRef<{
    start: number;
    end: number;
    scroll: (y: number) => void;
  } | null>(null);
  const viewedRef = useRef<Set<number>>(new Set([1]));
  const completedRef = useRef(false);

  const [activeCamp, setActiveCamp] = useState(1);
  const [starsOpacity, setStarsOpacity] = useState(0.25);
  const [desktopPinned, setDesktopPinned] = useState(false);

  const totalCamps = ascent.camps.length;

  const markCampViewed = useCallback(
    (campNum: number) => {
      if (!viewedRef.current.has(campNum)) {
        viewedRef.current.add(campNum);
        track('ascent_camp_view', { camp_number: campNum });
      }
      if (campNum >= totalCamps && !completedRef.current) {
        completedRef.current = true;
        track('ascent_complete', { position: 'summit' });
      }
    },
    [totalCamps],
  );

  useMotionEffect(sectionRef, ({ gsap, ScrollTrigger }, tier, root) => {
    const mm = gsap.matchMedia();
    const pathEl = svgPathRef.current;

    if (pathEl && typeof pathEl.getTotalLength === 'function') {
      const len = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${len}`;
      if (tier === 0) {
        pathEl.style.strokeDashoffset = '0';
      } else {
        pathEl.style.strokeDashoffset = `${len}`;
      }
    }

    if (tier === 0) {
      setStarsOpacity(0.85);
      return () => mm.revert();
    }

    const skySection = root.closest<HTMLElement>('[data-ascent-section]') ?? root;

    // Mobile & tablet (< 1024px) or Tier 1: no pinning, vertical trail fills on scroll
    mm.add('(max-width: 1023px)', () => {
      setDesktopPinned(false);
      const line = mobileLineRef.current;
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0.08 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 0.6,
              onUpdate: (self) => {
                skySection.style.setProperty(
                  '--ascent-night-opacity',
                  (0.15 + self.progress * 0.85).toFixed(2),
                );
                setStarsOpacity(0.15 + self.progress * 0.85);
                const bucket = Math.min(
                  totalCamps,
                  Math.max(1, Math.round(self.progress * (totalCamps - 1)) + 1),
                );
                setActiveCamp((prev) => (prev === bucket ? prev : bucket));
                markCampViewed(bucket);
              },
            },
          },
        );
      }
    });

    // Desktop (>= 1024px): Tier 2 pins and scrubs horizontal camera along the mountain trail
    if (tier === 2) {
      mm.add('(min-width: 1024px)', () => {
        const viewport = viewportRef.current;
        const rail = trackRef.current;
        if (!viewport || !rail) return;

        setDesktopPinned(true);

        // Compute horizontal pan after layout updates for pinned rail
        const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
        const scrollBudget = () => Math.round(window.innerHeight * 1.45);
        let lastBucket = 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${scrollBudget()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              skySection.style.setProperty('--ascent-night-opacity', (0.15 + p * 0.85).toFixed(2));
              setStarsOpacity(p > 0.35 ? Math.min(1, (p - 0.35) / 0.45) : 0.15);
              if (self.isActive) {
                const bucket = Math.min(
                  totalCamps,
                  Math.max(1, Math.round(p * (totalCamps - 1)) + 1),
                );
                if (bucket !== lastBucket) {
                  lastBucket = bucket;
                  setActiveCamp(bucket);
                  markCampViewed(bucket);
                }
              }
            },
          },
        });

        tl.to(rail, { x: () => -distance(), ease: 'none' }, 0);
        if (pathEl) {
          tl.to(pathEl, { strokeDashoffset: 0, ease: 'none' }, 0);
        }

        scrollTriggerRef.current = tl.scrollTrigger ?? null;
        ScrollTrigger.refresh();

        return () => {
          scrollTriggerRef.current = null;
          setDesktopPinned(false);
          gsap.set(rail, { clearProps: 'transform' });
        };
      });
    } else {
      // Tier 1 desktop: reveal full trail without pinning
      mm.add('(min-width: 1024px)', () => {
        setDesktopPinned(false);
        if (pathEl) {
          gsap.to(pathEl, {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: 'peakRise',
            scrollTrigger: { trigger: root, start: 'top 75%', once: true },
          });
        }
        setStarsOpacity(0.85);
        skySection.style.setProperty('--ascent-night-opacity', '0.92');
      });
    }

    return () => mm.revert();
  });

  const stepToCamp = useCallback(
    (targetStep: number) => {
      const clamped = Math.min(totalCamps, Math.max(1, targetStep));
      setActiveCamp(clamped);
      markCampViewed(clamped);

      const st = scrollTriggerRef.current;
      if (desktopPinned && st) {
        const ratio = (clamped - 1) / (totalCamps - 1);
        st.scroll(st.start + ratio * (st.end - st.start));
        return;
      }

      const card = sectionRef.current?.querySelector<HTMLElement>(`[data-camp-card="${clamped}"]`);
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    [desktopPinned, markCampViewed, totalCamps],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepToCamp(activeCamp + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepToCamp(activeCamp - 1);
    }
  };

  return (
    <div
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Six camps project ascent"
      className="relative z-10 container-content outline-none"
    >
      <AscentStageControls
        eyebrow={ascent.eyebrow}
        titleLead={ascent.titleLead}
        titleAccent={ascent.titleAccent}
        progressLabel={ascent.progressLabel}
        activeCamp={activeCamp}
        totalCamps={totalCamps}
        onPrev={() => stepToCamp(activeCamp - 1)}
        onNext={() => stepToCamp(activeCamp + 1)}
      />

      <AscentStage pathRef={svgPathRef} starsOpacity={starsOpacity} />

      <div ref={viewportRef} className={cn('relative', desktopPinned && 'lg:overflow-hidden')}>
        <AscentMobileTrail lineRef={mobileLineRef} />

        <ol
          ref={trackRef}
          className={cn(
            'm-0 list-none pl-9 sm:pl-11 lg:pl-0',
            desktopPinned
              ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:flex lg:w-max lg:flex-nowrap lg:items-stretch lg:gap-6'
              : 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {ascent.camps.map((camp) => (
            <CampCard
              key={camp.step}
              camp={camp}
              active={camp.step === activeCamp}
              className={desktopPinned ? 'lg:w-[360px] lg:shrink-0 xl:w-[390px]' : ''}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
