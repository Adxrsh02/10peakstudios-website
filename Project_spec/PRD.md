---
title: 10PeakStudio Website - Product Requirements Document
document: PRD.md
version: 1.0.0
date: 2026-11-05
status: Draft - awaiting approval
owner: 10PeakStudio
related: Architecture.md, Rules.md, Design.md, ../design-system/10peakstudio/MASTER.md
---

# 10PeakStudio Website - Product Requirements Document

## Table of contents

1. [Purpose, scope and sources](#1-purpose-scope-and-sources)
2. [Vision and positioning](#2-vision-and-positioning)
3. [Goals and success metrics](#3-goals-and-success-metrics)
4. [Audience and personas](#4-audience-and-personas)
5. [Offer architecture](#5-offer-architecture)
6. [Information architecture](#6-information-architecture)
7. [Global elements](#7-global-elements)
8. [Per-page requirements](#8-per-page-requirements)
9. [Forms and lead flow](#9-forms-and-lead-flow)
10. [Analytics and tracking plan](#10-analytics-and-tracking-plan)
11. [SEO, GEO and AEO requirements](#11-seo-geo-and-aeo-requirements)
12. [Content rules and placeholder register](#12-content-rules-and-placeholder-register)
13. [Accessibility and performance requirements](#13-accessibility-and-performance-requirements)
14. [Launch checklist mapping](#14-launch-checklist-mapping)
15. [Releases and milestones](#15-releases-and-milestones)
16. [Risks](#16-risks)
17. [Open questions](#17-open-questions)
18. [Appendix: decisions log and glossary](#18-appendix-decisions-log-and-glossary)

---

## 1. Purpose, scope and sources

### 1.1 Purpose

This document defines what the 10PeakStudio website must do, for whom, and how success is measured. It is the source of truth for scope, pages, content, CTAs, SEO metadata, analytics and acceptance criteria. Technical design lives in [Architecture.md](Architecture.md), binding rules in [Rules.md](Rules.md) and visual design in [Design.md](Design.md).

### 1.2 Scope

| In scope (Release 1, "R1") | Out of scope for R1 (Release 2, "R2" or later) |
|---|---|
| Multi-page marketing website on Cloudflare free plan | Blog (`/blog`) |
| 8 service pages, About, How We Work, Security, Contact, Thank-you, Privacy, Terms, custom 404 | Portfolio (`/portfolio`): built only when at least 3 genuine projects exist |
| Logo loader, 3D hero, scroll-driven motion | Testimonials: only when genuine client testimonials exist |
| Multi-step enquiry form with Turnstile, Resend email and D1 storage | Industry landing pages (`/industries/<slug>`) |
| Global consent management (Accept, Reject, Customise) | Team and founder profiles: only after verified details and approved photographs |
| Technical SEO, GEO, AEO, JSON-LD, sitemap, robots | Hindi or other languages |

### 1.3 Source-of-truth order

| Priority | Source | Governs |
|---|---|---|
| 1 | `10PeakStudio_Brand_Guidelines.html` (project root) | Logo, colour, typography, visual identity |
| 2 | `Project_spec/Company_info.md` plus user decisions dated 2026-11-05 | Business facts, services, audience, stack, constraints |
| 3 | ui-ux-pro-max skill output (`design-system/10peakstudio/MASTER.md`) | Suggestions only; never overrides 1 or 2 |
| 4 | General best practice | Everything not covered above |

### 1.4 Requirement ID scheme

Requirements use `PRD-<AREA>-<NN>`, for example `PRD-HOME-03`. Areas: `GLB` global, `NAV` navigation, `HOME`, `SVC` services, `ABT` about, `PRC` process, `SEC` security page, `CON` contact, `TY` thank-you, `LEG` legal, `404`, `FRM` forms, `ANL` analytics, `SEO`, `CNT` content, `A11Y`, `PERF`.

---

## 2. Vision and positioning

### 2.1 Vision

A very premium, white-theme, multi-page website that makes every visitor understand within the first few seconds who 10PeakStudio is, what it builds, and why to work with it, while performing well on mid-range Android phones over 4G in India.

### 2.2 Positioning facts (from Company_info.md)

| Attribute | Value |
|---|---|
| Brand name | **10PeakStudio** (official, everywhere). `10PeakStudios` is used only as schema `alternateName`. |
| Domain | `https://10peakstudios.com` |
| Type | Premium Digital Innovation and Technology Studio |
| Core philosophy | "Transform business ideas into powerful digital experiences." |
| Positioning | Premium, innovative, modern, technology-driven, customer-focused, trustworthy |
| Personality | Premium, creative, intelligent, professional, trustworthy |
| Communication style | Clear, confident, modern, customer-focused |
| Geography | Primarily India, with potential international clients |

### 2.3 Brand story spine

The site leads with **Build. Automate. Grow.** (user decision, 2026-11-05). Build and Automate are the primary offers; Grow is the supporting capability. See [section 5](#5-offer-architecture).

---

## 3. Goals and success metrics

### 3.1 Business objectives (from Company_info.md)

1. Build a recognisable premium technology brand.
2. Acquire high-quality business clients.
3. Deliver exceptional websites and software.
4. Generate recurring revenue (maintenance, marketing, automation).
5. Build long-term client relationships.
6. Expand into AI-powered products and scalable SaaS.

### 3.2 Success metrics

Numeric business targets are not invented. They are set from a baseline measured during the first 30 days after launch.

| ID | Metric | Source | Target |
|---|---|---|---|
| PRD-KPI-01 | Qualified enquiries per month (`generate_lead`) | GA4 (consented), D1 count (all) | [PLACEHOLDER: set after 30-day baseline] |
| PRD-KPI-02 | Enquiry form completion rate (`generate_lead` / `form_start`) | GA4 | [PLACEHOLDER: set after 30-day baseline] |
| PRD-KPI-03 | Primary CTA click-through rate on Home (`cta_click` / Home views) | GA4 | [PLACEHOLDER: set after 30-day baseline] |
| PRD-KPI-04 | WhatsApp and email contact clicks per month | GA4 | Tracked from launch |
| PRD-KPI-05 | Core Web Vitals at p75 (mobile): LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 | Cloudflare Web Analytics (RUM), Lighthouse | "Good" on every route |
| PRD-KPI-06 | Lighthouse mobile: Performance >= 90; Accessibility, Best Practices, SEO >= 95 | Lighthouse CI | Every route, every release |
| PRD-KPI-07 | Indexed public pages | Google Search Console, Bing Webmaster Tools | 100% of sitemap URLs within 30 days of launch |
| PRD-KPI-08 | Leads lost to email failure | D1 `status = 'email_failed'` without follow-up | 0 |

---

## 4. Audience and personas

Personas are derived only from the audience segments in Company_info.md. They contain no invented research data.

| Persona | Segments covered | Primary need | What the site must show | Likely objection | Primary CTA |
|---|---|---|---|---|---|
| P1 Founder | Startups, early-stage founders, entrepreneurs | Launch a credible product or website fast | Build pillar, web apps and MVP-style delivery, clear process | "Can a young studio deliver?" | Start a project |
| P2 SME owner | SMEs, individual business owners, restaurants, hospitality, local businesses | More enquiries and a professional online presence | Website development, digital marketing, simple process, WhatsApp contact | "Will it be affordable and easy?" | WhatsApp us |
| P3 Real estate consultant | Real estate companies, property consultants | Lead generation and listings presence | Websites, lead generation, ads, automation of follow-ups | "Do you understand my industry?" | Start a project |
| P4 E-commerce brand | E-commerce brands | Conversion-focused store and growth marketing | E-commerce websites, Meta and Google Ads, UGC video ads | "Will it convert and scale?" | Start a project |
| P5 Transformation lead | Established companies, businesses adopting AI and automation | Modernise operations with custom software and AI | Automate pillar, custom software, integrations, Security page | "Is it secure and maintainable?" | Start a project |

PRD-GLB-01: Every persona can reach a page matching their need within 2 clicks from Home.

---

## 5. Offer architecture

### 5.1 Pillars

| Pillar | Role | Definition (user decision, 2026-11-05) | Services (slug) |
|---|---|---|---|
| **Build** | Primary | Premium websites and full-stack web applications | Website Development (`website-development`), Full-Stack Web Applications (`web-app-development`), Mobile App Development (`mobile-app-development`), Custom Software Development (`custom-software`) |
| **Automate** | Primary | AI-powered solutions, intelligent workflows and business automation | AI and Automation (`ai-automation`) |
| **Grow** | Supporting | SEO, GEO, AEO, digital marketing and ongoing optimisation | Digital Marketing (`digital-marketing`), Branding and Creative Design (`branding-design`), Video and UGC Ads (`video-ugc-ads`) |

The placement of Mobile App Development and Custom Software under Build, and Branding and Video under Grow, is an assumption recorded as [OQ-17](#17-open-questions).

### 5.2 Service catalogue (facts from Company_info.md)

| # | Display name | Slug | Offerings (verbatim scope) |
|---|---|---|---|
| 1 | Website Development | `website-development` | Premium business, corporate, e-commerce and responsive websites |
| 2 | Full-Stack Web Applications | `web-app-development` | SaaS platforms, CRM systems, admin dashboards, portals, custom apps |
| 3 | AI and Automation | `ai-automation` | AI chatbots, intelligent assistants, AI integrations, workflow automation |
| 4 | Mobile App Development | `mobile-app-development` | Android, iOS, cross-platform |
| 5 | Digital Marketing | `digital-marketing` | SEO, GEO, AEO, social media marketing, Google Ads, Meta Ads, lead generation, ongoing optimisation |
| 6 | Branding and Creative Design | `branding-design` | Logo design, brand identity, graphics, visual communication |
| 7 | Video and UGC Ads | `video-ugc-ads` | Promotional videos, AI-generated ads, creator-style ad campaigns |
| 8 | Custom Software Development | `custom-software` | Business management systems, integrations, tailored software |

PRD-SVC-01: All 8 services remain on the site. Hero and navigation emphasis order is Build, Automate, Grow.

---

## 6. Information architecture

### 6.1 Sitemap (R1)

| Page | URL | Indexed | In sitemap.xml | Purpose |
|---|---|---|---|---|
| Home | `/` | Yes | Yes | Introduce 10PeakStudio, Build. Automate. Grow., capabilities and differentiators |
| Services hub | `/services` | Yes | Yes | All 8 services grouped by pillar |
| Website Development | `/services/website-development` | Yes | Yes | Service detail |
| Full-Stack Web Applications | `/services/web-app-development` | Yes | Yes | Service detail |
| AI and Automation | `/services/ai-automation` | Yes | Yes | Service detail |
| Mobile App Development | `/services/mobile-app-development` | Yes | Yes | Service detail |
| Digital Marketing | `/services/digital-marketing` | Yes | Yes | Service detail |
| Branding and Creative Design | `/services/branding-design` | Yes | Yes | Service detail |
| Video and UGC Ads | `/services/video-ugc-ads` | Yes | Yes | Service detail |
| Custom Software Development | `/services/custom-software` | Yes | Yes | Service detail |
| About | `/about` | Yes | Yes | Story, mission, vision, values |
| How We Work | `/about/process` | Yes | Yes | Client journey from consultation to support |
| Security by Design | `/security` | Yes | Yes | Actual security practices and implemented measures only |
| Contact | `/contact` | Yes | Yes | Enquiry form, email, WhatsApp |
| Thank-you | `/contact/thank-you` | No (`noindex, follow`) | No | Post-submission confirmation and conversion event |
| Privacy Policy | `/privacy` (cookies at `/privacy#cookies`) | Yes | Yes | Data collection, cookies, rights, consent |
| Terms and Conditions | `/terms` | Yes | Yes | Website terms |
| Not found | any unmatched URL, served from `404.html` | No | No | Helpful 404 with genuine HTTP 404 status |

Reserved for R2 (not built, not linked, not in sitemap at R1): `/portfolio`, `/blog`, `/blog/<slug>`, `/industries/<slug>`.

### 6.2 URL rules

| ID | Rule |
|---|---|
| PRD-NAV-01 | Lowercase, hyphenated slugs; no trailing slash in canonical URLs. |
| PRD-NAV-02 | Canonical host is `https://10peakstudios.com`; `www` redirects to apex with HTTP 301. |
| PRD-NAV-03 | Every indexed page has a self-referencing canonical URL. |
| PRD-NAV-04 | Service slugs are fixed as listed in [5.2](#52-service-catalogue-facts-from-company_infomd) and must not change after launch without a 301 redirect. |

### 6.3 Primary navigation (desktop >= 1024 px)

Layout follows the reference structure (logo left, centred links with chevrons, two CTAs right), restyled to the brand.

| Position | Item | Behaviour |
|---|---|---|
| Left | Logo (links to `/`) | See [Design.md section 3](Design.md#3-logo-system) for variant and size |
| Centre | Services (chevron) | Opens mega-menu: left promo panel (Build. Automate. Grow. statement plus "View all services" link), then three columns Build, Automate, Grow; each item has a title and a one-line description |
| Centre | Company (chevron) | Dropdown: About, How We Work, Security by Design |
| Centre | Contact | Link to `/contact` |
| Right | WhatsApp us (secondary, outlined, icon) | Opens WhatsApp click-to-chat in a new tab |
| Right | Start a project (primary, filled, arrow icon) | Links to `/contact` |

### 6.4 Mobile navigation (< 1024 px)

| ID | Requirement |
|---|---|
| PRD-NAV-05 | Header shows logo, a "Start a project" primary button (>= 768 px) and a menu button with accessible name "Open menu". |
| PRD-NAV-06 | Menu opens a full-height drawer with accordion groups (Services by pillar, Company), Contact link, and both CTAs pinned at the bottom. |
| PRD-NAV-07 | Drawer traps focus while open, closes on Escape, close button and route change, and returns focus to the menu button. |
| PRD-NAV-08 | A sticky bottom CTA bar (Start a project, WhatsApp) appears on mobile after the user scrolls past the hero and hides while the drawer, consent banner or on-screen keyboard is open. |

### 6.5 Footer

The footer is an Obsidian section (user decision, 2026-11-05) that opens with the final CTA band. Contents: horizontal dark logo; columns Services (8 links), Company (About, How We Work, Security by Design, Contact), Legal (Privacy Policy, Terms and Conditions, "Privacy choices" button), Contact (public email, WhatsApp); social links only for active official profiles; copyright line "(c) <current year> 10PeakStudio" plus legal entity name once confirmed ([OQ-5](#17-open-questions)).

---

## 7. Global elements

| ID | Element | Requirements | Acceptance criteria |
|---|---|---|---|
| PRD-GLB-02 | Skip link | First focusable element; "Skip to main content" | Visible on focus; moves focus to `<main id="main">` |
| PRD-GLB-03 | Header | Sticky; shrinks from 80 px to 64 px tall after 24 px scroll (desktop); translucent white background without heavy blur | No layout shift; `scroll-padding-top` equals header height |
| PRD-GLB-04 | Logo loader | Animated real logo mark, inline SVG, 1.2 to 2.2 s, once per session, skippable, disabled under `prefers-reduced-motion`, removed from DOM after finishing; real content renders underneath | See [Design.md 11.6](Design.md#116-logo-loader-specification) and [Architecture.md 9.5](Architecture.md#95-loader-lifecycle) |
| PRD-GLB-05 | Consent banner | Global; Accept all, Reject all and Customise with equal prominence for Accept and Reject; preferences re-openable from footer "Privacy choices"; no GA4 or Clarity script loads before consent | See [section 10.3](#103-consent-requirements) |
| PRD-GLB-06 | Back-to-top | Appears after 2 viewport heights of scroll; bottom-right; accessible name "Back to top" | Moves focus to top of page |
| PRD-GLB-07 | Final CTA band | Obsidian; headline, short supporting line, Start a project and WhatsApp CTAs | Present on every page except Contact, Thank-you and 404 |
| PRD-GLB-08 | Breadcrumbs | On all pages at depth >= 2 (service pages, How We Work) with BreadcrumbList JSON-LD | Matches URL hierarchy |
| PRD-GLB-09 | Custom 404 | Helpful message, links to Home, Services, Contact | Returns HTTP 404 status (verified with `curl -I`) |

---

## 8. Per-page requirements

All copy marked **Draft** is proposed wording for approval; it contains no invented facts. Items marked `[PLACEHOLDER: ...]` need real content before launch (see [section 12](#12-content-rules-and-placeholder-register)). Section names map to components in [Design.md section 10](Design.md#10-component-specifications).

Metadata rules: titles <= 60 characters ending in "| 10PeakStudio"; meta descriptions 110 to 160 characters; unique per page.

### 8.1 Home (`/`)

**Purpose:** within 5 seconds, communicate who 10PeakStudio is, what it builds, and the next step.

| # | Section | Content (Draft) | CTA | Notes |
|---|---|---|---|---|
| 1 | Hero | Eyebrow: "[ Digital innovation and technology studio ]". H1: "Build. Automate. Grow." Supporting line (merged with the PRD-SEO-11 entity sentence, conflict C1): "10PeakStudio is a premium digital innovation and technology studio that designs and engineers websites, full-stack web applications and AI automation for ambitious businesses in India and beyond." | Start a project (primary), Explore services (secondary) | 3D visual on the right (desktop) or below text (mobile). H1 and supporting line are visible at first paint (never hidden); the measured LCP element on mobile is the hero poster. |
| 2 | Philosophy | Quote: "Transform business ideas into powerful digital experiences." Three short statements: premium craft, engineering-led delivery, customer-focused partnership | none | Statements describe approach, not achievements |
| 3 | Pillars | Three cards: Build and Automate (large, primary), Grow (supporting). Each lists its services with links. | Each card links to its first service and to `/services` | Order: Build, Automate, Grow |
| 4 | Build spotlight | What Build covers: websites (business, corporate, e-commerce), web apps (SaaS, CRM, dashboards, portals). Capability bullets: responsive, accessible, search-ready, built to Core Web Vitals targets | Explore Build services | Capabilities, not claims of results |
| 5 | Automate spotlight (Obsidian) | AI chatbots, intelligent assistants, AI integrations, workflow automation. Illustrative use cases labelled "Example use cases" (for example, answering common customer questions, routing enquiries, syncing data between tools) | Explore AI and Automation | Use cases are generic examples, not client stories |
| 6 | Grow | SEO, GEO, AEO, digital marketing, branding and video ads as the supporting layer | Explore Grow services | Supporting visual weight |
| 7 | How we work (preview) | Six steps: Discover, Plan, Design, Build, Launch, Support and grow (Draft; confirm in [OQ-12](#17-open-questions)) | See how we work (to `/about/process`) | Desktop may pin this section (Tier 2 only) |
| 8 | Who we work with | Startups and founders; SMEs and business owners; real estate; e-commerce; restaurants, hospitality and local businesses; established companies and AI adopters | Start a project | Facts from Company_info.md audience list |
| 9 | Why 10PeakStudio | One partner to build, automate and grow; modern technology stack; transparent process; security by design; mobile-first craft | none | Each point must be true at launch; no metrics |
| 10 | Security teaser | One paragraph and link | Read our security approach | Links to `/security` |
| 11 | FAQ | 5 to 6 questions (see [11.4](#114-aeo-and-faq-requirements)) | none | FAQPage JSON-LD |
| 12 | Final CTA | Obsidian footer band | Start a project, WhatsApp us | PRD-GLB-07 |

| Field | Value |
|---|---|
| Title | Premium Websites, Web Apps & AI Automation \| 10PeakStudio |
| Meta description | 10PeakStudio builds premium websites, full-stack web applications and AI automation that help businesses in India and beyond build, automate and grow. |
| Schema | Organization, WebSite (global); WebPage; FAQPage |

Acceptance criteria:
- PRD-HOME-01: H1 text "Build. Automate. Grow." is present in server HTML and visible at first paint (not `opacity: 0`).
- PRD-HOME-02: Hero CTAs are visible without scrolling at 360 x 640 and 1440 x 900.
- PRD-HOME-03: The 3D scene loads only after first paint; without WebGL, under reduced motion or on low-power devices a static poster shows with no layout shift.
- PRD-HOME-04: Every service is reachable from the Home page in one click.
- PRD-HOME-05: No testimonial, client logo, metric or award appears.

### 8.2 Services hub (`/services`)

| # | Section | Content (Draft) | CTA |
|---|---|---|---|
| 1 | Hero | H1: "Services to build, automate and grow your business." Answer-first summary (40 to 60 words) of the 8 services and 3 pillars | Start a project |
| 2 | Pillar groups | For each pillar: heading, one-line definition, service cards (title, one-line description, link) | Card links |
| 3 | Process strip | Six-step summary | See how we work |
| 4 | FAQ | 4 to 6 questions about engagement, scope and timelines | none |
| 5 | Final CTA | Footer band | Start a project |

| Field | Value |
|---|---|
| Title | Digital Services: Build, Automate, Grow \| 10PeakStudio |
| Meta description | Explore 10PeakStudio's eight services: websites, web apps, AI automation, mobile apps, custom software, digital marketing, branding and video ads. |
| Schema | CollectionPage with ItemList of Service; BreadcrumbList; FAQPage |

Acceptance: PRD-SVC-02: all 8 service cards render, grouped and ordered Build, Automate, Grow, and link to the correct slug.

### 8.3 Service page template (`/services/<slug>`)

One template, eight instances, content from a typed content file (see [Architecture.md 3](Architecture.md#3-repository-and-folder-structure)).

| # | Section | Content | CTA |
|---|---|---|---|
| 1 | Hero | Eyebrow: pillar name. H1: service display name. Answer-first summary (40 to 60 words): what it is, who it is for, what is delivered | Start a project, WhatsApp us |
| 2 | What we build | Offerings from [5.2](#52-service-catalogue-facts-from-company_infomd) as cards with line icons | none |
| 3 | How it works | Process steps tailored to the service (Draft) | See how we work |
| 4 | Technology | Technologies actually used for this service ([PLACEHOLDER: confirm per service]) | none |
| 5 | Who it is for | Matching personas and industries from [section 4](#4-audience-and-personas) | none |
| 6 | Related services | 2 to 3 links (same or adjacent pillar) | Card links |
| 7 | FAQ | 4 to 6 service-specific questions | none |
| 8 | Final CTA | Footer band | Start a project |

| Slug | Title | Meta description |
|---|---|---|
| `website-development` | Website Development Services \| 10PeakStudio | Premium business, corporate and e-commerce websites designed and engineered by 10PeakStudio: responsive, accessible and built for search visibility. |
| `web-app-development` | Full-Stack Web Application Development \| 10PeakStudio | SaaS platforms, CRM systems, admin dashboards, portals and custom web apps, planned, designed and engineered end to end by 10PeakStudio. |
| `ai-automation` | AI Chatbots, Integrations & Automation \| 10PeakStudio | AI chatbots, intelligent assistants, AI integrations and workflow automation from 10PeakStudio, designed to reduce manual work and scale operations. |
| `mobile-app-development` | Mobile App Development: Android & iOS \| 10PeakStudio | Android, iOS and cross-platform mobile apps from 10PeakStudio, from product planning and UX design to development, launch and ongoing support. |
| `digital-marketing` | Digital Marketing, SEO, GEO & AEO \| 10PeakStudio | SEO, GEO, AEO, social media marketing, Google Ads, Meta Ads and lead generation from 10PeakStudio, with ongoing optimisation to grow your business. |
| `branding-design` | Branding & Creative Design Services \| 10PeakStudio | Logo design, brand identity, graphics and visual communication from 10PeakStudio that give your business a clear, premium and consistent presence. |
| `video-ugc-ads` | Video & UGC Ad Production \| 10PeakStudio | Promotional videos, AI-generated ads and creator-style UGC ad campaigns from 10PeakStudio, made for social platforms and performance marketing. |
| `custom-software` | Custom Software Development \| 10PeakStudio | Business management systems, integrations and tailored software from 10PeakStudio, built around how your business actually works. |

Schema per service page: Service (`serviceType`, `provider` = Organization, `areaServed` = India), BreadcrumbList, FAQPage. No `offers` or prices.

Acceptance:
- PRD-SVC-03: Each service page renders from the content file; adding a service requires no new route code.
- PRD-SVC-04: Each page has a unique H1, title, meta description and at least 4 FAQ items.
- PRD-SVC-05: Only routes listed in [6.1](#61-sitemap-r1) are generated (`dynamicParams = false`).

### 8.4 About (`/about`)

| # | Section | Content |
|---|---|---|
| 1 | Hero | H1 (Draft): "We turn business ideas into powerful digital experiences." |
| 2 | Story | [PLACEHOLDER: company story, approved by owner] |
| 3 | Mission / Vision / Belief (tabbed) | Draft from Company_info.md philosophy and objectives; requires approval ([OQ-14](#17-open-questions)) |
| 4 | Values | Premium, creative, intelligent, professional, trustworthy (from brand personality), each with one line |
| 5 | What we do | Pillar summary with links |
| 6 | Team | Hidden at R1. Shown only after verified details and approved photographs. |
| 7 | Final CTA | Footer band |

Title: "About Us: Our Story, Mission & Values \| 10PeakStudio". Meta: "Learn who 10PeakStudio is: a digital innovation and technology studio that transforms business ideas into powerful digital experiences." Schema: AboutPage, BreadcrumbList.

Acceptance: PRD-ABT-01: no founder name, photo, founding year or team size appears until confirmed.

### 8.5 How We Work (`/about/process`)

| # | Section | Content (Draft, confirm [OQ-12](#17-open-questions)) |
|---|---|---|
| 1 | Hero | H1: "How we work" plus answer-first summary |
| 2 | Steps | 1 Discover (goals, users, requirements). 2 Plan (scope, sitemap, architecture, timeline). 3 Design (UX, UI, prototypes). 4 Build (development, integrations, QA). 5 Launch (deployment, SEO setup, analytics). 6 Support and grow (maintenance, optimisation, marketing). Each step lists deliverables and what the client provides |
| 3 | Collaboration | Communication channels and cadence [PLACEHOLDER: confirm] |
| 4 | FAQ | Timelines, revisions, ownership of code and content [PLACEHOLDER: confirm answers] |
| 5 | Final CTA | Footer band |

Title: "How We Work: Our Project Process \| 10PeakStudio". Meta: "See how 10PeakStudio takes a project from first conversation to discovery, design, development, launch and ongoing support." Schema: WebPage, BreadcrumbList, FAQPage.

Acceptance: PRD-PRC-01: steps are an ordered list (`<ol>`) in the DOM regardless of visual layout; pinned horizontal layout only at Tier 2.

### 8.6 Security by Design (`/security`)

**Rule (user decision):** describe only actual security practices and implemented measures. Never use fabricated credentials, certifications or guarantees.

| # | Section | Content |
|---|---|---|
| 1 | Hero | H1 (Draft): "Security by design" plus summary |
| 2 | How this website protects you | Statements that are true once implemented: HTTPS everywhere with HSTS; security headers and Content Security Policy; Cloudflare Turnstile spam protection; server-side validation of every form submission; secrets kept out of source code; analytics only after consent |
| 3 | How we build client projects | [PLACEHOLDER: list of practices the studio actually applies, each confirmed by the owner ([OQ-12](#17-open-questions))] |
| 4 | Data protection | Link to Privacy Policy; data minimisation in forms |
| 5 | Responsible disclosure | Contact email for reporting a vulnerability [PLACEHOLDER: confirm address] |
| 6 | Final CTA | Footer band |

Title: "Security by Design \| 10PeakStudio". Meta: "How 10PeakStudio approaches application security, data protection and digital trust in the websites and software we build." Schema: WebPage, BreadcrumbList.

Acceptance: PRD-SEC-01: every statement in section 2 maps to an implemented control in [Architecture.md 13](Architecture.md#13-security); section 3 publishes only owner-confirmed items; no certification names, badges or guarantees appear.

### 8.7 Contact (`/contact`)

| # | Section | Content |
|---|---|---|
| 1 | Hero | H1 (Draft): "Let's build something great together." Supporting line about the three ways to reach the studio |
| 2 | Enquiry form | Multi-step form ([section 9](#9-forms-and-lead-flow)) |
| 3 | Direct channels | Public email (mailto) and WhatsApp click-to-chat. No phone number or address is displayed. |
| 4 | What happens next | 3 steps: we review, we reply [PLACEHOLDER: response-time commitment, [OQ-11](#17-open-questions)], we schedule a call |
| 5 | FAQ | 3 to 4 questions on enquiries |

Title: "Contact Us: Start a Project \| 10PeakStudio". Meta: "Tell us about your project. Send an enquiry, email or message 10PeakStudio on WhatsApp to discuss websites, web apps and AI automation." Schema: ContactPage; Organization `contactPoint` (email, `contactType: "sales"`); BreadcrumbList. No LocalBusiness.

Contact data:

| Channel | Value | Status |
|---|---|---|
| Public email | `connect@10peakstudios.com` | PENDING CONFIRMATION ([OQ-2](#17-open-questions)): supplied as `Connect@10peakstudio.com`, whose domain differs from the official domain |
| WhatsApp | `https://wa.me/<NUMBER>?text=<prefilled message>` | [PLACEHOLDER: WhatsApp Business number] ([OQ-3](#17-open-questions)) |
| Phone | Not displayed | User decision |
| Address | Not displayed | User decision |
| Other supplied addresses (rutik@, aditya@, admin@, partner@) | Not published on the site | Personal-name addresses fall under the team-details rule; role addresses pending [OQ-4](#17-open-questions) |

Acceptance: PRD-CON-01: no phone number or postal address appears in HTML, JSON-LD or meta tags. PRD-CON-02: email and WhatsApp links fire `email_click` and `whatsapp_click`.

### 8.8 Thank-you (`/contact/thank-you`)

Content: confirmation heading, what happens next, links to Services and How We Work. `robots: noindex, follow`. Fires `generate_lead` once per submission (guarded by a one-time `sessionStorage` token set on successful submit; direct visits without the token do not fire). Title: "Thank You \| 10PeakStudio". Meta: "Thanks for contacting 10PeakStudio. Here is what happens next with your project enquiry and how soon you can expect a reply."

Acceptance: PRD-TY-01: reloading the page does not fire a second `generate_lead`.

### 8.9 Privacy Policy (`/privacy`) and Terms (`/terms`)

| ID | Requirement |
|---|---|
| PRD-LEG-01 | Privacy Policy lists every processor and tool actually in use: Cloudflare (hosting, Turnstile, Web Analytics, D1), Resend, Cloudinary, Google Analytics 4, Microsoft Clarity. |
| PRD-LEG-02 | Covers data collected via the form, purposes, legal basis or consent, retention period ([OQ-6](#17-open-questions)), user rights under India's DPDP Act and Rules and, for EU, UK and Swiss visitors, GDPR-equivalent rights, and a grievance contact ([OQ-5](#17-open-questions)). |
| PRD-LEG-03 | `#cookies` section with a table: name, provider, purpose, category, duration, matching the consent categories in [10.3](#103-consent-requirements). |
| PRD-LEG-04 | Terms cover website use, intellectual property, disclaimers, governing law and jurisdiction [PLACEHOLDER: legal entity and jurisdiction]. |
| PRD-LEG-05 | Both documents show a "Last updated" date and require owner and legal review before launch. They are not legal advice. |

Titles: "Privacy Policy \| 10PeakStudio" and "Terms and Conditions \| 10PeakStudio". Metas: "How 10PeakStudio collects, uses, stores and protects personal data on this website, including cookies and your privacy choices." and "The terms and conditions that govern your use of the 10PeakStudio website, its content and any enquiries you send through it."

### 8.10 Not found (404)

Content: H1 "Page not found", short explanation, links to Home, Services and Contact. Title "Page Not Found \| 10PeakStudio", `noindex`. Acceptance: PRD-404-01: unmatched URLs return HTTP 404 with this page.

---

## 9. Forms and lead flow

### 9.1 Enquiry form (`project_enquiry`)

Three steps with a visible "Step N of 3" indicator, Back and Next buttons, and validation on blur and on Next.

| Step | Field | Type | Required | Validation (shared Zod schema) |
|---|---|---|---|---|
| 1 What do you need? | `services` | Checkbox group: 8 services plus "Not sure yet" | Yes | At least 1 |
| 2 Project details | `budgetBand` | Select | No | One of the configured bands [PLACEHOLDER: INR bands, [OQ-7](#17-open-questions)] or "Prefer not to say" |
| 2 | `timeline` | Radio: As soon as possible, 1 to 3 months, 3 to 6 months, Flexible | No | Enum |
| 2 | `message` | Textarea | Yes | 20 to 2,000 characters |
| 3 Your details | `name` | Text, `autocomplete="name"` | Yes | 2 to 100 characters |
| 3 | `email` | Email, `autocomplete="email"` | Yes | Valid email, <= 254 characters |
| 3 | `company` | Text, `autocomplete="organization"` | No | <= 120 characters |
| 3 | `phone` | Tel, `autocomplete="tel"` | No | E.164-like, <= 20 characters |
| 3 | `preferredContact` | Radio: Email, WhatsApp | Yes | Enum; WhatsApp requires `phone` |
| 3 | `privacyAck` | Checkbox: "I agree that 10PeakStudio may use these details to respond to my enquiry, as described in the Privacy Policy." | Yes | Must be true |
| Hidden | `website` | Honeypot (visually hidden, `tabindex="-1"`, `autocomplete="off"`) | n/a | Must be empty |
| Hidden | `startedAt` | Timestamp | n/a | Submission >= 3 s after start |
| Hidden | `utm_*`, `landingPath`, `referrer` | Captured on first visit (sessionStorage) | n/a | <= 300 characters each |
| Hidden | Turnstile token | Managed widget, rendered on step 3 | Yes | Verified server-side |

### 9.2 Lead flow

1. Client validates with the shared Zod schema and posts JSON to `/api/contact`.
2. The Worker checks method, content type, size (<= 16 KB), origin, honeypot and timing.
3. The Worker verifies the Turnstile token with Siteverify.
4. The Worker validates with the same Zod schema and applies the rate limit (5 submissions per hashed IP per hour).
5. The lead is stored in D1 (`status = 'received'`).
6. An internal notification email is sent via Resend to the notification address ([OQ-4](#17-open-questions)) with `reply_to` set to the visitor.
7. An auto-reply is sent to the visitor when `AUTO_REPLY_ENABLED = true`.
8. D1 status is updated to `notified` or `email_failed`.
9. The client receives `{ ok: true }` (when the lead is stored, even if email failed) and navigates to `/contact/thank-you`.

Full design: [Architecture.md section 6](Architecture.md#6-form-and-lead-data-flow).

### 9.3 Form UX requirements

| ID | Requirement |
|---|---|
| PRD-FRM-01 | Visible labels on every field; required fields marked; helper text where format matters. |
| PRD-FRM-02 | Errors appear below the field, linked with `aria-describedby`; on failed submit, a focusable error summary at the top links to each invalid field. |
| PRD-FRM-03 | Progress is saved to `sessionStorage` (not `localStorage`) and cleared after successful submit. |
| PRD-FRM-04 | Submit button shows a loading state and is disabled during submission; network failure shows a retry message and keeps the data. |
| PRD-FRM-05 | Inputs are >= 48 px tall with 16 px text (no iOS zoom). |
| PRD-FRM-06 | Clarity masks all form fields; no form values are ever sent to analytics. |
| PRD-FRM-07 | Spam protection: honeypot, timing check, Turnstile, rate limiting (launch checklist item 10). |

---

## 10. Analytics and tracking plan

### 10.1 Tools

| Tool | Role | Loads |
|---|---|---|
| Cloudflare Web Analytics | Cookieless traffic and Core Web Vitals (RUM) baseline | Always, per its privacy configuration; disclosed in Privacy Policy ([OQ-18](#17-open-questions)) |
| Google Analytics 4 | Events, conversions, acquisition | Only after Analytics consent |
| Microsoft Clarity | Heatmaps and session insights, inputs masked | Only after Session insights consent |
| Google Search Console, Bing Webmaster Tools | Indexing and search performance | No site script (DNS or file verification) |

### 10.2 Event dictionary (GA4)

| Event | Trigger | Parameters | Key event |
|---|---|---|---|
| `cta_click` | Any primary or secondary CTA | `cta_id`, `cta_text`, `location` (hero, nav, section id, footer, sticky_bar) | No |
| `service_view` | Service page view | `service_slug`, `pillar` | No |
| `form_start` | First interaction with the enquiry form | `form_id` | No |
| `form_step` | Step advanced | `form_id`, `step` (1 to 3) | No |
| `form_error` | Validation or submission error | `form_id`, `step`, `error_type` (validation, turnstile, rate_limit, network, server) | No |
| `generate_lead` | Thank-you page with valid one-time token | `form_id`, `services` (comma-separated slugs), `budget_band`, `timeline` | **Yes** |
| `whatsapp_click` | WhatsApp link | `location` | No |
| `email_click` | Mailto link | `location` | No |
| `consent_update` | Consent saved | `analytics` (granted/denied), `session_insights` (granted/denied) | No; sent only if analytics granted |

PRD-ANL-01: no personal data (name, email, phone, message) is ever sent to GA4 or Clarity.

### 10.3 Consent requirements

| ID | Requirement |
|---|---|
| PRD-ANL-02 | Categories: Necessary (always on: consent record, Turnstile on the contact form, security), Analytics (GA4), Session insights (Clarity). |
| PRD-ANL-03 | First visit shows the banner with Accept all, Reject all (equal visual weight) and Customise. |
| PRD-ANL-04 | No GA4 or Clarity script, cookie or network request occurs before the matching consent (verified by Playwright network assertions). |
| PRD-ANL-05 | Choices are stored locally with version and timestamp; the banner re-appears when the consent version changes or after 12 months. |
| PRD-ANL-06 | A "Privacy choices" button in the footer re-opens preferences at any time; withdrawing consent stops further tracking and deletes first-party GA4 and Clarity cookies where technically possible. |
| PRD-ANL-07 | Clarity receives `consentv2` with `analytics_Storage` set from the user's choice and `ad_Storage: "denied"`. |
| PRD-ANL-08 | The banner never appears on top of the loader and never fully obscures a focused element. |

---

## 11. SEO, GEO and AEO requirements

### 11.1 Technical SEO

| ID | Requirement |
|---|---|
| PRD-SEO-01 | Unique title and meta description per page as specified in section 8. |
| PRD-SEO-02 | Self-referencing canonical, `og:*` and Twitter Card tags on every indexed page, with a 1200 x 630 static OG image per page or page type. |
| PRD-SEO-03 | `sitemap.xml` lists only indexed pages from [6.1](#61-sitemap-r1), with `lastmod`; submitted to Search Console and Bing Webmaster Tools. |
| PRD-SEO-04 | `robots.txt` allows all public pages, disallows `/api/`, and references the sitemap. |
| PRD-SEO-05 | One H1 per page; sequential heading levels. |
| PRD-SEO-06 | Every informative image has descriptive alt text; decorative images use `alt=""`. |
| PRD-SEO-07 | Internal links use descriptive anchor text; zero broken internal links (CI link check). |
| PRD-SEO-08 | HTTPS everywhere; HTTP to HTTPS and `www` to apex redirects; no mixed content. |
| PRD-SEO-09 | `lang="en-IN"` on `<html>`. |

### 11.2 Structured data (JSON-LD)

| Page | Types |
|---|---|
| All pages (layout) | Organization (`name: "10PeakStudio"`, `alternateName: "10PeakStudios"`, `url`, `logo`, `email`, `sameAs` only active official profiles), WebSite |
| Home | WebPage, FAQPage |
| Services hub | CollectionPage, ItemList, BreadcrumbList, FAQPage |
| Service pages | Service, BreadcrumbList, FAQPage |
| About | AboutPage, BreadcrumbList |
| How We Work | WebPage, BreadcrumbList, FAQPage |
| Security | WebPage, BreadcrumbList |
| Contact | ContactPage, BreadcrumbList |
| Legal pages | WebPage |

PRD-SEO-10: No LocalBusiness, Review, AggregateRating or Person schema at R1. JSON-LD must validate in the Schema.org validator and Google Rich Results Test with zero errors. FAQPage markup is kept because it serves answer engines; Google restricted FAQ rich results in 2023 (re-verify at launch), so no rich result is expected.

### 11.3 GEO (Generative Engine Optimisation)

| ID | Requirement |
|---|---|
| PRD-SEO-11 | Consistent entity description in the first paragraph of Home, About and every service page: "10PeakStudio is a premium digital innovation and technology studio..." |
| PRD-SEO-12 | `/llms.txt` lists the site summary and links to key pages. |
| PRD-SEO-13 | Cloudflare AI Crawl Control and Bot settings are configured deliberately ([OQ-9](#17-open-questions)); search crawlers (Googlebot, Bingbot) must never be blocked. |
| PRD-SEO-14 | Content is server-rendered HTML, readable without JavaScript. |

### 11.4 AEO and FAQ requirements

| ID | Requirement |
|---|---|
| PRD-SEO-15 | Each service page opens with a 40 to 60 word answer-first summary. |
| PRD-SEO-16 | FAQ answers lead with a direct answer in the first sentence, 40 to 80 words, no marketing filler. |
| PRD-SEO-17 | FAQ answers containing prices, timelines or guarantees use `[PLACEHOLDER]` until confirmed ([OQ-15](#17-open-questions)). |

Draft Home FAQ questions: What does 10PeakStudio do? Which businesses do you work with? Do you build both websites and web applications? Can you add AI chatbots or automation to an existing business? How does a project start? Do you work with clients outside India?

---

## 12. Content rules and placeholder register

### 12.1 Content rules

| ID | Rule |
|---|---|
| PRD-CNT-01 | Never invent clients, testimonials, case studies, statistics, certifications, awards, prices, team members or founding year. |
| PRD-CNT-02 | Portfolio hidden until at least 3 genuine projects; testimonials hidden until genuine; team hidden until verified with approved photographs; founding year hidden until confirmed; only active official social profiles. |
| PRD-CNT-03 | Every unknown value is written as `[PLACEHOLDER: description]`; the build fails if `[PLACEHOLDER` appears in production output (see [Rules.md 4](Rules.md#4-content-integrity-rules)). |
| PRD-CNT-04 | Voice: clear, confident, modern, customer-focused (see [Design.md 2](Design.md#2-voice-and-tone)). |
| PRD-CNT-05 | Text is left-aligned; never justified. |
| PRD-CNT-06 | Reference site (unithinktechnologies.com) text, images, icons and code are never copied. |

### 12.2 Placeholder register

| ID | Content needed | Used on | Owner |
|---|---|---|---|
| PH-01 | Public email confirmation | Global, Contact, schema | 10PeakStudio |
| PH-02 | WhatsApp Business number | Global CTAs | 10PeakStudio |
| PH-03 | Company story | About | 10PeakStudio |
| PH-04 | Mission, vision, belief approval | About | 10PeakStudio |
| PH-05 | Process steps and deliverables confirmation | How We Work, Home | 10PeakStudio |
| PH-06 | Technologies per service | Service pages | 10PeakStudio |
| PH-07 | Client-project security practices | Security | 10PeakStudio |
| PH-08 | Vulnerability-report contact | Security | 10PeakStudio |
| PH-09 | Response-time commitment | Contact, Thank-you | 10PeakStudio |
| PH-10 | Budget bands (INR) | Form | 10PeakStudio |
| PH-11 | Legal entity name, jurisdiction, grievance officer | Privacy, Terms, footer | 10PeakStudio and legal reviewer |
| PH-12 | Lead retention period | Privacy, D1 purge job | 10PeakStudio |
| PH-13 | Active official social profile URLs | Footer, Organization `sameAs` | 10PeakStudio |
| PH-14 | FAQ answers involving pricing, timelines or engagement models | FAQs | 10PeakStudio |

---

## 13. Accessibility and performance requirements

| ID | Requirement | Detail |
|---|---|---|
| PRD-A11Y-01 | WCAG 2.2 Level AA (includes all of 2.1 AA) | [Rules.md 9](Rules.md#9-accessibility-rules) |
| PRD-A11Y-02 | Full keyboard operation, visible focus, no keyboard traps, skip link | |
| PRD-A11Y-03 | `prefers-reduced-motion` disables loader, 3D animation, smooth scroll, pinning, parallax and SplitText; content shows in final state | [Design.md 11](Design.md#11-motion-language) |
| PRD-A11Y-04 | Touch targets >= 44 x 44 px on mobile; >= 24 x 24 px minimum anywhere | |
| PRD-PERF-01 | Core Web Vitals "good" on mobile (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1) | Budgets in [Architecture.md 14](Architecture.md#14-performance-budgets) |
| PRD-PERF-02 | Lighthouse mobile: Performance >= 90; Accessibility, Best Practices, SEO >= 95 | CI-enforced |
| PRD-PERF-03 | 3D and heavy animation code split and loaded after first paint | |

---

## 14. Launch checklist mapping

| # | Checklist item (Company_info.md section 10) | Requirement IDs |
|---|---|---|
| 01 | Custom 404 with genuine 404 status | PRD-GLB-09, PRD-404-01 |
| 02 | Unique title on every page, brand at end | PRD-SEO-01 |
| 03 | Meta description on every page | PRD-SEO-01 |
| 04 | Social sharing preview image | PRD-SEO-02 |
| 05 | Alt text on every image | PRD-SEO-06 |
| 06 | Internal links, none broken | PRD-SEO-07 |
| 07 | XML sitemap submitted | PRD-SEO-03 |
| 08 | robots.txt configured | PRD-SEO-04 |
| 09 | HTTPS everywhere | PRD-SEO-08 |
| 10 | Spam protection on forms | PRD-FRM-07 |
| 11 | Thank-you page and GA4 conversion | PRD-TY-01, `generate_lead` |
| 12 | GA4 with consent banner | PRD-ANL-02 to PRD-ANL-08 |
| 13 | Privacy policy | PRD-LEG-01 to PRD-LEG-05 |
| 14 | FAQ section with appropriate structured data | PRD-SEO-10, PRD-SEO-16 |
| 15 | Only genuine reviews | PRD-CNT-01, PRD-CNT-02 |

Final launch validation (all must pass): all 15 items; tested on mobile, tablet, desktop; all navigation and CTAs work; form tested end to end including email delivery; images optimised; no critical console errors; Core Web Vitals checked; SEO metadata and indexing verified; privacy and security configuration reviewed; production deployment tested.

---

## 15. Releases and milestones

| Milestone | Scope | Exit criteria |
|---|---|---|
| M0 Spec approval | PRD, Architecture, Rules, Design approved; MASTER.md reconciled | Owner approval |
| M1 Foundation | Scaffold Next.js static export, tooling, tokens, CI, Cloudflare deploy of a placeholder page | CI green; preview deploy works |
| M2 Design system | Tokens, typography, core components and states | Component review page passes axe and visual review |
| M3 Loader and hero 3D | Loader; hero concepts A and B prototyped; one chosen ([OQ-10](#17-open-questions)) | LCP impact measured; Tier fallbacks verified |
| M4 Sections and pages | All R1 pages with approved copy | Content complete except listed placeholders |
| M5 Forms and email | Worker, Turnstile, D1, Resend | End-to-end submission verified in production |
| M6 SEO, GEO, AEO | Metadata, JSON-LD, sitemap, robots, llms.txt, OG images | Validators pass |
| M7 Analytics and consent | Consent manager, GA4, Clarity, Cloudflare Web Analytics | Network assertions pass |
| M8 Performance and QA | Budgets, Lighthouse, accessibility, reduced motion, cross-device | All quality gates pass |
| M9 Launch | Launch checklist complete; Search Console and Bing submitted | Final launch validation passes |
| R2 | Blog, Portfolio (>= 3 genuine projects), testimonials (genuine), industry pages, CSP hash hardening | Separate spec update |

---

## 16. Risks

| ID | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| RSK-01 | Thin trust signals at launch (no portfolio or testimonials) | High | High | Process transparency, Security page, founder story once approved, fast response promise once confirmed |
| RSK-02 | Heavy motion and 3D hurt mobile performance | Medium | High | Motion tiers, lazy 3D, budgets enforced in CI |
| RSK-03 | Placeholders shipped to production | Medium | High | Build fails on `[PLACEHOLDER` |
| RSK-04 | Resend free limit (100 emails per day) exhausted by spam | Low | Medium | Turnstile, honeypot, rate limit, D1 storage so leads are never lost |
| RSK-05 | Consent configuration non-compliant | Medium | High | Legal review of Privacy Policy and banner; network tests |
| RSK-06 | Next.js static export limitations surface late | Low | Medium | Architecture designed for static export from M1; OpenNext documented as fallback |
| RSK-07 | Cloudflare AI crawler defaults reduce GEO visibility | Medium | Medium | Configure AI Crawl Control deliberately at launch ([OQ-9](#17-open-questions)) |
| RSK-08 | Brand colour instruction ambiguity ("blue accents") | Medium | Medium | Brand guide palette used until clarified ([OQ-1](#17-open-questions)) |

---

## 17. Open questions

Each question carries the default applied until answered.

| ID | Question | Default applied |
|---|---|---|
| OQ-1 | The decision on dark bands mentions "official blue brand accents", but the brand guidelines contain no blue; the palette is violet and recolouring is a listed misuse. Which is intended? | Use Peak Violet `#8E21FC` and the brand violets as accents |
| OQ-2 | The public email was supplied as `Connect@10peakstudio.com` (domain without "s"), while the domain and other addresses use `10peakstudios.com`. Which is correct? | `connect@10peakstudios.com`, pending confirmation |
| OQ-3 | WhatsApp Business number for click-to-chat. Note that a `wa.me` link contains the number in its URL even though the number is not displayed as text. | Placeholder; CTA hidden until provided |
| OQ-4 | Which inbox receives lead notifications, and should `partner@` or `admin@` appear anywhere? | Notifications to the public email; no other address published |
| OQ-5 | Legal entity name, governing-law jurisdiction and grievance contact for Privacy and Terms | Placeholders; legal review required |
| OQ-6 | Lead retention period in D1 | 12 months, then deletion |
| OQ-7 | Budget bands for the form (INR), or remove the field | Field shown with placeholder bands plus "Prefer not to say" |
| OQ-8 | Spelling standard | Indian English with British spelling (colour, optimise) |
| OQ-9 | Cloudflare AI crawler policy (Search, Agent, Training) | Allow all three (site has no ads; visibility is the goal); never block Googlebot or Bingbot |
| OQ-10 | Hero 3D concept: A (faceted peak with rising arrow) or B (particle network) | Decide after M3 prototypes |
| OQ-11 | Response-time commitment for enquiries | Placeholder; no promise shown until confirmed |
| OQ-12 | Process steps, deliverables and client-project security practices | Drafts shown in this document; publish only after confirmation |
| OQ-13 | Active official social profiles | None shown until provided |
| OQ-14 | Mission, vision, belief and story copy | Drafts for approval |
| OQ-15 | Pricing approach and engagement models for FAQs | No prices published |
| OQ-16 | Email sending address and DNS access for Resend domain verification | `noreply@10peakstudios.com` as sender, `reply_to` set to the visitor |
| OQ-17 | Pillar placement of Mobile, Custom Software (Build) and Branding, Video (Grow) | As in [5.1](#51-pillars) |
| OQ-18 | Cloudflare Web Analytics: always on (cookieless) or behind Analytics consent | Always on, disclosed in Privacy Policy; switchable by one config flag after legal review |

---

## 18. Appendix: decisions log and glossary

### 18.1 User decisions recorded on 2026-11-05

| # | Decision |
|---|---|
| D1 | Official brand name 10PeakStudio; `10PeakStudios` only as schema `alternateName`; domain `10peakstudios.com` |
| D2 | Proposed Sora wordmark lockups provisionally approved for header, footer and loader end frame; supplied outlined files used unmodified |
| D3 | Story leads with Build. Automate. Grow.; Build and Automate primary, Grow supporting |
| D4 | Portfolio, testimonials, team details, founding year hidden until genuine and verified; only active official social profiles; Security page factual only |
| D5 | Contact via enquiry form, official business email and WhatsApp; no phone or address unless verified and approved; LocalBusiness schema only with genuine location data |
| D6 | Predominantly white design with selected Obsidian sections; dark logo variants and final CTA in an Obsidian footer |
| D7 | Global consent management with Accept, Reject, Customise; GA4 and Clarity gated; preferences changeable |
| D8 | Phase 2: four PascalCase spec files, CLAUDE.md @-imports, brand-first MASTER.md, `git init` without commit; `task.md` and `memory.md` deferred |

### 18.2 Glossary

| Term | Meaning |
|---|---|
| R1, R2 | Release 1 (launch), Release 2 (post-launch) |
| Tier 0, 1, 2 | Motion tiers: reduced motion, light (touch or low power), full (desktop); see [Design.md 11.3](Design.md#113-motion-tiers) |
| GEO | Generative Engine Optimisation: visibility in AI-generated answers |
| AEO | Answer Engine Optimisation: content structured to be quoted as a direct answer |
| Obsidian section | Dark section with background `#000000` |
