'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useMotion } from '@/components/motion/MotionProvider';
import type { FingerprintScanData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';

type FingerprintScanProps = {
  data: FingerprintScanData;
};

/**
 * Security centerpiece section featuring concentric ridge paths, a subtle sweep beam,
 * "Access verified" verification readout, a pauseable orbital capability halo that pauses
 * automatically when scrolled offscreen, and honest security best-practices framing.
 */
export function FingerprintScan({ data }: FingerprintScanProps) {
  const { tier } = useMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && tier >= 1) {
          setScanned(true);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [tier]);

  const effectivePaused = paused || !inView;

  return (
    <section aria-labelledby="security-scan-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="security-scan-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.titleLead} <span className="glass-gradient-text">{data.titleAccent}</span>{' '}
          {data.titleEnd}
        </h2>
      </div>

      <div
        ref={containerRef}
        data-paused={effectivePaused ? 'true' : 'false'}
        className="service-orbit-container glass-card-strong glass-specular relative mx-auto flex max-w-5xl flex-col items-center rounded-lg p-6 sm:p-10 lg:p-12"
      >
        <div className="flex w-full justify-end">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((p) => !p)}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/6 px-3 py-1 font-mono text-[11px] text-(--glass-text-muted) hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
          >
            {paused ? (
              <>
                <Play className="size-3" aria-hidden="true" />
                <span>Resume motion</span>
              </>
            ) : (
              <>
                <Pause className="size-3" aria-hidden="true" />
                <span>Pause motion</span>
              </>
            )}
          </button>
        </div>

        {/* Concentric Ridge Scanner Disc */}
        <div className="relative my-6 flex size-48 items-center justify-center rounded-full border border-white/15 bg-white/5 shadow-[0_0_50px_rgb(142_33_252/0.28)] sm:size-56">
          {/* Gentle Ambient Orbital Halo (visible decorative ring paused when offscreen or paused) */}
          <div
            aria-hidden="true"
            className="service-orbit-ring pointer-events-none absolute -inset-3 rounded-full border border-dashed border-[#c38bff]/35"
          />

          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
            className={cn(
              'size-32 text-[#c38bff] transition-opacity duration-700 sm:size-36',
              scanned || tier === 0 ? 'opacity-95' : 'opacity-80',
            )}
          >
            <path d="M50 15 A35 35 0 0 1 85 50 A35 35 0 0 1 75 75" />
            <path d="M50 25 A25 25 0 0 1 75 50 A25 25 0 0 1 65 70" />
            <path d="M50 35 A15 15 0 0 1 65 50 A15 15 0 0 1 55 65" />
            <path d="M50 45 A5 5 0 0 1 55 50 A5 5 0 0 1 50 55" />
            <path d="M25 70 A35 35 0 0 1 15 50 A35 35 0 0 1 50 15" />
            <path d="M35 65 A25 25 0 0 1 25 50 A25 25 0 0 1 50 25" />
            <path d="M45 60 A15 15 0 0 1 35 50 A15 15 0 0 1 50 35" />
            <path d="M50 75 V85" />
          </svg>

          {/* Subtle Sweep Beam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-(--glass-cyan) to-transparent shadow-[0_0_12px_#4cd7f6]"
          />
        </div>

        {/* Access Verified Pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/15 px-4 py-1.5 font-mono text-small text-(--glass-emerald)">
          <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
          <span>{data.statusBadge}</span>
        </div>

        {/* 6 Security Capabilities Grid */}
        <div className="grid w-full grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {data.capabilities.map((cap) => {
            const tone = getServiceAccent(cap.accent);
            return (
              <div
                key={cap.label}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-4"
              >
                <div
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-md border',
                    tone.badge,
                  )}
                >
                  <ServiceIcon name={cap.icon} className="size-4.5" />
                </div>
                <span className="text-small text-(--glass-text)">{cap.label}</span>
              </div>
            );
          })}
        </div>

        <p className="mt-7 max-w-xl text-center text-caption leading-relaxed text-(--glass-text-meta)">
          {data.disclaimer}
        </p>
      </div>
    </section>
  );
}
