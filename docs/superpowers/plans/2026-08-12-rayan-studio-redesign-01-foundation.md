# Rayan Studio Redesign Lot 01 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the tested route/content/design/navigation foundation for the approved redesign without yet replacing the whole public commercial site.

**Architecture:** Add root site test infrastructure, authoritative route helpers, typed project/service content registries, design tokens and reusable layout/motion primitives. Build a new accessible site header/footer in isolation so the existing homepage and local SEO acquisition pages remain functional until Lot 02 performs the public cutover.

**Tech Stack:** Existing Next.js 14.2.x, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, Vitest, Testing Library, jsdom.

## Global Constraints

- Follow all constraints in `2026-08-12-rayan-studio-redesign-master.md`.
- Do not replace the existing homepage in this lot.
- Do not delete `src/components/site/*` legacy components in this lot.
- Do not modify `/site/[sector]/[city]` rendering except for additive compatibility fixes proven by tests.
- Do not touch prospection/outreach code.
- No public-facing em dash character `—` in new content records.
- No invented metrics, team claims or customer outcomes.

---

### Task 1: Align contributor guidance with the validated public positioning

**Files:**
- Modify: `PROJECT_MEMORY.md`
- Modify only if present in the implementation workspace: `CLAUDE.md`
- Read only: `docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-design.md`
- Read only: `docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-review-amendment.md`

**Interfaces:**
- Consumes: validated spec decision that the public site is 70% software / 30% premium web while local SEO and outreach acquisition surfaces remain preserved.
- Produces: an unambiguous current-positioning instruction for every later coding agent.

- [ ] **Step 1: Locate only currently-active guidance that conflicts with the redesign**

Run:

```bash
rg -n "TPE|petite entreprise|petites entreprises|commerce local|commerces locaux|refonte|positionnement|prioritaire|priorité" PROJECT_MEMORY.md CLAUDE.md 2>/dev/null || true
```

Expected: matches may include historical notes and active guidance. Do not rewrite historical logs merely because they contain old wording.

- [ ] **Step 2: Add an authoritative current-positioning block near the top of `PROJECT_MEMORY.md`**

Add this exact block, adapting only surrounding heading level if required by the file:

```md
## CURRENT PUBLIC SITE POSITIONING - 2026-08-12

The validated public Rayan Studio website positioning is now a premium independent software and digital studio, approximately 70% software and 30% premium web.

Public-site priorities:
- software first: SaaS, web applications, MVPs, APIs/backends, automation/AI, DevOps/cloud;
- premium website creation/redesign remains a clear secondary entry point;
- present Rayan Studio honestly as an independent studio with direct founder involvement, never as a fabricated large agency;
- no public fixed prices; use the `Offres` model and quote after project framing;
- never invent metrics, testimonials, client logos, team size or outcomes;
- public FR/EN marketing copy must not use the em dash character;
- preserve the 70 `/site/[sector]/[city]` local SEO pages as a separate acquisition surface with their local/TPE intent;
- preserve existing outreach/prospection constraints unless a separate approved change explicitly modifies them.

This section supersedes older TPE-first instructions for the main public website only. Historical records, local SEO intent and prospection-specific rules remain historical/operational context and must not be rewritten merely to match the new homepage positioning.
```

- [ ] **Step 3: If `CLAUDE.md` exists, align only its active public-site instruction**

Run:

```bash
if test -f CLAUDE.md; then rg -n "TPE|petite entreprise|commerce local|refonte|positionnement" CLAUDE.md; else echo "CLAUDE.md not present in repository workspace"; fi
```

If present, add a short pointer to the validated spec and the same 70/30 rule. Do not create `CLAUDE.md` when it does not exist.

- [ ] **Step 4: Verify the authoritative block is present and history was not broadly rewritten**

Run:

```bash
rg -n "CURRENT PUBLIC SITE POSITIONING|70% software|70 /site|70 `/site" PROJECT_MEMORY.md
git diff --stat
git diff -- PROJECT_MEMORY.md CLAUDE.md
```

Expected: a focused documentation diff only.

- [ ] **Step 5: Commit**

```bash
git add PROJECT_MEMORY.md
test ! -f CLAUDE.md || git add CLAUDE.md
git commit -m "docs: align public site positioning guidance"
```

---

### Task 2: Add root unit/component test infrastructure and normalized verification scripts

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/lib/i18n.test.ts`

**Interfaces:**
- Consumes: existing `src/lib/i18n.ts` exports `SUPPORTED_LOCALES`, `normalizeLocale`, `isEnglish`.
- Produces: `npm test`, `npm run test:watch`, `npm run typecheck`, and `npm run verify` for later lots.

- [ ] **Step 1: Write the first failing root test before installing the runner**

Create `src/lib/i18n.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { SUPPORTED_LOCALES, isEnglish, normalizeLocale } from "@/lib/i18n";

describe("i18n helpers", () => {
  it("keeps the commercial locale contract limited to fr and en", () => {
    expect(SUPPORTED_LOCALES).toEqual(["fr", "en"]);
  });

  it("normalizes French variants to fr and everything else to en", () => {
    expect(normalizeLocale("fr-FR")).toBe("fr");
    expect(normalizeLocale("FR")).toBe("fr");
    expect(normalizeLocale("en-US")).toBe("en");
    expect(normalizeLocale(undefined)).toBe("en");
  });

  it("reports English only for en", () => {
    expect(isEnglish("en")).toBe(true);
    expect(isEnglish("fr")).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test and verify the root project has no test runner yet**

Run:

```bash
npm test
```

Expected: failure because the root `package.json` has no `test` script.

- [ ] **Step 3: Install the site test dependencies**

Run:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Do not install Playwright in this lot; Playwright is budgeted as new E2E infrastructure in Lot 06.

- [ ] **Step 4: Add deterministic scripts to `package.json`**

The root scripts must become:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest",
  "verify": "npm run lint && npm run typecheck && npm test && npm run build"
}
```

Keep existing dependencies unchanged except for the new dev dependencies installed above.

- [ ] **Step 5: Add `vitest.config.ts`**

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    clearMocks: true,
  },
});
```

- [ ] **Step 6: Add `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 7: Run the new test and typecheck**

Run:

```bash
npm test -- src/lib/i18n.test.ts
npm run typecheck
```

Expected: both commands exit `0`.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts vitest.setup.ts src/lib/i18n.test.ts
git commit -m "test: add site unit test infrastructure"
```

---

### Task 3: Centralize canonical bilingual route generation

**Files:**
- Create: `src/lib/site-routes.ts`
- Create: `src/lib/site-routes.test.ts`
- Modify: `src/lib/i18n.ts` only if a readonly locale tuple is required by TypeScript; preserve runtime behavior.

**Interfaces:**
- Produces: `ServiceKey`, `StudioPageKey`, `InsightCategoryKey`, `servicePath`, `resolveServiceSlug`, `workPath`, `studioPath`, `resolveStudioSlug`, `insightPath`, `resolveInsightCategorySlug`, `contactPath`, `startProjectPath`.
- Later lots must use these helpers instead of string-concatenating canonical routes.

- [ ] **Step 1: Write the failing route-contract test**

Create `src/lib/site-routes.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  contactPath,
  insightPath,
  resolveInsightCategorySlug,
  resolveServiceSlug,
  resolveStudioSlug,
  servicePath,
  startProjectPath,
  studioPath,
  workPath,
} from "@/lib/site-routes";

describe("site routes", () => {
  it("generates the approved localized service paths", () => {
    expect(servicePath("fr", "applications")).toBe("/fr/services/applications-web-saas");
    expect(servicePath("en", "applications")).toBe("/en/services/web-applications-saas");
    expect(servicePath("fr", "mvp")).toBe("/fr/services/mvp-produits-digitaux");
    expect(servicePath("en", "mvp")).toBe("/en/services/mvp-digital-products");
    expect(servicePath("fr", "backends")).toBe("/fr/services/apis-backends");
    expect(servicePath("en", "backends")).toBe("/en/services/apis-backends");
    expect(servicePath("fr", "automation")).toBe("/fr/services/automatisation-ia");
    expect(servicePath("en", "automation")).toBe("/en/services/automation-ai");
    expect(servicePath("fr", "web")).toBe("/fr/services/sites-web-refonte");
    expect(servicePath("en", "web")).toBe("/en/services/premium-websites-redesign");
    expect(servicePath("fr", "devops")).toBe("/fr/services/devops-cloud");
    expect(servicePath("en", "devops")).toBe("/en/services/devops-cloud");
  });

  it("resolves service slugs only for the requested locale", () => {
    expect(resolveServiceSlug("fr", "applications-web-saas")).toBe("applications");
    expect(resolveServiceSlug("en", "web-applications-saas")).toBe("applications");
    expect(resolveServiceSlug("fr", "web-applications-saas")).toBeNull();
  });

  it("generates work, studio and conversion paths", () => {
    expect(workPath("fr")).toBe("/fr/work");
    expect(workPath("en", "pick4me")).toBe("/en/work/pick4me");
    expect(studioPath("fr", "method")).toBe("/fr/studio/methode");
    expect(studioPath("en", "method")).toBe("/en/studio/method");
    expect(studioPath("fr", "offers")).toBe("/fr/studio/offres");
    expect(studioPath("en", "offers")).toBe("/en/studio/offers");
    expect(contactPath("fr")).toBe("/fr/contact");
    expect(startProjectPath("fr")).toBe("/fr/demarrer-un-projet");
    expect(startProjectPath("en")).toBe("/en/start-a-project");
  });

  it("localizes the tools category while keeping shared category names stable", () => {
    expect(insightPath("fr", "tools")).toBe("/fr/insights/outils");
    expect(insightPath("en", "tools")).toBe("/en/insights/tools");
    expect(insightPath("fr", "guides")).toBe("/fr/insights/guides");
    expect(resolveInsightCategorySlug("fr", "outils")).toBe("tools");
    expect(resolveInsightCategorySlug("en", "tools")).toBe("tools");
  });

  it("resolves localized Studio child slugs", () => {
    expect(resolveStudioSlug("fr", "methode")).toBe("method");
    expect(resolveStudioSlug("en", "method")).toBe("method");
    expect(resolveStudioSlug("fr", "method")).toBeNull();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails because the route module does not exist**

Run:

```bash
npm test -- src/lib/site-routes.test.ts
```

Expected: FAIL with module-resolution error for `@/lib/site-routes`.

- [ ] **Step 3: Implement `src/lib/site-routes.ts`**

Use this exact route model:

```ts
import type { Locale } from "@/lib/i18n";

export type ServiceKey = "applications" | "mvp" | "backends" | "automation" | "web" | "devops";
export type StudioPageKey = "studio" | "rayan" | "method" | "offers" | "faq";
export type InsightCategoryKey = "articles" | "guides" | "checklists" | "templates" | "tools";

const SERVICE_SLUGS: Record<ServiceKey, Record<Locale, string>> = {
  applications: { fr: "applications-web-saas", en: "web-applications-saas" },
  mvp: { fr: "mvp-produits-digitaux", en: "mvp-digital-products" },
  backends: { fr: "apis-backends", en: "apis-backends" },
  automation: { fr: "automatisation-ia", en: "automation-ai" },
  web: { fr: "sites-web-refonte", en: "premium-websites-redesign" },
  devops: { fr: "devops-cloud", en: "devops-cloud" },
};

const STUDIO_SLUGS: Record<StudioPageKey, Record<Locale, string>> = {
  studio: { fr: "rayan-studio", en: "rayan-studio" },
  rayan: { fr: "rayan-sekkat", en: "rayan-sekkat" },
  method: { fr: "methode", en: "method" },
  offers: { fr: "offres", en: "offers" },
  faq: { fr: "faq", en: "faq" },
};

const INSIGHT_CATEGORY_SLUGS: Record<InsightCategoryKey, Record<Locale, string>> = {
  articles: { fr: "articles", en: "articles" },
  guides: { fr: "guides", en: "guides" },
  checklists: { fr: "checklists", en: "checklists" },
  templates: { fr: "templates", en: "templates" },
  tools: { fr: "outils", en: "tools" },
};

export function servicePath(locale: Locale, key: ServiceKey) {
  return `/${locale}/services/${SERVICE_SLUGS[key][locale]}`;
}

export function resolveServiceSlug(locale: Locale, slug: string): ServiceKey | null {
  const entry = (Object.entries(SERVICE_SLUGS) as Array<[ServiceKey, Record<Locale, string>]>).find(
    ([, slugs]) => slugs[locale] === slug,
  );
  return entry?.[0] ?? null;
}

export function workPath(locale: Locale, slug?: string) {
  return slug ? `/${locale}/work/${slug}` : `/${locale}/work`;
}

export function studioPath(locale: Locale, page: StudioPageKey) {
  return `/${locale}/studio/${STUDIO_SLUGS[page][locale]}`;
}

export function resolveStudioSlug(locale: Locale, slug: string): StudioPageKey | null {
  const entry = (Object.entries(STUDIO_SLUGS) as Array<[StudioPageKey, Record<Locale, string>]>).find(
    ([, slugs]) => slugs[locale] === slug,
  );
  return entry?.[0] ?? null;
}

export function insightPath(locale: Locale, category?: InsightCategoryKey, slug?: string) {
  if (!category) return `/${locale}/insights`;
  const base = `/${locale}/insights/${INSIGHT_CATEGORY_SLUGS[category][locale]}`;
  return slug ? `${base}/${slug}` : base;
}

export function resolveInsightCategorySlug(locale: Locale, slug: string): InsightCategoryKey | null {
  const entry = (
    Object.entries(INSIGHT_CATEGORY_SLUGS) as Array<[InsightCategoryKey, Record<Locale, string>]>
  ).find(([, slugs]) => slugs[locale] === slug);
  return entry?.[0] ?? null;
}

export function contactPath(locale: Locale) {
  return `/${locale}/contact`;
}

export function startProjectPath(locale: Locale) {
  return locale === "fr" ? "/fr/demarrer-un-projet" : "/en/start-a-project";
}
```

- [ ] **Step 4: Run the route tests**

```bash
npm test -- src/lib/site-routes.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/site-routes.ts src/lib/site-routes.test.ts src/lib/i18n.ts
git commit -m "feat: centralize bilingual site routes"
```

---

### Task 4: Add typed project and service content registries without duplicating proof

**Files:**
- Create: `src/content/projects/types.ts`
- Create: `src/content/projects/index.ts`
- Create: `src/content/projects/pick4me.ts`
- Create: `src/content/projects/pont-facturx.ts`
- Create: `src/content/projects/goodcall.ts`
- Create: `src/content/projects/docextract.ts`
- Create: `src/content/projects/manteigaria.ts`
- Create: `src/content/services/types.ts`
- Create: `src/content/services/index.ts`
- Create: `src/content/services/applications.ts`
- Create: `src/content/services/mvp.ts`
- Create: `src/content/services/backends.ts`
- Create: `src/content/services/automation.ts`
- Create: `src/content/services/web.ts`
- Create: `src/content/services/devops.ts`
- Create: `src/content/content-registry.test.ts`

**Interfaces:**
- Consumes: `Locale`, `ServiceKey`, existing real project names/URLs/media under `public/realisations/` and approved spec copy.
- Produces: `PROJECTS`, `FEATURED_PROJECTS`, `getProject`, `SERVICES`, `getService` used by navigation, home, services and work.

- [ ] **Step 1: Write the failing registry contract test**

Create `src/content/content-registry.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { FEATURED_PROJECTS, PROJECTS, getProject } from "@/content/projects";
import { SERVICES, getService } from "@/content/services";

function allStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object") return Object.values(value).flatMap(allStrings);
  return [];
}

describe("content registries", () => {
  it("keeps the exact approved featured work order", () => {
    expect(FEATURED_PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
    ]);
  });

  it("registers the five real project surfaces currently available", () => {
    expect(PROJECTS.map((project) => project.key)).toEqual([
      "pick4me",
      "pont-facturx",
      "goodcall",
      "docextract",
      "manteigaria",
    ]);
    expect(getProject("pick4me")?.heroImage).toBe("/realisations/pick4me.png");
    expect(getProject("manteigaria")?.kind).toBe("concept");
  });

  it("registers exactly the six approved services", () => {
    expect(SERVICES.map((service) => service.key)).toEqual([
      "applications",
      "mvp",
      "backends",
      "automation",
      "web",
      "devops",
    ]);
    expect(getService("applications").proofProjects).toContain("pick4me");
    expect(getService("automation").proofProjects).toEqual(["docextract", "pont-facturx"]);
  });

  it("contains no public em dash copy", () => {
    const strings = allStrings({ PROJECTS, SERVICES });
    expect(strings.filter((text) => text.includes("—"))).toEqual([]);
  });
});
```

- [ ] **Step 2: Run the test and confirm the registries do not exist yet**

```bash
npm test -- src/content/content-registry.test.ts
```

Expected: FAIL with module-resolution errors.

- [ ] **Step 3: Create `src/content/projects/types.ts`**

Use this exact type contract:

```ts
import type { Locale } from "@/lib/i18n";

export type ProjectKey = "pick4me" | "pont-facturx" | "goodcall" | "docextract" | "manteigaria";
export type LocalizedText = Record<Locale, string>;

export type ProjectRecord = {
  key: ProjectKey;
  slug: string;
  title: string;
  kind: "product" | "concept";
  year?: string;
  liveUrl?: string;
  beforeUrl?: string;
  heroImage: string;
  featuredOrder?: number;
  tone: "light" | "dark" | "energy";
  categories: Record<Locale, string[]>;
  summary: LocalizedText;
  role: LocalizedText;
  status?: LocalizedText;
  technologies: string[];
  challenge: Record<Locale, string[]>;
  solution: Record<Locale, string[]>;
  capabilities: Array<{ title: LocalizedText; body: LocalizedText }>;
  outcome: Record<Locale, string[]>;
  gallery: Array<{ src: string; alt: LocalizedText }>;
  next?: ProjectKey;
};
```

- [ ] **Step 4: Create project records using only repository-supported facts**

Use these immutable factual anchors:

```text
Pick4Me
- key/slug: pick4me
- kind: product
- liveUrl: https://pick4me.be/
- heroImage: /realisations/pick4me.png
- featuredOrder: 1
- tone: light
- categories FR: Marketplace, Mobile, Backend, Paiements
- categories EN: Marketplace, Mobile, Backend, Payments
- status: Produit du studio, en production / Studio product, live
- next: pont-facturx

Pont Factur-X
- key/slug: pont-facturx
- kind: product
- liveUrl: https://www.pont-facturx.com/
- heroImage: /realisations/pont-facturx.png
- featuredOrder: 2
- tone: dark
- categories FR: Logiciel B2B, Facturation électronique, API, Automatisation
- categories EN: B2B Software, E-invoicing, API, Automation
- status: Produit du studio, en production / Studio product, live
- next: goodcall

GoodCall
- key/slug: goodcall
- kind: product
- liveUrl: https://goodcall.gg/en/
- heroImage: /realisations/goodcall.png
- featuredOrder: 3
- tone: energy
- categories FR: Esport, Pronostics, Social, Classements
- categories EN: Esports, Predictions, Social, Rankings
- summary must describe it only as a free esports prediction platform and may name LoL, Valorant and CS2 because the current repository already does.
- status: Produit du studio, en production / Studio product, live
- next: pick4me

DocExtract
- key/slug: docextract
- kind: product
- liveUrl: https://www.getdocextract.com/
- heroImage: /realisations/docextract.png
- categories: SaaS B2B, extraction de documents / B2B SaaS, document extraction
- not featured in homepage top 3

Manteigaria
- key/slug: manteigaria
- kind: concept
- liveUrl: https://manteigaria-redesign.vercel.app/
- beforeUrl: https://manteigaria.com/fr/
- heroImage: /realisations/manteigaria-before.png
- status must explicitly say concept / uncommissioned redesign, never imply a commissioned client project.
```

For `challenge`, `solution`, `capabilities`, `outcome`, and `technologies`, include only facts already defensible from repository/project documentation. If a specific implementation fact cannot be evidenced in the repository, omit it from the array instead of inventing it. Arrays may be empty in Lot 01; Lot 03 fills flagship detail after verifying project evidence. Empty arrays are allowed data, not visible placeholder copy.

- [ ] **Step 5: Create `src/content/projects/index.ts`**

The module must expose:

```ts
import { docextract } from "./docextract";
import { goodcall } from "./goodcall";
import { manteigaria } from "./manteigaria";
import { pick4me } from "./pick4me";
import { pontFacturx } from "./pont-facturx";
import type { ProjectKey } from "./types";

export const PROJECTS = [pick4me, pontFacturx, goodcall, docextract, manteigaria] as const;
export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featuredOrder).sort(
  (a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999),
);

export function getProject(key: ProjectKey) {
  return PROJECTS.find((project) => project.key === key) ?? null;
}

export * from "./types";
```

- [ ] **Step 6: Create `src/content/services/types.ts`**

```ts
import type { ProjectKey } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import type { ServiceKey } from "@/lib/site-routes";

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

- [ ] **Step 7: Create all six service records with the approved service framing**

Required proof mapping:

```ts
applications.proofProjects = ["pick4me"];
mvp.proofProjects = ["goodcall"];
backends.proofProjects = ["pick4me", "pont-facturx"];
automation.proofProjects = ["docextract", "pont-facturx"];
web.proofProjects = ["manteigaria"];
devops.proofProjects = [];
```

Required primary title/message anchors:

```text
Applications web & SaaS
FR title: Des produits web conçus autour de votre métier, pas autour d’un template.
EN: Web products designed around your business, not around a template.

MVP & produits digitaux
FR: Passer d’une idée à un vrai produit, sans construire six mois de fonctionnalités inutiles.
EN: Turn an idea into a real product without spending six months building unnecessary features.

APIs & backends
FR: Le produit que vos utilisateurs ne voient pas, mais sur lequel tout repose.
EN: The part your users do not see, but everything else depends on.

Automatisation & IA
FR: Automatiser ce qui coûte du temps avant d’ajouter de l’IA là où elle apporte réellement quelque chose.
EN: Automate what wastes time first, then apply AI where it creates real value.

Sites premium & refonte
FR: Votre site est souvent le premier contact avec votre entreprise. Il doit être au niveau de ce que vous faites réellement.
EN: Your website is often the first contact with your company. It should match the quality of what you actually do.

DevOps, cloud & déploiement
FR: Mettre un produit en ligne est une étape. Le garder fiable en est une autre.
EN: Putting a product online is one step. Keeping it reliable is another.
```

Populate `useCases`, `approach`, `engineering` and FAQ from the approved service sections in the validated spec. Keep business outcomes before stack names. Do not add timing guarantees such as “MVP in 7 days”.

- [ ] **Step 8: Create `src/content/services/index.ts`**

```ts
import { applications } from "./applications";
import { automation } from "./automation";
import { backends } from "./backends";
import { devops } from "./devops";
import { mvp } from "./mvp";
import { web } from "./web";
import type { ServiceKey } from "@/lib/site-routes";

export const SERVICES = [applications, mvp, backends, automation, web, devops] as const;

export function getService(key: ServiceKey) {
  const service = SERVICES.find((item) => item.key === key);
  if (!service) throw new Error(`Unknown service key: ${key}`);
  return service;
}

export * from "./types";
```

- [ ] **Step 9: Run the registry tests and copy scan**

```bash
npm test -- src/content/content-registry.test.ts
rg -n "—" src/content/projects src/content/services && exit 1 || true
```

Expected: test PASS and `rg` produces no match.

- [ ] **Step 10: Commit**

```bash
git add src/content/projects src/content/services src/content/content-registry.test.ts
git commit -m "feat: centralize project and service content"
```

---

### Task 5: Establish the approved visual token system and reusable layout primitives

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `src/app/_shared/root.tsx`
- Create: `src/components/ui/container.tsx`
- Create: `src/components/ui/section.tsx`
- Create: `src/components/ui/eyebrow.tsx`
- Create: `src/components/ui/editorial-accent.tsx`
- Create: `src/components/ui/layout-primitives.test.tsx`

**Interfaces:**
- Produces CSS variables `--rs-bg`, `--rs-surface`, `--rs-fg`, `--rs-muted`, `--rs-accent`, `--rs-accent-hover`, `--rs-border`, `--rs-border-strong`, `--rs-section-space`, `--rs-container` and font variables `--font-sans`, `--font-serif`.

- [ ] **Step 1: Write a failing render test for the primitives**

Create `src/components/ui/layout-primitives.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "@/components/ui/container";
import { EditorialAccent } from "@/components/ui/editorial-accent";
import { Section } from "@/components/ui/section";

it("renders semantic layout primitives without forcing client state", () => {
  render(
    <Section as="section" id="proof">
      <Container>
        <h2>
          Build <EditorialAccent>better</EditorialAccent>
        </h2>
      </Container>
    </Section>,
  );

  expect(screen.getByRole("heading", { name: "Build better" })).toBeInTheDocument();
  expect(document.getElementById("proof")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and confirm missing modules**

```bash
npm test -- src/components/ui/layout-primitives.test.tsx
```

Expected: FAIL because the new primitives do not exist.

- [ ] **Step 3: Update fonts in `src/app/_shared/root.tsx`**

Keep `Plus_Jakarta_Sans` as the primary modern sans and replace the secondary display font with `Source_Serif_4` for restrained editorial accents.

Use:

```ts
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
```

The body class must include both variables and `antialiased`.

Do not remove `AnalyticsLoader`, `CookieConsent`, `WebVitalsReporter` or the skip link.

- [ ] **Step 4: Add the Rayan Studio token variables in `globals.css`**

Add these values as the canonical new design tokens without deleting legacy utility rules still used by existing pages:

```css
:root {
  --rs-bg: #f4f4f1;
  --rs-surface: #ffffff;
  --rs-surface-subtle: #ecece7;
  --rs-fg: #0b0b0e;
  --rs-muted: #696970;
  --rs-accent: #5957d9;
  --rs-accent-hover: #4745bd;
  --rs-border: rgba(11, 11, 14, 0.14);
  --rs-border-strong: rgba(11, 11, 14, 0.28);
  --rs-dark: #09090c;
  --rs-dark-surface: #121218;
  --rs-dark-fg: #f7f7f4;
  --rs-dark-muted: #a2a2aa;
  --rs-container: 86rem;
  --rs-reading: 46rem;
  --rs-section-space: clamp(5rem, 9vw, 9rem);
  --rs-radius-sm: 0.75rem;
  --rs-radius-md: 1.25rem;
  --rs-radius-lg: 2rem;
  --rs-motion-fast: 160ms;
  --rs-motion-medium: 240ms;
}
```

Add `.rs-theme-dark` scoped variables rather than changing the whole legacy site dark/light behavior.

- [ ] **Step 5: Map the token system in `tailwind.config.ts`**

Extend, do not erase unrelated existing config:

```ts
colors: {
  rs: {
    bg: "var(--rs-bg)",
    surface: "var(--rs-surface)",
    subtle: "var(--rs-surface-subtle)",
    fg: "var(--rs-fg)",
    muted: "var(--rs-muted)",
    accent: "var(--rs-accent)",
    "accent-hover": "var(--rs-accent-hover)",
    border: "var(--rs-border)",
    dark: "var(--rs-dark)",
  },
},
fontFamily: {
  sans: ["var(--font-sans)", "sans-serif"],
  serif: ["var(--font-serif)", "serif"],
},
```

- [ ] **Step 6: Implement `Container`, `Section`, `Eyebrow`, `EditorialAccent` as Server-compatible components**

Use `cn` from `@/lib/utils`. Do not add `"use client"`.

`Container` contract:

```tsx
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[var(--rs-container)] px-5 md:px-8", className)} {...props} />;
}
```

`Section` must support `as="section" | "div"` and default to semantic `section`, with `py-[var(--rs-section-space)]`.

`EditorialAccent` uses `font-serif font-normal italic` and must remain an inline span.

- [ ] **Step 7: Add global reduced-motion fallback**

In `globals.css` add:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 8: Run tests, lint and typecheck**

```bash
npm test -- src/components/ui/layout-primitives.test.tsx
npm run lint
npm run typecheck
```

Expected: all PASS.

- [ ] **Step 9: Commit**

```bash
git add src/app/globals.css src/app/_shared/root.tsx tailwind.config.ts src/components/ui/container.tsx src/components/ui/section.tsx src/components/ui/eyebrow.tsx src/components/ui/editorial-accent.tsx src/components/ui/layout-primitives.test.tsx
git commit -m "feat: add redesign visual foundation"
```

---

### Task 6: Add reusable motion primitives with reduced-motion behavior

**Files:**
- Create: `src/components/motion/reveal.tsx`
- Create: `src/components/motion/fade.tsx`
- Create: `src/components/motion/stagger.tsx`
- Create: `src/components/motion/parallax-media.tsx`
- Create: `src/components/motion/motion-primitives.test.tsx`

**Interfaces:**
- Produces client-only motion wrappers used by home/work/navigation.
- Every primitive must use `useReducedMotion()` from Framer Motion and remove parallax/translation when reduced motion is requested.

- [ ] **Step 1: Write a failing smoke test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return { ...actual, useReducedMotion: () => true };
});

import { Reveal } from "@/components/motion/reveal";

it("renders reveal content when reduced motion is enabled", () => {
  render(<Reveal><span>Visible proof</span></Reveal>);
  expect(screen.getByText("Visible proof")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify failure**

```bash
npm test -- src/components/motion/motion-primitives.test.tsx
```

Expected: missing module failure.

- [ ] **Step 3: Implement the four primitives**

Rules:

- `Reveal`: opacity + small y transition only when motion is allowed.
- `Fade`: opacity transition only.
- `Stagger`: parent wrapper that changes child delay; do not hard-code content.
- `ParallaxMedia`: use `useScroll`/`useTransform`, maximum visual translation 40px desktop, 16px mobile, zero under reduced motion.
- No WebGL, shader or autoplay video use.

- [ ] **Step 4: Run tests and typecheck**

```bash
npm test -- src/components/motion/motion-primitives.test.tsx
npm run typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion
git commit -m "feat: add accessible motion primitives"
```

---

### Task 7: Build the new accessible mega-navigation and footer in isolation

**Files:**
- Create: `src/content/navigation.ts`
- Create: `src/components/navigation/site-header.tsx`
- Create: `src/components/navigation/desktop-mega-menu.tsx`
- Create: `src/components/navigation/mobile-menu.tsx`
- Create: `src/components/navigation/language-switch.tsx`
- Create: `src/components/navigation/site-footer.tsx`
- Create: `src/components/navigation/site-header.test.tsx`
- Read only: `src/components/site/Navbar.tsx`
- Read only: `src/components/site/Footer.tsx`

**Interfaces:**
- Consumes: route helpers, service/project registries, `Locale`.
- Produces: `<SiteHeader locale />` and `<SiteFooter locale />` ready for Lot 02 cutover.

- [ ] **Step 1: Define navigation content from the approved IA**

Create `src/content/navigation.ts` so link targets are generated from route helpers, never hard-coded duplicate slugs.

Desktop groups must exactly represent:

```text
Services
BUILD: Applications web & SaaS; MVP & produits digitaux; APIs & backends
OPTIMIZE: Automatisation & IA; Sites premium & refonte
RUN: DevOps, cloud & déploiement
FEATURED: Pick4Me

Work
SELECTED WORK: Pick4Me; Pont Factur-X; GoodCall
EXPLORE: Tous les projets; Études de cas
FEATURED: Pick4Me initially

Studio
À PROPOS: Rayan Studio; Rayan Sekkat
TRAVAILLER ENSEMBLE: Notre méthode; Offres; FAQ
CONTACT: Démarrer un projet; Nous contacter
No featured card

Insights
GUIDES: Articles; Guides pratiques
RESOURCES: Checklists; Templates; Outils
FEATURED: the launch guide `Comment préparer un projet SaaS` once Lot 05 registers it; until then link the category `/insights/guides`, not a fake article slug.
```

English labels are natural English translations while route targets come from `site-routes.ts`.

- [ ] **Step 2: Write interaction tests before the header implementation**

Create `src/components/navigation/site-header.test.tsx` with these required assertions:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/navigation/site-header";

describe("SiteHeader", () => {
  it("opens Services with aria-expanded and closes it on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader locale="fr" />);
    const trigger = screen.getByRole("button", { name: "Services" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Applications web & SaaS/i })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("uses the canonical start-project path", () => {
    render(<SiteHeader locale="en" />);
    expect(screen.getByRole("link", { name: /Start a project/i })).toHaveAttribute(
      "href",
      "/en/start-a-project",
    );
  });

  it("exposes a mobile menu button with aria controls", () => {
    render(<SiteHeader locale="fr" />);
    const button = screen.getByRole("button", { name: /Ouvrir le menu/i });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "mobile-site-menu");
  });
});
```

Mock `next/navigation` only if a tested behavior requires it. Do not weaken role/name assertions to generic selectors.

- [ ] **Step 3: Run and confirm the component test fails**

```bash
npm test -- src/components/navigation/site-header.test.tsx
```

Expected: missing component failure.

- [ ] **Step 4: Implement `SiteHeader` behavior**

Required behavior:

- wordmark text only: `RAYAN STUDIO`; no `RS` monogram;
- transparent at top of page;
- add an opaque/blurred surface after `window.scrollY >= 24`;
- hide while scrolling down after `window.scrollY > 120` and show immediately when scrolling upward;
- movement transition duration between 150ms and 250ms;
- one mega-menu open at a time;
- desktop triggers are real `<button>` elements with `aria-expanded` and `aria-controls`;
- `Escape` closes an open menu and returns focus to its trigger;
- pointer hover may open a menu, but click/focus/keyboard must provide the full experience without hover;
- clicking a link closes the menu;
- main CTA label FR `Parler de votre projet`, EN `Start a project`;
- language switch preserves an equivalent route where the helper can map it; otherwise it falls back to the other-locale homepage. Lot 02/05 may extend equivalence for new dynamic pages.

- [ ] **Step 5: Implement `DesktopMegaMenu`**

Visual constraints:

- wide, spacious panel;
- 2–3 logical columns;
- 18–22px primary link text at desktop depending on hierarchy;
- thin border and restrained shadow/glow;
- indigo accent only for active/hover detail;
- no glassmorphism wall, no pill grid, no giant SaaS gradient.

Accessibility:

- panel has an ID matching the trigger `aria-controls`;
- links remain in DOM only while menu is open or are correctly hidden from the accessibility tree;
- focus order follows visual order.

- [ ] **Step 6: Implement `MobileMenu` as a full-screen accessible menu**

Required behavior:

- full viewport overlay below/including header as appropriate;
- accordion sections for Services, Work, Studio, Insights;
- visible FR/EN switch;
- dominant start-project CTA;
- body scroll locked while open and restored on cleanup;
- `Escape` closes and returns focus to the menu toggle;
- no interaction depends on hover;
- focus remains inside the open full-screen menu until closed.

Reuse the focus-trap logic from the current `Navbar.tsx` only where it remains correct; do not copy its old route labels or old warm/orange styling.

- [ ] **Step 7: Implement `SiteFooter`**

Footer must contain:

- wordmark;
- Services links;
- Work links;
- Studio links;
- Insights links;
- Contact/start-project links;
- legal links to existing `/mentions-legales`, `/politique-confidentialite`, `/cgv`;
- language switch;
- `ManageCookiesButton` so consent can be reopened.

Do not add fabricated address/team/company registration claims.

- [ ] **Step 8: Run navigation tests, then full root checks**

```bash
npm test -- src/components/navigation/site-header.test.tsx
npm run lint
npm run typecheck
npm test
```

Expected: all PASS.

- [ ] **Step 9: Commit**

```bash
git add src/content/navigation.ts src/components/navigation
git commit -m "feat: add studio mega navigation"
```

---

### Task 8: Add a permanent local-SEO preservation contract before visual cutover

**Files:**
- Create: `src/lib/local-seo-preservation.test.ts`
- Modify: none of the local route code unless this test exposes an existing defect.

**Interfaces:**
- Consumes: `getAllLocalSeoCombos()` from `src/lib/local-seo.ts`.
- Produces: a regression test that blocks accidental reduction of the 7 sectors × 10 cities surface.

- [ ] **Step 1: Add the invariant test**

```ts
import { describe, expect, it } from "vitest";
import { getAllLocalSeoCombos, localSeoCities, localSeoSectors } from "@/lib/local-seo";

describe("local SEO preservation contract", () => {
  it("keeps exactly 7 sectors and 10 cities for 70 acquisition pages", () => {
    expect(localSeoSectors).toHaveLength(7);
    expect(localSeoCities).toHaveLength(10);
    expect(getAllLocalSeoCombos()).toHaveLength(70);
  });

  it("keeps every sector/city pair unique", () => {
    const paths = getAllLocalSeoCombos().map(
      ({ sector, city }) => `/site/${sector.slug}/${city.slug}`,
    );
    expect(new Set(paths).size).toBe(70);
  });
});
```

- [ ] **Step 2: Run the test**

```bash
npm test -- src/lib/local-seo-preservation.test.ts
```

Expected: PASS against the current 7 × 10 implementation.

- [ ] **Step 3: Run the complete Lot 01 gate**

```bash
npm run lint
npm run typecheck
npm test
npm --prefix scripts test
npm run build
```

Expected: all commands exit `0`.

- [ ] **Step 4: Inspect the branch scope**

```bash
git status --short
git diff main...HEAD --stat
```

Expected: only guidance, root test infrastructure, route/content/design/navigation foundation and invariant tests. No homepage cutover, no prospection changes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/local-seo-preservation.test.ts
git commit -m "test: protect local SEO route surface"
```

---

## Lot 01 Review Gate

Do not merge Lot 01 until all of the following are true:

```text
[ ] PROJECT_MEMORY current guidance says software-first 70/30 and preserves local SEO/outreach history.
[ ] Root Vitest/Testing Library infrastructure is functional.
[ ] `npm run typecheck` exists and passes.
[ ] Route helpers return every canonical FR/EN path from the master plan.
[ ] Project registry order is Pick4Me, Pont Factur-X, GoodCall for featured work.
[ ] Manteigaria is explicitly represented as a concept/uncommissioned redesign.
[ ] Six service records exist with the approved proof mapping.
[ ] New design tokens are black/off-white/gray with restrained indigo accent.
[ ] Sans + serif font variables exist and serif is only an accent primitive.
[ ] New header uses wordmark only, no RS monogram.
[ ] Desktop mega-menus work by keyboard and Escape.
[ ] Mobile menu is full-screen, focus-contained and not hover-dependent.
[ ] Footer exposes legal and cookie-management links.
[ ] `getAllLocalSeoCombos()` remains exactly 70.
[ ] Existing homepage remains functional because public cutover is deferred to Lot 02.
[ ] `npm run lint`, `npm run typecheck`, `npm test`, `npm --prefix scripts test`, `npm run build` all pass.
```
