---
title: 10PeakStudio Website - Design System
document: Design.md
version: 1.0.0
date: 2026-11-05
status: Draft - awaiting approval
owner: 10PeakStudio
related: PRD.md, Architecture.md, Rules.md, ../design-system/10peakstudio/MASTER.md, ../10PeakStudio_Brand_Guidelines.html
---

# 10PeakStudio Website - Design System

## Table of contents

1. [Source of truth and reconciliation](#1-source-of-truth-and-reconciliation)
2. [Voice and tone](#2-voice-and-tone)
3. [Logo system](#3-logo-system)
4. [Colour](#4-colour)
5. [Typography](#5-typography)
6. [Layout](#6-layout)
7. [Token implementation](#7-token-implementation)
8. [Radius, borders, elevation and glow](#8-radius-borders-elevation-and-glow)
9. [Iconography](#9-iconography)
10. [Component specifications](#10-component-specifications)
11. [Motion language](#11-motion-language)
12. [Imagery](#12-imagery)
13. [Reference analysis](#13-reference-analysis)
14. [Responsive behaviour by pattern](#14-responsive-behaviour-by-pattern)
15. [Page override plan](#15-page-override-plan)

---

## 1. Source of truth and reconciliation

### 1.1 Precedence

1. `10PeakStudio_Brand_Guidelines.html` (project root): every hex value, font, logo rule and type size in this document marked **[Brand]** is copied verbatim from that file or its embedded token files (`10PeakStudio_tokens.css`, `10PeakStudio_tokens.json`, `10PeakStudio_tailwind.config.js`, `10PeakStudio_fonts.css`) and sheet PDFs.
2. User decisions dated 2026-11-05 (see [PRD.md 18.1](PRD.md#181-user-decisions-recorded-on-2026-11-05)).
3. ui-ux-pro-max skill: suggestions only.

Values marked **[Derived]** are computed from brand values (for example fluid sizes). Values marked **[Proposed]** are not in the brand file and need approval; each is flagged.

### 1.2 Brand file facts

| Fact | Value |
|---|---|
| Logo origin | Vector rebuild of a 1536 x 1024 raster 3D logo; no original vector exists. Every SVG carries a C2PA manifest stating it was produced by Claude at a user's request. |
| Wordmark | Not in the source artwork. The Sora lockup is a proposal, **provisionally approved for web use on 2026-11-05** (header, footer, loader end frame). |
| Light-theme colours, flat and one-colour logos, Ink `#14111E` | Additions by the brand-system author, not sampled from the source |
| Tone of voice, spacing scale, radius tokens, imagery rules | **Not defined in the brand file**; defined here as [Proposed] |

### 1.3 Reconciliation with the ui-ux-pro-max output

The original `MASTER.md` (generated from keywords before the brand files were read) and two regeneration attempts were checked against the brand. `MASTER.md` has been rewritten brand-first ([ADR-010](Architecture.md#19-architecture-decision-records)).

| Topic | Skill suggested | Brand / decision | Outcome |
|---|---|---|---|
| Palette | Black `#1C1917` with gold `#A16207`; regeneration gave purple `#7C3AED` with cyan `#0891B2` | Violet system (Peak Violet `#8E21FC` and family) | **Brand overrides** |
| Fonts | Cormorant / Montserrat; regeneration gave Space Grotesk / DM Sans | Sora / Inter / JetBrains Mono | **Brand overrides** (Montserrat is also the reference site's font, explicitly banned) |
| Style | Liquid Glass (Apple-platform translucency, heavy blur) | Premium, minimal, white with Obsidian sections, 2.5D brand lighting | **Rejected**; blur limited to 8 px on header and overlays |
| Theme | Light and dark | White only, selected Obsidian sections | **Decision overrides** |
| Page pattern | Scroll-Triggered Storytelling | Matches the vision | **Adopted** with motion tiers and reduced-motion final states |
| Spacing scale | 4 to 64 px | Not in brand | **Adopted and extended** (to 128 px, spacious density) |
| Pre-delivery checklist, anti-patterns (no emoji icons, visible focus, 150 to 300 ms state transitions, no layout-shifting hovers) | As listed | Compatible | **Adopted** |
| Radius | Buttons 8 px, cards 12 px | Brand page uses 8 px controls, 14 px cards | **Brand page values used**; CTAs are pills (reference structure, [Proposed]) |
| Icon set | Heroicons or Phosphor | Lucide (locked stack) | **Stack overrides** |

### 1.4 Open design questions

| ID | Question | Default applied |
|---|---|---|
| [PRD OQ-1](PRD.md#17-open-questions) | "Official blue brand accents": no blue exists in the brand guide | Brand violets |
| DQ-1 | Pill-shaped CTAs (reference structure) vs 8 px buttons (brand page styling) | Pills for CTAs, 8 px for inputs and small controls |
| DQ-2 | Functional status colours (error, success, warning) are not in the brand ([4.5](#45-functional-status-colours)) | Proposed values below |
| DQ-3 | Hero 3D concept A or B ([11.7](#117-hero-3d-concept-directions)) | Decide after M3 prototypes |

---

## 2. Voice and tone

Source: Company_info.md (the brand file defines no voice). Personality: premium, creative, intelligent, professional, trustworthy. Communication: clear, confident, modern, customer-focused.

| Principle | Do | Do not |
|---|---|---|
| Clear | Short sentences (15 to 20 words); one idea per paragraph; plain words | Jargon without explanation; stacked buzzwords |
| Confident | Active voice; direct verbs ("We build", "You get") | Hedging ("we try to"), superlatives without proof ("best", "number one", "guaranteed") |
| Modern | Precise, current terminology (AI automation, GEO, AEO) explained in one line | Hype, exclamation marks, emoji |
| Customer-focused | Lead with the customer's outcome, then how | Talking only about ourselves |
| Honest | Describe capabilities and process | Implying clients, results, awards or metrics that do not exist |

| Item | Rule |
|---|---|
| Brand name | Always "10PeakStudio" in running text (no space, capital P and S) |
| Spelling | Indian English with British spelling (colour, optimise) until [PRD OQ-8](PRD.md#17-open-questions) is answered |
| Headings | Sentence case, except the brand line "Build. Automate. Grow." |
| CTAs | Verb first, 1 to 3 words: "Start a project", "Explore services", "WhatsApp us", "See how we work" |
| Numbers | Numerals for 10 and above; ₹ amounts set in Inter with tabular figures |
| Errors | State cause and fix: "Enter an email address like name@company.com" |

---

## 3. Logo system

### 3.1 Anatomy [Brand]

The mark reads "1P" with a rising arrow. Five shapes, back to front: a violet top band with a sliced left end; a white ribbon that folds under the band to form the bowl, lower bar and leg of the P; a white P stem with a rounded shoulder; a white "1" with a sliced flag; a tapering arrow with a two-barbed head. Lighting comes from the upper left; white faces shade from Summit White to Slate Lavender; the arrow runs from Deep Violet (tail) to Lilac Spark (head). Treatment is 2.5D (gradients and a folded-ribbon illusion, not bevels).

| Measure [Brand] | Value |
|---|---|
| Base unit x | 1/4 of letter height (= horizontal stem width of the "1") |
| Letter height | 4x |
| Mark width x height | 8.04x x 4.39x |
| Stem width (1 and P) | 1x |
| Channels between letters | 0.22x and 0.27x |
| Band depth and flag underside | 0.94x (shared line) |
| Lower bar depth | 0.90x |
| Italic axis | 69.5 degrees (20.5 degrees from vertical) |
| Band and stem cut / leg diagonal / flag cut | 51 / 46.5 / 43 degrees |
| Radii | bowl 0.59x, counter 0.56x, band end 0.44x, shoulder 1.35x, arrow path about 10.1x |

SVG structure (3D logomark files): six paths with gradient IDs `lv` (band), `lb` (ribbon and bowl), `lf` (fold shadow), `ls` (stem), `l1` (the "1"), `la` (arrow). These are the only parts the loader may animate.

### 3.2 Variant matrix

| Context | Background | File (from the brand system) | Rendered size |
|---|---|---|---|
| Header, desktop (>= 1024 px) | White | `01-Primary/10PeakStudio_Primary_Horizontal_Light.svg` (3D) | Height 40 px (artwork width about 170 px, above the 160 px minimum) |
| Header, mobile and tablet (< 1024 px) | White | `01-Primary/10PeakStudio_Primary_Horizontal_Flat_Light.svg` | Height 32 px (artwork width about 136 px, above the 120 px minimum) |
| Footer | Obsidian | `01-Primary/10PeakStudio_Primary_Horizontal_Dark.svg` (3D) | Width >= 200 px |
| Loader | White | Paths of `02-Logomark/10PeakStudio_Logomark_3D_Light.svg`, end frame with wordmark paths from `01-Primary/10PeakStudio_Primary_Horizontal_Light.svg` | Mark width 160 to 240 px |
| Mega-menu promo panel | Paper `#F6F5FA` | `02-Logomark/10PeakStudio_Logomark_3D_Light.svg` | Width >= 48 px |
| Peak Violet surfaces (if any) | `#8E21FC` | `05-Variations/10PeakStudio_*_Mono_OnBrand.svg` | Per minimum sizes |
| One-colour needs | White or black | `05-Variations/10PeakStudio_*_OneColor_Black.svg` / `_White.svg` | Per minimum sizes |
| Open Graph images | White or Obsidian | Logomark 3D Light or `02-Logomark/10PeakStudio_Logomark_3D_Tile_Dark.svg` | n/a |

The wordmark is never recreated with live text. In running text, the brand name is set in the surrounding font.

### 3.3 Clear space [Brand]

- Primary logo (horizontal and stacked): 1x on every side.
- Logomark: 1x preferred, 0.5x minimum.
- Measured from the edge of the artwork, not from the arrow glow. Keep the area free of text, images and other graphics.

### 3.4 Minimum sizes [Brand]

| Version | Digital (CSS px, artwork width) | Print |
|---|---|---|
| Horizontal, 3D | 160 | 35 mm |
| Horizontal, flat | 120 | 25 mm |
| Stacked, 3D | 96 | 22 mm |
| Stacked, flat | 72 | 16 mm |
| Logomark, 3D | 48 | 12 mm |
| Logomark, flat | 24 | 8 mm |
| Favicon artwork | 16 | n/a |

Below these sizes use the next simpler version. Use flat versions at small sizes and for one-colour use.

### 3.5 Misuse rules [Brand]

"Always use the supplied files. Never redraw, distort or restyle the logo."

| # | Not allowed |
|---|---|
| M1 | Stretch, squash or skew |
| M2 | Rotate |
| M3 | Recolour or swap colours |
| M4 | Add shadows, outlines or effects |
| M5 | Place on low-contrast backgrounds |
| M6 | Place on busy backgrounds |
| M7 | Change the spacing or scale between parts |
| M8 | Retype the wordmark in another font |
| M9 | Flip, move or remove parts of the mark |

Loader interpretation: parts may be revealed in sequence (clip-path, opacity, short translate) but must end in their exact supplied positions, colours and proportions; no rotation, scaling of individual parts, recolouring or glow added beyond the files' own halo.

### 3.6 Icons and favicons

| Asset | Source file | Use |
|---|---|---|
| `favicon.ico` | `02-Logomark/favicon.ico` | Legacy browsers |
| `favicon.svg` | `02-Logomark/10PeakStudio_Favicon.svg` (flat artwork for small sizes) | Modern browsers |
| `apple-touch-icon.png` (180) | `02-Logomark/10PeakStudio_Icon_180.png` | iOS |
| `icon-512.png` | `02-Logomark/10PeakStudio_Icon_512.png` | Web manifest |
| `icon-192.png` | Exported from `02-Logomark/10PeakStudio_AppIcon.svg` (export only, no modification) | Web manifest |

Note [Brand QA]: at 16 px the mark reads as the 1P silhouette but letter gaps close up ("Limited"); 32 px gaps are faint; 64 px is fully legible.

---

## 4. Colour

### 4.1 Primitives [Brand]

| Token | Hex | RGB | Role [Brand] | On white | On black |
|---|---|---|---|---|---|
| Peak Violet | `#8E21FC` | 142 33 252 | Primary. Violet band and flat logo | 5.57:1 | 3.77:1 |
| Deep Violet | `#480BB4` | 72 11 180 | Secondary. Arrow tail, shadows | 10.59:1 | 1.98:1 |
| Lilac Spark | `#A743F8` | 167 67 248 | Accent. Arrow head, highlights | 4.37:1 | 4.8:1 |
| Glow Violet | `#5B10E0` | 91 16 224 | Effect only, at 20% opacity | 8.09:1 | 2.6:1 |
| Obsidian | `#000000` | 0 0 0 | Neutral. Primary dark surface | 21.0:1 | 1.0:1 |
| Ink | `#14111E` | 20 17 30 | Neutral, derived. Logo on light | 18.61:1 | 1.13:1 |
| Slate Lavender | `#8D8CA4` | 141 140 164 | Neutral. Shadow side of white faces | 3.27:1 | 6.42:1 |
| Mist | `#D7D6E1` | 215 214 225 | Neutral. Mid-tone of white faces | 1.44:1 | 14.6:1 |
| Summit White | `#FCFCFC` | 252 252 252 | Neutral. Lit faces, text on dark | 1.03:1 | 20.47:1 |

Additional values found in the brand file (guide page CSS and token semantics): white `#FFFFFF` (surface-raised), Paper `#F6F5FA`, Muted `#5E5A70`, Rule `#DEDBE8` (not used, see [4.4](#44-semantic-tokens)), Link `#7A1AE0`, dark-mode muted `#A9A7BB`, dark-mode link `#C38BFF`, dark-mode rule `#2A2638`.

### 4.2 Gradients [Brand]

| Name | CSS | Use on the website |
|---|---|---|
| Band | `linear-gradient(196deg, #9725FC 0%, #9122FC 50%, #8014FB 100%)` | Primary CTA band surfaces, highlight panels (white text passes: worst stop 5.27:1) |
| Arrow rise | `linear-gradient(90deg, #480BB4 0%, #6617EA 25%, #8F31F9 60%, #A743F8 100%)` | Progress lines, arrow motifs, gradient text at >= 28 px only |
| Summit light | `linear-gradient(141deg, #FCFCFC 0%, #E9E9EF 40%, #D7D6E1 60%, #8D8CA4 100%)` | 3D faces, subtle decorative panels; never behind body text where it reaches `#8D8CA4` |

### 4.3 Usage proportions [Brand]

60% Obsidian or Summit White surfaces, 30% neutrals (Mist, Slate Lavender, Ink), 10% violets. "Violet is a signal colour: use it for the logo, primary actions and key highlights." On this white-first site: white and paper surfaces dominate; Obsidian is limited to at most 2 sections per page including the footer ([6.5](#65-section-rhythm-and-surfaces)).

### 4.4 Semantic tokens

The brand file contains two light semantic sets (guide page CSS vs `10PeakStudio_tokens.css`). Resolution: token-file values are canonical; page values fill gaps; the page background is pure white per the user decision "white backgrounds for primary content".

**Light (default)**

| Semantic token | Value | Source |
|---|---|---|
| `--background` (page) | `#FFFFFF` | tokens.css `--surface-raised`; user decision D6 |
| `--surface-subtle` | `#FCFCFC` Summit White | tokens.css `--surface` |
| `--surface-sunken` (alternate sections, promo panels) | `#F6F5FA` Paper | guide page `--paper` |
| `--card` | `#FFFFFF` | tokens.css |
| `--foreground` (text) | `#14111E` Ink | both |
| `--muted-foreground` | `#5E5A70` | both |
| `--border` (decorative dividers, card outlines) | `#D7D6E1` Mist | tokens.css `--border` (page `#DEDBE8` not used) |
| `--input` (form control borders, needs 3:1) | `#8D8CA4` Slate Lavender | [Derived] for WCAG 1.4.11 |
| `--primary` / `--brand-accent` | `#8E21FC` Peak Violet | both |
| `--primary-hover`, `--link` | `#7A1AE0` | guide page `--link` and `.btn.primary:hover` |
| `--primary-active` | `#480BB4` Deep Violet | [Derived] |
| `--ring` (focus) | `#8E21FC` | guide page `:focus-visible` |

**Inverse (Obsidian sections, `.surface-inverse` scope)**

| Semantic token | Value | Source |
|---|---|---|
| `--background` | `#000000` Obsidian | tokens.css dark `--surface` |
| `--card` | `#14111E` Ink | tokens.css dark `--surface-raised` |
| `--foreground` | `#FCFCFC` Summit White | tokens.css dark |
| `--muted-foreground` | `#A9A7BB` | guide page dark `--muted` |
| `--border` (decorative only) | `#2A2638` | both dark sets |
| `--input` | `#8D8CA4` (6.42:1 on black) | [Derived] |
| `--brand-accent` | `#A743F8` Lilac Spark | tokens.css dark `--accent` |
| `--link` | `#C38BFF` | guide page dark `--link` |
| `--primary` (button fill) | `#8E21FC` (3.77:1 vs black, passes 3:1 for UI) with white text (5.57:1) | [Derived] |
| `--ring` | `#A743F8` | [Derived] |

Dark-mode media queries in the brand token files are **not** used (white-only site).

### 4.5 Functional status colours

[Proposed] The brand file defines no error colour. Its QA table uses `#0E8A44` (success) and `#A86F00` (warning), but both fail 4.5:1 for normal text on white (4.43:1 and 4.25:1), so darker values are proposed. Status is never conveyed by colour alone (icon plus text).

| Token | Light (on white / paper) | Inverse (on black / Ink) |
|---|---|---|
| `--color-error` | `#B42318` (6.57:1 / 6.06:1) | `#F87171` (7.59:1 / 6.73:1) |
| `--color-success` | `#067647` (5.69:1 / 5.25:1) | `#4ADE80` (12.05:1 / 10.68:1) |
| `--color-warning` | `#8A5300` (6.33:1 / 5.83:1) | `#FBBF24` (12.58:1 / 11.15:1) |

### 4.6 Contrast rules and approved pairs

Ratios computed with the WCAG 2.x relative-luminance formula. "Text" means normal-size text (>= 4.5:1). "Large" means >= 24 px regular or >= 18.66 px bold (>= 3:1). "UI" means borders, icons and focus indicators (>= 3:1).

| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| Ink `#14111E` | White / Paper / Summit White | 18.61 / 17.15 / 18.14 | Text |
| Muted `#5E5A70` | White / Paper | 6.62 / 6.10 | Text |
| Peak Violet `#8E21FC` | White / Paper | 5.57 / 5.13 | Text, UI |
| Link `#7A1AE0` | White / Paper | 6.88 / 6.34 | Text |
| Deep Violet `#480BB4` | White | 10.59 | Text |
| Lilac Spark `#A743F8` | White / Paper | 4.37 / 4.03 | Large (>= 24 px regular or >= 19 px bold), UI, decoration. **Never body text** |
| Slate Lavender `#8D8CA4` | White / Paper | 3.27 / 3.02 | UI (input borders, icons), large text only. **Never body text** |
| Mist `#D7D6E1` | White | 1.44 | Decorative borders and surfaces only |
| White `#FFFFFF` | Peak Violet / `#7A1AE0` / Deep Violet | 5.57 / 6.88 / 10.59 | Text (buttons) |
| White | Band gradient (worst stop `#9725FC`) | 5.27 | Text |
| Summit White `#FCFCFC` | Obsidian / Ink | 20.47 / 18.14 | Text |
| `#A9A7BB` | Obsidian / Ink | 8.93 / 7.91 | Text |
| `#C38BFF` | Obsidian / Ink | 8.46 / 7.49 | Text (links, accent text on dark cards) |
| Lilac Spark `#A743F8` | Obsidian / Ink | 4.80 / 4.25 | Text on Obsidian; large and UI only on Ink |
| Peak Violet `#8E21FC` | Obsidian | 3.77 | Large, UI (button fills) only |
| `#2A2638` | Obsidian | 1.43 | Decorative only |
| Slate Lavender `#8D8CA4` | Obsidian | 6.42 | Text, UI |

---

## 5. Typography

### 5.1 Families and weights [Brand]

| Family | Role [Brand] | Weights available | Weights loaded on the site | Licence |
|---|---|---|---|---|
| Sora | Headings, wordmark, numbers in hero moments | 300 to 800 | 300, 600, 700 (variable font) | SIL OFL |
| Inter | Body copy, interface text, tables, captions; includes ₹ | 400 to 700 | 400, 500, 600 (variable font; subsets `latin` and `latin-ext` for ₹) | SIL OFL |
| JetBrains Mono | Code samples, design tokens, column-aligned data | 400 to 700 | 400, only on pages that show code | SIL OFL |

[Brand] Rules: Sora has no ₹ glyph, so rupee amounts are set in Inter (`.price`: Inter, `font-variant-numeric: tabular-nums`). Body text is Inter 16 px with a 26 px line height. Keep lines between 60 and 80 characters. Use Medium 500 for labels and SemiBold 600 for emphasis instead of colour. JetBrains Mono is reserved for code and tokens (not used for eyebrows or decoration).

Wordmark [Brand]: "10Peak" Sora Bold 700 plus "Studio" Sora Light 300, tracking -1%, outlined in every logo file.

### 5.2 Desktop type scale [Brand, verbatim]

| Style | Size / line height | Tracking | Weight | Font |
|---|---|---|---|---|
| Display | 4.5rem / 5rem (72/80 px) | -0.02em | 700 | Sora |
| H1 | 3.5rem / 4rem (56/64) | -0.02em | 700 | Sora |
| H2 | 2.75rem / 3.25rem (44/52) | -0.015em | 600 | Sora |
| H3 | 2.125rem / 2.625rem (34/42) | -0.01em | 600 | Sora |
| H4 | 1.625rem / 2.125rem (26/34) | -0.005em | 600 | Sora |
| H5 | 1.25rem / 1.75rem (20/28) | 0 | 600 | Sora |
| Body large | 1.125rem / 1.875rem (18/30) | 0 | 400 | Inter |
| Body | 1rem / 1.625rem (16/26) | 0 | 400 | Inter |
| Small | 0.875rem / 1.375rem (14/22) | +0.005em | 400 | Inter |
| Caption | 0.75rem / 1.125rem (12/18) | +0.01em | 500 | Inter |
| Code | 0.875rem / 1.375rem (14/22) | 0 | 400 | JetBrains Mono |

### 5.3 Fluid mobile-first scale [Derived, Proposed]

Sizes interpolate linearly from a 360 px viewport (minimum) to 1440 px (brand desktop size). Line heights are unitless ratios derived from the brand desktop values so they scale with size. Tracking is unchanged from the brand.

| Style | Min (360 px) | Max (1440 px) | `font-size` | Line height |
|---|---|---|---|---|
| Display | 2.5rem (40 px) | 4.5rem | `clamp(2.5rem, 1.833rem + 2.963vw, 4.5rem)` | 1.1 |
| H1 | 2.125rem (34 px) | 3.5rem | `clamp(2.125rem, 1.667rem + 2.037vw, 3.5rem)` | 1.15 |
| H2 | 1.75rem (28 px) | 2.75rem | `clamp(1.75rem, 1.417rem + 1.481vw, 2.75rem)` | 1.18 |
| H3 | 1.5rem (24 px) | 2.125rem | `clamp(1.5rem, 1.292rem + 0.926vw, 2.125rem)` | 1.24 |
| H4 | 1.25rem (20 px) | 1.625rem | `clamp(1.25rem, 1.125rem + 0.556vw, 1.625rem)` | 1.31 |
| H5 | 1.125rem (18 px) | 1.25rem | `clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem)` | 1.4 |
| Body large | 1.0625rem (17 px) | 1.125rem | `clamp(1.0625rem, 1.042rem + 0.093vw, 1.125rem)` | 1.667 |
| Body | 1rem | 1rem | `1rem` | 1.625 |
| Small | 0.875rem | 0.875rem | `0.875rem` | 1.571 |
| Caption | 0.75rem | 0.75rem | `0.75rem` | 1.5 |

Acceptance: no heading wraps to more than 4 lines at 360 px with approved copy; text remains readable at 200% zoom.

### 5.4 Text rules

| Rule | Value |
|---|---|
| Alignment | Left; never justified (the reference uses justified text; it creates rivers on mobile) |
| Measure | Body 60 to 80 characters (`max-width: 68ch` for prose; 35 to 60 on mobile happens naturally) |
| Headings | `text-wrap: balance` on H1 to H3 (progressive enhancement) |
| Prose | `text-wrap: pretty` on paragraphs |
| Long tokens | `overflow-wrap: anywhere` on URLs and emails |
| Minimum size | 16 px for body and inputs; 12 px only for captions and legal fine print |

### 5.5 Special text styles

| Style | Spec | Source |
|---|---|---|
| Eyebrow | Inter 500, 0.8125rem (13 px), uppercase, letter-spacing 0.12em, Peak Violet text (5.57:1); bracket glyphs "[ ]" rendered by CSS in Slate Lavender with empty alt text (`content: "[" / ""`) | Reference structure, restyled [Proposed] |
| Dot eyebrow | 6 px Peak Violet dot plus uppercase label | Reference structure [Proposed] |
| Two-tone headline | Final 1 to 3 words in Peak Violet, or Arrow rise gradient text at >= 28 px | Reference structure [Proposed] |
| Hero light line | Sora 300 second line in Mist on Obsidian or Muted on white (as in the brand guide hero `h1 span`) | [Brand] guide page |
| Price | Inter, tabular numerals | [Brand] |

---

## 6. Layout

### 6.1 Breakpoints

Tailwind v4 defaults plus one large breakpoint. Mobile-first.

| Name | Min width | Typical device | Test width |
|---|---|---|---|
| (base) | 0 | Small phones | 360, 390 (and 320 for no horizontal scroll) |
| `sm` | 640 px (40rem) | Large phones landscape | 640 |
| `md` | 768 px (48rem) | Tablets portrait | 768 |
| `lg` | 1024 px (64rem) | Tablets landscape, small laptops (desktop nav starts) | 1024 |
| `xl` | 1280 px (80rem) | Laptops | 1280 |
| `2xl` | 1536 px (96rem) | Desktops | 1440, 1536 |
| `3xl` | 1920 px (120rem) [Proposed] | Large screens | 1920 |

### 6.2 Containers and gutters

| Token | Value |
|---|---|
| `--container-content` | 80rem (1280 px) max width |
| `--container-wide` | 90rem (1440 px) for hero and media |
| `--container-prose` | 68ch |
| Gutter (padding-inline) | 20 px (base), 32 px (`sm`), 48 px (`lg`) |

### 6.3 Grid

| Range | Columns | Gap |
|---|---|---|
| base | 4 | 16 px |
| `md` | 8 | 24 px |
| `lg` and up | 12 | 32 px |

### 6.4 Spacing scale [Proposed]

4 px base, aligned with Tailwind's 0.25rem steps (spacious density for marketing pages).

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | 4 px | Tight icon gaps |
| `--space-2` | 8 px | Inline gaps, touch target spacing |
| `--space-3` | 12 px | Label to input |
| `--space-4` | 16 px | Card inner gaps (mobile) |
| `--space-6` | 24 px | Card padding (mobile), grid gap |
| `--space-8` | 32 px | Card padding (desktop) |
| `--space-12` | 48 px | Heading to content |
| `--space-16` | 64 px | Section padding (mobile) |
| `--space-24` | 96 px | Section padding (tablet) |
| `--space-32` | 128 px | Section padding (desktop) |
| `--space-section` | `clamp(4rem, 2.667rem + 5.926vw, 8rem)` | Vertical section padding |

### 6.5 Section rhythm and surfaces

| Rule | Value |
|---|---|
| Default section surface | White `#FFFFFF` |
| Alternate section surface | Paper `#F6F5FA`, used to separate adjacent content sections |
| Obsidian sections | At most 2 per page including the footer (Home: Automate spotlight plus footer) |
| Section heading block | Eyebrow, H2, optional lead (Body large, Muted, max 60ch); 48 px to content |
| Hero height | Content-driven; `min-h-[min(100dvh,900px)]` on desktop; never forces the CTA below the fold at 360 x 640 |

### 6.6 z-index scale

| Layer | Value |
|---|---|
| Base content | 0 |
| Raised (cards on hover, sticky in-section elements) | 10 |
| Sticky header | 40 |
| Sticky mobile CTA bar | 45 |
| Dropdowns and mega-menu | 50 |
| Drawer and dialog overlay | 60 |
| Consent banner | 70 |
| Toasts | 80 |
| Loader | 100 |

---

## 7. Token implementation

File: `src/app/globals.css` (imports `src/styles/tokens.css`). Tailwind v4 CSS-first configuration; brand hex values are kept exact (not converted to OKLCH, to avoid rounding drift from the brand file).

```css
@import "tailwindcss";
@import "tw-animate-css";

/* 1. Primitives: brand values verbatim */
@theme {
  --color-peak-violet: #8E21FC;
  --color-deep-violet: #480BB4;
  --color-lilac-spark: #A743F8;
  --color-glow-violet: #5B10E0;
  --color-obsidian: #000000;
  --color-ink: #14111E;
  --color-slate-lavender: #8D8CA4;
  --color-mist: #D7D6E1;
  --color-summit-white: #FCFCFC;
  --color-paper: #F6F5FA;
  --color-ink-muted: #5E5A70;
  --color-violet-hover: #7A1AE0;
  --color-inverse-muted: #A9A7BB;
  --color-inverse-link: #C38BFF;
  --color-inverse-rule: #2A2638;
  /* Proposed functional colours (see 4.5) */
  --color-error: #B42318;
  --color-success: #067647;
  --color-warning: #8A5300;
  --color-error-inverse: #F87171;
  --color-success-inverse: #4ADE80;
  --color-warning-inverse: #FBBF24;

  --font-heading: var(--font-sora), "Inter", system-ui, sans-serif;
  --font-sans: var(--font-inter), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, Menlo, Consolas, monospace;

  --text-display: clamp(2.5rem, 1.833rem + 2.963vw, 4.5rem);
  --text-display--line-height: 1.1;
  --text-display--letter-spacing: -0.02em;
  --text-display--font-weight: 700;
  --text-h1: clamp(2.125rem, 1.667rem + 2.037vw, 3.5rem);
  --text-h1--line-height: 1.15;
  --text-h1--letter-spacing: -0.02em;
  --text-h1--font-weight: 700;
  --text-h2: clamp(1.75rem, 1.417rem + 1.481vw, 2.75rem);
  --text-h2--line-height: 1.18;
  --text-h2--letter-spacing: -0.015em;
  --text-h2--font-weight: 600;
  --text-h3: clamp(1.5rem, 1.292rem + 0.926vw, 2.125rem);
  --text-h3--line-height: 1.24;
  --text-h3--letter-spacing: -0.01em;
  --text-h3--font-weight: 600;
  --text-h4: clamp(1.25rem, 1.125rem + 0.556vw, 1.625rem);
  --text-h4--line-height: 1.31;
  --text-h4--letter-spacing: -0.005em;
  --text-h4--font-weight: 600;
  --text-h5: clamp(1.125rem, 1.083rem + 0.185vw, 1.25rem);
  --text-h5--line-height: 1.4;
  --text-h5--font-weight: 600;
  --text-body-lg: clamp(1.0625rem, 1.042rem + 0.093vw, 1.125rem);
  --text-body-lg--line-height: 1.667;
  --text-body: 1rem;
  --text-body--line-height: 1.625;
  --text-small: 0.875rem;
  --text-small--line-height: 1.571;
  --text-small--letter-spacing: 0.005em;
  --text-caption: 0.75rem;
  --text-caption--line-height: 1.5;
  --text-caption--letter-spacing: 0.01em;
  --text-caption--font-weight: 500;

  --radius-sm: 0.5rem;     /* 8 px: inputs, small controls (brand page) */
  --radius-md: 0.875rem;   /* 14 px: cards (brand page) */
  --radius-lg: 1.5rem;     /* 24 px: feature panels, media [Proposed] */
  --radius-pill: 9999px;   /* CTAs, chips [Proposed] */

  --shadow-sm: 0 1px 2px rgb(20 17 30 / 0.06);
  --shadow-md: 0 8px 24px -8px rgb(20 17 30 / 0.12);
  --shadow-lg: 0 24px 48px -16px rgb(20 17 30 / 0.18);
  --shadow-glow: 0 0 48px rgb(91 16 224 / 0.20);         /* Glow Violet at 20% [Brand rule] */
  --shadow-glow-strong: 0 0 48px rgb(91 16 224 / 0.35);  /* brand Tailwind token; hero 3D and loader only */

  --ease-peak-rise: cubic-bezier(0.2, 0.7, 0.2, 1);  /* [Brand] guide "rise" keyframe */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);     /* [Proposed] UI state changes */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);           /* [Proposed] exits */

  --breakpoint-3xl: 120rem;
}

/* 2. Semantic layer: light (default) */
:root {
  color-scheme: light;
  --background: #FFFFFF;
  --foreground: var(--color-ink);
  --card: #FFFFFF;
  --card-foreground: var(--color-ink);
  --popover: #FFFFFF;
  --popover-foreground: var(--color-ink);
  --primary: var(--color-peak-violet);
  --primary-foreground: #FFFFFF;
  --primary-hover: var(--color-violet-hover);
  --primary-active: var(--color-deep-violet);
  --secondary: var(--color-paper);
  --secondary-foreground: var(--color-ink);
  --muted: var(--color-paper);
  --muted-foreground: var(--color-ink-muted);
  --accent: var(--color-paper);               /* shadcn hover surface, not the brand accent */
  --accent-foreground: var(--color-ink);
  --destructive: var(--color-error);
  --border: var(--color-mist);
  --input: var(--color-slate-lavender);
  --ring: var(--color-peak-violet);
  --link: var(--color-violet-hover);
  --brand-accent: var(--color-peak-violet);
  --surface-subtle: var(--color-summit-white);
  --surface-sunken: var(--color-paper);
  --radius: var(--radius-md);
  --header-height: 4rem;
}

/* 3. Semantic layer: Obsidian sections */
.surface-inverse {
  --background: var(--color-obsidian);
  --foreground: var(--color-summit-white);
  --card: var(--color-ink);
  --card-foreground: var(--color-summit-white);
  --popover: var(--color-ink);
  --popover-foreground: var(--color-summit-white);
  --secondary: var(--color-ink);
  --secondary-foreground: var(--color-summit-white);
  --muted: var(--color-ink);
  --muted-foreground: var(--color-inverse-muted);
  --accent: var(--color-ink);
  --accent-foreground: var(--color-summit-white);
  --destructive: var(--color-error-inverse);
  --border: var(--color-inverse-rule);
  --input: var(--color-slate-lavender);
  --ring: var(--color-lilac-spark);
  --link: var(--color-inverse-link);
  --brand-accent: var(--color-lilac-spark);
  background-color: var(--background);
  color: var(--foreground);
}

/* 4. Expose semantic tokens as Tailwind utilities (bg-background, text-foreground, ...) */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-primary-active: var(--primary-active);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-link: var(--link);
  --color-brand-accent: var(--brand-accent);
  --color-surface-subtle: var(--surface-subtle);
  --color-surface-sunken: var(--surface-sunken);
}

/* 5. Brand gradients as utilities */
@utility bg-band { background-image: linear-gradient(196deg, #9725FC 0%, #9122FC 50%, #8014FB 100%); }
@utility bg-arrow-rise { background-image: linear-gradient(90deg, #480BB4 0%, #6617EA 25%, #8F31F9 60%, #A743F8 100%); }
@utility bg-summit-light { background-image: linear-gradient(141deg, #FCFCFC 0%, #E9E9EF 40%, #D7D6E1 60%, #8D8CA4 100%); }

/* 6. Base */
html { scroll-padding-top: calc(var(--header-height) + 1rem); }
body { background: var(--background); color: var(--foreground); font-family: var(--font-sans); font-size: 1rem; line-height: 1.625; }
h1, h2, h3, h4, h5 { font-family: var(--font-heading); }
.price { font-family: var(--font-sans); font-variant-numeric: tabular-nums; }
:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
```

shadcn `components.json`: `tailwind.css` points to `src/app/globals.css`, `cssVariables: true`, base colour irrelevant (variables replaced above); no `.dark` block is generated or kept.

---

## 8. Radius, borders, elevation and glow

| Element | Radius | Border | Shadow |
|---|---|---|---|
| CTA buttons | `--radius-pill` | Secondary: 1.5 px `--foreground` | none |
| Inputs, selects, small controls | `--radius-sm` (8 px) | 1 px `--input` | none; focus ring |
| Cards | `--radius-md` (14 px) | 1 px `--border` | none at rest; `--shadow-md` on hover (pointer devices) |
| Feature panels, media frames | `--radius-lg` (24 px) | optional 1 px `--border` | `--shadow-lg` for floating media |
| Mega-menu, dropdowns, dialogs | `--radius-md` | 1 px `--border` | `--shadow-lg` |
| Brand glow | n/a | n/a | `--shadow-glow` (20%) behind key violet elements; `--shadow-glow-strong` (35%) only in hero 3D and loader |

---

## 9. Iconography

| Rule | Value |
|---|---|
| Set | Lucide (`lucide-react`), outline style only |
| Stroke | 1.75 px at 24 px (via `strokeWidth={1.75}`); consistent across the site |
| Sizes | 16 (inline small), 20 (buttons, nav), 24 (cards, lists), 32 (feature icons) |
| Colour | `currentColor`; service and feature icons in `--brand-accent` |
| CTA arrows | `ArrowRight` (internal links), `ArrowUpRight` (external, WhatsApp) |
| Accessibility | Decorative icons `aria-hidden="true"`; icon-only buttons have `aria-label` |
| Forbidden | Emoji as icons; mixing filled and outline icons at one level; other icon sets |
| WhatsApp | Lucide has no brand logos; use `MessageCircle` with the visible label "WhatsApp us" (no third-party logo needed) |

---

## 10. Component specifications

All interactive components share these state rules: hover styles only under `@media (hover: hover)`; `:focus-visible` ring per [7](#7-token-implementation); pressed state via colour (no layout shift); disabled uses `opacity: 0.45`, `cursor: not-allowed` and the native `disabled` attribute; transitions 150 to 250 ms with `--ease-standard`; `cursor: pointer` on clickable elements.

### 10.1 Button

| Variant | Rest | Hover | Active | Focus | Disabled | Loading |
|---|---|---|---|---|---|---|
| Primary | `bg-primary`, white text, pill | `bg-primary-hover`; arrow icon translates 2 px right | `bg-primary-active` | 2 px ring, 2 px offset | 45% opacity | Spinner replaces icon; label kept; `aria-busy="true"` |
| Secondary (outline) | Transparent, 1.5 px `--foreground` border, `--foreground` text | `bg-secondary` | Border `--primary` | Ring | 45% | Same |
| Ghost / text link button | `--link` text, no border | Underline (2 px offset) | `--primary-active` text | Ring | 45% | n/a |
| On Obsidian (inverse scope) | Primary unchanged (white on `#8E21FC`); Secondary uses Summit White border and text; hover `rgb(255 255 255 / 0.08)` fill | | | Ring `#A743F8` | | |

| Size | Height | Padding-inline | Text | Icon |
|---|---|---|---|---|
| `md` (default) | 48 px | 24 px | Inter 600, 1rem | 20 px |
| `lg` (hero) | 56 px | 28 px | Inter 600, 1.0625rem | 20 px |
| `sm` (header desktop only) | 40 px | 20 px | Inter 600, 0.9375rem | 18 px |

One primary CTA per view region; secondary CTAs visually subordinate.

### 10.2 Text link

Inline links use `--link`, underline always visible in body text (thickness 1 px, offset 3 px), thicker on hover. Navigation links have no underline at rest; active page indicated by `aria-current="page"`, Ink colour and a 2 px Peak Violet indicator.

### 10.3 Header and navigation

| Part | Spec |
|---|---|
| Header | Height 80 px at top, 64 px after 24 px scroll (desktop); 64 px mobile; background white at 90% opacity with `backdrop-filter: blur(8px)` and 1 px `--border` bottom after scroll |
| Desktop links | Inter 500, 0.9375rem, Ink; chevron `ChevronDown` 16 px rotates 180 degrees when open |
| Mega-menu | Opens on click and on hover-intent (150 ms delay) with keyboard support (Enter, Space, Arrow keys, Escape); panel width up to `--container-wide`; left promo panel (Paper surface, logomark, "Build. Automate. Grow." statement, "View all services" link) plus three columns (Build, Automate, Grow), each item title (Inter 600) and one-line description (Small, Muted); Motion presence: fade plus 8 px translate, 200 ms in, 150 ms out |
| Company dropdown | Same pattern, single column |
| Right CTAs | Secondary "WhatsApp us" (`sm`) and Primary "Start a project" (`sm`) |
| Mobile drawer | Full height from the right, white, header row with logo and close button (44 px target); accordion groups; CTAs pinned at bottom; focus trapped; Escape closes; body scroll locked; Motion slide 300 ms in, 200 ms out (Tier 0: no slide) |
| Sticky mobile CTA bar | Height 64 px plus safe-area inset; white with top border; two equal buttons; appears after the hero, hides when drawer, banner or keyboard is open |

Built on shadcn `NavigationMenu` (desktop) and `Sheet` (drawer), restyled.

### 10.4 Section heading

Eyebrow ([5.5](#55-special-text-styles)), H2 (two-tone allowed), optional lead paragraph (Body large, Muted, max 60ch). Left-aligned by default; centred only for the final CTA band.

### 10.5 Cards

| Card | Spec |
|---|---|
| Pillar card | `--radius-lg`, 1 px border, padding 32 px (desktop) / 24 px (mobile); pillar name as eyebrow; H3 statement; service list with arrow links. Build and Automate span larger columns (7/12 and 5/12 on desktop), Grow full width below with lower visual weight (Paper surface) |
| Service card | `--radius-md`, 1 px border, padding 24 / 32 px; 32 px line icon in `--brand-accent`; title H4 in Peak Violet (reference: accent-coloured titles); one-line description in Muted; whole card is one link (single tab stop) with visible focus ring; hover: `--shadow-md` and translateY(-2px) (pointer devices only) |
| Feature card | Same as service card without link; used for offerings and capabilities |
| Card on Obsidian | `--card` Ink, border `#2A2638`, title in `#C38BFF` (not Lilac Spark: 4.25:1 on Ink fails for text) |

Body copy in cards is left-aligned (reference uses justified; not allowed).

### 10.6 Process steps

Ordered list. Mobile: vertical timeline with a 2 px Arrow rise line and numbered nodes (Sora 600). Desktop Tier 2: optional pinned horizontal sequence (<= 150% viewport scroll). Each step: number, title (H4), description, deliverables list.

### 10.7 Tabs (Mission / Vision / Belief)

shadcn `Tabs` (Radix): tab list with pill indicator in Peak Violet; arrow-key navigation; panels crossfade 200 ms (Motion; none at Tier 0). On mobile the tab list scrolls horizontally if needed, never wraps into ambiguous rows.

### 10.8 Accordion (FAQ)

shadcn `Accordion`, type "multiple"; question as a button (Inter 600, Body large) with `Plus` icon rotating to `Minus` state; answer in Body, Muted; height animation via Motion layout (Tier 0: instant). All answers are in the DOM (for search engines and FAQPage JSON-LD parity).

### 10.9 Form controls

| Control | Spec |
|---|---|
| Label | Inter 500, 0.875rem, Ink; required marker "*" with visually hidden "required" |
| Input, select, textarea | Height 48 px (textarea min 140 px), `--radius-sm`, 1 px `--input` border, white background, 16 px text, padding 12 x 16 px |
| Focus | Border `--primary` plus 2 px ring offset 2 px |
| Error | Border `--destructive`; message below with `AlertCircle` icon, Small, `--destructive`; linked via `aria-describedby` |
| Helper text | Small, Muted, below the field |
| Checkbox and radio | 20 px control inside a 44 px target; checked fill Peak Violet with white mark |
| Service checkboxes (step 1) | Selectable cards (2 columns mobile, 3 desktop) with checkbox semantics |
| Stepper | "Step N of 3" text plus 3-segment progress bar (Arrow rise fill); Back (secondary) and Next (primary) buttons |
| Error summary | Top of form after failed submit: `role="alert"`, focusable heading "There is a problem", list of links to each invalid field |
| Honeypot | Off-screen (not `display:none`), `aria-hidden="true"`, `tabindex="-1"` |

### 10.10 Toast

Bottom-centre (mobile) or bottom-right (desktop), `role="status"`, auto-dismiss 4 s, never steals focus, Ink background with Summit White text (as in the brand guide's toast).

### 10.11 Consent banner and preferences

| Part | Spec |
|---|---|
| Banner | Non-modal; mobile: bottom sheet full width; desktop: bottom-left card max 440 px; white, `--shadow-lg`, `--radius-md`; appears only after the loader is removed |
| Copy (Draft) | "We use optional analytics to improve this site. You can accept, reject or choose." plus link to `/privacy#cookies` |
| Buttons | "Accept all" and "Reject all" with **identical styling** (secondary, same size, side by side); "Customise" as a text button |
| Preferences dialog | shadcn `Dialog`; three rows with title, description and switch: Necessary (on, disabled), Analytics (GA4), Session insights (Clarity); "Save choices" primary |
| Footer control | "Privacy choices" button opens the dialog |
| Focus | Banner never fully covers the focused element; `scroll-padding-bottom` set while visible |

### 10.12 Breadcrumbs

Small text, Muted links, `/` separators (`aria-hidden`), last item `aria-current="page"`; inside `<nav aria-label="Breadcrumb">`.

### 10.13 Back-to-top

44 px circular button, white with border and `ArrowUp` icon, bottom-right, above the sticky CTA bar on mobile; fades in after 2 viewport heights.

### 10.14 CTA band and footer (Obsidian)

| Part | Spec |
|---|---|
| CTA band | `.surface-inverse`; H2 (Summit White, two-tone final words in Lilac Spark at >= 28 px), supporting line (`#A9A7BB`), Primary "Start a project" and Secondary "WhatsApp us"; subtle Glow Violet radial glow at 20% behind the heading |
| Footer | Continues the Obsidian surface below the band; 1 px `#2A2638` divider; dark horizontal 3D logo (>= 200 px); four columns on desktop, accordion-free stacked groups on mobile; links in `#A9A7BB` turning Summit White on hover; legal line in Caption |

### 10.15 Hero

| Part | Spec |
|---|---|
| Layout | Desktop: text 6/12 left, 3D 6/12 right; mobile: text first, 3D or poster below at 4:3 |
| Text | Eyebrow; H1 (Display style); supporting line (Body large, Muted, max 52ch); CTA row (Primary `lg`, Secondary `lg`) |
| Visual | Fixed aspect-ratio box (no CLS); poster at first paint; scene crossfades in when ready |
| Background | White, with a very soft Glow Violet radial glow at 20% near the visual |

---

## 11. Motion language

### 11.1 Principles

| # | Principle |
|---|---|
| 1 | Purposeful: every motion explains structure, progress or cause and effect. "Crazy quality, strict professionalism." |
| 2 | Rising: the signature direction is upward and to the right (the arrow); content rises into place. |
| 3 | Calm: decelerating eases, no bounce, no elastic, no spin. |
| 4 | Content first: the readable final state exists without animation. |
| 5 | Respectful: reduced motion is a complete, designed experience, not a broken one. |

### 11.2 Signature motifs

| Motif | Description | Where |
|---|---|---|
| Peak rise | Opacity 0 to 1 with translateY 24 px (desktop) or 12 px (mobile) to 0 and scale 0.985 to 1, `--ease-peak-rise` | Section reveals, hero elements after first paint |
| Arrow draw | Clip-path reveal from left to right along the Arrow rise gradient | Process line, loader arrow, progress bars |
| Band wipe | Clip-path reveal of a violet band from the sliced edge | Loader, section accents |
| Summit light | Slow gradient shift on Summit light surfaces tied to scroll (Tier 2) | Hero 3D lighting, decorative panels |

### 11.3 Motion tiers

Defined in [Architecture.md 9.2](Architecture.md#92-motion-tiers). Design behaviour:

| Element | Tier 0 (reduced motion) | Tier 1 (touch or low power) | Tier 2 (desktop) |
|---|---|---|---|
| Loader | Not shown | Shown once per session | Shown once per session |
| Smooth scroll | Native | Native | Lenis |
| Section reveal | None (final state) | Peak rise, 500 ms, 12 px | Peak rise, 800 ms, 24 px, stagger 60 ms |
| SplitText headlines | None | None | Short H2s only |
| Pinned sections | None | None | Up to 2 per page |
| Parallax | None | None | Max 10% `yPercent` on decorative layers |
| Hero 3D | Poster | Lite scene or poster | Full scene |
| Menus, accordion, dialogs | Instant or opacity only (<= 150 ms) | Full (short) | Full |
| Hover micro-interactions | Colour only | n/a (no hover) | Colour plus 2 px translate |

### 11.4 Motion tokens

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 100 ms | Press feedback |
| `--duration-fast` | 150 ms | Hover colour, focus |
| `--duration-base` | 250 ms | Menus, dropdowns, tabs |
| `--duration-slow` | 400 ms | Drawer, dialog, crossfades |
| `--duration-reveal-mobile` | 500 ms | Tier 1 reveals |
| `--duration-reveal` | 800 ms | Tier 2 reveals |
| `--duration-signature` | 1100 ms | Hero intro, brand "rise" [Brand: guide hero `rise` 1.1 s] |
| `--duration-loader-max` | 1900 ms (hard cap 2200 ms) | Loader |
| Exit duration | About 65% of the matching enter duration | All exits |
| Stagger | 60 ms, max 8 children | Lists and grids |
| Ease (enter) | `--ease-peak-rise` `cubic-bezier(0.2, 0.7, 0.2, 1)`; GSAP: `CustomEase.create("peakRise", "0.2,0.7,0.2,1")` | Reveals, intros |
| Ease (state) | `--ease-standard` `cubic-bezier(0.4, 0, 0.2, 1)` | UI state |
| Ease (exit) | `--ease-exit` `cubic-bezier(0.4, 0, 1, 1)` | Exits |
| Scrub | `scrub: 1` | Pinned and scrubbed timelines |
| ScrollTrigger start | `"top 85%"`, `once: true` for reveals | Reveals |

### 11.5 Choreography patterns

| Pattern | Spec |
|---|---|
| Hero intro (after loader or immediately) | H1 already visible; eyebrow, supporting line and CTAs peak-rise in sequence (stagger 80 ms) only if they are not the LCP element; 3D crossfades in when ready |
| Section reveal | Heading block, then children staggered |
| Pillar cards | Build and Automate cards rise first, Grow follows |
| Process (Tier 2 pinned) | Step cards slide horizontally while the Arrow rise line draws; step counter updates; `aria-live` not used (content is static in DOM) |
| Automate spotlight (Obsidian) | Background transitions from white to Obsidian via a full-bleed section edge (no colour tween on text); example use-case cards rise |
| Final CTA band | Heading two-tone words fade from Summit White to Lilac Spark once |

### 11.6 Logo loader specification

Uses the six named paths of the 3D Light logomark ([3.1](#31-anatomy-brand)) on a white overlay. Pure CSS keyframes. All parts end at their exact supplied geometry and colours.

| Time (ms) | Part | Animation |
|---|---|---|
| 0 to 150 | Overlay | White; mark hidden |
| 150 to 650 | Band `lv` | Band wipe: `clip-path: inset(0 100% 0 0)` to `inset(0 0 0 0)`, `--ease-peak-rise` |
| 350 to 900 | Ribbon `lb` and fold `lf` | Opacity 0 to 1, translateY 8 px to 0 |
| 500 to 1000 | Stem `ls` and "1" `l1` | Opacity 0 to 1, translateY 12 px to 0, `--ease-peak-rise` |
| 900 to 1400 | Arrow `la` | Arrow draw: clip-path reveal left to right; file's own halo fades in with it |
| 1400 to 1650 | Wordmark | Wordmark paths (from the horizontal light lockup) fade in at the lockup position |
| 1650 to 1900 | Overlay | Opacity 1 to 0, then node removed; page beneath already rendered |

Controls: "Skip intro" text button (bottom-right, Small, 44 px target) and any key or click skip to the end state. Shown once per browser session; never under reduced motion. CSS fail-safe hides the overlay at 2200 ms. Lifecycle and measurement: [Architecture.md 9.5](Architecture.md#95-loader-lifecycle).

### 11.7 Hero 3D concept directions

Both concepts use brand violets on a white canvas, procedural geometry and custom shaders, and must not resemble the reference site's globe or robotic hand. Final choice after M3 prototypes ([PRD OQ-10](PRD.md#17-open-questions)).

| | Concept A: Summit | Concept B: Signal network |
|---|---|---|
| Form | Luminous faceted peak (low-poly ridge) with Summit light faces and Peak Violet edge light; a ribbon arrow (tube along a rising curve) in the Arrow rise gradient sweeping up and to the right | Fibonacci-sphere particle field with short connecting lines between near neighbours; colour shifts Deep Violet to Lilac Spark with height |
| Pointer (Tier 2) | Gentle tilt (max 4 degrees) and light sweep | Local ripple and line brightening near the pointer |
| Scroll (Tier 2) | Arrow grows along its path; camera dollies slightly upward | Sphere morphs toward a peak silhouette |
| Mobile lite (Tier 1) | Static pose, slow light drift, DPR 1.25 | <= 3,000 particles, no lines, slow rotation |
| Story link | Directly echoes the logo's rising arrow and "Peak" | "Intelligent, connected" (Automate pillar) |
| Risk | Must not look like a logo redraw (keep abstract) | Can feel generic; needs distinctive brand colour logic |

Poster (Tier 0 and fallback): a static render of the chosen concept's resting pose, AVIF <= 60 KB.

---

## 12. Imagery

| Rule | Value |
|---|---|
| Allowed | Abstract renders using brand forms (peaks, arrows, ribbons) and brand colours; generic, clearly non-client UI mockups; photography of real studio work or people only when genuine and approved |
| Not allowed | Stock photos implying a team, office or clients; AI-generated people presented as staff or customers; client logos without permission; imagery copied from the reference site |
| Ratios | Hero visual 4:3 (mobile) and 1:1 to 5:4 (desktop); cards 16:10 (matches brand guide previews); OG 1200 x 630 |
| Treatment | Cool, light, high-key; violet accents; Summit light gradient backgrounds; soft Glow Violet at 20% |
| Text on images | Add a dark scrim when the area behind text falls below 4.5:1 [Brand: photographic background rule] |
| Delivery | Cloudinary `f_auto,q_auto`; explicit `sizes`; lazy below the fold ([Architecture.md 7](Architecture.md#7-image-pipeline)) |

---

## 13. Reference analysis

The three reference screenshots (`ref-01-hero.png`, `ref-02-about.png`, `ref-03-nav-mega-menu.png`) were **not found** in `Project_spec/references/`, the project root or Downloads (checked 2026-11-05). This analysis uses the written description in Company_info.md section 7 only. The reference (unithinktechnologies.com) informs structure and hierarchy; nothing is copied.

| Observed pattern | Adopted as | Done differently for 10PeakStudio |
|---|---|---|
| Very large bold geometric sans headlines with a two-tone accent on the final words; strong contrast against body | Display/H1 in Sora 700 with two-tone final words ([5.5](#55-special-text-styles)) | Sora, not Montserrat; violet accent, not gold |
| Bracketed eyebrows ("[ How We Work ]") and dot-plus-uppercase eyebrows | Eyebrow styles in Inter 500 | Brackets rendered decoratively; brand colours |
| Pill CTAs: filled primary with arrow, outlined secondary with arrow | Button primary and secondary ([10.1](#101-button)) | Peak Violet fill; Ink outline |
| Nav: logo left, centred links with chevrons, two CTAs right; mega-menu with left promo panel and three columns of title plus description | Header and mega-menu ([10.3](#103-header-and-navigation)) | Columns are the three pillars; white and Paper surfaces |
| Tabbed Mission/Vision/Belief block | Tabs on About ([10.7](#107-tabs-mission--vision--belief)) | Approved copy only |
| Three-column outlined cards with line icons, accent titles, justified body | Service and feature cards ([10.5](#105-cards)) | **Left-aligned** body text |
| Project delivery process section | Process steps ([10.6](#106-process-steps)) | Pinned sequence on desktop Tier 2 only |
| Orbiting icon badges near the hero | Not adopted | Replaced by the brand 3D hero |
| Back-to-top button | Adopted ([10.13](#1013-back-to-top)) | |
| Gold and navy palette, Montserrat | **Rejected** | Brand violets, Sora and Inter |
| Overall | | White theme, lighter and more spacious rhythm, premium motion language |

---

## 14. Responsive behaviour by pattern

| Pattern | Base (< 640) | `md` (768) | `lg` (1024) and up |
|---|---|---|---|
| Header | Logo (flat), menu button | Logo (flat), Start a project, menu button | Logo (3D), centred links, two CTAs |
| Hero | Text stacked, CTAs full width stacked, visual below (4:3) | CTAs inline | Two columns, visual right |
| Pillar cards | Stacked | Stacked, Build and Automate side by side | Build 7/12, Automate 5/12, Grow full width |
| Service cards | 1 column | 2 columns | 3 or 4 columns |
| Process | Vertical timeline | Vertical timeline, 2-column step content | Horizontal (pinned at Tier 2) |
| Audience grid | 2-column chips | 3 columns | 6 columns or 3 x 2 |
| FAQ | Full width | Full width, max 68ch | Two columns: heading block left (4/12), accordion right (8/12) |
| Enquiry form | Single column, sticky step bar | Single column, max 640 px | Form 7/12, direct channels 5/12 |
| Footer | Stacked groups | 2 columns | 4 columns |
| Sticky CTA bar | Shown after hero | Shown after hero | Hidden |
| Typography | Fluid minimums | Interpolated | Brand desktop values at 1440 px |

Orientation: landscape phones keep the hero CTA visible; the 3D visual shrinks before text does.

---

## 15. Page override plan

`design-system/10peakstudio/MASTER.md` holds the global rules (a condensed, brand-first mirror of this document). Page-specific deviations go in `design-system/10peakstudio/pages/<page>.md` and override MASTER.md for that page only; this Design.md and the brand guide still win over both.

| Planned override file | Reason |
|---|---|
| `pages/home.md` | Loader, hero 3D, pinned process, Automate Obsidian section |
| `pages/service.md` | Service template specifics (answer-first block, related services) |
| `pages/contact.md` | Form layout, no final CTA band, sticky step bar on mobile |
| `pages/legal.md` | Prose layout for Privacy and Terms (68ch measure, no motion beyond Tier 0 behaviour) |

Override files are created when the corresponding page is built (M4), not before.
