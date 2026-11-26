import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { ChallengeSolutionPair } from '@/lib/portfolio/markdown';

export function ChallengesSolutions({ pairs }: { pairs: ChallengeSolutionPair[] }) {
  if (pairs.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {pairs.map((pair, idx) => (
        <div
          key={`${pair.challenge}-${idx}`}
          className="grid gap-4 rounded-md border border-border bg-card p-5 sm:p-6 md:grid-cols-2 md:gap-6"
        >
          <div className="flex flex-col gap-2 border-b border-border pb-4 md:border-r md:border-b-0 md:pr-6 md:pb-0">
            <span className="inline-flex items-center gap-2 text-caption font-semibold tracking-[0.08em] text-destructive uppercase">
              <AlertCircle className="size-4" aria-hidden="true" strokeWidth={1.75} />
              Challenge
            </span>
            <p className="font-heading text-h5 text-foreground">{pair.challenge}</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-2 text-caption font-semibold tracking-[0.08em] text-success uppercase">
              <CheckCircle2 className="size-4" aria-hidden="true" strokeWidth={1.75} />
              How We Solved It
            </span>
            <p className="text-body text-muted-foreground">{pair.solution}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
