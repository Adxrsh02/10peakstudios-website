'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { TeamMember } from '@/types/team';
import { DISCIPLINE_LABELS } from '@/content/team';

interface TeamRosterProps {
  members: TeamMember[];
  activeMemberId: string;
  onSelectMember: (id: string) => void;
  activeDiscipline: string;
  onSelectDiscipline: (discipline: string) => void;
}

export const TeamRoster: React.FC<TeamRosterProps> = ({
  members,
  activeMemberId,
  onSelectMember,
  activeDiscipline,
  onSelectDiscipline,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const disciplines = Object.entries(DISCIPLINE_LABELS);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (members.length === 0) return;
    let nextIndex = index;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % members.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + members.length) % members.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = members.length - 1;
    }

    if (nextIndex !== index) {
      const nextMember = members[nextIndex];
      if (nextMember) {
        onSelectMember(nextMember.id);
        const nextButton = listRef.current?.querySelector<HTMLButtonElement>(
          `#roster-tab-${nextMember.id}`,
        );
        nextButton?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Category Filter Chips Bar */}
      <div
        role="group"
        aria-label="Filter team members by discipline"
        className="no-scrollbar mb-6 flex items-center gap-2 overflow-x-auto pb-1"
      >
        {disciplines.map(([key, label]) => {
          const isPressed = activeDiscipline === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isPressed}
              onClick={() => onSelectDiscipline(key)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                isPressed
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'border border-slate-200/90 bg-white/70 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Roster Thumbnail Grid */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="10PeakStudio Team Roster"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {members.map((member, index) => {
            const isActive = member.id === activeMemberId;
            return (
              <motion.button
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                type="button"
                role="tab"
                id={`roster-tab-${member.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onSelectMember(member.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`group relative flex items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                  isActive
                    ? 'border-primary bg-white shadow-md ring-2 shadow-primary/10 ring-primary/20'
                    : 'border-slate-200/70 bg-white/60 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-white hover:shadow-md'
                }`}
              >
                {/* 4:5 Portrait Thumbnail */}
                <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 sm:w-16">
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    sizes="80px"
                    className={`object-cover object-top transition-all duration-300 ${
                      isActive
                        ? 'grayscale-0'
                        : 'grayscale-[20%] group-hover:scale-105 group-hover:grayscale-0'
                    }`}
                  />
                </div>

                {/* Member Info */}
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm font-bold transition-colors ${
                      isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}
                  >
                    {member.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs font-medium text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
