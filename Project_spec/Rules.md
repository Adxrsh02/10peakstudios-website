---
title: 10PeakStudio Website - Binding Rules
document: Rules.md
version: 1.0.0
date: 2026-11-05
status: Draft - awaiting approval
owner: 10PeakStudio
related: PRD.md, Architecture.md, Design.md, ../design-system/10peakstudio/MASTER.md, ../CLAUDE.md
---

# 10PeakStudio Website - Binding Rules

These rules bind the AI agent and all code. "Must" is mandatory; "should" needs a written reason to deviate. Every rule states how it is verified.

## Table of contents

1. [Scope and precedence](#1-scope-and-precedence)
2. [Agent workflow rules](#2-agent-workflow-rules)
3. [When to stop and ask](#3-when-to-stop-and-ask)
4. [Content integrity rules](#4-content-integrity-rules)
5. [TypeScript and code standards](#5-typescript-and-code-standards)
6. [Naming conventions](#6-naming-conventions)
7. [File and component conventions](#7-file-and-component-conventions)
8. [Styling rules](#8-styling-rules)
9. [Accessibility rules](#9-accessibility-rules)
10. [Animation and 3D rules](#10-animation-and-3d-rules)
11. [Performance rules](#11-performance-rules)
12. [Security and privacy rules](#12-security-and-privacy-rules)
13. [SEO rules](#13-seo-rules)
14. [Dependency rules](#14-dependency-rules)
15. [Git and commit conventions](#15-git-and-commit-conventions)
16. [Definition of Done](#16-definition-of-done)
17. [Phase quality gates](#17-phase-quality-gates)

---

## 1. Scope and precedence

| ID | Rule | Verify by |
|---|---|---|
| RUL-SCP-01 | Source-of-truth order: (1) `10PeakStudio_Brand_Guidelines.html` for visual identity; (2) `Project_spec/Company_info.md` and recorded user decisions for business facts, stack and constraints; (3) ui-ux-pro-max output as suggestions only; (4) general best practice. | Review |
| RUL-SCP-02 | If sources 1 and 2 conflict, or something is missing or ambiguous, the agent lists it for the user with a recommended default and does not decide silently. | Review |
| RUL-SCP-03 | Within the spec set: PRD.md governs scope and content, Architecture.md governs technical design, Design.md governs visual design, this file governs process and code rules. A conflict between spec files is a defect to report, not to resolve silently. | Phase 3 consistency check |
| RUL-SCP-04 | Brand name is always written **10PeakStudio**. `10PeakStudios` appears only as schema `alternateName` and in the domain `10peakstudios.com`. | `grep -r "10PeakStudios"` in `src/` returns only the schema builder |

---

## 2. Agent workflow rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-WF-01 | Every session starts by reading `CLAUDE.md` and the four spec files (auto-imported) before changing anything. | Session transcript |
| RUL-WF-02 | **For every UI/UX task, use the ui-ux-pro-max skill first.** Then read `design-system/10peakstudio/MASTER.md`, then check `design-system/10peakstudio/pages/<page>.md` for overrides. Page files override MASTER.md; Design.md and the brand guide override both. | Transcript shows skill invocation |
| RUL-WF-03 | Skill output never overrides brand colours, fonts, logo rules or the white theme. Off-brand skill suggestions (for example Liquid Glass, Cormorant, Montserrat, black-and-gold palettes) are rejected. | Review |
| RUL-WF-04 | Work in small, reviewable steps; one milestone task per change set. | PR size |
| RUL-WF-05 | Propose before big decisions (new dependency, architecture change, new route, new third-party service). | Review |
| RUL-WF-06 | Verify volatile facts (plan limits, versions, licences, API behaviour) against current official documentation before relying on them; record source URL and date in [Architecture.md 18](Architecture.md#18-verified-facts-register); mark anything unchecked as UNVERIFIED. | Register updated |
| RUL-WF-07 | No production implementation begins before the relevant planning spec is approved (Company_info.md section 11). | Approval recorded |
| RUL-WF-08 | Never commit, push, deploy or create remote resources (D1 database, DNS records, secrets) unless the user asks. | Transcript |
| RUL-WF-09 | Never copy text, images, icons or code from the reference site (unithinktechnologies.com). | Review |
| RUL-WF-10 | End each working session by summarising what changed and what is pending. When `task.md` and `memory.md` exist (deferred), update them. | Transcript |

---

## 3. When to stop and ask

The agent must stop and ask the user (with a recommended default) when:

| ID | Trigger |
|---|---|
| RUL-ASK-01 | Real content is needed: any `[PLACEHOLDER]` item in [PRD.md 12.2](PRD.md#122-placeholder-register), any claim about clients, results, prices, team, dates, credentials or security practices. |
| RUL-ASK-02 | A brand rule seems to block a requirement (for example a colour outside the palette, a logo modification, a new font). |
| RUL-ASK-03 | A dependency, service or feature might cost money or exceed a free-tier limit. |
| RUL-ASK-04 | A change touches legal text, consent behaviour, data retention or what personal data is collected. |
| RUL-ASK-05 | A budget in [Architecture.md 14](Architecture.md#14-performance-budgets) cannot be met without cutting a PRD requirement. |
| RUL-ASK-06 | Two spec files disagree, or a requirement is not testable as written. |
| RUL-ASK-07 | An irreversible or outward-facing action is next (deploy, DNS, email sending to real addresses, deleting data). |
| RUL-ASK-08 | A test or quality gate fails and the fix would change scope or design. |

---

## 4. Content integrity rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-CNT-01 | Never invent clients, testimonials, case studies, statistics, certifications, awards, prices, team members, founding year or security credentials. | Review |
| RUL-CNT-02 | Unknown content is written as `[PLACEHOLDER: what is needed]`. | `scripts/check-placeholders.mjs` |
| RUL-CNT-03 | Production builds fail if `[PLACEHOLDER` appears anywhere in `out/`. Preview builds warn. | CI |
| RUL-CNT-04 | Portfolio, testimonials, team or founder details, founding year and social links stay hidden until genuine and verified (PRD D4). | Content files contain no such data; routes absent |
| RUL-CNT-05 | Example use cases are labelled as examples and never presented as client work. | Review |
| RUL-CNT-06 | Security page statements are limited to implemented controls and owner-confirmed practices; no certification names, badges or guarantees. | Review against [Architecture.md 13](Architecture.md#13-security) |
| RUL-CNT-07 | No phone number or postal address in HTML, JSON-LD or meta tags unless verified and approved. | `grep` for phone and address patterns in `out/` |
| RUL-CNT-08 | No AI-generated images of people presented as staff, clients or customers. | Review |
| RUL-CNT-09 | All copy lives in `src/content/*` (typed), not inline in components, except microcopy for generic UI (for example "Close"). | Review |

---

## 5. TypeScript and code standards

| ID | Rule | Verify by |
|---|---|---|
| RUL-TS-01 | `tsconfig` has `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`, `exactOptionalPropertyTypes: true`, `noFallthroughCasesInSwitch: true`. | `tsc --noEmit` |
| RUL-TS-02 | No `any`; use `unknown` and narrow. No non-null assertions (`!`) except on documented DOM refs inside effects. | ESLint (`@typescript-eslint/no-explicit-any`, `no-non-null-assertion`) |
| RUL-TS-03 | No `@ts-ignore`; `@ts-expect-error` only with a reason comment. | ESLint |
| RUL-TS-04 | All external input (form data, Worker requests, environment variables, URL parameters) is parsed with Zod before use. | Review, tests |
| RUL-TS-05 | Functions do one thing; components under about 200 lines; extract hooks for logic. | Review |
| RUL-TS-06 | No `console.log` in committed code; `console.warn`/`console.error` only in error paths. | ESLint `no-console` |
| RUL-TS-07 | Prettier formats everything; ESLint passes with zero warnings in CI. | CI |
| RUL-TS-08 | Prefer named exports; default exports only where Next.js requires them (pages, layouts, config). | ESLint `import/no-default-export` with overrides |
| RUL-TS-09 | Use `import type` for type-only imports. | ESLint `consistent-type-imports` |
| RUL-TS-10 | Comments explain why, not what. | Review |

---

## 6. Naming conventions

| Item | Convention | Example |
|---|---|---|
| React components | PascalCase file and export | `PillarGrid.tsx`, `export function PillarGrid` |
| Hooks | camelCase with `use` prefix | `useMotionTier.ts` |
| Utilities and modules | kebab-case files | `cloudinary-loader.ts`, `motion-tier.ts` |
| Route folders | Lowercase, hyphenated, matching URLs | `app/services/[slug]`, `app/contact/thank-you` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_BODY_BYTES` |
| Types and interfaces | PascalCase, no `I` prefix | `Lead`, `ConsentState` |
| Zod schemas | camelCase with `Schema` suffix | `leadSchema` |
| CSS custom properties | `--<group>-<name>` kebab-case | `--color-peak-violet`, `--space-section` |
| Analytics events | snake_case, GA4 recommended names where available | `generate_lead`, `cta_click` |
| Storage keys | `tps.<feature>[.v<version>]` | `tps.consent.v1`, `tps.loader.seen` |
| Env variables | `SCREAMING_SNAKE_CASE`; `NEXT_PUBLIC_` only for values safe to expose | `RESEND_API_KEY`, `NEXT_PUBLIC_GA4_ID` |
| Test files | `<name>.test.ts` (unit), `<flow>.spec.ts` (Playwright) | `lead-schema.test.ts`, `enquiry-form.spec.ts` |
| Service slugs | Fixed list in [PRD.md 5.2](PRD.md#52-service-catalogue-facts-from-company_infomd) | `ai-automation` |

---

## 7. File and component conventions

| ID | Rule | Verify by |
|---|---|---|
| RUL-FC-01 | Folder structure follows [Architecture.md 3](Architecture.md#3-repository-and-folder-structure). New top-level folders need approval. | Review |
| RUL-FC-02 | Components are Server Components by default. `'use client'` only on the smallest interactive leaf (menus, forms, motion wrappers, consent, 3D). | Review; bundle size |
| RUL-FC-03 | No server-only APIs (cookies, headers, request data) anywhere in `src/app` (static export). | `next build` with `output: 'export'` |
| RUL-FC-04 | shadcn components are added with the CLI into `src/components/ui/`, then restyled with tokens; their behaviour (Radix accessibility) is not removed. | Review |
| RUL-FC-05 | Each section component accepts typed content props from `src/content/*`; no fetching inside components. | Review |
| RUL-FC-06 | Heavy client code (three, R3F, drei, SplitText) is imported only through `next/dynamic` or dynamic `import()` behind tier checks. | Bundle analysis |
| RUL-FC-07 | The Worker (`worker/`) imports nothing from React or Next.js; it may import `src/lib/schemas/*` only. | Build of Worker bundle |
| RUL-FC-08 | Inline SVG logo components use namespaced gradient IDs (`useId()`) and have `<metadata>` removed; original files stay in `public/brand/`. | Review; duplicate ID check in axe |

---

## 8. Styling rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-ST-01 | Colours, fonts, radii, shadows, spacing and motion values come only from tokens in [Design.md 7](Design.md#7-token-implementation). No raw hex values in components. | ESLint or stylelint rule; `grep "#[0-9A-Fa-f]{3,6}"` in `src/components` returns nothing |
| RUL-ST-02 | Only brand palette colours plus the documented functional status colours ([Design.md 4.5](Design.md#45-functional-status-colours)) may be used. | Review |
| RUL-ST-03 | Light theme only: no `.dark` theme and no `prefers-color-scheme: dark` styles. Obsidian sections use the `surface-inverse` scope class. | `grep` |
| RUL-ST-04 | Glow Violet is used only as an effect at 20% opacity (stronger 35% glow only in hero 3D and loader). | Review |
| RUL-ST-05 | Text is left-aligned; `text-justify` and `text-align: justify` are forbidden. | `grep` |
| RUL-ST-06 | Mobile-first: base styles target the smallest viewport; enhancements use `sm:`, `md:`, `lg:`, `xl:`, `2xl:`. | Review |
| RUL-ST-07 | No horizontal scroll at 320 px width. | Playwright check `scrollWidth <= clientWidth` |
| RUL-ST-08 | Use `min-h-dvh` instead of `100vh` for full-height sections. | `grep` |
| RUL-ST-09 | No `backdrop-filter` blur larger than 8 px, and only on the sticky header and modal overlays. | Review |
| RUL-ST-10 | z-index values come from the scale in [Design.md 6.6](Design.md#66-z-index-scale). | Review |

---

## 9. Accessibility rules

Target: **WCAG 2.2 Level AA** (includes every WCAG 2.1 AA criterion).

| ID | Rule | Verify by |
|---|---|---|
| RUL-A11Y-01 | Normal text contrast >= 4.5:1; large text (>= 24 px regular or >= 18.66 px bold) and meaningful UI or graphics >= 3:1. Use the approved pairs in [Design.md 4.6](Design.md#46-contrast-rules-and-approved-pairs). | axe; contrast table |
| RUL-A11Y-02 | Lilac Spark `#A743F8` is never used for normal-size text on white or Ink; on white only at >= 19 px bold or >= 24 px regular; on Obsidian (`#000000`) allowed for text (4.8:1). | Review |
| RUL-A11Y-03 | Slate Lavender `#8D8CA4` and Mist `#D7D6E1` are never used for body text on light surfaces. | Review |
| RUL-A11Y-04 | Every interactive element is reachable and operable by keyboard in visual order; no keyboard traps except intentional focus traps in open dialogs and drawers, which close on Escape. | Playwright keyboard tests |
| RUL-A11Y-05 | Visible focus indicator on every focusable element: 2 px solid outline, 2 px offset, `#8E21FC` on light surfaces, `#A743F8` on Obsidian and Ink surfaces. | Visual test |
| RUL-A11Y-06 | Focus is never fully hidden by the sticky header, sticky CTA bar or consent banner (`scroll-padding` set). | Playwright |
| RUL-A11Y-07 | Pointer targets >= 24 x 24 px everywhere; >= 44 x 44 px for primary touch targets on mobile, with >= 8 px spacing. | Playwright bounding-box check |
| RUL-A11Y-08 | One `<h1>` per page; headings sequential; landmarks `header`, `nav`, `main`, `footer`; skip link first. | axe |
| RUL-A11Y-09 | Icon-only buttons have accessible names; decorative icons have `aria-hidden="true"`. | axe |
| RUL-A11Y-10 | Form fields have visible labels, required indicators, errors linked by `aria-describedby`, and an error summary on failed submit. | Playwright + axe |
| RUL-A11Y-11 | `prefers-reduced-motion: reduce` disables loader, smooth scroll, parallax, pinning, SplitText and 3D animation; content is fully readable in its final state. | Playwright `reducedMotion` |
| RUL-A11Y-12 | No content flashes more than 3 times per second. | Review |
| RUL-A11Y-13 | The 3D canvas is `aria-hidden="true"`; its meaning is conveyed by adjacent text. | axe |
| RUL-A11Y-14 | After client-side route changes, focus moves to the main heading or `main`, and the page title updates. | Playwright |
| RUL-A11Y-15 | Text resizes to 200% without loss of content or function; layout reflows at 320 CSS px. | Manual check per release |
| RUL-A11Y-16 | Screen reader sanity check (NVDA on Windows, VoiceOver on iOS) before each milestone sign-off. | Checklist |

---

## 10. Animation and 3D rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-MOT-01 | Motion tier (0, 1, 2) decides behaviour as defined in [Architecture.md 9.2](Architecture.md#92-motion-tiers). | Unit tests for tier detection |
| RUL-MOT-02 | Animate only `transform`, `opacity`, `clip-path` and `filter` (filter only on small elements). Never animate `width`, `height`, `top`, `left` or `margin`. | Review |
| RUL-MOT-03 | **The LCP heading is never hidden at load** (no `opacity: 0`, no off-screen transform, no SplitText before first paint). | Lighthouse LCP element check |
| RUL-MOT-04 | Content is visible without JavaScript; reveal-hidden states apply only when `html[data-motion-tier]` is 1 or 2 and JavaScript has run. | Playwright no-JS test |
| RUL-MOT-05 | GSAP code runs inside `useMotionEffect` (a `gsap.context` with a `scope`; the lazy-load equivalent of `useGSAP`), and inside `gsap.matchMedia()` for tier and breakpoint conditions, so it reverts on cleanup. | Review |
| RUL-MOT-06 | One animation loop: Lenis and R3F are driven by `gsap.ticker`; no extra `requestAnimationFrame` loops. | Review |
| RUL-MOT-07 | At most 2 pinned sections per page, Tier 2 only, each <= 150% of viewport height of scroll; pinned content is also a normal ordered list in the DOM. | Review |
| RUL-MOT-08 | SplitText only on short headlines (<= 8 words), Tier 2 only, using its accessibility handling, reverted after the animation. | Review |
| RUL-MOT-09 | Stagger at most 8 children per group; durations and easings come from motion tokens in [Design.md 11.4](Design.md#114-motion-tokens). | Review |
| RUL-MOT-10 | No scroll-jacking: scroll speed and direction stay under user control; no snapping that traps the user. | Manual test |
| RUL-MOT-11 | Animations are interruptible and never block input. | Manual test |
| RUL-MOT-12 | Motion (`motion/react`) is used through `LazyMotion` with `domAnimation` and `m.*` components, with `MotionConfig reducedMotion="user"`. | Review |
| RUL-MOT-13 | The 3D scene: lazy-loaded after first paint; DPR capped (1.75 desktop, 1.25 mobile); particles <= 12,000 desktop and <= 3,000 mobile; paused when off-screen or tab hidden; disposes all GPU resources on unmount; falls back to the poster on any error. | Code review; Playwright; profiling on a mid-range Android device |
| RUL-MOT-14 | No hosted 3D runtimes, CDN-loaded HDRs or paid assets; any third-party 3D asset is CC0 or equivalent with its licence recorded in the spec. | Review |
| RUL-MOT-15 | The logo is animated only by revealing or moving its supplied parts; never distorted, recoloured, rotated or re-drawn (brand misuse rules). | Review against [Design.md 3.5](Design.md#35-misuse-rules-brand) |

---

## 11. Performance rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-PERF-01 | Budgets in [Architecture.md 14](Architecture.md#14-performance-budgets) are hard limits; a PR that exceeds one fails CI. | Lighthouse CI |
| RUL-PERF-02 | Every image declares dimensions or aspect ratio; every `next/image` has `sizes`. | Review; CLS |
| RUL-PERF-03 | Only Sora and Inter `latin` are preloaded; no other font preloads. | Network check |
| RUL-PERF-04 | Third-party scripts load `async`/`defer` and only after consent (Cloudflare Web Analytics excepted). | Playwright network test |
| RUL-PERF-05 | Scroll and resize handlers are passive and throttled, or replaced by IntersectionObserver or ScrollTrigger. | Review |
| RUL-PERF-06 | No layout reads after writes in the same frame. | Review; performance profile |
| RUL-PERF-07 | Test on a mid-range Android device (or Lighthouse mobile throttling) before each milestone sign-off. | Checklist |

---

## 12. Security and privacy rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-SEC-01 | No secrets in the repository, client bundle or logs. Secrets live in Wrangler secrets and GitHub Actions secrets only. | Secret scanning; `grep` of `out/` |
| RUL-SEC-02 | `.gitignore` covers `.env*.local`, `.dev.vars`, `node_modules`, `.next`, `out`, `.wrangler`, `test-results`, `playwright-report`, `__pycache__`. | Review |
| RUL-SEC-03 | All Worker input is validated server-side with the shared Zod schema, regardless of client validation. | Worker tests |
| RUL-SEC-04 | Turnstile tokens are verified server-side on every submission. | Worker tests |
| RUL-SEC-05 | Security headers and CSP in `public/_headers` match [Architecture.md 13.1](Architecture.md#131-static-response-headers-public_headers); any new external host is added deliberately. | Header test in Playwright |
| RUL-SEC-06 | `dangerouslySetInnerHTML` only for escaped static JSON-LD and the static motion/loader bootstrap script in `layout.tsx` (no user or request data). | `grep` |
| RUL-SEC-07 | Personal data is minimised: raw IPs never stored; no personal data in analytics, logs or URLs. | Review; analytics allow-list |
| RUL-SEC-08 | GA4 and Clarity never load before the matching consent; withdrawing consent stops them. | Playwright network test |
| RUL-SEC-09 | Form data is stored only in `sessionStorage` while the user is on the site and cleared after submit. | Review |
| RUL-SEC-10 | `npm audit --omit=dev` shows no high or critical vulnerabilities at release. | CI |

---

## 13. SEO rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-SEO-01 | Every page exports metadata built from `src/content/*`: unique title (<= 60 characters, ends with "\| 10PeakStudio"), meta description (110 to 160 characters), canonical, Open Graph, Twitter Card. | Unit test over route table |
| RUL-SEO-02 | JSON-LD types per page follow [PRD.md 11.2](PRD.md#112-structured-data-json-ld); no LocalBusiness, Review, AggregateRating or Person schema at R1. | Schema validator in CI (Optional) or manual check per release |
| RUL-SEO-03 | Every indexed route appears in `sitemap.xml`; no `noindex` route appears in it. | Unit test |
| RUL-SEO-04 | Descriptive internal link text; never "click here". | Review |
| RUL-SEO-05 | No broken internal links. | `scripts/check-links.mjs` |
| RUL-SEO-06 | Service slugs never change without a 301 in `_redirects`. | Review |

---

## 14. Dependency rules

| ID | Rule | Verify by |
|---|---|---|
| RUL-DEP-01 | A new dependency needs: a clear need, a free licence compatible with commercial use (MIT, ISC, Apache-2.0, BSD, MPL-2.0 or GSAP no-charge), active maintenance, a Cloudflare free-plan compatibility check, and a bundle-size check. Record it in [Architecture.md 2](Architecture.md#2-technology-stack). | Review |
| RUL-DEP-02 | Prefer the platform or existing dependencies over new ones. | Review |
| RUL-DEP-03 | No dependency that requires a paid plan, a hosted runtime or a server at request time (except the single Worker). | Review |
| RUL-DEP-04 | Pin exact versions in `package.json`; update weekly via Renovate or Dependabot; re-run all quality gates on update. | Lockfile |
| RUL-DEP-05 | `framer-motion` is not installed; use `motion` and import from `motion/react`. | `package.json` |

---

## 15. Git and commit conventions

| ID | Rule |
|---|---|
| RUL-GIT-01 | Default branch `main`. Work branches: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`, `docs/<scope>`. |
| RUL-GIT-02 | Conventional Commits: `type(scope): summary` in the imperative mood, <= 72 characters; types `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. |
| RUL-GIT-03 | Commit bodies explain why; reference requirement IDs (for example `Refs: PRD-FRM-02`). |
| RUL-GIT-04 | Commits made by the AI agent end with the attribution trailer required by the Claude Code session. |
| RUL-GIT-05 | The agent commits or pushes only when the user asks. Never force-push `main`; never skip hooks (`--no-verify`). |
| RUL-GIT-06 | Husky pre-commit runs lint-staged (ESLint and Prettier on staged files); pre-push runs typecheck and unit tests. |
| RUL-GIT-07 | Pull requests into `main` require all CI checks green and one review. |

---

## 16. Definition of Done

A task is done only when every applicable item is checked:

- [ ] Requirement IDs addressed are listed in the PR and their acceptance criteria pass.
- [ ] ui-ux-pro-max skill consulted first (UI tasks); MASTER.md and page overrides followed; brand rules respected.
- [ ] `tsc --noEmit` passes; ESLint has zero warnings; Prettier clean.
- [ ] Unit, Worker and Playwright tests pass; new logic has tests.
- [ ] `next build` with `output: 'export'` succeeds; Worker builds.
- [ ] Lighthouse mobile meets budgets on affected routes.
- [ ] axe: zero serious or critical violations on affected routes.
- [ ] Keyboard-only walkthrough of affected UI passes; focus visible and never fully obscured.
- [ ] Reduced-motion and no-JavaScript checks pass.
- [ ] Verified at 360, 768, 1024, 1280 and 1440 px widths; no horizontal scroll at 320 px.
- [ ] No raw hex colours, no new fonts, no off-palette colours.
- [ ] No `[PLACEHOLDER` in production output, or the remaining placeholders are listed in the PR as blockers.
- [ ] No secrets, no personal data in logs or analytics.
- [ ] Spec files updated if behaviour or decisions changed.

---

## 17. Phase quality gates

A milestone ([PRD.md 15](PRD.md#15-releases-and-milestones)) is complete only when these pass:

| Gate | Command or check |
|---|---|
| Type-check | `npm run typecheck` |
| Lint and format | `npm run lint` and `npm run format:check` |
| Unit and Worker tests | `npm run test` |
| Build | `npm run build` (static export plus Worker) |
| End-to-end, consent, accessibility, reduced-motion, no-JS | `npm run test:e2e` |
| Lighthouse mobile | `npm run lhci` |
| Keyboard and screen-reader sanity check | Manual checklist (NVDA, VoiceOver) |
| Reduced-motion check | Manual plus Playwright |
| Placeholder and link checks | `npm run check:content` |
