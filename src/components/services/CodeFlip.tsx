'use client';

import { useState } from 'react';
import { CheckCircle2, Code2, MessageCircleQuestion } from 'lucide-react';
import type { CodeFlipData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

type CodeFlipProps = {
  slug: string;
  data: CodeFlipData;
};

/**
 * Interactive "Human View / Machine View" toggle demonstrating how one answer is
 * published in plain language for readers alongside structured `FAQPage` JSON-LD
 * for search engines and AI systems.
 */
export function CodeFlip({ slug, data }: CodeFlipProps) {
  const [view, setView] = useState<'human' | 'machine'>('human');

  const toggleMode = (next: 'human' | 'machine') => {
    if (next === view) return;
    setView(next);
    track('code_flip_toggle', { service_slug: slug, view_mode: next });
  };

  return (
    <section aria-labelledby="code-flip-heading" className="space-y-8">
      <div className="flex max-w-2xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="code-flip-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <div className="mx-auto w-full max-w-4xl">
        {/* Window Chrome + Accessible Switch */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-400/80" aria-hidden="true" />
            <span className="size-2.5 rounded-full bg-amber-300/80" aria-hidden="true" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" aria-hidden="true" />
            <span className="ml-2 font-mono text-[11px] text-(--glass-text-meta)">
              {data.filename}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1">
            <button
              type="button"
              role="switch"
              aria-checked={view === 'machine'}
              aria-label={
                view === 'machine'
                  ? 'Machine View active, switch to Human View'
                  : 'Human View active, switch to Machine View'
              }
              onClick={() => toggleMode(view === 'human' ? 'machine' : 'human')}
              className="flex min-h-9 items-center gap-1 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
            >
              <span
                className={cn(
                  'rounded-full px-3.5 py-1.5 font-heading text-caption font-medium transition-all',
                  view === 'human' ? 'glass-cta-primary text-white' : 'text-(--glass-text-muted)',
                )}
              >
                Human View
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-heading text-caption font-medium transition-all',
                  view === 'machine' ? 'glass-cta-primary text-white' : 'text-(--glass-text-muted)',
                )}
              >
                <Code2 className="size-3.5" aria-hidden="true" />
                Machine View
              </span>
            </button>
          </div>
        </div>

        {/* Display Surface (SSR renders Human View cleanly; Machine View renders real FAQ JSON-LD) */}
        <div className="glass-card-strong glass-specular flex min-h-[280px] items-center rounded-lg p-5 sm:p-8">
          <div className={cn('w-full space-y-4', view === 'human' ? 'block' : 'hidden')}>
            <div className="flex items-start gap-4 rounded-md border border-white/12 bg-white/5 p-4 sm:p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#8e21fc]/25 text-[#c38bff]">
                <MessageCircleQuestion className="size-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <h3 className="m-0 font-heading text-h5 font-semibold text-(--glass-text)">
                  {data.humanQuestion}
                </h3>
                <p className="text-body leading-relaxed text-(--glass-text-muted)">
                  {data.humanAnswer}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 font-mono text-[11px] text-(--glass-text-meta)">
              {data.humanMeta.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-2">
                  {idx === 0 && (
                    <CheckCircle2 className="size-3.5 text-(--glass-cyan)" aria-hidden="true" />
                  )}
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>

          <div className={cn('w-full overflow-x-auto', view === 'machine' ? 'block' : 'hidden')}>
            <pre className="m-0 font-mono text-caption leading-relaxed text-(--glass-text)">
              <code>
                {data.jsonLdLines.map((line, i) => (
                  <span key={i} className="block whitespace-pre">
                    {'  '.repeat(line.indent)}
                    {line.key ? (
                      <>
                        <span className="text-[#c38bff]">&quot;{line.key}&quot;</span>
                        <span className="text-(--glass-text-meta)">: </span>
                        <span
                          className={
                            line.value.startsWith('{') || line.value.startsWith('[')
                              ? 'text-(--glass-cyan)'
                              : 'text-(--glass-emerald)'
                          }
                        >
                          {line.value}
                        </span>
                      </>
                    ) : (
                      <span
                        className={
                          line.isPunctuation ? 'text-(--glass-cyan)' : 'text-(--glass-text)'
                        }
                      >
                        {line.value}
                      </span>
                    )}
                  </span>
                ))}
              </code>
            </pre>
          </div>
        </div>

        <p className="mt-4 text-center text-small text-(--glass-text-muted)">{data.footnote}</p>
      </div>
    </section>
  );
}
