import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ServicePageContent } from '@/content/services/types';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';
import { CountUp } from './motion/CountUp';
import { GlassSpotlight } from './motion/GlassSpotlight';

export function PerformanceSecurity({
  benchmarks,
}: {
  benchmarks: ServicePageContent['benchmarks'];
}) {
  const { speed, security } = benchmarks;

  return (
    <section
      aria-label="Performance targets and security"
      className="grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {/* Speed Targets Panel */}
      <GlassSpotlight className="flex flex-col justify-between rounded-lg p-6 sm:p-8">
        <div>
          <span className="font-mono text-caption tracking-wider text-(--glass-cyan) uppercase">
            {speed.eyebrow}
          </span>
          <h3 className="mt-1.5 font-heading text-h4 font-bold text-(--glass-text)">
            {speed.title}
          </h3>
          <p className="mt-1.5 text-small leading-relaxed text-(--glass-text-muted)">
            {speed.description}
          </p>
        </div>

        <div className="my-6 grid grid-cols-3 gap-3">
          {speed.gauges.map((gauge) => {
            const strokeColor =
              gauge.accent === 'cyan'
                ? '#4cd7f6'
                : gauge.accent === 'violet'
                  ? '#c38bff'
                  : '#a743f8';
            const tone = getServiceAccent(gauge.accent);
            return (
              <div
                key={gauge.label}
                className="flex flex-col items-center rounded-md border border-white/12 bg-white/4 p-3 sm:p-4"
              >
                <div className="relative flex size-18 items-center justify-center sm:size-20">
                  <svg className="size-full -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="rgb(255 255 255 / 0.1)"
                      strokeDasharray="100, 100"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={strokeColor}
                      strokeDasharray={`${gauge.targetValue}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                  <CountUp
                    target={gauge.targetValue}
                    suffix="+"
                    className={cn('price absolute font-heading text-h5 font-bold', tone.text)}
                  />
                </div>
                <span className="mt-2.5 text-center text-caption font-medium text-(--glass-text)">
                  {gauge.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-right">
          <span className="font-mono text-caption text-(--glass-cyan)">{speed.footnote}</span>
        </div>
      </GlassSpotlight>

      {/* Secure by Default Panel */}
      <GlassSpotlight className="flex flex-col justify-between rounded-lg p-6 sm:p-8">
        <div>
          <span className="font-mono text-caption tracking-wider text-[#c38bff] uppercase">
            {security.eyebrow}
          </span>
          <h3 className="mt-1.5 font-heading text-h4 font-bold text-(--glass-text)">
            {security.title}
          </h3>
          <p className="mt-1.5 text-small leading-relaxed text-(--glass-text-muted)">
            {security.description}
          </p>
        </div>

        <ul className="my-6 space-y-3">
          {security.items.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-body text-(--glass-text)">
              <ServiceIcon name={item.icon} className="size-5 shrink-0 text-(--glass-cyan)" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <div>
          <Link
            href={security.linkHref}
            className="inline-flex min-h-11 items-center gap-1.5 text-small font-semibold text-[#c38bff] transition-colors [@media(hover:hover)]:hover:text-white"
          >
            <span>{security.linkLabel}</span>
            <ArrowRight className="size-4" aria-hidden="true" strokeWidth={1.75} />
          </Link>
        </div>
      </GlassSpotlight>
    </section>
  );
}
