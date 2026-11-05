'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { setConsoleFunction } from 'three';
import type { ReactNode } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { SummitScene, type SceneQuality } from './SummitScene';

type HeroCanvasProps = {
  quality: SceneQuality;
  still?: boolean;
  onReady: () => void;
  onFail: () => void;
};

/**
 * R3F 9.8.2 (latest stable) still creates a THREE.Clock, which three r183+ flags as deprecated on
 * every canvas. Drop only that known message through three's official logging hook; everything
 * else is forwarded unchanged. Remove once R3F moves to THREE.Timer.
 */
setConsoleFunction((type, message, ...params) => {
  if (type === 'warn' && message.startsWith('THREE.Clock: This module has been deprecated')) return;
  // Rules.md RUL-TS-06 allows warn/error only; three's rare info logs go to warn.
  const log = type === 'error' ? console.error : console.warn;
  log(message, ...params);
});

/**
 * R3F's clock in frameloop="never" mode takes the timestamp passed to advance() as elapsed time and
 * derives delta from it, so it must be in seconds (passing milliseconds made every frame look like
 * a 16 s step: per-frame jitter, 1000x shader speed, skipped intro).
 */
const nowSeconds = () => performance.now() / 1000;

/**
 * Drives R3F from gsap.ticker (single animation loop, RUL-MOT-06) when GSAP is loaded, otherwise
 * from one rAF. Pauses when off-screen or the tab is hidden.
 */
function FrameDriver({ active, still }: { active: boolean; still: boolean }) {
  const { advance } = useThree();
  const { lib } = useMotion();

  useEffect(() => {
    if (still) {
      advance(nowSeconds());
      const id = requestAnimationFrame(() => advance(nowSeconds()));
      return () => cancelAnimationFrame(id);
    }
    if (!active) return;
    if (lib) {
      const tick = () => advance(nowSeconds());
      lib.gsap.ticker.add(tick);
      return () => lib.gsap.ticker.remove(tick);
    }
    let id = 0;
    const loop = () => {
      advance(nowSeconds());
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [active, still, lib, advance]);

  return null;
}

/** Reads the renderer pixel ratio inside the Canvas context. */
function SceneWithDpr({ children }: { children: (pixelRatio: number) => ReactNode }) {
  const pixelRatio = useThree((s) => s.viewport.dpr);
  return children(pixelRatio);
}

export function HeroCanvas({ quality, still = false, onReady, onFail }: HeroCanvasProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const { tier, lib } = useMotion();
  const scroll = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  // Pause off-screen / hidden tab
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    let visible = true;
    const update = () => setActive(visible && document.visibilityState === 'visible');
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener('visibilitychange', update);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  // Pointer tilt + scroll progress (Tier 2 only)
  useEffect(() => {
    if (tier !== 2 || still) return;
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    let trigger: { kill: () => void } | undefined;
    if (lib && wrapper.current) {
      trigger = lib.ScrollTrigger.create({
        trigger: wrapper.current,
        start: 'top top+=80',
        end: 'bottom top',
        onUpdate: (self) => {
          scroll.current = self.progress;
        },
      });
    }
    return () => {
      window.removeEventListener('pointermove', onMove);
      trigger?.kill();
    };
  }, [tier, lib, still]);

  const dpr: [number, number] = quality === 'full' ? [1, 1.75] : [1, 1.25];

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop="never"
        dpr={dpr}
        camera={{ position: [0, 0.55, 7.2], fov: 36 }}
        gl={{
          antialias: quality === 'full',
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: still,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            onFail();
          });
        }}
      >
        <FrameDriver active={active} still={still} />
        <SceneWithDpr>
          {(pixelRatio) => (
            <SummitScene
              quality={quality}
              scroll={scroll}
              pointer={pointer}
              still={still}
              pixelRatio={pixelRatio}
              onReady={onReady}
            />
          )}
        </SceneWithDpr>
      </Canvas>
    </div>
  );
}
