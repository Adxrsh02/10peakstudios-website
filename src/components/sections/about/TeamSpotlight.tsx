'use client';

import React, { useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/ui/social-icons';
import type { TeamMember } from '@/types/team';
import { DISCIPLINE_LABELS } from '@/content/team';

interface TeamSpotlightProps {
  member: TeamMember;
}

function subscribe(callback: () => void) {
  const mqlCoarse = window.matchMedia('(pointer: coarse)');
  const mqlReduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  mqlCoarse.addEventListener('change', callback);
  mqlReduced.addEventListener('change', callback);

  return () => {
    mqlCoarse.removeEventListener('change', callback);
    mqlReduced.removeEventListener('change', callback);
  };
}

function getSnapshot() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function getServerSnapshot() {
  return false;
}

export const TeamSpotlight: React.FC<TeamSpotlightProps> = ({ member }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isTouch = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Max 6 degrees tilt
    setTilt({ x: -(y * 6), y: x * 6 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl backdrop-blur-md sm:p-8 lg:p-10"
    >
      {/* Soft Purple Ambient Backlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-brand-accent/10 blur-3xl"
      />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* 4:5 Framed Portrait with 3D Tilt */}
        <div className="lg:col-span-5">
          <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition:
                tilt.x === 0 && tilt.y === 0
                  ? 'transform 0.4s ease-out'
                  : 'transform 0.08s ease-out',
            }}
            className="group relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-b from-purple-50/60 to-white shadow-md transition-shadow duration-300 hover:shadow-xl lg:max-w-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={member.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative size-full"
              >
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role} at 10PeakStudio`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 340px, 420px"
                  className="object-cover object-top"
                />
              </motion.div>
            </AnimatePresence>

            {/* Subtle Gradient Vignette Over Bottom of Photo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent opacity-60"
            />
          </div>
        </div>

        {/* Member Details & Full Bio */}
        <div className="flex flex-col justify-center lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex flex-col"
            >
              {/* Discipline Pill */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/70 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {DISCIPLINE_LABELS[member.discipline]}
                </span>
              </div>

              {/* Member Name */}
              <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
                {member.name}
              </h3>

              {/* Role */}
              <p className="mt-1 text-base font-semibold text-primary/90 sm:text-lg">
                {member.role}
              </p>

              {/* Bio Narrative */}
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {member.bio}
              </p>

              {/* Verified External Links */}
              <div className="mt-7 flex items-center gap-3">
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0"
                  >
                    <LinkedinIcon className="size-5" aria-hidden="true" />
                  </a>
                )}

                {member.links.portfolio && (
                  <a
                    href={member.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s Portfolio`}
                    className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0"
                  >
                    <Globe className="size-5" aria-hidden="true" />
                  </a>
                )}

                {member.links.twitter && (
                  <a
                    href={member.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on X (Twitter)`}
                    className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white hover:shadow-md active:translate-y-0"
                  >
                    <TwitterIcon className="size-5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
