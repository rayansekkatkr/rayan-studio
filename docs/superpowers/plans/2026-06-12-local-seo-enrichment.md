# Local SEO Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing 70 local SEO pages by adding city and sector-specific content blocks, richer metadata, and stronger internal links.

**Architecture:** Keep the existing `/site/[sector]/[city]` route. Add a tested helper that combines sector profiles and city profiles into page-specific content consumed by the route and `LocalSeoLanding`.

**Tech Stack:** Next.js 14 App Router, TypeScript, CommonJS helper tests with Node test runner.

---

### Task 1: Local SEO Content Helper

**Files:**
- Create: `src/lib/local-seo-content.js`
- Create: `src/lib/local-seo-content.d.ts`
- Test: `scripts/local-seo-content.test.js`

- [x] **Step 1: Write failing tests**

Test that Paris restaurant and Lyon hotel pages generate different city-specific intros, sector-specific pain points, and metadata over 120 characters.

- [x] **Step 2: Run test to verify it fails**

Run: `node --test scripts/local-seo-content.test.js`
Expected: FAIL because helper does not exist.

- [x] **Step 3: Implement helper**

Add city profiles, sector profiles, and `buildLocalSeoContent({ citySlug, cityLabel, sectorSlug, sectorLabel, kpi })`.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test scripts/local-seo-content.test.js`
Expected: PASS.

### Task 2: Page Integration

**Files:**
- Modify: `src/app/site/[sector]/[city]/page.tsx`
- Modify: `src/components/site/LocalSeoLanding.tsx`

- [x] **Step 1: Use helper in metadata**

Generate title/description from the enriched content.

- [x] **Step 2: Render enriched blocks**

Add local context, sector pain points, checklist, and service cross-links.

### Task 3: Verification

Run:

```bash
node --test scripts/local-seo-content.test.js scripts/service-seo.test.js scripts/contact-errors.test.js scripts/pricing-leads.test.js scripts/outreach.test.js
npx tsc --noEmit
npm run lint
npm run build
git diff --check
```

Expected: all commands exit 0.
