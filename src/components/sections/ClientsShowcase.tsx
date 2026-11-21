'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VERIFIED_CLIENTS } from '@/data/clients';
import { MarqueeTrack } from './clients/MarqueeTrack';

export function ClientsShowcase() {
  return (
    <section
      id="clients-section"
      aria-labelledby="clients-heading"
      className="relative w-full overflow-hidden bg-[#020B14] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* 1. Background Grid Coordinates */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* 2. Top-Center Ambient Glow Illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[450px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#29559D]/25 via-[#6EC1E4]/10 to-transparent blur-[120px]"
      />

      {/* 3. Floating Micro-Particles Simulation */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-1/4 left-1/6 h-1 w-1 animate-pulse rounded-full bg-white/20" />
        <span className="absolute top-1/3 right-1/4 h-1.5 w-1.5 animate-ping rounded-full bg-[#EBC040]/30 duration-1000" />
        <span className="absolute bottom-1/4 left-1/3 h-1 w-1 animate-pulse rounded-full bg-[#6EC1E4]/25" />
        <span className="absolute top-2/3 right-1/6 h-1 w-1 animate-pulse rounded-full bg-white/20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-4 inline-flex items-center justify-center font-['Montserrat',sans-serif] text-sm font-semibold tracking-wider text-[#EBC040]"
          >
            <span>[ Our Clients ]</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            id="clients-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mb-6 font-['Montserrat',sans-serif] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Trusted By Growing Businesses &{' '}
            <span className="bg-gradient-to-r from-[#29559D] via-[#6EC1E4] to-[#EBC040] bg-clip-text text-transparent">
              Global Teams
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto max-w-2xl font-['Roboto',sans-serif] text-base leading-relaxed text-[#9AA4B2] sm:text-lg"
          >
            Global businesses trust Unithink Technologies when it matters most to build digital
            products, automate their operations, and deploy intelligent AI systems that drive real,
            measurable growth.
          </motion.p>
        </div>

        {/* 4. Dual-Row Opposing Marquee Container with Edge Fade Masks */}
        <div
          className="relative mt-14 w-full space-y-5 sm:mt-16"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, black 18%, black 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 6%, black 18%, black 82%, rgba(0,0,0,0.4) 94%, transparent 100%)',
          }}
        >
          {/* Row 1: Scrolling Left */}
          <MarqueeTrack
            clients={VERIFIED_CLIENTS}
            direction="left"
            speedDuration={32}
            pauseOnHover={true}
          />

          {/* Row 2: Scrolling Right (Opposing Dynamic Motion) */}
          <MarqueeTrack
            clients={VERIFIED_CLIENTS}
            direction="right"
            speedDuration={32}
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}
