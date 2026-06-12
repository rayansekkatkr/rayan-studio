# Pricing Modal Form Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a modern quote/contact modal opened from each pricing card, with the selected offer prefilled.

**Architecture:** Keep the interaction local to `Pricing.tsx` and reuse the existing `/api/contact` endpoint. Add a small shared helper for offer-to-form defaults so the behavior can be tested without a React test runner.

**Tech Stack:** Next.js 14, React, TypeScript/JavaScript, Tailwind, existing UI components, Node test runner for the pure helper.

---

### Task 1: Offer Form Defaults

**Files:**
- Create: `src/lib/pricing-leads.js`
- Test: `scripts/pricing-leads.test.js`

- [ ] **Step 1: Write the failing test**

```js
const assert = require("node:assert/strict");
const test = require("node:test");

const { buildPricingLeadDefaults } = require("../src/lib/pricing-leads");

test("buildPricingLeadDefaults maps the redesign offer to the dated-site form state in French", () => {
  const defaults = buildPricingLeadDefaults("redesign", "fr");

  assert.equal(defaults.projectType, "dated-site");
  assert.match(defaults.message, /Refonte Pro/);
  assert.match(defaults.message, /site actuel/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/pricing-leads.test.js`
Expected: FAIL because `src/lib/pricing-leads.js` does not exist yet.

- [ ] **Step 3: Write minimal helper**

Create `src/lib/pricing-leads.js` with offer metadata, project type mapping, localized default messages, and CommonJS exports.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/pricing-leads.test.js`
Expected: PASS.

### Task 2: Pricing Modal UI

**Files:**
- Modify: `src/components/site/Pricing.tsx`

- [ ] **Step 1: Import React state, form components, icons, tracking, and helper**

Use `useEffect`, `useState`, `X`, `ArrowRight`, `Input`, `Textarea`, `trackEvent`, and `buildPricingLeadDefaults`.

- [ ] **Step 2: Replace pricing card links with buttons**

Each button opens the modal with the selected offer key and initial form state from the helper.

- [ ] **Step 3: Add accessible modal markup**

Render a fixed overlay with `role="dialog"`, `aria-modal="true"`, an offer summary, close button, and responsive paper-styled panel.

- [ ] **Step 4: Add submit behavior**

Submit to `/api/contact`, show loading, success and error states, then clear/close safely.

### Task 3: Verification

**Files:**
- Modify: `PROJECT_MEMORY.md`

- [ ] **Step 1: Document the pricing modal behavior**

Add a short note that pricing cards now open a localized lead modal prefilled by offer.

- [ ] **Step 2: Run verification**

Run:
```bash
node --test scripts/pricing-leads.test.js
npx tsc --noEmit
npm run lint
npm run build
git diff --check
```

Expected: all commands exit 0.
