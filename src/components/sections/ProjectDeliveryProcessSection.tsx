'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ProcessStep {
  id: number;
  stepNumber: string;
  pillTitle: string;
  cardTitle: string;
  description: string;
  icon: React.ReactNode;
}

export const DELIVERY_STEPS: ProcessStep[] = [
  {
    id: 1,
    stepNumber: '01',
    pillTitle: '1. Discover & Assess',
    cardTitle: 'Business Understanding',
    description:
      'We start by understanding your business model, goals, and operational challenges. Doing so will give us a clear picture of where technology can genuinely support your growth and efficiency before any solution we propose.',
    icon: (
      // Discussion / Discovery Speech Bubble with Dots
      <svg
        className="h-7 w-7 text-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="8" cy="10" r="0.8" fill="currentColor" />
        <circle cx="12" cy="10" r="0.8" fill="currentColor" />
        <circle cx="16" cy="10" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 2,
    stepNumber: '02',
    pillTitle: '2. Design Strategy',
    cardTitle: 'Solution Architecture',
    description:
      'We design the overall system structure and technology architecture required to solve the identified business problems, built for performance, scalability, and long-term reliability.',
    icon: (
      // Shield / Security Blueprint Architecture
      <svg
        className="h-7 w-7 text-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    id: 3,
    stepNumber: '03',
    pillTitle: '3. Implement & Integrate',
    cardTitle: 'Custom Development',
    description:
      'Our team develops custom platforms, applications, and automation systems built specifically around your business operations, not off-the-shelf templates adapted to fit.',
    icon: (
      // Code / Integration Brackets with Spark
      <svg
        className="h-7 w-7 text-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
  {
    id: 4,
    stepNumber: '04',
    pillTitle: '4. Optimise & Support',
    cardTitle: 'Performance Monitoring',
    description:
      'We monitor system performance and usage patterns post-launch to ensure everything operates smoothly, catches issues early, and keeps delivering the results you expect.',
    icon: (
      // Activity / Performance Gauge Wave
      <svg
        className="h-7 w-7 text-current"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

// Connecting Arrow SVG between Step Pills
const StepConnectorArrow = () => (
  <div
    className="pointer-events-none absolute top-1/2 -right-9 z-10 hidden -translate-y-1/2 lg:block"
    aria-hidden="true"
  >
    <svg width="28" height="12" viewBox="0 0 28 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.5 6L17.5 11.1962L17.5 0.803848L27.5 6Z" fill="#8d8ca4" fillOpacity="0.85" />
      <rect y="5" width="18" height="2" fill="url(#delivery-arrow-grad)" />
      <defs>
        <linearGradient
          id="delivery-arrow-grad"
          x1="0"
          y1="6"
          x2="18"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8d8ca4" stopOpacity="0" />
          <stop offset="1" stopColor="#8d8ca4" stopOpacity="0.85" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export function ProjectDeliveryProcessSection() {
  const [activeStepId, setActiveStepId] = useState<number>(1);

  return (
    <section
      id="how-we-work"
      className="relative w-full overflow-hidden bg-[#F6F8FC] px-4 py-14 sm:px-5 sm:py-20 lg:py-24"
      aria-labelledby="delivery-process-heading"
    >
      {/* 1. Subtle Ambient Grid & Soft Top Radial Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <defs>
            <pattern id="delivery-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(20, 17, 30, 0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#delivery-grid)" />
        </svg>
      </div>

      <div
        className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(41,85,157,0.08)_0%,_rgba(246,248,252,0)_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        {/* 2. Section Header */}
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block font-mono text-xs font-medium tracking-[0.08em] text-[#b45309] uppercase sm:text-sm"
          >
            [ How we work ]
          </motion.div>

          <motion.h2
            id="delivery-process-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 text-3xl leading-[1.18] font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[50px]"
          >
            Our Project{' '}
            <span className="bg-gradient-to-r from-[#29559D] via-[#1E7AB8] to-[#C08B0E] bg-clip-text text-transparent">
              Delivery Process
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[780px] text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
          >
            A clear, proven process that takes your business challenge and turns it into a working,
            measurable solution, one we design together, deliver reliably, and build to perform long
            after launch.
          </motion.p>
        </div>

        {/* 3. Interactive Stepper Navigation (Step Pills) */}
        <div className="mb-12 flex w-full justify-center md:mb-16">
          <div
            role="tablist"
            aria-label="Project delivery process steps"
            className="flex flex-wrap items-center justify-center gap-2 rounded-xl border border-black/[0.08] bg-white p-1.5 shadow-sm sm:gap-3 lg:flex-nowrap lg:gap-10"
          >
            {DELIVERY_STEPS.map((step, index) => {
              const isActive = activeStepId === step.id;
              const isLast = index === DELIVERY_STEPS.length - 1;

              return (
                <div key={step.id} className="relative flex items-center">
                  <button
                    type="button"
                    role="tab"
                    id={`delivery-step-${step.id}`}
                    aria-selected={isActive}
                    aria-controls={`delivery-panel-${step.id}`}
                    onClick={() => setActiveStepId(step.id)}
                    className={`relative z-10 rounded-lg px-5 py-3 text-xs font-medium whitespace-nowrap transition-colors duration-200 outline-none sm:px-7 sm:text-sm md:text-[15px] ${
                      isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span>{step.pillTitle}</span>

                    {/* Animated Sliding Pill Background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeDeliveryPill"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                        className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-[#29559D] via-[#30316B] to-[#9A7008] shadow-[0_4px_16px_rgba(41,85,157,0.25)]"
                      />
                    )}
                  </button>

                  {/* Inter-step Animated Arrow Graphic */}
                  {!isLast && <StepConnectorArrow />}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Process Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {DELIVERY_STEPS.map((step, index) => {
            const isSelected = activeStepId === step.id;

            return (
              <motion.div
                key={step.id}
                id={`delivery-panel-${step.id}`}
                role="tabpanel"
                aria-labelledby={`delivery-step-${step.id}`}
                tabIndex={0}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActiveStepId(step.id)}
                onClick={() => setActiveStepId(step.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepId(step.id);
                  }
                }}
                className={`group relative flex cursor-pointer flex-col rounded-3xl border bg-white p-7 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#29559D] md:p-8 ${
                  isSelected
                    ? '-translate-y-2 border-[#29559D]/40 shadow-[0_16px_36px_-8px_rgba(41,85,157,0.12),0_4px_16px_rgba(235,192,64,0.12)] ring-1 ring-[#29559D]/20'
                    : 'border-black/[0.07] shadow-sm hover:-translate-y-1.5 hover:border-[#29559D]/30 hover:shadow-[0_12px_28px_-8px_rgba(41,85,157,0.08),0_2px_8px_rgba(235,192,64,0.08)]'
                }`}
              >
                {/* Step Number Watermark */}
                <span className="absolute top-6 right-7 font-mono text-xs font-bold tracking-widest text-[#8d8ca4] transition-colors group-hover:text-[#29559D]">
                  {step.stepNumber}
                </span>

                {/* Circular Dual-Ring Icon Sphere */}
                <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#8A7EDB]/40 bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-[#F0EEFF] shadow-inner">
                    <div className="transform text-[#29559D] transition-transform duration-300 group-hover:scale-110">
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Step Title */}
                <h4 className="mb-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-[#29559D] sm:text-[22px]">
                  {step.cardTitle}
                </h4>

                {/* Step Description */}
                <p className="flex-grow text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {step.description}
                </p>

                {/* Bottom Active Glow Accent */}
                <div
                  className={`mt-6 h-[2px] rounded-full transition-all duration-300 ${
                    isSelected
                      ? 'w-20 bg-gradient-to-r from-[#29559D] to-[#EBC040] shadow-[0_0_8px_rgba(41,85,157,0.3)]'
                      : 'w-12 bg-black/[0.08] group-hover:w-16 group-hover:bg-[#29559D]/40'
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
