'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import { whatsappUrl } from '@/lib/whatsapp';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback?: ((token: string) => void) | undefined;
          'error-callback'?: ((errorCode?: string) => void) | undefined;
          'expired-callback'?: (() => void) | undefined;
          'timeout-callback'?: (() => void) | undefined;
          theme?: ('light' | 'dark' | 'auto') | undefined;
          size?: ('normal' | 'compact' | 'flexible') | undefined;
          retry?: ('auto' | 'never') | undefined;
          'retry-interval'?: number | undefined;
          'refresh-expired'?: ('auto' | 'manual' | 'never') | undefined;
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

/**
 * Loads the Cloudflare Turnstile explicit rendering script once per window session.
 */
function ensureTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById('cf-turnstile-script') as HTMLScriptElement | null;
    if (existing) {
      if (window.turnstile) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener(
        'error',
        () => {
          scriptPromise = null;
          reject(new Error('Turnstile script failed to load'));
        },
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.id = 'cf-turnstile-script';
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

type TurnstileStatus = 'idle' | 'loading' | 'success' | 'error' | 'expired' | 'timeout';

type TurnstileWidgetProps = {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: (() => void) | undefined;
  onError?: ((errorCode?: string) => void) | undefined;
  onTimeout?: (() => void) | undefined;
  resetTrigger?: number | undefined;
  whatsappNumber?: string | undefined;
};

export function TurnstileWidget({
  siteKey,
  onVerify,
  onExpire,
  onError,
  onTimeout,
  resetTrigger = 0,
  whatsappNumber,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const isMountedRef = useRef(true);

  const [status, setStatus] = useState<TurnstileStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Keep latest callbacks in ref to prevent re-render loops on parent state changes
  const callbacksRef = useRef({ onVerify, onExpire, onError, onTimeout });
  useEffect(() => {
    callbacksRef.current = { onVerify, onExpire, onError, onTimeout };
  });

  const renderWidget = useCallback(() => {
    if (!containerRef.current || !window.turnstile) return;

    // Clean up any existing widget before re-rendering
    if (widgetIdRef.current) {
      try {
        window.turnstile.remove(widgetIdRef.current);
      } catch {
        /* ignore */
      }
      widgetIdRef.current = null;
    }

    // Clear container children to prevent duplicate iframes under Strict Mode
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const id = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          if (!isMountedRef.current) return;
          setStatus('success');
          setErrorMessage('');
          callbacksRef.current.onVerify(token);
        },
        'error-callback': (errorCode?: string) => {
          if (!isMountedRef.current) return;
          setStatus('error');
          setErrorMessage(
            errorCode
              ? `Security check failed (code: ${errorCode}).`
              : 'Security verification failed.',
          );
          callbacksRef.current.onError?.(errorCode);
        },
        'expired-callback': () => {
          if (!isMountedRef.current) return;
          setStatus('expired');
          setErrorMessage('Verification token expired. Please retry.');
          callbacksRef.current.onExpire?.();
        },
        'timeout-callback': () => {
          if (!isMountedRef.current) return;
          setStatus('timeout');
          setErrorMessage('Verification timed out. Please retry.');
          callbacksRef.current.onTimeout?.();
        },
        theme: 'light',
        size: 'normal',
        retry: 'never',
      });

      widgetIdRef.current = id;
    } catch {
      if (isMountedRef.current) {
        setStatus('error');
        setErrorMessage('Unable to initialize security challenge.');
      }
    }
  }, [siteKey]);

  // Initial script load and single mount
  useEffect(() => {
    isMountedRef.current = true;
    let cancelled = false;

    ensureTurnstileScript()
      .then(() => {
        if (cancelled || !isMountedRef.current) return;
        renderWidget();
      })
      .catch(() => {
        if (cancelled || !isMountedRef.current) return;
        setStatus('error');
        setErrorMessage('Security challenge script could not load.');
      });

    return () => {
      cancelled = true;
      isMountedRef.current = false;
      if (widgetIdRef.current && window.turnstile) {
        const id = widgetIdRef.current;
        widgetIdRef.current = null;
        try {
          window.turnstile.remove(id);
        } catch {
          /* ignore */
        }
      }
    };
  }, [renderWidget]);

  // Handle retry or reset requests
  const handleRetry = useCallback(() => {
    callbacksRef.current.onExpire?.(); // Reset token in parent form
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
        setStatus('loading');
        setErrorMessage('');
        return;
      } catch {
        // Fallback to fresh render if reset throws
      }
    }
    renderWidget();
  }, [renderWidget]);

  // Handle external reset triggers (e.g. server 403 response)
  const prevResetRef = useRef(resetTrigger);
  useEffect(() => {
    if (resetTrigger > prevResetRef.current) {
      prevResetRef.current = resetTrigger;
      handleRetry();
    }
  }, [resetTrigger, handleRetry]);

  const waHref = whatsappUrl(
    whatsappNumber,
    "Hi 10PeakStudio, I'm having trouble with the website contact form.",
  );

  const isFailedState = status === 'error' || status === 'expired' || status === 'timeout';

  return (
    <div className="flex flex-col gap-2">
      {/* Reserved height wrapper for the Turnstile widget (normal size: 300x65 px) */}
      <div
        ref={containerRef}
        className={`min-h-[65px] min-w-[300px] items-center justify-start ${
          isFailedState ? 'hidden' : 'flex'
        }`}
      />

      {/* Error / Timeout / Expired state with Retry button and direct contact fallback */}
      {isFailedState && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3.5 text-small text-foreground"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-caption font-semibold text-destructive">{errorMessage}</span>
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xs border border-border bg-card px-2.5 py-1 text-caption font-semibold text-foreground shadow-xs transition-colors hover:bg-surface-sunken focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              <RotateCw className="size-3" aria-hidden="true" />
              Retry Verification
            </button>
          </div>
          <p className="text-caption text-muted-foreground">
            Having trouble? Reach us directly via{' '}
            <a
              href="tel:+917678083589"
              className="font-medium text-foreground underline hover:text-primary"
            >
              +91 7678083589
            </a>
            {waHref && (
              <>
                {' '}
                or on{' '}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline hover:text-primary"
                >
                  WhatsApp
                </a>
              </>
            )}
            .
          </p>
        </div>
      )}
    </div>
  );
}
