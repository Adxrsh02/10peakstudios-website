'use client';

import React from 'react';
import Image from 'next/image';
import type { ClientLogo } from '@/types/clients';

interface ClientCardProps {
  client: ClientLogo;
  isDuplicate?: boolean;
}

export function ClientCard({ client, isDuplicate = false }: ClientCardProps) {
  return (
    <div
      aria-hidden={isDuplicate}
      className="group/card relative flex h-[108px] w-[210px] shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-[#EBC040]/40 hover:bg-white/[0.07] hover:shadow-[0_0_25px_rgba(41,85,157,0.3)] sm:w-[240px]"
    >
      {/* Subtle Inner Gradient Illumination */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.04] via-transparent to-[#29559D]/10 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

      {/* Real Client Logo Asset Container */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={client.logoUrl}
          alt={isDuplicate ? '' : `${client.name} logo`}
          width={client.width}
          height={client.height}
          loading="lazy"
          className="h-auto max-h-[52px] w-auto max-w-[165px] object-contain opacity-70 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:brightness-105"
        />
      </div>

      {/* Gold Border Highlight Pip */}
      <div className="pointer-events-none absolute -bottom-[1px] left-1/2 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#EBC040] to-transparent transition-all duration-300 group-hover/card:w-20" />
    </div>
  );
}
