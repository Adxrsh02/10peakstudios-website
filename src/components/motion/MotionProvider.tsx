'use client';

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { computeTier, readSignals, type MotionTier } from '@/lib/motion-tier';
import { loadMotion, type MotionLib } from '@/lib/motion-loader';

type MotionState = { tier: MotionTier; lib: MotionLib | null };

const MotionContext = createContext<MotionState>({ tier: 0, lib: null });

export const useMotion = () => useContext(MotionContext);

type LenisInstance = {
  raf: (time: number) => void;
  on: (event: 'scroll', cb: () => void) => void;
  stop: () => void;
  start: () => void;
  destroy: () => void;
};

/**
 * Motion orchestration (Architecture.md 9). Reads the tier, lazy-loads GSAP on idle for Tier 1
 * and 2, and runs Lenis on Tier 2 only, driven by gsap.ticker (single loop, RUL-MOT-06).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MotionState>({ tier: 0, lib: null });

  // Tier: from the bootstrap attribute, recomputed on reduced-motion change and on resize.
  useEffect(() => {
    const apply = () => {
      const tier = computeTier(readSignals());
      document.documentElement.setAttribute('data-motion-tier', String(tier));
      setState((s) => (s.tier === tier ? s : { ...s, tier }));
    };
    apply();
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(apply, 250);
    };
    rm.addEventListener('change', apply);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      rm.removeEventListener('change', apply);
      window.removeEventListener('resize', onResize);
      clearTimeout(timer);
    };
  }, []);

  // Lazy-load GSAP on idle once motion is allowed.
  useEffect(() => {
    if (state.tier === 0 || state.lib) return;
    let cancelled = false;
    const start = () => {
      loadMotion().then((lib) => {
        if (!cancelled) setState((s) => ({ ...s, lib }));
      });
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 300);
    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as number);
    };
  }, [state.tier, state.lib]);

  // Lenis (Tier 2 only), synced to ScrollTrigger and paused while scroll is locked by dialogs.
  useEffect(() => {
    const lib = state.lib;
    if (!lib || state.tier !== 2) return;
    let lenis: LenisInstance | null = null;
    let tick: ((time: number) => void) | null = null;
    let observer: MutationObserver | null = null;
    let cancelled = false;
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const instance = new Lenis({ autoRaf: false, anchors: true }) as unknown as LenisInstance;
      lenis = instance;
      instance.on('scroll', lib.ScrollTrigger.update);
      tick = (time: number) => instance.raf(time * 1000);
      lib.gsap.ticker.add(tick);
      lib.gsap.ticker.lagSmoothing(0);
      (window as unknown as { __lenis?: LenisInstance }).__lenis = instance;
      observer = new MutationObserver(() => {
        if (document.body.hasAttribute('data-scroll-locked')) instance.stop();
        else instance.start();
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-scroll-locked'],
      });
    });
    return () => {
      cancelled = true;
      observer?.disconnect();
      if (tick) lib.gsap.ticker.remove(tick);
      lenis?.destroy();
      delete (window as unknown as { __lenis?: LenisInstance }).__lenis;
    };
  }, [state.lib, state.tier]);

  // Refresh trigger positions after fonts settle, then flag the motion layer as ready
  // (html[data-motion-ready]; used by end-to-end tests to avoid racing the lazy GSAP load).
  useEffect(() => {
    if (!state.lib) return;
    const lib = state.lib;
    let cancelled = false;
    const settle = document.fonts ? document.fonts.ready : Promise.resolve();
    void settle.then(() => {
      if (cancelled) return;
      lib.ScrollTrigger.refresh();
      document.documentElement.setAttribute('data-motion-ready', '');
    });
    return () => {
      cancelled = true;
    };
  }, [state.lib]);

  return <MotionContext.Provider value={state}>{children}</MotionContext.Provider>;
}

/**
 * Scoped GSAP effect: equivalent of useGSAP (gsap.context + revert on cleanup) for lazily loaded
 * GSAP. Runs only when the tier is at least `minTier` and GSAP is loaded.
 */
export function useMotionEffect(
  scope: RefObject<HTMLElement | null>,
  effect: (lib: MotionLib, tier: MotionTier, root: HTMLElement) => void | (() => void),
  opts: { minTier?: 1 | 2 } = {},
) {
  const { tier, lib } = useMotion();
  const runEffect = useEffectEvent(effect);
  const minTier = opts.minTier ?? 1;

  useEffect(() => {
    const root = scope.current;
    if (!lib || !root || tier < minTier) return;
    let extra: void | (() => void);
    const ctx = lib.gsap.context(() => {
      extra = runEffect(lib, tier, root);
    }, root);
    return () => {
      if (typeof extra === 'function') extra();
      ctx.revert();
    };
  }, [lib, tier, minTier, scope]);
}
