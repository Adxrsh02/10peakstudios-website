# 10PeakStudio Website

10PeakStudio (domain `10peakstudios.com`) is a premium digital innovation and technology studio based primarily in India ("Transform business ideas into powerful digital experiences."). This repository will hold its multi-page, white-theme marketing website: Next.js static export on Cloudflare Workers Static Assets (free plan), one Worker for the enquiry form, Tailwind v4, shadcn/ui, GSAP + Lenis + Motion, a React Three Fiber hero, and consent-gated analytics. The story leads with **Build. Automate. Grow.** (Build and Automate primary, Grow supporting). Current phase: specs written (v1.0.0, awaiting approval); no code scaffolded yet.

## Non-negotiable constraints

- **Cloudflare free plan only.** Every library, service and asset must be free and Cloudflare-compatible. No paid features, hosted 3D runtimes or paid assets.
- **Mobile-first.** Mid-range Android on 4G is the reference device. Budgets: Architecture.md section 14.
- **White theme** with at most 2 Obsidian (`#000000`) sections per page, including the footer. No dark mode.
- **Brand beats reference and skill.** Brand guide (`10PeakStudio_Brand_Guidelines.html`) > Company_info.md and user decisions > ui-ux-pro-max suggestions. Violet palette, Sora/Inter/JetBrains Mono. Never Montserrat, gold or navy. Never modify the logo.
- **Brand name** is always "10PeakStudio"; "10PeakStudios" only as schema `alternateName`.
- **Content integrity.** Never invent clients, testimonials, case studies, statistics, certifications, awards, prices, team members or founding year. Use `[PLACEHOLDER: ...]`. Portfolio, testimonials and team stay hidden until genuine.
- **No phone number or address** on the site unless verified and approved. No LocalBusiness schema without a genuine location.
- **Privacy.** GA4 and Clarity load only after consent (Accept, Reject, Customise).
- **Accessibility.** WCAG 2.2 AA; full reduced-motion support.

## UI/UX rule

For every UI/UX task, ALWAYS use the ui-ux-pro-max skill first. Read design-system/10peakstudio/MASTER.md, then check design-system/10peakstudio/pages/<page>.md for overrides.

Precedence: brand guide > Project_spec/Design.md > page override > MASTER.md > skill suggestions.

## Working agreement

- Spec-first: no production implementation before the relevant spec is approved.
- Start each session by reading this file and the imported specs; end it by summarising changes and pending items.
- Small, reviewable steps. Propose before big decisions (new dependency, route, service or architecture change).
- When something is ambiguous, ask, and include a recommended default (Rules.md section 3).
- Verify volatile facts (limits, versions, licences) with current official docs; record the source and date in Architecture.md section 18.
- Never commit, push, deploy or create remote resources unless asked.
- Quality gates before a milestone is done: type-check, lint, build, Lighthouse mobile, keyboard and screen-reader sanity check, reduced-motion check (Rules.md section 17).
- Deferred files: `Project_spec/task.md` and `Project_spec/memory.md` (create when requested).

## Open questions that affect implementation

See PRD.md section 17. Highest impact: OQ-1 ("blue accents" vs violet brand palette), OQ-2 (public email domain), OQ-3 (WhatsApp number).

## Specifications (auto-loaded)

@Project_spec/PRD.md
@Project_spec/Architecture.md
@Project_spec/Rules.md
@Project_spec/Design.md

Reference only (not auto-loaded): `Project_spec/Company_info.md` (original brief; its Phase 0 session instructions are superseded), `design-system/10peakstudio/MASTER.md` (read for UI tasks per the rule above).
