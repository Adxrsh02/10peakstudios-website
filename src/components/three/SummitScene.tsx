'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BRAND } from '@/lib/brand-colors';
import {
  dustFragment,
  dustVertex,
  ribbonFragment,
  ribbonVertex,
  ridgeFragment,
  ridgeVertex,
} from './shaders';

export type SceneQuality = 'full' | 'lite';

type SummitSceneProps = {
  quality: SceneQuality;
  /** 0..1 scroll progress through the hero (Tier 2 only). */
  scroll: RefObject<number>;
  /** Normalised pointer (-1..1), Tier 2 only. */
  pointer: RefObject<{ x: number; y: number }>;
  /** Freeze in the rest pose (poster capture). */
  still?: boolean;
  pixelRatio: number;
  onReady?: () => void;
};

/** Deterministic pseudo-random (stable geometry between renders and poster capture). */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function buildRidge(segX: number, segY: number) {
  const geo = new THREE.PlaneGeometry(7.6, 4.6, segX, segY);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    // Main summit slightly right of centre, a shoulder peak to the left (echoes "peak")
    const main = Math.exp(-((x - 0.5) ** 2) / 1.7 - (y - 0.2) ** 2 / 1.4) * 2.05;
    const shoulder = Math.exp(-((x + 1.75) ** 2) / 1.1 - (y + 0.1) ** 2 / 1.0) * 1.1;
    const jitter = (rand(i + 1) - 0.5) * 0.18;
    pos.setZ(i, Math.max(main, shoulder) + jitter * (main + shoulder > 0.2 ? 1 : 0.3));
  }
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -1.1, 0);
  geo.computeVertexNormals();
  return geo;
}

function buildArrowCurve() {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.35, -1.02, 1.3),
    new THREE.Vector3(-1.1, -0.8, 1.5),
    new THREE.Vector3(0.15, -0.3, 1.45),
    new THREE.Vector3(1.35, 0.45, 1.15),
    new THREE.Vector3(2.15, 1.25, 0.85),
  ]);
}

function buildArrowHead() {
  // Flat two-barbed arrowhead (brand arrow), tip at +y
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.3);
  shape.lineTo(-0.2, -0.1);
  shape.lineTo(0, -0.02);
  shape.lineTo(0.2, -0.1);
  shape.closePath();
  return new THREE.ShapeGeometry(shape);
}

function buildDust(count: number) {
  const positions = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand(i * 3.1) - 0.5) * 9;
    positions[i * 3 + 1] = (rand(i * 7.7) - 0.3) * 3.2;
    positions[i * 3 + 2] = (rand(i * 1.3) - 0.5) * 4;
    seeds[i] = rand(i * 9.9);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  return g;
}

/**
 * Rest pose, shared with the poster capture (`still`), so the poster -> scene crossfade is seamless:
 * same shader time, same rotation, no float offset, arrow fully drawn.
 */
const REST_TIME = 2.0;
const BASE_ROT_X = 0.04;
const BASE_ROT_Y = -0.1;
/** Pointer/scroll easing rate (1/s): ~6% per frame at 60 Hz, frame-rate independent. */
const DAMPING = 3.7;
/** Longest step fed to the animation, so resuming after an off-screen pause never jumps. */
const MAX_STEP = 1 / 20;

/** Arrowhead at the end of the curve, rotated to the projected tangent (flat, faces the camera). */
function arrowHeadPose(curve: THREE.CatmullRomCurve3) {
  const pos = curve.getPointAt(0.999);
  const tan = curve.getTangentAt(0.999);
  return { position: pos, angle: Math.atan2(tan.y, tan.x) - Math.PI / 2 };
}

/**
 * Concept A "Summit" (Design.md 11.7): faceted peak with Summit-light faces and a Peak Violet rim,
 * plus a rising Arrow-rise ribbon with a two-barbed head. Procedural, no external assets.
 * Starts in the poster's rest pose; Tier 2 adds pointer tilt, scroll dolly and a slow float.
 * Per-frame updates go through refs only (React Compiler safe).
 */
export function SummitScene({
  quality,
  scroll,
  pointer,
  still = false,
  pixelRatio,
  onReady,
}: SummitSceneProps) {
  const group = useRef<THREE.Group>(null);
  const ridgeMat = useRef<THREE.ShaderMaterial>(null);
  const dustMat = useRef<THREE.ShaderMaterial>(null);
  /** Seconds the scene has been animating (pauses with the frame loop). */
  const elapsed = useRef(0);
  const readyFired = useRef(false);

  const ridge = useMemo(
    () => (quality === 'full' ? buildRidge(64, 40) : buildRidge(36, 22)),
    [quality],
  );
  const curve = useMemo(() => buildArrowCurve(), []);
  const tube = useMemo(
    () => new THREE.TubeGeometry(curve, quality === 'full' ? 220 : 120, 0.052, 14, false),
    [curve, quality],
  );
  const headGeo = useMemo(() => buildArrowHead(), []);
  const headPose = useMemo(() => arrowHeadPose(curve), [curve]);
  const dust = useMemo(() => buildDust(quality === 'full' ? 600 : 180), [quality]);

  const ridgeUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uLightDir: { value: new THREE.Vector3(-0.6, 0.9, 0.5) } }),
    [],
  );
  const ribbonUniforms = useMemo(() => ({ uProgress: { value: 1 } }), []);
  const dustUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixelRatio: { value: pixelRatio } }),
    [pixelRatio],
  );

  // Dispose procedural geometries on unmount; R3F disposes the JSX materials (RUL-MOT-13)
  useEffect(
    () => () => {
      ridge.dispose();
      tube.dispose();
      headGeo.dispose();
      dust.dispose();
    },
    [ridge, tube, headGeo, dust],
  );

  useFrame((_state, delta) => {
    // First frame and the still pose render exactly the rest pose; afterwards time advances in
    // clamped steps (delta is in seconds; see HeroCanvas FrameDriver).
    const step = still || !readyFired.current ? 0 : Math.min(Math.max(delta, 0), MAX_STEP);
    elapsed.current += step;
    const t = REST_TIME + elapsed.current;

    const rm = ridgeMat.current;
    const dm = dustMat.current;
    if (rm?.uniforms.uTime) rm.uniforms.uTime.value = t;
    if (dm?.uniforms.uTime) dm.uniforms.uTime.value = t;

    const g = group.current;
    if (g && !still) {
      const p = pointer.current;
      const sc = scroll.current;
      // Targets are offsets from the rest rotation (pointer tilt <= 4 degrees)
      const targetY = BASE_ROT_Y + p.x * 0.07 + sc * 0.25;
      const targetX = BASE_ROT_X - p.y * 0.05;
      const k = 1 - Math.exp(-step * DAMPING);
      g.rotation.y += (targetY - g.rotation.y) * k;
      g.rotation.x += (targetX - g.rotation.x) * k;
      // Gentle float starts at 0 (matches the poster), plus a slight dolly with scroll
      g.position.y = Math.sin(elapsed.current * 0.6) * 0.04 - sc * 0.35;
    }

    if (!readyFired.current) {
      readyFired.current = true;
      onReady?.();
    }
  });

  return (
    <group ref={group} rotation={[BASE_ROT_X, BASE_ROT_Y, 0]}>
      <mesh geometry={ridge}>
        <shaderMaterial
          ref={ridgeMat}
          vertexShader={ridgeVertex}
          fragmentShader={ridgeFragment}
          uniforms={ridgeUniforms}
          transparent
        />
      </mesh>
      <mesh geometry={tube}>
        <shaderMaterial
          vertexShader={ribbonVertex}
          fragmentShader={ribbonFragment}
          uniforms={ribbonUniforms}
          transparent
        />
      </mesh>
      <mesh geometry={headGeo} position={headPose.position} rotation={[0, 0, headPose.angle]}>
        <meshBasicMaterial color={BRAND.lilacSpark} side={THREE.DoubleSide} />
      </mesh>
      <points geometry={dust}>
        <shaderMaterial
          ref={dustMat}
          vertexShader={dustVertex}
          fragmentShader={dustFragment}
          uniforms={dustUniforms}
          transparent
          depthWrite={false}
        />
      </points>
    </group>
  );
}
