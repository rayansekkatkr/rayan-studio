# Redesign project fact sheet

Date: 2026-08-12. Every claim below carries its evidence source. Claims without evidence are
excluded from public copy. Local sibling repositories under `rayan_project/` are the actual
product codebases and count as repository evidence.

## Pick4Me

- Public product: https://pick4me.be/ (evidence: `src/components/site/Showcase.tsx`, existing live link)
- Type: marketplace / local platform (evidence: Showcase designation "Plateforme locale", PROJECT_MEMORY line 538 "produits réels en production")
- Studio product, live (evidence: PROJECT_MEMORY lines 538, 542)
- Capabilities, all evidenced by backend modules in `rayan_project/Pick4Me/src/`:
  - missions (`missions/`)
  - multiple user roles and auth/permissions (`auth/`, `admin/`)
  - communication/chat in real time (`chat/`, `socket/`, `socket.io` + `@nestjs/websockets` + `@socket.io/redis-adapter` in `Pick4Me/package.json`; `socket_io_client` in `pick4me-app/pubspec.yaml`)
  - notifications (`notifications/`, `firebase-admin` backend, `firebase_messaging` in Flutter app)
  - payments and wallet (`payments/`, `wallet/`, `escrow/`, `ledger/`, `transfers/`, `stripe` in `Pick4Me/package.json`, `flutter_stripe` in app; `revolut/` module exists)
  - administration (`admin/`)
- Technologies (evidenced): Flutter (mobile app `pick4me-app/pubspec.yaml`), NestJS (`@nestjs/core` in backend), PostgreSQL (`pg` dependency), Socket.IO, Stripe, Firebase (messaging/admin)
- Labels: Marketplace · Mobile · Backend · Payments (validated spec)
- Outcome: functional only. No user/revenue/conversion metric exists in evidence.

## Pont Factur-X

- Public product: https://www.pont-facturx.com/ (evidence: Showcase live link)
- Type: B2B software / electronic invoicing (evidence: Showcase designation "SaaS B2B, Facturation électronique")
- Studio product, live (evidence: PROJECT_MEMORY line 538)
- Capabilities, evidenced by `rayan_project/pont-facturx/`:
  - PDF/document input (`pypdf`, `lxml` in `api/pyproject.toml`)
  - Factur-X generation/conversion (product name and purpose; `api/` codebase)
  - API (FastAPI application in `api/pyproject.toml`)
  - automation of workflow steps (`celery` in `api/pyproject.toml`)
  - Chorus Pro integration: CONFIRMED implemented (evidence: `pont-facturx/CHANGELOG_CHORUS_PRO.md`, "Intégration complète de l'API Chorus Pro Factures v1.0.0 via PISTE", dated 2026-02-14/17)
- Technologies (evidenced): Next.js (webapp), FastAPI, Python, SQLAlchemy, Celery
- Labels: B2B Software · E-invoicing · API · Automation (validated spec)
- Excluded claims: certification, guaranteed legal compliance, regulatory approval, time saved,
  processing speed. No evidence.

## GoodCall

- Public product: https://goodcall.gg/en/ (evidence: Showcase live link)
- Type: esports prediction platform, web/mobile (evidence: Showcase copy "Plateforme de pronostics e-sport gratuite (LoL, Valorant, CS2)")
- Studio product, live (evidence: PROJECT_MEMORY lines 538, 545)
- Capabilities: free esports predictions, social points, leaderboards/rankings, private leagues,
  multi-game (LoL, Valorant, CS2) (evidence: existing repository Showcase copy for games; product scope)
- Technologies, all evidenced in `rayan_project/goodcall/`:
  - Turborepo monorepo (`turbo` in root `package.json`, `apps/` + `packages/`)
  - NestJS (`@nestjs/core` in `apps/api/package.json`)
  - Prisma (`@prisma/client`, `prisma`)
  - PostgreSQL (`postgres:16-alpine` in `docker-compose.yml`)
  - Redis (`ioredis`)
  - React Native / Expo mobile app (`apps/mobile/package.json`)
- Labels: Esports · Predictions · Social · Rankings (validated spec)
- Excluded claims: users, retention, engagement, traffic, revenue, production languages. No evidence
  reviewed for production language list, so multi-language is not claimed.

## DocExtract

- Public product: https://www.getdocextract.com/ (evidence: Showcase live link)
- Type: B2B SaaS / document extraction (evidence: Showcase designation)
- Studio product, live (evidence: PROJECT_MEMORY line 545, user-confirmed)
- Technologies (evidenced in `rayan_project/DocExtract/package.json`): Next.js, Prisma, Stripe, PDF parsing
- Secondary work only. Not a homepage flagship.

## Manteigaria

- Redesign concept: https://manteigaria-redesign.vercel.app/ (evidence: Showcase link)
- Original/reference: https://manteigaria.com/fr/ (evidence: Showcase `beforeUrl`)
- Type: artisan bakery / local business website concept (evidence: Showcase designation)
- Status: Concept, refonte non commandée / Concept, uncommissioned redesign (evidence: PROJECT_MEMORY line 542, Showcase segment)
- Excluded claims: any commissioned relationship, client approval, production ownership, business outcome.

## Media inventory

Real screenshots available in `public/realisations/`:
`pick4me.png`, `pont-facturx.png`, `goodcall.png`, `docextract.png`, `manteigaria-before.png`.
One real screenshot per project. Galleries therefore stay small: full view plus CSS detail crops of
the same real image, with alt text marked as a detail crop. No fabricated media.

## Contradictions found

None. Repository evidence supports the validated spec anchors, including the Chorus Pro
integration for Pont Factur-X (explicitly allowed only if proven; proof found).
