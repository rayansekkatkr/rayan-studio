# Rayan Studio Software Studio Redesign — Design Spec

Date: 2026-08-12
Status: validated design, awaiting final spec review

## 1. Decision

Rayan Studio is repositioned from a primarily small-business website redesign studio into a premium independent software & digital studio.

The communication weighting is approximately:

- 70% software: SaaS, web applications, MVPs, APIs/backends, automation/AI, DevOps/cloud.
- 30% web: premium websites and redesigns.

The brand must remain honest about its independent structure. It should feel more substantial and structured, without pretending to be a large agency or ESN.

Core positioning:

> Rayan Studio conçoit, développe et met en production des applications, plateformes et expériences web sur mesure, avec un interlocuteur unique du cadrage au lancement.

The previous 2026-06-09 positioning around website redesign for small businesses is superseded for the public-facing site by this spec. Existing outreach/prospection infrastructure remains out of scope unless later alignment is explicitly planned.

## 2. Goals

Primary perception goals:

1. A new visitor quickly understands that Rayan Studio builds serious digital products, not only small brochure websites.
2. The site proves engineering depth through real products and case studies.
3. The independent model feels like an advantage: direct communication, continuity, fewer handoffs.
4. Small businesses still have a clear entry point through premium websites and redesigns.
5. The site feels premium, modern, human and technically credible.

Primary business goal:

- Convert qualified product, SaaS, software and premium web leads into project discussions.

Secondary goals:

- Build authority through useful editorial content and resources.
- Improve SEO depth with real service pages and case studies.
- Preserve technical quality, performance and existing bilingual SEO foundations.

## 3. Brand Direction

### 3.1 Tone

Direction: premium but human.

The copy should be concise, direct and understandable by non-technical decision makers while remaining credible to technical audiences.

Avoid:

- fake corporate language;
- exaggerated team language;
- generic AI buzzwords;
- jargon-first copy;
- invented client metrics;
- overly salesy urgency.

Prefer:

- product outcomes before technologies;
- specific examples;
- clear engineering explanations;
- honest statements about scope and role.

### 3.2 Visual identity

Direction: software premium with an editorial studio layer.

Visual principles:

- dominant black / off-white / grey palette;
- indigo/violet as a restrained accent;
- alternation between dark and light sections;
- large type and generous whitespace;
- very few small cards;
- thin borders instead of heavy shadows;
- subtle depth and glow only where useful;
- large real product visuals as the main visual proof.

Typography:

- modern sans-serif for most interface and body copy;
- elegant serif used sparingly on selected display words/headlines;
- serif usage should remain roughly 10–20% of visible typography.

Brand mark:

- wordmark only: `RAYAN STUDIO`;
- no forced monogram or new icon in this V1.

## 4. Information Architecture

The site remains bilingual and all core commercial routes ship in both `/fr` and `/en`.

Target structure:

```text
/[locale]
├── /
├── /services
│   ├── /applications-web-saas
│   ├── /mvp-produits-digitaux
│   ├── /apis-backends
│   ├── /automatisation-ia
│   ├── /sites-web-refonte
│   └── /devops-cloud
├── /work
│   ├── /pick4me
│   ├── /pont-facturx
│   ├── /goodcall
│   ├── /docextract
│   └── other real projects as content becomes ready
├── /studio
│   ├── /rayan-studio
│   ├── /rayan-sekkat
│   ├── /methode
│   ├── /offres
│   └── /faq
├── /insights
│   ├── /articles
│   ├── /guides
│   ├── /checklists
│   ├── /templates
│   └── /outils
├── /demarrer-un-projet
└── /contact
```

English routes use natural English slugs where appropriate while keeping the same information hierarchy.

## 5. Navigation

Desktop navbar:

```text
RAYAN STUDIO | Services ▾ | Work ▾ | Studio ▾ | Insights ▾ | FR / EN | [Parler de votre projet]
```

Behavior:

- transparent over the hero;
- subtle opaque/blur background after scrolling;
- hides while scrolling down;
- reappears while scrolling up;
- keyboard, touch and screen-reader accessible;
- `Escape` closes open menus;
- visible focus states.

Mobile:

- full-screen menu;
- accordion sections;
- CTA remains prominent;
- no hover-only interaction.

### 5.1 Mega-menu: Services

```text
BUILD
Applications web & SaaS
MVP & produits digitaux
APIs & backends

OPTIMIZE
Automatisation & IA
Sites premium & refonte

RUN
DevOps, cloud & déploiement

FEATURED
Pick4Me
→ Voir le projet
```

### 5.2 Mega-menu: Work

```text
SELECTED WORK
Pick4Me
Pont Factur-X
GoodCall

EXPLORE
Tous les projets
Études de cas

FEATURED
Projet sélectionné
→ Découvrir
```

### 5.3 Mega-menu: Studio

```text
À PROPOS
Rayan Studio
Rayan Sekkat

TRAVAILLER ENSEMBLE
Notre méthode
Offres
FAQ

CONTACT
Démarrer un projet
Nous contacter
```

No featured card is required here; this menu should feel calmer and more institutional.

### 5.4 Mega-menu: Insights

```text
GUIDES
Articles
Guides pratiques

RESOURCES
Checklists
Templates
Outils

FEATURED
Ressource éditoriale mise en avant
```

## 6. Homepage

The homepage is intentionally shorter than the current site. Its job is to create desire, show proof and route visitors to deeper pages.

### 6.1 Hero

French H1:

> Des produits digitaux conçus pour faire avancer votre entreprise.

Supporting copy:

> Applications, plateformes et expériences web conçues pour résoudre de vrais problèmes, simplifier vos opérations et soutenir votre croissance.

CTAs:

- Primary: `Parler de votre projet`
- Secondary: `Voir nos réalisations`

Visual:

- multi-project composition using real interfaces from Pick4Me, Pont Factur-X and GoodCall;
- one dominant interface plus supporting product surfaces;
- elegant scroll motion/parallax;
- no generic dashboard mockups;
- no heavy autoplay video.

### 6.2 Expertise strip

Minimal line only:

`Product Design · Software Engineering · Web · Automation · Cloud`

No counters or artificial trust badges in this strip.

### 6.3 Selected Work

Three immersive projects, in this exact order:

1. Pick4Me
2. Pont Factur-X
3. GoodCall

Each uses a large product visual, category labels, one concise project statement and a case-study CTA.

Visual rhythm:

- Pick4Me: light, human, product/mobile;
- Pont Factur-X: dark, precise, B2B/data;
- GoodCall: light, more energetic, esports/social.

### 6.4 Services overview

Do not show six identical cards.

Use two editorial groups:

```text
SOFTWARE
Applications web & SaaS
MVP & produits digitaux
APIs & backends
Automatisation & IA

WEB & INFRASTRUCTURE
Sites premium & refonte
DevOps, cloud & déploiement
```

CTA: `Découvrir nos services`.

### 6.5 Why Rayan Studio

Core statement:

> La souplesse d’un studio indépendant. La rigueur d’une équipe produit.

Explain that the client works directly with the person designing and engineering the product, reducing handoffs and preserving continuity.

Principles:

- Un interlocuteur
- De l’idée à la production
- Architecture pensée pour durer
- Communication claire

A professional image of Rayan may appear here, but should not dominate the homepage.

### 6.6 Method

Five concise stages:

1. Discover
2. Design
3. Build
4. Launch
5. Improve

The homepage gives only a compact preview and links to the dedicated method page.

### 6.7 Offers preview

Four engagement types:

- Applications & plateformes
- MVP & lancement
- Sites premium & refonte
- Accompagnement continu

No public price.

Use the promise:

> Première réponse sous 24h ouvrées.

A detailed proposal is provided after sufficient project framing.

### 6.8 Insights preview

Maximum three pieces:

- one featured guide;
- two secondary resources.

The section should look editorial, not like a generic blog grid.

### 6.9 Final CTA

Dark section with generous spacing.

Suggested direction:

> Vous avez quelque chose à construire ?

CTA: `Parler de votre projet`.

## 7. Services

The six service pages share a common brand structure but must not be copy-paste pages.

Common sequence:

1. Service hero
2. Client need/problem
3. Use cases / what can be built
4. Approach
5. Engineering depth
6. Relevant project proof
7. Contextual FAQ
8. Final CTA

Copy order is always business first, engineering second, technology last.

### 7.1 Applications web & SaaS

Main topics:

- SaaS products;
- business platforms;
- dashboards;
- marketplaces;
- client portals;
- subscriptions/payments;
- roles/permissions;
- real-time features where relevant.

Primary proof: Pick4Me.

### 7.2 MVP & produits digitaux

Message:

> Passer d’une idée à un vrai produit, sans construire six mois de fonctionnalités inutiles.

Focus:

- scope definition;
- prioritization;
- UX/product framing;
- first production-ready version;
- architecture that can evolve.

Primary proof: GoodCall.

### 7.3 APIs & backends

Message:

> Le produit que vos utilisateurs ne voient pas, mais sur lequel tout repose.

Focus:

- APIs;
- mobile backends;
- auth/permissions;
- payments;
- webhooks;
- integrations;
- data;
- real-time systems.

Proof: Pick4Me and/or Pont Factur-X.

### 7.4 Automatisation & IA

Message:

> Automatiser ce qui coûte du temps avant d’ajouter de l’IA là où elle apporte réellement quelque chose.

Separate automation and applied AI conceptually.

Automation examples:

- workflows;
- document generation;
- synchronization;
- APIs;
- repetitive business tasks.

Applied AI examples:

- extraction;
- classification;
- document analysis;
- assisted generation;
- business-specific processing.

Proof: DocExtract + Pont Factur-X.

### 7.5 Sites premium & refonte

This is the main entry point for traditional SMEs and local businesses.

Message direction:

> Votre site est souvent le premier contact avec votre entreprise. Il doit être au niveau de ce que vous faites réellement.

Focus:

- visual direction;
- UX/UI;
- development;
- responsive design;
- performance;
- SEO;
- analytics;
- migration;
- domain/hosting support.

Primary proof: Manteigaria.

### 7.6 DevOps, cloud & déploiement

Message:

> Mettre un produit en ligne est une étape. Le garder fiable en est une autre.

Focus:

- CI/CD;
- environments;
- Docker;
- cloud/deployment;
- monitoring;
- backups;
- security;
- release workflows;
- performance.

This service can be sold independently to an existing development team.

## 8. Work and Case Studies

### 8.1 `/work`

Hero direction:

> Des produits conçus pour être utilisés.

Selected work appears first as three large editorial blocks:

1. Pick4Me
2. Pont Factur-X
3. GoodCall

Then a compact `More work` grid for DocExtract, Manteigaria and other real projects that are ready to show.

No fake case studies and no placeholder-heavy featured projects.

### 8.2 Case-study template

Each flagship study uses this sequence:

1. Hero
2. Overview / metadata
3. Challenge
4. Solution
5. What we built
6. Product & UX
7. Engineering
8. Technologies
9. Outcome
10. Full-width gallery
11. Next project
12. Project CTA

Desired ratio: roughly 30% copy / 70% visuals.

Metadata may include:

- type;
- intervention;
- role;
- year;
- status, only if accurate.

Outcome rules:

- use only defendable metrics;
- if no real metric exists, explain functional outcome instead;
- never invent conversion, productivity or usage improvements.

Case-study art direction may adapt per project while preserving the global brand grid, typography, navigation and CTA system.

## 9. Studio

### 9.1 Rayan Studio page

Purpose: explain the independent studio model honestly.

Hero direction:

> Un studio indépendant pour concevoir, construire et faire évoluer des produits digitaux.

Key idea:

> Moins d’intermédiaires. Plus de continuité.

Principles:

- Produit avant technologie
- Un interlocuteur
- Construit pour durer
- Communication claire

### 9.2 Rayan Sekkat page

Purpose: make the human relationship explicit without turning the page into a long CV.

Suggested structure:

- large professional image;
- `Rayan Sekkat — Software Engineer & Founder`;
- concise professional overview;
- selected experience/projects;
- focus areas;
- location/languages if useful;
- LinkedIn link.

### 9.3 Method page

Explain the five-stage method in detail:

1. Discover
2. Design
3. Build
4. Launch
5. Improve

Important reassurance:

> Vous n’avez pas besoin d’arriver avec un cahier des charges parfait.

### 9.4 Offers page

The page is named `Offres`, not `Tarifs`.

Four offers:

- Applications & plateformes
- MVP & lancement produit
- Sites premium & refonte
- Accompagnement continu

No public prices.

Each offer explains:

- who it is for;
- common needs;
- what may be included;
- CTA to discuss the project.

Global commercial statement:

> Chaque engagement est construit autour du périmètre réel du projet. Après un premier échange, vous recevez une proposition détaillée avec périmètre, planning et budget.

Response promise:

- first response within 24 business hours;
- detailed quote/proposal only after enough framing.

### 9.5 FAQ

Global FAQ covers cross-service concerns such as:

- countries served;
- taking over existing products;
- collaboration with internal teams;
- code ownership;
- hosting/deployment;
- quote process;
- how to start.

Service-specific questions stay on each service page.

## 10. Contact and Project Intake

### 10.1 Contact page

Simple form:

- name;
- email;
- subject;
- message.

Purpose: general questions and lightweight contact.

### 10.2 Start-a-project page

Structured project intake, presented as a clean multi-step flow.

Fields:

1. Project type
   - Application / SaaS
   - MVP
   - Site / redesign
   - Automation / AI
   - Backend / API
   - DevOps
   - Other
2. Current stage
   - Idea
   - Requirements already written
   - Existing design
   - Existing product
   - Already in development
3. Project objective / description
4. Timing
   - ASAP
   - 1–3 months
   - 3–6 months
   - Not defined
5. Contact details
   - name
   - company
   - email
6. Optional budget field only if useful; never mandatory.

The existing contact/Brevo infrastructure should be extended rather than replaced wholesale.

Error states must preserve entered data and clearly handle:

- sending;
- success;
- network/provider failure;
- validation error;
- rate limit.

## 11. Insights

Insights is a curated knowledge/resource library, not a chronological blog dump.

### 11.1 Categories

Guides:

- Articles
- Practical guides

Resources:

- Checklists
- Templates
- Tools

### 11.2 Initial content set

Launch with a small number of strong pieces rather than many thin pages:

1. Comment préparer un projet SaaS
2. MVP : quelles fonctionnalités garder pour la V1 ?
3. Refonte ou nouveau site : comment décider ?
4. Checklist avant le lancement d’une application
5. Template de cahier des charges digital
6. No-code, SaaS existant ou développement sur mesure ?

### 11.3 Editorial style

Avoid generic SEO intros and empty “digital transformation” copy.

Prefer concrete product/engineering reasoning, examples and trade-offs based on real delivery experience.

### 11.4 Content architecture

At launch, use local typed content/MDX rather than adding an external CMS.

Each content item should expose metadata such as:

- title;
- description;
- category;
- publication/update dates;
- reading time;
- featured status;
- related service.

### 11.5 Internal linking

Desired paths:

`Insight → Service → Case study → Démarrer un projet`

and contextual links back from services to useful guides.

## 12. Design System and Frontend Architecture

Keep the current Next.js App Router / React / TypeScript / Tailwind foundation. A redesign does not justify a framework migration by itself.

Target frontend organization:

```text
src/
├── app/
│   └── (localized)/[locale]/...
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── home/
│   ├── work/
│   ├── services/
│   ├── studio/
│   └── insights/
├── content/
│   ├── projects/
│   ├── services/
│   └── insights/
└── lib/
```

Principle:

> Pages stay light; reusable components handle presentation; structured content is centralized; interactive behavior is isolated.

### 12.1 Structured content

Project data must not be duplicated in homepage, `/work`, mega-menu and case-study code.

A project record should centrally provide fields such as:

- slug;
- title;
- subtitle;
- year;
- categories;
- featured state/order;
- hero media;
- description;
- role;
- services;
- technologies;
- challenge;
- solution;
- capabilities;
- gallery;
- related/next project.

Services should follow the same single-source principle.

### 12.2 Design tokens

Centralize:

- background/surface/foreground colors;
- muted text;
- accent and hover state;
- borders;
- display/body/label typography;
- container widths;
- section spacing;
- radii and motion timings.

## 13. Motion

Framer Motion is already available and should be used selectively.

Reusable motion primitives may include:

- Reveal
- Fade
- Stagger
- ParallaxMedia
- ProjectTransition
- MegaMenuTransition

Rules:

- motion supports hierarchy rather than becoming the content;
- simple hover/focus effects prefer CSS;
- reduced-motion preferences are respected;
- mobile motion is lighter than desktop;
- no performance-heavy decorative WebGL in V1.

## 14. Performance and Media

Requirements:

- use optimized responsive images;
- explicit image dimensions to avoid layout shift;
- lazy-load below-the-fold project media;
- prioritize only true hero assets;
- use Next image optimization where appropriate;
- prepare assets at useful source sizes rather than embedding oversized screenshots;
- avoid large autoplay hero videos.

Design targets:

- LCP around or below 2.5s under good real-world conditions;
- near-zero CLS;
- no unnecessary client-side JS;
- Server Components by default where possible;
- Client Components only for interaction/motion needs.

## 15. Accessibility

Navigation, mega-menus, forms and project interactions must work with:

- keyboard;
- pointer/mouse;
- touch;
- screen reader.

Requirements include:

- clear visible focus;
- appropriate `aria-expanded` / control relationships;
- Escape-to-close menus;
- sufficient color contrast;
- no information available only on hover;
- reduced-motion support;
- readable line lengths for editorial content.

## 16. SEO and Localization

Preserve and extend the current bilingual SEO foundation.

Every important commercial page gets:

- unique title;
- unique description;
- canonical;
- FR/EN alternates;
- Open Graph metadata;
- sitemap inclusion;
- breadcrumbs where they add value.

Core FR and EN commercial pages launch together.

Old indexed/shared routes must receive permanent redirects to their new equivalents. A migration map must be created before release for old refonte, creation, about, budget/offers and other superseded public URLs.

## 17. Testing and Quality

Minimum automated coverage should include:

### Unit/component

- navigation behavior;
- content resolution;
- forms and validation;
- i18n helpers;
- project/service data helpers.

### End-to-end

- `/fr` and `/en` render;
- mega-menu keyboard/touch behavior;
- language switch;
- project navigation;
- contact submission;
- start-a-project submission;
- form error preservation;
- key mobile navigation flows.

Release verification should include equivalent commands for:

```text
lint
typecheck
tests
production build
```

The exact scripts may be added or normalized during implementation if they do not already exist.

## 18. Migration Strategy

Do not redesign production one random section at a time.

Implementation should progress in coherent stages:

### Phase 1 — Foundation

- design tokens;
- typography;
- page/container system;
- navbar and mega-menus;
- footer;
- motion primitives;
- structured content models;
- i18n route/content model.

### Phase 2 — Core commercial

- homepage;
- six service pages;
- Studio pages;
- Offers;
- FAQ;
- Contact;
- Start a project.

### Phase 3 — Work

- `/work`;
- Pick4Me case study;
- Pont Factur-X case study;
- GoodCall case study;
- secondary projects as content is ready.

### Phase 4 — Insights

- index/templates;
- initial guides/resources;
- featured insight integration.

### Phase 5 — Polish and release

- final motion;
- responsive refinement;
- accessibility review;
- performance optimization;
- SEO metadata;
- redirect map;
- QA.

## 19. Launch Criteria

The redesign is ready only when:

- FR core pages are complete;
- EN core pages are complete;
- desktop/tablet/mobile layouts are production ready;
- navbar and mega-menus work with keyboard and touch;
- language switching works;
- homepage is complete;
- all six service pages are complete;
- `/work` is complete;
- Pick4Me, Pont Factur-X and GoodCall case studies are complete;
- Studio, Method, Offers and FAQ are complete;
- Contact and Start-a-project flows work end to end;
- metadata, canonical and hreflang are correct;
- sitemap and redirects are correct;
- reduced-motion and focus behavior are correct;
- lint/typecheck/tests/build pass;
- featured projects contain real media and accurate information;
- no placeholder-heavy sections ship.

## 20. Explicitly Out of Scope for V1

Do not add unless separately approved:

- external CMS;
- client account/portal;
- chatbot;
- complex new logo;
- WebGL-heavy decorative experiences;
- automatic translation;
- sophisticated pricing calculator;
- dozens of SEO articles;
- fake testimonials, fabricated metrics or decorative client logos;
- unrelated backend rewrites.

## 21. Success Definition

The redesign succeeds when a new visitor can form these three impressions quickly:

1. `Rayan Studio construit des produits software et des expériences web professionnelles.`
2. `Le niveau d’engineering derrière le design est crédible.`
3. `Je comprends avec qui je vais travailler et il est simple de démarrer un projet.`

The final brand should feel like a structured, premium software studio while remaining transparent about its independent, direct-working model.