'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, MapPin, Pause, Play, Radar, SlidersHorizontal } from 'lucide-react';
import type { SignalHeroData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { sanitizeBrandSimInput } from '@/lib/digital-marketing-quiz';
import { useDigitalMarketingSimulator } from './DigitalMarketingSimulator';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';

type SignalHeroProps = {
  slug: string;
  data: SignalHeroData;
};

/**
 * Interactive Digital Marketing hero with brand + city client-side simulator inputs
 * sharing state with VisibilityLadder, plus an animated SVG/CSS signal radar card
 * that pauses offscreen, on hidden tab, on hover/focus, and via an explicit toggle.
 */
export function SignalHero({ slug, data }: SignalHeroProps) {
  const { updateSimulation } = useDigitalMarketingSimulator();
  const [brandInput, setBrandInput] = useState(data.defaultBrand);
  const [cityInput, setCityInput] = useState(data.defaultCity);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = radarRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) setInView(entries[0].isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const previewBrand = sanitizeBrandSimInput(brandInput, 40, data.defaultBrand);
  const previewCity = sanitizeBrandSimInput(cityInput, 30, data.defaultCity);
  const effectivePaused = paused || !inView || tabHidden;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateSimulation(brandInput, cityInput);
    track('brand_simulator_used', { service_slug: slug });
    const ladder = document.getElementById('visibility-ladder');
    ladder?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      aria-labelledby="service-hero-heading"
      className="relative pt-10 pb-4 sm:pt-14 lg:pt-16 lg:pb-8"
    >
      <div className="flex max-w-4xl flex-col items-start gap-5">
        <div className="glass-card inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-caption font-medium tracking-wider text-(--glass-text-muted) uppercase">
          <span className="size-2 rounded-full bg-(--glass-cyan)" aria-hidden="true" />
          <span className="font-mono text-[#c38bff]">{data.eyebrowPillar}</span>
          <span className="text-white/30" aria-hidden="true">
            /
          </span>
          <span>{data.eyebrowService}</span>
        </div>

        <h1
          id="service-hero-heading"
          className="m-0 font-heading text-[2.35rem] leading-[1.08] font-semibold tracking-[-0.03em] text-(--glass-text) sm:text-[3rem] lg:text-[3.75rem]"
        >
          <span className="service-hero-line-1 block">{data.titleLead}</span>{' '}
          <span className="glass-gradient-text service-hero-line-2 block">{data.titleAccent}</span>
        </h1>

        <p className="max-w-2xl text-body leading-relaxed text-(--glass-text-muted) sm:text-[1.125rem]">
          {data.summary}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:mt-10 lg:grid-cols-12">
        {/* Left: Interactive Brand Simulator Form */}
        <div className="glass-card-strong glass-specular flex flex-col justify-between rounded-lg p-5 sm:p-7 lg:col-span-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
                {data.simulatorTitle}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-(--glass-cyan)">
                <SlidersHorizontal className="size-3.5" aria-hidden="true" />
                {data.simulatorTag}
              </span>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="dm-brand-input"
                className="block font-heading text-small font-medium text-(--glass-text)"
              >
                {data.brandLabel}
              </label>
              <div className="relative">
                <Radar
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-(--glass-text-meta)"
                  aria-hidden="true"
                />
                <input
                  id="dm-brand-input"
                  name="brand"
                  type="text"
                  maxLength={40}
                  value={brandInput}
                  onChange={(e) => setBrandInput(e.target.value)}
                  placeholder={data.brandPlaceholder}
                  className="min-h-12 w-full rounded-md border border-white/15 bg-[#0b0912]/80 pr-4 pl-10 text-base text-(--glass-text) placeholder:text-(--glass-text-meta) focus:border-[#c38bff] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="dm-city-input"
                className="block font-heading text-small font-medium text-(--glass-text)"
              >
                {data.cityLabel}
              </label>
              <div className="relative">
                <MapPin
                  className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-(--glass-text-meta)"
                  aria-hidden="true"
                />
                <input
                  id="dm-city-input"
                  name="city"
                  type="text"
                  maxLength={30}
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder={data.cityPlaceholder}
                  className="min-h-12 w-full rounded-md border border-white/15 bg-[#0b0912]/80 pr-4 pl-10 text-base text-(--glass-text) placeholder:text-(--glass-text-meta) focus:border-[#c38bff] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="glass-cta-primary mt-1 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-small font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              <span>{data.submitLabel}</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>

            <p className="text-center font-mono text-[11px] text-(--glass-text-meta)">
              {data.privacyNote}
            </p>
          </form>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
            <a
              href={data.secondaryCtaHref}
              className="glass-cta-secondary inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-center font-heading text-small font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              {data.secondaryCtaLabel}
            </a>
            <a
              href={data.tertiaryCtaHref}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full px-4 py-2.5 text-center font-heading text-small font-medium text-(--glass-text-muted) transition-colors hover:text-(--glass-text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              {data.tertiaryCtaLabel}
            </a>
          </div>
        </div>

        {/* Right: Signal Beacon Visual Core */}
        <div
          ref={radarRef}
          data-paused={effectivePaused ? 'true' : 'false'}
          className="glass-card-strong relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-lg p-6 lg:col-span-6"
        >
          <div className="absolute top-3.5 right-3.5 z-20">
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused ? 'Resume signal animation' : 'Pause signal animation'}
              onClick={() => setPaused((p) => !p)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/6 px-3 py-1 font-mono text-[10px] text-(--glass-text-muted) hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              {paused ? (
                <>
                  <Play className="size-3" aria-hidden="true" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="size-3" aria-hidden="true" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>

          {/* Lightweight SVG + CSS Signal Rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="service-signal-pulse absolute size-64 rounded-full border border-[#c38bff]/25 sm:size-80" />
            <div className="size-52 rounded-full border border-[#c38bff]/20 sm:size-64" />
            <div className="size-36 rounded-full border border-(--glass-cyan)/25" />
            <div
              className="service-radar-sweep absolute size-72 rounded-full opacity-55"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(76, 215, 246, 0.14) 48deg, transparent 72deg)',
              }}
            />
          </div>

          {/* Central Brand Beacon */}
          <div className="relative z-10 flex flex-col items-center gap-2 text-center">
            <div className="flex size-18 items-center justify-center rounded-full border border-[#c38bff]/55 bg-[#8e21fc]/25 shadow-[0_0_32px_rgb(142_33_252/0.45)]">
              <Radar className="size-8 text-[#e1c4ff]" aria-hidden="true" />
            </div>
            <div className="font-heading text-h5 font-semibold text-(--glass-text)">
              {previewBrand}
            </div>
            <div className="font-mono text-[11px] tracking-wider text-(--glass-cyan) uppercase">
              Signal target · {previewCity}
            </div>
          </div>

          {/* Decorative Corner Signal Chips */}
          <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:gap-2.5">
            {data.radarBadges.map((badge) => {
              const tone = getServiceAccent(badge.tone);
              return (
                <div
                  key={badge.label}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-(--glass-text)"
                >
                  <ServiceIcon name={badge.icon} className={cn('size-3.5 shrink-0', tone.text)} />
                  <span className="truncate">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
