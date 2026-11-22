'use client';

import React, { useState, useMemo } from 'react';
import type { TeamMember } from '@/types/team';
import { TEAM_MEMBERS } from '@/content/team';
import { TeamSpotlight } from './about/TeamSpotlight';
import { TeamRoster } from './about/TeamRoster';
import { TeamMobileCarousel } from './about/TeamMobileCarousel';
import { Reveal } from '@/components/motion/Reveal';
import { LogoMark3DLight } from '@/components/brand/svg/LogoMark3DLight';

export const TeamSection: React.FC = () => {
  const defaultMember = TEAM_MEMBERS[0] as TeamMember;
  const [activeDiscipline, setActiveDiscipline] = useState<string>('all');
  const [activeMemberId, setActiveMemberId] = useState<string>(defaultMember.id);

  const filteredMembers = useMemo(() => {
    if (activeDiscipline === 'all') return TEAM_MEMBERS;
    return TEAM_MEMBERS.filter((m) => m.discipline === activeDiscipline);
  }, [activeDiscipline]);

  const activeMember: TeamMember = useMemo(() => {
    return (
      filteredMembers.find((m) => m.id === activeMemberId) ?? filteredMembers[0] ?? defaultMember
    );
  }, [filteredMembers, activeMemberId, defaultMember]);

  const handleSelectDiscipline = (discipline: string) => {
    setActiveDiscipline(discipline);
    const nextFiltered =
      discipline === 'all' ? TEAM_MEMBERS : TEAM_MEMBERS.filter((m) => m.discipline === discipline);
    const first = nextFiltered[0];
    if (first && !nextFiltered.some((m) => m.id === activeMemberId)) {
      setActiveMemberId(first.id);
    }
  };

  return (
    <section
      id="meet-the-team"
      aria-labelledby="team-section-heading"
      className="relative w-full overflow-hidden bg-[#F8F9FD] py-20 text-foreground sm:py-24 lg:py-28"
    >
      {/* Background Atmosphere: Soft brand lavender glows and faint 10P monogram watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-40 h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[130px]"
      />

      {/* Decorative Faint 10P Monogram Watermark (3.5% opacity) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -bottom-16 z-0 w-[420px] opacity-[0.035] select-none"
      >
        <LogoMark3DLight className="h-auto w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* Eyebrow in bracket style */}
          <div data-reveal-item className="mb-4">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase sm:text-sm">
              [ Meet the Team ]
            </span>
          </div>

          {/* Heading with brand gradient on last words */}
          <h2
            id="team-section-heading"
            data-reveal-item
            className="text-3xl leading-tight font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            The Minds Behind Every Peak{' '}
            <span className="bg-gradient-to-r from-[#4A72FF] via-[#7B5CFA] to-[#E59866] bg-clip-text text-transparent">
              We Help You Climb.
            </span>
          </h2>

          {/* Subtext description */}
          <p
            data-reveal-item
            className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            A focused multidisciplinary collective bridging strategic business leadership, modern
            software engineering, operational finance, and regulatory compliance.
          </p>
        </Reveal>

        {/* ============================================================== */}
        {/* INTERACTIVE TEAM SHOWCASE                                      */}
        {/* ============================================================== */}
        <div className="mt-12 sm:mt-16">
          {/* Desktop & Tablet View (>= 768px): Spotlight + Roster */}
          <div className="hidden md:grid md:gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            {/* Desktop Left / Tablet Top: Spotlight Panel */}
            <div className="lg:col-span-7">
              <TeamSpotlight member={activeMember} />
            </div>

            {/* Desktop Right / Tablet Bottom: Roster & Filters */}
            <div className="lg:col-span-5">
              <TeamRoster
                members={filteredMembers}
                activeMemberId={activeMember.id}
                onSelectMember={setActiveMemberId}
                activeDiscipline={activeDiscipline}
                onSelectDiscipline={handleSelectDiscipline}
              />
            </div>
          </div>

          {/* Mobile View (< 768px): Touch Snap Carousel */}
          <div className="block md:hidden">
            <TeamMobileCarousel
              key={activeDiscipline}
              members={filteredMembers}
              activeDiscipline={activeDiscipline}
              onSelectDiscipline={handleSelectDiscipline}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
