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
        className="service-aurora-blob-a absolute -top-[18%] left-1/2 h-[34rem] w-[58rem] -translate-x-1/2 rounded-full opacity-30 blur-[110px]"
        style={{
          background:
            'radial-gradient(closest-side, rgb(142 33 252 / 0.55), rgb(72 11 180 / 0.25) 60%, transparent 100%)',
        }}
      />
      {/* Mid-page lilac spark flare */}
      <div
        className="service-aurora-blob-b absolute top-[38%] -left-[12%] h-[36rem] w-[36rem] rounded-full opacity-22 blur-[120px]"
        style={{
          background:
            'radial-gradient(closest-side, rgb(167 67 248 / 0.45), rgb(142 33 252 / 0.14) 65%, transparent 100%)',
        }}
      />
      {/* Lower spectral cyan resonance */}
      <div
        className="service-aurora-blob-a absolute right-[-10%] bottom-[8%] h-[36rem] w-[40rem] rounded-full opacity-22 blur-[115px]"
        style={{
          background:
            'radial-gradient(closest-side, rgb(76 215 246 / 0.35), rgb(0 97 114 / 0.18) 65%, transparent 100%)',
        }}
      />
      {/* Architectural radial-masked hairline grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.02)_1px,transparent_1px)] mask-[radial-gradient(ellipse_65%_55%_at_50%_0%,#000_68%,transparent_100%)] bg-size-[4rem_4rem]" />
    </div>
  );
}
