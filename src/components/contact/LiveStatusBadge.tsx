'use client';

import { useSyncExternalStore } from 'react';
import { getStudioStatus, type StudioStatus } from '@/lib/business-hours';

let cachedSnapshot: StudioStatus | null = null;

function getSnapshot(): StudioStatus {
  if (!cachedSnapshot) {
    cachedSnapshot = getStudioStatus();
  }
  return cachedSnapshot;
}

function subscribe(callback: () => void) {
  const update = () => {
    const next = getStudioStatus();
    if (
      !cachedSnapshot ||
      next.isOpen !== cachedSnapshot.isOpen ||
      next.statusText !== cachedSnapshot.statusText ||
      next.detailText !== cachedSnapshot.detailText
    ) {
      cachedSnapshot = next;
      callback();
    }
  };
  const timer = setInterval(update, 60000);
  return () => clearInterval(timer);
}

function getServerSnapshot(): StudioStatus | null {
  return null;
}

export function LiveStatusBadge() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!status) {
    // Hydration-safe initial state (rendered on server and first client pass)
    return (
      <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface-sunken px-2.5 py-1 text-caption font-medium text-muted-foreground">
        <span className="size-2 rounded-full bg-slate-lavender" aria-hidden="true" />
        Checking hours...
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-caption font-semibold ${
            status.isOpen
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-border bg-surface-sunken text-muted-foreground'
          }`}
          aria-live="polite"
        >
          <span
            className={`size-2 rounded-full ${
              status.isOpen ? 'animate-pulse bg-emerald-500' : 'bg-slate-lavender'
            }`}
            aria-hidden="true"
          />
          {status.statusText}
        </span>
      </div>
      <p className="text-caption text-muted-foreground">{status.detailText}</p>
    </div>
  );
}
