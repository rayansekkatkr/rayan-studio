# Conversion CRM Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve conversion clarity, outreach follow-up structure, and SEO content coverage while keeping real-data case studies on standby.

**Architecture:** Keep the homepage/contact flow as the conversion entry point, add CRM fields to future outreach records without rewriting the existing contact history, and add high-intent SEO pages through the existing `service-seo` data-driven route.

**Tech Stack:** Next.js 14 App Router, TypeScript React components, Node scripts, CommonJS content helpers and Node test runner.

---

### Task 1: Conversion Diagnostic

**Files:**
- Modify: `src/components/site/Contact.tsx`
- Test: `scripts/conversion-diagnostic.test.js`

- [x] **Step 1: Write failing test**

Verify that the contact section exposes concrete diagnostic deliverables: `Livrable diagnostic`, `3 priorités d'action`, `capture commentée`, and a 24h reply promise.

- [x] **Step 2: Implement section**

Add a concise "what you receive" block near the contact details without changing the API payload.

### Task 2: Outreach Mini CRM

**Files:**
- Modify: `scripts/outreach.js`
- Modify: `scripts/outreach.test.js`

- [x] **Step 1: Write failing test**

Verify that `buildCrmContact` creates a status, lifecycle stage, timeline entry, and follow-up date for newly sent contacts.

- [x] **Step 2: Implement helper**

Add CRM helpers and use them only for new real sends, preserving existing `contacted.json` compatibility.

### Task 3: Content SEO Pages

**Files:**
- Modify: `src/lib/service-seo.js`
- Modify: `scripts/service-seo.test.js`

- [x] **Step 1: Write failing test**

Verify routes for:
- `/fr/cout-refonte-site-internet-petite-entreprise`
- `/fr/checklist-refonte-site-internet`
- `/en/small-business-website-redesign-cost`

- [x] **Step 2: Add content pages**

Add page data with enough sections and FAQs to pass the existing non-thin content checks.

### Task 4: Verification

Run:

```bash
node --test scripts/conversion-diagnostic.test.js scripts/outreach.test.js scripts/service-seo.test.js scripts/testimonials-section.test.js scripts/seo-verification.test.js scripts/showcase-projects.test.js scripts/local-seo-content.test.js scripts/contact-errors.test.js scripts/pricing-leads.test.js
npm run lint
npm run build
git diff --check
```
