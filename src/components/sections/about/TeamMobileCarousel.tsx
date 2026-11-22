'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Globe } from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from '@/components/ui/social-icons';
import type { TeamMember } from '@/types/team';
import { DISCIPLINE_LABELS } from '@/content/team';

interface TeamMobileCarouselProps {
  members: TeamMember[];
  activeDiscipline: string;
  onSelectDiscipline: (discipline: string) => void;
}

export const TeamMobileCarousel: React.FC<TeamMobileCarouselProps> = ({
  members,
  activeDiscipline,
  onSelectDiscipline,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const disciplines = Object.entries(DISCIPLINE_LABELS);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    if (clientWidth === 0) return;
    const index = Math.round(scrollLeft / clientWidth);
    setCurrentIndex(Math.min(Math.max(index, 0), members.length - 1));
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left: index * clientWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  const handleDisciplineClick = (discipline: string) => {
    setCurrentIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
    onSelectDiscipline(discipline);
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
              onClick={() => handleDisciplineClick(key)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                isPressed
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'border border-slate-200/90 bg-white/70 text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Snap Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {members.map((member) => (
          <div
            key={member.id}
            className="w-full shrink-0 snap-center rounded-3xl border border-slate-200/80 bg-white p-5 shadow-lg"
          >
            {/* 4:5 Portrait */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-b from-purple-50/60 to-white shadow-sm">
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}, ${member.role} at 10PeakStudio`}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover object-top"
              />
            </div>

            {/* Member Details */}
            <div className="mt-4 flex flex-col">
              <div className="mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-50/70 px-3 py-0.5 text-[11px] font-semibold tracking-wider text-primary uppercase">
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                  {DISCIPLINE_LABELS[member.discipline]}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-foreground">{member.name}</h3>
              <p className="mt-0.5 text-xs font-semibold text-primary">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {member.shortBio}
              </p>

              {/* Verified Links */}
              <div className="mt-4 flex items-center gap-2.5">
                {member.links.linkedin && (
                  <a
                    href={member.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <LinkedinIcon className="size-4" aria-hidden="true" />
                  </a>
                )}

                {member.links.portfolio && (
                  <a
                    href={member.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s Portfolio`}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <Globe className="size-4" aria-hidden="true" />
                  </a>
                )}

                {member.links.twitter && (
                  <a
                    href={member.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on X`}
                    className="flex size-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <TwitterIcon className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls: Dots + Position Counter + Chevrons */}
      <div className="mt-4 flex items-center justify-between px-2">
        {/* Prev / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label="Previous team member"
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex === members.length - 1}
            aria-label="Next team member"
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Counter Badge */}
        <span className="text-xs font-semibold text-slate-500">
          {currentIndex + 1} of {members.length}
        </span>

        {/* Bullet Pagination Indicators */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {members.map((_, i) => (
            <button
              key={i}
              type="button"
              tabIndex={-1}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex ? 'h-2 w-6 bg-primary' : 'size-2 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
