'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Shield, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES } from '@/data/feature-showcase';
import { FingerprintGraphic } from '@/components/ui/FingerprintGraphic';
import type { VaultSecurityState } from '@/types/feature-showcase';

export function ConfidentialVault() {
  const [securityState, setSecurityState] = useState<VaultSecurityState>('locked');

  // Trigger scanning timer transition
  useEffect(() => {
    if (securityState !== 'scanning') return;
    const timer = setTimeout(() => {
      setSecurityState('unlocked');
    }, 1100);
    return () => clearTimeout(timer);
  }, [securityState]);

  const isUnlocked = securityState === 'unlocked';

  const handleTriggerAuth = () => {
    if (securityState === 'scanning') return;
    setSecurityState(isUnlocked ? 'locked' : 'scanning');
  };

  return (
    <div className="relative mt-16 grid items-center gap-10 rounded-[28px] border border-[rgba(18,19,26,0.08)] bg-white p-6 shadow-[0_1px_2px_rgba(18,19,26,0.04),0_12px_40px_-12px_rgba(18,19,26,0.10)] sm:p-10 lg:grid-cols-[1fr_1.15fr]">
      {/* Left Column: Narrative Copy */}
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(18,19,26,0.08)] bg-[#F8F7F4] px-3.5 py-1.5 text-xs font-semibold text-[#646879]">
          <Shield className="size-3.5 text-[#8B5CF6]" />
          <span>Client Architecture Vault</span>
        </span>

        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-[#12131A] sm:text-4xl">
          Proprietary systems are <br />
          <span className="text-brand font-serif italic">strictly confidential.</span>
        </h3>

        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-[#646879] sm:text-[17px]">
          We engineer bespoke platforms, automated operational workflows, and private SaaS
          infrastructure for high-growth enterprises. Sensitive architecture and performance metrics
          remain encrypted until authenticated.
        </p>

        <p className="mt-6 text-xs font-medium text-[#8E92A2] sm:text-sm">
          Try it: touch the fingerprint scanner to decrypt the client vault.
        </p>

        {/* Redirect CTA to "Security by Design" page */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/security"
            className="group inline-flex items-center gap-2 rounded-pill bg-[#12131A] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#8B5CF6] hover:shadow-lg active:scale-95"
          >
            <span>Explore Security by Design</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <span className="text-xs font-medium text-[#8E92A2]">
            Zero-trust protocols & compliance architecture
          </span>
        </div>
      </div>

      {/* Right Column: macOS-Style Window Preview */}
      <div>
        <div className="overflow-hidden rounded-2xl border border-[rgba(18,19,26,0.14)] bg-[#FBFAF8] shadow-[0_2px_4px_rgba(18,19,26,0.04),0_30px_80px_-20px_rgba(30,34,66,0.16)]">
          {/* Window Header Bar */}
          <div className="flex items-center justify-between border-b border-[rgba(18,19,26,0.08)] bg-white/70 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#12131A]">
              <Lock className="size-4 text-[#8B5CF6]" />
              <span>Restricted Case Studies</span>
              <span className="text-xs font-normal text-[#646879]">
                ({CASE_STUDIES.length} verified projects)
              </span>
            </div>

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={handleTriggerAuth}
              disabled={securityState === 'scanning'}
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(18,19,26,0.08)] bg-white px-3.5 py-1 text-xs font-semibold text-[#12131A] transition hover:border-[rgba(18,19,26,0.20)] hover:bg-[#F8F7F4] active:scale-95 disabled:opacity-60"
            >
              {isUnlocked ? (
                <>
                  <Lock className="size-3.5 text-[#8B5CF6]" />
                  <span>Lock Vault</span>
                </>
              ) : (
                <>
                  <Unlock className="size-3.5 text-[#8B5CF6]" />
                  <span>Unlock</span>
                </>
              )}
            </button>
          </div>

          {/* Window Content Area (Grid & Overlays) */}
          <div className="relative p-3 sm:p-4">
            {/* 6 Grid Case Study Tiles */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3" aria-hidden={!isUnlocked}>
              {CASE_STUDIES.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-black/5 bg-white p-3 shadow-sm sm:aspect-square"
                  animate={{
                    filter: isUnlocked ? 'blur(0px)' : 'blur(18px)',
                    scale: isUnlocked ? 1 : 1.04,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: isUnlocked ? 0.05 * index : 0,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Decorative Project Color Banner */}
                  <div
                    className={`h-1.5 w-full rounded-full bg-gradient-to-r ${item.gradient} mb-2`}
                  />
                  <div className="flex h-[calc(100%-14px)] flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-[#8B5CF6] uppercase">
                        {item.category}
                      </span>
                      <h4 className="mt-0.5 line-clamp-1 text-xs font-semibold text-[#12131A]">
                        {item.title}
                      </h4>
                    </div>
                    <div className="rounded bg-[#F8F7F4] px-1.5 py-1 text-[11px] font-bold text-[#12131A]">
                      {item.metric}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Frosted Privacy Overlay & Fingerprint Button */}
            <AnimatePresence>
              {!isUnlocked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 grid place-items-center bg-[#FBFAF8]/50 backdrop-blur-[4px]"
                >
                  <div className="flex flex-col items-center p-4 text-center">
                    {/* Interactive Biometric Button */}
                    <button
                      type="button"
                      onClick={handleTriggerAuth}
                      disabled={securityState === 'scanning'}
                      aria-label="Unlock case studies with Touch ID"
                      className="group relative grid size-20 place-items-center rounded-full border border-[rgba(18,19,26,0.10)] bg-white shadow-[0_2px_4px_rgba(18,19,26,0.04),0_20px_40px_-10px_rgba(139,92,246,0.25)] transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] active:scale-95"
                    >
                      {/* Scanning Animated Radar Waves */}
                      {securityState === 'scanning' && (
                        <motion.span
                          className="absolute inset-0 rounded-full ring-2 ring-[#8B5CF6]/60"
                          animate={{ scale: [1, 1.45], opacity: [0.9, 0] }}
                          transition={{
                            duration: 0.85,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                      )}

                      {/* Fingerprint Vector */}
                      <FingerprintGraphic
                        className={`size-10 transition-colors duration-300 ${
                          securityState === 'scanning'
                            ? 'text-[#8B5CF6]'
                            : 'text-[#12131A]/70 group-hover:text-[#8B5CF6]'
                        }`}
                        isScanning={securityState === 'scanning'}
                      />
                    </button>

                    {/* Interactive Dynamic Labels */}
                    <div className="mt-4 text-sm font-bold text-[#12131A]">
                      {securityState === 'scanning'
                        ? 'Verifying Biometrics…'
                        : 'Unlock with Touch ID'}
                    </div>
                    <div className="mt-1 text-xs text-[#646879]">
                      Click to authenticate and view confidential architecture
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
