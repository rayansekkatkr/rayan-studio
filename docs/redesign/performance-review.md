# Redesign performance and cleanup review

Date: 2026-08-12. Evidence-based review for the Lot 06 release gate. No Lighthouse or
performance scores are claimed here because none were measured.

## Client boundaries

37 `"use client"` files total. The redesign surface uses client components only where
interaction genuinely requires it:

- navigation: `site-header`, `mobile-menu`, `desktop-mega-menu`, `language-switch` (state, focus, scroll behavior);
- motion primitives: `reveal`, `fade`, `stagger`, `parallax-media` (framer-motion + `useReducedMotion`);
- forms: `contact-form`, `project-form`, `project-stepper`, `form-status` (controlled state);
- `project-readiness-tool` (interactive, no persistence);
- analytics: `tracked-link`, `FunnelTracking`, consent components.

Pages, content sections and case studies remain Server Components. No conversion of
interactive components was attempted for count-lowering.

## Hero / LCP

- The homepage H1 is rendered directly, without any Reveal/Fade wrapper: visible at first paint.
- Reduced-motion keeps the H1 and hero media visible (covered by `e2e/motion.spec.ts`,
  which asserts computed opacity > 0.9 and stable layout).
- `priority` is used exactly three times, all above-the-fold heroes:
  - dominant Pick4Me image in `home-hero.tsx`;
  - case-study hero image (`case-study-hero.tsx`);
  - secondary project hero (`project-summary-page.tsx`).
- Below-the-fold media (selected work, galleries, more-work grid, service proof) has no
  `priority` and lazy-loads through `next/image` defaults.
- Every `next/image` declares `sizes` and explicit dimensions or `fill` with a sized container.

## Media inventory (public/realisations)

| File | Size |
| --- | --- |
| docextract.png | 430K |
| goodcall.png | 476K |
| pick4me.png | 618K |
| pont-facturx.png | 482K |
| manteigaria-before.png | 1.8M |

All are genuine product screenshots served through the Next image optimizer (resized/webp
at request time), so shipped bytes are far below source sizes. `manteigaria-before.png`
(1.8M source) is not used on the homepage; it appears only on the Manteigaria summary page
and the More-work grid. Recompressing the source would require regenerating the screenshot
and was deliberately not done to avoid degrading real proof media. No autoplay video, no
stock imagery, no duplicated fake media files.

## Dead code and dependencies

Removed with usage proof (zero importers found by `rg` across `src/`):

- `src/components/ui/hero-liquid-shader.tsx` (only importer of the shader package);
- dependency `@paper-design/shaders-react` (uninstalled after the component removal;
  `rg` confirms no remaining reference).

Intentionally retained:

- `src/components/site/Navbar.tsx` and `Footer.tsx`: still imported by reachable routes
  (`/mentions-legales`, `/politique-confidentialite`, `/cgv`, and the retained
  `a-propos-methodologie-preuves` page source).
- `src/lib/service-seo.js` and `src/app/(localized)/[locale]/[service]/page.tsx`:
  migration evidence; the redirect coverage test reads `getAllServiceSeoPages()`.
- `ServiceSeoPage.tsx`: imported by the retained legacy `[service]` route implementation.
- Legacy homepage components (`HomePage`, `Hero`, `ProblemSolution`, `Services`,
  `Showcase`, `Process`, `Pricing`, `Testimonials`, `Faq`, `Contact`): unreachable at
  runtime (no route imports them) but kept as migration evidence through release, per the
  release-lot rule "when uncertain, keep and document". Their removal is a post-release
  cleanup candidate.

## Framework note (security follow-up)

The release runs on Next.js 15.5.21 / React 19.2.8 (upgraded from 14.2.35 / 18.3.1 as a
pre-merge security requirement). All App Router pages/layouts/metadata were migrated to the
async `params` / `headers()` APIs. Production `npm audit --omit=dev`: 0 high / 0 critical.

## Not done, deliberately

- No image quality reduction.
- No framework/bundle experiments.
- No performance numbers invented.
