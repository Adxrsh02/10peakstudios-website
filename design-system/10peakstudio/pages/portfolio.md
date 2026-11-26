# Page Design Override: Portfolio (`/portfolio` & `/portfolio/[slug]`)

> Inherits from `design-system/10peakstudio/MASTER.md` and `Project_spec/Design.md`. Brand rules strictly override skill suggestions.

## Surface Rhythm (`Design.md` §6.5 Compliant)
- **Full-bleed Obsidian (`.surface-inverse`) bands:** Strictly **2 per page** (Hero at top + global `SiteFooter` CTA band at bottom).
- **Dark Inset Feature Panels:** Featured Case Study Panel (`/portfolio`) and Architecture Showcase (`/portfolio/[slug]`) use elevated Ink (`--color-ink`, `#14111E`) containers with `1px` `--color-inverse-rule` (`#2A2638`) borders and Summit White (`#FCFCFC`) / `--color-inverse-link` (`#C38BFF`) typography inside Paper (`#F6F5FA`) or White (`#FFFFFF`) sections.
- **Backdrop Blur (`RUL-ST-09`):** `backdrop-filter: blur(8px)` allowed strictly on sticky header, Lightbox overlay (`bg-ink/50 backdrop-blur-[4px]`), and Mobile Filter bottom sheet overlay. All cards and sticky filter bars use opaque or clean surface tokens.

## Typography & Contrast (`Design.md` §4.6)
- H1 (`Real Systems Built To Scale.`): Sora 700 (`--text-display`), Summit White on Obsidian, ending words in Lilac Spark (`#A743F8`, `4.8:1` on Obsidian).
- Code / Metric Tables: Inter `tabular-nums` (`.price` utility) for aligned percentages and durations; system `ui-monospace` stack for code blocks (`RUL-PERF-03`: zero extra font preloads).
- No raw hex values in TSX components (`RUL-ST-01`); use semantic Tailwind tokens (`bg-ink`, `text-summit-white`, `border-inverse-rule`, `text-inverse-link`, etc.).

## Motion & Device Rules (`Design.md` §11.3)
- **Tier 0 (`prefers-reduced-motion: reduce`):** Static final state everywhere; no parallax, no 3D card tilt, no FLIP layout animation, no count-up ticker.
- **Tier 1:** Standard `Reveal` (`500ms`, `12px`), no pointer tilt, native scrolling.
- **Tier 2 (`>= 1024px` pointer):** Subtle `<= 10%` hero decorative parallax, `<= 4deg` card 3D tilt + Glow Violet (`rgb(91 16 224 / 0.20)`) spotlight under `@media (hover: hover)`, FLIP layout reflow via `LazyMotion` `domAnimation`, ScrollTrigger vertical timeline line draw, progressive View Transitions API thumbnail handoff.
