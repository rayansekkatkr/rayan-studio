# Rayan Studio Redesign Lot 02 Core Commercial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut the main public brand over to the approved software-studio positioning with the new homepage, six service pages, Studio pages, Offers and FAQ in FR and EN.

**Architecture:** Reuse the Lot 01 route/content/design/navigation foundation. Introduce lightweight route files that resolve centralized content and render shared Server Components; isolate only animation/navigation behavior as client components. Keep legacy SEO routes alive until Lot 05 installs the explicit redirect map.

**Tech Stack:** Existing Next.js App Router, React 18, TypeScript, Tailwind, Framer Motion, Lot 01 Vitest/Testing Library infrastructure.

## Global Constraints

- Follow the master plan and both validated spec files.
- Public homepage order is exact: Hero → expertise strip → Pick4Me → Pont Factur-X → GoodCall → services → Rayan Studio → method → offers → insights → final CTA.
- Hero and strong sections are dark; Pick4Me light; Pont Factur-X dark; GoodCall light; services off-white; Rayan Studio dark; method light; insights off-white; final CTA dark.
- Homepage top three work order is exactly Pick4Me, Pont Factur-X, GoodCall.
- Do not show public prices anywhere.
- `Offres` is the FR page name, `Offers` is EN.
- First-response promise is 24 business hours, not a guaranteed complete quote in 24 hours.
- Public marketing copy must not contain `—`.
- Do not delete or redirect old service/acquisition routes in this lot.
- Do not change analytics events in this lot beyond preserving the existing `FunnelTracking` component; Lot 04 owns the event migration.

---

### Task 1: Add shared commercial page shell and bilingual metadata helpers

**Files:**
- Create: `src/components/layout/commercial-page-shell.tsx`
- Create: `src/components/layout/page-hero.tsx`
- Create: `src/lib/seo.ts`
- Create: `src/lib/seo.test.ts`
- Modify: `src/app/(localized)/[locale]/layout.tsx` only if needed to expose a stable locale context; do not mount global header/footer there yet.

**Interfaces:**
- Consumes: `SiteHeader`, `SiteFooter`, `Locale`, route helpers, `BRAND`, `getSiteUrl`.
- Produces: `CommercialPageShell`, `PageHero`, `buildLocalizedMetadata`, `buildBreadcrumbJsonLd`.

- [ ] **Step 1: Write the failing metadata helper test**

Create `src/lib/seo.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { buildLocalizedMetadata } from "@/lib/seo";

describe("buildLocalizedMetadata", () => {
  it("creates canonical, FR/EN alternates and x-default", () => {
    const metadata = buildLocalizedMetadata({
      locale: "en",
      title: "Web applications & SaaS",
      description: "Custom web products built around real business needs.",
      path: "/en/services/web-applications-saas",
      alternatePath: "/fr/services/applications-web-saas",
    });

    expect(metadata.alternates?.canonical).toBe("/en/services/web-applications-saas");
    expect(metadata.alternates?.languages).toEqual({
      fr: "/fr/services/applications-web-saas",
      en: "/en/services/web-applications-saas",
      "x-default": "/fr/services/applications-web-saas",
    });
    expect(metadata.openGraph).toMatchObject({ locale: "en_US", url: "/en/services/web-applications-saas" });
  });
});
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/lib/seo.test.ts
```

Expected: module does not exist.

- [ ] **Step 3: Implement `buildLocalizedMetadata`**

Use this signature:

```ts
import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";

export function buildLocalizedMetadata(input: {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  alternatePath: string;
  image?: string;
}): Metadata;
```

Rules:

- `title` is passed as the page title and relies on the root title template.
- canonical equals `path`.
- languages pair the FR path and EN path regardless of which locale is current.
- `x-default` is always the FR path.
- Open Graph locale is `fr_FR` / `en_US`.
- OG/Twitter title/description are localized and must not fall back to old small-business copy.
- Default OG image remains `/og-image` unless a project/service-specific image is supplied.

- [ ] **Step 4: Implement `buildBreadcrumbJsonLd`**

Use:

```ts
export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}
```

Callers may convert relative paths to absolute URLs when embedding structured data.

- [ ] **Step 5: Implement `CommercialPageShell`**

Server-compatible component:

```tsx
export function CommercialPageShell({
  locale,
  children,
  className,
}: {
  locale: Locale;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main-content" className={cn("min-h-screen bg-rs-bg text-rs-fg", className)}>
        {children}
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
```

Do not place `FunnelTracking` here yet; Lot 04 will mount route-aware tracking deliberately.

- [ ] **Step 6: Implement reusable `PageHero`**

Props:

```ts
type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  theme?: "light" | "dark";
  children?: React.ReactNode;
};
```

Use large type, generous whitespace and no generic glass card. `children` is for real project/service visual proof.

- [ ] **Step 7: Run tests/checks and commit**

```bash
npm test -- src/lib/seo.test.ts
npm run lint
npm run typecheck
git add src/components/layout src/lib/seo.ts src/lib/seo.test.ts src/app/'(localized)'/'[locale]'/layout.tsx
git commit -m "feat: add commercial page shell and metadata helpers"
```

---

### Task 2: Build the new homepage from focused components and cut over `/<locale>`

**Files:**
- Create: `src/components/home/home-page.tsx`
- Create: `src/components/home/home-hero.tsx`
- Create: `src/components/home/expertise-strip.tsx`
- Create: `src/components/home/selected-work.tsx`
- Create: `src/components/home/services-overview.tsx`
- Create: `src/components/home/studio-intro.tsx`
- Create: `src/components/home/method-preview.tsx`
- Create: `src/components/home/offers-preview.tsx`
- Create: `src/components/home/insights-preview.tsx`
- Create: `src/components/home/final-cta.tsx`
- Create: `src/components/home/home-page.test.tsx`
- Modify: `src/app/(localized)/[locale]/page.tsx`
- Modify: `src/app/_shared/root.tsx` metadata defaults to software-studio wording while preserving verification/robots/icons/consent infrastructure.
- Read only initially: `src/components/site/HomePage.tsx`, `Hero.tsx`, `Showcase.tsx`, `Services.tsx`, `Pricing.tsx`.

**Interfaces:**
- Consumes: `CommercialPageShell`, `FEATURED_PROJECTS`, `SERVICES`, route helpers, motion primitives.
- Produces: `<HomePage locale />` and the new canonical `/<locale>` experience.

- [ ] **Step 1: Write a failing semantic order test**

Create `src/components/home/home-page.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomePage } from "@/components/home/home-page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

describe("HomePage", () => {
  it("renders the approved homepage section order", () => {
    const { container } = render(<HomePage locale="fr" />);
    const ids = Array.from(container.querySelectorAll("[data-home-section]"), (node) => node.id);
    expect(ids).toEqual([
      "hero",
      "expertise",
      "selected-work",
      "services",
      "studio",
      "method",
      "offers",
      "insights",
      "final-cta",
    ]);
  });

  it("renders featured projects in the exact approved order", () => {
    const { container } = render(<HomePage locale="fr" />);
    const projectKeys = Array.from(container.querySelectorAll("[data-featured-project]"), (node) =>
      node.getAttribute("data-featured-project"),
    );
    expect(projectKeys).toEqual(["pick4me", "pont-facturx", "goodcall"]);
  });
});
```

If Framer Motion makes the jsdom test noisy, mock only the motion primitive modules at the test boundary; do not replace semantic page components with mocks.

- [ ] **Step 2: Run and confirm failure**

```bash
npm test -- src/components/home/home-page.test.tsx
```

Expected: missing new home module.

- [ ] **Step 3: Implement `HomeHero` with the exact approved FR copy**

FR:

```text
H1: Des produits digitaux conçus pour faire avancer votre entreprise.
Body: Applications, plateformes et expériences web conçues pour résoudre de vrais problèmes, simplifier vos opérations et soutenir votre croissance.
Primary CTA: Parler de votre projet
Secondary CTA: Voir nos réalisations
```

EN must be natural, not literal word-for-word:

```text
H1: Digital products built to move your business forward.
Body: Applications, platforms and web experiences designed to solve real problems, simplify operations and support growth.
Primary CTA: Start a project
Secondary CTA: View our work
```

Visual rules:

- dark hero;
- real images only from Pick4Me, Pont Factur-X and GoodCall;
- one dominant product surface, two supporting surfaces;
- use `ParallaxMedia` for gentle depth;
- no generic dashboard artwork, no autoplay video, no shader background;
- use `priority` only for the dominant hero image;
- explicitly size every image.

- [ ] **Step 4: Implement `ExpertiseStrip`**

Exact line in both locales:

```text
Product Design · Software Engineering · Web · Automation · Cloud
```

No counters, ratings or client logo wall.

- [ ] **Step 5: Implement `SelectedWork`**

Render `FEATURED_PROJECTS` in order and assign:

```text
Pick4Me: light section, visual on right at wide desktop
Pont Factur-X: dark section, visual on left at wide desktop
GoodCall: light section, near-full-width visual treatment
```

Each block has `data-featured-project={project.key}` and contains:

- project name;
- localized categories;
- one concise localized summary from project registry;
- link to `workPath(locale, project.slug)`;
- real image via `next/image`.

Do not repeat all case-study copy on the homepage.

- [ ] **Step 6: Implement `ServicesOverview` using two editorial groups, never six equal cards**

FR groups:

```text
SOFTWARE
Applications web & SaaS
MVP & produits digitaux
APIs & backends
Automatisation & IA

WEB & INFRASTRUCTURE
Sites premium & refonte
DevOps, cloud & déploiement
```

Every service row is a large text link using `servicePath`; CTA is `Découvrir nos services` / `Explore our services` to `/${locale}/services`.

- [ ] **Step 7: Implement `StudioIntro`**

FR headline:

```text
La souplesse d’un studio indépendant. La rigueur d’une équipe produit.
```

FR body direction, with no fabricated team implication:

```text
Vous échangez directement avec la personne qui conçoit et développe votre projet. Moins d’intermédiaires, davantage de continuité entre produit, design, développement et mise en production.
```

Principles:

```text
Un interlocuteur
De l’idée à la production
Architecture pensée pour durer
Communication claire
```

Link to `studioPath(locale, "studio")`.

If no approved professional portrait exists in repository assets, ship the section without a portrait. Do not add a stock portrait or AI-generated likeness.

- [ ] **Step 8: Implement `MethodPreview`**

Exactly five stages:

```text
01 Discover
02 Design
03 Build
04 Launch
05 Improve
```

Localized one-line descriptions may be concise. Link to `studioPath(locale, "method")`.

- [ ] **Step 9: Implement `OffersPreview`**

Exactly four engagement types:

```text
Applications & plateformes
MVP & lancement
Sites premium & refonte
Accompagnement continu
```

EN natural equivalents. Include:

```text
FR: Première réponse sous 24h ouvrées.
EN: First response within 24 business hours.
```

No amount, currency symbol, starting price or pseudo-price. Link to `studioPath(locale, "offers")`.

- [ ] **Step 10: Implement `InsightsPreview` as a launch-safe editorial shell**

Until Lot 05 registers individual insight records, show three editorial entries but link them to category pages, not invented article slugs:

```text
Guide: Comment préparer un projet SaaS -> /insights/guides
Checklist: Lancer un MVP -> /insights/checklists
Guide: Refonte ou reconstruction ? -> /insights/guides
```

Lot 05 replaces these category links with real article links atomically when the records exist.

- [ ] **Step 11: Implement `FinalCta`**

FR:

```text
Vous avez quelque chose à construire ?
Parlons de votre projet, de votre idée ou du problème que vous cherchez à résoudre.
Parler de votre projet
```

EN natural equivalent. Link to `startProjectPath(locale)`.

- [ ] **Step 12: Compose the homepage with exact chromatic rhythm**

`home-page.tsx` must mark each section wrapper with `data-home-section` and the exact IDs from the test.

Do not dynamically reorder sections by viewport.

- [ ] **Step 13: Replace the old homepage import in the locale route**

`src/app/(localized)/[locale]/page.tsx` must import `@/components/home/home-page` and generate new localized metadata:

FR title direction: `Studio software, SaaS et expériences web sur mesure`

EN title direction: `Software studio for SaaS, web applications and digital products`

Use `buildLocalizedMetadata` with canonical `/fr` and `/en` and `x-default` FR.

- [ ] **Step 14: Replace root metadata defaults in `src/app/_shared/root.tsx`**

Default title/description must reflect the new software-studio positioning, not “refonte de sites pour petites entreprises”. Preserve icons, robots, verification, analytics components, viewport and skip link.

Do not use a global French Open Graph description for EN child pages; child metadata must override localized fields.

- [ ] **Step 15: Replace homepage structured data with honest studio schema**

In the new homepage render a graph containing:

- `Person` for `BRAND.founder`;
- `ProfessionalService` for Rayan Studio;
- `WebSite`;
- localized `WebPage`.

Do not emit `LocalBusiness` without a proper local-business address. Do not emit `priceRange` as a substitute for hidden public pricing. Do not emit fake `aggregateRating` or customer reviews.

- [ ] **Step 16: Run the home tests and full checks**

```bash
npm test -- src/components/home/home-page.test.tsx src/lib/seo.test.ts
npm run lint
npm run typecheck
npm run build
```

Expected: all PASS.

- [ ] **Step 17: Commit**

```bash
git add src/components/home src/app/'(localized)'/'[locale]'/page.tsx src/app/_shared/root.tsx
git commit -m "feat: launch software studio homepage"
```

---

### Task 3: Implement the Services overview and six localized service routes

**Files:**
- Create: `src/app/(localized)/[locale]/services/page.tsx`
- Create: `src/app/(localized)/[locale]/services/[slug]/page.tsx`
- Create: `src/components/services/services-index.tsx`
- Create: `src/components/services/service-page.tsx`
- Create: `src/components/services/service-proof.tsx`
- Create: `src/components/services/service-page.test.tsx`

**Interfaces:**
- Consumes: `SERVICES`, `getService`, `resolveServiceSlug`, `servicePath`, project registry, metadata helpers.
- Produces: twelve canonical localized service detail URLs plus two locale overview URLs.

- [ ] **Step 1: Write the failing page-render contract test**

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { ServicePage } from "@/components/services/service-page";
import { getService } from "@/content/services";

it("renders business need before engineering and technology", () => {
  const { container } = render(<ServicePage locale="fr" service={getService("applications")} />);
  const sections = Array.from(container.querySelectorAll("[data-service-section]"), (node) =>
    node.getAttribute("data-service-section"),
  );
  expect(sections).toEqual(["hero", "need", "use-cases", "approach", "engineering", "proof", "faq", "cta"]);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/produits web conçus autour de votre métier/i);
});
```

- [ ] **Step 2: Implement `ServicesIndex`**

The `/services` page is a real overview, not an empty redirect. It uses the same two groups as the homepage but adds one concise sentence per service and a final start-project CTA.

Metadata:

```text
FR title: Services software, web et cloud
EN title: Software, web and cloud services
```

- [ ] **Step 3: Implement `ServicePage` with exact section order**

Sections:

```text
hero
need
use-cases
approach
engineering
proof
faq
cta
```

Rules:

- Client problem before stack.
- Engineering section can list architecture, APIs, auth/permissions, payments, performance, CI/CD, monitoring and security only when relevant to the service record.
- Technologies are a compact line/list after engineering, never a logo wall.
- Proof links use real project records. Manteigaria must be labeled concept/uncommissioned when used on the web service page.
- FAQ 4–6 items per service. Use the service registry content, not duplicated JSX literals.
- Final CTA: `Parlons de ce que vous cherchez à construire.` / natural EN equivalent.
- Include `Pas besoin d’avoir déjà un cahier des charges.` / EN equivalent near CTA.

- [ ] **Step 4: Implement `services/[slug]/page.tsx` static resolution**

Required behavior:

```ts
export const dynamicParams = false;
```

`generateStaticParams()` returns all 12 `{ locale, slug }` canonical combinations from the service registry.

At render:

- normalize locale;
- call `resolveServiceSlug(locale, slug)`;
- `notFound()` when slug is not valid for that locale;
- render `ServicePage` with `getService(key)`.

Metadata pairs the localized canonical and alternate service paths using `buildLocalizedMetadata`.

- [ ] **Step 5: Add breadcrumb structured data to service details**

Breadcrumb chain:

```text
Home -> Services -> Current service
```

Names localized; item URLs absolute using `getSiteUrl()`.

- [ ] **Step 6: Run service tests and build static params**

```bash
npm test -- src/components/services/service-page.test.tsx src/content/content-registry.test.ts
npm run typecheck
npm run build
```

Expected: build shows all canonical service pages without dynamic route errors.

- [ ] **Step 7: Commit**

```bash
git add src/app/'(localized)'/'[locale]'/services src/components/services
git commit -m "feat: add bilingual service pages"
```

---

### Task 4: Add centralized Studio content and the Rayan Studio / Rayan Sekkat pages

**Files:**
- Create: `src/content/studio.ts`
- Create: `src/app/(localized)/[locale]/studio/page.tsx`
- Create: `src/app/(localized)/[locale]/studio/[slug]/page.tsx`
- Create: `src/components/studio/studio-page.tsx`
- Create: `src/components/studio/rayan-page.tsx`
- Create: `src/components/studio/studio-pages.test.tsx`

**Interfaces:**
- Consumes: `resolveStudioSlug`, `studioPath`, brand data.
- Produces: Studio overview redirect/index behavior and canonical `rayan-studio`, `rayan-sekkat` pages.

- [ ] **Step 1: Define `src/content/studio.ts` with approved brand principles**

The Rayan Studio page must contain these FR anchors:

```text
Un studio indépendant pour concevoir, construire et faire évoluer des produits digitaux.
Moins d’intermédiaires. Plus de continuité.
Produit avant technologie
Un interlocuteur
Construit pour durer
Communication claire
```

EN natural equivalents.

The Rayan page must use:

```text
Rayan Sekkat
Software Engineer & Founder
```

as two separate visual lines or with `·`, never an em dash.

Do not make the page a long CV. Allowed factual structure:

- software engineering / full-stack / DevOps focus;
- selected experience already documented in repository guidance, including STMicroelectronics and UNYC if kept factual;
- selected studio products;
- French and English working languages; mention Korean only if the existing active profile guidance still supports the chosen wording;
- Seoul / France context only if it is already accurate in current project guidance;
- LinkedIn/technical profile links from `BRAND`.

Avoid an unverified numeric “years of experience” badge if repository sources disagree. The page does not need a number to be credible.

- [ ] **Step 2: Write rendering tests**

Tests must assert:

- Rayan Studio page contains “Moins d’intermédiaires” in FR;
- Rayan page contains `Software Engineer & Founder`;
- rendered text contains no `—`;
- there is no phrase such as `notre équipe d'experts` / `our team of experts`.

- [ ] **Step 3: Implement the Studio root**

`/${locale}/studio` should redirect to `studioPath(locale, "studio")` with Next `redirect()`; do not create a second competing Studio overview.

- [ ] **Step 4: Implement dynamic Studio child resolution**

`studio/[slug]/page.tsx` resolves `rayan-studio`, `rayan-sekkat`, method, offers and FAQ. It may delegate to distinct components by key.

At this task only `studio` and `rayan` keys must be implemented. For the other three keys, the route component imports the components delivered by Task 5; do not ship the branch between Task 4 and Task 5 if those imports are unresolved.

- [ ] **Step 5: Use a real portrait only if repository asset exists**

Run:

```bash
find public -maxdepth 3 -type f | rg -i "rayan|portrait|profile|founder|sekkat" || true
```

If a real approved portrait is present, use it with `next/image`. If none exists, render the page without portrait. Do not use Unsplash, stock photography or generated people.

- [ ] **Step 6: Run tests and commit**

```bash
npm test -- src/components/studio/studio-pages.test.tsx
npm run typecheck
git add src/content/studio.ts src/app/'(localized)'/'[locale]'/studio src/components/studio/studio-page.tsx src/components/studio/rayan-page.tsx src/components/studio/studio-pages.test.tsx
git commit -m "feat: add studio and founder pages"
```

---

### Task 5: Implement Method, Offers and global FAQ pages

**Files:**
- Create: `src/components/studio/method-page.tsx`
- Create: `src/components/studio/offers-page.tsx`
- Create: `src/components/studio/faq-page.tsx`
- Modify: `src/content/studio.ts`
- Modify: `src/app/(localized)/[locale]/studio/[slug]/page.tsx`
- Modify: `src/components/studio/studio-pages.test.tsx`

**Interfaces:**
- Produces complete dynamic Studio key coverage: `studio`, `rayan`, `method`, `offers`, `faq`.

- [ ] **Step 1: Add Method content exactly around the five approved stages**

FR:

```text
01 Discover - Comprendre le besoin, les utilisateurs, les contraintes et les priorités.
02 Design - Définir le produit, les parcours et l’architecture avant de construire.
03 Build - Développer par itérations, intégrer les services nécessaires et tester.
04 Launch - Préparer l’infrastructure, valider et mettre en production proprement.
05 Improve - Maintenir, observer et faire évoluer le produit selon les besoins réels.
```

Include this reassurance:

```text
Vous n’avez pas besoin d’arriver avec un cahier des charges parfait.
```

EN natural equivalent.

- [ ] **Step 2: Add Offers content with no prices**

Exactly four offer blocks:

```text
Applications & plateformes
MVP & lancement produit
Sites premium & refonte
Accompagnement continu
```

Each block has:

- “Idéal pour” / “Best for”;
- “Peut inclure” / “May include”;
- CTA to `startProjectPath(locale)`.

Global FR statement:

```text
Chaque engagement est construit autour du périmètre réel du projet. Après un premier échange, vous recevez une proposition détaillée avec périmètre, planning et budget.
```

Response statement:

```text
Première réponse sous 24h ouvrées.
```

Test must fail if the rendered Offers page matches common price patterns such as `€`, `EUR`, `KRW`, `$`, `à partir de`, `starting at`.

- [ ] **Step 3: Add global FAQ content**

Questions must cover:

```text
Travaillez-vous uniquement avec des entreprises françaises ?
Pouvez-vous reprendre un projet existant ?
Travaillez-vous avec des équipes internes ?
Qui possède le code à la fin du projet ?
Pouvez-vous gérer l’hébergement et le déploiement ?
Comment sont établis les devis ?
Comment démarrer un projet ?
```

Answers must remain factual and avoid promising unsupported service levels. Service-specific questions stay on service records.

- [ ] **Step 4: Add metadata and breadcrumbs for all Studio pages**

Canonical/alternate pairs come from `studioPath`. Use unique titles/descriptions. `FAQPage` structured data is allowed only on the actual FAQ page and must mirror visible questions exactly.

- [ ] **Step 5: Extend tests**

Add assertions:

```tsx
expect(offersText).not.toMatch(/€|EUR|KRW|\$|à partir de|starting at/i);
expect(methodText).toMatch(/Discover/);
expect(methodText).toMatch(/Improve/);
expect(faqLinksOrButtons).toHaveLength(7);
```

- [ ] **Step 6: Run and commit**

```bash
npm test -- src/components/studio/studio-pages.test.tsx
npm run lint
npm run typecheck
npm run build
git add src/components/studio src/content/studio.ts src/app/'(localized)'/'[locale]'/studio
git commit -m "feat: add method offers and studio faq"
```

---

### Task 6: Add the simple Services/Studio navigation integration and retire old homepage-only component dependencies

**Files:**
- Modify: `src/components/home/home-page.tsx`
- Modify: `src/content/navigation.ts`
- Modify: `src/components/navigation/site-footer.tsx`
- Keep for later migration: `src/components/site/HomePage.tsx`, old `Navbar.tsx`, old `Footer.tsx`, old `Pricing.tsx`, old `Testimonials.tsx`.
- Create: `src/components/home/public-copy.test.tsx`

**Interfaces:**
- Ensures the new canonical pages are the only links surfaced by the main navigation/home while legacy pages remain reachable for SEO until Lot 05.

- [ ] **Step 1: Add a public homepage copy invariant test**

Create a test that renders FR and EN homepages, joins `container.textContent`, then asserts:

```ts
expect(text).not.toContain("—");
expect(text).not.toMatch(/€|EUR|KRW|\$\d|à partir de|starting at/i);
expect(text).not.toMatch(/notre équipe d'experts|our team of experts/i);
```

Do not ban the normal word `équipe` because approved copy contains “rigueur d’une équipe produit”; ban fabricated team ownership language only.

- [ ] **Step 2: Verify every main-nav destination points at the new route helpers**

Run:

```bash
rg -n "a-propos-methodologie-preuves|#tarifs|#realisations|#contact|refonte-site-internet|creation-site-vitrine" src/content/navigation.ts src/components/home src/components/navigation
```

Expected: no obsolete homepage/hash or legacy SEO route is used as canonical new navigation, except legal links and any explicitly documented compatibility fallback.

- [ ] **Step 3: Keep legacy components in repository but make them unreachable from the new homepage**

Do not delete them yet. Lot 05 will remove or redirect obsolete routes only after the migration map is tested.

- [ ] **Step 4: Run the complete Lot 02 gate**

```bash
npm run lint
npm run typecheck
npm test
npm --prefix scripts test
npm run build
```

Expected: all exit `0`.

- [ ] **Step 5: Commit**

```bash
git add src/components/home src/content/navigation.ts src/components/navigation/site-footer.tsx
git commit -m "test: enforce commercial redesign invariants"
```

---

## Lot 02 Review Gate

```text
[ ] /fr and /en use the new software-studio homepage.
[ ] Hero uses exact approved FR copy and natural EN copy.
[ ] Home section order is exact and featured work order is Pick4Me, Pont Factur-X, GoodCall.
[ ] Home uses real repository project images, not generic dashboard imagery.
[ ] Six service pages exist in both locales at canonical localized slugs.
[ ] Service pages order business need before engineering and technology.
[ ] Studio page presents independent structure honestly.
[ ] Rayan page does not fabricate a team or unsupported experience metric.
[ ] Method contains Discover, Design, Build, Launch, Improve.
[ ] Offers contains four approved engagement types and no public price.
[ ] Global FAQ contains the seven cross-service subjects.
[ ] Root metadata no longer describes the site primarily as small-business website redesign.
[ ] No new LocalBusiness schema is emitted without a complete valid local-business identity/address.
[ ] Main navigation no longer points to old homepage hashes or legacy SEO service pages.
[ ] Legacy acquisition routes are still present for Lot 05 migration, not silently deleted.
[ ] Public rendered FR/EN marketing copy has no em dash.
[ ] Existing consent/analytics components remain mounted in RootBody.
[ ] 70 local SEO combination invariant still passes.
[ ] lint, typecheck, unit tests, scripts tests and production build all pass.
```
