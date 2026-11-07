'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading, TwoToneText } from '@/components/ui/primitives';
import { contact, type StatEntry } from '@/content/contact';

function SingleCounter({ item }: { item: StatEntry }) {
  const [current, setCurrent] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setTimeout(() => {
        setCurrent(item.numeric);
        setHasAnimated(true);
      }, 0);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const duration = 1400; // 1.4s

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(eased * item.numeric));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrent(item.numeric);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [item.numeric, hasAnimated]);

  return (
    <div
      ref={elementRef}
      data-reveal-item=""
      className="flex flex-col gap-2 rounded-md border border-border bg-card p-6 shadow-xs sm:p-8"
    >
      <div className="flex items-baseline font-heading text-display font-bold text-foreground">
        <span className="tabular-nums">{hasAnimated ? current : item.numeric}</span>
        <span className="text-primary">{item.suffix}</span>
      </div>
      <h3 className="font-heading text-h5 font-semibold text-foreground">{item.label}</h3>
      <p className="text-caption text-muted-foreground">{item.description}</p>
    </div>
  );
}

export function StatsCounter() {
  return (
    <Section surface="white" aria-labelledby="stats-heading">
      <div className="container-wide flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            id="stats-heading"
            eyebrow={contact.stats.eyebrow}
            title={
              <TwoToneText
                text={contact.stats.titleLead}
                accent={contact.stats.titleAccent}
                tone="gradient"
              />
            }
            lead={contact.stats.lead}
          />
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contact.stats.items.map((stat) => (
            <SingleCounter key={stat.label} item={stat} />
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
