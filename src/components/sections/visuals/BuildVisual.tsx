import { ParallaxLayer } from '@/components/motion/ParallaxLayer';

/**
 * Abstract, generic interface composition for the Build spotlight (Design.md 12: generic,
 * clearly non-client UI). Decorative only; three layers with restrained parallax at Tier 2.
 */
export function BuildVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-xl">
      <div className="glow-violet absolute inset-[-10%] -z-10" />

      {/* Back layer: page skeleton */}
      <ParallaxLayer speed={0.6} className="absolute top-0 left-0 w-[78%]">
        <div className="rounded-lg border border-border bg-surface-sunken p-4 shadow-sm">
          <div className="mb-4 flex gap-1.5">
            <span className="size-2.5 rounded-pill bg-mist" />
            <span className="size-2.5 rounded-pill bg-mist" />
            <span className="size-2.5 rounded-pill bg-mist" />
          </div>
          <div className="space-y-2.5">
            <div className="h-3 w-2/3 rounded-pill bg-mist" />
            <div className="h-3 w-5/6 rounded-pill bg-mist/70" />
            <div className="h-3 w-1/2 rounded-pill bg-mist/70" />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2.5">
            <div className="h-16 rounded-sm bg-background" />
            <div className="h-16 rounded-sm bg-background" />
            <div className="h-16 rounded-sm bg-background" />
          </div>
        </div>
      </ParallaxLayer>

      {/* Middle layer: dashboard card with brand chart */}
      <ParallaxLayer speed={1} className="absolute top-[22%] right-0 w-[66%]">
        <div className="rounded-lg border border-border bg-card p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded-pill bg-ink/80" />
            <div className="h-6 w-16 rounded-pill bg-band" />
          </div>
          <div className="mt-6 flex h-28 items-end gap-2">
            {[38, 52, 46, 64, 58, 76, 70, 92].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-arrow-rise"
                style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="h-2.5 rounded-pill bg-mist" />
            <div className="h-2.5 rounded-pill bg-mist/70" />
          </div>
        </div>
      </ParallaxLayer>

      {/* Front layer: mobile frame */}
      <ParallaxLayer speed={1.5} className="absolute bottom-0 left-[12%] w-[30%]">
        <div className="rounded-[1.4rem] border border-border bg-card p-2.5 shadow-lg">
          <div className="mx-auto mb-2 h-1.5 w-10 rounded-pill bg-mist" />
          <div className="space-y-2 rounded-[0.9rem] bg-surface-sunken p-3">
            <div className="h-14 rounded-sm bg-band" />
            <div className="h-2.5 w-4/5 rounded-pill bg-mist" />
            <div className="h-2.5 w-3/5 rounded-pill bg-mist/70" />
            <div className="mt-3 h-7 rounded-pill bg-ink/85" />
          </div>
        </div>
      </ParallaxLayer>
    </div>
  );
}
