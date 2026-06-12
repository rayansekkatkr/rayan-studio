# Outreach Sites Dates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the existing outreach script so it can be tested safely and sends more relevant emails to businesses with existing dated websites.

**Architecture:** Keep the current single-script architecture in `scripts/outreach.js` to avoid unnecessary complexity. Add small pure helpers for configuration, scoring, report writing, and email generation.

**Tech Stack:** Node.js CommonJS, axios, nodemailer, GitHub Actions.

---

### Task 1: Safe Runtime Controls

**Files:**
- Modify: `scripts/outreach.js`

- [ ] **Step 1: Add environment-driven controls**

Add `DRY_RUN`, `MAX_EMAILS_PER_DAY`, and `DELAY_BETWEEN_EMAILS_MS` parsing near the current constants.

- [ ] **Step 2: Verify syntax**

Run: `node --check scripts/outreach.js`
Expected: no output and exit code 0.

### Task 2: Prospect Scoring And Reporting

**Files:**
- Modify: `scripts/outreach.js`

- [ ] **Step 1: Add scoreProspect helper**

Score businesses higher when they have a website, an extracted email, a phone number, and a formatted address.

- [ ] **Step 2: Add outreach-report.json writing**

Write a report containing date, category, city, dryRun, scanned, skipped, candidates, and sent counts.

- [ ] **Step 3: Verify syntax**

Run: `node --check scripts/outreach.js`
Expected: no output and exit code 0.

### Task 3: Refonte-Focused Email

**Files:**
- Modify: `scripts/outreach.js`

- [ ] **Step 1: Update email copy**

Make the subject and HTML focus on a free diagnostic for a dated website, including message clarity, mobile path, SEO local, DNS and deployment.

- [ ] **Step 2: Keep unsubscribe wording**

Keep a clear reply-based unsubscribe sentence at the bottom of the email.

- [ ] **Step 3: Verify syntax**

Run: `node --check scripts/outreach.js`
Expected: no output and exit code 0.

### Task 4: Full Verification

**Files:**
- Modify: `PROJECT_MEMORY.md`

- [ ] **Step 1: Update project memory**

Record the outreach changes and verification commands.

- [ ] **Step 2: Run checks**

Run:

```bash
node --check scripts/outreach.js
npm run lint
npm run build
git diff --check
```

Expected: all commands pass.
