'use client';

import { Component, useEffect, useState, type ComponentType, type ReactNode } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { cn } from '@/lib/cn';
import type { SceneQuality } from './SummitScene';

type CanvasProps = {
  quality: SceneQuality;
  still?: boolean;
  onReady: () => void;
  onFail: () => void;
};

class HeroErrorBoundary extends Component<
  { onError: () => void; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch() {
    this.props.onError();
  }
  override render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL2(): boolean {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

type Nav = Navigator & { connection?: { saveData?: boolean } };

/**
 * Tier 1 lite scene switch (Architecture.md 9.2). Off by default: most mid-range Android phones
 * report 8 cores, so the lite scene would download and parse three.js on the reference device and
 * cost main-thread time (TBT/INP). Design.md 11.3 allows "lite scene or poster" on Tier 1.
 */
const TIER1_LITE_SCENE = false;

/** Hero visual width: full content width below lg (20 px gutters), half the container above. */
const POSTER_SIZES = '(min-width: 64rem) min(50vw, 45rem), calc(100vw - 2.5rem)';

/**
 * Hero visual (Architecture.md 9.4). Poster first, in a fixed aspect box (no CLS). After window
 * load + idle, loads the 3D scene: Tier 2 full; Tier 1 lite only on capable devices; Tier 0, no
 * WebGL2, save-data, context loss or any error: poster stays. Canvas crossfades in (400 ms).
 */
export function HeroVisual({ className }: { className?: string }) {
  const { tier } = useMotion();
  const [Scene, setScene] = useState<ComponentType<CanvasProps> | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [quality, setQuality] = useState<SceneQuality>('full');
  const [still, setStill] = useState(false);

  useEffect(() => {
    const capture = new URLSearchParams(window.location.search).has('poster-capture');
    if (!capture && tier === 0) return;
    const n = navigator as Nav;
    const capableLite =
      TIER1_LITE_SCENE && (n.hardwareConcurrency ?? 4) >= 6 && n.connection?.saveData !== true;
    if (!capture && tier === 1 && !capableLite) return;
    if (!hasWebGL2()) return;
    const nextQuality: SceneQuality = capture || tier === 2 ? 'full' : 'lite';

    let cancelled = false;
    const load = () => {
      const start = () =>
        import('./HeroCanvas').then((m) => {
          if (cancelled) return;
          setStill(capture);
          setQuality(nextQuality);
          setScene(() => m.HeroCanvas);
        });
      if (capture) start();
      else if (window.requestIdleCallback) window.requestIdleCallback(start, { timeout: 2000 });
      else window.setTimeout(start, 200);
    };
    if (document.readyState === 'complete') load();
    else window.addEventListener('load', load, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener('load', load);
    };
  }, [tier]);

  return (
    <div
      className={cn('relative isolate aspect-[4/3] w-full lg:aspect-[5/4]', className)}
      data-hero-visual=""
      data-scene-state={failed ? 'poster' : ready ? 'scene' : 'poster'}
    >
      {!still && (
        <div
          aria-hidden="true"
          className="glow-violet pointer-events-none absolute inset-[-12%] -z-10"
        />
      )}
      <picture>
        <source
          srcSet="/hero-poster-720.avif 720w, /hero-poster.avif 1000w"
          sizes={POSTER_SIZES}
          type="image/avif"
        />
        <img
          src="/hero-poster.webp"
          srcSet="/hero-poster-720.webp 720w, /hero-poster.webp 1000w"
          sizes={POSTER_SIZES}
          alt=""
          width={1000}
          height={800}
          decoding="async"
          fetchPriority="high"
          className={cn(
            'absolute inset-0 h-full w-full object-contain',
            // Stay opaque under the fading-in canvas (both show the same rest pose), then hide once
            // the canvas is fully opaque: no mid-crossfade transparency dip.
            ready && !failed && !still
              ? 'opacity-0 transition-opacity delay-(--duration-slow) duration-0'
              : 'opacity-100',
            still && 'opacity-0',
          )}
        />
      </picture>
      {Scene && !failed && (
        <HeroErrorBoundary onError={() => setFailed(true)}>
          <div
            className={cn(
              'absolute inset-0 transition-opacity duration-(--duration-slow)',
              ready ? 'opacity-100' : 'opacity-0',
            )}
          >
            <Scene
              quality={quality}
              still={still}
              onReady={() => {
                setReady(true);
                (window as unknown as { __heroReady?: boolean }).__heroReady = true;
              }}
              onFail={() => setFailed(true)}
            />
          </div>
        </HeroErrorBoundary>
      )}
    </div>
  );
}
