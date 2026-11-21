'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TechItem {
  name: string;
  category: string;
  iconSvg?: React.ReactNode;
  badge?: string;
}

export const TECH_CATEGORIES = [
  'AI Agents',
  'AI Automation',
  'Frontend',
  'Backend',
  'CMS',
  'Database',
  'Cloud',
] as const;

export type TechCategory = (typeof TECH_CATEGORIES)[number];

// Generic Default Technology Icon with Futuristic Circuit Silhouette
const TechIconPlaceholder: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 text-lg font-semibold text-white shadow-inner transition-colors group-hover:border-[#EBC040]/50">
      <span className="font-mono text-sm tracking-wider text-white/90 uppercase">
        {name.slice(0, 2)}
      </span>
      <div className="absolute inset-0 rounded-xl bg-[#EBC040]/5 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

// Premium Brand Icon Wrapper
const BrandIconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] shadow-inner transition-all duration-300 group-hover:border-[#EBC040]/50 group-hover:bg-white/[0.07]">
      <div className="flex h-8 w-8 items-center justify-center text-white">{children}</div>
      <div className="absolute inset-0 rounded-xl bg-[#EBC040]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};

export const TECHNOLOGIES_DATA: Record<TechCategory, TechItem[]> = {
  'AI Agents': [
    {
      name: 'LangChain',
      category: 'AI Agents',
      iconSvg: (
        <BrandIconWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
              className="text-[#29559D]"
            />
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
              className="text-[#EBC040]"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'LangGraph',
      category: 'AI Agents',
      iconSvg: (
        <BrandIconWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle
              cx="6"
              cy="6"
              r="3"
              className="text-[#6EC1E4]"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <circle
              cx="18"
              cy="8"
              r="3"
              className="text-[#EBC040]"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <circle
              cx="12"
              cy="18"
              r="3"
              className="text-[#29559D]"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <line x1="8.5" y1="7" x2="15.5" y2="7.5" stroke="currentColor" strokeOpacity="0.6" />
            <line x1="7.5" y1="8.5" x2="10.5" y2="15.5" stroke="currentColor" strokeOpacity="0.6" />
            <line
              x1="16.5"
              y1="10.5"
              x2="13.5"
              y2="15.5"
              stroke="currentColor"
              strokeOpacity="0.6"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'CrewAI',
      category: 'AI Agents',
      iconSvg: (
        <BrandIconWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" className="text-[#EBC040]" />
            <circle cx="9" cy="7" r="4" className="text-[#6EC1E4]" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" className="text-[#29559D]" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" className="text-[#29559D]" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Multi-Agent',
      category: 'AI Agents',
      iconSvg: (
        <BrandIconWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect
              x="2"
              y="3"
              width="6"
              height="6"
              rx="2"
              className="text-[#6EC1E4]"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <rect
              x="16"
              y="3"
              width="6"
              height="6"
              rx="2"
              className="text-[#EBC040]"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <rect
              x="9"
              y="15"
              width="6"
              height="6"
              rx="2"
              className="text-[#29559D]"
              fill="currentColor"
              fillOpacity="0.2"
            />
            <path
              d="M5 9v3a2 2 0 0 0 2 2h2m6 0h2a2 2 0 0 0 2-2V9"
              stroke="currentColor"
              strokeOpacity="0.7"
              strokeDasharray="2 2"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
  'AI Automation': [
    {
      name: 'n8n',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <rect x="2" y="6" width="6" height="6" rx="1.5" fill="#EA4B71" />
            <rect x="16" y="6" width="6" height="6" rx="1.5" fill="#EA4B71" />
            <rect x="9" y="13" width="6" height="6" rx="1.5" fill="#FF6D5A" />
            <path
              d="M8 9h8M5 12v3a2 2 0 0 0 2 2h2m6 0h2a2 2 0 0 0 2-2v-3"
              stroke="#EA4B71"
              strokeWidth="1.8"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Make (Integromat)',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-[#6F42C1]">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5v7.4l-7 3.5-7-3.5V8.3l7-3.5z" />
            <circle cx="12" cy="12" r="3" fill="#EBC040" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Zapier',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-[#FF4A00]">
            <path d="M13.5 2L4 13.5h6.5L9.5 22 20 9.5h-6.5L13.5 2z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Relevance AI',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="#6EC1E4" strokeWidth="2">
            <circle cx="12" cy="12" r="9" stroke="#29559D" />
            <path d="M12 3v18M3 12h18" strokeOpacity="0.4" />
            <circle cx="12" cy="12" r="3.5" fill="#EBC040" stroke="#EBC040" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Vapi',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="#EBC040"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 3v18M8 7v10M4 10v4M16 7v10M20 10v4" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Power Automate',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path d="M4 14l8-8 8 8-4 4-4-4-4 4-4-4z" fill="#0078D4" />
            <path d="M12 6l8 8-4 4-4-4-4 4-4-4 8-8z" fill="#29559D" fillOpacity="0.7" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Selenium',
      category: 'AI Automation',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="4"
              fill="#00B400"
              fillOpacity="0.15"
              stroke="#00B400"
              strokeWidth="1.8"
            />
            <text
              x="7"
              y="16"
              fill="#00B400"
              fontSize="12"
              fontWeight="bold"
              fontFamily="monospace"
            >
              Se
            </text>
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
  Frontend: [
    {
      name: 'HTML5',
      category: 'Frontend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#E34F26" className="h-7 w-7">
            <path d="M4.1 2.5l1.6 17.7 6.3 1.8 6.3-1.8 1.6-17.7H4.1zm12.3 4.8l-.2 2.3H8.3l.2 2.3h7.6l-.6 6.3-3.4 1-3.4-1-.2-2.7h2.2l.1 1.2 1.3.4 1.3-.4.2-2H8.8l-.5-6.5h8.1z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'CSS3',
      category: 'Frontend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#1572B6" className="h-7 w-7">
            <path d="M4.1 2.5l1.6 17.7 6.3 1.8 6.3-1.8 1.6-17.7H4.1zm12.3 4.8l-.2 2.3H8.3l.2 2.3h7.6l-.6 6.3-3.4 1-3.4-1-.2-2.7h2.2l.1 1.2 1.3.4 1.3-.4.2-2H8.8l-.5-6.5h8.1z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'React',
      category: 'Frontend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#61DAFB]">
            <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.4" />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="currentColor"
              strokeWidth="1.4"
              transform="rotate(60 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="10"
              ry="4"
              stroke="currentColor"
              strokeWidth="1.4"
              transform="rotate(120 12 12)"
            />
            <circle cx="12" cy="12" r="1.8" fill="currentColor" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'JavaScript',
      category: 'Frontend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <rect width="24" height="24" rx="3" fill="#F7DF1E" />
            <path
              d="M7 17.8c.8.5 1.7.8 2.6.8 1.5 0 2.4-.7 2.4-2.1v-6.3H9.9v6.3c0 .5-.3.8-.8.8-.4 0-.8-.1-1.2-.3l-.9.9zm9.2-.1c-.9.5-2 .8-3.1.8-2.6 0-4.1-1.4-4.1-3.8 0-2.3 1.4-3.7 3.9-4.7 1.4-.5 2-.9 2-1.6 0-.6-.5-1-1.3-1-.9 0-1.7.4-2.3.8l-.9-1.2c.8-.7 2-1.1 3.3-1.1 2.3 0 3.7 1.3 3.7 3.3 0 2.2-1.4 3.5-3.8 4.4-1.5.6-2.1 1-2.1 1.8 0 .7.6 1.1 1.5 1.1 1 0 1.9-.3 2.5-.7l.7 1.3z"
              fill="#000"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Next.js',
      category: 'Frontend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-white">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M9.5 8v8m0 0l6.5-8.5v8"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'AngularJS',
      category: 'Frontend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#DD0031" className="h-7 w-7">
            <path d="M12 2L3 5.5l1.4 12.3L12 22l7.6-4.2L21 5.5 12 2zm0 3.1l5 11.2h-2.1l-1-2.6h-3.8l-1 2.6H7l5-11.2zm1.4 7L12 8.9l-1.4 3.2h2.8z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
  Backend: [
    {
      name: 'Node.js',
      category: 'Backend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#339933" className="h-7 w-7">
            <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7.1L12 19.7l7.2-4.1V8.5L12 4.3z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Python',
      category: 'Backend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="M11.9 2c-4.4 0-4.1 1.9-4.1 1.9l.05 2h4.2v.6H5.8S2 6.1 2 10.5c0 4.4 3.3 4.2 3.3 4.2h1.9v-2.7s-.1-3.3 3.2-3.3h5.5s3.2.1 3.2-3.1c0-3.3-3.2-3.6-3.2-3.6H11.9zm-2.4 1.4c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c0-.5.4-.9.9-.9z"
              fill="#3776AB"
            />
            <path
              d="M12.1 22c4.4 0 4.1-1.9 4.1-1.9l-.05-2h-4.2v-.6h6.2s3.8.4 3.8-4c0-4.4-3.3-4.2-3.3-4.2h-1.9v2.7s.1 3.3-3.2 3.3H8.1s-3.2-.1-3.2 3.1c0 3.3 3.2 3.6 3.2 3.6h4zM14.5 20.6c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9s.9.4.9.9c0 .5-.4.9-.9.9z"
              fill="#FFD43B"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Laravel',
      category: 'Backend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#FF2D20" className="h-7 w-7">
            <path d="M20.5 6.2l-8-4.6c-.3-.2-.7-.2-1 0l-8 4.6c-.3.2-.5.5-.5.9v9.2c0 .4.2.7.5.9l8 4.6c.3.2.7.2 1 0l8-4.6c.3-.2.5-.5.5-.9V7.1c0-.4-.2-.7-.5-.9zm-8.5-3.3l6.5 3.8-2.6 1.5-6.5-3.8 2.6-1.5zm-7 5.1l6.5 3.8v7.4L5 15.4V8zm8 11.2V11.8l6.5-3.8v7.4l-6.5 3.8z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: '.NET',
      category: 'Backend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <rect width="24" height="24" rx="4" fill="#512BD4" />
            <text
              x="3.5"
              y="16.5"
              fill="#FFF"
              fontSize="9"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              .NET
            </text>
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'PHP',
      category: 'Backend',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#777BB4" className="h-7 w-7">
            <ellipse cx="12" cy="12" rx="10" ry="6" fill="#777BB4" />
            <text x="6" y="14" fill="#FFF" fontSize="7" fontWeight="bold" fontFamily="monospace">
              PHP
            </text>
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
  CMS: [
    {
      name: 'WordPress',
      category: 'CMS',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#21759B" className="h-7 w-7">
            <circle cx="12" cy="12" r="10" stroke="#21759B" strokeWidth="1.5" fill="none" />
            <path
              d="M3.4 12c0 3.7 2.4 6.8 5.7 7.9L5.4 9.1C4.1 10 3.4 11 3.4 12zm13-5.3c.6 0 1.2.1 1.2.1-.5 1.5-2.1 6.5-2.1 6.5l-2.1-6.6zm-5 13.1c.8.2 1.6.3 2.5.3 1.3 0 2.5-.3 3.6-.8L14 8.5l-2.6 11.3z"
              fill="#21759B"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Drupal',
      category: 'CMS',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#0678BE" className="h-7 w-7">
            <path d="M12 2C7 8 5 11 5 15a7 7 0 0 0 14 0c0-4-2-7-7-13zm0 4.5c3.2 4 4.5 6.2 4.5 8.5a4.5 4.5 0 0 1-9 0c0-2.3 1.3-4.5 4.5-8.5z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Webflow',
      category: 'CMS',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#146EF5" className="h-7 w-7">
            <path d="M21.5 5.5l-4.2 13h-4l2.5-7.7-3.3 7.7h-3.8l2.6-6-3.8 6H2.5L7.2 5.5h4.1l-2.7 6.4 3.7-6.4h4.1l-2.7 6.4 4-6.4h3.8z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Framer',
      category: 'CMS',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#0055FF" className="h-7 w-7">
            <path d="M4 2h16v7h-8L4 2zM4 9h8l8 7H4V9zm8 7v7l-8-7h8z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
  Database: [
    {
      name: 'MySQL',
      category: 'Database',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#00758F" className="h-7 w-7">
            <path d="M12 3C7 3 3 6.5 3 11c0 3.3 2.1 6.2 5.3 7.3L7 21l3.5-1.5c.5.1 1 .2 1.5.2 5 0 9-3.5 9-8s-4-8.7-9-8.7z" />
            <path d="M12 6c3.9 0 7 2.2 7 5s-3.1 5-7 5-7-2.2-7-5 3.1-5 7-5z" fill="#F29111" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'PostgreSQL',
      category: 'Database',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#336791" className="h-7 w-7">
            <path d="M12 2a9 9 0 0 0-9 9c0 3.8 2.4 7.1 6 8.4V22l4-2.5 1-.2c4.8 0 7-3.4 7-8.3 0-5-4-9-9-9zm-1.5 5.5c1 0 1.8.8 1.8 1.8 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-1 .8-1.8 1.8-1.8z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Redis',
      category: 'Database',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#DC382D" className="h-7 w-7">
            <path d="M12 2l8 4.2v4.5l-8 4.2-8-4.2V6.2L12 2zm0 8.8l4.8-2.5L12 5.8 7.2 8.3l4.8 2.5zM4 12.8l7 3.7v5.5l-7-3.7v-5.5zm16 0v5.5l-7 3.7v-5.5l7-3.7z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Pinecone',
      category: 'Database',
      iconSvg: (
        <BrandIconWrapper>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            stroke="#EBC040"
            strokeWidth="1.8"
          >
            <polygon
              points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
              fill="#EBC040"
              fillOpacity="0.1"
            />
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="2" y1="8.5" x2="22" y2="15.5" />
            <line x1="2" y1="15.5" x2="22" y2="8.5" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Supabase',
      category: 'Database',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#3ECF8E" className="h-7 w-7">
            <path d="M13.5 2L3 14.5h8.5L10.5 22 21 9.5h-8.5L13.5 2z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
  Cloud: [
    {
      name: 'Hostinger',
      category: 'Cloud',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#673DE6" className="h-7 w-7">
            <rect width="24" height="24" rx="4" fill="#673DE6" />
            <path d="M7 6v12h3v-4.5h4V18h3V6h-3v4.5h-4V6H7z" fill="#FFF" />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'AWS',
      category: 'Cloud',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#FF9900" className="h-7 w-7">
            <path d="M18.8 14.3c-2.4 1.8-5.8 2.7-8.8 2.7-4.2 0-8-1.5-10-4.1-.2-.2 0-.5.2-.4 2.1 1.2 5.5 2 8.9 2 2.7 0 5.8-.7 8.4-2.1.4-.2.7.2.3.5l1 1.4zm1.2-1c-.3-.4-2-.2-3.1-.1-.3 0-.4-.3-.1-.5 1.7-1.1 3.5-.8 3.8-.4.3.4-.1 2.3-1.6 3.6-.3.2-.5.1-.4-.2.4-.7 1.7-2 1.4-2.4z" />
            <path
              d="M9.8 10.5V6.8c0-.6-.5-1-1-1H7.6c-.6 0-1 .5-1 1v3.7c0 .6.5 1 1 1h1.2c.5 0 1-.4 1-1zM14.5 10.5V4.7c0-.6-.5-1-1-1h-1.2c-.6 0-1 .5-1 1v5.8c0 .6.5 1 1 1h1.2c.5 0 1-.4 1-1z"
              fill="#FFF"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Google Cloud',
      category: 'Cloud',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="M19.3 10a5.5 5.5 0 0 0-10.4-1.8A4.5 4.5 0 0 0 4.5 17h14.8a4 4 0 0 0 0-8v1z"
              fill="#4285F4"
            />
            <path
              d="M8.9 8.2a5.5 5.5 0 0 1 10.4 1.8 4 4 0 0 1-1.3 7h-9a4.5 4.5 0 0 1-.1-8.8z"
              fill="#EA4335"
            />
            <path d="M19.3 17a4 4 0 0 0 0-8 5.5 5.5 0 0 0-5.8-3.8V17h5.8z" fill="#FBBC05" />
            <path
              d="M13.5 17V5.2A5.5 5.5 0 0 0 8.9 8.2a4.5 4.5 0 0 0-4.4 4.8 4.5 4.5 0 0 0 4.5 4h4.5z"
              fill="#34A853"
            />
          </svg>
        </BrandIconWrapper>
      ),
    },
    {
      name: 'Microsoft Azure',
      category: 'Cloud',
      iconSvg: (
        <BrandIconWrapper>
          <svg viewBox="0 0 24 24" fill="#0089D6" className="h-7 w-7">
            <path d="M13 3L4 17.5h5.5L13 11l4.5 9.5H21L13 3zm-2.8 12.2l-2.2 3.6h5.8l-1.9-3.6h-1.7z" />
          </svg>
        </BrandIconWrapper>
      ),
    },
  ],
};

export function TechnologiesPlatformsSection() {
  const [activeTab, setActiveTab] = useState<TechCategory>('AI Agents');

  const currentItems = TECHNOLOGIES_DATA[activeTab] || [];

  return (
    <section
      id="technologies"
      aria-label="Technologies and Platforms We Work With"
      className="relative w-full overflow-hidden border-t border-b border-white/[0.06] bg-[#020B14] px-4 py-16 sm:px-6 md:py-24 lg:px-8"
    >
      {/* 1. Cybernetic Dark Grid & Ambient Glow Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern id="unithink-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#unithink-grid)" />
        </svg>
      </div>

      {/* Radial Top Illumination */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(41,85,157,0.22)_0%,_rgba(2,11,20,0)_70%)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        {/* 2. Section Header */}
        <div className="mx-auto mb-10 max-w-[1067px] text-center md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 font-['Montserrat',sans-serif] text-3xl leading-tight font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[52px]"
          >
            Technologies &amp; Platforms{' '}
            <span className="bg-gradient-to-r from-[#29559D] via-[#6EC1E4] to-[#EBC040] bg-clip-text text-transparent">
              We Work With
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-[714px] font-['Roboto',sans-serif] text-sm leading-relaxed text-[#D9D9D9] sm:text-base md:text-lg"
          >
            We work with the best technologies and tools across every layer of the stack, carefully
            selected for performance, reliability, and real business impact.
          </motion.p>
        </div>

        {/* 3. Category Navigation Tabs */}
        <div className="mb-12 flex w-full justify-center md:mb-16">
          <div
            role="tablist"
            aria-label="Technology categories"
            className="no-scrollbar flex max-w-full items-center overflow-x-auto scroll-smooth border-b border-white/10 pb-px"
          >
            {TECH_CATEGORIES.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 outline-none sm:px-6 sm:text-base ${
                    isActive ? 'text-[#EBC040]' : 'text-neutral-300 hover:text-white'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                  tabIndex={0}
                >
                  <span>{category}</span>

                  {/* Active Indicator Line & Center Dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute right-0 bottom-0 left-0 h-[2px] bg-[#EBC040]"
                    >
                      {/* Center Glowing Dot */}
                      <span className="absolute -bottom-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#EBC040] shadow-[0_0_8px_#EBC040]" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Technology Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            aria-label={`${activeTab} technologies`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6"
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EBC040]/50 hover:bg-white/[0.045] hover:shadow-[0_12px_28px_-10px_rgba(235,192,64,0.18)] sm:p-7"
              >
                {/* Technology Icon */}
                <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {item.iconSvg ? item.iconSvg : <TechIconPlaceholder name={item.name} />}
                </div>

                {/* Technology Label */}
                <span className="text-center text-sm font-medium tracking-tight text-white transition-colors group-hover:text-white sm:text-base">
                  {item.name}
                </span>

                {/* Subtle Inner Glow on Hover */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-[#EBC040]/0 via-[#EBC040]/0 to-[#EBC040]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
