# CLAUDE.md — Rayan Studio

Brief permanent pour Claude Code. **Mémoire projet complète : `PROJECT_MEMORY.md`** — à lire avant
toute décision de périmètre (état visuel, journal, chantiers, limites connues). Ce fichier ne
contient que les invariants valables à CHAQUE session.

**Workflow d'exécution obligatoire : @.claude/loop-engineering.md** (boucle
inspect → change → verify → learn, conditions d'arrêt, gestion du contexte, error recovery).

App = **Rayan Studio** (`rayanstudios.com`), site d'un **studio indépendant de Product & Software
Engineering** : applications web et SaaS, MVP, APIs/backends, automatisation et IA, DevOps/cloud,
et en second plan sites web premium et refontes.

## Produit (garde-fou n°1)

Studio **founder-led** (Rayan Sekkat, basé en Corée du Sud) : un interlocuteur unique du cadrage
à la mise en production. Positionnement validé le 2026-08-12 : environ 70 % software, 30 % web
premium. Cible : entreprises et équipes qui ont un produit à construire, à reprendre ou à
automatiser ; la refonte de site reste une porte d'entrée secondaire. Les 70 landings
`/site/[sector]/[city]` gardent leur intention locale/TPE (surface d'acquisition séparée), ne pas
les réécrire pour coller au positionnement principal.

RÈGLE STRICTE : **aucune preuve inventée.**

- Interdits : chiffres clients fabriqués, faux témoignages, logos ou portraits fictifs, taille
  d'équipe gonflée, métriques présentées comme mesurées si elles ne le sont pas.
- À employer : périmètre technique réel des projets (intégrations, architecture, mise en
  production), cas synthétisés annoncés comme tels, formulations prudentes.

Décisions commerciales à respecter : **aucun prix public** (modèle « Offres » + devis après
cadrage ; qualification budget facultative dans le formulaire projet uniquement) ; **aucun tiret
cadratin « — » dans la copy publique** (`npm run check:copy` l'impose).

## Stack & structure

App unique **Next.js 14.2.5 App Router**, npm, TypeScript strict, React 18.

- `src/app/(localized)/[locale]/` — home, `services/[slug]`, `work/[slug]`, `studio/[slug]`
  (studio, rayan, méthode, offres, FAQ), `insights/…`, contact, démarrer un projet, et pages
  légales EN (`legal`, `privacy`, `terms`, générées pour `en` seulement).
- `src/app/(default)/` — pages légales FR aux URLs racines historiques (`/cgv`,
  `/mentions-legales`, `/politique-confidentialite`) + `site/[sector]/[city]` (70 landings SEO
  locales).
- `src/app/api/` — `contact` et `project` (formulaires → Brevo), `unsubscribe` et
  `webhooks/resend` (pipeline de prospection, base Neon).
- `src/content/` — contenu structuré : `services/`, `projects/`, `insights/`, `studio.ts`,
  `navigation.ts`, `legal.tsx` (CGV, confidentialité, mentions légales FR/EN).
- `src/components/` — `home/`, `services/`, `work/`, `studio/`, `insights/`, `forms/`,
  `navigation/` (header/footer actuels), `layout/commercial-page-shell.tsx`, `site/` (legacy +
  consent/analytics + landings locales), `ui/` (primitives locales, pas de dépendance shadcn).
- `src/lib/` — sources de vérité : `brand.ts`, `i18n.ts`, `site-routes.ts` (tous les chemins,
  dont `legalPath`), `seo.ts`, `local-seo.ts`, `service-seo.js`, `local-seo-content.js`,
  `analytics.ts`, `forms/` (validation, Brevo, rate limit).
- `scripts/` — **package npm séparé** (`rayan-studios-outreach`, deps `axios` + `nodemailer`),
  scripts d'acquisition lancés par GitHub Actions. Ne pas mélanger avec les deps du site.

Alias : `@/*` → `./src/*`.

Styling : Tailwind + classes globales dans `src/app/globals.css` (`.brand-wordmark`,
`.hero-aurora`, `.hero-vignette`, `.glass-panel`…). Motion : framer-motion. Icônes : lucide-react.

## Sources de vérité (ne pas dupliquer en dur)

- Nom, fondateur, email, WhatsApp, URL → `src/lib/brand.ts`, jamais en dur dans un composant.
- Locales et détection → `src/lib/i18n.ts` (`fr` | `en` uniquement).
- Villes et secteurs SEO → `src/lib/local-seo.ts`. Ajouter une ville/secteur ici propage aux
  70 combinaisons, au sitemap et au contenu enrichi.
- Chemins des pages → `src/lib/site-routes.ts`, jamais de `/fr/...` ou `/en/...` en dur.
- Pages légales → `src/content/legal.tsx`. Chaque affirmation (champs collectés, traceurs,
  sous-traitants, durées) doit refléter le code : `src/lib/forms/validation.ts`,
  `AnalyticsLoader`/`CookieConsent`, `scripts/prospection/`. Toute modif de formulaire, de
  tracking ou de prospection implique une mise à jour de la politique de confidentialité.
  Les données d'identité juridique (statut, SIRET, adresse) ne sont pas dans le dépôt : ne
  jamais les inventer.

## Commandes

```bash
npm run dev
npm run typecheck      # tsc --noEmit
npm run lint
npm run check:copy     # interdit le tiret cadratin dans la copy publique
npm test               # vitest (unitaires + composants)
npm run build          # 170 pages statiques
npm run test:e2e       # Playwright, lance son propre dev server sur :3000
npm run verify         # lint + typecheck + check:copy + test + build
git diff --check

cd scripts && npm test  # node --test sur les scripts d'acquisition
```

Une modif UI n'est « vérifiée » qu'après `npm run verify` et une inspection réelle de la page
(curl ou navigateur) ; l'E2E couvre la home, la navigation et les formulaires.

## Acquis à ne pas casser

Toute refonte visuelle doit conserver :

- SEO : metadata localisée, `sitemap.ts`, `robots.ts`, alternates FR/EN.
- Schema.org : `ProfessionalService`, `LocalBusiness`, `Service`, `FAQPage`.
- i18n FR/EN sur toutes les pages localisées.
- Tunnel contact : formulaire, honeypot `companyWebsite` (à ne pas confondre avec `siteUrl`, qui
  est un vrai champ visible), rate limit 5 req / 10 min par IP, sanitization HTML, envoi Brevo.
- Tracking : `FunnelTracking` (`scroll_depth` 25/50/75/90, `section_view`), consentement cookies,
  CTA trackés (hero, contact, showcase, email, WhatsApp).

## Variables d'environnement

Site : `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SITE_LAST_MODIFIED`,
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`,
`BREVO_SENDER_NAME`, `BREVO_TO_EMAIL`, `BREVO_SUBJECT`.

Acquisition (GitHub Actions) : `GOOGLE_PLACES_API_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`.

Debug connu : `/api/contact` en 502 local → vérifier les IP autorisées côté Brevo
(`unrecognised IP address`).

## Acquisition (scripts/)

Trois workflows GitHub Actions :

- `weekly-prospection.yml` → `scripts/prospection/run.js`. Pipeline actuel : SIRENE + Brave →
  audit du site → qualification LLM sur signaux minimisés → envoi Resend, base Neon, désinscription
  et webhooks hébergés dans le site. Détails et procédure d'activation : `scripts/prospection/README.md`.
  `SEND_ENABLED` reste une variable de dépôt, jamais un input.
- `daily-outreach.yml` → `scripts/outreach.js` (Google Places + Gmail, `contacted.json`).
  **Désactivé manuellement depuis août 2026**, remplacé par le pipeline ci-dessus. Ne pas
  réactiver sans décision explicite.
- `freelance-opportunities.yml` → `scripts/freelance-opportunities.js`. **N'envoie rien** : produit
  des `proposalDraft` à relire et coller manuellement. Ne pas automatiser l'envoi.

Contraintes dures :

- Rayan vit en Corée du Sud → **missions remote uniquement** (`FREELANCE_REQUIRE_REMOTE=true`).
- `scripts/message-humanizer.js` reste local et déterministe, **sans API externe** : les données
  prospects ne doivent pas transiter par un service tiers.
- Ne jamais commiter de données prospects hors `contacted.json` et des rapports de session.

## Règles de travail

- **Ne pas nettoyer le worktree sans demande explicite.** Le repo contient régulièrement des
  modifications non commitées de l'utilisateur (souvent dans `src/components/site/`). Ne pas
  `git restore`, `git stash` ni reverter sans accord.
- Avant de modifier un composant, le relire dans son état courant, pas dans son état commité.
- Commits : Conventional Commits (`feat:`, `fix:`, `chore:`), sujet court.
  **Jamais de trailer `Co-Authored-By`.**
- Après un chantier important : mettre à jour `PROJECT_MEMORY.md` (entrée de journal + sections
  impactées + commandes de vérification + points non vérifiés).
