import { describe, expect, it } from 'vitest';
import { digitalMarketingContent } from '@/content/services/digital-marketing';
import { findServiceSection } from '@/content/services/registry';
import {
  computeVisibilityQuizResult,
  formatQuizPrefillMessage,
  sanitizeBrandSimInput,
  visibilityQuizPrefillSchema,
  type QuizAnswerValue,
} from '@/lib/digital-marketing-quiz';

const rawQuiz = findServiceSection(digitalMarketingContent, 'visibilityQuiz');
if (!rawQuiz) {
  throw new Error('visibilityQuiz section missing from digitalMarketingContent');
}
const quizData = rawQuiz;

describe('digital marketing quiz scoring & input sanitization', () => {
  it('scores all Yes = 100 (Recommended) and all No = 0 (Invisible)', () => {
    const allYes: Record<string, QuizAnswerValue> = {};
    const allNo: Record<string, QuizAnswerValue> = {};
    for (const q of quizData.questions) {
      allYes[q.id] = 'yes';
      allNo[q.id] = 'no';
    }

    const high = computeVisibilityQuizResult(allYes, quizData.questions, quizData.levels);
    expect(high.score).toBe(100);
    expect(high.level.level).toBe('Recommended');
    expect(high.topGaps).toHaveLength(0);

    const low = computeVisibilityQuizResult(allNo, quizData.questions, quizData.levels);
    expect(low.score).toBe(0);
    expect(low.level.level).toBe('Invisible');
    expect(low.topGaps.map((g) => g.priority)).toEqual([1, 2, 3]);
  });

  it('scores Not sure = 4 (Listed at 40) and picks top 3 priority gaps from No/Not sure answers', () => {
    const partial: Partial<Record<string, QuizAnswerValue>> = {};
    for (const q of quizData.questions) {
      partial[q.id] = 'not_sure';
    }
    const listed = computeVisibilityQuizResult(partial, quizData.questions, quizData.levels);
    expect(listed.score).toBe(40);
    expect(listed.level.level).toBe('Listed');

    // Mix hitting Answered band (6*10 + 1*4 = 64) with priority 1 and 2 marked Yes
    const answeredMix: Partial<Record<string, QuizAnswerValue>> = {};
    for (const q of quizData.questions) {
      answeredMix[q.id] = q.priority <= 6 ? 'yes' : q.priority === 7 ? 'not_sure' : 'no';
    }
    const answered = computeVisibilityQuizResult(answeredMix, quizData.questions, quizData.levels);
    expect(answered.score).toBe(64);
    expect(answered.level.level).toBe('Answered');
    expect(answered.topGaps.map((g) => g.priority)).toEqual([7, 8, 9]);
  });

  it('sanitizes simulator brand and city text safely with fallbacks', () => {
    expect(sanitizeBrandSimInput('  <b>Acme Clinic</b>   ', 40, 'Your Brand')).toBe(
      'bAcme Clinic/b',
    );
    expect(sanitizeBrandSimInput('   ', 40, 'Your Brand')).toBe('Your Brand');
    expect(sanitizeBrandSimInput('   Navi    Mumbai   ', 30, 'Navi Mumbai')).toBe('Navi Mumbai');
    expect(sanitizeBrandSimInput('A'.repeat(60), 40, 'Your Brand')).toHaveLength(40);
    expect(sanitizeBrandSimInput('C'.repeat(45), 30, 'Navi Mumbai')).toHaveLength(30);
  });

  it('formats and validates session prefill payload cleanly', () => {
    const payload = {
      score: 64,
      level: 'Answered' as const,
      topGaps: ['Add explicit FAQ answers', 'Build third-party citations'],
      brand: 'Kiran Dental',
      city: 'Pune',
    };
    const parsed = visibilityQuizPrefillSchema.safeParse(payload);
    expect(parsed.success).toBe(true);
    const msg = formatQuizPrefillMessage(payload);
    expect(msg).toContain('Kiran Dental (Pune)');
    expect(msg).toContain('64/100 (Answered)');
    expect(msg).toContain('1. Add explicit FAQ answers');
  });
});
