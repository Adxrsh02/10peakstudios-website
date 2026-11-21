'use client';

import React from 'react';
import type { ClientLogo } from '@/types/clients';
import { ClientCard } from './ClientCard';

interface MarqueeTrackProps {
  clients: ClientLogo[];
  direction?: 'left' | 'right';
  speedDuration?: number; // duration in seconds
  pauseOnHover?: boolean;
}

export function MarqueeTrack({
  clients,
  direction = 'left',
  speedDuration = 35,
  pauseOnHover = true,
}: MarqueeTrackProps) {
  // Multiply the client list so that the track seamlessly spans wide viewports without empty space
  const repeatedClients = [...clients, ...clients, ...clients, ...clients];

  const animationClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div
      className={`group relative flex w-full overflow-hidden select-none ${
        pauseOnHover ? 'hover:[&_.marquee-content]:[animation-play-state:paused]' : ''
      }`}
    >
      {/* First Track Instance */}
      <div
        className={`marquee-content flex shrink-0 items-center gap-6 py-2 pr-6 ${animationClass}`}
        style={{ animationDuration: `${speedDuration}s` }}
      >
        {repeatedClients.map((client, index) => (
          <ClientCard key={`track-1-${client.id}-${index}`} client={client} />
        ))}
      </div>

      {/* Second Track Instance (Continuous Loop Duplicate) */}
      <div
        aria-hidden="true"
        className={`marquee-content flex shrink-0 items-center gap-6 py-2 pr-6 ${animationClass}`}
        style={{ animationDuration: `${speedDuration}s` }}
      >
        {repeatedClients.map((client, index) => (
          <ClientCard key={`track-2-${client.id}-${index}`} client={client} isDuplicate={true} />
        ))}
      </div>
    </div>
  );
}
