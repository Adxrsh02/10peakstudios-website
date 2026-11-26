'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Code2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type FlowStep = {
  id: string;
  label: string;
};

/** Parses simple flowchart TD/LR definitions into an ordered step sequence with zero external library cost. */
function parseMermaidSteps(code: string): { direction: 'TD' | 'LR'; steps: FlowStep[] } {
  const lines = code
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const header = lines[0] ?? 'flowchart TD';
  const direction = header.includes('LR') ? 'LR' : 'TD';
  const nodes = new Map<string, string>();
  const order: string[] = [];

  const extractNode = (token: string) => {
    const clean = token.trim();
    const match = /^([A-Za-z0-9_-]+)(?:\[\(?["']?([^"'\])]+)["']?\)?\])?$/.exec(clean);
    if (!match || !match[1]) return;
    const id = match[1];
    const label = match[2] ?? nodes.get(id) ?? id;
    if (!nodes.has(id)) order.push(id);
    nodes.set(id, label);
  };

  for (const line of lines.slice(1)) {
    if (!line.includes('-->')) continue;
    const parts = line.split('-->');
    for (const part of parts) {
      extractNode(part);
    }
  }

  return {
    direction,
    steps: order.map((id) => ({ id, label: nodes.get(id) ?? id })),
  };
}

/**
 * Lightweight lazy-revealed brand flowchart visualizer with raw Mermaid code toggle.
 * Activates only when scrolled into view via IntersectionObserver (~2 KB, 0 external deps).
 */
export function MermaidBlock({ code }: { code: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: '120px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const parsed = parseMermaidSteps(code);

  return (
    <div
      ref={hostRef}
      className="flex flex-col gap-4 rounded-md border border-inverse-rule bg-obsidian/80 p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-caption font-semibold tracking-[0.1em] text-inverse-link uppercase">
          Execution Pipeline Flow
        </p>
        <button
          type="button"
          onClick={() => setShowSource((s) => !s)}
          aria-expanded={showSource}
          className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-inverse-rule bg-ink px-3 text-caption font-medium text-inverse-muted transition-colors [@media(hover:hover)]:hover:border-lilac-spark [@media(hover:hover)]:hover:text-summit-white"
        >
          <Code2 className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
          {showSource ? 'Hide diagram code' : 'View Mermaid source'}
        </button>
      </div>

      {parsed.steps.length > 0 && (
        <ol
          className={cn(
            'flex flex-col gap-2.5 transition-opacity duration-(--duration-base)',
            parsed.direction === 'LR' && 'md:flex-row md:flex-wrap md:items-center',
            inView ? 'opacity-100' : 'opacity-90',
          )}
        >
          {parsed.steps.map((step, idx) => (
            <li
              key={step.id}
              className={cn(
                'flex items-center gap-2.5',
                parsed.direction === 'TD' && 'flex-col items-stretch sm:items-start',
              )}
            >
              <div className="flex items-center gap-3 rounded-sm border border-inverse-rule bg-ink px-4 py-2.5 text-small font-medium text-summit-white">
                <span className="price grid size-6 shrink-0 place-items-center rounded-pill bg-primary text-caption font-semibold text-primary-foreground">
                  {idx + 1}
                </span>
                <span>{step.label}</span>
              </div>
              {idx < parsed.steps.length - 1 && (
                <span aria-hidden="true" className="flex justify-center text-inverse-link sm:pl-4">
                  {parsed.direction === 'LR' ? (
                    <ArrowRight className="size-4" strokeWidth={1.75} />
                  ) : (
                    <ArrowDown className="size-4" strokeWidth={1.75} />
                  )}
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      {showSource && (
        <pre className="overflow-x-auto rounded-sm border border-inverse-rule bg-ink p-4 font-mono text-caption text-inverse-muted">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
