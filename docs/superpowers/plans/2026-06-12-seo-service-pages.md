# SEO Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve organic visibility by adding focused service pages for core commercial search intents in French and English.

**Architecture:** Add a shared service-page data file, a localized dynamic route under `/:locale/:service`, sitemap entries, and internal links from the homepage, footer, and local SEO pages. Keep the content template reusable but not generic.

**Tech Stack:** Next.js 14 App Router, React, TypeScript, CommonJS helper tests with Node test runner.

---

### Task 1: Service SEO Data

**Files:**
- Create: `src/lib/service-seo.js`
- Test: `scripts/service-seo.test.js`

- [ ] **Step 1: Write the failing test**

```js
const assert = require("node:assert/strict");
const test = require("node:test");

const { getAllServiceSeoPages } = require("../src/lib/service-seo");

test("service SEO pages expose the phase 1 French and English routes", () => {
  const paths = getAllServiceSeoPages().map((page) => page.path).sort();

  assert.deepEqual(paths, [
    "/en/small-business-website",
    "/en/website-redesign",
    "/fr/creation-site-vitrine",
    "/fr/refonte-site-internet",
    "/fr/site-internet-petite-entreprise",
  ]);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/service-seo.test.js`
Expected: FAIL because `service-seo.js` does not exist.

- [ ] **Step 3: Implement service-page data and helpers**

Create service entries with localized metadata, content blocks, FAQs, and helper functions for lookup and sitemap usage.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/service-seo.test.js`
Expected: PASS.

### Task 2: Service Page Route

**Files:**
- Create: `src/app/[locale]/[service]/page.tsx`
- Create: `src/components/site/ServiceSeoPage.tsx`

- [ ] **Step 1: Add dynamic route**

Use `generateStaticParams`, `generateMetadata`, `notFound`, localized canonical paths, and language alternates where a counterpart exists.

- [ ] **Step 2: Add reusable page component**

Render an editorial service page with service promise, proof points, included work, process, FAQ, and clear CTAs.

### Task 3: Internal Links And Sitemap

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/site/Services.tsx`
- Modify: `src/components/site/Footer.tsx`
- Modify: `src/components/site/LocalSeoLanding.tsx`
- Modify: `PROJECT_MEMORY.md`

- [ ] **Step 1: Add service pages to sitemap**

Include all 5 service pages with localized alternates.

- [ ] **Step 2: Add homepage and footer links**

Link from service cards and footer to the new pages using descriptive anchor text.

- [ ] **Step 3: Add local SEO cross-links**

Add links from local SEO pages to the refonte and creation service pages.

- [ ] **Step 4: Update project memory**

Record the SEO phase 1 service-page architecture.

### Task 4: Verification

Run:

```bash
node --test scripts/service-seo.test.js scripts/contact-errors.test.js scripts/pricing-leads.test.js scripts/outreach.test.js
npx tsc --noEmit
npm run lint
npm run build
git diff --check
```

Expected: all commands exit 0.
