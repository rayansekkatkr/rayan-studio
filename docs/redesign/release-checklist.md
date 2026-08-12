# Rayan Studio redesign release checklist

## Framework security
- Next.js upgraded from 14.2.35 to 15.5.21 (maintenance LTS) with React 19.2.8 before release.
- App Router params/headers migrated to the async Next 15 APIs (no sync compat shim retained).
- Transitive advisories remediated via npm overrides: postcss deduped to 8.5.26, sharp forced to 0.35.3.
- No high or critical vulnerabilities reported by `npm audit --omit=dev` at release verification
  time (0 critical / 0 high / 0 moderate / 0 low against the official npm registry).
- The full production gate below was re-run on Next 15.5.21.

Date: 2026-08-12. Every result below is the actual outcome of the Lot 06 final clean gate
(fresh `npm ci` after `rm -rf node_modules .next`), with the E2E and smoke runs executed
against the production build (`next start`, port 3000), not the dev server.

## Routes
- FR core pages: PASS (E2E + smoke, 141 canonical routes 2xx)
- EN core pages: PASS (E2E + smoke)
- 70 local SEO routes: PASS (all 70 return HTTP 200 with redirects disabled)
- Legacy redirect map: PASS (15/15 sources return 308 with exact Location, no chain, no /site/ source)

## Conversion
- Contact success/error preservation: PASS (E2E with mocked browser API, desktop + mobile)
- Project flow success/error preservation: PASS (all 5 steps preserved after mocked 502, retry succeeds)
- Honeypot tests: PASS (Vitest route tests: no-op 200 before rate limit, no provider call)
- Rate-limit tests: PASS (Vitest: 6th same-flow request 429, flows independent)
- Brevo provider mocked in automation: PASS (no automated test performs a real Brevo request)

## Analytics/privacy
- Consent accept: PASS (unit tests)
- Consent decline: PASS (unit tests)
- Consent reopen: PASS (rs-open-consent unit test)
- scroll_depth: PASS (thresholds 25/50/75/90 preserved)
- section_view new IDs: PASS (9 homepage section IDs observed)
- Contact/project distinct events: PASS (separate lifecycle events, PII-exclusion tests green)

## Accessibility/responsive
- Desktop Chromium: PASS (Playwright chromium-desktop, 0 failures)
- Mobile Chromium: PASS (iPhone 13 profile forced to Chromium, 0 failures)
- Reduced motion: PASS (H1/media visible and stable, navigation and CTAs usable)
- Axe critical pages: PASS (10 pages × 2 profiles, wcag2a/wcag2aa/wcag21a/wcag21aa, 0 violations)
- Cookie consent banner: PASS (real CookieConsent mounted with the non-production GA test id
  `G-TEST` provided by the Playwright webServer env, FR banner scanned by Axe while visible on
  both profiles with 0 violations, EN banner render also asserted; ordinary E2E tests pre-set
  consent to "declined" so no Google Tag Manager request occurs)

## Quality (final clean gate results)
- npm run lint: PASS (No issues found)
- npm run typecheck: PASS (exit 0)
- npm run check:copy: PASS (no em dash in shipped public copy)
- npm test: PASS ×3 consecutive (32 files, 141/141 each run)
- npm --prefix scripts test: PASS (124 tests: 123 pass, 0 fail, 1 pre-existing skip)
- npm run build: PASS (exit 0, 167 static pages)
- npm run test:e2e: PASS (89 passed, 0 failed, 11 expected device-scoped skips, 0 retries, against
  next start built and served with NEXT_PUBLIC_GA_ID=G-TEST so the consent scan executed there)
- npm run smoke:routes: PASS (141 canonical routes, including 70 local SEO routes, all 2xx)

## Human perception review

Reviewed on the rendered production pages (home, services, work, case studies, studio, offers,
contact, project intake):

1. Rayan Studio clearly builds software products and professional web experiences: YES
   (software-first hero, six software/web services, real product case studies).
2. Engineering depth is visible through real work and case studies: YES
   (three flagship case studies with verified architecture/engineering sections and real media).
3. It is clear who the client works with and how to start a project: YES
   (Rayan Sekkat studio pages, single point of contact messaging, canonical start-a-project flow
   linked from every major CTA).

No positioning contradiction found; no approved copy was altered during this review.
