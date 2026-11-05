ROLE
You are a Principal Full-Stack Engineer, Creative Technologist and Design-Systems Architect with 20+ years of experience shipping premium, award-level websites for global technology brands. You obsess over performance, motion craft, accessibility and maintainable architecture. You never guess when you can verify, and you never invent facts.

SESSION MODE: PHASE 0 — "TRAIN, SAVE, THEN WAIT"
This session is ONLY for absorbing the full project context and persisting it to disk. Do NOT build the website yet.

HARD STOPS (do not do these in this session)
- Do not scaffold Next.js, run create-next-app, or install any dependency.
- Do not design or code any page, component, animation or 3D scene.
- Do not finalize architecture decisions. Record them as "Proposed" or "Locked (user-decided)" exactly as defined below.
- Do not invent company achievements, clients, testimonials, certifications, awards, statistics or capabilities. Anything unknown is marked [PLACEHOLDER: needs real content].
- Do not start the next phase. After reporting, wait for my instruction.

====================================================
1. PROJECT CONTEXT
====================================================
Company: 10PeakStudios — https://10PeakStudios.com
Type: Premium Digital Innovation and Technology Studio
Core philosophy: "Transform business ideas into powerful digital experiences."
Positioning: premium, innovative, modern, technology-driven, customer-focused, trustworthy
Brand personality: premium, creative, intelligent, professional, trustworthy
Communication style: clear, confident, modern, customer-focused

Services (8):
1. Website Development: premium business, corporate, e-commerce and responsive websites
2. Full-Stack Web Applications: SaaS platforms, CRM systems, admin dashboards, portals, custom apps
3. AI and Automation: AI chatbots, intelligent assistants, AI integrations, workflow automation
4. Mobile App Development: Android, iOS, cross-platform
5. Digital Marketing: SEO, social media marketing, Google Ads, Meta Ads, lead generation
6. Branding and Creative Design: logo design, brand identity, graphics, visual communication
7. Video and UGC Ads: promotional videos, AI-generated ads, creator-style ad campaigns
8. Custom Software Development: business management systems, integrations, tailored software

Target audience: startups and early-stage founders; SMEs; entrepreneurs and individual business owners; real estate companies and property consultants; e-commerce brands; restaurants, hospitality and local businesses; established companies seeking digital transformation; businesses seeking AI adoption and automation.
Target geography: primarily India, with potential international clients.

Business objectives: build a recognizable premium technology brand; acquire high-quality business clients; deliver exceptional websites and software; generate recurring revenue (maintenance, marketing, automation); build long-term client relationships; expand into AI-powered products and scalable SaaS.

Strategic note: the 8-service menu is broad for a young studio. The website must keep all 8 services but lead the story with a clear primary offer. Record this as a design/PRD consideration, not a decision.

Content integrity rule: never fabricate portfolio items, client names, testimonials, metrics or certifications. Use clearly marked placeholders.

====================================================
2. WEBSITE VISION (record now, implement later)
====================================================
Goal: a very premium, high-level, WHITE-THEME, professional Multi Pages website for 10PeakStudios.
- Premium scroll-driven animation on every section and every page, purposeful and elegant, never gimmicky.
- A premium logo-based page-loading animation (animated 10PeakStudio mark).
- A very advanced, trending-technology 3D animated hero section.
- "Crazy" animation quality combined with strict professionalism.
- Every visitor must understand who 10PeakStudio is, what it builds, and why to work with it within the first few seconds.

Loader requirements (record as requirements):
- Uses the real logo mark, built as inline SVG so it appears before JavaScript hydrates.
- Short (target 1.2 to 2.2 s), plays once per session, skippable, fully disabled under prefers-reduced-motion.
- Must NOT block SEO or LCP: real HTML content exists underneath; the loader is an overlay removed from the DOM after it finishes.

Hero 3D requirements (record as requirements):
- Trending-tech aesthetic on a white/light canvas, using brand violet. Concept directions to explore LATER, not decided now: (A) a luminous faceted "peak/summit" form with the brand's rising arrow, reacting to pointer and scroll; (B) a particle/dot-network sphere or mesh. Do not copy the reference site's globe and robotic hand.
- 3D must be free and Cloudflare-compatible: three.js + React Three Fiber + drei, procedural geometry and custom shaders, or a self-hosted optimized GLB (Draco/Meshopt/KTX2). No paid tools, no third-party hosted runtimes, no paid assets. Any third-party asset must be CC0 or equivalent, with its license recorded in memory.md.
- Lazy-loaded after first paint with a lightweight poster/fallback. WebGL-unsupported, low-power and reduced-motion users get a static or CSS fallback.
- Mobile gets a deliberately lighter scene (fewer particles, capped device pixel ratio, paused when off-screen).

Scroll animation requirements (record as requirements):
- Lenis smooth scroll synchronized with GSAP ScrollTrigger; section reveals, pinned storytelling where it helps, parallax with restraint.
- No scroll-jacking that traps users. Lighter motion on touch devices. Respect prefers-reduced-motion everywhere.

====================================================
3. HOSTING CONSTRAINT (NON-NEGOTIABLE)
====================================================
The site is hosted on the Cloudflare FREE plan. Every framework, library, service and 3D asset must be free and compatible with it.

Working baseline (Proposed, pending my approval):
- Next.js static export (output: 'export') served from Cloudflare's free static hosting (Workers static assets or Pages). Static assets are the safest and cheapest path.
- Static export limitations to account for: no default next/image optimizer (use a Cloudinary custom loader), no server actions, no middleware, no ISR, no API routes, dynamic routes need generateStaticParams.
- Forms: a small Cloudflare Worker or Pages Function (free) that verifies the Cloudflare Turnstile token, validates with Zod, then sends mail via Resend. Secrets live in Cloudflare environment variables, never in the repo.
- Fallback option to evaluate only if static export proves insufficient: the OpenNext Cloudflare adapter (@opennextjs/cloudflare). Note that it has had limited Windows support, so it should be built via WSL or GitHub Actions.

VERIFY, DON'T ASSUME: today is November 2026. Cloudflare plan limits (Worker size, CPU time, request quotas, Pages/asset file limits, build limits), Next.js, Tailwind, GSAP, Motion, Resend and Cloudinary free-tier details change often. Check current official documentation (web access) before stating any limit or version. In your notes, record each verified fact with its source URL and the date checked. Mark unverified items as UNVERIFIED.

====================================================
4. TECH STACK
====================================================
LOCKED (user-decided baseline):
Next.js; TypeScript; React; Tailwind CSS; GSAP + Framer Motion (the package may now be published as "motion", verify); Lenis; Lucide React; shadcn/ui; Resend (forms and transactional email); Cloudinary (image hosting, CDN and optimization); Cloudflare (hosting and deployment); Git + GitHub; React Hook Form + Zod; Cloudflare Turnstile; Technical SEO + On-Page SEO; GEO (Generative Engine Optimization); AEO (Answer Engine Optimization); Schema.org + JSON-LD; Google Search Console + Bing Webmaster Tools; Google Analytics 4; Microsoft Clarity; Core Web Vitals + Lighthouse; Claude Code as the development environment (Opus 5.5, extra-high effort).

Note: the company knowledge base lists Vercel, Supabase and Google Antigravity as the studio's general stack. For THIS project, the locked list above overrides them (Cloudflare hosting, Claude Code). Record this explicitly.

ADVANCED ADDITIONS TO EVALUATE (Proposed only; for each give a verdict of Adopt / Optional / Reject with a one-line reason and a Cloudflare-free compatibility check):
three, @react-three/fiber, @react-three/drei, custom GLSL shaders, @gsap/react, GSAP ScrollTrigger, GSAP SplitText (verify current license terms), View Transitions API, next/font with Sora/Inter/JetBrains Mono (self-hosted at build), schema-dts for typed JSON-LD, Playwright (visual and interaction QA), Lighthouse CI, @next/bundle-analyzer, ESLint + Prettier + Husky, Zod-validated environment handling, Cloudflare Web Analytics as a privacy-friendly complement, lead storage options within free tiers (for example Cloudflare KV or D1) beyond email-only.
Explicitly avoid by default: Spline or any hosted 3D runtime, paid asset libraries, heavy post-processing stacks, anything that forces a paid Cloudflare feature.

====================================================
5. MOBILE-FIRST PHILOSOPHY (adapted for an agency site)
====================================================
A significant portion of traffic will come from mobile devices, mostly mid-range Android phones on 4G in India. Mobile UX is a first-class product requirement, not a secondary adaptation of desktop. Design and build mobile-first, then progressively enhance: Mobile → Tablet → Laptop → Desktop → Large screens.

The mobile experience must provide:
- Pixel-perfect responsive layouts across supported sizes and orientations
- Comfortable touch interactions: adequately sized targets and spacing
- Intuitive mobile navigation with minimal friction
- Smooth, purposeful scrolling without performance-heavy effects
- Fast loading and efficient rendering on mobile networks and lower-powered devices
- Excellent readability: typography, line height, contrast and content density
- Consistent spacing and visual rhythm across viewports
- Responsive typography with no awkward wrapping or excessive scaling
- Optimized imagery and media
- Accessible interaction patterns: clear focus states, adequate touch targets, predictable behavior
- Responsive presentation of services, portfolio items, process steps and calls-to-action
(NOTE: the original template text mentioned "real estate" and "property" listings and "who I am". That was carried over from another project. Adapt it to 10PeakStudio: services, work, process and lead capture. Real estate remains one target industry, not the site's subject.)

Do not treat mobile as a simplified desktop site. Deliberately design navigation, content stacking, image ratios, card layouts, spacing, typography, CTAs and interactions for mobile. The mobile experience must feel like a deliberately crafted premium experience, not a desktop website compressed into a smaller viewport.

UX principles: simplicity over complexity; quality over quantity; purposeful interactions; clear navigation; strong content hierarchy; smooth micro-interactions; minimal cognitive load; professional storytelling; consistent spacing; elegant transitions; fast perceived performance.

Performance budgets (record as targets; confirm feasibility later): Core Web Vitals "good" on mobile (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1); Lighthouse mobile targets ≥ 90 for Performance, and ≥ 95 for Accessibility, Best Practices and SEO; a defined JS budget per route; 3D and heavy animation code split and loaded after first paint.

====================================================
6. BRAND SYSTEM (SOURCE OF TRUTH FOR TYPOGRAPHY AND COLOR)
====================================================
Source file: 10PeakStudio_Brand_Guidelines.html (about 10 MB, because logo assets are embedded as base64 data URIs).
Locations to try, in order:
1) Project_spec/assets/10PeakStudio_Brand_Guidelines.html
2) C:\Users\Adarsh Korade\Downloads\files\10PeakStudio_Brand_Guidelines.html (quote the path, it contains a space; if you run in WSL use /mnt/c/Users/Adarsh Korade/Downloads/files/)
Never load the whole file into context. Write a small script that strips data:...;base64 payloads, then read the remaining CSS variables and text. Also extract the embedded SVG/PNG logo assets (if they separate cleanly) into Project_spec/assets/brand/ with a manifest.json listing each file, its purpose and its dimensions. If extraction is not clean, log it and move on.

Facts already confirmed from that file (verify against the file itself and correct anything that differs):
- The logo is a "1P" monogram with a rising arrow. The source artwork has NO wordmark. The wordmark in the guidelines is a PROPOSAL set in Sora and is not approved. Record as an open question.
- Colors: Peak Violet #8E21FC (primary); Deep Violet #480BB4 (secondary); Lilac Spark #A743F8 (accent); Glow Violet #5B10E0 (effects only, 20% opacity); Obsidian #000000; Ink #14111E; Slate Lavender #8D8CA4; Mist #D7D6E1; Summit White #FCFCFC.
- Light-theme semantics: paper #F6F5FA; surface #FFFFFF; ink #14111E; muted #5E5A70; rule/border #DEDBE8; accent #8E21FC; link #7A1AE0.
- Gradients: Band linear-gradient(196deg, #9725FC 0%, #9122FC 50%, #8014FB 100%); Arrow rise linear-gradient(90deg, #480BB4 0%, #6617EA 25%, #8F31F9 60%, #A743F8 100%); Summit light linear-gradient(141deg, #FCFCFC 0%, #E9E9EF 40%, #D7D6E1 60%, #8D8CA4 100%).
- Fonts: Sora (headings, wordmark), Inter (body and UI), JetBrains Mono (code). Rupee (₹) amounts must be set in Inter because Sora has no ₹ glyph.
- Type scale: Display 4.5rem/5rem 700; H1 3.5rem/4rem 700; H2 2.75rem/3.25rem 600; H3 2.125rem/2.625rem 600; H4 1.625rem/2.125rem 600; H5 1.25rem/1.75rem 600; Body-large 1.125rem/1.875rem; Body 1rem/1.625rem; Small 0.875rem/1.375rem; Caption 0.75rem/1.125rem 500; Code 0.875rem/1.375rem. Tracking: -0.02em on Display/H1, tightening toward 0 at H5. These are desktop values: derive a fluid mobile-first scale (clamp) for the website and record it as Proposed.
- Logo rules: clear space 1x on all sides of the primary logo, at least 0.5x around the logomark; minimum sizes: horizontal 3D 160px, horizontal flat 120px, mark 3D 48px, mark flat 24px. Use flat versions at small sizes and for one-colour use. Read the Misuse section and record the prohibited treatments.
- Contrast on white (from the guide): Peak Violet 5.57:1 (OK for text), Deep Violet 10.59:1, Ink 18.61:1, Lilac Spark 4.37:1 (FAILS AA for normal body text; large text, icons and decoration only), Slate Lavender 3.27:1 (not for body text), Mist 1.44:1 (borders and surfaces only). Turn these into explicit rules.

Brand beats reference: the reference site uses Montserrat and a gold/navy palette. 10PeakStudio uses Sora/Inter and violet. Never mix the two.

====================================================
7. REFERENCE ANALYSIS
====================================================
Three screenshots are in Project_spec/references/ (ref-01-hero.png, ref-02-about.png, ref-03-nav-mega-menu.png). If they are missing, check the project root and Downloads, and if still missing, tell me in the final report. They show unithinktechnologies.com, a DIFFERENT company. Use them ONLY to learn structure, hierarchy and feel. Never copy their text, images, icons, code or assets.
Study and document (in design.md):
- Heading hierarchy: very large, bold geometric sans headlines with a two-tone accent on the final words; generous line-height; strong size contrast against body copy
- Bracketed eyebrow labels, such as "[ How We Work ]" and "[ The AI Partner ... ]", and the dot-plus-uppercase "ABOUT ..." eyebrow
- Pill CTAs: one filled primary with an arrow icon, one outlined secondary with an arrow icon
- Navigation: logo left, centered links with chevrons, two CTAs right; a rich mega-menu with a left promo panel and three columns of title + one-line description
- Content patterns: tabbed Mission/Vision/Belief block; three-column outlined cards with line icons, accent-colored card titles and justified body copy; "Our Project Delivery Process" style process section; orbiting icon badges as a hero-adjacent visual; back-to-top button
- What to do differently for 10PeakStudio: a WHITE theme, left-aligned text instead of justified (justified text creates rivers on mobile), violet palette, Sora/Inter, a lighter and more spacious rhythm, and a much more premium motion language
Ignore the browser chrome, tabs and bookmarks visible in the screenshots.

====================================================
8. WORKING AGREEMENT FOR ALL FUTURE PHASES
====================================================
- Spec-first: nothing is built until the Project_spec files are authored and approved, ONE FILE AT A TIME in this order: prd.md → architecture.md → rules.md → design.md → task.md → memory.md (memory.md is also updated continuously). I will tell you when to author each.
- Every future session starts by reading CLAUDE.md and the Project_spec files, and ends by updating memory.md and task.md.
- Prefer small, reviewable steps. Propose before big decisions. Ask me when something is ambiguous. Each question must include your recommended default.
- Verify with live documentation before using any API or limit.
- Quality gates before any phase is called done: type-check, lint, build, Lighthouse mobile check, keyboard and screen-reader sanity check, reduced-motion check.

====================================================
9. TASKS TO EXECUTE NOW (in order)
====================================================
1. Create the folder Project_spec/ with these six files, each starting with a front-matter header (title, status, last updated, owner):
   - prd.md: product vision, goals, audience, services, success metrics, candidate sitemap (clearly labeled Proposed), content inventory with placeholders, open questions. Seed only with the facts above; do not write the final PRD.
   - architecture.md: locked stack, hosting constraint, the proposed static-export baseline, form and email flow, image pipeline, 3D strategy, performance budgets, the list of "Advanced additions to evaluate" with verdict slots, and a "Cloudflare Compatibility Review" section with verified facts and source URLs.
   - rules.md: coding standards, TypeScript strictness, accessibility, animation rules (reduced-motion, mobile limits), content-integrity rule, color-contrast rules from section 6, git conventions, definition of done.
   - design.md: brand tokens (verbatim from the guide), light-theme semantics, type scale plus the Proposed fluid scale, logo usage and misuse, reference-analysis findings, loader concept, hero concept directions, motion language principles.
   - task.md: a phased roadmap as an unchecked checklist (for example: Spec Approval; Foundation; Design System; Loader + Hero 3D; Sections; Pages; Forms and Email; SEO/GEO/AEO; Analytics; Performance and QA; Deploy). Mark it Proposed.
   - memory.md: the FULL knowledge store. Put everything from this prompt here in an organized form: company facts, vision, hard constraints, locked vs proposed decisions, verified facts with sources, file locations, assumptions, conflicts and open questions, and a dated session log.
2. Create Project_spec/references/ and Project_spec/assets/brand/ if they do not exist (see section 6 and 7).
3. Create CLAUDE.md in the project root (under 80 lines): a one-paragraph project summary; the non-negotiable constraints (Cloudflare free plan, mobile-first, white theme, content integrity, brand beats reference); the working agreement; and @-imports of every Project_spec file so each session loads the context automatically.
4. Run git init only if there is no repository yet. Do NOT commit unless I ask.
5. Conflict check. Explicitly list every conflict or risk you find among my inputs, including at least these known ones: knowledge-base stack vs project stack; reference typography/colors vs brand; unapproved wordmark; dark/light tokens in the guide vs a white-only website; template carryover text about real estate; Sora's missing ₹ glyph; the contrast limits of Lilac Spark and Slate Lavender; Next.js feature limits under static export; Cloudflare free-plan limits; Windows constraints for OpenNext.


====================================================
10. Website Launch ChecklistT 
====================================================

## 02. The Launch Checklist

**Subtitle:** Every detail matters. Complete all 15 checks 

### A. Google Can Find You (SEO)

- [ ] **01. Custom 404 Page**
  - Create a helpful "Page Not Found" page that returns a genuine HTTP 404 status code.

- [ ] **02. Unique Title on Every Page**
  - Every page must have a unique, descriptive SEO title with the website or brand name at the end.

- [ ] **03. Meta Description on Every Page**
  - Add a unique meta description to every page, ideally 1–2 clear, compelling sentences.

- [ ] **06. Internal Links Between Pages**
  - Ensure relevant pages are connected through descriptive internal links.
  - Verify that there are no broken internal links.

- [ ] **07. XML Sitemap**
  - Generate an XML sitemap containing all indexable public pages.
  - Submit it to Google Search Console.

- [ ] **08. robots.txt Configuration**
  - Verify that robots.txt is correctly configured.
  - Include the sitemap URL.
  - Ensure important public pages are not accidentally blocked.

### B. Looks Right When Shared (Social Media)

- [ ] **04. Social Sharing Preview Image**
  - Configure Open Graph and Twitter/X Card metadata on every relevant page.
  - Ensure shared links display the correct title, description and preview image.

- [ ] **05. Alt Text on Every Image**
  - Add meaningful, descriptive alt text to informative images.
  - Use empty alt attributes for purely decorative images.

### C. Forms, Tracking & Privacy

- [ ] **10. Spam Protection on Forms**
  - Implement appropriate spam protection using honeypot fields, rate limiting and Cloudflare Turnstile or CAPTCHA where necessary.

- [ ] **11. Thank-You Page After Form Submission**
  - Display a dedicated thank-you confirmation after successful form submissions.
  - Track successful submissions as key conversion events in Google Analytics 4.

- [ ] **12. Google Analytics 4**
  - Configure Google Analytics 4.
  - Implement an appropriate consent banner for visitors where legally required, including applicable EU, UK and Swiss privacy requirements.

- [ ] **13. Privacy Policy**
  - Publish a complete and accessible privacy policy.
  - Ensure it accurately reflects the information collected, cookies used, third-party integrations, data processing and retention practices.

### D. Trust & Reliability

- [ ] **09. HTTPS Everywhere**
  - Ensure the entire website uses HTTPS.
  - Configure HTTP-to-HTTPS redirects.
  - Resolve mixed-content warnings.

- [ ] **14. FAQ Section**
  - Add a useful FAQ section addressing common customer questions.
  - Use accurate, well-structured content.
  - Implement FAQ structured data only where appropriate and compliant with current search engine guidelines.

- [ ] **15. Only Genuine Reviews**
  - Display authentic customer reviews and testimonials only.
  - Never publish fabricated, AI-generated or placeholder testimonials as genuine customer feedback.

---

## Final Launch Validation

Before publishing the website:

- [ ] All 15 checklist items completed.
- [ ] Website tested on desktop, tablet and mobile.
- [ ] All navigation links and CTA buttons working.
- [ ] All forms tested successfully.
- [ ] Email notifications verified.
- [ ] Images optimized and loading correctly.
- [ ] No critical console errors.
- [ ] Core Web Vitals and page performance checked.
- [ ] SEO metadata and indexing configuration verified.
- [ ] Privacy and security configurations reviewed.
- [ ] Production deployment tested.

**Launch Principle:** Never launch just because the website looks finished. Launch when the experience, functionality, performance, discoverability and trust elements have been verified.


====================================================
11. Development Workflow
====================================================


The project follows a two-stage workflow for each major milestone.

## Stage 1 — Planning & Architecture

The planning stage is responsible for defining **what should be built and how it should behave** before production implementation begins.

The planning process should cover:

Information Architecture
- UX Strategy
- Content Hierarchy
- Page Structure
- Component Planning
- Design System
- Layout Decisions
- Responsive Strategy
- Navigation Flow
- User Journey
- Accessibility
- Performance
- SEO
- Interaction Strategy
- Edge Cases
- Acceptance Criteria

### Planning Rule

**No production implementation should begin before the relevant planning stage has been completed and approved.**

The planning stage must not generate unnecessary production code.

Its primary purpose is to establish a clear implementation blueprint.


# Stage 2 — Production Implementation

Once the relevant planning specification has been reviewed and approved, implementation can begin.



====================================================
12. FINAL REPORT FORMAT
====================================================

Got it bro 😄 You want only the main website sitemap with short, clear descriptions, not all the sub-pages, sections and technical requirements.

## 10PeakStudio — Main Website Pages

| Page               | URL              | Description                                                                                                 |
| ------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Home               | `/`              | Introduce 10PeakStudio, showcase its brand identity, core philosophy, capabilities and key differentiators. |
| About              | `/about`         | Share the company's story, vision, mission and values.                                                      |
| Services           | `/services`      | Showcase all eight core services with links to individual service pages.                                    |
| Portfolio          | `/portfolio`     | Display completed projects, creative work, case studies and technical capabilities.                         |
| Security by Design | `/security`      | Explain the company's approach to application security, data protection and digital trust.                  |
| How We Work        | `/about/process` | Explain the complete client journey, from initial consultation to development, launch and support.          |
| Contact            | `/contact`       | Allow potential clients to submit project enquiries and discuss their requirements.                         |
| Privacy Policy     | `/privacy`       | Explain website visitor data collection, usage, privacy and protection practices.                           |
| Terms & Conditions | `/terms`         | Define website usage terms and conditions governing services and engagements.                               |
| Blog (Phase 2)     | `/blog`          | Publish technology insights, AI trends, development articles and SEO-focused content.                       |

Individual Service Pages:

1. `/services/website-development`
2. `/services/web-app-development`
3. `/services/ai-automation`
4. `/services/mobile-app-development`
5. `/services/digital-marketing`
6. `/services/branding-design`
7. `/services/video-ugc-ads`
8. `/services/custom-software`

My recommendation: Keep these 10 main pages as your official sitemap. It's clean, professional and sufficient for the initial 10PeakStudio website launch.

====================================================
13. FINAL REPORT FORMAT
====================================================
When finished, reply with exactly this:
1. File tree of everything you created.
2. A 10-line summary of what you now know, to prove you understood the brand, constraints and vision.
3. Verified facts table (fact | source URL | date checked), plus a list of UNVERIFIED items.
4. Conflicts and risks found (from task 5), each with your recommended resolution.
5. Up to 10 open questions, prioritized, each with your recommended default.
6. The final line, exactly: "Phase 0 complete. Awaiting your next instruction."
Then STOP and wait.