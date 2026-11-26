'use client';

import { useEffect, useRef, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Eye, Layers, Lock } from 'lucide-react';
import { useMotion } from '@/components/motion/MotionProvider';
import type { AppWindowHeroData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { ServiceCtaLink } from './ServiceCtaLink';
import { getServiceExtendedTone } from './ServiceIcon';

type AppWindowHeroProps = {
  slug: string;
  hero: AppWindowHeroData;
};

/**
 * Hero section featuring an interactive glass app window preview (dashboard, KPI row,
 * SVG line chart, recent activity table, and floating status notifications).
 * Cursor 3D tilt activates strictly on desktop Tier 2 fine-pointer devices; all SSR
 * and mobile views render statically with zero layout shift.
 */
export function AppWindowHero({ slug, hero }: AppWindowHeroProps) {
  const { tier } = useMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = frameRef.current;
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (el) el.style.transform = '';
    };
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (tier < 2 || e.pointerType !== 'mouse') return;
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-ny * 4.5).toFixed(2);
    const ry = (nx * 5.5).toFixed(2);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  };

  const handlePointerLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    el.style.transform = '';
  };

  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative pt-10 pb-4 sm:pt-14 lg:pt-16 lg:pb-8"
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
        {/* Left Column */}
        <div className="flex flex-col items-start gap-5 lg:col-span-6">
          <div className="glass-card inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-medium tracking-wider text-(--glass-text-muted) uppercase">
            <span className="size-1.5 rounded-full bg-(--color-peak-violet)" aria-hidden="true" />
            <span className="font-mono text-[#c38bff]">{hero.eyebrowPillar}</span>
            <span className="text-white/30" aria-hidden="true">
              /
            </span>
            <span>{hero.eyebrowService}</span>
          </div>

          <h1
            id="service-hero-heading"
            className="m-0 font-heading text-[2.35rem] leading-[1.08] font-semibold tracking-[-0.03em] text-(--glass-text) sm:text-[3rem] lg:text-[3.5rem]"
          >
            <span className="service-hero-line-1 block">{hero.titleLead}</span>{' '}
            <span className="glass-gradient-text service-hero-line-2 block">
              {hero.titleAccent}
            </span>
          </h1>

          <p className="max-w-xl text-body leading-relaxed text-(--glass-text-muted) sm:text-[1.125rem]">
            {hero.summary}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <ServiceCtaLink
              href={`/contact?service=${slug}`}
              serviceSlug={slug}
              position="hero"
              className="glass-cta-primary inline-flex min-h-12 items-center gap-2 rounded-full px-7 py-3 font-heading text-small font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              <span>{hero.primaryCtaLabel}</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </ServiceCtaLink>

            <a
              href={hero.secondaryCtaHref}
              className="glass-cta-secondary inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-3 font-heading text-small font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              <Eye className="size-4 text-(--glass-cyan)" aria-hidden="true" />
              <span>{hero.secondaryCtaLabel}</span>
            </a>
          </div>

          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-2 font-mono text-caption text-(--glass-text-muted)">
            {hero.highlights.map((item, idx) => (
              <li key={item} className="inline-flex items-center gap-3">
                {idx > 0 && (
                  <span className="text-white/30" aria-hidden="true">
                    ·
                  </span>
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Interactive Glass Browser App Window */}
        <div
          className="relative lg:col-span-6"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div
            ref={frameRef}
            className="glass-card-strong glass-specular relative rounded-lg p-3.5 transition-transform duration-300 ease-out sm:p-5"
          >
            {hero.heroMockImage ? (
              <div className="overflow-hidden rounded-md border border-white/12 bg-black/40">
                <Image
                  src={hero.heroMockImage}
                  alt={hero.heroMockAlt ?? hero.windowUrl}
                  width={760}
                  height={520}
                  priority
                  sizes="(max-width: 1023px) 94vw, 560px"
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <>
                {/* Window Chrome */}
                <div className="mb-3.5 flex items-center justify-between gap-2 rounded-md border border-white/10 bg-white/4 px-3 py-2">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-rose-400/80" />
                    <span className="size-2.5 rounded-full bg-amber-300/80" />
                    <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="inline-flex max-w-[210px] items-center gap-1.5 truncate rounded bg-white/8 px-2.5 py-1 font-mono text-[11px] text-(--glass-text-muted)">
                    <Lock className="size-3 shrink-0 text-(--glass-cyan)" aria-hidden="true" />
                    <span className="truncate">{hero.windowUrl}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden rounded-full border border-white/12 bg-white/6 px-2 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase sm:inline-block">
                      {hero.sampleLabel}
                    </span>
                    <span
                      aria-hidden="true"
                      className="flex size-7 items-center justify-center rounded-full bg-(--color-peak-violet)/30 font-heading text-[11px] font-semibold text-[#e1c4ff]"
                    >
                      {hero.userInitials}
                    </span>
                  </div>
                </div>

                {/* Inner Workspace Layout */}
                <div className="grid grid-cols-12 gap-3">
                  {/* Compact App Sidebar */}
                  <div
                    aria-hidden="true"
                    className="col-span-4 hidden flex-col gap-1.5 rounded-md border border-white/8 bg-white/3 p-2 sm:col-span-3 sm:flex"
                  >
                    {hero.navItems.map((navLabel, idx) => (
                      <div
                        key={navLabel}
                        className={cn(
                          'flex items-center gap-2 rounded px-2 py-1.5 text-[11px]',
                          idx === 0
                            ? 'bg-(--color-peak-violet)/25 font-medium text-[#e1c4ff]'
                            : 'text-(--glass-text-meta)',
                        )}
                      >
                        <Layers className="size-3 shrink-0" />
                        <span className="truncate">{navLabel}</span>
                      </div>
                    ))}
                  </div>

                  {/* Main Telemetry Area */}
                  <div className="col-span-12 flex flex-col gap-3 sm:col-span-9">
                    <div className="grid grid-cols-3 gap-2">
                      {hero.kpis.map((kpi) => {
                        const tone = getServiceExtendedTone(kpi.tone);
                        return (
                          <div
                            key={kpi.label}
                            className="flex flex-col rounded-md border border-white/10 bg-white/5 p-2.5"
                          >
                            <span className="truncate text-[11px] text-(--glass-text-muted)">
                              {kpi.label}
                            </span>
                            <span className="mt-0.5 font-heading text-small font-semibold text-(--glass-text)">
                              {kpi.value}
                            </span>
                            <span className={cn('mt-0.5 font-mono text-[10px]', tone.text)}>
                              {kpi.meta}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Volume Area Chart */}
                    <div className="rounded-md border border-white/10 bg-white/4 p-3">
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium text-(--glass-text-muted)">
                          {hero.chartTitle}
                        </span>
                        <span className="font-mono text-[10px] text-(--glass-cyan)">
                          {hero.chartTag}
                        </span>
                      </div>
                      <div className="h-14 w-full">
                        <svg
                          viewBox="0 0 320 64"
                          preserveAspectRatio="none"
                          className="h-full w-full"
                          aria-hidden="true"
                        >
                          <defs>
                            <linearGradient id="appWindowAreaFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#a743f8" stopOpacity="0.38" />
                              <stop offset="100%" stopColor="#480bb4" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0,52 Q40,38 80,44 T160,20 T240,28 T320,10 L320,64 L0,64 Z"
                            fill="url(#appWindowAreaFill)"
                          />
                          <path
                            d="M0,52 Q40,38 80,44 T160,20 T240,28 T320,10"
                            fill="none"
                            stroke="#c38bff"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle cx="160" cy="20" r="3" fill="#4cd7f6" />
                          <circle cx="320" cy="10" r="3" fill="#e1c4ff" />
                        </svg>
                      </div>
                    </div>

                    {/* Sample Workflow Rows */}
                    <div className="rounded-md border border-white/10 bg-white/3 p-2.5">
                      <table className="w-full text-left text-[11px]">
                        <thead>
                          <tr className="border-b border-white/8 font-mono text-[10px] text-(--glass-text-meta) uppercase">
                            <th className="px-1.5 pb-1 font-normal">Record</th>
                            <th className="px-1.5 pb-1 font-normal">Workflow</th>
                            <th className="px-1.5 pb-1 text-right font-normal">State</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/6 text-(--glass-text)">
                          {hero.orders.map((order) => {
                            const tone = getServiceExtendedTone(order.tone);
                            return (
                              <tr key={order.id}>
                                <td className="px-1.5 py-1.5 font-mono text-(--glass-text-muted)">
                                  {order.id}
                                </td>
                                <td className="px-1.5 py-1.5">{order.label}</td>
                                <td className="px-1.5 py-1.5 text-right">
                                  <span
                                    className={cn(
                                      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px]',
                                      tone.badge,
                                    )}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end sm:hidden">
                      <span className="rounded-full border border-white/12 bg-white/6 px-2 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase">
                        {hero.sampleLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Floating Notification Chips (placed cleanly below card on narrow screens, overlapping corners on md+) */}
          {hero.toasts[0] && (
            <div className="glass-card-strong mt-3 flex items-center gap-2 rounded-full px-3.5 py-2 text-caption md:absolute md:-top-4 md:right-3 md:mt-0">
              <span
                className={cn(
                  'size-2 rounded-full',
                  hero.toasts[0].tone === 'emerald' ? 'bg-emerald-400' : 'bg-(--glass-cyan)',
                )}
                aria-hidden="true"
              />
              <span className="font-medium text-(--glass-text)">{hero.toasts[0].title}</span>
              <span className="font-mono text-(--glass-emerald)">{hero.toasts[0].detail}</span>
            </div>
          )}

          {hero.toasts[1] && (
            <div className="glass-card-strong mt-2 flex items-center gap-2 rounded-full px-3.5 py-2 text-caption md:absolute md:-bottom-4 md:left-3 md:mt-0">
              <CheckCircle2 className="size-3.5 text-(--glass-cyan)" aria-hidden="true" />
              <span className="font-medium text-(--glass-text)">{hero.toasts[1].title}</span>
              <span className="font-mono text-(--glass-cyan)">{hero.toasts[1].detail}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
