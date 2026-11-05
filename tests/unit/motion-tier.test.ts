import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';
import { BOOTSTRAP_SCRIPT, computeTier, type TierSignals } from '@/lib/motion-tier';

const desktop: TierSignals = {
  reducedMotion: false,
  coarsePointer: false,
  viewportWidth: 1440,
  hardwareConcurrency: 8,
  deviceMemory: 8,
};

describe('computeTier', () => {
  it('Tier 0 whenever reduced motion is requested', () => {
    expect(computeTier({ ...desktop, reducedMotion: true })).toBe(0);
  });
  it('Tier 2 on a capable desktop', () => {
    expect(computeTier(desktop)).toBe(2);
  });
  it.each<[string, Partial<TierSignals>]>([
    ['coarse pointer', { coarsePointer: true }],
    ['viewport below 1024', { viewportWidth: 1023 }],
    ['save-data', { saveData: true }],
    ['3g network', { effectiveType: '3g' }],
    ['slow-2g network', { effectiveType: 'slow-2g' }],
    ['4 cores', { hardwareConcurrency: 4 }],
    ['4 GB memory', { deviceMemory: 4 }],
  ])('Tier 1 for %s', (_label, override) => {
    expect(computeTier({ ...desktop, ...override })).toBe(1);
  });
  it('treats 4g as fast', () => {
    expect(computeTier({ ...desktop, effectiveType: '4g' })).toBe(2);
  });
});

/** Runs the inline bootstrap in a sandbox and returns the html attributes it set. */
function runBootstrap(opts: {
  rm?: boolean;
  coarse?: boolean;
  width?: number;
  cores?: number;
  seen?: boolean;
}) {
  const attrs: Record<string, string> = {};
  const listeners: string[] = [];
  const sandbox = {
    document: {
      documentElement: {
        setAttribute: (k: string, v: string) => (attrs[k] = v),
        getAttribute: (k: string) => attrs[k] ?? null,
      },
    },
    navigator: { hardwareConcurrency: opts.cores ?? 8, deviceMemory: 8, connection: {} },
    sessionStorage: { getItem: () => (opts.seen ? '1' : null), setItem: () => undefined },
    setTimeout: () => 0,
    String,
    window: {
      innerWidth: opts.width ?? 1440,
      matchMedia: (q: string) => ({
        matches: q.includes('reduced-motion')
          ? !!opts.rm
          : q.includes('pointer: coarse')
            ? !!opts.coarse
            : false,
      }),
      addEventListener: (type: string) => listeners.push(type),
    },
  };
  runInNewContext(BOOTSTRAP_SCRIPT, sandbox);
  return { attrs, listeners };
}

describe('BOOTSTRAP_SCRIPT parity with computeTier', () => {
  it('desktop: tier 2, loader on, skip listeners attached', () => {
    const { attrs, listeners } = runBootstrap({});
    expect(attrs['data-motion-tier']).toBe('2');
    expect(attrs['data-loader']).toBe('on');
    expect(listeners).toEqual(expect.arrayContaining(['keydown', 'pointerdown', 'animationend']));
  });
  it('reduced motion: tier 0 and loader off (PRD-GLB-04)', () => {
    const { attrs } = runBootstrap({ rm: true });
    expect(attrs['data-motion-tier']).toBe('0');
    expect(attrs['data-loader']).toBe('off');
  });
  it('mobile: tier 1', () => {
    expect(runBootstrap({ coarse: true, width: 390 }).attrs['data-motion-tier']).toBe('1');
  });
  it('loader plays once per session', () => {
    expect(runBootstrap({ seen: true }).attrs['data-loader']).toBe('off');
  });
});
