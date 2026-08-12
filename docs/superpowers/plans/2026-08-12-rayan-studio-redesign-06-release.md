# Rayan Studio Redesign Lot 06 E2E, Polish and Release Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add deterministic Playwright coverage, complete responsive/accessibility/performance polish, integrate the final verification pipeline, remove obsolete redesign code safely and prove every canonical/local SEO route before release.

**Architecture:** Use Playwright Chromium for browser critical journeys and `@axe-core/playwright` for automated accessibility checks. Mock contact/project HTTP responses at the browser boundary in E2E while route-handler Vitest tests continue to cover server validation/provider integration with a mocked Brevo provider. Add a TSX-powered production smoke script that derives routes from the same route/content registries used by the app.

**Tech Stack:** Playwright Chromium, @axe-core/playwright, tsx, existing Vitest/Testing Library, GitHub Actions Node 20.

## Global Constraints

- E2E must never send real emails.
- First E2E suite is critical-flow coverage, not exhaustive cross-browser testing.
- Chromium is sufficient for V1 CI; do not add three-browser CI cost unless separately approved.
- Mobile tests use a real mobile viewport/device profile, not only CSS unit tests.
- Accessibility failures must be fixed or explicitly proven false positives; do not blanket-disable axe rules.
- Reduced-motion behavior must remain usable.
- Do not degrade the 70 local SEO pages during cleanup.
- Public copy scan is part of CI.
- Production build remains a hard gate.

---

### Task 1: Install and configure Playwright, axe and the route smoke runner

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `playwright.config.ts`
- Create: `e2e/fixtures.ts`
- Create: `scripts/smoke-routes.ts`

**Interfaces:**
- Produces `npm run test:e2e`, `npm run test:e2e:ui`, `npm run smoke:routes`.
- E2E server defaults to `http://127.0.0.1:3000`.

- [ ] **Step 1: Install new test-only dependencies**

Run:

```bash
npm install -D @playwright/test @axe-core/playwright tsx
npx playwright install chromium
```

- [ ] **Step 2: Add scripts**

Add to root `package.json`:

```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui",
"smoke:routes": "tsx scripts/smoke-routes.ts"
```

Keep `verify` focused on lint/typecheck/copy/unit/build; CI explicitly adds E2E after build.

- [ ] **Step 3: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --hostname 127.0.0.1 --port 3000",
    url: "http://127.0.0.1:3000/fr",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

Do not put Brevo credentials in Playwright config.

- [ ] **Step 4: Add E2E helpers in `e2e/fixtures.ts`**

Export helpers:

```ts
export async function acceptAnalytics(page: Page): Promise<void>;
export async function mockContactSuccess(page: Page): Promise<void>;
export async function mockContactError(page: Page, code?: string): Promise<void>;
export async function mockProjectSuccess(page: Page): Promise<void>;
export async function mockProjectError(page: Page, code?: string): Promise<void>;
```

HTTP form mocks use `page.route("**/api/contact", ...)` and `page.route("**/api/project", ...)` and fulfill JSON. They are UI-level mocks only. Route-handler unit tests from Lot 04 remain the integration-level server assertions.

- [ ] **Step 5: Create `scripts/smoke-routes.ts` deriving canonical URLs from source registries**

Imports must be relative, not rely on a separate hand-maintained route list:

```ts
import { getAllLocalSeoCombos } from "../src/lib/local-seo";
import { servicePath, workPath, studioPath, contactPath, startProjectPath, insightPath } from "../src/lib/site-routes";
import { PROJECTS } from "../src/content/projects";
import { INSIGHTS } from "../src/content/insights";
```

Build route set for:

- `/fr`, `/en`;
- `/fr/services`, `/en/services` + all 12 service details;
- both Work indices + all 10 project details;
- all 10 Studio child pages;
- both Insights indices + all categories + every insight detail;
- both Contact pages;
- canonical FR/EN start-project pages;
- 70 local SEO pages;
- legal pages.

Fetch `process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000"` with redirects disabled for canonical URLs and fail on any status outside 200–299.

Print:

```text
Smoke checked <N> canonical routes, including 70 local SEO routes.
```

- [ ] **Step 6: Run typecheck and commit**

```bash
npm run typecheck
git add package.json package-lock.json playwright.config.ts e2e/fixtures.ts scripts/smoke-routes.ts
git commit -m "test: add Playwright and route smoke infrastructure"
```

---

### Task 2: Add FR/EN homepage, navigation and language-switch E2E coverage

**Files:**
- Create: `e2e/home.spec.ts`
- Create: `e2e/navigation.spec.ts`

**Interfaces:**
- Browser-level tests use real Next navigation/rendering, no component mocks.

- [ ] **Step 1: Add FR/EN home rendering tests**

`home.spec.ts` assertions:

```text
/fr -> H1 exact FR approved copy
/en -> H1 exact EN copy
FR/EN each show Pick4Me before Pont Factur-X before GoodCall in DOM
start-project CTA href canonical for locale
Work CTA navigates to /<locale>/work
```

Use semantic roles/text, not CSS implementation selectors where possible.

- [ ] **Step 2: Add desktop mega-menu keyboard test**

Flow:

```text
open /fr
Tab/focus Services button
press Enter
assert aria-expanded=true
assert Applications web & SaaS link visible
press Escape
assert aria-expanded=false and focus returned to Services trigger
```

Repeat one representative Work/Studio menu link navigation.

- [ ] **Step 3: Add language-switch equivalence tests**

Test at minimum:

```text
/fr -> /en
/fr/services/applications-web-saas -> /en/services/web-applications-saas
/fr/studio/offres -> /en/studio/offers
/fr/insights/outils -> /en/insights/tools
/fr/demarrer-un-projet -> /en/start-a-project
```

If `LanguageSwitch` falls back to locale home for a page that now has a known equivalent, fix the route-equivalence helper instead of weakening the test.

- [ ] **Step 4: Run desktop tests**

```bash
npx playwright test e2e/home.spec.ts e2e/navigation.spec.ts --project=chromium-desktop
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add e2e/home.spec.ts e2e/navigation.spec.ts
git commit -m "test: cover homepage and mega navigation e2e"
```

---

### Task 3: Add mobile menu and reduced-motion E2E coverage

**Files:**
- Modify: `e2e/navigation.spec.ts`
- Create: `e2e/motion.spec.ts`

**Interfaces:**
- Uses Playwright `chromium-mobile` project and `page.emulateMedia({ reducedMotion: "reduce" })`.

- [ ] **Step 1: Add full mobile navigation flow**

On `chromium-mobile`:

```text
open /fr
assert menu toggle visible
open menu
assert aria-expanded=true
open Services accordion
navigate to Applications web & SaaS
assert destination URL
open menu again
press Escape
assert menu closed and toggle focused
```

Also assert page body is not left permanently scroll-locked after navigation/close.

- [ ] **Step 2: Add reduced-motion usability test**

Before navigation:

```ts
await page.emulateMedia({ reducedMotion: "reduce" });
```

Then load homepage, navigate through header and one project CTA. Assert content is visible and actionable. Do not assert every CSS transition duration; the goal is functional no-motion behavior.

Add one DOM assertion on the parallax hero media that no continuously updating transform is required for visibility. If implementation uses inline motion transforms even at rest, assert the element remains within viewport and stable after a short wait rather than expecting exact `transform: none`.

- [ ] **Step 3: Run mobile/reduced tests**

```bash
npx playwright test e2e/navigation.spec.ts e2e/motion.spec.ts --project=chromium-mobile
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add e2e/navigation.spec.ts e2e/motion.spec.ts
git commit -m "test: cover mobile and reduced motion flows"
```

---

### Task 4: Add contact and start-project critical-flow E2E coverage

**Files:**
- Create: `e2e/contact.spec.ts`
- Create: `e2e/project-form.spec.ts`

**Interfaces:**
- UI submission requests are intercepted with `e2e/fixtures.ts` helpers.
- Server/provider behavior stays covered by Lot 04 Vitest route tests.

- [ ] **Step 1: Add Contact success and error-preservation flows**

Error test:

```text
open /fr/contact
fill Name, Email, Subject, Message
mock /api/contact 502 { code: SEND_FAILED }
submit
assert localized error
assert all four visible values unchanged
```

Success test:

```text
mock /api/contact 200 { ok: true }
submit valid values
assert success state
```

Do not assert an actual email arrives.

- [ ] **Step 2: Add Project multi-step error-preservation flow**

Flow:

```text
open /fr/demarrer-un-projet
select Application / SaaS
select Produit existant
enter objective
select 1-3 mois
enter name/company/email, leave budget blank
mock /api/project 502
submit
assert error
navigate Back through steps and assert selections/objective preserved
return final step
mock success
retry
assert success
```

Repeat a shorter EN smoke path on `/en/start-a-project` to verify localized labels/canonical route.

- [ ] **Step 3: Add client-validation assertions**

Project form cannot advance from required selection steps without a choice. Contact rejects obviously invalid email before or after server response according to implemented UX. Server tests remain authoritative for security validation.

- [ ] **Step 4: Run both desktop and mobile projects**

```bash
npx playwright test e2e/contact.spec.ts e2e/project-form.spec.ts
```

Expected: PASS in desktop + mobile.

- [ ] **Step 5: Commit**

```bash
git add e2e/contact.spec.ts e2e/project-form.spec.ts
git commit -m "test: cover conversion flows e2e"
```

---

### Task 5: Add route, redirect and local SEO browser smoke coverage

**Files:**
- Create: `e2e/routes.spec.ts`

**Interfaces:**
- Uses `request` fixture for fast HTTP status checks, not full page rendering for all 70 local URLs.

- [ ] **Step 1: Test all 70 local SEO routes return successful content**

Import `getAllLocalSeoCombos` directly in the Playwright TS test. For each path:

```ts
const response = await request.get(`/site/${sector.slug}/${city.slug}`, { maxRedirects: 0 });
expect(response.status()).toBe(200);
```

Also verify one representative local page via browser has new `RAYAN STUDIO` header and local sector/city copy.

- [ ] **Step 2: Test legacy redirects**

Import `LEGACY_REDIRECTS` from `../config/legacy-redirects.mjs` if Playwright ESM interop allows. Otherwise read the same module dynamically.

For each redirect source:

- request without auto-follow;
- expect permanent redirect status supported by Next (308 is expected for permanent Next redirects);
- `location` ends with configured destination.

No `/site/` route may redirect.

- [ ] **Step 3: Test representative canonical route statuses**

At minimum every Services/Studio/Work/Insights/Conversion route family has one FR and one EN browser/request assertion in addition to the full smoke script.

- [ ] **Step 4: Run and commit**

```bash
npx playwright test e2e/routes.spec.ts --project=chromium-desktop
git add e2e/routes.spec.ts
git commit -m "test: cover route and local SEO migration e2e"
```

---

### Task 6: Add automated accessibility checks on critical page families

**Files:**
- Create: `e2e/accessibility.spec.ts`

**Interfaces:**
- Uses `AxeBuilder` from `@axe-core/playwright`.

- [ ] **Step 1: Add critical-page axe checks**

Run axe on:

```text
/fr
/en
/fr/services/applications-web-saas
/fr/work
/fr/work/pick4me
/fr/studio/offres
/fr/insights/guides/preparer-projet-saas
/fr/contact
/fr/demarrer-un-projet
/site/restaurant/paris
```

Test only WCAG A/AA-impacting categories by default; do not suppress individual violations without documenting the exact false positive in test code.

Example:

```ts
const results = await new AxeBuilder({ page }).analyze();
expect(results.violations).toEqual([]);
```

If the cookie banner causes expected overlay behavior, make a deliberate consent choice first; do not globally hide it via CSS in tests.

- [ ] **Step 2: Fix every real violation**

Likely areas to verify manually while fixing:

```text
focus visibility
button/link names
mega-menu aria-expanded/control relationship
heading order
form labels/error association
color contrast
mobile menu focus containment
image alt text
```

- [ ] **Step 3: Run accessibility suite desktop + mobile**

```bash
npx playwright test e2e/accessibility.spec.ts
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add e2e/accessibility.spec.ts src
git commit -m "fix: close redesign accessibility gaps"
```

---

### Task 7: Perform media/performance cleanup and remove obsolete redesign code only after usage proof

**Files:**
- Potentially remove obsolete legacy homepage components proven unused by `rg`.
- Modify: project/home media components as required.
- Modify: `package.json` / `package-lock.json` only when removing now-unused dependencies.
- Create: `docs/redesign/performance-review.md`

**Interfaces:**
- Must not delete local SEO content/routes, analytics/consent, legal pages, webhooks/unsubscribe or prospection.

- [ ] **Step 1: Audit client boundaries and media usage**

Run:

```bash
rg -n '^"use client"' src/components src/app
find public/realisations -type f -maxdepth 2 -print0 | xargs -0 ls -lh
rg -n "@paper-design/shaders-react|hero-liquid-shader|components/site/(HomePage|Hero|ProblemSolution|Services|Showcase|Process|Pricing|Testimonials|Faq|Contact|Navbar|Footer)" src
```

Record findings in `docs/redesign/performance-review.md`.

- [ ] **Step 2: Verify image loading rules**

Ensure:

- only true hero dominant media has `priority`;
- below-the-fold project images do not use `priority`;
- every `next/image` has sizes/dimensions appropriate to layout;
- no giant autoplay video;
- no new remote stock image dependency;
- real screenshot crops use one source rather than duplicated fake files.

- [ ] **Step 3: Remove unused shader/decorative dependency only when proven unreachable**

If `@paper-design/shaders-react` is referenced only by an obsolete component no longer reachable after redesign, delete that obsolete component and run:

```bash
npm uninstall @paper-design/shaders-react
```

If any canonical/local/legal route still imports it, keep it; do not force cleanup.

- [ ] **Step 4: Remove old public-site components only with zero remaining imports**

Candidate legacy files include old `HomePage.tsx`, `Hero.tsx`, `ProblemSolution.tsx`, `Services.tsx`, `Showcase.tsx`, `Process.tsx`, `Pricing.tsx`, `Testimonials.tsx`, `Faq.tsx`, `Contact.tsx`, old `Navbar.tsx`, old `Footer.tsx`, old `ServiceSeoPage.tsx`, and obsolete UI helpers used only by them.

For each candidate:

```bash
rg -n "<filename export/import identifier>" src
```

Delete only if:

- no canonical route imports it;
- local SEO now uses new SiteHeader/SiteFooter;
- legacy service paths are handled by tested redirects;
- no legal/default route depends on it.

Do not delete `service-seo.js` before the redirect coverage test no longer needs it. Keeping it as migration evidence through release is acceptable.

- [ ] **Step 5: Build after cleanup**

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add docs/redesign/performance-review.md package.json package-lock.json src public
git commit -m "perf: remove obsolete redesign weight"
```

If no dependency/code removal is safe, commit only the actual media/performance improvements and review document with an accurate message.

---

### Task 8: Integrate full verification into GitHub Actions

**Files:**
- Modify: `.github/workflows/ci.yml`

**Interfaces:**
- Existing PostgreSQL-backed `scripts` tests remain intact.
- CI adds root unit/copy tests and Playwright after build.

- [ ] **Step 1: Update CI in this exact logical order**

Preserve checkout, Node 20, npm cache and PostgreSQL service.

Verification steps:

```yaml
- name: Install dependencies
  run: npm ci

- name: Lint
  run: npm run lint

- name: Typecheck
  run: npm run typecheck

- name: Public copy contract
  run: npm run check:copy

- name: Site unit and component tests
  run: npm test

- name: Outreach scripts tests
  working-directory: scripts
  env:
    TEST_DATABASE_URL: postgres://test:test@localhost:5432/prospection_test
  run: |
    npm ci
    npm test

- name: Build
  run: npm run build
  env:
    NEXT_PUBLIC_SITE_URL: https://www.rayanstudios.com

- name: Install Playwright Chromium
  run: npx playwright install --with-deps chromium

- name: End-to-end tests
  run: npm run test:e2e
```

No Brevo secrets are needed because E2E form responses are mocked and route-handler unit tests mock the provider boundary.

- [ ] **Step 2: Run a YAML sanity inspection**

```bash
sed -n '1,240p' .github/workflows/ci.yml
```

Confirm the original PostgreSQL service remains.

- [ ] **Step 3: Run local equivalent before commit**

```bash
npm run lint
npm run typecheck
npm run check:copy
npm test
npm --prefix scripts test
npm run build
npx playwright install chromium
npm run test:e2e
```

Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: verify redesign critical browser flows"
```

---

### Task 9: Run a production-build smoke test across canonical and local routes

**Files:**
- Modify only if a concrete smoke failure exposes a bug: route/sitemap/redirect source files.

- [ ] **Step 1: Start from a clean install/build**

```bash
rm -rf node_modules .next
npm ci
npm run lint
npm run typecheck
npm run check:copy
npm test
npm --prefix scripts ci
npm --prefix scripts test
npm run build
```

Expected: all `0`.

- [ ] **Step 2: Start the production server**

```bash
npm run start -- --hostname 127.0.0.1 --port 3000
```

Keep this process running.

- [ ] **Step 3: Run the registry-derived smoke script in another shell**

```bash
SMOKE_BASE_URL=http://127.0.0.1:3000 npm run smoke:routes
```

Expected: all canonical routes return 2xx and output explicitly confirms 70 local SEO routes checked.

- [ ] **Step 4: Run final E2E against the production server**

Because Playwright config uses `reuseExistingServer` outside CI, run:

```bash
npm run test:e2e
```

Expected: all desktop/mobile Chromium tests PASS against the running production server.

- [ ] **Step 5: Stop server and inspect working tree**

```bash
git status --short
```

Expected: clean unless the smoke run exposed a concrete fix.

---

### Task 10: Final release review and completion evidence

**Files:**
- Create: `docs/redesign/release-checklist.md`

**Interfaces:**
- Captures factual release evidence, not aspirational claims.

- [ ] **Step 1: Create release checklist with actual command results**

Include:

```md
# Rayan Studio redesign release checklist

## Routes
- FR core pages: PASS/FAIL
- EN core pages: PASS/FAIL
- 70 local SEO routes: PASS/FAIL
- Legacy redirect map: PASS/FAIL

## Conversion
- Contact success/error preservation: PASS/FAIL
- Project flow success/error preservation: PASS/FAIL
- Honeypot tests: PASS/FAIL
- Rate-limit tests: PASS/FAIL
- Brevo provider mocked in automation: PASS/FAIL

## Analytics/privacy
- Consent accept: PASS/FAIL
- Consent decline: PASS/FAIL
- Consent reopen: PASS/FAIL
- scroll_depth: PASS/FAIL
- section_view new IDs: PASS/FAIL
- Contact/project distinct events: PASS/FAIL

## Accessibility/responsive
- Desktop Chromium: PASS/FAIL
- Mobile Chromium: PASS/FAIL
- Reduced motion: PASS/FAIL
- Axe critical pages: PASS/FAIL

## Quality
- npm run lint: PASS/FAIL
- npm run typecheck: PASS/FAIL
- npm run check:copy: PASS/FAIL
- npm test: PASS/FAIL
- npm --prefix scripts test: PASS/FAIL
- npm run build: PASS/FAIL
- npm run test:e2e: PASS/FAIL
- npm run smoke:routes: PASS/FAIL
```

Replace every PASS/FAIL marker with the actual outcome. Release is blocked by any FAIL.

- [ ] **Step 2: Inspect public copy manually for the three intended perceptions**

A reviewer should be able to answer yes to:

```text
Rayan Studio clearly builds software products and professional web experiences.
Engineering depth is visible through real work and case studies.
It is clear who the client works with and how to start a project.
```

This is a final human review, not a substitute for automated gates.

- [ ] **Step 3: Commit release evidence**

```bash
git add docs/redesign/release-checklist.md
git commit -m "docs: record redesign release verification"
```

- [ ] **Step 4: Use `superpowers:verification-before-completion` before claiming the redesign complete**

Do not report “done”, “fixed”, “all passing” or open the final merge PR until that skill verifies the actual current outputs.

---

## Lot 06 Final Gate

```text
[ ] Playwright + axe + tsx are dev-only dependencies.
[ ] E2E runs desktop and iPhone 13 Chromium projects.
[ ] FR/EN home, mega-menu, language switch, Work navigation are covered.
[ ] Mobile full-screen menu and Escape/focus behavior are covered.
[ ] Reduced-motion journey is covered.
[ ] Contact and Project flows are covered with mocked browser API responses.
[ ] Route-handler Vitest tests still cover real server logic with only provider boundary mocked.
[ ] All 70 local SEO URLs are HTTP-smoke tested.
[ ] All legacy redirects are browser/request tested as permanent redirects.
[ ] Axe finds no unresolved critical/serious accessibility violations on critical pages.
[ ] Media/legacy code cleanup is evidence-based and does not touch unrelated infrastructure.
[ ] CI preserves PostgreSQL scripts tests and adds copy/unit/build/Playwright gates.
[ ] Clean production build + smoke:routes + E2E all pass.
[ ] Release checklist contains actual PASS results for every mandatory item.
[ ] No public em dash, price exposure, fabricated proof or fake team language was introduced.
[ ] `superpowers:verification-before-completion` is run before final completion claim.
```
