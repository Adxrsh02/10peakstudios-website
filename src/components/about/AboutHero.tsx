import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/Reveal';

export function AboutHero() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative isolate flex min-h-[82vh] items-center justify-center overflow-hidden bg-[#06040A] pt-28 pb-16 text-white sm:pt-32 sm:pb-20 md:min-h-[88vh] lg:pt-36 lg:pb-24"
    >
      {/* Background Image: Next/Image full-bleed with priority for optimal LCP */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://res.cloudinary.com/lta722n4/image/upload/v1795333182/aboutpage_backgropund.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Atmospheric Multi-Layer Darkening & Contrast Scrims */}
      {/* 1. Base dark navy-black gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#080612]/80 via-[#0a0718]/85 to-[#06040a]/95"
      />

      {/* 2. Optical radial vignette ensuring clear focus on center typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(6,4,10,0.85)_100%)]"
      />

      {/* 3. Subtle brand violet atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 z-[3] h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(91,16,224,0.18)_0%,_rgba(91,16,224,0)_70%)] blur-3xl"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center text-center">
          {/* Eyebrow in bracket style */}
          <div data-reveal-item className="mb-4 sm:mb-6">
            <span className="inline-block text-xs font-semibold tracking-[0.22em] text-[#EBC040] uppercase sm:text-sm">
              [ About 10PeakStudio ]
            </span>
          </div>

          {/* Primary H1 Headline */}
          <h1
            id="about-hero-heading"
            data-reveal-item
            className="mx-auto max-w-5xl text-3xl leading-[1.15] font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl sm:leading-[1.12] md:text-5xl md:leading-[1.08] lg:text-6xl xl:text-[4.25rem]"
          >
            Transforming Ambitious Ideas Into{' '}
            <span className="bg-gradient-to-r from-[#4A72FF] via-[#7B5CFA] to-[#EBC040] bg-clip-text text-transparent">
              Scalable Digital Products.
            </span>
          </h1>

          {/* Studio Description Lead */}
          <p
            data-reveal-item
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-normal text-slate-300 sm:mt-7 sm:text-lg md:text-xl"
          >
            10PeakStudio is a premium digital innovation and technology studio. We engineer bespoke
            web applications, automated workflows, and high-performance digital platforms that help
            ambitious businesses launch, automate, and scale.
          </p>

          {/* Two Action CTAs */}
          <div
            data-reveal-item
            className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full shadow-[0_0_25px_rgba(91,16,224,0.4)] transition-all hover:shadow-[0_0_35px_rgba(91,16,224,0.6)] sm:w-auto"
            >
              <Link href="/contact" data-cta-location="about_hero">
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>

            <Link
              href="/services"
              data-cta-location="about_hero_secondary"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-pill border border-white/20 bg-white/10 px-7 font-sans text-[1.0625rem] font-semibold text-white backdrop-blur-md transition-all hover:border-white/35 hover:bg-white/15 active:bg-white/20 sm:w-auto"
            >
              Explore Our Services
              <ArrowUpRight className="size-4 opacity-80" aria-hidden="true" />
            </Link>
          </div>

          {/* Pillar Navigation Chips */}
          <div
            data-reveal-item
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:mt-10 sm:gap-3"
          >
            <Link
              href="/services#build"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white sm:text-sm"
            >
              <span className="size-1.5 rounded-full bg-[#6EC1E4]" aria-hidden="true" />
              Build
            </Link>
            <span className="hidden text-xs text-white/20 sm:inline" aria-hidden="true">
              •
            </span>
            <Link
              href="/services#automate"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white sm:text-sm"
            >
              <span className="size-1.5 rounded-full bg-[#7B5CFA]" aria-hidden="true" />
              Automate
            </Link>
            <span className="hidden text-xs text-white/20 sm:inline" aria-hidden="true">
              •
            </span>
            <Link
              href="/services#grow"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/25 hover:text-white sm:text-sm"
            >
              <span className="size-1.5 rounded-full bg-[#EBC040]" aria-hidden="true" />
              Grow
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
