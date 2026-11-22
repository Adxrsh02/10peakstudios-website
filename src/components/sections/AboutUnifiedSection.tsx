'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ABOUT_TABS } from '@/data/about-section';
import { OrbitalDomeBanner } from './about/OrbitalDomeBanner';

export const AboutUnifiedSection: React.FC = () => {
  const defaultTab = ABOUT_TABS[0] as (typeof ABOUT_TABS)[number];
  const [activeTabId, setActiveTabId] = useState<string>(defaultTab.id);

  const activeTab = ABOUT_TABS.find((t) => t.id === activeTabId) ?? defaultTab;

  return (
    <section
      id="about-unified"
      aria-labelledby="about-unified-heading"
      className="relative w-full overflow-hidden bg-[#020B14] py-20 text-white sm:py-24 lg:py-28"
    >
      {/* 1. Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* 2. Ambient Top Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[750px] -translate-x-1/2 rounded-full bg-[#29559D]/20 blur-[120px]"
      />

      {/* 3. Floating Dust Micro-Particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute top-1/4 left-1/5 size-1 animate-pulse rounded-full bg-white/20" />
        <span className="absolute top-1/3 right-1/4 size-1.5 animate-pulse rounded-full bg-[#EBC040]/30" />
        <span className="absolute bottom-1/4 left-1/3 size-1 animate-pulse rounded-full bg-[#6EC1E4]/25" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* HEADER BLOCK                                                   */}
        {/* ============================================================== */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow with Dot */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-3.5 inline-flex items-center justify-center gap-2 font-['Montserrat',sans-serif] text-xs font-semibold tracking-[0.16em] text-[#29559D] uppercase sm:text-sm"
          >
            <span className="size-2 rounded-full bg-[#29559D]" />
            <span>ABOUT 10PEAKSTUDIOS</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            id="about-unified-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-['Montserrat',sans-serif] text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            We Bring Strategy, Operations, And Technology Into{' '}
            <span className="bg-gradient-to-r from-[#29559D] via-[#6EC1E4] to-[#EBC040] bg-clip-text text-transparent">
              One Unified Direction
            </span>
          </motion.h2>
        </div>

        {/* ============================================================== */}
        {/* TAB NAVIGATION BAR & CONTENT CONTAINER                         */}
        {/* ============================================================== */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md sm:mt-16">
          {/* Segmented Tab Headers */}
          <div
            role="tablist"
            aria-label="About 10PeakStudios Principles"
            className="grid grid-cols-3 border-b border-white/[0.08] bg-white/[0.01]"
          >
            {ABOUT_TABS.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`relative flex items-center justify-center px-3 py-4 text-center font-['Manrope',sans-serif] text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EBC040] sm:py-5 sm:text-base ${
                    isActive
                      ? 'text-[#EBC040]'
                      : 'text-white/60 hover:bg-white/[0.02] hover:text-white/90'
                  }`}
                >
                  <span>{tab.tabLabel}</span>

                  {/* Active Tab Underline Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-[#EBC040] to-transparent shadow-[0_0_12px_#EBC040]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display Area */}
          <div className="p-6 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                role="tabpanel"
                id={`panel-${activeTab.id}`}
                aria-labelledby={`tab-${activeTab.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
              >
                {/* Left Column: Heading, Paragraph, and Value Checkpoints */}
                <div>
                  <h3 className="font-['Montserrat',sans-serif] text-2xl leading-snug font-bold text-[#EBC040] sm:text-3xl">
                    {activeTab.heading}
                  </h3>

                  <p className="mt-4 font-['Roboto',sans-serif] text-base leading-relaxed text-[#9AA4B2]">
                    {activeTab.description}
                  </p>

                  {/* Checkpoint Value Propositions */}
                  <div className="mt-8 space-y-4">
                    {activeTab.bulletPoints.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3.5">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#5B58E7]/15 text-[#5B58E7]">
                          {/* Distinctive Reference Vector Checkmark */}
                          <svg
                            viewBox="0 0 19 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-3.5 stroke-[#6EC1E4]"
                          >
                            <path
                              d="M18.128 2.02608C18.5016 3.03863 17.9777 3.73186 16.9638 4.41472C16.1457 4.96569 15.1034 5.56258 13.999 6.58306C12.9164 7.58341 11.8597 8.78828 10.9207 9.97426C9.98554 11.1554 9.19069 12.2875 8.62902 13.1258C8.26607 13.6674 7.75962 14.4755 7.75962 14.4755C7.40246 15.0674 6.76033 15.4258 6.0718 15.4168C5.38312 15.4078 4.75057 15.0331 4.40887 14.4316C3.53537 12.8943 2.86134 12.2872 2.55155 12.0691C1.72263 11.4856 0.75 11.3993 0.75 10.0393C0.75 8.95942 1.62053 8.08391 2.69439 8.08391C3.45254 8.11325 4.15723 8.42556 4.78162 8.86519C5.18073 9.14615 5.60353 9.51776 6.0433 10.0069C6.55942 9.26944 7.18139 8.4185 7.87863 7.53795C8.89118 6.2592 10.0863 4.8873 11.368 3.70303C12.628 2.53886 14.0846 1.44913 15.6287 0.872964C16.6355 0.497278 17.7545 1.01355 18.128 2.02608Z"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <span className="font-['Roboto',sans-serif] text-sm leading-normal font-medium text-white/90 sm:text-[15px]">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Visual Interactive Graphic */}
                <div className="flex items-center justify-center">
                  <OrbitalDomeBanner />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
