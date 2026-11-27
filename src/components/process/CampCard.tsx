import { CheckCircle2, Flag, LockOpen, PenTool, ShieldCheck } from 'lucide-react';
import type { CampCodedVisual, ResolvedAscentCamp } from '@/content/process';
import { cn } from '@/lib/cn';
import { ProcessPhotoFrame } from './ProcessPhotoFrame';

type CampCardProps = {
  camp: ResolvedAscentCamp;
  active?: boolean;
  className?: string;
};

function CodedCampVisual({ visual }: { visual: CampCodedVisual }) {
  if (visual.kind === 'gate') {
    const Icon = visual.icon === 'lock-open' ? LockOpen : PenTool;
    return (
      <div
        aria-hidden="true"
        className="flex h-36 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-gradient-to-br from-(--color-peak-violet)/22 to-(--ascent-dark-elevated)"
      >
        <Icon
          className={cn(
            'size-8',
            visual.icon === 'lock-open' ? 'text-(--color-lilac-spark)' : 'text-(--ascent-cyan)',
          )}
          strokeWidth={1.75}
        />
        <span className="font-mono text-caption font-medium tracking-[0.06em] text-(--ascent-dark-muted)">
          {visual.code}
        </span>
      </div>
    );
  }

  if (visual.kind === 'prototype') {
    return (
      <div className="flex h-36 flex-col justify-between rounded-xl border border-white/12 bg-gradient-to-br from-(--color-peak-violet)/18 via-(--ascent-dark-elevated) to-(--ascent-dark-canvas) p-3.5">
        <span className="font-mono text-[11px] font-medium tracking-wider text-(--color-inverse-link)">
          {visual.badge}
        </span>
        <div className="grid grid-cols-3 gap-2">
          {visual.screens.map((screen) => (
            <div
              key={screen.title}
              className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-2"
            >
              <span className="text-[11px] font-semibold text-(--ascent-dark-text)">
                {screen.title}
              </span>
              <span className="mt-1 text-[10px] leading-tight text-(--ascent-dark-muted)">
                {screen.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-36 flex-col justify-between rounded-xl border border-white/12 bg-gradient-to-br from-(--color-deep-violet)/25 via-(--ascent-dark-elevated) to-(--ascent-dark-canvas) p-3.5">
      <span className="font-mono text-[11px] font-medium tracking-wider text-(--ascent-cyan)">
        {visual.badge}
      </span>
      <ul className="space-y-1.5">
        {visual.checks.map((item) => (
          <li key={item} className="flex items-center gap-2 text-caption text-(--ascent-dark-text)">
            <CheckCircle2
              className="size-3.5 shrink-0 text-(--color-success-inverse)"
              aria-hidden="true"
              strokeWidth={2}
            />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CampCard({ camp, active = false, className }: CampCardProps) {
  return (
    <li
      data-camp-card={camp.step}
      data-active={active ? 'true' : undefined}
      className={cn(
        'ascent-dark-glass-strong relative flex flex-col justify-between rounded-[24px] p-5 transition-[border-color,box-shadow,transform] duration-300 sm:p-6',
        camp.isSummit && 'border-(--ascent-cyan)/45 shadow-[0_0_32px_rgb(76_215_246/0.18)]',
        active &&
          !camp.isSummit &&
          'border-(--color-lilac-spark)/65 shadow-[0_0_30px_rgb(142_33_252/0.35)]',
        className,
      )}
    >
      <div>
        <div className="mb-4 flex items-center justify-between gap-2">
          <span
            className={cn(
              'rounded px-2.5 py-1 font-mono text-caption font-medium tracking-wider',
              camp.isSummit
                ? 'border border-(--ascent-cyan)/40 bg-(--ascent-cyan-soft) text-(--ascent-cyan)'
                : 'border border-(--color-lilac-spark)/40 bg-(--color-peak-violet)/25 text-(--color-inverse-link)',
            )}
          >
            {camp.code}
          </span>

          {camp.isSummit ? (
            <Flag className="size-4 text-(--ascent-cyan)" aria-hidden="true" strokeWidth={2} />
          ) : camp.hasApprovalGate ? (
            <ShieldCheck
              className="size-4 text-(--color-inverse-link)"
              aria-hidden="true"
              strokeWidth={2}
            />
          ) : (
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full bg-(--color-lilac-spark) shadow-[0_0_8px_var(--color-lilac-spark)]"
            />
          )}
        </div>

        <h3 className="m-0 mb-2 font-heading text-h4 font-semibold text-(--ascent-dark-text)">
          {camp.title}
        </h3>

        <p className="mb-4 text-small leading-relaxed text-(--ascent-dark-muted)">
          {camp.description}
        </p>

        <div className="mb-4">
          {camp.image?.src ? (
            <ProcessPhotoFrame
              dark
              image={camp.image}
              sizes="(max-width: 1023px) 88vw, 360px"
              className={cn('h-36 rounded-xl', camp.isSummit && 'border border-(--ascent-cyan)/30')}
            />
          ) : camp.codedVisual ? (
            <CodedCampVisual visual={camp.codedVisual} />
          ) : camp.image ? (
            <ProcessPhotoFrame
              dark
              image={camp.image}
              sizes="(max-width: 1023px) 88vw, 360px"
              className={cn('h-36 rounded-xl', camp.isSummit && 'border border-(--ascent-cyan)/30')}
            />
          ) : null}
        </div>
      </div>

      <dl className="space-y-2 text-caption">
        <div
          className={cn(
            'rounded-lg border p-2.5',
            camp.isSummit ? 'border-(--ascent-cyan)/25 bg-black/45' : 'border-white/10 bg-black/35',
          )}
        >
          <dt className="font-mono text-[11px] font-medium tracking-wider text-(--ascent-dark-meta) uppercase">
            What you get
          </dt>
          <dd className="mt-0.5 font-medium text-(--ascent-dark-text)">{camp.whatYouGet}</dd>
        </div>

        <div
          className={cn(
            'rounded-lg border p-2.5',
            camp.isSummit ? 'border-(--ascent-cyan)/25 bg-black/45' : 'border-white/10 bg-black/35',
          )}
        >
          <dt className="font-mono text-[11px] font-medium tracking-wider text-(--ascent-dark-meta) uppercase">
            Your part
          </dt>
          <dd className="mt-0.5 font-medium text-(--ascent-dark-text)">{camp.yourPart}</dd>
        </div>
      </dl>
    </li>
  );
}
