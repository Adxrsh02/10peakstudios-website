'use client';

import { OPEN_CONSENT_EVENT } from '@/lib/consent';

/** Footer control that re-opens consent preferences (PRD-ANL-06). */
export function PrivacyChoicesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))}
    >
      Privacy choices
    </button>
  );
}
