'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { SprintBoardData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceExtendedTone } from './ServiceIcon';

type SprintBoardProps = {
  data: SprintBoardData;
};

/**
 * 5-column delivery Kanban board (`01 Discover` -> `05 Launch`) plus guarantee pills.
 * Desktop allows inspecting each delivery stage directly; mobile preserves horizontal
 * touch-scroll with zero page overflow.
 */
export function SprintBoard({ data }: SprintBoardProps) {
  const defaultIndex = Math.max(
    0,
    data.columns.findIndex((c) => c.active),
  );
  const [selectedStep, setSelectedStep] = useState(
    data.columns[defaultIndex]?.step ?? data.columns[0]?.step ?? '',
  );

  return (
    <section
      id="sprint-board"
      aria-labelledby="sprint-board-heading"
      className="scroll-mt-24 space-y-8"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="sprint-board-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
      </div>

      <div className="glass-card-strong glass-specular overflow-x-auto rounded-lg p-5 sm:p-7">
        <div className="grid min-w-[760px] grid-cols-5 gap-3.5">
          {data.columns.map((col) => {
            const tone = getServiceExtendedTone(col.accent);
            const isActive = selectedStep === col.step;
            return (
              <button
                key={col.step}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedStep(col.step)}
                className={cn(
                  'flex flex-col gap-3 rounded-md text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                  isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100',
                )}
              >
                <div
                  className={cn(
                    'flex w-full items-center justify-between rounded-md border px-3 py-2',
                    isActive
                      ? 'border-[#c38bff]/45 bg-[rgb(142_33_252/0.16)]'
                      : 'border-white/10 bg-white/4',
                  )}
                >
                  <span className="font-mono text-caption font-medium text-(--glass-text) uppercase">
                    {col.step}
                  </span>
                  <span className={cn('size-2 rounded-full', tone.dot)} aria-hidden="true" />
                </div>

                <div
                  className={cn(
                    'flex min-h-[126px] w-full flex-col justify-between gap-2 rounded-md border p-3.5 transition-all',
                    isActive
                      ? 'border-[#c38bff]/45 bg-white/7 shadow-[0_0_20px_-8px_rgb(142_33_252/0.55)]'
                      : 'border-white/10 bg-white/4',
                  )}
                >
                  <span className={cn('font-mono text-[10px] tracking-wider uppercase', tone.text)}>
                    {col.cardTag}
                  </span>
                  <span className="font-heading text-small font-medium text-(--glass-text)">
                    {col.title}
                  </span>
                  <span className={cn('font-mono text-[11px]', tone.text)}>{col.status}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Reveal className="mx-auto grid max-w-4xl grid-cols-1 gap-3.5 md:grid-cols-3">
        {data.guarantees.map((guarantee) => (
          <div
            key={guarantee}
            className="glass-card flex items-center gap-3 rounded-lg px-4 py-3.5"
          >
            <CheckCircle2 className="size-4.5 shrink-0 text-(--glass-emerald)" aria-hidden="true" />
            <span className="text-small text-(--glass-text)">{guarantee}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
