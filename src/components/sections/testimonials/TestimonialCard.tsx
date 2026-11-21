'use client';

import React from 'react';
import Image from 'next/image';
import type { TestimonialItem } from '@/types/testimonials';

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-[#8A7EDB]/35 bg-gradient-to-r from-[#F2F0FF] to-white p-7 shadow-[0_4px_20px_-2px_rgba(41,85,157,0.06)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-[#8A7EDB]/70 hover:shadow-[0_20px_35px_-10px_rgba(41,85,157,0.15)] sm:p-9">
      <div>
        {/* Top Header: Avatar + Meta */}
        <div className="flex items-center gap-4 border-b border-dashed border-[#D9D4D4] pb-6">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-[#29559D]/15">
            <Image
              src={testimonial.avatar}
              alt={`${testimonial.name} profile photo`}
              fill
              sizes="48px"
              className="object-cover"
              loading="lazy"
              unoptimized
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-['Montserrat',sans-serif] text-[15px] font-bold tracking-wide text-[#1E2B58] uppercase sm:text-base">
              {testimonial.name}
            </h3>
            <span className="font-['Roboto',sans-serif] text-xs font-medium text-[#6B7280] sm:text-[13px]">
              {testimonial.position}
            </span>
          </div>
        </div>

        {/* Testimonial Quote Description */}
        <div className="pt-6">
          <p className="font-['DM_Sans',sans-serif] text-[15px] leading-[1.68] text-[#374151] sm:text-[16px]">
            {testimonial.quote}
          </p>
        </div>
      </div>

      {/* Decorative Bottom Glow Pip */}
      <div className="mt-4 flex h-1 w-full justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-[#EBC040]" />
      </div>
    </div>
  );
}
