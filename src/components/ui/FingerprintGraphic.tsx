'use client';

import React from 'react';

interface FingerprintGraphicProps {
  className?: string;
  isScanning?: boolean;
}

export function FingerprintGraphic({
  className = 'size-10',
  isScanning = false,
}: FingerprintGraphicProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Laser Scanning Bar */}
      {isScanning && (
        <div className="animate-laser-sweep pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#A855F7] to-transparent shadow-[0_0_12px_#A855F7]" />
      )}

      {/* Scalable Vector Touch ID Fingerprint */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-full w-full"
      >
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
        <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
        <path d="M2 12a10 10 0 0 1 18-6" />
        <path d="M2 16h.01" />
        <path d="M21.8 16c.2-2 .131-5.354 0-6" />
        <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
        <path d="M8.65 22c.21-.66.45-1.32.57-2" />
        <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
      </svg>
    </div>
  );
}
