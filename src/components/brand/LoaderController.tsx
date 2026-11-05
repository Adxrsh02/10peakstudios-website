'use client';

import { useEffect, useState, type ReactNode } from 'react';

/** Unmounts the loader once the bootstrap marks it "off" or "done" (removed from the DOM). */
export function LoaderController({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const check = () => {
      const state = html.getAttribute('data-loader');
      if (state === 'off' || state === null) setMounted(false);
      else if (state === 'done') timer = setTimeout(() => setMounted(false), 320);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(html, { attributes: true, attributeFilter: ['data-loader'] });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return mounted ? children : null;
}
