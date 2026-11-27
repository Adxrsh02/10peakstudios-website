import { FileText, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import type { ReportPreviewData } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent } from './ServiceIcon';

type ReportPreviewProps = {
  data: ReportPreviewData;
};

/**
 * Sample monthly growth report dashboard preview clearly badged as an illustrative layout,
 * focusing on plain-language enquiries and search/AI visibility tracking without fake stats.
 */
export function ReportPreview({ data }: ReportPreviewProps) {
  return (
    <section aria-labelledby="report-preview-heading" className="space-y-8">
      <div className="flex max-w-2xl flex-col items-start gap-2">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="report-preview-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <Reveal className="glass-card-strong glass-specular space-y-6 rounded-lg p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-4">
          <div className="flex items-center gap-3">
            <div className="glass-cta-primary flex size-9 items-center justify-center rounded-md font-heading text-caption font-bold text-white">
              10P
            </div>
            <div>
              <div className="font-heading text-small font-semibold text-(--glass-text)">
                {data.reportTitle}
              </div>
              <div className="font-mono text-[11px] text-(--glass-text-meta)">
                {data.reportSubtitle}
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-(--glass-cyan)/35 bg-(--glass-cyan-soft) px-3 py-1 font-mono text-[11px] text-(--glass-cyan)">
            <FileText className="size-3.5" aria-hidden="true" />
            <span>{data.sampleBadge}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.kpis.map((kpi) => {
            const tone = getServiceAccent(kpi.tone);
            return (
              <div key={kpi.label} className="rounded-md border border-white/12 bg-white/5 p-4">
                <span className="block font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
                  {kpi.label}
                </span>
                <div className={cn('mt-1.5 font-heading text-h5 font-semibold', tone.text)}>
                  {kpi.value}
                </div>
                <span className="mt-1 block font-mono text-[11px] text-(--glass-text-muted)">
                  {kpi.note}
                </span>
              </div>
            );
          })}
        </div>

        {/* AI Recommendation Check Strip (plain text platform names only, no logos) */}
        <div className="flex flex-col justify-between gap-4 rounded-md border border-white/10 bg-[#0b0912]/80 p-4 md:flex-row md:items-center">
          <div className="flex items-center gap-2 font-heading text-small font-medium text-(--glass-text)">
            <Sparkles className="size-4.5 text-[#c38bff]" aria-hidden="true" />
            <span>{data.aiSweepTitle}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {data.aiPlatforms.map((item) => {
              const tone = getServiceAccent(item.tone);
              return (
                <div
                  key={item.platform}
                  className={cn(
                    'flex items-center gap-2 rounded-full border bg-white/4 px-3 py-1 font-mono text-caption text-(--glass-text)',
                    tone.border,
                  )}
                >
                  <span className={cn('size-2 rounded-full', tone.dot)} aria-hidden="true" />
                  <span>
                    {item.platform}: <strong>{item.status}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-4 md:grid-cols-3">
          {data.highlights.map((hl) => (
            <div
              key={hl}
              className="flex items-center gap-2 font-mono text-caption text-(--glass-text-muted)"
            >
              <span className="text-(--glass-cyan)" aria-hidden="true">
                ●
              </span>
              <span>{hl}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
