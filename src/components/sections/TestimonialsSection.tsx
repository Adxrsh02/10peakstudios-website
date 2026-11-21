'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '@/data/testimonials';
import { TestimonialCard } from './testimonials/TestimonialCard';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items-per-page calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, TESTIMONIALS_DATA.length - itemsPerPage + 1);

  // Next Slide handler
  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  }, [totalPages]);

  // Autoplay functionality with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <section
      id="testimonials-section"
      aria-labelledby="testimonials-heading"
      className="relative w-full overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
      style={{
        backgroundImage: `url('https://unithinktechnologies.com/wp-content/uploads/2026/01/BG-map.webp')`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Background Soft Ambient Radial Highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-[#29559D]/5 blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          {/* Eyebrow with Dot Pip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-3 inline-flex items-center justify-center gap-2 font-['Montserrat',sans-serif] text-xs font-semibold tracking-[0.18em] text-[#29559D] uppercase sm:text-sm"
          >
            <span className="h-2 w-2 rounded-full bg-[#29559D]" />
            <span>TESTIMONIALS</span>
          </motion.div>

          {/* Section Main Heading */}
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-['Montserrat',sans-serif] text-3xl font-bold tracking-tight text-[#1E2B58] sm:text-4xl lg:text-[44px]"
          >
            Hear From{' '}
            <span className="bg-gradient-to-r from-[#29559D] via-[#6EC1E4] to-[#EBC040] bg-clip-text text-transparent">
              Our Clients
            </span>
          </motion.h2>
        </div>

        {/* Carousel Viewport Container */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative w-full overflow-hidden"
        >
          {/* Moving Track */}
          <motion.div
            className="flex"
            animate={{
              x: `-${activeIndex * (100 / itemsPerPage)}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 30,
              mass: 0.8,
            }}
          >
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                style={{ width: `${100 / itemsPerPage}%` }}
                className="shrink-0 px-3 sm:px-4"
              >
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Navigation Pagination Bullets */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, dotIndex) => {
            const isActive = dotIndex === activeIndex;
            return (
              <button
                key={`bullet-${dotIndex}`}
                type="button"
                onClick={() => setActiveIndex(dotIndex)}
                aria-label={`Go to slide ${dotIndex + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className="group relative flex h-6 w-6 items-center justify-center p-0 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EBC040]"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ease-out ${
                    isActive
                      ? 'scale-125 bg-[#EBC040] shadow-[0_0_8px_rgba(235,192,64,0.6)]'
                      : 'bg-[#D1D5DB] group-hover:bg-[#9CA3AF]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
