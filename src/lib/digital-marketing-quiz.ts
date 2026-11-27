import { z } from 'zod';
import type { VisibilityQuizLevel, VisibilityQuizQuestion } from '@/content/services/types';

export type QuizAnswerValue = 'yes' | 'not_sure' | 'no';

export const QUIZ_STORAGE_KEY = 'tps.dm.quiz.v1';

export const QUIZ_POINTS: Record<QuizAnswerValue, number> = {
  yes: 10,
  not_sure: 4,
  no: 0,
};

export const visibilityQuizPrefillSchema = z.object({
  score: z.number().int().min(0).max(100),
  level: z.enum(['Invisible', 'Listed', 'Answered', 'Recommended']),
  topGaps: z.array(z.string().min(1).max(200)).max(3),
  brand: z.string().max(40).optional(),
  city: z.string().max(30).optional(),
});

export type VisibilityQuizPrefill = z.infer<typeof visibilityQuizPrefillSchema>;

export type VisibilityQuizResult = {
  score: number;
  answeredCount: number;
  level: VisibilityQuizLevel;
  topGaps: VisibilityQuizQuestion[];
};

/**
 * Sanitizes client-only simulator strings (`brand`, `city`): strips HTML brackets,
 * collapses consecutive whitespace, trims edges, enforces max length, and falls back
 * when empty. Rendered purely as text nodes (never HTML).
 */
export function sanitizeBrandSimInput(raw: string, maxLength: number, fallback: string): string {
  const cleaned = raw.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, maxLength).trim();
  return cleaned.length > 0 ? cleaned : fallback;
}

/**
 * Computes score (/100), matching status level, and up to 3 highest-priority gaps
 * across questions answered `"no"` or `"not_sure"`.
 */
export function computeVisibilityQuizResult(
  answers: Readonly<Partial<Record<string, QuizAnswerValue>>>,
  questions: readonly VisibilityQuizQuestion[],
  levels: readonly VisibilityQuizLevel[],
): VisibilityQuizResult {
  let score = 0;
  let answeredCount = 0;
  const gapCandidates: VisibilityQuizQuestion[] = [];

  for (const q of questions) {
    const ans = answers[q.id];
    if (ans) {
      answeredCount += 1;
      score += QUIZ_POINTS[ans];
      if (ans === 'no' || ans === 'not_sure') {
        gapCandidates.push(q);
      }
    }
  }

  const clampedScore = Math.max(0, Math.min(100, score));
  const matchedLevel = levels.find(
    (lvl) => clampedScore >= lvl.minScore && clampedScore <= lvl.maxScore,
  ) ??
    levels[0] ?? {
      level: 'Invisible' as const,
      badge: 'Stage: Level 1',
      minScore: 0,
      maxScore: 29,
      summary: 'Your brand is currently hard to find across both search results and AI answers.',
    };

  const topGaps = [...gapCandidates].sort((a, b) => a.priority - b.priority).slice(0, 3);

  return {
    score: clampedScore,
    answeredCount,
    level: matchedLevel,
    topGaps,
  };
}

export function formatQuizPrefillMessage(prefill: VisibilityQuizPrefill): string {
  const lines = [
    `Requesting full AI & Search visibility audit.`,
    prefill.brand && prefill.brand !== 'Your Brand'
      ? `Brand: ${prefill.brand}${prefill.city ? ` (${prefill.city})` : ''}`
      : undefined,
    `Self-check score: ${prefill.score}/100 (${prefill.level})`,
    prefill.topGaps.length > 0
      ? `Top priority gaps:\n${prefill.topGaps.map((g, i) => `${i + 1}. ${g}`).join('\n')}`
      : undefined,
  ].filter((line): line is string => Boolean(line));

  return lines.join('\n\n');
}

export function writeQuizPrefillToSession(prefill: VisibilityQuizPrefill): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const parsed = visibilityQuizPrefillSchema.safeParse(prefill);
    if (!parsed.success) return false;
    window.sessionStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(parsed.data));
    return true;
  } catch {
    return false;
  }
}

export function readQuizPrefillFromSession(): VisibilityQuizPrefill | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return null;
    const json: unknown = JSON.parse(raw);
    const parsed = visibilityQuizPrefillSchema.safeParse(json);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function clearQuizPrefillFromSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(QUIZ_STORAGE_KEY);
  } catch {
    // Ignore storage restriction errors cleanly
  }
}
