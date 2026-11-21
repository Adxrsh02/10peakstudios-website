'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ORBITAL_NODES } from '@/data/feature-showcase';

export function OrbitalSystem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px] select-none">
      {/* 1. Ambient Radial Core Glow */}
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.15),transparent)]" />

      {/* 2. Outer Dashed Orbit (Rotating Counter-Clockwise) */}
      <div className="absolute inset-0 animate-[turn_120s_linear_infinite_reverse] rounded-full border border-dashed border-[rgba(18,19,26,0.14)]" />

      {/* 3. Inner Solid Orbit (Rotating Clockwise) */}
      <div className="absolute inset-[12%] animate-[turn_60s_linear_infinite] rounded-full border border-[rgba(18,19,26,0.08)]">
        {/* Floating Orbital Node Pills */}
        {ORBITAL_NODES.map((node, index) => {
          const total = ORBITAL_NODES.length;
          const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
          const leftPercent = 50 + 50 * Math.cos(angle);
          const topPercent = 50 + 50 * Math.sin(angle);

          return (
            <div
              key={node.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 animate-[turn_60s_linear_infinite_reverse] items-center gap-2 rounded-full border border-[rgba(18,19,26,0.08)] bg-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-[#12131A] shadow-[0_1px_2px_rgba(18,19,26,0.04),0_8px_24px_-4px_rgba(18,19,26,0.10)]"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
            >
              <node.icon className="size-3.5 text-[#8B5CF6]" />
              <span className="hidden sm:inline">{node.label}</span>
            </div>
          );
        })}
      </div>

      {/* 4. Center Core Brand Badge */}
      <div className="absolute inset-[32%] grid place-items-center rounded-[28%] border border-[rgba(18,19,26,0.08)] bg-white shadow-[0_2px_4px_rgba(18,19,26,0.04),0_30px_80px_-20px_rgba(30,34,66,0.16)]">
        <div className="text-center">
          <div className="relative mx-auto size-14">
            {/* Pulsing Core Ring */}
            <span className="absolute inset-0 animate-[ring_2.4s_ease-out_infinite] rounded-2xl ring-2 ring-[#8B5CF6]/35" />
            <div className="relative grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#A855F7] to-[#EC6F9A] text-white shadow-lg">
              <ShieldCheck className="size-7" />
            </div>
          </div>
          <div className="mt-2.5 font-['Montserrat',sans-serif] text-xs font-bold tracking-wider text-[#12131A] uppercase">
            10Peak Core
          </div>
        </div>
      </div>

      {/* 5. Verified Floating Badge at Bottom */}
      <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-[40%] items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-white px-4 py-1.5 text-xs font-semibold whitespace-nowrap text-[#8B5CF6] shadow-[0_1px_2px_rgba(18,19,26,0.04),0_12px_40px_-12px_rgba(18,19,26,0.12)]">
        <CheckCircle2 className="size-4 text-[#8B5CF6]" />
        <span>100% Tailored Architecture • Zero Bloat</span>
      </div>
    </div>
  );
}
