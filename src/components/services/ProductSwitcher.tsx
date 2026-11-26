'use client';

import { useState, type KeyboardEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { ProductSwitcherData } from '@/content/services/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { getServiceExtendedTone, ServiceIcon } from './ServiceIcon';

type ProductSwitcherProps = {
  slug: string;
  data: ProductSwitcherData;
};

/**
 * Interactive 6-category software showcase with accessible `tablist`/`tabpanel`
 * semantics (`ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`/`Home`/`End`) and live
 * HTML/CSS glass mockup rendering statically on SSR with zero empty frame or CLS.
 */
export function ProductSwitcher({ slug, data }: ProductSwitcherProps) {
  const [activeId, setActiveId] = useState(data.products[0]?.id ?? '');
  const activeProduct = data.products.find((item) => item.id === activeId) ?? data.products[0];

  const selectProduct = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    track('service_product_switch', { service_slug: slug, product_id: id });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const count = data.products.length;
    if (count === 0) return;

    let nextIndex: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % count;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + count) % count;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = count - 1;
    }

    if (nextIndex === null) return;
    e.preventDefault();
    const target = data.products[nextIndex];
    if (!target) return;
    selectProduct(target.id);
    document.getElementById(`product-tab-${target.id}`)?.focus();
  };

  return (
    <section aria-labelledby="product-switcher-heading" className="space-y-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 text-center">
        <span className="eyebrow-bracket font-mono text-caption font-medium tracking-[0.1em] text-[#c38bff] uppercase">
          {data.eyebrow}
        </span>
        <h2
          id="product-switcher-heading"
          className="m-0 font-heading text-h2 tracking-[-0.02em] text-(--glass-text)"
        >
          {data.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column: 6 Product Selectors */}
        <div
          role="tablist"
          aria-label="Types of custom web applications"
          className="flex flex-col gap-2.5 lg:col-span-5"
        >
          {data.products.map((item, idx) => {
            const isSelected = activeProduct?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                id={`product-tab-${item.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="product-switcher-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => selectProduct(item.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={cn(
                  'w-full rounded-lg border p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--glass-cyan)',
                  isSelected
                    ? 'border-[#c38bff]/45 bg-[rgb(142_33_252/0.18)] shadow-[0_0_24px_-8px_rgb(142_33_252/0.55)]'
                    : 'border-white/10 bg-white/4 hover:border-white/20 hover:bg-white/7',
                )}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="font-heading text-small font-semibold text-(--glass-text)">
                    {item.title}
                  </span>
                  <ServiceIcon
                    name={item.icon}
                    className={cn(
                      'size-4.5 shrink-0',
                      isSelected ? 'text-[#c38bff]' : 'text-(--glass-text-meta)',
                    )}
                  />
                </div>
                <p className="text-caption leading-relaxed text-(--glass-text-muted)">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: Live Morphing Preview Screen */}
        {activeProduct && (
          <div
            id="product-switcher-panel"
            role="tabpanel"
            aria-labelledby={`product-tab-${activeProduct.id}`}
            className="glass-card-strong glass-specular flex min-h-[430px] flex-col justify-between rounded-lg p-5 sm:p-7 lg:col-span-7"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-white/4 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full bg-(--color-peak-violet)"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-caption text-(--glass-text)">
                    {activeProduct.mockup.headerLabel}
                  </span>
                </div>
                <span className="rounded-full border border-white/12 bg-white/6 px-2 py-0.5 font-mono text-[10px] tracking-wider text-(--glass-text-meta) uppercase">
                  {activeProduct.mockup.sampleLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeProduct.mockup.metrics.map((metric) => {
                  const tone = getServiceExtendedTone(metric.tone);
                  return (
                    <div
                      key={metric.label}
                      className="rounded-md border border-white/10 bg-white/5 p-4"
                    >
                      <span className="text-caption text-(--glass-text-muted)">{metric.label}</span>
                      <div className={cn('mt-1 font-heading text-h4 font-semibold', tone.text)}>
                        {metric.value}
                      </div>
                      <div className="mt-1 font-mono text-[11px] text-(--glass-emerald)">
                        {metric.delta}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2 rounded-md border border-white/10 bg-white/4 p-3.5">
                <div className="font-mono text-[11px] tracking-wider text-(--glass-text-meta) uppercase">
                  {activeProduct.mockup.rowsTitle}
                </div>
                {activeProduct.mockup.rows.map((row) => {
                  const tone = getServiceExtendedTone(row.tone);
                  return (
                    <div
                      key={row.primary}
                      className="flex flex-wrap items-center justify-between gap-2 rounded bg-white/5 px-3 py-2 text-caption"
                    >
                      <div>
                        <div className="font-medium text-(--glass-text)">{row.primary}</div>
                        <div className="font-mono text-[11px] text-(--glass-text-meta)">
                          {row.secondary}
                        </div>
                      </div>
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 font-mono text-[10px]',
                          tone.badge,
                        )}
                      >
                        {row.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-md border border-white/10 bg-white/4 px-4 py-3 text-caption">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#c38bff]" aria-hidden="true" />
              <span className="text-(--glass-text-muted)">
                <strong className="font-semibold text-(--glass-text)">Good fit if:</strong>{' '}
                {activeProduct.fitText}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
