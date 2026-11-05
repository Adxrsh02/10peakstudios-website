/** First focusable element on every page (PRD-GLB-02). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-3 left-3 z-(--z-loader) -translate-y-24 rounded-pill bg-ink px-5 py-3 font-semibold text-summit-white shadow-lg transition-transform focus-visible:translate-y-0"
    >
      Skip to main content
    </a>
  );
}
