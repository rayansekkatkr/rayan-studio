# Rayan Studio Software Studio Redesign - Review Amendment

Date: 2026-08-12
Status: normative amendment to the redesign design spec, awaiting user review

This document closes the review gaps found after the first design-spec review. It is part of the same redesign specification and overrides the original document where a point below is more explicit or uses different wording.

## 1. Preserve the 70 local SEO landing pages

The existing local SEO surface at `/site/[sector]/[city]` is an acquired SEO asset and is explicitly preserved in V1.

The current implementation generates 7 sectors across 10 cities, for 70 local landing-page combinations. These routes also remain included in the sitemap.

Decision:

- keep all existing `/site/[sector]/[city]` routes live during the redesign;
- do not fold them into the new `/[locale]/services/...` information architecture;
- do not remove them merely because they are absent from the primary navbar;
- preserve their current search intent, structured data, canonical behavior and internal-link value unless an individual page is deliberately improved;
- audit their visual shell after the new design system exists so they do not look like a broken second website;
- keep the local pages focused on their existing small-business/local intent, while the main brand site adopts the new software-studio positioning;
- if a local page is ever retired, create a one-to-one permanent redirect to the closest genuinely equivalent page. Never mass-redirect the 70 pages to the homepage or to a generic service page without intent equivalence.

These pages are therefore a preserved legacy/acquisition surface, not a removed part of the redesign.

## 2. Preserve analytics, funnel tracking and cookie consent

The redesign must preserve the existing analytics and consent behavior rather than replacing or silently dropping it.

Required preserved capabilities:

- analytics loading remains consent-aware;
- the cookie-consent UI remains available in FR and EN;
- accepting or declining analytics cookies continues to update consent correctly;
- the ability to reopen/manage cookie consent remains available;
- existing `scroll_depth` tracking remains supported;
- existing `section_view` tracking remains supported;
- CTA events and form conversion events remain tracked where they exist today;
- tracking is adapted to the new homepage section IDs and new conversion paths rather than retaining obsolete section names;
- `/contact` and `/demarrer-un-projet` have distinct measurable conversion events;
- navigation to case studies and service pages can be measured where useful, but analytics must remain lightweight and purposeful.

The redesign must not introduce analytics that bypass user consent.

Implementation planning must include a tracking migration map that lists old event/section names, new event/section names, events preserved unchanged and events intentionally retired.

## 3. Preserve form abuse protection in both contact flows

The existing form infrastructure includes abuse-protection behavior. The redesign must preserve that protection explicitly for both `/contact` and `/demarrer-un-projet`.

Requirements:

- retain a honeypot or an equivalent non-intrusive bot trap;
- retain server-side rate limiting or replace it only with a demonstrably stronger server-side mechanism;
- keep server-side validation and input length limits;
- keep output escaping/safe email rendering;
- never rely only on client-side validation;
- return a successful no-op response for detected honeypot submissions so the trap does not reveal itself;
- preserve user-entered form data on recoverable submission errors;
- the multi-step project form must not create a bypass around the protections used by the simpler contact form.

If the implementation changes the rate-limit storage mechanism for production robustness, that is an implementation choice, not permission to remove rate limiting.

## 4. End-to-end testing is new infrastructure

The target E2E coverage in the main spec requires new site-testing infrastructure. The current application dependencies do not include Playwright, so the implementation plan must treat this as a real setup task rather than assuming an existing suite.

Decision:

- use Playwright for browser-level E2E coverage unless the implementation plan identifies a concrete reason to choose another tool;
- scope the first suite to critical journeys rather than attempting exhaustive browser testing;
- include installation, configuration, test fixtures, CI execution and maintenance cost in the implementation plan;
- make the suite deterministic and independent of sending real production emails;
- cover at minimum FR/EN rendering, navigation and mega-menus, language switching, flagship project navigation, contact validation/submission behavior, start-a-project behavior, error-state data preservation and the key mobile menu flow;
- keep unit/component tests separate from E2E responsibilities.

The plan must identify which tests can use mocked email/provider boundaries and which behavior requires an integration-level assertion.

## 5. Update project guidance when implementation starts

The new 70% software / 30% web positioning intentionally supersedes the old public-facing TPE-first positioning.

At the beginning of implementation, documentation that still instructs coding agents or contributors to optimize the public site primarily for TPE/local-site redesign must be aligned with the approved redesign.

Required documentation review:

- `PROJECT_MEMORY.md`;
- `CLAUDE.md` if present in the implementation workspace/repository;
- other contributor/agent guidance that states the superseded positioning.

Rules:

- update only the sections that conflict with the new public positioning;
- preserve historical records and prospection-specific constraints where they remain relevant;
- explicitly distinguish the new public brand positioning from the existing local SEO and outreach acquisition surfaces;
- do not rewrite unrelated project memory.

This documentation alignment belongs to the implementation plan and should happen before large copy/design work so later agents do not revert the approved direction.

## 6. Public-facing copy must avoid em dashes

Public-facing website copy must not use the em dash character `—`.

The original example:

`Rayan Sekkat — Software Engineer & Founder`

is replaced by either:

`Rayan Sekkat · Software Engineer & Founder`

or a two-line treatment:

```text
Rayan Sekkat
Software Engineer & Founder
```

The same rule applies to FR and EN public copy, CTAs, headings, project metadata and editorial content. Punctuation inside internal design/spec documents is not a visual/copy requirement, but implementation copy must follow this rule.

## 7. Additions to launch criteria

In addition to the launch criteria in the main spec, release is blocked unless:

- all 70 `/site/[sector]/[city]` routes still resolve correctly or have individually approved intent-equivalent redirects;
- local SEO routes remain represented correctly in the sitemap;
- cookie consent and consent-aware analytics still work;
- the updated funnel/CTA tracking map is implemented;
- honeypot, server validation and rate limiting protect both contact flows;
- the initial Playwright E2E suite runs in the verification pipeline;
- project guidance no longer contradicts the approved public positioning;
- a public-copy scan finds no em dash characters in shipped FR/EN marketing content.

## 8. Implementation-plan requirements created by this amendment

The implementation plan must explicitly budget tasks for:

1. local SEO route preservation and visual-shell compatibility;
2. analytics/consent/tracking migration;
3. contact and project-intake abuse protection;
4. Playwright setup and critical-flow E2E tests;
5. `PROJECT_MEMORY.md` / agent-guidance alignment;
6. public-copy punctuation validation.

None of these items should be left as an implicit cleanup task at the end of the redesign.
