'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import type { VisibilityQuizData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import {
  computeVisibilityQuizResult,
  writeQuizPrefillToSession,
  type QuizAnswerValue,
} from '@/lib/digital-marketing-quiz';
import { useDigitalMarketingSimulator } from './DigitalMarketingSimulator';

type VisibilityQuizProps = {
  slug: string;
  data: VisibilityQuizData;
};

/**
 * 10-question self-check diagnostic with instant algorithmic score (/100),
 * level classification, top 3 highest-priority gaps, keyboard shortcuts (`1`/`2`/`3`
 * + Left/Right arrows + Enter), live announcements, and `sessionStorage` contact prefill.
 */
export function VisibilityQuiz({ slug, data }: VisibilityQuizProps) {
  const { brand, city, hasCustomBrand } = useDigitalMarketingSimulator();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<string, QuizAnswerValue>>>({});
  const startedRef = useRef(false);
  const completedRef = useRef(false);

  const count = data.questions.length;
  const activeQuestion = data.questions[currentIdx];
  const result = computeVisibilityQuizResult(answers, data.questions, data.levels);
  const currentAnswer = activeQuestion ? answers[activeQuestion.id] : undefined;

  const chooseAnswer = (value: QuizAnswerValue) => {
    if (!activeQuestion) return;
    if (!startedRef.current) {
      startedRef.current = true;
      track('quiz_start', { service_slug: slug });
    }

    const nextAnswers: Partial<Record<string, QuizAnswerValue>> = {
      ...answers,
      [activeQuestion.id]: value,
    };
    setAnswers(nextAnswers);

    const nextResult = computeVisibilityQuizResult(nextAnswers, data.questions, data.levels);
    if (nextResult.answeredCount === count && !completedRef.current) {
      completedRef.current = true;
      track('quiz_complete', {
        service_slug: slug,
        quiz_level: nextResult.level.level,
      });
    }

    if (currentIdx < count - 1) {
      setCurrentIdx((i) => Math.min(count - 1, i + 1));
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIdx(0);
    completedRef.current = false;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === '1') {
      e.preventDefault();
      chooseAnswer('yes');
    } else if (e.key === '2') {
      e.preventDefault();
      chooseAnswer('not_sure');
    } else if (e.key === '3') {
      e.preventDefault();
      chooseAnswer('no');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentIdx((i) => Math.max(0, i - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentIdx((i) => Math.min(count - 1, i + 1));
    }
  };

  const handleAuditCtaClick = () => {
    writeQuizPrefillToSession({
      score: result.score,
      level: result.level.level,
      topGaps: result.topGaps.map((g) => g.gapRecommendation),
      brand: hasCustomBrand ? brand : undefined,
      city: hasCustomBrand ? city : undefined,
    });
    track('audit_cta_click', {
      service_slug: slug,
      quiz_level: result.level.level,
    });
  };

  const progressPct = Math.round(((currentIdx + 1) / Math.max(1, count)) * 100);

  return (
    <section
      id="audit-section"
      aria-labelledby="visibility-quiz-heading"
      className="scroll-mt-24 space-y-8"
      onKeyDown={handleKeyDown}
    >
      <div className="flex max-w-2xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="visibility-quiz-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        {/* Left: Interactive 10-Question Card */}
        <div className="glass-card-strong flex flex-col justify-between rounded-lg p-5 sm:p-7 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 font-mono text-caption">
              <span aria-live="polite" className="text-[#c38bff]">
                Question {currentIdx + 1} of {count}
              </span>
              <span className="text-(--glass-text-meta)">Keys 1 / 2 / 3 · Arrows</span>
            </div>

            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8e21fc] to-[#4cd7f6] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {activeQuestion && (
              <div className="space-y-3 py-2">
                <h3 className="m-0 font-heading text-h4 leading-snug font-semibold text-(--glass-text)">
                  {activeQuestion.question}
                </h3>
                <p className="text-small leading-relaxed text-(--glass-text-muted)">
                  {activeQuestion.detail}
                </p>

                <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-3">
                  {(
                    [
                      { val: 'yes', label: 'Yes', keyHint: '1', dotClass: 'bg-(--glass-cyan)' },
                      { val: 'not_sure', label: 'Not sure', keyHint: '2', dotClass: 'bg-white/60' },
                      { val: 'no', label: 'No', keyHint: '3', dotClass: 'bg-rose-400' },
                    ] as const
                  ).map((opt) => {
                    const isPicked = currentAnswer === opt.val;
                    return (
                      <button
                        key={opt.val}
                        type="button"
                        aria-pressed={isPicked}
                        onClick={() => chooseAnswer(opt.val)}
                        className={cn(
                          'flex min-h-12 w-full items-center justify-center gap-2 rounded-md border px-4 py-3 font-heading text-small font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                          isPicked
                            ? 'border-[#c38bff] bg-[#8e21fc]/25 text-white shadow-[0_0_20px_-6px_rgb(142_33_252/0.6)]'
                            : 'border-white/15 bg-white/5 text-(--glass-text) hover:border-white/30 hover:bg-white/10',
                        )}
                      >
                        <span
                          className={cn('size-2 rounded-full', opt.dotClass)}
                          aria-hidden="true"
                        />
                        <span>{opt.label}</span>
                        <span className="font-mono text-[10px] text-(--glass-text-meta)">
                          ({opt.keyHint})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  className="inline-flex min-h-10 items-center gap-1 rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 font-mono text-caption text-(--glass-text-muted) hover:bg-white/10 disabled:opacity-40"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={currentIdx === count - 1}
                  onClick={() => setCurrentIdx((i) => Math.min(count - 1, i + 1))}
                  className="inline-flex min-h-10 items-center gap-1 rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 font-mono text-caption text-[#c38bff] hover:bg-white/10 disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/12 bg-white/4 px-3.5 py-1.5 font-mono text-caption text-(--glass-text-muted) hover:bg-white/10 hover:text-(--glass-text)"
              >
                <RotateCcw className="size-3.5" aria-hidden="true" />
                <span>Restart</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5" aria-label="Jump to question">
              {data.questions.map((q, idx) => {
                const ans = answers[q.id];
                const isCur = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    aria-current={isCur ? 'step' : undefined}
                    className={cn(
                      'min-h-7 rounded px-2 py-0.5 font-mono text-[10px] transition-colors',
                      isCur
                        ? 'border border-(--glass-cyan) bg-(--glass-cyan-soft) text-(--glass-cyan)'
                        : ans
                          ? 'bg-[#8e21fc]/25 text-[#e1c4ff]'
                          : 'bg-white/6 text-(--glass-text-meta) hover:bg-white/12',
                    )}
                  >
                    {String(idx + 1).padStart(2, '0')} {q.tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Live Score Gauge & Top 3 Priority Gaps */}
        <div
          aria-live="polite"
          className="glass-card-strong glass-specular flex flex-col justify-between rounded-lg p-5 sm:p-7 lg:col-span-5"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-caption text-(--glass-cyan)">Diagnostic score</span>
              <span className="rounded-full border border-[#c38bff]/40 bg-[#8e21fc]/25 px-3 py-0.5 font-mono text-[11px] text-[#e1c4ff]">
                {result.level.badge}
              </span>
            </div>

            <div className="flex items-center gap-5 py-1">
              <div className="relative flex size-26 shrink-0 items-center justify-center">
                <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden="true">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="3.5"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#c38bff"
                    strokeWidth="3.5"
                    strokeDasharray={`${result.score}, 100`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading text-h4 font-bold text-(--glass-text)">
                    {result.score}
                  </span>
                  <span className="font-mono text-[9px] text-(--glass-text-meta) uppercase">
                    out of 100
                  </span>
                </div>
              </div>

              <div>
                <div className="font-heading text-small font-semibold text-(--glass-text)">
                  Level: {result.level.level}
                </div>
                <p className="mt-1 text-caption leading-relaxed text-(--glass-text-muted)">
                  {result.answeredCount === 0
                    ? 'Answer the 10 questions on the left to calculate your score and top gaps.'
                    : result.level.summary}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 border-t border-white/10 pt-4">
              <div className="font-mono text-caption text-(--glass-text)">
                {result.topGaps.length > 0
                  ? 'Top priority gaps to fix:'
                  : result.answeredCount === 0
                    ? 'Your top gaps appear here as you answer'
                    : 'No gaps flagged in your answers so far'}
              </div>

              {result.topGaps.map((gap) => (
                <div
                  key={gap.id}
                  className="flex items-start gap-2.5 rounded-md border border-white/10 bg-white/4 p-3 text-caption text-(--glass-text)"
                >
                  <AlertTriangle
                    className="mt-0.5 size-4 shrink-0 text-(--glass-amber)"
                    aria-hidden="true"
                  />
                  <span>{gap.gapRecommendation}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href={`/contact?service=${slug}`}
            onClick={handleAuditCtaClick}
            className="glass-cta-primary mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-heading text-small font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)"
          >
            <span>{data.ctaLabel}</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
