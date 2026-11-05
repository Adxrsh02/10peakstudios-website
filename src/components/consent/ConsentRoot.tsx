'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { OPEN_CONSENT_EVENT, markPendingOpen } from '@/lib/consent';

const ConsentManager = dynamic(() => import('./ConsentManager').then((m) => m.ConsentManager), {
  ssr: false,
});

type Props = {
  ga4Id?: string | undefined;
  clarityId?: string | undefined;
  cfToken?: string | undefined;
};

/**
 * Loads the consent manager (banner, dialog, analytics loader, Motion) on idle so it stays out of
 * the critical bundle (Architecture.md 14). Nothing non-essential runs before it anyway, and the
 * banner only appears after the loader. A "Privacy choices" click before then loads it immediately.
 */
export function ConsentRoot(props: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = () => setReady(true);
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 2500 })
      : window.setTimeout(load, 1200);
    const onOpen = () => {
      markPendingOpen();
      setReady(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
      window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
    };
  }, []);

  return ready ? <ConsentManager {...props} /> : null;
}
