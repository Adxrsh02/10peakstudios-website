'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

const STARS = [
  { x: 6, y: 12, size: 2, duration: '3.4s', delay: '0s' },
  { x: 14, y: 28, size: 2, duration: '4.2s', delay: '0.7s' },
  { x: 22, y: 16, size: 3, duration: '3.9s', delay: '1.1s' },
  { x: 31, y: 8, size: 2, duration: '4.6s', delay: '0.4s' },
  { x: 38, y: 34, size: 2, duration: '3.2s', delay: '1.6s' },
  { x: 46, y: 18, size: 3, duration: '4.8s', delay: '0.9s' },
  { x: 54, y: 11, size: 2, duration: '3.7s', delay: '2.1s' },
  { x: 63, y: 26, size: 2, duration: '4.1s', delay: '0.3s' },
  { x: 72, y: 14, size: 3, duration: '3.5s', delay: '1.4s' },
  { x: 81, y: 22, size: 2, duration: '4.4s', delay: '0.6s' },
  { x: 89, y: 9, size: 2, duration: '3.8s', delay: '1.8s' },
  { x: 94, y: 31, size: 3, duration: '4.9s', delay: '0.2s' },
  { x: 11, y: 58, size: 2, duration: '4.0s', delay: '1.2s' },
  { x: 27, y: 68, size: 2, duration: '3.3s', delay: '0.5s' },
  { x: 42, y: 76, size: 3, duration: '4.5s', delay: '1.9s' },
  { x: 59, y: 64, size: 2, duration: '3.6s', delay: '0.8s' },
  { x: 76, y: 74, size: 2, duration: '4.3s', delay: '1.5s' },
  { x: 88, y: 60, size: 3, duration: '3.9s', delay: '0.1s' },
] as const;

type StarfieldProps = {
  className?: string;
  opacityClassName?: string;
};

/**
 * Lightweight CSS twinkle starfield (18 stars, opacity-only). Automatically pauses when scrolled
 * off-screen or when the browser tab is hidden. Decorative (`aria-hidden="true"`).
 */
export function Starfield({ className, opacityClassName }: StarfieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let offscreen = false;
    let hidden = document.hidden;
    const sync = () => setPaused(offscreen || hidden);

    const io = new IntersectionObserver(
      (entries) => {
        offscreen = !(entries[0]?.isIntersecting ?? false);
        sync();
      },
      { threshold: 0.01 },
    );
    io.observe(el);

    const onVisibility = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-paused={paused ? 'true' : undefined}
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        opacityClassName,
        className,
      )}
    >
      {STARS.map((star, idx) => (
        <span
          key={idx}
          className="ascent-star absolute rounded-full bg-white"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              '--star-duration': star.duration,
              '--star-delay': star.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
