# Rayan Studio Redesign Master Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Rayan Studio as the approved premium independent software studio while preserving existing SEO acquisition surfaces, consent-aware analytics, form protections, and the current Next.js foundation.

**Architecture:** Keep the existing Next.js 14 App Router, React 18, TypeScript and Tailwind stack. Build a centralized bilingual route/content model, a reusable design/navigation system, then migrate the commercial pages in coherent lots. Preserve the 70 local SEO routes as a separate acquisition surface and extend, rather than replace, the current Brevo and GA4 infrastructure.

**Tech Stack:** Next.js 14.2.x, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, Brevo transactional email, GA4 consent-aware analytics, Vitest + Testing Library for site unit/component tests, Playwright Chromium for critical E2E journeys.

## Global Constraints

These constraints apply to every lot and every task.

- Public positioning is approximately 70% software and 30% premium web.
- Keep the existing Next.js App Router / React / TypeScript / Tailwind foundation. Do not migrate frameworks during the redesign.
- Core commercial routes must ship in both FR and EN.
- Public prices are not shown. The commercial page is `Offres`, not `Tarifs`.
- Never invent client metrics, testimonials, team size, logos, outcomes or production claims.
- Public-facing FR/EN copy must not contain the em dash character `—`.
- Preserve all 70 `/site/[sector]/[city]` local SEO routes, their search intent and sitemap presence unless an individual route receives an approved intent-equivalent redirect.
- Preserve consent-aware analytics, cookie consent management, `scroll_depth`, `section_view`, CTA measurement and form conversion measurement.
- `/contact` and `/demarrer-un-projet` / `/en/start-a-project` must have distinct conversion events.
- Preserve honeypot behavior, server-side rate limiting, server-side validation, length limits and safe email rendering for both contact flows.
- Detected honeypot submissions return a successful no-op response.
- Recoverable form failures must preserve user-entered data.
- Server Components are the default. Add `"use client"` only where browser state, forms, navigation interaction or motion require it.
- Respect `prefers-reduced-motion`; mobile motion must be lighter than desktop.
- Do not add an external CMS, chatbot, client account, complex logo system, heavy WebGL, automatic translation or pricing calculator in V1.
- Do not modify prospection/outreach workflows unless a task explicitly requires a compatibility change. The redesign is not permission to refactor outreach.
- Existing legal pages, security headers and unsubscribe/webhook infrastructure remain intact unless a task explicitly updates a link or metadata reference.
- No placeholder-heavy featured work ships. Pick4Me, Pont Factur-X and GoodCall must use real available media and only verifiable facts.

---

## Claude Code Execution Contract

Claude Code is the intended implementer. Execute this plan as an engineering plan, not as a new brainstorming exercise.

1. Read both validated specification files before editing code:
   - `docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-design.md`
   - `docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-review-amendment.md`
2. Read this master plan and the current lot file in full before starting that lot.
3. Use `superpowers:using-git-worktrees` before implementation and `superpowers:test-driven-development` for feature/bugfix tasks.
4. Do not reinterpret an approved visual/content decision. If a plan instruction appears to conflict with the validated spec, stop and report the conflict instead of choosing a third option.
5. Implement one task at a time. Run the task-specific test before and after implementation exactly as specified.
6. Commit after every task using the commit message given by the task, unless the task explicitly says to amend the previous commit.
7. Do not continue to the next lot with a failing lot gate.
8. Do not disable tests, TypeScript checks, ESLint rules, accessibility behavior, consent checks or security protections to make a gate pass.
9. Never send a real Brevo email from automated tests. Provider calls must be mocked at test level.
10. Do not mark a lot complete without recording the verification commands and their actual successful output in the implementation session summary.

### Worktree / branch strategy

The planning branch contains documentation only. Implementation must happen in an isolated worktree.

After the planning PR is merged, start Lot 01 from the updated `main` branch:

```bash
git fetch origin
git switch main
git pull --ff-only
git worktree add ../rayan-studio-redesign -b feat/redesign-01-foundation main
cd ../rayan-studio-redesign
```

For later lots, start each branch from the previous merged lot. Preferred branches:

```text
feat/redesign-01-foundation
feat/redesign-02-core-commercial
feat/redesign-03-work
feat/redesign-04-conversion
feat/redesign-05-insights-seo
feat/redesign-06-release
```

If the repository owner explicitly chooses one long-lived feature branch instead, preserve the same lot boundaries and review gates; do not collapse tasks into one large commit.

---

## Current Repository Facts That Must Guide Implementation

The current site is not a greenfield project.

- `package.json` currently has `dev`, `build`, `start`, and `lint`, but no root site unit/component test runner and no Playwright dependency.
- `.github/workflows/ci.yml` currently runs root `npm ci`, lint, `npx tsc --noEmit`, the separate `scripts` package tests with PostgreSQL, then `npm run build`.
- The current homepage is assembled by `src/components/site/HomePage.tsx` and contains the old navbar, hero, problem/solution, services, showcase, process, pricing, testimonials, FAQ, contact and footer.
- `src/app/(localized)/[locale]/[service]/page.tsx` serves existing legacy service/acquisition pages directly below the locale root.
- `src/app/(default)/site/[sector]/[city]/page.tsx` serves the 70 local SEO routes. This surface stays live.
- `src/app/sitemap.ts` currently includes local SEO routes and legacy service SEO routes.
- `src/app/api/contact/route.ts` already contains in-memory IP rate limiting, honeypot handling, server validation, sanitization, HTML escaping and Brevo delivery.
- `src/lib/analytics.ts`, `AnalyticsLoader`, `CookieConsent`, `ManageCookiesButton` and `FunnelTracking` already implement consent-aware GA4 behavior. Preserve the contract and migrate event/section names instead of replacing it casually.
- Existing project images are available under `public/realisations/` for Pick4Me, GoodCall, DocExtract, Manteigaria and Pont Factur-X.

---

## Canonical New Route Contract

Use this route contract as the source of truth for new navigation and metadata. The route helper created in Lot 01 owns these values so components never concatenate slugs ad hoc.

### Services

```text
FR /fr/services/applications-web-saas
EN /en/services/web-applications-saas

FR /fr/services/mvp-produits-digitaux
EN /en/services/mvp-digital-products

FR /fr/services/apis-backends
EN /en/services/apis-backends

FR /fr/services/automatisation-ia
EN /en/services/automation-ai

FR /fr/services/sites-web-refonte
EN /en/services/premium-websites-redesign

FR /fr/services/devops-cloud
EN /en/services/devops-cloud
```

### Work

Project slugs are brand/product names and remain the same in both languages:

```text
/[locale]/work
/[locale]/work/pick4me
/[locale]/work/pont-facturx
/[locale]/work/goodcall
/[locale]/work/docextract
/[locale]/work/manteigaria
```

### Studio

```text
FR /fr/studio/rayan-studio       EN /en/studio/rayan-studio
FR /fr/studio/rayan-sekkat       EN /en/studio/rayan-sekkat
FR /fr/studio/methode             EN /en/studio/method
FR /fr/studio/offres              EN /en/studio/offers
FR /fr/studio/faq                 EN /en/studio/faq
```

### Insights

```text
/[locale]/insights
/[locale]/insights/articles
/[locale]/insights/guides
/[locale]/insights/checklists
/[locale]/insights/templates
FR /fr/insights/outils            EN /en/insights/tools
```

Individual content uses `/<category>/<slug>` with localized article slugs registered centrally.

### Conversion

```text
FR /fr/demarrer-un-projet
EN /en/start-a-project
/[locale]/contact
```

`/en/demarrer-un-projet` permanently redirects to `/en/start-a-project`; `/fr/start-a-project` permanently redirects to `/fr/demarrer-un-projet`.

---

## Cross-Lot Interfaces

Later lots are allowed to depend on these exact interfaces created by Lot 01. Do not rename them casually.

```ts
// src/lib/site-routes.ts
export type Locale = "fr" | "en"; // imported/re-exported from src/lib/i18n.ts as needed
export type ServiceKey =
  | "applications"
  | "mvp"
  | "backends"
  | "automation"
  | "web"
  | "devops";
export type StudioPageKey = "studio" | "rayan" | "method" | "offers" | "faq";
export type InsightCategoryKey = "articles" | "guides" | "checklists" | "templates" | "tools";

export function servicePath(locale: Locale, key: ServiceKey): string;
export function resolveServiceSlug(locale: Locale, slug: string): ServiceKey | null;
export function workPath(locale: Locale, slug?: string): string;
export function studioPath(locale: Locale, page: StudioPageKey): string;
export function insightPath(locale: Locale, category?: InsightCategoryKey, slug?: string): string;
export function contactPath(locale: Locale): string;
export function startProjectPath(locale: Locale): string;
```

```ts
// src/content/projects/types.ts
export type ProjectKey = "pick4me" | "pont-facturx" | "goodcall" | "docextract" | "manteigaria";
export type ProjectRecord = {
  key: ProjectKey;
  slug: string;
  title: string;
  year?: string;
  liveUrl?: string;
  heroImage: string;
  featuredOrder?: number;
  tone: "light" | "dark" | "energy";
  categories: Record<Locale, string[]>;
  summary: Record<Locale, string>;
  role: Record<Locale, string>;
  status?: Record<Locale, string>;
  technologies: string[];
  challenge: Record<Locale, string[]>;
  solution: Record<Locale, string[]>;
  capabilities: Array<{ title: Record<Locale, string>; body: Record<Locale, string> }>;
  outcome: Record<Locale, string[]>;
  gallery: Array<{ src: string; alt: Record<Locale, string> }>;
  next?: ProjectKey;
};
```

```ts
// src/content/services/types.ts
export type ServiceRecord = {
  key: ServiceKey;
  slug: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  problem: Record<Locale, string>;
  useCases: Record<Locale, Array<{ title: string; body: string }>>;
  approach: Record<Locale, string[]>;
  engineering: Record<Locale, string[]>;
  technologies: string[];
  proofProjects: ProjectKey[];
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};
```

```ts
// src/lib/analytics.ts
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean | undefined>): void;
```

The existing analytics signature remains compatible. New event names are defined in Lot 04.

---

## Lot Order

### Lot 01: Foundation, guidance, routes, content contracts, design system, navigation

Plan: `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-01-foundation.md`

Delivers a tested foundation without replacing the whole public homepage yet. It aligns agent guidance, adds site test infrastructure, centralizes routes/content types, creates design/motion primitives and implements the accessible mega-navigation/footer.

**Gate:** unit/component tests, lint, typecheck, existing scripts tests and production build all pass. The 70 local SEO combinations are still represented.

### Lot 02: Core commercial pages

Plan: `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-02-core-commercial.md`

Delivers the new homepage, all six service pages, Studio/Rayan/Method/Offers/FAQ pages and shared commercial metadata/structured data. This is the main public positioning cutover.

**Gate:** FR/EN core pages render, approved homepage order is exact, no public prices, no public em dashes, old local pages still render, lint/typecheck/tests/build pass.

### Lot 03: Work and flagship case studies

Plan: `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-03-work.md`

Delivers `/work`, centralized project records, Pick4Me, Pont Factur-X and GoodCall flagship studies, plus secondary DocExtract/Manteigaria entries without invented proof.

**Gate:** selected work order is Pick4Me → Pont Factur-X → GoodCall in FR/EN, flagship pages have the full case-study structure, project facts are sourced from existing repository/public product facts only, and all automated checks pass.

### Lot 04: Contact, project intake, analytics and consent migration

Plan: `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-04-conversion.md`

Delivers separate contact and start-a-project flows, shared protected submission infrastructure, Brevo provider isolation, analytics migration map, new CTA/form events and preserved consent behavior.

**Gate:** no real provider calls in tests; honeypot/rate-limit/server-validation/error-preservation tests pass; consent tests pass; `/contact` and start-a-project emit distinct events; all automated checks pass.

### Lot 05: Insights, SEO migration and preserved acquisition surfaces

Plan: `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-05-insights-seo.md`

Delivers the typed Insights library and initial content, metadata/hreflang/breadcrumb helpers, sitemap expansion, legacy URL redirects, local SEO shell compatibility and public-copy validation.

**Gate:** all 70 local SEO routes still resolve or have individually approved equivalent redirects, sitemap includes them, new commercial/insight routes have correct FR/EN alternates, redirect tests pass, no shipped public em dash is found, and all automated checks pass.

### Lot 06: Playwright, responsive/accessibility/performance polish and release

Plan: `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-06-release.md`

Delivers Playwright Chromium infrastructure, deterministic critical-flow E2E tests, final mobile/reduced-motion/accessibility polish, CI integration and release verification.

**Gate:** Playwright critical flows pass in CI; root lint, typecheck, unit tests, scripts tests, E2E and production build pass; release checklist has no failed item.

---

## Dependency Graph

```text
Lot 01 Foundation
   ↓
Lot 02 Core commercial ──────┐
   ↓                         │
Lot 03 Work                  │
   ↓                         │
Lot 04 Conversion/tracking ←─┘
   ↓
Lot 05 Insights/SEO migration
   ↓
Lot 06 E2E/polish/release
```

Do not start Lot 03 before Lot 01 route/content interfaces exist. Do not finalize Lot 05 redirects/sitemap before the canonical routes from Lots 02–04 exist. Do not finalize Playwright in Lot 06 before all critical flows are stable.

---

## Final Release Gate

Claude must run the final verification from a clean install before claiming completion:

```bash
rm -rf node_modules .next
npm ci
npm run lint
npm run typecheck
npm test
npm --prefix scripts ci
npm --prefix scripts test
npx playwright install --with-deps chromium
npm run test:e2e
npm run build
```

Expected result: every command exits `0`.

Then verify the production route contract using the running production build:

```bash
npm run start
```

In another shell, the release smoke script created in Lot 06 must return success for FR/EN core routes and all 70 local SEO URLs.

Completion is not valid if:

- any core FR/EN route is missing;
- any one of the 70 local SEO routes is silently dropped;
- consent-aware analytics is bypassed;
- either form loses honeypot/rate-limit/server validation;
- public prices reappear;
- public-facing marketing copy contains `—`;
- a flagship case study contains a fabricated claim;
- Playwright is skipped in CI;
- lint, typecheck, tests or build are bypassed.
