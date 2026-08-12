# Rayan Studio Redesign Lot 05 Insights and SEO Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Launch the typed bilingual Insights library, migrate legacy indexed URLs to intent-equivalent canonical destinations, expand sitemap/metadata coverage, preserve all 70 local SEO routes and visually align their shell with the new studio brand.

**Architecture:** Keep Insights as local typed content with a discriminated block model, no external CMS. Generate category/detail pages from centralized records. Share one explicit redirect map between `next.config.mjs` and tests. Rebuild sitemap from canonical route/content registries and retain local SEO entries as a separate FR acquisition surface.

**Tech Stack:** Next.js App Router metadata/sitemap APIs, TypeScript typed content, existing route/content helpers, Vitest, existing local SEO data.

## Global Constraints

- No external CMS.
- Initial editorial library stays small and useful; no thin SEO content farm.
- Editorial intros must be concrete, not generic “digital transformation” filler.
- Keep local SEO intent distinct from the new software-studio main brand.
- Never mass-redirect the 70 local pages to homepage/services.
- Legacy non-local routes receive explicit one-to-one redirects to the closest genuine new equivalent.
- Public copy contains no `—`.
- Sitemap includes canonical pages only, not redirect sources.
- Core metadata has canonical + FR/EN alternates + x-default where a bilingual equivalent exists.

---

### Task 1: Add typed Insights records and the launch editorial set

**Files:**
- Create: `src/content/insights/types.ts`
- Create: `src/content/insights/index.ts`
- Create: `src/content/insights/prepare-saas.ts`
- Create: `src/content/insights/mvp-v1.ts`
- Create: `src/content/insights/redesign-or-new.ts`
- Create: `src/content/insights/application-launch-checklist.ts`
- Create: `src/content/insights/project-brief-template.ts`
- Create: `src/content/insights/no-code-saas-custom.ts`
- Create: `src/content/insights/legacy-redesign-checklist.ts`
- Create: `src/content/insights/insights.test.ts`

**Interfaces:**
- Produces `InsightKey`, `InsightRecord`, `INSIGHTS`, `FEATURED_INSIGHT`, `getInsight`, `getInsightsByCategory`, `resolveInsightSlug`.
- Consumes `Locale`, `ServiceKey`, `InsightCategoryKey`.

- [ ] **Step 1: Define the typed editorial block model**

Create `src/content/insights/types.ts`:

```ts
import type { Locale } from "@/lib/i18n";
import type { InsightCategoryKey, ServiceKey } from "@/lib/site-routes";

export type InsightKey =
  | "prepare-saas"
  | "mvp-v1"
  | "redesign-or-new"
  | "application-launch-checklist"
  | "project-brief-template"
  | "no-code-saas-custom"
  | "legacy-redesign-checklist";

export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "checklist"; items: string[] }
  | { type: "callout"; title: string; body: string };

export type InsightRecord = {
  key: InsightKey;
  category: InsightCategoryKey;
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  relatedService: ServiceKey;
  blocks: Record<Locale, InsightBlock[]>;
};
```

- [ ] **Step 2: Write failing registry tests**

Test exact keys/order, one featured item only, every item has FR/EN slug/body, no duplicate slug per locale/category, no em dash, and all category keys resolve.

Required featured item:

```text
prepare-saas
```

- [ ] **Step 3: Register the six approved new pieces plus one migrated legacy checklist**

Canonical content map:

```text
prepare-saas
category: guides
FR slug: preparer-projet-saas
EN slug: prepare-saas-project
FR title: Comment préparer un projet SaaS
EN title: How to prepare a SaaS project
related service: applications
featured: true

mvp-v1
category: guides
FR slug: mvp-fonctionnalites-v1
EN slug: mvp-v1-features
FR title: MVP : quelles fonctionnalités garder pour la V1 ?
EN title: MVP: which features belong in V1?
related service: mvp

redesign-or-new
category: articles
FR slug: refonte-ou-nouveau-site
EN slug: redesign-or-new-website
FR title: Refonte ou nouveau site : comment décider ?
EN title: Redesign or rebuild: how should you decide?
related service: web

application-launch-checklist
category: checklists
FR slug: checklist-lancement-application
EN slug: application-launch-checklist
FR title: Checklist avant le lancement d’une application
EN title: Application launch checklist
related service: devops

project-brief-template
category: templates
FR slug: template-cahier-des-charges-digital
EN slug: digital-project-brief-template
FR title: Template de cahier des charges digital
EN title: Digital project brief template
related service: mvp

no-code-saas-custom
category: guides
FR slug: no-code-saas-ou-sur-mesure
EN slug: no-code-saas-or-custom-development
FR title: No-code, SaaS existant ou développement sur mesure ?
EN title: No-code, existing SaaS or custom development?
related service: applications

legacy-redesign-checklist
category: checklists
FR slug: checklist-refonte-site-internet
EN slug: website-redesign-checklist
FR title: Checklist avant de refondre un site internet
EN title: Website redesign checklist
related service: web
```

The seventh item is migrated existing acquisition content and does not contradict the “small launch set” goal; it preserves the exact legacy checklist search intent.

- [ ] **Step 4: Write concrete editorial outlines, not generic filler**

Required block outlines:

`prepare-saas`:

```text
Problem before features
Primary users and roles
V1 scope
Data/integrations
Operational/admin needs
Launch and evolution
Callout: a complex SaaS risk is usually scope before framework choice
```

`mvp-v1`:

```text
Define the single behavior that proves value
Separate must-have workflow from convenience
Keep admin/support needs visible
Postpone secondary automation
Set a V1 exit criterion
```

`redesign-or-new`:

```text
Keep when structure/technology remain healthy
Rebuild when content architecture, UX and technical constraints fail together
Audit SEO/redirect risk before changing URLs
Decide with evidence, not aesthetic fatigue
```

`application-launch-checklist`:

```text
Environment/config
Authentication/permissions
Backups
Observability
Error states
Analytics consent
SEO/meta where public
Rollback/support owner
```

`project-brief-template`:

```text
Problem
Users
Current process
Desired workflow
Must-have scope
Integrations
Constraints
Timing
Success definition
```

`no-code-saas-custom`:

```text
Use existing SaaS when the workflow is standard
Use no-code when speed/validation matters more than deep control
Use custom development when the workflow/integration/product is differentiated
Compare ownership, integrations, maintenance and exit cost
```

`legacy-redesign-checklist` must preserve the existing legacy page’s practical themes: first impression, offer clarity, mobile contact path, SEO metadata, DNS/hosting/redirects/SSL, and launch plan.

Every article should begin with a direct useful premise. Do not begin with phrases equivalent to “Dans un monde de plus en plus digitalisé” / “In today’s digital world”.

- [ ] **Step 5: Add registry helpers**

`src/content/insights/index.ts` exports:

```ts
export const INSIGHTS: readonly InsightRecord[];
export const FEATURED_INSIGHT: InsightRecord;
export function getInsight(key: InsightKey): InsightRecord;
export function getInsightsByCategory(category: InsightCategoryKey): InsightRecord[];
export function resolveInsightSlug(locale: Locale, category: InsightCategoryKey, slug: string): InsightRecord | null;
```

- [ ] **Step 6: Run and commit**

```bash
npm test -- src/content/insights/insights.test.ts
rg -n "—" src/content/insights && exit 1 || true
git add src/content/insights
git commit -m "content: add typed insights library"
```

---

### Task 2: Build Insights index, categories, articles and one useful lightweight tool

**Files:**
- Create: `src/app/(localized)/[locale]/insights/page.tsx`
- Create: `src/app/(localized)/[locale]/insights/[category]/page.tsx`
- Create: `src/app/(localized)/[locale]/insights/[category]/[slug]/page.tsx`
- Create: `src/components/insights/insights-index.tsx`
- Create: `src/components/insights/insight-card.tsx`
- Create: `src/components/insights/insight-article.tsx`
- Create: `src/components/insights/insight-blocks.tsx`
- Create: `src/components/insights/project-readiness-tool.tsx`
- Create: `src/components/insights/insights-pages.test.tsx`
- Modify: `src/components/home/insights-preview.tsx`
- Modify: `src/content/navigation.ts`

**Interfaces:**
- Consumes: Insights registry, `insightPath`, service route helper, `TrackedLink`/analytics.
- Produces canonical Insights pages and real featured-resource links.

- [ ] **Step 1: Write article/index tests**

Assertions:

- featured guide is `prepare-saas`;
- article body width wrapper uses a reading-width class/token near `--rs-reading`;
- category page returns only items of that category;
- tools category renders `ProjectReadinessTool`, not a “coming soon” placeholder;
- every article links to its `relatedService`.

- [ ] **Step 2: Implement `/insights` as an editorial library**

Hero direction:

```text
FR: Guides, ressources et retours d’expérience pour mieux construire vos produits digitaux.
EN: Guides, resources and practical thinking for building better digital products.
```

Layout:

- one large featured guide;
- grouped Guides/Articles;
- Resources for Checklists/Templates;
- Tools entry;
- no chronological “latest posts” wall.

- [ ] **Step 3: Implement category pages**

`[category]` resolves with `resolveInsightCategorySlug(locale, params.category)`, `notFound()` if invalid.

Category roots:

```text
articles
guides
checklists
templates
outils/tools
```

Tools page is special: render one lightweight interactive `ProjectReadinessTool` plus links to relevant guides.

- [ ] **Step 4: Implement the lightweight Project Readiness tool**

No PII, no persistence, no financial estimate.

Questions:

```text
Do you know the primary user?
Can you describe the main workflow in one paragraph?
Have you identified must-have V1 features?
Do you know the required integrations/data sources?
Do you know who operates/supports the product after launch?
```

FR/EN localized.

Output based only on count:

```text
0-2 yes: clarify the problem and workflow before estimating build work.
3-4 yes: enough context for a useful discovery conversation; remaining unknowns should be framed.
5 yes: the project is well prepared for a technical/product discussion.
```

CTA to start project. Optional analytics event `insight_tool_complete { score }` is allowed because it contains no PII and remains consent-gated.

- [ ] **Step 5: Implement article rendering**

Use the typed block union. Reading column max width uses `var(--rs-reading)`. Render semantic headings, lists, checklist and callout.

Article footer:

```text
Related service -> canonical service page
Start a project -> canonical conversion page
Related insights -> up to 3 records, same/adjacent useful category
```

- [ ] **Step 6: Implement detail route static params and metadata**

`generateStaticParams()` returns every locale/category/slug combination from `INSIGHTS`.

At render:

- resolve localized category;
- resolve insight localized slug;
- `notFound()` when no exact locale match;
- metadata title/description/canonical/alternate;
- breadcrumbs Home -> Insights -> Category -> Article;
- `Article` structured data with visible title/description/date only. Do not fabricate author organization beyond `BRAND`/founder data already established.

- [ ] **Step 7: Replace homepage and mega-menu temporary category links with real featured insight**

`InsightsPreview` first item links to `prepare-saas` detail. Secondary items link to actual `application-launch-checklist` and `redesign-or-new` detail pages.

Mega-menu Featured links to `prepare-saas`.

- [ ] **Step 8: Run and commit**

```bash
npm test -- src/components/insights/insights-pages.test.tsx src/content/insights/insights.test.ts
npm run lint
npm run typecheck
npm run build
git add src/app/'(localized)'/'[locale]'/insights src/components/insights src/components/home/insights-preview.tsx src/content/navigation.ts
git commit -m "feat: launch bilingual insights library"
```

---

### Task 3: Add the explicit legacy redirect map and redirect tests

**Files:**
- Create: `config/legacy-redirects.mjs`
- Create: `src/lib/legacy-redirects.test.ts`
- Modify: `next.config.mjs`
- Keep for migration evidence: `src/lib/service-seo.js` and `src/app/(localized)/[locale]/[service]/page.tsx` until after release.

**Interfaces:**
- `next.config.mjs` consumes `LEGACY_REDIRECTS`.
- Tests consume the same list so runtime and expectations cannot drift.

- [ ] **Step 1: Create this exact redirect map**

`config/legacy-redirects.mjs`:

```js
export const LEGACY_REDIRECTS = [
  { source: "/a-propos-methodologie-preuves", destination: "/fr/studio/rayan-studio", permanent: true },
  { source: "/fr/a-propos-methodologie-preuves", destination: "/fr/studio/rayan-studio", permanent: true },
  { source: "/en/a-propos-methodologie-preuves", destination: "/en/studio/rayan-studio", permanent: true },

  { source: "/fr/refonte-site-internet", destination: "/fr/services/sites-web-refonte", permanent: true },
  { source: "/fr/cout-refonte-site-internet-petite-entreprise", destination: "/fr/studio/offres", permanent: true },
  { source: "/fr/checklist-refonte-site-internet", destination: "/fr/insights/checklists/checklist-refonte-site-internet", permanent: true },
  { source: "/fr/creation-site-vitrine", destination: "/fr/services/sites-web-refonte", permanent: true },
  { source: "/fr/site-internet-petite-entreprise", destination: "/fr/services/sites-web-refonte", permanent: true },
  { source: "/fr/application-web-sur-mesure", destination: "/fr/services/applications-web-saas", permanent: true },

  { source: "/en/website-redesign", destination: "/en/services/premium-websites-redesign", permanent: true },
  { source: "/en/small-business-website-redesign-cost", destination: "/en/studio/offers", permanent: true },
  { source: "/en/small-business-website", destination: "/en/services/premium-websites-redesign", permanent: true },
  { source: "/en/custom-web-application", destination: "/en/services/web-applications-saas", permanent: true },

  { source: "/fr/start-a-project", destination: "/fr/demarrer-un-projet", permanent: true },
  { source: "/en/demarrer-un-projet", destination: "/en/start-a-project", permanent: true },
];
```

Do not add any `/site/:sector/:city` pattern redirect.

- [ ] **Step 2: Write migration-coverage tests against the existing legacy service list**

Because `src/lib/service-seo.js` is CommonJS, import via `createRequire` in test if needed.

Assertions:

```text
Every existing `getAllServiceSeoPages().path` appears once as a redirect source.
Every redirect destination is a canonical new route.
No redirect source starts with `/site/`.
No source equals destination.
All entries are permanent.
```

If the coverage test reveals an existing legacy service path missing from the explicit map above, do not guess its destination. Inspect its intent/content, add the genuinely equivalent new target, and document the additional mapping in this plan’s implementation report before continuing.

- [ ] **Step 3: Use the shared map in `next.config.mjs`**

```js
import { LEGACY_REDIRECTS } from "./config/legacy-redirects.mjs";

async redirects() {
  return LEGACY_REDIRECTS;
}
```

Preserve all current security headers and remote image settings.

- [ ] **Step 4: Run tests/build and commit**

```bash
npm test -- src/lib/legacy-redirects.test.ts
npm run build
git add config/legacy-redirects.mjs src/lib/legacy-redirects.test.ts next.config.mjs
git commit -m "feat: add tested legacy route migration map"
```

---

### Task 4: Rebuild sitemap from canonical registries while preserving all 70 local routes

**Files:**
- Modify: `src/app/sitemap.ts`
- Create: `src/app/sitemap.test.ts`

**Interfaces:**
- Consumes route helpers, service/project/insight registries, local SEO combinations.
- Produces only canonical non-redirect sitemap URLs.

- [ ] **Step 1: Write the sitemap invariant test first**

Test output from `sitemap()` and assert:

```text
70 URLs start with `${base}/site/`
/fr and /en both exist
12 service detail URLs exist
/fr/work and /en/work exist
10 project detail URLs exist
all Studio child canonical pages exist
both contact pages exist
FR + EN canonical start-project pages exist
all Insights records exist in both locales
no legacy redirect source appears
```

Also assert home/services/work/studio/insight bilingual entries include `fr`, `en`, `x-default` where appropriate.

- [ ] **Step 2: Refactor sitemap into small helpers**

Recommended internal helpers in `sitemap.ts` or `src/lib/sitemap.ts`:

```ts
localizedPair(frPath, enPath, priority, changeFrequency)
localSeoEntries()
serviceEntries()
workEntries()
studioEntries()
conversionEntries()
insightEntries()
```

Do not derive canonical routes from legacy `service-seo.js` anymore.

- [ ] **Step 3: Keep local SEO entries unchanged in intent**

Each still uses:

```text
/site/<sector>/<city>
monthly
priority ~0.7
```

Do not add fake EN alternates to FR-only local pages.

- [ ] **Step 4: Run and commit**

```bash
npm test -- src/app/sitemap.test.ts src/lib/local-seo-preservation.test.ts
npm run typecheck
git add src/app/sitemap.ts src/app/sitemap.test.ts
git commit -m "feat: rebuild canonical sitemap for redesign"
```

---

### Task 5: Visually align the local SEO shell without changing its acquisition intent

**Files:**
- Modify: `src/components/site/LocalSeoLanding.tsx`
- Create: `src/components/site/LocalSeoLanding.test.tsx`
- Keep content logic: `src/lib/local-seo-content.js`
- Keep route logic: `src/app/(default)/site/[sector]/[city]/page.tsx`

**Interfaces:**
- Local pages continue using their existing FR content/schema/canonicals but share new SiteHeader/SiteFooter and design tokens.

- [ ] **Step 1: Write a rendering preservation test**

Render a representative local page component with deterministic content and assert:

- heading still contains sector/city;
- internal links to other cities/sectors remain;
- main contact/project CTA remains;
- new `RAYAN STUDIO` header is present;
- no old `RS` monogram is present.

The existing route-combination test already guards all 70 combinations.

- [ ] **Step 2: Replace old Navbar/Footer imports only**

Use:

```ts
import { SiteHeader } from "@/components/navigation/site-header";
import { SiteFooter } from "@/components/navigation/site-footer";
```

Render with `locale="fr"`.

- [ ] **Step 3: Replace legacy warm/orange shell styling with token classes**

Preserve visible content order, local FAQ, city/sector internal links and structured data.

Update major surfaces/text/borders to `rs-*` tokens and new container spacing. Do not rewrite the local SEO copy into software-studio language; its acquisition intent remains local websites.

- [ ] **Step 4: Ensure local CTA destination uses new premium-web service or start-project route deliberately**

Primary commercial CTA should go to `/fr/demarrer-un-projet` or `/fr/services/sites-web-refonte`, not an obsolete homepage hash.

Internal city/sector links remain local SEO routes.

- [ ] **Step 5: Run representative + 70-route tests and commit**

```bash
npm test -- src/components/site/LocalSeoLanding.test.tsx src/lib/local-seo-preservation.test.ts src/app/sitemap.test.ts
npm run lint
npm run typecheck
git add src/components/site/LocalSeoLanding.tsx src/components/site/LocalSeoLanding.test.tsx
git commit -m "feat: align local SEO pages with studio shell"
```

---

### Task 6: Add a shipped-public-copy em-dash scanner and normalize final copy

**Files:**
- Create: `scripts/check-public-copy.mjs`
- Modify: `package.json`
- Modify: `package-lock.json` only if script changes indirectly require it; no package is required.
- Modify any public copy file reported by the scanner.

**Interfaces:**
- Produces `npm run check:copy` and adds it to `npm run verify`.

- [ ] **Step 1: Implement scanner without scanning specs/history/tests**

Scan these runtime/public-copy roots:

```text
src/content
src/components/home
src/components/services
src/components/studio
src/components/work
src/components/insights
src/components/forms
src/components/navigation
src/components/site/LocalSeoLanding.tsx
src/lib/local-seo-content.js
src/app/(localized)
```

Ignore:

```text
*.test.ts
*.test.tsx
*.spec.*
docs/
PROJECT_MEMORY.md
```

For text-source extensions `.ts`, `.tsx`, `.js`, `.jsx`, `.mdx`, fail if the source contains Unicode U+2014 `—`.

Output each offending path and line number, then `process.exitCode = 1`.

- [ ] **Step 2: Add script**

```json
"check:copy": "node scripts/check-public-copy.mjs"
```

Update `verify`:

```json
"verify": "npm run lint && npm run typecheck && npm run check:copy && npm test && npm run build"
```

- [ ] **Step 3: Run the scanner and fix every runtime/public-copy hit**

```bash
npm run check:copy
```

Expected: exit `0` after fixes. Replace em dash with colon, comma, middle dot or separate sentence according to grammar. Do not replace with a simple hyphen where it makes typography worse unless appropriate.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-public-copy.mjs package.json package-lock.json src
git commit -m "test: enforce public copy punctuation rule"
```

---

### Task 7: Run the complete SEO/acquisition migration gate

**Files:**
- No new files unless a failing gate exposes a concrete bug.

- [ ] **Step 1: Run all targeted migration tests**

```bash
npm test -- \
  src/content/insights/insights.test.ts \
  src/components/insights/insights-pages.test.tsx \
  src/lib/legacy-redirects.test.ts \
  src/app/sitemap.test.ts \
  src/lib/local-seo-preservation.test.ts \
  src/components/site/LocalSeoLanding.test.tsx
```

Expected: all PASS.

- [ ] **Step 2: Run full verification**

```bash
npm run lint
npm run typecheck
npm run check:copy
npm test
npm --prefix scripts test
npm run build
```

Expected: all exit `0`.

- [ ] **Step 3: Inspect generated build route list**

Confirm build output contains canonical FR/EN Services, Work, Studio, Insights, Contact/Project routes and the local dynamic static-generation route. Do not assume sitemap test alone proves Next can build each route.

- [ ] **Step 4: Commit only if the gate required a concrete fix**

Use a focused commit message describing the fix; do not create an empty “gate passed” commit.

---

## Lot 05 Review Gate

```text
[ ] Insights has concrete Articles, Guides, Checklists, Templates and one real lightweight Tool experience.
[ ] The six approved launch topics exist, plus the migrated legacy redesign checklist.
[ ] Featured insight is Comment préparer un projet SaaS / How to prepare a SaaS project.
[ ] Homepage and Insights mega-menu link to real content records, not category placeholders.
[ ] Legacy non-local service/about URLs have explicit permanent redirects.
[ ] Every existing service-seo path is covered by the redirect test.
[ ] No /site/:sector/:city redirect exists.
[ ] Sitemap contains exactly 70 local SEO URLs.
[ ] Sitemap contains new canonical commercial/work/studio/insight/conversion routes and excludes redirect sources.
[ ] Local SEO pages keep local/TPE intent and structured data while using new SiteHeader/SiteFooter shell.
[ ] Local pages no longer depend on old homepage hash CTA destinations.
[ ] `npm run check:copy` scans shipped public copy and passes with no em dash.
[ ] No external CMS was added.
[ ] lint, typecheck, copy scan, unit tests, scripts tests and production build all pass.
```
