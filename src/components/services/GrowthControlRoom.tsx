'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { Check, Network, Pause, Play, X } from 'lucide-react';
import type { GrowthControlNode, GrowthControlRoomData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { getServiceAccent, ServiceIcon } from './ServiceIcon';

type GrowthControlRoomProps = {
  slug: string;
  data: GrowthControlRoomData;
};

/**
 * 8 interconnected growth disciplines:
 * - Desktop (`md+`): slow rotating ring of 8 real node buttons (pauses on hover, focus,
 *   offscreen, hidden tab, or explicit Pause button) paired with an interactive detail panel.
 * - Mobile (`< 768px`): 2-column button grid that opens an accessible bottom sheet dialog
 *   with focus trap, Escape/close button, swipe-down dismiss, and focus restoration.
 */
export function GrowthControlRoom({ slug, data }: GrowthControlRoomProps) {
  const [selectedId, setSelectedId] = useState(data.nodes[0]?.id ?? '');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const sheetTouchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) setInView(entries[0].isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Accessible bottom sheet keyboard + focus trap on mobile
  useEffect(() => {
    if (!sheetOpen) return;
    const sheet = sheetRef.current;
    const focusables = sheet?.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])',
    );
    focusables?.[0]?.focus();

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSheetOpen(false);
        lastTriggerRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sheetOpen]);

  const activeNode: GrowthControlNode | undefined =
    data.nodes.find((n) => n.id === selectedId) ?? data.nodes[0];
  const effectivePaused = paused || !inView || tabHidden;

  const openNode = (nodeId: string, openMobileSheet: boolean, trigger?: HTMLButtonElement) => {
    setSelectedId(nodeId);
    if (trigger) lastTriggerRef.current = trigger;
    if (openMobileSheet) setSheetOpen(true);
    track('control_node_open', { service_slug: slug, node_id: nodeId });
  };

  const closeSheet = () => {
    setSheetOpen(false);
    lastTriggerRef.current?.focus();
  };

  const handleSheetTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (touch) sheetTouchStartYRef.current = touch.clientY;
  };

  const handleSheetTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const startY = sheetTouchStartYRef.current;
    const touch = e.changedTouches[0];
    sheetTouchStartYRef.current = null;
    if (startY !== null && touch && touch.clientY - startY > 50) {
      closeSheet();
    }
  };

  return (
    <section aria-labelledby="control-room-heading" className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-2xl flex-col items-start gap-2">
          <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
            {data.eyebrow}
          </span>
          <h2
            id="control-room-heading"
            className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
          >
            {data.title}
          </h2>
          <p className="text-body leading-relaxed text-(--glass-text-muted)">{data.lead}</p>
        </div>

        <button
          type="button"
          aria-pressed={paused}
          aria-label={paused ? 'Resume control ring rotation' : 'Pause control ring rotation'}
          onClick={() => setPaused((p) => !p)}
          className="hidden min-h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-caption text-(--glass-text-muted) hover:bg-white/10 md:inline-flex"
        >
          {paused ? (
            <Play className="size-3.5" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" aria-hidden="true" />
          )}
          <span>{paused ? 'Resume ring' : 'Pause ring'}</span>
        </button>
      </div>

      {/* Desktop Rotating 8-Node Ring + Detail Panel */}
      <div
        ref={containerRef}
        data-paused={effectivePaused ? 'true' : 'false'}
        className="service-orbit-container hidden grid-cols-12 items-center gap-8 md:grid"
      >
        <div className="relative col-span-7 flex h-[430px] items-center justify-center">
          {/* Outer Guide Circle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute size-[340px] rounded-full border border-dashed border-[#c38bff]/30"
          />

          {/* Center Core Node */}
          <div className="glass-card-strong relative z-10 flex size-32 flex-col items-center justify-center rounded-full border border-[#c38bff]/50 bg-[#0d0a16]/95 p-3 text-center shadow-[0_0_40px_-8px_rgb(142_33_252/0.55)]">
            <Network className="size-6 text-[#c38bff]" aria-hidden="true" />
            <span className="mt-1 font-heading text-caption font-semibold text-(--glass-text)">
              {data.hubTitle}
            </span>
            <span className="font-mono text-[10px] text-(--glass-cyan)">{data.hubSubtitle}</span>
          </div>

          {/* Slowly Rotating Orbit Ring with Counter-Rotating Node Buttons */}
          <div className="service-orbit-ring absolute size-[340px]">
            {data.nodes.map((node, idx) => {
              const angle = (idx / data.nodes.length) * 2 * Math.PI - Math.PI / 2;
              const leftPct = 50 + Math.cos(angle) * 50;
              const topPct = 50 + Math.sin(angle) * 50;
              const isSelected = activeNode?.id === node.id;
              const tone = getServiceAccent(node.accent);

              return (
                <div
                  key={node.id}
                  style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => openNode(node.id, false)}
                    onMouseEnter={() => openNode(node.id, false)}
                    onFocus={() => openNode(node.id, false)}
                    className={cn(
                      'service-orbit-counter flex min-h-11 min-w-[116px] items-center justify-center gap-1.5 rounded-full border px-3 py-2 font-heading text-caption font-medium backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                      isSelected
                        ? 'glass-cta-primary border-white/40 text-white shadow-[0_0_24px_rgb(142_33_252/0.6)]'
                        : 'border-white/15 bg-[#120f1c]/95 text-(--glass-text) hover:border-[#c38bff]/60',
                    )}
                  >
                    <ServiceIcon
                      name={node.icon}
                      className={cn('size-3.5 shrink-0', isSelected ? 'text-white' : tone.text)}
                    />
                    <span className="whitespace-nowrap">{node.shortLabel}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Side Detail Panel */}
        {activeNode && (
          <div className="glass-card-strong glass-specular col-span-5 flex flex-col justify-between rounded-lg p-7">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-caption text-(--glass-cyan)">
                  Channel {activeNode.number}
                </span>
                <span
                  className={cn(
                    'flex size-10 items-center justify-center rounded-md border',
                    getServiceAccent(activeNode.accent).badge,
                  )}
                >
                  <ServiceIcon name={activeNode.icon} className="size-5" />
                </span>
              </div>

              <h3 className="m-0 font-heading text-h4 font-semibold text-(--glass-text)">
                {activeNode.title}
              </h3>
              <p className="text-small leading-relaxed text-(--glass-text-muted)">
                {activeNode.summary}
              </p>

              <ul className="space-y-2.5 border-t border-white/10 pt-4 text-small text-(--glass-text)">
                {activeNode.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-(--glass-cyan)"
                      aria-hidden="true"
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Mobile (< 768px): 2-Column Grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {data.nodes.map((node) => {
          const tone = getServiceAccent(node.accent);
          const isSelected = activeNode?.id === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={(e) => openNode(node.id, true, e.currentTarget)}
              className={cn(
                'glass-card flex min-h-20 flex-col items-start justify-between gap-2 rounded-lg border p-3.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                isSelected ? 'border-[#c38bff]/60 bg-[#8e21fc]/15' : 'border-white/12',
              )}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span className={cn('font-mono text-[11px]', tone.text)}>{node.number}</span>
                <ServiceIcon name={node.icon} className={cn('size-4', tone.text)} />
              </div>
              <span className="font-heading text-small font-semibold text-(--glass-text)">
                {node.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Accessible Bottom Sheet Dialog */}
      {sheetOpen && activeNode && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/70 md:hidden"
          onClick={closeSheet}
        >
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="control-sheet-title"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleSheetTouchStart}
            onTouchEnd={handleSheetTouchEnd}
            className="glass-card-strong w-full rounded-t-2xl border-t border-[#c38bff]/50 bg-[#120f1c] p-6 pb-8 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/25" aria-hidden="true" />
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-caption text-(--glass-cyan)">
                Channel {activeNode.number}
              </span>
              <button
                type="button"
                aria-label="Close channel details"
                onClick={closeSheet}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-(--glass-text)"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
            <h3
              id="control-sheet-title"
              className="mt-2 font-heading text-h4 font-semibold text-(--glass-text)"
            >
              {activeNode.title}
            </h3>
            <p className="mt-2 text-small leading-relaxed text-(--glass-text-muted)">
              {activeNode.summary}
            </p>
            <ul className="mt-4 space-y-2 border-t border-white/10 pt-3.5 text-small text-(--glass-text)">
              {activeNode.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-(--glass-cyan)"
                    aria-hidden="true"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
