'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PILL_BADGES } from '@/data/feature-showcase';
import { OrbitalSystem } from './showcase/OrbitalSystem';
import { ConfidentialVault } from './showcase/ConfidentialVault';

export function ShowcaseSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative scroll-mt-24 bg-[#F8F7F4] px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Master 36px Rounded Card Container */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-[rgba(18,19,26,0.08)] bg-white/75 px-6 py-14 shadow-[0_1px_2px_rgba(18,19,26,0.04),0_12px_40px_-12px_rgba(18,19,26,0.10)] backdrop-blur-xl sm:px-12 sm:py-20">
        {/* Subtle Ambient Radial Gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(50%_60%_at_85%_50%,rgba(139,92,246,0.12),transparent),radial-gradient(40%_50%_at_0%_0%,rgba(242,120,92,0.08),transparent)]"
        />

        {/* ============================================================== */}
        {/* FEATURE 1: ENGINE ARCHITECTURE & ORBITAL DISPLAY               */}
        {/* ============================================================== */}
        <div className="relative grid items-center gap-14 lg:grid-cols-2">
          {/* Left Column: Heading & Value Badges */}
          <div>
            <motion.h2
              id="features-heading"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-4xl font-semibold tracking-[-0.035em] text-[#12131A] sm:text-5xl lg:text-6xl"
            >
              Every system built <br />
              <span className="text-brand font-serif italic">for your growth.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="mt-5 max-w-md text-base leading-relaxed text-[#646879] sm:text-lg"
            >
              Every line of code, automated workflow, and custom interface is crafted specifically
              for your business. No bloated templates. No third-party lock-in.
            </motion.p>

            {/* Feature Capability Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap gap-2.5"
            >
              {PILL_BADGES.map((badge) => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,19,26,0.08)] bg-white px-3.5 py-2 text-sm font-semibold text-[#12131A] shadow-[0_1px_2px_rgba(18,19,26,0.04),0_8px_20px_-4px_rgba(18,19,26,0.08)]"
                >
                  <badge.icon className="size-4 text-[#8B5CF6]" />
                  <span>{badge.label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Orbital Animation System */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <OrbitalSystem />
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* FEATURE 2: INSET CONFIDENTIAL VAULT WITH TOUCH ID UNLOCK       */}
        {/* ============================================================== */}
        <ConfidentialVault />
      </div>
    </section>
  );
}
