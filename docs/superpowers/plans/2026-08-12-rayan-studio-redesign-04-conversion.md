# Rayan Studio Redesign Lot 04 Conversion and Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver separate protected `/contact` and start-a-project conversion flows while preserving Brevo delivery, abuse protection, user-entered data, cookie consent and purposeful funnel analytics.

**Architecture:** Extract form validation, escaping, rate limiting and Brevo delivery into tested shared server modules. Keep two independent API payload contracts for contact vs project intake. Add client forms with controlled state so recoverable errors never clear input. Migrate analytics through a documented event/section map while retaining the existing consent gate in `trackEvent`.

**Tech Stack:** Next.js route handlers, React client forms, TypeScript, Brevo HTTP API, GA4 via existing `trackEvent`, Vitest/Testing Library.

## Global Constraints

- No real Brevo email may be sent from automated tests.
- Both form APIs must implement honeypot, server validation, length limits, IP rate limiting and safe HTML email rendering.
- Honeypot detection returns HTTP 200 `{ ok: true }` without provider call, even if the same IP would otherwise be rate-limited.
- Rate limiting remains server-side. Client-only throttling is not sufficient.
- Recoverable UI errors keep all entered data.
- Contact and project forms have distinct analytics events.
- Analytics events remain blocked until analytics consent is accepted.
- Cookie consent can still be accepted, declined and reopened.
- Do not introduce advertising consent or tracking.
- Public copy contains no em dash.

---

### Task 1: Extract shared secure lead validation, rate limiting, escaping and Brevo provider boundary

**Files:**
- Create: `src/lib/forms/types.ts`
- Create: `src/lib/forms/validation.ts`
- Create: `src/lib/forms/rate-limit.ts`
- Create: `src/lib/forms/email-rendering.ts`
- Create: `src/lib/forms/brevo.ts`
- Create: `src/lib/forms/forms.test.ts`
- Read: `src/app/api/contact/route.ts`
- Read: `src/lib/contact-errors.js`

**Interfaces:**
- Produces `ContactSubmission`, `ProjectSubmission`, `validateContactSubmission`, `validateProjectSubmission`, `isRateLimited`, `renderContactEmail`, `renderProjectEmail`, `sendBrevoLeadEmail`.
- API routes in Tasks 2/3 must use these modules and must not reimplement their own regex/sanitization/escaping.

- [ ] **Step 1: Define payload types**

Create `src/lib/forms/types.ts`:

```ts
import type { Locale } from "@/lib/i18n";

export type ContactSubmission = {
  locale: Locale;
  name: string;
  email: string;
  subject: string;
  message: string;
  companyWebsite?: string;
};

export type ProjectType = "application" | "mvp" | "website" | "automation" | "backend" | "devops" | "other";
export type ProjectStage = "idea" | "requirements" | "design" | "existing-product" | "in-development";
export type ProjectTiming = "asap" | "1-3-months" | "3-6-months" | "undefined";

export type ProjectSubmission = {
  locale: Locale;
  projectType: ProjectType;
  stage: ProjectStage;
  objective: string;
  timing: ProjectTiming;
  name: string;
  company: string;
  email: string;
  budget?: string;
  companyWebsite?: string;
};

export type ValidationErrorCode =
  | "INVALID_REQUEST"
  | "MISSING_FIELDS"
  | "INVALID_EMAIL"
  | "INVALID_PROJECT_TYPE"
  | "INVALID_STAGE"
  | "INVALID_TIMING";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; code: ValidationErrorCode };
```

- [ ] **Step 2: Write failing validation/escaping tests**

Create tests for:

```ts
expect(validateContactSubmission({
  locale: "fr",
  name: " Rayan ",
  email: "rayan@example.com",
  subject: "Question",
  message: "Bonjour",
})).toEqual({
  ok: true,
  value: expect.objectContaining({ name: "Rayan" }),
});

expect(validateContactSubmission({
  locale: "fr",
  name: "Rayan",
  email: "not-an-email",
  subject: "Question",
  message: "Bonjour",
})).toEqual({ ok: false, code: "INVALID_EMAIL" });

expect(validateProjectSubmission({
  locale: "en",
  projectType: "unknown",
  stage: "idea",
  objective: "Build a platform",
  timing: "1-3-months",
  name: "Rayan",
  company: "Studio",
  email: "rayan@example.com",
})).toEqual({ ok: false, code: "INVALID_PROJECT_TYPE" });
```

Also assert `escapeHtml('<script>"x"</script>')` returns escaped entities and no literal `<script>`.

- [ ] **Step 3: Implement server validation with exact limits**

Use these maximum lengths:

```text
name: 100
email: 160
subject: 160
message: 5000
company: 160
budget: 120
objective: 6000
honeypot companyWebsite: inspect raw trimmed value only; never include in email
```

Allowed enum values are exactly the unions in `types.ts`. Use the existing simple email regex contract unless a stronger dependency-free validation is required; do not use DNS lookup.

`sanitizeText` must trim then slice to max length. Do not attempt destructive HTML sanitization on input; escape only when rendering HTML email.

- [ ] **Step 4: Implement server-side rate limiting**

Create `src/lib/forms/rate-limit.ts`:

```ts
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

type RateStore = Map<string, number[]>;

const globalForRateLimit = globalThis as typeof globalThis & {
  __rayanStudioLeadRateStore?: RateStore;
};

const requestLog = globalForRateLimit.__rayanStudioLeadRateStore ?? new Map<string, number[]>();
if (process.env.NODE_ENV !== "production") globalForRateLimit.__rayanStudioLeadRateStore = requestLog;

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (requestLog.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export function resetRateLimitForTests() {
  requestLog.clear();
}
```

The route key must include flow type so five contact submissions do not automatically consume five project-form slots:

```text
contact:<ip>
project:<ip>
```

- [ ] **Step 5: Write and pass rate-limit tests**

Test first five requests return `false`, sixth returns `true`, and a timestamp outside the 10-minute window expires.

- [ ] **Step 6: Implement safe email rendering**

`email-rendering.ts` exports:

```ts
export function escapeHtml(text: string): string;
export function renderContactEmail(value: ContactSubmission): { subject: string; textContent: string; htmlContent: string; tags: string[] };
export function renderProjectEmail(value: ProjectSubmission): { subject: string; textContent: string; htmlContent: string; tags: string[] };
```

Required tags:

```text
contact: lead-rayan-studio-contact
project: lead-rayan-studio-project
```

Email body must label every user field and escape every interpolated value in HTML. Never render the honeypot.

- [ ] **Step 7: Implement `sendBrevoLeadEmail` behind one provider boundary**

Signature:

```ts
export async function sendBrevoLeadEmail(input: {
  replyTo: { email: string; name: string };
  subject: string;
  textContent: string;
  htmlContent: string;
  tags: string[];
}): Promise<void>;
```

It reads existing environment variables:

```text
BREVO_API_KEY
BREVO_SENDER_EMAIL
BREVO_SENDER_NAME
BREVO_TO_EMAIL
```

Do not duplicate brand/provider configuration in both API routes.

On missing configuration, throw a typed provider error with code `EMAIL_CONFIG_MISSING`.
On non-2xx Brevo response, read at most the first 1000 chars for server logging and throw `EMAIL_PROVIDER_ERROR` without returning raw provider body to the browser.

- [ ] **Step 8: Mock `global.fetch` in provider tests**

Test successful request body contains escaped HTML and correct tag; test 500 provider response throws the typed error. Never use a real API key in test environment.

- [ ] **Step 9: Run and commit**

```bash
npm test -- src/lib/forms/forms.test.ts
npm run typecheck
git add src/lib/forms
git commit -m "refactor: extract protected lead submission core"
```

---

### Task 2: Refactor the contact API and build the canonical Contact page

**Files:**
- Modify: `src/app/api/contact/route.ts`
- Create: `src/app/api/contact/route.test.ts`
- Create: `src/app/(localized)/[locale]/contact/page.tsx`
- Create: `src/components/forms/contact-form.tsx`
- Create: `src/components/forms/form-status.tsx`
- Create: `src/components/forms/contact-form.test.tsx`

**Interfaces:**
- API accepts `ContactSubmission` JSON and returns `{ ok: true }` or `{ error: string, code: string }`.
- UI submits to `/api/contact` and retains controlled state on every non-success response.

- [ ] **Step 1: Write route tests before refactoring**

Required route tests:

1. malformed JSON -> 400 `INVALID_REQUEST`;
2. honeypot set -> 200 and mocked provider not called;
3. missing field -> 400 `MISSING_FIELDS`;
4. invalid email -> 400 `INVALID_EMAIL`;
5. sixth legitimate same-IP request -> 429 `RATE_LIMITED`;
6. valid request -> 200 and provider called once;
7. provider failure -> 502 `SEND_FAILED` without raw Brevo response body.

Use `vi.mock("@/lib/forms/brevo", ...)`. Reset rate store between tests.

- [ ] **Step 2: Refactor route execution order**

Required order:

```text
parse JSON
check honeypot -> successful no-op immediately
validate payload
derive IP
apply flow-specific rate limit
render safe email
call provider
return success
```

This order guarantees honeypot submissions remain successful no-op responses.

Preserve backward-compatible `error: string` for any old caller while adding stable `code` values.

Error code map:

```text
INVALID_REQUEST -> 400
MISSING_FIELDS -> 400
INVALID_EMAIL -> 400
RATE_LIMITED -> 429
EMAIL_CONFIG_MISSING -> 500
SEND_FAILED -> 502
```

- [ ] **Step 3: Implement localized Contact page metadata and shell**

FR hero:

```text
Une question ? Parlons-en.
```

EN:

```text
Have a question? Let's talk.
```

Fields:

```text
name
email
subject
message
companyWebsite honeypot
```

Use `buildLocalizedMetadata` with `/fr/contact` and `/en/contact`.

- [ ] **Step 4: Implement `ContactForm` as controlled state**

State shape:

```ts
type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  companyWebsite: string;
};
```

Status:

```ts
type SubmissionState = "idle" | "sending" | "success" | "error";
```

On error, do not call the form reset function and do not replace `formState`.
On success, reset only after server `ok: true`.

Honeypot input must be visually hidden, `tabIndex={-1}`, `autoComplete="off"`, and labelled in a way bots can discover while screen readers/users are not confused (`aria-hidden="true"`).

- [ ] **Step 5: Map API codes to localized user messages**

FR examples:

```text
INVALID_EMAIL: Adresse email invalide.
RATE_LIMITED: Trop de tentatives. Réessayez dans quelques minutes.
SEND_FAILED: Votre message n’a pas pu être envoyé. Vos informations sont conservées, vous pouvez réessayer.
```

EN natural equivalents. Never show raw provider errors.

- [ ] **Step 6: Write UI tests for data preservation**

Test:

- type all fields;
- mock API 502;
- submit;
- error message visible;
- every field still has the typed value.

Then mock success and assert success message.

- [ ] **Step 7: Run and commit**

```bash
npm test -- src/app/api/contact/route.test.ts src/components/forms/contact-form.test.tsx
npm run lint
npm run typecheck
git add src/app/api/contact src/app/'(localized)'/'[locale]'/contact src/components/forms
git commit -m "feat: add protected contact page"
```

---

### Task 3: Build the protected multi-step start-a-project flow

**Files:**
- Create: `src/app/api/project/route.ts`
- Create: `src/app/api/project/route.test.ts`
- Create: `src/app/(localized)/[locale]/demarrer-un-projet/page.tsx`
- Create: `src/app/(localized)/[locale]/start-a-project/page.tsx`
- Create: `src/components/forms/project-form.tsx`
- Create: `src/components/forms/project-stepper.tsx`
- Create: `src/components/forms/project-form.test.tsx`

**Interfaces:**
- API accepts `ProjectSubmission` JSON.
- Canonical FR route is `/fr/demarrer-un-projet`; canonical EN route is `/en/start-a-project`.

- [ ] **Step 1: Write API tests mirroring contact protection**

Required cases:

- honeypot -> 200 no provider call;
- invalid project type -> 400;
- invalid stage -> 400;
- invalid timing -> 400;
- missing objective/name/company/email -> 400;
- sixth same-flow request -> 429;
- valid request -> provider called once with project tag;
- provider failure -> 502 stable error code.

- [ ] **Step 2: Implement `/api/project` using the same protected core**

Do not copy/paste sanitizer/rate limiter/provider code from contact route.

Rate key:

```ts
`project:${ip}`
```

Email subject default can be:

```text
Nouveau projet - Rayan Studio
```

The email must clearly list:

```text
TYPE
ÉTAT DU PROJET / STAGE
TIMING
OBJECTIF / OBJECTIVE
NOM / NAME
ENTREPRISE / COMPANY
EMAIL
BUDGET (optional, `Non renseigné` / `Not provided` when empty)
```

- [ ] **Step 3: Implement exact five-step UX**

Step 1 Project type options:

```text
Application / SaaS
MVP
Site / refonte
Automatisation / IA
Backend / API
DevOps
Autre
```

Step 2 Current stage:

```text
Une idée
Cahier des charges
Design existant
Produit existant
Projet déjà en développement
```

Step 3 Objective: textarea.

Step 4 Timing:

```text
Dès que possible
1-3 mois
3-6 mois
Pas encore défini
```

Step 5 Contact:

```text
Nom
Entreprise
Email
Budget déjà défini ? (facultatif)
```

Add the hidden honeypot to the final payload, not as a visible step.

- [ ] **Step 4: Enforce step validation without losing previous answers**

Users cannot advance with no selection on required option steps or an empty objective. Back/Next must preserve state.

Do not require budget.

- [ ] **Step 5: Implement canonical route behavior**

`/fr/demarrer-un-projet` renders FR and redirects EN locale requests to `/en/start-a-project`.

`/en/start-a-project` renders EN and redirects FR locale requests to `/fr/demarrer-un-projet`.

Do not index `/en/demarrer-un-projet` or `/fr/start-a-project` as duplicate pages. Lot 05 adds permanent redirect rules; route-level redirect is a temporary correctness guard.

- [ ] **Step 6: Write component tests**

Required test journey:

```text
select Application / SaaS
Next
select Existing product
Next
enter objective
Next
select 1-3 months
Next
enter name/company/email
submit with mocked 502
assert all earlier answers still exist after navigating Back
retry with mocked success
assert success state
```

Also test budget remains optional.

- [ ] **Step 7: Run and commit**

```bash
npm test -- src/app/api/project/route.test.ts src/components/forms/project-form.test.tsx
npm run lint
npm run typecheck
npm run build
git add src/app/api/project src/app/'(localized)'/'[locale]'/demarrer-un-projet src/app/'(localized)'/'[locale]'/start-a-project src/components/forms/project-form.tsx src/components/forms/project-stepper.tsx src/components/forms/project-form.test.tsx
git commit -m "feat: add protected project intake flow"
```

---

### Task 4: Document and implement the analytics tracking migration

**Files:**
- Create: `docs/redesign/tracking-migration-map.md`
- Modify: `src/components/site/FunnelTracking.tsx`
- Modify: `src/lib/analytics.ts` only additively; keep `CONSENT_KEY`, `hasAnalyticsConsent`, `trackEvent` behavior.
- Create: `src/components/analytics/tracked-link.tsx`
- Create: `src/components/analytics/analytics.test.tsx`

**Interfaces:**
- Preserves event names `scroll_depth`, `section_view`.
- Produces reusable `TrackedLink` for CTA/navigation events.

- [ ] **Step 1: Create the explicit tracking migration map**

Use this exact map:

```md
# Tracking migration map

## Homepage section_view

| Old section | New section | Decision |
| --- | --- | --- |
| hero | hero | preserve name |
| probleme-solution | none | retire; content no longer exists as a dedicated section |
| services | services | preserve name |
| realisations | selected-work | rename |
| process | method | rename |
| tarifs | offers | rename |
| temoignages | none | retire; no testimonial section in approved V1 |
| faq | none on homepage | retire homepage section; FAQ is now a dedicated Studio page |
| contact | final-cta | rename homepage endpoint; contact is now a dedicated page |

New section_view IDs:
hero, expertise, selected-work, services, studio, method, offers, insights, final-cta

## Preserved events
- scroll_depth { threshold }
- section_view { section_id, page_path? }
- cookie_consent { choice: accepted } when analytics consent is granted

## CTA event
- cta_click { cta_id, source, destination, locale }

Approved cta_id values:
- hero_start_project
- hero_view_work
- nav_start_project
- home_services
- home_studio
- home_method
- home_offers
- home_insights
- final_start_project
- service_start_project
- case_study_start_project
- contact_submit
- project_submit

## Form events
Contact:
- contact_form_start
- contact_form_submit
- contact_form_success
- contact_form_error { code }

Project:
- project_form_start
- project_form_step { step }
- project_form_submit
- project_form_success
- project_form_error { code }
```

Do not add advertising, fingerprinting or personally identifying form values to analytics payloads.

- [ ] **Step 2: Make `FunnelTracking` route-aware but preserve event names**

Change signature:

```ts
export function FunnelTracking({
  sectionIds,
}: {
  sectionIds?: readonly string[];
})
```

Default new homepage IDs:

```ts
const HOME_SECTION_IDS = [
  "hero",
  "expertise",
  "selected-work",
  "services",
  "studio",
  "method",
  "offers",
  "insights",
  "final-cta",
] as const;
```

Keep scroll thresholds `[25, 50, 75, 90]` and IntersectionObserver threshold `0.45` unless tests demonstrate a regression.

- [ ] **Step 3: Implement `TrackedLink`**

Props:

```ts
type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  event: {
    ctaId: string;
    source: string;
    destination: string;
    locale: Locale;
  };
};
```

On click:

```ts
trackEvent("cta_click", {
  cta_id: event.ctaId,
  source: event.source,
  destination: event.destination,
  locale: event.locale,
});
```

Then allow normal Link navigation. `trackEvent` itself enforces consent.

- [ ] **Step 4: Write analytics tests**

Mock localStorage and `window.gtag`.

Assertions:

- no event sent when consent absent;
- no event sent when consent is `declined`;
- event sent when consent is `accepted`;
- `TrackedLink` emits `cta_click` with no name/email/form content.

- [ ] **Step 5: Run and commit**

```bash
npm test -- src/components/analytics/analytics.test.tsx
npm run typecheck
git add docs/redesign/tracking-migration-map.md src/components/site/FunnelTracking.tsx src/lib/analytics.ts src/components/analytics
git commit -m "feat: migrate consent-aware funnel tracking"
```

---

### Task 5: Preserve and test cookie consent accept/decline/reopen behavior

**Files:**
- Modify only if needed for new styling/i18n: `src/components/site/CookieConsent.tsx`
- Modify only if needed: `src/components/site/AnalyticsLoader.tsx`
- Keep: `src/components/site/ManageCookiesButton.tsx`
- Create: `src/components/site/CookieConsent.test.tsx`

**Interfaces:**
- Must preserve `CONSENT_KEY = "rayan_cookie_consent_v1"` to avoid invalidating existing user choice without a privacy reason.
- Must preserve `rs-open-consent`, `rs-consent-granted`, `rs-consent-revoked` events unless all listeners are migrated atomically.

- [ ] **Step 1: Write consent behavior tests**

Test:

1. no saved choice -> banner visible;
2. click Accept -> localStorage `accepted`, granted event dispatched, banner hidden;
3. click Decline -> localStorage `declined`, revoked event dispatched, banner hidden;
4. dispatch `rs-open-consent` after saved choice -> banner visible again;
5. FR pathname renders FR copy; EN pathname renders EN copy.

- [ ] **Step 2: Restyle using the new token system without changing semantics**

No warm orange hard-coded colors in the refreshed consent UI. Keep privacy link to `/politique-confidentialite` and both Accept/Decline choices equally reachable.

- [ ] **Step 3: Verify AnalyticsLoader remains consent-gated**

Do not load Google Tag script before `hasAnalyticsConsent()` is true. Declining after enabling must update consent to denied and stop future local event dispatch through `trackEvent`.

It is acceptable that a previously loaded script remains in the DOM after revocation; analytics storage must be denied and `trackEvent` must no longer emit events.

- [ ] **Step 4: Run and commit**

```bash
npm test -- src/components/site/CookieConsent.test.tsx src/components/analytics/analytics.test.tsx
npm run lint
npm run typecheck
git add src/components/site/CookieConsent.tsx src/components/site/AnalyticsLoader.tsx src/components/site/ManageCookiesButton.tsx src/components/site/CookieConsent.test.tsx
git commit -m "test: preserve analytics consent controls"
```

---

### Task 6: Wire CTA and form analytics into the new commercial site

**Files:**
- Modify: `src/components/home/home-hero.tsx`
- Modify: `src/components/home/services-overview.tsx`
- Modify: `src/components/home/studio-intro.tsx`
- Modify: `src/components/home/method-preview.tsx`
- Modify: `src/components/home/offers-preview.tsx`
- Modify: `src/components/home/insights-preview.tsx`
- Modify: `src/components/home/final-cta.tsx`
- Modify: `src/components/navigation/site-header.tsx`
- Modify: `src/components/services/service-page.tsx`
- Modify: `src/components/work/case-study-page.tsx`
- Modify: `src/components/forms/contact-form.tsx`
- Modify: `src/components/forms/project-form.tsx`
- Modify: `src/components/home/home-page.tsx`

**Interfaces:**
- All major CTA links use `TrackedLink`.
- Forms emit their dedicated events through `trackEvent`, never through URL query strings.

- [ ] **Step 1: Mount `FunnelTracking` on the new homepage**

Place it once inside `HomePage`. Do not mount a second observer through layout/shell.

- [ ] **Step 2: Replace major CTA Links with `TrackedLink` using approved IDs**

Mapping:

```text
Hero start project -> hero_start_project
Hero work -> hero_view_work
Header CTA -> nav_start_project
Services overview -> home_services
Studio intro -> home_studio
Method preview -> home_method
Offers preview -> home_offers
Insights preview -> home_insights
Final CTA -> final_start_project
Service final CTA -> service_start_project
Case-study final CTA -> case_study_start_project
```

Do not track every footer/legal link.

- [ ] **Step 3: Add contact form lifecycle events**

Emit once on first meaningful field interaction:

```text
contact_form_start
```

On submit attempt after client validation:

```text
contact_form_submit
```

On server success:

```text
contact_form_success
```

On server/API/network error:

```text
contact_form_error { code }
```

Never send name, email, subject or message to analytics.

- [ ] **Step 4: Add project-form lifecycle events**

First interaction:

```text
project_form_start
```

After each successful Next transition:

```text
project_form_step { step: 1..5 }
```

Final submit/success/error use approved event names. Do not send objective/company/email/budget values to analytics.

- [ ] **Step 5: Extend tests to assert PII is absent**

Capture mocked `gtag` calls after consent and assert serialized event params do not contain a typed email address or message body.

- [ ] **Step 6: Run complete Lot 04 gate**

```bash
npm run lint
npm run typecheck
npm test
npm --prefix scripts test
npm run build
```

Expected: all `0`.

- [ ] **Step 7: Commit**

```bash
git add src/components/home src/components/navigation src/components/services src/components/work src/components/forms
git commit -m "feat: wire conversion analytics across redesign"
```

---

## Lot 04 Review Gate

```text
[ ] /fr/contact and /en/contact exist and submit through /api/contact.
[ ] /fr/demarrer-un-projet and /en/start-a-project exist.
[ ] Both APIs return successful no-op for honeypot before rate-limit/provider work.
[ ] Both APIs enforce server validation and independent flow-specific rate limits.
[ ] HTML emails escape every user-provided value.
[ ] Automated tests mock Brevo and never send a real email.
[ ] Contact fields survive recoverable errors.
[ ] Project selections/fields survive Back navigation and recoverable errors.
[ ] Budget remains optional.
[ ] Tracking migration map exists with old -> new section decisions.
[ ] scroll_depth and section_view are preserved.
[ ] CTA/form events are distinct and contain no PII.
[ ] No analytics event is emitted before consent.
[ ] Accept, Decline and Reopen consent flows work in FR/EN.
[ ] Existing CONSENT_KEY and consent custom-event contract remain compatible.
[ ] Public conversion copy contains no em dash.
[ ] lint, typecheck, unit tests, scripts tests and build all pass.
```
