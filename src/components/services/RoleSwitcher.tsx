'use client';

import { useState, type KeyboardEvent } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import type { RoleSwitcherData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

type RoleSwitcherProps = {
  slug: string;
  data: RoleSwitcherData;
};

/**
 * Interactive 4-role permission matrix (`Owner / Manager / Staff / Customer`)
 * demonstrating per-role field masking and restricted module controls with full keyboard
 * `tablist` navigation and screen-reader-safe locked annotations.
 */
export function RoleSwitcher({ slug, data }: RoleSwitcherProps) {
  const [activeId, setActiveId] = useState(data.roles[0]?.id ?? '');
  const activeRole = data.roles.find((r) => r.id === activeId) ?? data.roles[0];

  const selectRole = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    track('service_role_switch', { service_slug: slug, role_id: id });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const count = data.roles.length;
    if (count === 0) return;

    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % count;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + count) % count;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex === null) return;
    e.preventDefault();
    const target = data.roles[nextIndex];
    if (!target) return;
    selectRole(target.id);
    document.getElementById(`role-tab-${target.id}`)?.focus();
  };

  return (
    <section aria-labelledby="role-switcher-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-(--glass-cyan) uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="role-switcher-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
        <p className="max-w-2xl text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
      </div>

      <div className="glass-card-strong glass-specular mx-auto flex max-w-4xl flex-col gap-6 rounded-lg p-5 sm:p-8">
        {/* Segmented Role Selector */}
        <div
          role="tablist"
          aria-label="Preview permissions by user role"
          className="flex flex-wrap justify-center gap-2 rounded-lg border border-white/10 bg-white/4 p-1.5"
        >
          {data.roles.map((role, idx) => {
            const isSelected = activeRole?.id === role.id;
            return (
              <button
                key={role.id}
                type="button"
                id={`role-tab-${role.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="role-matrix-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => selectRole(role.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={cn(
                  'min-h-10 rounded-md px-5 py-2 font-heading text-small font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                  isSelected
                    ? 'glass-cta-primary text-white'
                    : 'text-(--glass-text-muted) hover:bg-white/6 hover:text-(--glass-text)',
                )}
              >
                {role.label}
              </button>
            );
          })}
        </div>

        {/* Role Permission Matrix */}
        {activeRole && (
          <div
            id="role-matrix-panel"
            role="tabpanel"
            aria-labelledby={`role-tab-${activeRole.id}`}
            className="space-y-4 rounded-md border border-white/10 bg-white/3 p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 rounded bg-white/4 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#c38bff]" aria-hidden="true" />
                <span className="font-mono text-small font-semibold text-(--glass-text)">
                  {activeRole.indicatorTitle}
                </span>
              </div>
              <span className="font-mono text-caption text-(--glass-text-meta)">
                {activeRole.badgeText}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {activeRole.modules.map((mod) => (
                <div
                  key={mod.id}
                  aria-label={
                    mod.locked
                      ? (mod.ariaLockedLabel ?? `${mod.label} (restricted for ${activeRole.label})`)
                      : undefined
                  }
                  className={cn(
                    'flex flex-col justify-between rounded-md border p-4 transition-all',
                    mod.locked ? 'border-amber-400/20 bg-white/3' : 'border-white/12 bg-white/6',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-caption text-(--glass-text-muted)">{mod.label}</span>
                    {mod.locked ? (
                      <Lock className="size-4 shrink-0 text-(--glass-amber)" aria-hidden="true" />
                    ) : (
                      <CheckCircle2
                        className="size-4 shrink-0 text-(--glass-emerald)"
                        aria-hidden="true"
                      />
                    )}
                  </div>

                  <div
                    className={cn(
                      'my-2.5 font-heading text-small font-semibold',
                      mod.locked
                        ? 'text-(--glass-text-meta) blur-[3px] select-none'
                        : 'text-[#e1c4ff]',
                    )}
                    aria-hidden={mod.locked ? 'true' : undefined}
                  >
                    {mod.value}
                  </div>

                  <span
                    className={cn(
                      'font-mono text-caption',
                      mod.locked ? 'text-(--glass-amber)' : 'text-(--glass-emerald)',
                    )}
                  >
                    {mod.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
