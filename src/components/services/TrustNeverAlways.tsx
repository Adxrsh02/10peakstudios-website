import { CheckCircle2, CircleX, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { TrustNeverAlwaysData } from '@/content/services/types';

type TrustNeverAlwaysProps = {
  data: TrustNeverAlwaysData;
};

/**
 * Side-by-side ethical commitment comparison ("What We'll Never Do" vs "What We Always Do")
 * built with accessible dark-surface contrast and verified operational practices only.
 */
export function TrustNeverAlways({ data }: TrustNeverAlwaysProps) {
  return (
    <section aria-labelledby="trust-never-always-heading" className="space-y-8">
      <div className="flex max-w-3xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-rose-300 uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="trust-never-always-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.titleLead} <span className="text-rose-300">{data.titleAccent}</span>
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* What We'll Never Do (Accessible contrast on dark glass with rose icons/border) */}
        <div className="glass-card rounded-lg border-rose-400/35 bg-[#191019]/80 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-rose-300">
            <CircleX className="size-5.5 shrink-0" aria-hidden="true" />
            <h3 className="m-0 font-heading text-h4 font-semibold text-(--glass-text)">
              {data.neverTitle}
            </h3>
          </div>

          <ul className="mt-5 space-y-3.5 text-small leading-relaxed text-(--glass-text-muted)">
            {data.neverItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CircleX className="mt-0.5 size-4.5 shrink-0 text-rose-300" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What We Always Do */}
        <div className="glass-card-strong glass-specular rounded-lg p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-[#c38bff]">
            <ShieldCheck className="size-5.5 shrink-0" aria-hidden="true" />
            <h3 className="m-0 font-heading text-h4 font-semibold text-(--glass-text)">
              {data.alwaysTitle}
            </h3>
          </div>

          <ul className="mt-5 space-y-3.5 text-small leading-relaxed text-(--glass-text)">
            {data.alwaysItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 size-4.5 shrink-0 text-(--glass-cyan)"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
