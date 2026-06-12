# Rayan Studio Visible Refonte Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the local site visibly different from production by shifting the homepage toward an independent refonte studio for TPE with dated sites or no site.

**Architecture:** Keep the current Next.js App Router and component structure. Modify only the homepage-facing components and contact API needed for the first visible pass: global styling, hero, navbar CTA, services, pricing, contact form, and project memory.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, framer-motion, lucide-react, Brevo contact API.

---

### Task 1: Visual System First Pass

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the blue AI-like global background language**

Update the root color variables and shared glass utilities so the site reads more like a sober refonte workshop:

```css
:root {
  --background: #f5f1e8;
  --background-soft: #e8e0d2;
  --surface: rgba(255, 252, 246, 0.86);
  --surface-strong: rgba(255, 252, 246, 0.95);
  --border: rgba(42, 35, 29, 0.14);
  --text-primary: #17120f;
  --text-secondary: #63584d;
  --accent: #d94f2b;
}
```

Use warmer paper/ink colors, restrained borders, and no dominant blue aurora.

- [ ] **Step 2: Run formatting guard**

Run:

```bash
git diff --check -- src/app/globals.css
```

Expected: no output.

### Task 2: Hero Repositioning

**Files:**
- Modify: `src/components/site/Hero.tsx`

- [ ] **Step 1: Rewrite hero copy**

Use this French hero direction:

```text
Votre site date. Je le transforme en vitrine claire, moderne et prete a vendre.
Refonte ou premier site pour petites entreprises: design, SEO, DNS, hebergement et mise en ligne inclus.
Demander un diagnostic gratuit
Voir les transformations
```

Use matching English copy for `/en`.

- [ ] **Step 2: Replace abstract video-first visual with audit/avant-apres composition**

Render a concrete visual block with:

- "Avant" pain points.
- "Apres" outcomes.
- A diagnostic checklist.
- No full-screen abstract video as the primary visual signal.

- [ ] **Step 3: Run formatting guard**

Run:

```bash
git diff --check -- src/components/site/Hero.tsx
```

Expected: no output.

### Task 3: Offers And Navigation

**Files:**
- Modify: `src/components/site/Navbar.tsx`
- Modify: `src/components/site/Services.tsx`
- Modify: `src/components/site/Pricing.tsx`

- [ ] **Step 1: Change navbar CTA**

Use `Diagnostic` / `Audit` style wording instead of a generic start CTA.

- [ ] **Step 2: Rename homepage service offers**

Services should become:

```text
Refonte Pro
Creation Express
```

Refonte Pro is the strongest offer. Creation Express is for businesses without a website.

- [ ] **Step 3: Update pricing**

Pricing should show:

```text
Creation Express - a partir de 700 EUR
Refonte Pro - a partir de 1200 EUR
Sur mesure - devis
Maintenance legere - option apres livraison
```

- [ ] **Step 4: Run formatting guard**

Run:

```bash
git diff --check -- src/components/site/Navbar.tsx src/components/site/Services.tsx src/components/site/Pricing.tsx
```

Expected: no output.

### Task 4: Contact Form For Diagnostic

**Files:**
- Modify: `src/components/site/Contact.tsx`
- Modify: `src/app/api/contact/route.ts`

- [ ] **Step 1: Add a visible current site URL field**

Add an optional `siteUrl` field for prospects with an existing dated site. Keep the hidden honeypot separate as `companyWebsite` so real submissions are not discarded.

- [ ] **Step 2: Update project types**

Use:

```text
J'ai un site date
Je n'ai pas encore de site
Autre besoin
```

- [ ] **Step 3: Include siteUrl in Brevo email**

Include `URL du site actuel` in text and HTML email content when provided.

- [ ] **Step 4: Run formatting guard**

Run:

```bash
git diff --check -- src/components/site/Contact.tsx src/app/api/contact/route.ts
```

Expected: no output.

### Task 5: Memory And Verification

**Files:**
- Modify: `PROJECT_MEMORY.md`

- [ ] **Step 1: Add journal entry**

Record that the first visible refonte pass changed the local site away from the production-like blue glassmorphism version.

- [ ] **Step 2: Verify local page**

Run:

```bash
curl -I --max-time 8 http://localhost:3000/fr
```

Expected: `HTTP/1.1 200 OK`.

- [ ] **Step 3: Browser verification**

Open `http://localhost:3000/fr` and confirm:

- Hero title mentions dated site transformation.
- No console errors on load.
- Visual direction is clearly different from current production.

- [ ] **Step 4: Final formatting guard**

Run:

```bash
git diff --check
```

Expected: no output.
