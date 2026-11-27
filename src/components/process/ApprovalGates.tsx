'use client';

import { useRef, useState } from 'react';
import {
  CalendarCheck,
  Link2,
  Lock,
  LockOpen,
  MessageSquare,
  MousePointerClick,
  Palette,
  Rocket,
  UserCheck,
} from 'lucide-react';
import { useMotionEffect } from '@/components/motion/MotionProvider';
import type { ResolvedProcessContent } from '@/content/process';
import { cn } from '@/lib/cn';

type ApprovalGatesProps = {
  gates: ResolvedProcessContent['gates'];
};

function GateIcon({
  icon,
  unlocked,
}: {
  icon: ResolvedProcessContent['gates']['items'][number]['icon'];
  unlocked: boolean;
}) {
  if (icon === 'lock') {
    const Icon = unlocked ? LockOpen : Lock;
    return (
      <Icon aria-hidden="true" className="size-7 text-(--color-inverse-link)" strokeWidth={1.75} />
    );
  }
  if (icon === 'palette') {
    return (
      <Palette
        aria-hidden="true"
        className="size-7 text-(--color-inverse-link)"
        strokeWidth={1.75}
      />
    );
  }
  if (icon === 'pointer') {
    return (
      <MousePointerClick
        aria-hidden="true"
        className="size-7 text-(--color-lilac-spark)"
        strokeWidth={1.75}
      />
    );
  }
  return <Rocket aria-hidden="true" className="size-7 text-(--ascent-cyan)" strokeWidth={1.75} />;
}

function AlwaysIcon({
  icon,
}: {
  icon: ResolvedProcessContent['gates']['alwaysItems'][number]['icon'];
}) {
  if (icon === 'user-check')
    return <UserCheck aria-hidden="true" className="size-5" strokeWidth={1.75} />;
  if (icon === 'link') return <Link2 aria-hidden="true" className="size-5" strokeWidth={1.75} />;
  if (icon === 'message-square')
    return <MessageSquare aria-hidden="true" className="size-5" strokeWidth={1.75} />;
  return <CalendarCheck aria-hidden="true" className="size-5" strokeWidth={1.75} />;
}

export function ApprovalGates({ gates }: ApprovalGatesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [unlockedCount, setUnlockedCount] = useState(gates.items.length);

  useMotionEffect(ref, ({ ScrollTrigger }, tier, root) => {
    if (tier === 0) {
      setUnlockedCount(gates.items.length);
      return;
    }

    if (root.getBoundingClientRect().top <= window.innerHeight * 0.9) {
      setUnlockedCount(gates.items.length);
      return;
    }

    setUnlockedCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gates.items.forEach((_, idx) => {
          const timer = setTimeout(() => {
            setUnlockedCount(idx + 1);
          }, idx * 140);
          timers.push(timer);
        });
      },
    });

    return () => {
      trigger.kill();
      timers.forEach((t) => clearTimeout(t));
    };
  });

  return (
    <section
      aria-labelledby="process-gates-heading"
      className="ascent-dark relative overflow-hidden py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-72 w-[min(44rem,90vw)] -translate-x-1/2 rounded-full bg-gradient-to-r from-(--color-peak-violet)/20 to-(--color-lilac-spark)/20 blur-[120px]"
      />

      <div ref={ref} className="relative z-10 container-content">
        <div className="mx-auto mb-12 max-w-xl text-center lg:mb-14">
          <span className="mb-2 block font-mono text-caption font-medium tracking-[0.08em] text-(--color-inverse-link) uppercase">
            [ {gates.eyebrow} ]
          </span>
          <h2
            id="process-gates-heading"
            className="m-0 font-heading text-h2 font-bold tracking-tight text-(--ascent-dark-text)"
          >
            {gates.titleLead}{' '}
            <span className="bg-gradient-to-r from-(--color-inverse-link) to-(--ascent-cyan) bg-clip-text text-transparent">
              {gates.titleAccent}
            </span>
          </h2>
        </div>

        <ol className="m-0 mb-12 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {gates.items.map((gate, idx) => {
            const unlocked = idx < unlockedCount;
            return (
              <li
                key={gate.code}
                className={cn(
                  'ascent-dark-glass flex flex-col items-center rounded-2xl p-6 text-center transition-colors duration-300',
                  unlocked && 'border-(--color-lilac-spark)/45',
                )}
              >
                <div
                  data-unlocked={unlocked ? 'true' : undefined}
                  className={cn(
                    'ascent-gate-badge mb-4 flex size-14 items-center justify-center rounded-2xl border transition-colors',
                    unlocked
                      ? 'border-(--color-lilac-spark)/55 bg-(--color-peak-violet)/25'
                      : 'border-white/15 bg-white/5',
                  )}
                >
                  <GateIcon icon={gate.icon} unlocked={unlocked} />
                </div>

                <span className="mb-1 font-mono text-caption font-medium tracking-wider text-(--ascent-dark-meta)">
                  {gate.code}
                </span>
                <h3 className="m-0 mb-2 font-heading text-h5 font-semibold text-(--ascent-dark-text)">
                  {gate.title}
                </h3>
                <p className="text-small text-(--ascent-dark-muted)">{gate.description}</p>
              </li>
            );
          })}
        </ol>

        <div className="ascent-dark-glass rounded-[24px] p-6 sm:p-8">
          <h3 className="m-0 mb-6 text-center font-heading text-h5 font-semibold text-(--ascent-dark-text)">
            {gates.alwaysTitle}
          </h3>
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {gates.alwaysItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-(--color-lilac-spark)/35 bg-(--color-peak-violet)/25 text-(--color-inverse-link)">
                  <AlwaysIcon icon={item.icon} />
                </span>
                <span className="text-body font-medium text-(--ascent-dark-text)">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
