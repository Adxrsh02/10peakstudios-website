# 10PeakStudio Contact Us Page Specification

**Document:** `Project_spec/Sections/01_Contact_Page.md`  
**Status:** Approved for Build  
**Route:** `/contact` & `/contact/thank-you`  
**Date:** 2026-11-07  
**Owner:** 10PeakStudio  

---

## 1. Source Map: Requirements to Spec Files

| Requirement | Spec File | Section & Line References | Notes & Implementation Anchor |
|---|---|---|---|
| **Page URL, Meta, Breadcrumb & Schema** | `PRD.md` | §8.7 (L381–403), §11 (L521–571) | URL: `/contact`. Title: `Contact Us: Start a Project \| 10PeakStudio`. `ContactPage`, `Organization` with `ContactPoint`, `FAQPage`. |
| **Hero & Visual Layout** | `Design.md` | §10.15 (L772–780), §14 (L928) | Overlay over Cloudinary hero bg; WCAG AA contrast; no Three.js or heavy 3D canvases. |
| **Contact Information & Hours** | `Company_info.md`, User Data | §1, §10; User Prompt | Mon–Sat 07:00–21:00 IST; Navi Mumbai; tel/mailto/WhatsApp links. |
| **Enquiry Form Fields & Validation** | `PRD.md` | §9 (L429–477); `Design.md` §10.9 (L727–741) | Form `project_enquiry`: Name, Email, Phone, 8 Services, Budget, Timeline, Message, Consent. |
| **Backend Worker & Cloudflare D1** | `Architecture.md` | §5 (L245–318), §6 (L321–392) | Route `/api/contact`; D1 table `leads`; Turnstile siteverify; Resend API. |
| **Spam Defence & Rate Limiting** | `Architecture.md` | §6 (L335), §13.2 (L616); `Rules.md` §12 | Honeypot `website`, `startedAt` ≥ 3s, Cloudflare Turnstile, 5 leads/hash(IP)/hr in D1. |
| **Design Tokens & Surfaces** | `tokens.css`, `Design.md` | §4, §7, §8; `MASTER.md` | Pure white theme (`#FCFCFC`/`#FFFFFF`), Peak Violet (`#8E21FC`), Deep Violet (`#480BB4`), Obsidian accents. |
| **Motion Language & Tiers** | `Design.md` | §11 (L783–827); `Rules.md` §10 | Peak rise, Tier 0 (static/reduced-motion), Tier 1 (light), Tier 2 (full). |
| **Analytics & Data Masking** | `Architecture.md` | §11 (L505–560); `Rules.md` §12 | `form_start`, `form_error`, `generate_lead` (on thank-you); Clarity `data-clarity-mask="true"`. |
| **Content Integrity & Verification** | `Rules.md` | §4 (L82–94); `PRD.md` §12 | Zero invented data; `[CONFIRM]` markers for stats and client permissions; gate dummy testimonials. |

---

## 2. Improvements to Proposed Ideas

1. **Direct `fetch` for Resend & Turnstile** (No `@resend/node`): Saves ~32 KB gzipped bundle size, adds 0 dependencies, executes natively inside Cloudflare Workers without Node.js polyfill overhead or CPU spikes under the 10ms limit.
2. **Native CSS Table/HTML Email Templates** (No `@react-email/components` runtime in Worker): Pre-rendered HTML string templates avoid pulling React SSR runtime into Cloudflare Worker execution. Hand-crafted, inline-CSS email tables guarantee 100% compatibility in Outlook, Gmail, and Apple Mail.
3. **Luminance-Aware Logo Container for White JPGs**: The Sai Prestige JPG has a solid white rectangular background. A subtle container border (`border-border`), neutral pad, and CSS `mix-blend-mode: multiply` on light surfaces renders it clean and professional.
4. **Hydration-Safe Client-Side IST Status Badge**: Real-time evaluation of IST business hours (Mon–Sat 07:00–21:00 IST) mounted on client prevents build-time static HTML baking and hydration mismatches.
5. **Progressive Single-View Split Layout over Multi-Step Wizard**: A compact 2-column layout (7 cols form with service chips + grouped inputs, 5 cols "What Happens Next" + direct channels) allows 1-click completion while keeping visual friction low.
6. **Accessible Marquee Controls (WCAG 2.2.2)**: Visible keyboard-focusable Pause/Play toggle button and honors `prefers-reduced-motion` by unwrapping into a static flex row.
7. **Accessible Copy-to-Clipboard with Live Announcer**: Clipboard buttons for email/phone feature a polite `aria-live="polite"` feedback toast so screen readers announce "Email copied to clipboard".

---

## 3. Conflicts and Gaps Resolved

1. **CTA Band Collision**: PRD-GLB-07 excludes Contact, Thank-you, and 404 from generic `CtaBand` to prevent circular self-links. Replaced with an **Assistance & Escalation Strip** leading into the Obsidian footer.
2. **Email Domain Mismatch**: Standardized on canonical `connect@10peakstudios.com`.
3. **Palette Inconsistency**: Purely Peak Violet (`#8E21FC`), Deep Violet (`#480BB4`), Lilac Spark (`#A743F8`), and Glow Violet (`#5B10E0`). No blue hex codes.
4. **"Global Teams" in Working Title**: Replaced with honest alternatives: *"Partners in Growth: Trusted by Ambitious Founders & Industry Leaders"*.
5. **Phone & Address Policy**: Provided phones and Navi Mumbai location displayed directly, but no street address (no `LocalBusiness` street schema).
6. **Missing Gogs India Logo**: Marked with `[PLACEHOLDER: Client Logo URL]` with typography badge fallback.

---

## 4. Section Order & Wireframe Specifications

### Sequence
1. **Hero Section (A):** Cloudinary background, gradient scrim, breadcrumb, H1, quick-action pill buttons (Call, WhatsApp, Email).
2. **Direct Contact Method Cards (B):** 4 cards: Phone, Email, Location, Business Hours with live IST badge.
3. **Project Enquiry Panel (C) + "What Happens Next" (D):** Split-screen: 7/12 form, 5/12 sticky process and assurance panel.
4. **Numbers Section (E):** 4-column metric strip with count-up animation (`[CONFIRM]` markers).
5. **Client Proof / Logos (F):** Adaptive row (<5 logos) or marquee (>=5 logos) with white JPG handling.
6. **Testimonials (G):** Flag-gated (`NEXT_PUBLIC_SHOW_TESTIMONIALS=true`, default hidden).
7. **Contact FAQs (H):** 5 high-intent questions, FAQPage schema.
8. **Direct Assistance Strip (I):** Obsidian transition strip to footer.

---

## 5. Design Token & Component Mapping

- **Surfaces:** Pure white (`#FCFCFC`), Paper (`#F6F5FA`), Obsidian (`#000000`).
- **Typography:** Sora for headings, Inter for body/UI (`latin-ext` for ₹), JetBrains Mono for code.
- **Radii:** Pills (`rounded-pill`) for buttons/chips, 14px (`rounded-md`) for cards, 8px (`rounded-sm`) for inputs.
- **Components Created:**
  - `src/components/contact/ContactHero.tsx`
  - `src/components/contact/ContactMethods.tsx`
  - `src/components/contact/LiveStatusBadge.tsx`
  - `src/components/contact/EnquiryForm.tsx`
  - `src/components/contact/ServiceSelector.tsx`
  - `src/components/contact/FormField.tsx`
  - `src/components/contact/TurnstileWidget.tsx`
  - `src/components/contact/FormErrorSummary.tsx`
  - `src/components/contact/WhatHappensNext.tsx`
  - `src/components/contact/StatsCounter.tsx`
  - `src/components/contact/ClientMarquee.tsx`
  - `src/components/contact/DirectSupportStrip.tsx`

---

## 6. Form, Backend, and Email Architecture

### Sequence
1. Client validates with `leadSchema` (Zod).
2. POST to `/api/contact` (<= 16KB JSON).
3. Worker checks origin, honeypot (`website`), minimum 3s fill time.
4. Turnstile verified via `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
5. Client IP hashed with `IP_HASH_SALT` via SHA-256; rate limit enforced (<= 5/hr).
6. Lead inserted into Cloudflare D1 `leads` table (`status = 'received'`).
7. Worker sends internal notification email via Resend API (direct `fetch`, `Idempotency-Key`).
8. Worker sends branded auto-reply to visitor.
9. D1 status updated to `notified` or `email_failed`.
10. Return 200 OK `{ ok: true, leadId }`; client navigates to `/contact/thank-you`.

---

## 7. Motion Architecture & Reduced-Motion Plan

- **Tier 0 (`prefers-reduced-motion`):** Static values, instant opacity, marquee unwrapped to flex row.
- **Tier 1:** Subtle fade and translateY (8–12px), native scrolling.
- **Tier 2:** Peak rise (24px translateY, scale 0.985 to 1, ease `peakRise`), ScrollTrigger batch reveals, count-up animation.

---

## 8. SEO, Schema, Performance, Accessibility & Analytics

- **Schema:** `ContactPage`, `Organization` with `ContactPoint` & `openingHoursSpecification`, `BreadcrumbList`, `FAQPage`.
- **Budgets:** LCP <= 1.8s, CLS = 0.00, INP <= 100ms, Route JS <= 45KB. Zero Three.js.
- **Accessibility:** WCAG 2.2 AA compliant, visible focus rings, error summary with autofocus, touch targets >= 48px.
- **Analytics:** GA4 events (`form_start`, `form_error`, `generate_lead` on thank-you); Clarity `data-clarity-mask="true"`.

---

## 9. Environment Variables & Secrets Setup

- **Local:** `.dev.vars` (gitignored): `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `IP_HASH_SALT`.
- **Client:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_SHOW_TESTIMONIALS`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- **Worker Production:** Set via `npx wrangler secret put`.

---

## 10. Ordered Implementation Steps

1. Content Singleton & Schemas
2. D1 Migration & Worker Contact Pipeline
3. Direct Contact Cards & Live Hours Component
4. Enquiry Form Component & Turnstile Integration
5. Supporting Sections (Hero, What Happens Next, Stats, Clients)
6. Contact Page Assembly & Thank-You Route
7. Testing, Quality Gates & Visual Verification
