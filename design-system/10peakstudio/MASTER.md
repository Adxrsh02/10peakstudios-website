# Design System Master File: 10PeakStudio

> **LOGIC:** When building a specific page, first check `design-system/10peakstudio/pages/<page>.md`.
> If that file exists, its rules **override** this Master file for that page.
> If not, strictly follow the rules below.
>
> **PRECEDENCE:** `10PeakStudio_Brand_Guidelines.html` > `Project_spec/Design.md` > page override > this file > ui-ux-pro-max suggestions.
> This file is a condensed, brand-first mirror of `Project_spec/Design.md`. If they ever differ, Design.md wins; report the mismatch.

---

**Project:** 10PeakStudio (domain `10peakstudios.com`)
**Rewritten:** 2026-11-05 (brand-first; replaces the keyword-generated version of 2026-11-05 03:22)
**Category:** Premium digital innovation and technology studio (marketing website)
**Stack:** Next.js 16 static export, Tailwind CSS v4, shadcn/ui, GSAP + Lenis + Motion, React Three Fiber, Lucide

---

## Global Rules

### Color Palette (brand, verbatim)

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (Peak Violet) | `#8E21FC` | `--color-peak-violet` / `--primary` |
| On Primary | `#FFFFFF` | `--primary-foreground` |
| Primary hover | `#7A1AE0` | `--primary-hover` / `--link` |
| Primary active (Deep Violet) | `#480BB4` | `--color-deep-violet` / `--primary-active` |
| Accent highlight (Lilac Spark) | `#A743F8` | `--color-lilac-spark` (large text, graphics; text only on Obsidian) |
| Glow (effect only, 20%) | `#5B10E0` | `--color-glow-violet` |
| Background (page) | `#FFFFFF` | `--background` |
| Surface subtle (Summit White) | `#FCFCFC` | `--surface-subtle` |
| Surface sunken (Paper) | `#F6F5FA` | `--surface-sunken` |
| Foreground (Ink) | `#14111E` | `--foreground` |
| Muted foreground | `#5E5A70` | `--muted-foreground` |
| Border (Mist, decorative) | `#D7D6E1` | `--border` |
| Input border (Slate Lavender) | `#8D8CA4` | `--input` |
| Ring (focus) | `#8E21FC` | `--ring` |
| Obsidian (dark sections) | `#000000` | `--color-obsidian` via `.surface-inverse` |
| Error / Success / Warning (Proposed, not in brand) | `#B42318` / `#067647` / `#8A5300` | `--color-error` / `--color-success` / `--color-warning` |

**Inverse (`.surface-inverse`, Obsidian sections):** background `#000000`, cards `#14111E`, text `#FCFCFC`, muted `#A9A7BB`, links `#C38BFF`, accent `#A743F8`, decorative border `#2A2638`, ring `#A743F8`.

**Gradients:** Band `linear-gradient(196deg, #9725FC 0%, #9122FC 50%, #8014FB 100%)`; Arrow rise `linear-gradient(90deg, #480BB4 0%, #6617EA 25%, #8F31F9 60%, #A743F8 100%)`; Summit light `linear-gradient(141deg, #FCFCFC 0%, #E9E9EF 40%, #D7D6E1 60%, #8D8CA4 100%)`.

**Proportions:** 60% white/Summit White (or Obsidian) surfaces, 30% neutrals, 10% violets. Max 2 Obsidian sections per page including the footer. Light theme only; no dark mode.

**Contrast:** Lilac Spark `#A743F8` (4.37:1 on white) and Slate Lavender `#8D8CA4` (3.27:1) are never body text on light surfaces. Mist `#D7D6E1` is decorative only. Full table: Design.md 4.6.

### Typography (brand)

- **Heading Font:** Sora (300, 600, 700)
- **Body Font:** Inter (400, 500, 600), subsets `latin` + `latin-ext` (₹ U+20B9 lives in `latin-ext`)
- **Code Font:** JetBrains Mono (400), only where code appears
- **Loading:** `next/font/google`, self-hosted at build. Never link fonts.googleapis.com.
- **Rules:** ₹ amounts in Inter with tabular figures (Sora has no ₹). Body 16/26. Lines 60 to 80 characters. Medium 500 for labels, SemiBold 600 for emphasis instead of colour. Left-aligned, never justified.

| Style | Desktop (brand) | Fluid (360 to 1440 px) | Tracking | Weight |
|---|---|---|---|---|
| Display | 4.5rem / 5rem | `clamp(2.5rem, 1.833rem + 2.963vw, 4.5rem)` / 1.1 | -0.02em | 700 |
| H1 | 3.5rem / 4rem | `clamp(2.125rem, 1.667rem + 2.037vw, 3.5rem)` / 1.15 | -0.02em | 700 |
| H2 | 2.75rem / 3.25rem | `clamp(1.75rem, 1.417rem + 1.481vw, 2.75rem)` / 1.18 | -0.015em | 600 |
| H3 | 2.125rem / 2.625rem | `clamp(1.5rem, 1.292rem + 0.926vw, 2.125rem)` / 1.24 | -0.01em | 600 |
| H4 | 1.625rem / 2.125rem | `clamp(1.25rem, 1.125rem + 0.556vw, 1.625rem)` / 1.31 | -0.005em | 600 |
| H5 | 1.25rem / 1.75rem | `clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem)` / 1.4 | 0 | 600 |
| Body large | 1.125rem / 1.875rem | `clamp(1.0625rem, 1.042rem + 0.093vw, 1.125rem)` / 1.667 | 0 | 400 |
| Body | 1rem / 1.625rem | 1rem / 1.625 | 0 | 400 |
| Small | 0.875rem / 1.375rem | same | +0.005em | 400 |
| Caption | 0.75rem / 1.125rem | same | +0.01em | 500 |

### Spacing Variables (Proposed; brand defines none)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight gaps |
| `--space-2` | 8px | Inline gaps, touch spacing |
| `--space-4` | 16px | Standard padding (mobile) |
| `--space-6` | 24px | Card padding (mobile), grid gap |
| `--space-8` | 32px | Card padding (desktop) |
| `--space-12` | 48px | Heading to content |
| `--space-16` / `--space-24` / `--space-32` | 64 / 96 / 128px | Section padding mobile / tablet / desktop |
| `--space-section` | `clamp(4rem, 2.667rem + 5.926vw, 8rem)` | Vertical section padding |

### Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Inputs, small controls (brand page) |
| `--radius-md` | 14px | Cards, menus, dialogs (brand page) |
| `--radius-lg` | 24px | Feature panels, media (Proposed) |
| `--radius-pill` | 9999px | CTA buttons, chips (Proposed, reference structure) |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgb(20 17 30 / 0.06)` | Subtle lift |
| `--shadow-md` | `0 8px 24px -8px rgb(20 17 30 / 0.12)` | Card hover |
| `--shadow-lg` | `0 24px 48px -16px rgb(20 17 30 / 0.18)` | Menus, dialogs, floating media |
| `--shadow-glow` | `0 0 48px rgb(91 16 224 / 0.20)` | Brand glow (Glow Violet at 20%) |
| `--shadow-glow-strong` | `0 0 48px rgb(91 16 224 / 0.35)` | Hero 3D and loader only |

---

## Component Specs

### Buttons

```css
/* Primary (pill) */
.btn-primary {
  background: var(--primary);            /* #8E21FC */
  color: var(--primary-foreground);      /* #FFFFFF, 5.57:1 */
  height: 48px; padding: 0 24px;
  border-radius: var(--radius-pill);
  font: 600 1rem/1 var(--font-sans);
  transition: background-color 150ms var(--ease-standard);
  cursor: pointer;
}
.btn-primary:hover { background: var(--primary-hover); }   /* #7A1AE0 */
.btn-primary:active { background: var(--primary-active); } /* #480BB4 */

/* Secondary (outline pill) */
.btn-secondary {
  background: transparent;
  color: var(--foreground);
  border: 1.5px solid var(--foreground);
  height: 48px; padding: 0 24px;
  border-radius: var(--radius-pill);
  font: 600 1rem/1 var(--font-sans);
  transition: background-color 150ms var(--ease-standard);
  cursor: pointer;
}
.btn-secondary:hover { background: var(--secondary); }     /* #F6F5FA */
```

### Cards

```css
.card {
  background: var(--card);                /* #FFFFFF */
  border: 1px solid var(--border);        /* #D7D6E1 */
  border-radius: var(--radius-md);        /* 14px */
  padding: 24px;                          /* 32px from lg */
  transition: box-shadow 200ms var(--ease-standard), transform 200ms var(--ease-standard);
}
@media (hover: hover) {
  .card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
}
/* Body copy left-aligned; titles may use Peak Violet */
```

### Inputs

```css
.input {
  height: 48px; padding: 12px 16px;
  border: 1px solid var(--input);         /* #8D8CA4, 3.27:1 */
  border-radius: var(--radius-sm);        /* 8px */
  font-size: 16px;                        /* no iOS zoom */
  background: #FFFFFF;
  transition: border-color 150ms var(--ease-standard);
}
.input:focus-visible { border-color: var(--primary); outline: 2px solid var(--ring); outline-offset: 2px; }
.input[aria-invalid="true"] { border-color: var(--destructive); } /* #B42318 */
```

### Modals / Dialogs

```css
.dialog-overlay { background: rgb(20 17 30 / 0.5); backdrop-filter: blur(4px); } /* blur <= 8px */
.dialog {
  background: #FFFFFF; border: 1px solid var(--border);
  border-radius: var(--radius-md); padding: 32px;
  box-shadow: var(--shadow-lg); max-width: 520px; width: calc(100% - 40px);
}
```

### Focus

```css
:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; } /* #8E21FC light, #A743F8 on Obsidian */
```

---

## Style Guidelines

**Style:** Premium minimal, white-first with selected Obsidian sections; brand 2.5D lighting (Summit light gradients, violet band, rising arrow). Not Liquid Glass.

**Keywords:** premium, precise, spacious, technology-driven, rising, calm motion, violet signal colour

**Best For:** A premium technology studio marketing site that must load fast on mid-range Android over 4G

**Key Effects:** Peak rise reveals (`cubic-bezier(0.2, 0.7, 0.2, 1)`), arrow-draw clip reveals, band wipes, Glow Violet at 20%, lazy 3D hero with poster fallback

### Page Pattern

**Pattern Name:** Scroll-Triggered Storytelling (adapted)

- **Story spine:** Build. Automate. Grow. (Build and Automate primary, Grow supporting)
- **Conversion Strategy:** Narrative works without scroll effects; DOM order complete; reduced motion renders every section in its final state; pinning and parallax only at motion Tier 2.
- **CTA Placement:** Hero (Start a project + Explore services), end of key sections (mini CTA), final CTA in the Obsidian footer band; sticky CTA bar on mobile after the hero.
- **Home Section Order:** Hero > Philosophy > Pillars > Build spotlight > Automate spotlight (Obsidian) > Grow > How we work > Who we work with > Why 10PeakStudio > Security teaser > FAQ > Final CTA (Obsidian footer)

### Motion Tokens

| Token | Value |
|---|---|
| Ease enter | `cubic-bezier(0.2, 0.7, 0.2, 1)` (brand "rise") |
| Ease state / exit | `cubic-bezier(0.4, 0, 0.2, 1)` / `cubic-bezier(0.4, 0, 1, 1)` |
| Durations | 100 / 150 / 250 / 400 ms (UI); 500 ms (mobile reveal); 800 ms (desktop reveal); 1100 ms (signature) |
| Stagger | 60 ms, max 8 children |
| Tiers | 0 reduced motion (no animation), 1 touch/low power (reveals only), 2 desktop (Lenis, pins, SplitText, full 3D) |

---

## Anti-Patterns (Do NOT Use)

- Off-brand palettes (black and gold, purple and cyan, any blue) and off-brand fonts (Cormorant, Montserrat, Space Grotesk, DM Sans)
- Liquid Glass or heavy `backdrop-filter` blur (> 8px)
- Dark mode or `prefers-color-scheme: dark` styles
- Justified text
- Lilac Spark or Slate Lavender for body text on light surfaces
- Modifying the logo (stretch, rotate, recolour, effects, retyping the wordmark, moving parts)
- Hiding the LCP heading at load; scroll-jacking; more than 2 pinned sections per page
- Fabricated testimonials, client logos, metrics, awards, certifications, prices or team details
- Fast, bouncy or elastic animations; cheap visuals

### Additional Forbidden Patterns

- **Emojis as icons**: use Lucide SVG icons
- **Missing cursor:pointer**: all clickable elements must have cursor:pointer
- **Layout-shifting hovers**: use colour, shadow or transform only
- **Low contrast text**: maintain 4.5:1 minimum for normal text
- **Instant state changes**: use transitions (150 to 300ms), except under reduced motion
- **Invisible focus states**: focus must be visible for accessibility
- **Raw hex values in components**: use tokens

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] ui-ux-pro-max consulted; page override checked; brand rules respected
- [ ] No emojis used as icons (Lucide SVG only)
- [ ] All icons from Lucide, outline, stroke 1.75
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states (pointer devices only) with smooth transitions (150 to 300ms)
- [ ] Text contrast 4.5:1 minimum (approved pairs in Design.md 4.6)
- [ ] Focus states visible for keyboard navigation and never fully obscured
- [ ] `prefers-reduced-motion` respected (final states, no loader, no Lenis, no 3D animation)
- [ ] Responsive: 360px, 768px, 1024px, 1280px, 1440px; no horizontal scroll at 320px
- [ ] No content hidden behind fixed navbars or the sticky CTA bar
- [ ] Touch targets >= 44px on mobile, >= 24px everywhere
- [ ] No `[PLACEHOLDER` text in production output
