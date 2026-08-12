# Rayan Studio Redesign - Claude Code Handoff

Date: 2026-08-12
Status: execution handoff for the validated redesign implementation plans

This file is the entry point for Claude Code. It does not replace the validated design specification or the lot plans. It resolves two cross-file ambiguities found during the implementation-plan self-review and defines the execution protocol.

## 1. Read order before any code change

Read these files in this exact order:

1. `docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-design.md`
2. `docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-review-amendment.md`
3. `docs/superpowers/plans/2026-08-12-rayan-studio-redesign-master.md`
4. this handoff file
5. only then the current lot file

Do not start implementation from an isolated excerpt of a lot plan.

## 2. Mandatory skills and execution mode

Use the Superpowers workflow during implementation:

- before implementation: `superpowers:using-git-worktrees`;
- for every feature/bugfix task: `superpowers:test-driven-development`;
- preferred execution mode: `superpowers:subagent-driven-development`;
- acceptable alternative when intentionally executing in batches: `superpowers:executing-plans`;
- before claiming a lot or the whole redesign complete: `superpowers:verification-before-completion`.

The validated spec is not reopened for brainstorming during implementation. If code reality genuinely conflicts with the approved spec or a plan instruction is impossible as written, stop, report the exact conflict with file/line evidence, and wait for a decision. Do not invent a third design direction.

## 3. Lot execution order

Execute exactly one lot at a time:

```text
01 Foundation
02 Core commercial
03 Work and case studies
04 Conversion and tracking
05 Insights and SEO migration
06 E2E, polish and release
```

Do not start the next lot until every gate in the current lot passes.

Each task gets its own test cycle and commit. Do not squash the entire redesign into one implementation commit.

## 4. Self-review correction A: final project interface

The master plan shows the core project interface, while Lot 01 and Lot 03 add fields required by the final case-study implementation. Treat the following as the final compatible `ProjectRecord` contract. Lot 01 creates the base fields; Lot 03 adds `productUx` and `engineering` while preserving every existing field and name.

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
  productUx: Record<Locale, string[]>;
  engineering: Record<Locale, Array<{ title: string; body: string }>>;
  outcome: Record<Locale, string[]>;
  gallery: Array<{ src: string; alt: LocalizedText }>;
  next?: ProjectKey;
};
```

Compatibility rule:

- Lot 01 may initialize `productUx` and `engineering` as empty localized collections so the type is final from the start, or Lot 03 may add them as one explicit schema evolution.
- Prefer initializing the final fields in Lot 01 because this avoids changing the interface later.
- `kind` and `beforeUrl` are required by the Manteigaria proof-safety contract and must not be removed because the abbreviated master snippet omitted them.

The final route-helper interface also includes the resolver helpers explicitly created in Lot 01:

```ts
export function resolveServiceSlug(locale: Locale, slug: string): ServiceKey | null;
export function resolveStudioSlug(locale: Locale, slug: string): StudioPageKey | null;
export function resolveInsightCategorySlug(locale: Locale, slug: string): InsightCategoryKey | null;
```

Do not rename these helpers in later lots.

## 5. Self-review correction B: Lot 02 Studio task boundary

The original Lot 02 wording could be read as making Task 4 import Method/Offers/FAQ components that Task 5 has not created yet. Do not do that. Every task must leave a buildable, reviewable state.

Execute the Studio tasks as follows:

### Lot 02 Task 4

Task 4 implements only:

```text
/[locale]/studio -> redirect to localized Rayan Studio page
/fr/studio/rayan-studio
/en/studio/rayan-studio
/fr/studio/rayan-sekkat
/en/studio/rayan-sekkat
```

At the end of Task 4:

- `studio/[slug]/page.tsx` supports only `studio` and `rayan` keys;
- its `generateStaticParams()` returns only the four localized child combinations above;
- `method`, `offers`, and `faq` are not imported and are not emitted as static params yet;
- `npm test`, `npm run typecheck`, and `npm run build` must pass before the Task 4 commit.

### Lot 02 Task 5

Task 5 creates Method, Offers and FAQ components/content, then extends the same dynamic route atomically to support:

```text
/fr/studio/methode
/en/studio/method
/fr/studio/offres
/en/studio/offers
/fr/studio/faq
/en/studio/faq
```

Only after those components exist should `generateStaticParams()` expand to all ten localized Studio child combinations.

This correction overrides any Lot 02 sentence suggesting unresolved imports are acceptable between Task 4 and Task 5.

## 6. Non-negotiable repository invariants

Before and after every lot, remember:

- 70 local SEO pages remain live and in the sitemap;
- local SEO keeps its local/TPE search intent even though the main brand becomes software-first;
- outreach/prospection workflows are unrelated and must not be refactored opportunistically;
- GA4 remains consent-aware;
- `scroll_depth` and `section_view` remain supported;
- Contact and Start-a-project have distinct conversion events;
- both lead flows keep honeypot, server-side rate limiting, server validation, length limits and safe HTML rendering;
- browser tests never send real Brevo email;
- public prices remain hidden;
- Manteigaria remains explicitly a concept/uncommissioned redesign;
- no fabricated metric, testimonial, client logo or team claim;
- public FR/EN marketing copy contains no Unicode em dash `—`;
- core FR and EN commercial routes ship together;
- reduced-motion, keyboard and touch behavior are release criteria, not optional polish.

## 7. Claude Code start prompt

Use this prompt when starting the implementation session:

```text
Implement the validated Rayan Studio redesign from the repository documentation.

First read, in order:
1. docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-design.md
2. docs/superpowers/specs/2026-08-12-rayan-studio-software-studio-redesign-review-amendment.md
3. docs/superpowers/plans/2026-08-12-rayan-studio-redesign-master.md
4. docs/superpowers/plans/2026-08-12-rayan-studio-redesign-claude-handoff.md
5. docs/superpowers/plans/2026-08-12-rayan-studio-redesign-01-foundation.md

Use superpowers:using-git-worktrees before implementation, then execute Lot 01 task-by-task with test-driven-development. Do not implement Lot 02 yet.

Treat the validated spec and handoff corrections as authoritative. Do not redesign, simplify away, or reinterpret approved decisions. Preserve the 70 local SEO pages, consent-aware analytics, existing prospection boundaries, and all form security invariants.

For each task:
- write/run the failing test first when specified;
- implement only the task scope;
- run the exact verification commands;
- commit with the plan's commit message;
- stop on a real conflict instead of guessing.

At the end of Lot 01, run the full Lot 01 gate and report the actual command results, files changed, commits created, and any deviations. Do not claim completion without superpowers:verification-before-completion.
```

## 8. Lot handoff protocol

After Claude finishes a lot, review that lot before starting the next one. The next execution prompt should name the next lot explicitly and tell Claude to read the corresponding lot file in full.

Example after Lot 01 is reviewed and merged:

```text
Continue the validated Rayan Studio redesign with Lot 02 only. Read the master plan, Claude handoff, and docs/superpowers/plans/2026-08-12-rayan-studio-redesign-02-core-commercial.md in full. Start from the merged Lot 01 state in a fresh worktree/branch. Execute each task with TDD and stop after the Lot 02 gate passes. Do not begin Lot 03.
```

Repeat this pattern through Lot 06.
