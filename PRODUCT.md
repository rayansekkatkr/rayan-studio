# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, served at equal weight under one brand and one founder:

1. **Anyone who needs a website created or redesigned.** The path is defined by the service, not by a named audience (no longer scoped to shops, cafés and restaurants since 2026-11-02). Visitors range from non-technical owners to companies wanting a studio-grade site. Entry: `/fr/creation-site-internet` (`/en/website-design`), free mockup within 24 business hours.
2. **Startups and companies** that need an application, SaaS, MVP, API/backend, automation or generative-AI integration (Claude, ChatGPT, Copilot), or DevOps/cloud work. Entry: `/fr/developpement-application-saas`.

Separate acquisition surface: the 70 local landings `/site/[sector]/[city]` keep their local/TPE intent and are not rewritten to match the main positioning.

## Product Purpose

Rayan Studio (`rayanstudios.com`) is an independent Product & Software Engineering studio. The site exists to turn a visitor from either audience into a quote request. Primary CTA: « Demander un devis gratuit » (`/fr/devis-gratuit`, short form). Success = qualified quote and contact requests.

## Positioning

- **Founder-led, one contact.** Rayan Sekkat handles the project alone from framing to production; no handoff to a team.
- **Ships its own products.** Pick4Me, Pont Factur-X, GoodCall and DocExtract are live products built by the studio, proof of shipping real software rather than mockups.
- **Async from South Korea.** Based in Korea, working remote for French/European clients.

## Operating Context

- Bilingual FR/EN; FR is the commercial core.
- Visitors arrive from organic search (service pages, local landings), direct outreach, and referrals.
- Two forms: contact and project qualification (budget question optional, project form only), sent via Brevo.
- No public pricing: « Offres » model, quote after framing.

## Capabilities and Constraints

- Next.js 15 App Router, TypeScript, React 19, Tailwind, framer-motion, lucide-react (see CLAUDE.md for structure and sources of truth).
- Must preserve: localized SEO metadata, sitemap/robots, FR/EN alternates, Schema.org (`ProfessionalService`, `LocalBusiness`, `Service`, `FAQPage`), contact funnel (honeypot, rate limit, sanitization), consent-gated analytics and funnel tracking.
- Copy rule: no em dash « — » in public copy (`npm run check:copy`).
- Separate CRA offer page (`cyber-resilience-act`) with minimal header/footer.

## Brand Commitments

- Name: Rayan Studio. Founder: Rayan Sekkat. Brand data lives in `src/lib/brand.ts`.
- Honest independent studio voice: never presented as a larger agency.
- No public prices.

## Evidence on Hand

Case studies in `src/content/projects/`, each typed by `kind`:

- Products (studio's own, live): Pick4Me, Pont Factur-X, GoodCall, DocExtract.
- Mission (client engagement): STMicroelectronics CI/CD platform.
- Demo: Ops Knowledge Agent (public GitHub).
- Concept (uncommissioned, stated as such): Manteigaria redesign.
- Also: product-infrastructure record. Screenshots in `public/realisations/`.

**Absent, must not be fabricated:** client testimonials, client logos, client counts, measured outcome metrics, team size beyond one founder. Synthesized cases must be labelled as such.

## Product Principles

1. No invented proof. Real technical scope, labelled concepts, cautious wording.
2. Both audiences get a first-class path; neither reads as an afterthought.
3. One person, end to end: every surface should make direct founder involvement legible.
4. Quote, not price: lead to a short form, never to a price list.

## Accessibility & Inclusion

Target WCAG 2.2 AA across public pages.
