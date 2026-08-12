# Rayan Studio Redesign Lot 03 Work and Case Studies Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the editorial `/work` portfolio and complete flagship case studies for Pick4Me, Pont Factur-X and GoodCall using only real media and defensible project facts.

**Architecture:** Keep project facts centralized in `src/content/projects`. The route layer resolves a project record and selects either the flagship `CaseStudyPage` or a concise secondary `ProjectSummaryPage`. Shared work components render metadata, capabilities, engineering details, gallery and next-project navigation without duplicating facts in JSX.

**Tech Stack:** Existing Next.js/React/TypeScript/Tailwind/Framer Motion foundation and Lot 01/02 test helpers.

## Global Constraints

- Featured order is exactly Pick4Me → Pont Factur-X → GoodCall.
- Never invent usage, revenue, conversion, performance or productivity metrics.
- Never claim Manteigaria was a commissioned client project. It is a concept/uncommissioned redesign.
- Use real repository product media only. A CSS crop/detail of a real screenshot is acceptable; fabricated UI screenshots are not.
- Public copy contains no `—`.
- Case-study template order is exact: Hero → Overview → Challenge → Solution → What we built → Product & UX → Engineering → Technologies → Outcome → Gallery → Next project → CTA.
- If no numerical outcome is evidenced, use a functional outcome.
- Do not expose credentials, private architecture secrets, customer data or sensitive infrastructure details.

---

### Task 1: Verify and lock the project fact sheet before writing case-study copy

**Files:**
- Modify: `src/content/projects/pick4me.ts`
- Modify: `src/content/projects/pont-facturx.ts`
- Modify: `src/content/projects/goodcall.ts`
- Modify: `src/content/projects/docextract.ts`
- Modify: `src/content/projects/manteigaria.ts`
- Modify: `src/content/projects/types.ts`
- Create: `docs/redesign/project-fact-sheet.md`
- Create: `src/content/projects/project-facts.test.ts`
- Read: `PROJECT_MEMORY.md`
- Read: legacy `src/components/site/Showcase.tsx`

**Interfaces:**
- Produces a reviewable fact sheet and complete content records. Later rendering tasks must not introduce project facts outside these records.

- [ ] **Step 1: Create a fact-sheet document with only approved facts**

Create `docs/redesign/project-fact-sheet.md` with these factual anchors. Add repository evidence/path next to each claim while implementing; if a claim is contradicted by repository evidence, stop and report it rather than silently changing the spec.

```md
# Redesign project fact sheet

## Pick4Me
- Public product: https://pick4me.be/
- Type: marketplace / local platform
- Approved capability topics: missions, user roles, communication/chat, notifications, payments/wallet, administration.
- Approved engineering topics when evidenced in project memory: backend APIs, auth/permissions, payment integration, push notifications, real-time communication.
- Homepage/case-study labels: Marketplace · Mobile · Backend · Payments.
- Outcome style: functional system delivered; no invented user/revenue/conversion metric.

## Pont Factur-X
- Public product: https://www.pont-facturx.com/
- Type: B2B software / electronic invoicing.
- Approved capability topics: PDF/document input, Factur-X generation/conversion, API/automation, electronic-invoicing workflow; Chorus Pro only if current project memory explicitly confirms the implemented integration.
- Homepage/case-study labels: B2B Software · E-invoicing · API · Automation.
- Outcome style: functional electronic-invoicing workflow; no invented compliance/performance metric.

## GoodCall
- Public product: https://goodcall.gg/en/
- Type: esports prediction platform, web/mobile experience.
- Approved capability topics: free esports predictions, social points, leaderboards/rankings, private leagues; game names LoL, Valorant and CS2 are already present in repository copy.
- Approved engineering topics when evidenced in project memory: NestJS, Prisma, PostgreSQL, Redis, monorepo/Turborepo.
- Homepage/case-study labels: Esports · Predictions · Social · Rankings.
- Outcome style: functional product/feature outcome; no invented user count or engagement metric.

## DocExtract
- Public product: https://www.getdocextract.com/
- Type: B2B SaaS / document extraction.
- Secondary work, not homepage top 3.

## Manteigaria
- Redesign concept: https://manteigaria-redesign.vercel.app/
- Original/reference: https://manteigaria.com/fr/
- Type: artisan bakery / local business website concept.
- Must always be labeled concept / uncommissioned redesign.
```

Do not write secrets, source code excerpts from other private projects, customer personal data or API keys into this document.

- [ ] **Step 2: Extend `ProjectRecord` with explicit UX/engineering fields**

Add:

```ts
productUx: Record<Locale, string[]>;
engineering: Record<Locale, Array<{ title: string; body: string }>>;
```

Keep all fields data-only and serializable.

- [ ] **Step 3: Write the failing project fact invariant test**

Create `src/content/projects/project-facts.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS, getProject } from "@/content/projects";

function stringify(value: unknown) {
  return JSON.stringify(value);
}

describe("project evidence contract", () => {
  it("keeps the exact flagship order and next-project loop", () => {
    expect(FEATURED_PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
    ]);
    expect(getProject("pick4me")?.next).toBe("pont-facturx");
    expect(getProject("pont-facturx")?.next).toBe("goodcall");
    expect(getProject("goodcall")?.next).toBe("pick4me");
  });

  it("keeps Manteigaria explicitly non-commissioned", () => {
    const project = getProject("manteigaria");
    expect(project?.kind).toBe("concept");
    expect(`${project?.status.fr} ${project?.status.en}`.toLowerCase()).toMatch(/concept|non command|uncommissioned/);
  });

  it("contains no em dash in public project content", () => {
    const content = stringify(FEATURED_PROJECTS);
    expect(content).not.toContain("—");
  });
});
```

- [ ] **Step 4: Populate Pick4Me flagship content without numerical claims**

Use this narrative structure in the centralized record.

FR challenge:

```text
La plateforme devait permettre à plusieurs types d’utilisateurs de créer, accepter et suivre des missions tout en centralisant communication, paiements et notifications.
Le produit devait garder un parcours compréhensible malgré plusieurs rôles, états de mission et actions métier.
```

EN natural equivalent.

FR solution topics:

```text
Structurer les parcours autour du cycle de vie d’une mission.
Centraliser communication, paiements et notifications dans une expérience cohérente.
Séparer clairement les permissions et actions selon les rôles utilisateurs.
```

Capabilities:

```text
Marketplace
Real-time communication
Payments & wallet
Notifications
Administration
```

Only include `real-time` as implementation detail if project memory confirms it; otherwise label the capability `Communication` and describe visible chat functionality without asserting protocol details.

Functional outcome wording:

```text
La plateforme réunit dans un même produit la gestion des missions, la communication, les flux de paiement, les notifications et l’administration.
```

- [ ] **Step 5: Populate Pont Factur-X content**

FR challenge direction:

```text
Rendre un workflow de facturation électronique compréhensible pour des utilisateurs métier tout en gérant les contraintes de génération, de validation et d’échange documentaire.
```

FR solution topics:

```text
Clarifier les étapes de conversion et de traitement documentaire.
Exposer les capacités d’intégration via API sans transformer l’interface en documentation technique.
Automatiser les étapes répétitives du workflow lorsque le produit les prend réellement en charge.
```

Capabilities may include only evidenced items such as:

```text
Conversion Factur-X
Traitement documentaire
API
Automatisation
```

Functional outcome must describe the delivered workflow, not claim regulatory certification or time saved unless evidenced.

- [ ] **Step 6: Populate GoodCall content**

FR challenge direction:

```text
Présenter beaucoup d’informations liées aux compétitions, pronostics et classements sans rendre l’expérience difficile à lire ou à utiliser sur mobile.
```

FR solution topics:

```text
Hiérarchiser les informations autour des matchs et pronostics.
Créer des classements et mécaniques sociales lisibles malgré la densité de données.
Conserver une identité esport forte sans sacrifier la clarté produit.
```

Capabilities:

```text
Predictions
Leaderboards
Private leagues
Social points
Multi-game experience
```

Mention multi-language only if current project memory confirms production availability for the languages listed there.

Functional outcome: describe the working prediction/social product, not user acquisition or engagement uplift.

- [ ] **Step 7: Add only evidenced technologies**

Do not infer a stack from website source headers. Use `PROJECT_MEMORY.md` or existing project documentation. Keep technology arrays compact and case-study relevant.

If a flagship project has incomplete verified stack information, an empty/short technology array is preferable to a guessed framework.

- [ ] **Step 8: Run fact tests and copy scan**

```bash
npm test -- src/content/projects/project-facts.test.ts src/content/content-registry.test.ts
rg -n "—" src/content/projects docs/redesign/project-fact-sheet.md && exit 1 || true
```

Expected: PASS, no public em dash in content records. Internal fact-sheet punctuation also follows the same simpler rule for consistency.

- [ ] **Step 9: Commit**

```bash
git add src/content/projects docs/redesign/project-fact-sheet.md
git commit -m "content: lock verified project case study facts"
```

---

### Task 2: Build the editorial `/work` index

**Files:**
- Create: `src/app/(localized)/[locale]/work/page.tsx`
- Create: `src/components/work/work-index.tsx`
- Create: `src/components/work/work-project-block.tsx`
- Create: `src/components/work/more-work-grid.tsx`
- Create: `src/components/work/work-index.test.tsx`

**Interfaces:**
- Consumes: `FEATURED_PROJECTS`, `PROJECTS`, `workPath`, metadata helpers.
- Produces: canonical FR/EN `/work` pages.

- [ ] **Step 1: Write the failing editorial-order test**

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { WorkIndex } from "@/components/work/work-index";

it("renders selected work before secondary work in the exact flagship order", () => {
  const { container } = render(<WorkIndex locale="fr" />);
  const featured = Array.from(container.querySelectorAll("[data-work-project]"), (node) =>
    node.getAttribute("data-work-project"),
  );
  expect(featured).toEqual(["pick4me", "pont-facturx", "goodcall"]);
  expect(screen.getByText("More work")).toBeInTheDocument();
});
```

- [ ] **Step 2: Implement the Work hero**

FR:

```text
Des produits conçus pour être utilisés.
Une sélection de plateformes, applications et expériences digitales sur lesquelles Rayan Studio est intervenu.
```

EN natural equivalent.

- [ ] **Step 3: Implement three immersive selected-work blocks**

Use the same project tone mapping as homepage but allow more visual space and slightly more context.

Each block contains:

- name;
- localized categories;
- one summary paragraph;
- real image;
- link to case study;
- no external product link as primary CTA.

- [ ] **Step 4: Implement `More work` as a compact editorial grid**

Include DocExtract and Manteigaria. Each card contains only:

```text
Name
Type/category
One real visual
Year only when verified
Role/status
```

Manteigaria card visibly includes `Concept, refonte non commandée` / `Concept, uncommissioned redesign`.

- [ ] **Step 5: Add metadata/alternates and run tests**

```bash
npm test -- src/components/work/work-index.test.tsx
npm run lint
npm run typecheck
```

- [ ] **Step 6: Commit**

```bash
git add src/app/'(localized)'/'[locale]'/work/page.tsx src/components/work
git commit -m "feat: add editorial work index"
```

---

### Task 3: Build the shared flagship CaseStudyPage template

**Files:**
- Create: `src/components/work/case-study-page.tsx`
- Create: `src/components/work/case-study-hero.tsx`
- Create: `src/components/work/case-study-overview.tsx`
- Create: `src/components/work/capabilities-grid.tsx`
- Create: `src/components/work/engineering-section.tsx`
- Create: `src/components/work/project-gallery.tsx`
- Create: `src/components/work/next-project.tsx`
- Create: `src/components/work/case-study-page.test.tsx`

**Interfaces:**
- Consumes: complete `ProjectRecord`, `Locale`, `workPath`.
- Produces: `<CaseStudyPage locale project />`.

- [ ] **Step 1: Write the failing section-order test**

```tsx
import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import { CaseStudyPage } from "@/components/work/case-study-page";
import { getProject } from "@/content/projects";

it("renders the complete approved case study sequence", () => {
  const project = getProject("pick4me");
  if (!project) throw new Error("Pick4Me missing");
  const { container } = render(<CaseStudyPage locale="fr" project={project} />);
  const sections = Array.from(container.querySelectorAll("[data-case-section]"), (node) =>
    node.getAttribute("data-case-section"),
  );
  expect(sections).toEqual([
    "hero",
    "overview",
    "challenge",
    "solution",
    "capabilities",
    "product-ux",
    "engineering",
    "technologies",
    "outcome",
    "gallery",
    "next-project",
    "cta",
  ]);
});
```

- [ ] **Step 2: Implement the hero and overview**

Hero contains:

- project name;
- concise project type/subtitle;
- localized categories;
- one large real product visual.

Overview supports only present/verified metadata. Do not render empty labels. Allowed labels:

```text
Project
Type
Intervention
Role
Year
Status
```

- [ ] **Step 3: Implement Challenge and Solution with editorial copy layout**

Target visual ratio is roughly 30% copy / 70% visuals across the whole case study, not a strict DOM metric. Keep paragraphs short and pair with real screenshot/detail crops when useful.

- [ ] **Step 4: Implement `What we built` capabilities**

Render from `project.capabilities`. No generic feature list injected by component.

- [ ] **Step 5: Implement Product & UX**

Render `project.productUx`. Discuss user flows, states, hierarchy and responsive/product decisions only when evidenced. Do not claim formal user research if it was not performed.

- [ ] **Step 6: Implement Engineering**

Render `project.engineering` as focused technical explanations, not a wall of logos. When architecture is useful, render a simple semantic CSS/SVG diagram using only labels from the record. Never embed secrets or internal hostnames.

- [ ] **Step 7: Implement Technologies**

Compact text/list from `project.technologies`. Hide the entire section if the array is empty.

The section-order test should still include `technologies` only for flagship records that have verified technology data; ensure all three flagships have at least the technologies already verified in project memory before completing Lot 03.

- [ ] **Step 8: Implement Outcome with a hard proof rule**

Component accepts only string bullets from `project.outcome`; it does not compute or decorate fake KPI numbers.

Do not add a metric card component in V1.

- [ ] **Step 9: Implement gallery without fake assets**

`ProjectGallery` renders `project.gallery` with full-width and detail layouts. One real image is enough to make the gallery section valid; do not duplicate it under different filenames to simulate a larger gallery.

When using one source screenshot for a detail view, use CSS crop/object-position in the same image component and mark the alt text accurately as a detail/crop.

- [ ] **Step 10: Implement next-project and project CTA**

Next-project uses `project.next` and `getProject`.

Final CTA direction:

```text
FR: Vous construisez quelque chose de similaire ?
EN: Building something similar?
```

CTA uses `startProjectPath(locale)`.

- [ ] **Step 11: Run test and commit**

```bash
npm test -- src/components/work/case-study-page.test.tsx
npm run typecheck
git add src/components/work
git commit -m "feat: add flagship case study template"
```

---

### Task 4: Add dynamic work routes and project-specific art direction

**Files:**
- Create: `src/app/(localized)/[locale]/work/[slug]/page.tsx`
- Create: `src/components/work/project-summary-page.tsx`
- Modify: `src/components/work/case-study-page.tsx`
- Create: `src/components/work/work-route.test.tsx`

**Interfaces:**
- Produces canonical FR/EN project routes for all five registered projects.

- [ ] **Step 1: Add static-param and resolver helpers**

The route uses:

```ts
export const dynamicParams = false;
```

`generateStaticParams()` returns 10 combinations: 5 project slugs × 2 locales.

Because project slugs are identical in FR/EN, no localized project slug resolver is needed.

- [ ] **Step 2: Route flagship and secondary projects deliberately**

```ts
const isFlagship = project.featuredOrder != null;
return isFlagship
  ? <CaseStudyPage locale={locale} project={project} />
  : <ProjectSummaryPage locale={locale} project={project} />;
```

`ProjectSummaryPage` must still contain real summary, status/role, visual, available facts and CTA. It must not pretend to be the 12-section flagship case study.

- [ ] **Step 3: Add project metadata and breadcrumbs**

Every project route has unique localized title/description, canonical, alternate locale path, project image for OG where suitable, and breadcrumbs:

```text
Home -> Work -> Project
```

- [ ] **Step 4: Apply project-specific tone without forking the design system**

```text
Pick4Me: light/human/product-mobile, restrained accent.
Pont Factur-X: dark/precise/B2B-data.
GoodCall: lighter/more energetic esports/product, slightly stronger motion but still reduced-motion safe.
```

Do not create three unrelated navbars, fonts or button systems.

- [ ] **Step 5: Add route tests**

Test a helper or rendered pages to prove:

- all 5 slugs resolve;
- unknown slug returns not-found path logic;
- flagships select `CaseStudyPage`;
- Manteigaria selects secondary summary and visibly says concept/uncommissioned.

Do not try to call Next `notFound()` directly in jsdom if it complicates the unit test; extract a pure `resolveProjectPage(slug)` helper and test that.

- [ ] **Step 6: Run build and commit**

```bash
npm test -- src/components/work/work-route.test.tsx src/components/work/case-study-page.test.tsx
npm run lint
npm run typecheck
npm run build
git add src/app/'(localized)'/'[locale]'/work/'[slug]' src/components/work
git commit -m "feat: add bilingual project routes"
```

---

### Task 5: Integrate Work into homepage/navigation and enforce proof invariants

**Files:**
- Modify: `src/components/home/selected-work.tsx`
- Modify: `src/content/navigation.ts`
- Modify: `src/components/navigation/desktop-mega-menu.tsx` only if the featured Work card requires a real image/link now available.
- Create: `src/content/projects/public-proof.test.ts`

**Interfaces:**
- Main navigation and homepage now link to real case studies rather than external project sites as primary proof.

- [ ] **Step 1: Add proof-safety test**

Create a test that serializes project public content and fails on known unsupported marketing patterns:

```ts
const prohibited = [
  /\b\d+%\b/,
  /x\d+\s+(faster|plus rapide)/i,
  /increased conversion/i,
  /conversion augmentée/i,
  /thousands of users/i,
  /des milliers d'utilisateurs/i,
];
```

The test may allow numbers that are part of product names, years or technology versions only when they are outside outcome copy. Apply prohibited patterns specifically to `outcome`, `summary`, `challenge`, `solution`, not raw technology arrays.

- [ ] **Step 2: Update Work mega-menu Featured block**

Use Pick4Me as initial featured project with the real project image, localized short label and `workPath(locale, "pick4me")`.

- [ ] **Step 3: Verify no old showcase anchor is canonical**

Run:

```bash
rg -n "#realisations|goodcall\.gg|pick4me\.be|pont-facturx\.com" src/components/home/selected-work.tsx src/content/navigation.ts
```

Expected: no `#realisations`; external URLs may exist only as optional secondary `Visit product` links inside project detail pages, not primary Work/home navigation.

- [ ] **Step 4: Run complete Lot 03 gate**

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
git add src/components/home/selected-work.tsx src/content/navigation.ts src/components/navigation src/content/projects/public-proof.test.ts
git commit -m "test: enforce portfolio proof integrity"
```

---

## Lot 03 Review Gate

```text
[ ] /fr/work and /en/work exist.
[ ] Selected Work order is Pick4Me, Pont Factur-X, GoodCall.
[ ] DocExtract and Manteigaria appear under More work.
[ ] Manteigaria is visibly labeled concept/uncommissioned everywhere it appears.
[ ] Pick4Me, Pont Factur-X and GoodCall each implement the complete flagship case-study sequence.
[ ] Case-study copy is centralized in project records, not duplicated across homepage/work/detail JSX.
[ ] Only verified technologies are shown.
[ ] No outcome contains fabricated KPI, conversion, user or productivity numbers.
[ ] Gallery uses real repository media only.
[ ] No fake client logos/testimonials are introduced.
[ ] Project-specific art direction varies without creating separate design systems.
[ ] Next-project loop is Pick4Me -> Pont Factur-X -> GoodCall -> Pick4Me.
[ ] Public project copy contains no em dash.
[ ] lint, typecheck, unit tests, scripts tests and production build all pass.
```
