/**
 * Scoped ambient Dark Glass Aurora backdrop.
 * Renders pure CSS radial blooms + masked geometric hairline grid using GPU-composited transforms
 * only. Automatically halts motion under `prefers-reduced-motion: reduce` and Motion Tier 0.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Primary brand violet top bloom */}
      <div
        className="service-aurora-blob-a absolute -top-[22%] left-1/2 h-[38rem] w-[62rem] -translate-x-1/2 rounded-full opacity-35"
        style={{
          background:
            'radial-gradient(closest-side, rgb(142 33 252 / 0.55) 0%, rgb(72 11 180 / 0.22) 45%, rgb(72 11 180 / 0.05) 75%, transparent 100%)',
        }}
      />
      {/* Mid-page lilac spark flare */}
      <div
        className="service-aurora-blob-b absolute top-[35%] -left-[16%] h-[40rem] w-[40rem] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(closest-side, rgb(167 67 248 / 0.48) 0%, rgb(142 33 252 / 0.16) 48%, transparent 100%)',
        }}
      />
      {/* Lower spectral cyan resonance */}
      <div
        className="service-aurora-blob-a absolute right-[-14%] bottom-[4%] h-[40rem] w-[44rem] rounded-full opacity-25"
        style={{
          background:
            'radial-gradient(closest-side, rgb(76 215 246 / 0.36) 0%, rgb(0 97 114 / 0.14) 50%, transparent 100%)',
        }}
      />
      {/* Architectural radial-masked hairline grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.02)_1px,transparent_1px)] mask-[radial-gradient(ellipse_65%_55%_at_50%_0%,#000_68%,transparent_100%)] bg-size-[4rem_4rem]" />
    </div>
  );
}
