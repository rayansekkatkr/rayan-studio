# Search Console Technical SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prepare Rayan Studio for Google Search Console verification and post-deployment SEO measurement.

**Architecture:** Add a tiny SEO verification helper consumed by the root Next.js metadata object, then document the production checklist for Search Console, sitemap submission, and crawl/index checks. Keep the actual Google token in environment variables, not in source code.

**Tech Stack:** Next.js 14 Metadata API, TypeScript declarations for CommonJS helpers, Node test runner, Markdown documentation.

---

### Task 1: Google Search Console Verification Metadata

**Files:**
- Create: `src/lib/seo-verification.js`
- Create: `src/lib/seo-verification.d.ts`
- Modify: `src/app/layout.tsx`
- Modify: `.env.example`
- Test: `scripts/seo-verification.test.js`

- [x] **Step 1: Write the failing test**

Create tests for `getGoogleSiteVerification`:

```js
assert.equal(getGoogleSiteVerification({ NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "abc123" }), "abc123");
assert.equal(getGoogleSiteVerification({ NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: "   " }), undefined);
```

- [x] **Step 2: Run test to verify it fails**

Run: `node --test scripts/seo-verification.test.js`

Expected: FAIL because `src/lib/seo-verification.js` does not exist yet.

- [x] **Step 3: Implement helper and metadata**

Create `getGoogleSiteVerification(env = process.env)` and wire it into `metadata.verification.google` in `src/app/layout.tsx`.

- [x] **Step 4: Run test to verify it passes**

Run: `node --test scripts/seo-verification.test.js`

Expected: PASS.

### Task 2: Production SEO Checklist

**Files:**
- Create: `docs/seo-search-console-checklist.md`
- Modify: `PROJECT_MEMORY.md`

- [x] **Step 1: Document the manual Search Console flow**

Add the exact steps for adding the domain property, setting `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploying, verifying, and submitting `/sitemap.xml`.

- [x] **Step 2: Document the post-deploy checks**

Add checks for `/robots.txt`, `/sitemap.xml`, canonical tags, metadata, index coverage, and the first keyword set to monitor.

### Task 3: Verification

Run:

```bash
node --test scripts/seo-verification.test.js scripts/showcase-projects.test.js scripts/local-seo-content.test.js scripts/service-seo.test.js scripts/contact-errors.test.js scripts/pricing-leads.test.js scripts/outreach.test.js
npm run lint
npm run build
git diff --check
```

Expected: all commands exit 0.
