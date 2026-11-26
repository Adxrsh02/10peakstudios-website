# 10PeakStudio Portfolio Section & Case Study Specification

**Document:** `Project_spec/Sections/02_Portfolio.md`  
**Status:** Approved for Build  
**Routes:** `/portfolio`, `/portfolio/[slug]`, `/portfolio/search-index.json`  
**Branch:** `feature/portfolio`  
**Date:** 2026-11-26  
**Owner:** 10PeakStudio

---

## 1. Source Map & Approved Decisions

| Requirement Area | Source File | Implementation Anchor |
| :--- | :--- | :--- |
| Brand Palette, Fonts, Radii, Contrast | `Project_spec/Design.md` §4–§10, `design-system/10peakstudio/MASTER.md`, `src/styles/tokens.css` | Zero raw hex in components (`RUL-ST-01`), Sora/Inter only, WCAG 2.2 AA contrast. |
| Theme Rhythm & Obsidian Cap | `Design.md` §6.5 | Max 2 full-bleed Obsidian (`.surface-inverse`) bands per page (Hero + SiteFooter CTA). Featured panel & Architecture showcase use elevated Ink `#14111E` inset cards inside White/Paper bands. |
| Navigation & Footer | `src/content/navigation.ts`, `DesktopNav.tsx`, `MobileDrawer.tsx` | `"Portfolio"` nav item added beside `Contact` on desktop, mobile drawer, and Footer (`Company` column). |
| Content Integrity & Gate | `Project_spec/PRD.md` §12, `Project_spec/Rules.md` §4 | Nav link visible; `/portfolio` and `[slug]` stay `noindex, follow` and out of `sitemap.xml` until `published` count `>= PORTFOLIO_INDEXABLE_THRESHOLD` (`3`). Unconfirmed metrics stripped from production HTML. |
| Static Export & Cloudflare Free Plan | `Project_spec/Architecture.md` §4–§5, §14, `next.config.ts` | `output: 'export'`, `generateStaticParams`, `dynamicParams = false`, `search-index.json` static route, `<= 150 KB` gzip initial JS/route, `<= 25 MiB` file limit. |
| Zero New Dependencies | `Project_spec/Rules.md` §14 | Built strictly with installed dependencies (`zod`, `motion`, `gsap`, `lenis`, `lucide-react`, `radix-ui`) + bespoke TypeScript YAML-subset/Markdown AST parser (`0 KB` client JS, zero `dangerouslySetInnerHTML`) & lightweight SVG Mermaid flowchart renderer. |

### Locked User Decisions (2026-11-26)
1. **Industries (8):** `Healthcare`, `Real Estate`, `E-commerce & Retail`, `Finance & Fintech`, `Education & EdTech`, `Hospitality & Restaurants`, `SaaS & Startups`, `Manufacturing & Logistics`.
2. **Hero Headline:** `"Real Systems Built To Scale."` (last 3 words accented).
3. **Project 1 (`automated-fundus-image-screening`):** `type: "in-house"`, verified research metrics table (`ODIR-2019` dataset benchmarks), explicit disclaimer `"Research project. Not a certified medical device and not for clinical diagnosis."`, omit 4 missing local `Section_images\` paths until uploaded to Cloudinary, mark unconfirmed framework (`PyTorch` vs `TensorFlow`) & individual team names for owner follow-up.
4. **GitHub Link:** Verified HTTP `200` (public) for `https://github.com/Adxrsh02/Automated-Fundus-Disease-Detection`; rendered cleanly.
5. **Video Facade & CSP:** Supports both `youtube-nocookie` IDs and Cloudinary `<video>` URLs, loading strictly on click. `public/_headers` updated only with `frame-src` (`'self'` + `https://www.youtube-nocookie.com`) and `media-src` (`'self'` + `https://res.cloudinary.com`).
6. **Theme:** Hero & Footer CTA = full-bleed Obsidian (`.surface-inverse`). Featured Panel & Architecture Block = elevated Ink (`#14111E`) inset cards.
7. **Nav Label:** `"Portfolio"` right beside `"Contact"`.
8. **Indexing Threshold:** `PORTFOLIO_INDEXABLE_THRESHOLD = 3`.

---

## 2. Information Architecture

### Portfolio Index (`/portfolio`)
1. **Hero (Obsidian `.surface-inverse`):** Eyebrow `[ Our Work ]`, H1 `"Real Systems Built To Scale."`, 1-line intro, computed counts (`Projects`, `Industries`, `Technologies`). Tier 2 subtle decorative parallax.
2. **Featured Case Study Showcase (Paper `#F6F5FA` with gradient fade -> elevated Ink `#14111E` inset panel):** 16:10 Cloudinary visual, industry/type/status badges, title, tagline, top 4 tech chips, primary CTA.
3. **Sticky Search & Filter Bar + Grid (White `#FFFFFF`):**
   - Search input (`/` shortcut, clear button, `aria-live="polite"` result announcement), Industry filter chips (`All` + 8 with real counts; `0`-count chips disabled), Capability filter, Top Tech filter, Sort (`Featured`, `Newest`, `Complexity`). Mobile `< 1024px` collapses filters into a Radix `Sheet` bottom drawer (`>= 44px` targets).
   - URL sync (`?q=&industry=&capability=&tech=&sort=`), `LazyMotion` (`domAnimation`) FLIP grid reordering, Tier 2 pointer-only 3D tilt (`<= 4deg`) + Glow Violet 20% spotlight, progressive View Transitions thumbnail handoff, friendly empty state.
4. **Our Engineering Approach (Paper `#F6F5FA`):** 7-step ordered timeline (`Research -> Planning -> Design -> Development -> Testing -> Deployment -> Maintenance`).
5. **Industries Grid (White `#FFFFFF`):** 8 interactive industry cards with Lucide icons (`strokeWidth={1.75}`) and real project counts.
6. **Closing CTA & Footer (`RootLayout` `SiteFooter` Obsidian band).**

### Case Study Page (`/portfolio/[slug]`)
1. **Reading Progress Bar:** `3px` Arrow-rise gradient `scaleX` bar under header (ScrollTrigger on Tier 1/2, hidden on Tier 0).
2. **Hero (Obsidian `.surface-inverse`):** Breadcrumbs, badges (Industry, Type, Status, Complexity), H1, year/duration/team, conditional GitHub / Live Demo buttons, `priority` Cloudinary Hero image, plus optional Research/Medical disclaimer strip.
3. **In-Short Summary + At-a-Glance Strip (Paper `#F6F5FA`):** GEO/AEO 2–3 sentence summary + 5-cell metadata grid (`Industry`, `Role / Team`, `Timeline`, `Platform`, `Key Tech`).
4. **Body Layout (White `#FFFFFF`):** Sticky desktop Left TOC (`IntersectionObserver` active state) / collapsible mobile `"On this page"` menu + structured conditional sections (omitting any missing section):
   - Project Overview, Problem Statement, Business Objective, Solution
   - **Architecture Showcase (Ink `#14111E` inset card):** Zoomable Cloudinary diagrams + lazy `IntersectionObserver` Mermaid flowchart SVG
   - **Technology Stack:** Grouped chips (`Frontend`, `Backend`, `AI / ML`, `Database`, `Cloud`, `Deployment`, `DevOps`, `Tools`)
   - **Features:** Scannable feature cards grid
   - **Development Workflow:** Animated Arrow-rise vertical `<ol>` timeline
   - **Challenges & Solutions:** Side-by-side paired cards (`Challenge -> Solution`)
   - **Performance & Benchmarks:** Responsive styled tables (`tabular-nums`, mobile scroll hint) + `confirmed: true` animated metric count-ups
   - **Screenshots Gallery:** Label tabs (`All`, `Dashboard`, `Desktop`, `Mobile`, `Architecture`, `Analytics`, `Admin`, `AI & RAG`, `Model`) + Lightbox (Radix `Dialog`, arrows, swipe, zoom, captions)
   - **Video Demonstration** *(optional, click-to-load facade)*
   - **Research Publication Card** *(optional, abstract + preview PDF + download PDF)*
   - **Lessons Learned & Future Improvements** *(optional)*
   - **Links & Related Services Cross-Links**
5. **Next / Previous & Related Projects (Paper `#F6F5FA`)**
6. **Closing CTA & Footer (`RootLayout` `SiteFooter`).**

---

## 3. Shared Edits Scope

Only these shared files may be modified:
- `src/content/navigation.ts`
- `src/components/layout/DesktopNav.tsx`
- `src/components/layout/MobileDrawer.tsx`
- `src/app/sitemap.ts`
- `src/lib/analytics.ts`
- `public/_headers`
- `src/styles/components.css` *(portfolio card/gallery utilities if needed without touching tokens)*

---

## 4. Verification Gates

- Build-time Zod schema failure test (`portfolio-schema.test.ts`), search ranking test (`portfolio-search.test.ts`).
- `npm run typecheck`, `npm run lint` (`--max-warnings=0`), `npm run build` after each step.
- Final Playwright E2E + `@axe-core/playwright` + responsive (`320px–1920px`) + `reducedMotion` + `no-JS` + Lighthouse mobile audit (`>= 90` Perf, `>= 95` A11y/BP/SEO).
