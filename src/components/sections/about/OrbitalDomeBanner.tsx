'use client';

import React from 'react';
import { Zap, Activity, Layers, Cpu, Sparkles, Orbit } from 'lucide-react';

export const OrbitalDomeBanner: React.FC = () => {
  return (
    <div className="relative mx-auto flex aspect-[503/401] w-full max-w-[480px] items-center justify-center select-none">
      {/* Semicircular Horizon Dome Background */}
      <div className="absolute bottom-0 h-[260px] w-full overflow-hidden">
        {/* Deep Violet Illuminated Dome */}
        <div className="absolute inset-x-8 bottom-0 h-[220px] rounded-t-full border-t border-white/10 bg-gradient-to-t from-[#2A274E]/80 via-[#1E1B38]/60 to-transparent shadow-[0_-20px_50px_rgba(91,88,231,0.25)]" />
      </div>

      {/* Dashed Orbital Track Arc */}
      <svg
        viewBox="0 0 500 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d="M 60 260 A 200 180 0 0 1 440 260"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="animate-[dash_12s_linear_infinite]"
        />
      </svg>

      {/* Floating Orbital Node Badges */}
      {/* 1. Left Small Badge */}
      <div className="absolute bottom-[32%] left-[12%] animate-[float_3.9s_ease-in-out_infinite] [animation-delay:-0.8s]">
        <div className="group flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#34304E] text-[#6EC1E4] shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#6EC1E4] hover:shadow-[0_0_20px_rgba(110,193,228,0.5)]">
          <Activity className="size-4" />
        </div>
      </div>

      {/* 2. Left Medium Badge */}
      <div className="absolute top-[24%] left-[24%] animate-[float_3.6s_ease-in-out_infinite] [animation-delay:-0.4s]">
        <div className="group flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#34304E] text-[#8B5CF6] shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]">
          <Layers className="size-5" />
        </div>
      </div>

      {/* 3. Top Center Prominent Badge */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 animate-[float_3.4s_ease-in-out_infinite]">
        <div className="group flex size-14 cursor-pointer items-center justify-center rounded-full border border-[#8B5CF6]/50 bg-[#2A274E] text-white shadow-[0_0_25px_rgba(91,88,231,0.4)] transition-all duration-300 hover:scale-110 hover:border-[#EBC040] hover:shadow-[0_0_30px_rgba(235,192,64,0.6)]">
          <Sparkles className="size-6 text-[#EBC040]" />
        </div>
      </div>

      {/* 4. Right Medium Badge */}
      <div className="absolute top-[24%] right-[24%] animate-[float_3.7s_ease-in-out_infinite] [animation-delay:-1.15s]">
        <div className="group flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#34304E] text-[#6EC1E4] shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#6EC1E4] hover:shadow-[0_0_25px_rgba(110,193,228,0.5)]">
          <Cpu className="size-5" />
        </div>
      </div>

      {/* 5. Right Small Badge */}
      <div className="absolute right-[12%] bottom-[32%] animate-[float_3.8s_ease-in-out_infinite] [animation-delay:-0.65s]">
        <div className="group flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[#34304E] text-[#A855F7] shadow-lg transition-all duration-300 hover:scale-110 hover:border-[#A855F7] hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]">
          <Orbit className="size-4" />
        </div>
      </div>

      {/* Central Glowing Energy Bolt Core */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="relative flex size-20 animate-[pulse_3s_ease-in-out_infinite] items-center justify-center rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#5B58E7] to-[#29559D] text-white shadow-[0_0_40px_rgba(91,88,231,0.6)]">
          {/* Breathing Outer Aura */}
          <span className="absolute inset-0 animate-ping rounded-full opacity-40 ring-2 ring-white/30" />
          <Zap className="size-9 fill-white text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
        </div>
      </div>
    </div>
  );
};
