'use client';

import { Check } from 'lucide-react';
import { services } from '@/content/services';
import type { ServiceSlug } from '@/lib/schemas/lead';

type ServiceSelectorProps = {
  selected: ServiceSlug[];
  onChange: (selected: ServiceSlug[]) => void;
  error?: string | undefined;
};

export function ServiceSelector({ selected, onChange, error }: ServiceSelectorProps) {
  const toggle = (slug: ServiceSlug) => {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <label id="services-label" className="text-small font-semibold text-foreground">
          Services of Interest <span className="text-primary">*</span>
          <span className="sr-only"> (required, select at least one)</span>
        </label>
        <span className="text-caption text-muted-foreground">Select all that apply</span>
      </div>

      <div
        role="group"
        aria-labelledby="services-label"
        aria-describedby={error ? 'services-error' : undefined}
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
      >
        {services.map((service) => {
          const isSelected = selected.includes(service.slug as ServiceSlug);
          return (
            <button
              key={service.slug}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => toggle(service.slug as ServiceSlug)}
              className={`group/chip relative flex min-h-[48px] items-center justify-between rounded-sm border p-3 text-left transition-all duration-(--duration-fast) focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                isSelected
                  ? 'border-primary bg-primary/8 text-primary shadow-xs'
                  : 'border-border bg-background text-foreground hover:border-primary/50 hover:bg-surface-sunken/40'
              }`}
            >
              <span className="text-[0.8125rem] leading-snug font-medium">{service.name}</span>
              <span
                className={`ml-1.5 grid size-4 shrink-0 place-items-center rounded-xs border transition-colors ${
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-border bg-background group-hover/chip:border-muted-foreground'
                }`}
                aria-hidden="true"
              >
                {isSelected && <Check className="size-3 stroke-[2.5]" />}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p id="services-error" className="text-caption font-medium text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
