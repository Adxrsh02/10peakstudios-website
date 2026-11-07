'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback?: ((token: string) => void) | undefined;
          'error-callback'?: (() => void) | undefined;
          'expired-callback'?: (() => void) | undefined;
          theme?: ('light' | 'dark' | 'auto') | undefined;
          size?: ('normal' | 'compact' | 'flexible') | undefined;
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: (() => void) | undefined;
  onExpire?: (() => void) | undefined;
  resetTrigger?: number | undefined;
};

export function TurnstileWidget({
  siteKey,
  onVerify,
  onError,
  onExpire,
  resetTrigger = 0,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  // 1. Lazy load Turnstile script
  useEffect(() => {
    if (window.turnstile) {
      const timer = setTimeout(() => setScriptLoaded(true), 0);
      return () => clearTimeout(timer);
    }

    const existingScript = document.getElementById('cf-turnstile-script');
    if (existingScript) {
      const onLoad = () => setScriptLoaded(true);
      existingScript.addEventListener('load', onLoad);
      return () => existingScript.removeEventListener('load', onLoad);
    }

    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setLoadFailed(true);
    document.head.appendChild(script);
  }, []);

  // 2. Render widget when script is ready
  useEffect(() => {
    if (!scriptLoaded || !containerRef.current || !window.turnstile) return;

    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        // Safe cleanup
      }
    }

    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        'error-callback': onError,
        'expired-callback': onExpire,
        theme: 'light',
        size: 'normal',
      });
    } catch {
      setTimeout(() => setLoadFailed(true), 0);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Safe unmount
        }
      }
    };
  }, [scriptLoaded, siteKey, onVerify, onError, onExpire]);

  // 3. Handle explicit reset trigger
  useEffect(() => {
    if (resetTrigger > 0 && widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // Safe reset
      }
    }
  }, [resetTrigger]);

  if (loadFailed) {
    return (
      <div className="rounded-sm border border-border bg-surface-sunken p-3 text-caption text-muted-foreground">
        Security check could not load. You can still reach us directly via WhatsApp or phone.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex min-h-[65px] items-center justify-start overflow-hidden"
      aria-label="Cloudflare Turnstile Verification"
    />
  );
}
