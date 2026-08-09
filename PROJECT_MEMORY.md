# Rayan Studio - Memoire Projet

Derniere mise a jour: 2026-06-13

Ce fichier sert de memoire vivante pour le projet. A chaque chantier important, le mettre a jour avant de terminer: etat du site, decisions, points techniques, risques, prochaine etape.

## Resume Executif

Rayan Studio est un site Next.js 14 pour vendre des prestations de creation et de refonte de sites vitrines premium. La cible prioritaire clarifiee est les petites entreprises/TPE qui ont un site date, peu convaincant, ou aucun site. Les commerces locaux restent une cible forte, mais le positionnement ne doit pas etre limite au CHR.

Le positionnement commercial actuel est clair: direction visuelle, UX orientee conversion, developpement, SEO local, DNS, deploiement, VPS et accompagnement direct. Le site doit maintenant quitter une esthetique trop generique/AI pour devenir une vraie vitrine d'agence de refonte web: plus specifique, plus credible, plus visuelle, plus orientee preuve.

Objectif business personnel: atteindre au minimum 1000 a 1500 EUR de revenus mensuels nets/viables pour subvenir aux besoins du fondateur vivant en Coree du Sud. La strategie doit donc privilegier des offres simples a vendre, une acquisition directe et un volume de projets realiste pour une personne seule.

Deux chantiers actifs:

1. Refonte graphique et narrative du site.
2. Amelioration du workflow d'outreach email.

Spec de refonte active: `docs/superpowers/specs/2026-06-09-rayan-studio-refonte-positionnement-design.md`.

## Stack Et Commandes

- Framework: Next.js 14.2.5 avec App Router.
- Langage: TypeScript strict, React 18.
- Styling: Tailwind CSS, classes globales dans `src/app/globals.css`.
- UI: composants locaux type shadcn dans `src/components/ui`, Radix Accordion, lucide-react, Embla carousel.
- Motion: framer-motion.
- Tracking: Google Analytics via `NEXT_PUBLIC_GA_ID`, consentement cookies, evenements custom.
- Contact entrant: route API Next.js vers Brevo.
- Outreach sortant: script Node.js dans `scripts/outreach.js`, lance par GitHub Actions.

Commandes utiles:

```bash
npm run dev
npm run build
npm run lint
git diff --check
```

Note de verification connue: d'anciennes sessions ont observe que `next lint` et `tsc` peuvent rester bloques dans l'environnement sandbox. `git diff --check` reste un controle rapide fiable pour les changements de format.

## Structure Actuelle

### Pages et routing

- `src/app/page.tsx`: redirige vers `/fr` ou `/en` selon `accept-language`.
- `middleware.ts`: redirection racine `/` vers `/fr` ou `/en`.
- `src/app/[locale]/page.tsx`: page d'accueil localisee FR/EN.
- `src/app/[locale]/a-propos-methodologie-preuves/page.tsx`: page de confiance, methode et preuves.
- `src/app/a-propos-methodologie-preuves/page.tsx`: version non localee de la page confiance.
- `src/app/mentions-legales/page.tsx`, `src/app/politique-confidentialite/page.tsx`, `src/app/cgv/page.tsx`: pages legales.
- `src/app/sitemap.ts`: sitemap avec routes principales et pages SEO locales.
- `src/app/robots.ts`: robots + sitemap.

### Homepage

`src/components/site/HomePage.tsx` assemble:

1. `Navbar`
2. `Hero`
3. `ProblemSolution`
4. `Services`
5. `Showcase`
6. `Process`
7. `Pricing`
8. `Testimonials`
9. `Faq`
10. `Contact`
11. `Footer`

La page ajoute aussi:

- Schema.org `ProfessionalService`, `LocalBusiness`, `Service`, `FAQPage`.
- `FunnelTracking` pour vues de sections et profondeur de scroll.
- Fonds fixes `hero-aurora` et `hero-vignette`.

### Donnees marque

Source de verite: `src/lib/brand.ts`

- Nom: Rayan Studio.
- Fondateur: Rayan Sekkat.
- Email: `rayan.sekkat@gmail.com`.
- WhatsApp: `+33 6 36 36 56 96`.
- URL fallback: `https://rayanstudios.com`.

### Internationalisation

Source: `src/lib/i18n.ts`

- Locales supportees: `fr`, `en`.
- `normalizeLocale` retourne `fr` si l'entree commence par `fr`, sinon `en`.
- La plupart des contenus homepage sont definis directement dans chaque composant.

## Etat Visuel Actuel

Direction actuelle:

- Direction "atelier de refonte web": papier chaud, grille discrete, encre noire, accent corail, aplats francs.
- Typographies Google: Plus Jakarta Sans et Sora, avec un wordmark `Rayan Studio` en serif italique via `.brand-wordmark`.
- Navbar papier pleine, monogramme `RS`, boutons francs avec ombre corail.
- Hero editorial compact: promesse de refonte, CTA diagnostic, bloc avant/apres et diagnostic inclus visibles dans le premier ecran desktop.
- Hero niveau 2: dossier de refonte, plan de relance web, audit visuel, SEO/DNS/deploiement, hebergement/VPS et technique prise en charge visibles dans le premier ecran.
- Realisations niveau 2: cartes transformees en mini dossiers client avec probleme, intervention, resultat, preuve, et scopes de travail sur le projet actif.
- Process niveau 2: passage a 5 etapes avec diagnostic, structure/maquette, design/dev, SEO/DNS/VPS, deploiement/support.
- Tarifs niveau 2: chaque offre ouvre une modale de demande rapide contextualisee, avec l'offre preselectionnee et un message pre-rempli selon la langue.
- Contact niveau 2: le diagnostic gratuit annonce maintenant un livrable concret: reponse sous 24h, 3 priorites d'action, capture commentee et plan de correction simple.
- Favicon remplace par un monogramme `RS` en encre/corail.
- Assets portfolio: `public/realisations/*.png`.
- Section temoignages remplacee par des retours synthetises sans portraits repetes, pour eviter l'effet faux temoignages et renforcer la credibilite.

Diagnostic:

- Le site a quitte l'ancien langage bleu/glassmorphism sur les sections principales de la home.
- Le fond doit rester doux: grille et chaleur subtiles, sans rupture trop radicale entre hero et sections.
- Les cartes doivent rester coherentes avec la DA: moins d'arrondis, moins de blur bleu, plus de papier, bordures encre et accent corail.
- Deux composants UI non utilises sur la home peuvent encore contenir des couleurs bleues historiques: `src/components/ui/logos3.tsx` et `src/components/ui/carousel-embla.tsx`.

Principes de refonte a garder:

- Premier ecran = experience utile et commerciale, pas une landing marketing vague.
- Montrer concretement le travail: avant/apres, captures, diagnostics, checklist de refonte.
- Eviter une palette mono-bleue et les effets decoratifs trop attendus.
- Garder les CTA clairs: maquette gratuite, WhatsApp, demande de refonte.
- Ne pas perdre les acquis SEO, schema.org, i18n, contact et tracking.

## Tunnel Commercial

### Contact entrant

Composants:

- Formulaire: `src/components/site/Contact.tsx`.
- API: `src/app/api/contact/route.ts`.
- Analytics: `src/lib/analytics.ts`.

Champs formulaire:

- Prenom (`firstName`, requis).
- Besoin principal (`projectType`): creation, refonte, pas encore sur.
- Type de commerce (`businessType`, requis).
- Email (`email`, requis).
- URL du site actuel (`siteUrl`, optionnel, champ visible).
- Message (`message`, requis).
- Honeypot `companyWebsite` (champ cache anti-bot, a ne pas confondre avec `siteUrl`).

Promesse de diagnostic:

- Le bloc contact precise ce que le prospect recoit avant tout devis: 3 priorites d'action, une capture commentee, un plan de correction simple et une reponse sous 24h.
- Version anglaise equivalente: 3 action priorities, annotated screenshot, simple correction plan.

Securite/qualite:

- Honeypot anti-bot.
- Rate limit memoire par IP: 5 requetes / 10 minutes.
- Validation email simple.
- Sanitization et echappement HTML.
- Envoi Brevo vers `BREVO_TO_EMAIL`.

Variables d'environnement attendues:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_SITE_LAST_MODIFIED`
- `BREVO_API_KEY`
- `BREVO_SENDER_EMAIL`
- `BREVO_SENDER_NAME`
- `BREVO_TO_EMAIL`
- `BREVO_SUBJECT`

Point de debug connu: si `/api/contact` retourne 502 en local avec Brevo, verifier les IP autorisees dans Brevo. Le compte peut refuser l'appel API avec `unrecognised IP address` si l'IP actuelle ou l'IP du serveur n'est pas whitelist.

### Tracking

- `FunnelTracking` emet `scroll_depth` a 25, 50, 75, 90%.
- `FunnelTracking` emet `section_view` pour les sections homepage.
- CTA principaux trackes: hero, contact, projet showcase, email, WhatsApp.
- Consentement cookies gere dans `CookieConsent`.

## SEO Et Preuves

SEO existant:

- Metadata globale dans `src/app/layout.tsx`.
- Metadata localisee dans `src/app/[locale]/page.tsx`.
- Pages services SEO phase 1:
  - `/fr/refonte-site-internet`
  - `/fr/creation-site-vitrine`
  - `/fr/site-internet-petite-entreprise`
  - `/en/website-redesign`
  - `/en/small-business-website`
- Pages services SEO phase 2 contenu:
  - `/fr/cout-refonte-site-internet-petite-entreprise`
  - `/fr/checklist-refonte-site-internet`
  - `/en/small-business-website-redesign-cost`
- Schema.org homepage.
- Schema.org `Service` + `FAQPage` sur les pages services.
- Sitemap dynamique avec pages locales.
- Sitemap enrichi avec les pages services et alternates localisees quand une page equivalente existe.
- Pages locales generees a partir de:
  - `src/lib/local-seo.ts`
  - `src/lib/local-seo-content.js`
  - `src/components/site/LocalSeoLanding.tsx`
- Pages services generees a partir de:
  - `src/lib/service-seo.js`
  - `src/app/[locale]/[service]/page.tsx`
  - `src/components/site/ServiceSeoPage.tsx`

Cibles locales actuelles:

- Villes: Paris, Marseille, Lyon, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille.
- Secteurs: restaurant, cafe, hotel, boulangerie, patisserie, bar, commerce local.

SEO local phase 2:

- Les pages `/site/[sector]/[city]` utilisent maintenant un contenu enrichi par ville et par secteur: contexte local, intention commerciale, points a corriger, checklist et preuve adaptee.
- Les metadata title/description sont generees par `buildLocalSeoContent` pour eviter des pages trop proches.
- Objectif: rendre les 70 pages locales plus utiles et moins fines avant de travailler les pages geographiques ou les backlinks.

SEO phase 3:

- Verification Google Search Console preparee via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` et `metadata.verification.google`.
- Checklist post-deploiement creee dans `docs/seo-search-console-checklist.md`: verification, sitemap, pages prioritaires, requetes a suivre, rythme de suivi.
- Objectif: mesurer impressions, indexation et CTR avant de produire davantage de contenu.

SEO phase 4:

- Ajout de pages contenu intentionnelles pour capter les recherches de budget et de preparation de refonte.
- Les nouvelles pages restent prudentes: pas de faux chiffres clients, seulement des fourchettes commerciales deja presentes dans l'offre et des explications de perimetre.

Preuves actuelles:

- Page methode/preuves avec cas synthetises: hotel, cafe, boulangerie.
- Showcase avec Pick4Me en premier, puis Manteigaria, DocExtract, Pont Factur-X. Stampeo a ete retire de la selection "Projet actif".
- Pack commercial dans `docs/pack-commercial-rayan-studio.txt`.

Point a surveiller:

- Les preuves chiffrees doivent rester defendables. Si elles sont synthetiques ou issues de retours clients, garder une formulation prudente et ne pas presenter comme analytics audites si ce n'est pas le cas.
- Les 70 pages locales peuvent etre utiles, mais leur contenu reste proche. Priorite suivante SEO: enrichir les pages locales les plus importantes ou reduire l'indexation des combinaisons faibles pour eviter le contenu trop fin.

## Outreach Email

Fichiers:

- Script: `scripts/outreach.js`.
- Opportunites plateformes freelance: `scripts/freelance-opportunities.js`.
- Humanizer messages: `scripts/message-humanizer.js`.
- Rapports de session workflows: `scripts/workflow-session-report.js` et `scripts/workflow-session-reports/`.
- Dependances: `scripts/package.json`.
- Historique contacts: `scripts/contacted.json`.
- Automatisation: `.github/workflows/daily-outreach.yml`.
- Scan manuel/programme de missions: `.github/workflows/freelance-opportunities.yml`.
- Guide: `docs/prospection-plateformes-freelance.md`.
- Guide rapports workflow: `docs/workflow-session-reports.md`.

Fonctionnement actuel:

1. GitHub Action lance le script en semaine a 08:00 UTC, avec des options manuelles pour dry-run, volume, groupes de marches et profondeur de scan.
2. Le script selectionne des couples categorie + marche, sans obligation de choisir une ville.
3. Les marches sont separes en deux groupes: francophone et anglophone.
4. Il cherche des entreprises via Google Places Text Search.
5. Il recupere les details Google Place: nom, adresse, site web, telephone.
6. Si un site existe, il scanne le HTML pour trouver des candidats email.
7. L'extraction priorise `mailto:`, puis le HTML, avec filtres anti-faux positifs: fichiers image/assets (`@2x.png`, `@2x.webp`, etc.), placeholders (`name@email.com`, `john.doe@gmail.com`, etc.), domaines d'exemple, emails techniques et domaines tiers de scripts comme Clearbit.
8. Avant envoi ou ajout candidat, le script verifie que le domaine de l'email peut recevoir du mail via DNS MX, puis fallback A/AAAA.
9. La langue de l'email depend du marche detecte: `fr` pour les marches francophones, `en` pour les marches anglophones, avec lien vers `/fr` ou `/en`.
10. Il envoie l'email via Gmail/Nodemailer ou le marque `dry-run`.
11. Apres envoi reel, il ajoute le placeId et les infos au fichier `contacted.json` sous forme de fiche CRM minimale: `status`, `lifecycleStage`, `firstContactedAt`, `lastContactedAt`, `nextFollowUpAt` a J+7 et `timeline`.
12. La GitHub Action commit et push la liste de contacts mise a jour.

Opportunites plateformes freelance:

1. Le script `scripts/freelance-opportunities.js` scanne des URLs publiques ou des fichiers HTML sauvegardes via `FREELANCE_SEARCH_URLS` ou `FREELANCE_SOURCE_FILE`.
2. Sans URL fournie, il cherche lui-meme sur un catalogue de plateformes publiques: Codeur, 404Works, Freelancer, PeoplePerHour et RemoteOK. Upwork et We Work Remotely restent disponibles en override manuel, mais ne sont plus dans le catalogue automatique car les pages publiques renvoient souvent HTTP 403.
3. Le scoring/recherche est maintenant aligne sur le CV full-stack / DevOps de Rayan: plateformes web, SaaS/admin, API integrations, paiements, automation, Next.js/React/Node, Docker, Kubernetes, CI/CD, VPS/cloud, DNS/SSL, maintenance, deploiement, refonte et SEO local.
4. Il extrait les missions via JSON-LD et liens HTML, puis filtre les demandes proches de l'offre: creation/refonte de site, full-stack web, DevOps, API, maintenance, deploiement, SEO local, mobile/conversion.
5. Contrainte dure: Rayan etant en Coree du Sud, le rapport ne doit garder que des missions en teletravail. Les missions sur site, presentiel, hybrides ou sans mention claire remote/teletravail sont exclues par defaut.
6. Il score chaque opportunite et genere un `proposalDraft` a coller manuellement dans Malt, Codeur ou une autre plateforme.
7. Il n'envoie aucun message automatiquement: la reponse doit rester relue et adaptee a la mission.
8. Le workflow `freelance-opportunities.yml` peut etre lance manuellement sans URL et tourne aussi en cron avec le catalogue par defaut. `FREELANCE_PLATFORMS`, `FREELANCE_SEARCH_QUERIES` et `FREELANCE_SEARCH_URLS` servent seulement a ajuster ou remplacer la recherche. `FREELANCE_REQUIRE_REMOTE=true` reste force dans le workflow.

Humanizer:

- `scripts/message-humanizer.js` passe sur les emails froids et les brouillons de reponse plateforme avant envoi/ecriture dans le rapport.
- Objectif: retirer le ton marketing ou trop "agence", garder les faits utiles, et produire un message court, humain et relisible avant action.
- Le module reste local et deterministe, sans API externe, pour eviter de transmettre des donnees prospects a un service tiers.

Rapports de session GitHub Actions:

- Chaque workflow d'acquisition ecrit maintenant un rapport de session via `scripts/workflow-session-report.js`.
- `daily-outreach.yml` genere `scripts/workflow-session-reports/daily-outreach-latest.md` et `.json`.
- `freelance-opportunities.yml` genere `scripts/workflow-session-reports/freelance-opportunities-latest.md` et `.json`.
- Les rapports sont produits avec `if: always()`, donc meme si la recherche ou l'envoi echoue, le workflow tente d'ecrire un resume: statut, event, branche, commit, run GitHub, compteurs principaux et erreurs.
- Les commits automatiques incluent maintenant aussi `scripts/workflow-session-reports/`.

Configuration attendue:

- `GOOGLE_PLACES_API_KEY`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

Limites actuelles identifiees:

- Le ciblage reste large: les categories et marches tournent mecaniquement.
- Le message email est peu personnalise et peut ressembler a un cold email generique.
- Scoring encore simple: presence d'un site, email, telephone et adresse; pas encore de vraie qualification visuelle/technique du site.
- Suivi de statut partiel: les nouveaux envois ont une fiche CRM minimale, mais les reponses, desabonnements, bounces et prospects interesses restent a renseigner/automatiser.
- Controle de delivrabilite partiel seulement: le DNS du domaine est verifie, mais l'existence exacte d'une boite email precise ne peut pas etre garantie sans envoi ou verification SMTP intrusive, souvent bloquee par les serveurs.
- Pas de controle de delivrabilite avance: warming, domaine dedie, SPF/DKIM/DMARC, limite par domaine, variance des objets.
- La gestion du desabonnement repose sur une reponse manuelle avec "Desabonnement".
- Le script scanne seulement la page d'accueil du site trouve.
- Le transport Gmail peut limiter la scalabilite et la reputation.

Pistes d'amelioration:

- Segmenter les cibles prioritaires: restaurants, hotels, boulangeries, cafes, bars.
- Ajouter un scoring avant envoi: site absent, site ancien, pas mobile-friendly apparent, email pro, ville prioritaire.
- Generer un email avec 1 observation personnalisee par prospect.
- Separer discovery, qualification, envoi et suivi dans des fichiers ou etapes distinctes.
- Enregistrer un journal plus riche que `contacted.json`.
- Ajouter un mode dry-run et un rapport quotidien.
- Ajouter une blacklist/desabonnement robuste.
- Considerer un domaine/email dedie avec SPF, DKIM, DMARC, et un outil transactionnel ou cold outreach adapte.
- Ajouter une vue simple du mini CRM ou exporter les fiches vers un tableur pour suivre les relances.

## Etat Git A Ne Pas Ecraser

Etat observe le 2026-06-09:

- Plusieurs fichiers sont deja modifies dans `src/app` et `src/components/site`.
- `.github/workflows/daily-outreach.yml` et `scripts/*` apparaissent a la fois en suppression indexee et en fichiers non suivis.
- `.agents/`, `.codex/`, `public/hero/blue-atmosphere.mp4`, `SoapBubbles.tsx`, `carousel-embla.tsx`, `logos3.tsx` sont non suivis.

Consigne de travail:

- Ne pas nettoyer le worktree sans demande explicite.
- Ne pas reverter les fichiers modifies par l'utilisateur.
- Avant une refonte, relire les fichiers touches et travailler avec l'etat courant.

## Chantiers Prioritaires

### Chantier 1 - Refonte du site

Objectif:

Transformer le site en vitrine d'atelier de refonte web credible, distinctive et orientee acquisition pour petites entreprises avec site date ou sans site.

Axes probables:

1. Nouvelle direction artistique globale.
2. Nouveau systeme de sections moins base sur les cartes glassmorphism.
3. Hero plus concret: audit/refonte/deploiement plutot que promesse abstraite.
4. Showcase plus fort: avant/apres, critiques visuelles, mini audits.
5. Process qui montre les metiers couverts: visuel, SEO, DNS, deploiement, VPS.
6. Pricing et contact plus orientes "diagnostic de mon site actuel".
7. SEO local conserve et enrichi.

Questions ouvertes:

- Quelle direction visuelle exacte choisir: editorial brutaliste, studio technique premium, atelier de refonte local, ou autre?
- Faut-il garder FR/EN ou prioriser uniquement FR pour convertir?
- Decision cible: petites entreprises/TPE avec site date ou sans site. Les commerces locaux restent inclus, mais ne sont plus l'unique angle.
- Objectif business: atteindre au minimum 1000 a 1500 EUR mensuels nets/viables.
- Quel niveau de preuve reelle peut-on afficher?

### Chantier 2 - Workflow outreach

Objectif:

Passer d'un envoi automatise basique a un systeme de prospection plus qualifie, plus personnalise et plus propre cote delivrabilite.

Axes probables:

1. Ciblage et scoring des prospects.
2. Enrichissement des donnees avant email.
3. Email personnalise et moins generique.
4. Journal de campagne exploitable.
5. Dry-run, rapport quotidien et securites anti-spam.
6. Gestion des desabonnements et exclusions.
7. Eventuel passage vers un domaine/outillage dedie.

Questions ouvertes:

- Volume vise par jour/semaine?
- Souhaites-tu privilegier qualite forte et peu d'emails, ou volume plus important?
- Est-ce que les reponses sont traitees manuellement dans Gmail ou dans un CRM/tableur?
- Veux-tu un workflow 100% GitHub Actions, ou un systeme plus complet avec dashboard/tableur?

## Regles De Mise A Jour

Quand un changement important est fait:

1. Ajouter une entree dans le journal ci-dessous.
2. Mettre a jour les sections impactees: visuel, SEO, contact, outreach, env vars, risques.
3. Noter les commandes de verification effectuees.
4. Noter les points non verifies pour eviter les faux "tout est OK".

## Journal

### 2026-06-09

- Analyse initiale du projet.
- Creation de cette memoire projet.
- Deux chantiers formalises: refonte graphique/narrative du site et amelioration du workflow outreach.
- Cible clarifiee: petites entreprises/TPE avec site date ou sans site, en gardant les commerces locaux dans la cible mais sans limiter le positionnement au CHR.
- Objectif business clarifie: viser au minimum 1000 a 1500 EUR de revenus mensuels nets/viables.
- Spec de refonte positionnement creee: `docs/superpowers/specs/2026-06-09-rayan-studio-refonte-positionnement-design.md`.
- Premiere passe visible de refonte locale: hero repositionne sur "Votre site date", fond papier/grille, accent corail, navigation "Diagnostic", offres `Refonte Pro` et `Creation Express`, tarifs alignes 700/1200 EUR, contact enrichi avec URL de site actuel.
- Verification premiere passe: `curl -I http://localhost:3000/fr` retourne 200, navigateur integre confirme le nouveau hero/offres et aucune erreur console au chargement.
- Verification principale: lecture des pages, composants site, routes SEO/contact, workflow GitHub Action et script outreach.
- Deuxieme passe suite aux captures utilisateur: hero compacte pour voir le premier ecran complet en desktop, fond global adouci, sections sorties du `min-height: 100svh`, badges/cartes harmonises en papier/encre/corail, navbar rendue plus visible, wordmark serif italique et favicon `RS` remplace.
- Verification deuxieme passe: `git diff --check` OK, `curl -I --max-time 8 http://localhost:3000/fr` retourne 200, `npm run lint` OK, scan DOM sans bleu historique calcule et sans overflow horizontal.
- Point non bloqueur: `npx tsc --noEmit` echoue encore sur deux composants non utilises/non suivis (`src/components/ui/carousel-embla.tsx`, `src/components/ui/logos3.tsx`) qui importent `embla-carousel-react` et `embla-carousel-auto-scroll` absents.

### 2026-06-10

- Passe "direction artistique niveau 2" lancee apres validation utilisateur.
- Hero renforce en bloc atelier/diagnostic: `Dossier de refonte`, `Plan de relance web`, audit visuel, parcours mobile, SEO/DNS/deploiement, hebergement/VPS et deploiement propre.
- Realisations transformees en dossiers client plus credibles: probleme, intervention, resultat, preuve, et scopes de travail pour chaque projet actif.
- Process passe a 5 etapes avec signal technique explicite: diagnostic, structure/maquette, design/developpement, SEO/DNS/VPS, deploiement/support.
- Tarifs/contact/metadata rapproches du positionnement refonte TPE: site date, premier site, SEO local, DNS, hebergement, VPS, mise en ligne.
- Page `a-propos-methodologie-preuves` et `LocalSeoLanding` harmonisees pour eviter un retour aux anciens bleus/arrondis.
- Verification: `git diff --check` OK, `npm run lint` OK, `curl -I --max-time 8 http://localhost:3000/fr` retourne 200, scan DOM confirme les marqueurs de contenu et pas d'overflow horizontal.
- Point non bloqueur maintenu: `npx tsc --noEmit` echoue sur les imports Embla absents dans `src/components/ui/carousel-embla.tsx` et `src/components/ui/logos3.tsx`.
- Limite outil: la capture screenshot du navigateur integre a timeoute cote CDP, mais les checks DOM/rendu texte confirment le chargement des sections modifiees.
- Micro-correction hero apres capture utilisateur: hero reduit a `84dvh`, titre raccourci et limite a `4.45rem`, grille/panneaux/diagnostic compactes pour voir davantage de page dans le premier ecran.
- Micro-correction Services apres capture utilisateur: cards `Refonte Pro` et `Creation Express` forcees en hauteur egale via wrappers `h-full`, et fond damier remplace par un fond papier plus sobre.
- Correction navigation navbar: les liens d'ancre utilisent maintenant un scroll controle dans `Navbar.tsx` pour tenir compte de la navbar fixe, centrer les sections quand elles rentrent dans le viewport, et mieux cadrer les grandes sections desktop/mobile.
- Correction navigation navbar v2: le scroll controle vise maintenant le debut du contenu reel des sections (`padding-top` exclu), afin d'eviter le grand vide sous la navbar. Lien `FAQ` ajoute a la navbar desktop/mobile.

### 2026-06-12

- Stabilisation technique apres refonte: `npx tsc --noEmit` reproduisait une erreur sur deux composants UI presents dans `src/components/ui` mais dependants de paquets Embla absents.
- Cause racine: `tsconfig.json` inclut tous les fichiers `*.tsx`; meme si `src/components/ui/carousel-embla.tsx` et `src/components/ui/logos3.tsx` ne sont pas encore utilises dans la homepage, ils cassent le typecheck tant que leurs dependances ne sont pas dans `package.json`.
- Correctif applique: ajout de `embla-carousel-react` et `embla-carousel-auto-scroll` dans les dependances pour conserver ces composants sans casser TypeScript.
- Verification: `npx tsc --noEmit` OK, `npm run lint` OK, `npm run build` OK, `git diff --check` OK.
- Point a surveiller: `npm install` signale 8 vulnerabilites dans l'arbre npm global du projet. Ne pas lancer `npm audit fix --force` sans verifier les effets sur Next.js.

### 2026-06-13

- Ajustement showcase: Pick4Me devient le premier projet actif FR/EN et Stampeo est retire de la selection visuelle du bloc "Projet actif".
- Phase SEO mesure/indexation: ajout du support Search Console par variable d'environnement et checklist d'audit post-deploiement.
- Correction temoignages: suppression du mur de portraits dupliques et remplacement par une section statique de retours synthetises + rythme de preuve.
- Prochaine etape recommandee: QA finale desktop/mobile puis chantier outreach (scoring prospects, personnalisation email, suivi des relances).
- Outreach v1 sites dates: le script `scripts/outreach.js` vise maintenant explicitement les prospects avec site existant + email trouvable, ajoute `DRY_RUN=true`, `MAX_EMAILS_PER_DAY`, `DELAY_BETWEEN_EMAILS_MS`, un scoring simple et un rapport `scripts/outreach-report.json`.
- Email outreach repositionne sur le diagnostic gratuit d'un site date: clarte du message, mobile, SEO local, contact/conversion, DNS, hebergement et deploiement.
- Securite: en `DRY_RUN=true`, aucun email n'est envoye et `scripts/contacted.json` n'est pas modifie.
- GitHub Action outreach: le rapport quotidien `scripts/outreach-report.json` est ajoute au commit automatique avec `scripts/contacted.json`. Le declenchement manuel `workflow_dispatch` a maintenant `dry_run=true` par defaut et un input `max_emails`, pour tester sans envoyer d'emails reels.
- Verification outreach: `node --check scripts/outreach.js` OK, `GOOGLE_PLACES_API_KEY=dummy DRY_RUN=true MAX_EMAILS_PER_DAY=1 node outreach.js` OK depuis `scripts/` avec 0 resultat attendu, car cle Google factice.
- Point a surveiller: `npm install` dans `scripts/` signale 1 vulnerabilite high. Ne pas lancer `npm audit fix --force` sans verifier l'impact sur `nodemailer`/`axios`.
- Outreach v2 ton humain: le mail envoye est maintenant plus court, plus personnel et moins "agence/IA". Ajout d'une version texte (`text`) en plus du HTML, objets variables (`Petite question sur votre site`, `Au sujet du site de ...`, `Votre site web`) et HTML volontairement simple pour ressembler a un vrai email.
- Test ajoute: `scripts/outreach.test.js` verifie que `buildEmailContent` produit un message texte court, humain, avec mention du prospect, formule de sortie simple et sans vocabulaire marketing trop generique.
- Outreach v3 extraction nationale: la recherche ne choisit plus une ville. Le script cherche maintenant plusieurs categories au niveau national avec des requetes comme `restaurant France`, `boulangerie France`, etc., pagine Google Places, deduplique les fiches et scanne davantage de sites.
- Separation extraction/envoi: `MAX_EMAILS_TO_EXTRACT` et `MAX_PLACES_TO_SCAN` controlent le volume de leads extraits dans le rapport, tandis que `MAX_EMAILS_PER_DAY` garde une limite stricte sur le nombre d'emails reellement envoyes/prepares.
- GitHub Action outreach enrichie: le declenchement manuel permet maintenant de regler `search_targets_per_run`, `target_market_groups`, `max_places_to_scan` et `max_emails_to_extract`, en plus de `dry_run` et `max_emails`.
- Outreach v4 marches francophones/anglophones: le script ne s'arrete plus a la France. Il cible des marches francophones (France, Belgique francophone, Suisse romande, Luxembourg, Quebec) et anglophones (United Kingdom, Ireland, United States, Canada, Australia, New Zealand).
- Categories localisees: les requetes utilisent les categories francaises pour les marches francophones et les categories anglaises pour les marches anglophones.
- Emails bilingues: `buildEmailContent` produit maintenant un email francais pour `language=fr` et anglais pour `language=en`, avec liens vers `/fr` ou `/en`.
- GitHub Action outreach: ajout de `target_market_groups` et `search_targets_per_run` pour choisir les groupes (`francophone,english`) et le nombre de recherches `categorie + marche` par run.
- Conversion contact: le bloc contact annonce le livrable du diagnostic gratuit avec reponse sous 24h, 3 priorites d'action, capture commentee et plan simple. Test dedie: `scripts/conversion-diagnostic.test.js`.
- Outreach v5 mini CRM: les nouveaux envois reels creent maintenant une fiche de suivi dans `scripts/contacted.json` avec statut `sent`, etape `contacted`, timeline et relance conseillee a J+7. Les anciennes entrees restent compatibles et ne sont pas reecrites.
- SEO contenu phase 4: ajout des pages `/fr/cout-refonte-site-internet-petite-entreprise`, `/fr/checklist-refonte-site-internet` et `/en/small-business-website-redesign-cost`, generees par `src/lib/service-seo.js` et automatiquement reprises par le sitemap.

### 2026-06-27

- Mise en place du workflow "plateformes freelance" inspire d'une video/transcription sur la prospection Malt/Codeur: le projet dispose maintenant d'un scanner d'opportunites qui cherche lui-meme sur des plateformes publiques.
- Nouveau script: `scripts/freelance-opportunities.js`, avec catalogue par defaut Codeur/404Works/Upwork/Freelancer/PeoplePerHour, extraction JSON-LD/liens, scoring oriente refonte/site vitrine/SEO local/mobile, deduplication et brouillon de reponse manuelle avec lien portfolio.
- Nouveau workflow: `.github/workflows/freelance-opportunities.yml`, manuel sans URL ou programme avec le catalogue par defaut; les variables ne servent qu'a limiter/override les plateformes ou mots-cles.
- Nouvelle doc: `docs/prospection-plateformes-freelance.md`, avec usage local sans configuration, options de filtrage, rapport et regles anti-spam.
- Verification: `npm test` dans `scripts/` OK (20 tests: outreach + opportunites + humanizer), `node --check scripts/freelance-opportunities.js` OK, `node --check scripts/outreach.js` OK, `git diff --check` OK. Scan reel automatique limite a 10 sources OK: 566 opportunites brutes extraites, 20 candidates gardees dans `scripts/freelance-opportunities-report.json`; Upwork retourne HTTP 403 sur les pages publiques, les autres sources testees repondent.
- Ajout du humanizer local pour les mails et messages: `scripts/message-humanizer.js`, utilise par `scripts/outreach.js` et `scripts/freelance-opportunities.js`; test dedie `scripts/message-humanizer.test.js`.
- Ajout des rapports de session sur les workflows `daily-outreach.yml` et `freelance-opportunities.yml`: generation markdown + JSON via `scripts/workflow-session-report.js`, commit automatique des fichiers `scripts/workflow-session-reports/*-latest.*`, et tests dedies `scripts/workflow-session-report.test.js`.
- Integration du CV `CVRAYAN_yeonin.pdf` dans le scoring/recherche freelance: le profil est maintenant traite comme full-stack / platform web / DevOps, avec priorite aux missions API, SaaS/admin, paiements, automation, Docker/Kubernetes, CI/CD, VPS/cloud, DNS/SSL, maintenance et deploiement, en plus des refontes/sites vitrines. Scan reel apres ajustement CV: 18 sources, 663 opportunites brutes apres filtrage, 30 candidates retenues; les liens generiques de categorie/profil plateforme sont filtres.

### 2026-06-28

- Contrainte teletravail ajoutee au workflow plateformes freelance: les recherches par defaut commencent maintenant par des requetes remote/teletravail alignees full-stack / DevOps, et `FREELANCE_REQUIRE_REMOTE=true` est force dans `.github/workflows/freelance-opportunities.yml`.
- `scripts/freelance-opportunities.js` enrichit chaque mission avec `remoteOnly`, `remoteStatus` et `remoteReason`; les mentions `sur site`, `presentiel`, `hybride`, `on-site`, `in office`, `local candidates` ou `relocation` excluent la mission. Une simple recherche contenant `remote` ne suffit plus: la mission doit le mentionner, ou venir d'une plateforme garantie remote-only.
- RemoteOK est ajoute au catalogue automatique comme plateforme remote-only; Upwork et We Work Remotely restent optionnels mais sortent du catalogue par defaut a cause des HTTP 403 publics.
- Verification: `npm test` dans `scripts/` OK (28 tests), avec tests dedies pour le classement remote, les recherches remote par defaut et le filtrage du rapport.
- Correction apres essai Claude Cowork: l'extracteur filtre maintenant les vraies URLs de mission par plateforme pour exclure pages de navigation, profils freelances et liens externes; la meta-description globale de PeoplePerHour n'est plus injectee dans chaque offre, ce qui evite de scorer des postes type assistant/receptionist.
- Les brouillons `proposalDraft` passent en anglais pour PeoplePerHour/Freelancer/RemoteOK/Upwork/We Work Remotely, avec un angle adapte full-stack, MERN, DevOps, API/paiement ou e-commerce. Le fichier `scripts/freelance-valid-offers.*` contient maintenant seulement les missions propres disponibles apres filtrage, pas un quota artificiel de 30.
- Ajout de `scripts/freelance-contact-queue.js`: le script lit les offres propres, scanne les pages pour emails publics, `mailto:` et numeros internationaux, puis genere `scripts/freelance-contact-queue.{json,md}` avec messages humanises. L'envoi reel est bloque par defaut et exige `approved: true` par contact + `FREELANCE_CONTACT_SEND_APPROVED=true` + credentials Gmail, afin d'eviter un envoi de masse non valide.
- Run reel contact queue du 2026-06-28: 20 offres scannees, 0 email public, 0 telephone public, 20 offres sans contact public; aucun email envoye.

### 2026-08-09

- Audit complet livré (`FULL-AUDIT-REPORT.md`, note 49/100) + feuille de route (`ACTION-PLAN.md`). Priorités : P0 assainir les preuves, P1 fondations SEO/i18n/sécurité, P2 repositionnement Engineering/Studio, P3 SEO local + perf.
- P0-2 copy destructrice de confiance corrigée : note maintenance « revenu récurrent » remplacée par un cadrage client (Pricing.tsx FR+EN), « Moins d'avis inventés » -> « Moins de promesses » (Testimonials.tsx), « Ces pages servent le SEO » -> vérification avant démarrage (ServiceSeoPage.tsx FR+EN), titre Tarifs « pensées pour vendre sans se disperser » -> « pensées pour les petites entreprises » avec description orientée périmètre/engagement.
- P0-3 finition linguistique : accents restaurés dans Hero.tsx (H1 « prête à vendre »), Pricing.tsx (3 offres + maintenance), Services.tsx, service-seo.js (pages coût + checklist), pricing-leads.js, layout.tsx (keywords). Badge « Refonte » du hero localisé via `t.badge` (« Redesign » sur /en). Lien footer « CGV » -> "Terms of sale" sur /en. Calques EN corrigés ("Local SEO set" -> "Local SEO in place", "Obvious contact" -> "Easy to contact").
- Fix build : `.eslintrc.json` complété avec `ignorePatterns: ["out/", "output/", ".next/"]` — les doublons Finder de `out/` faisaient échouer `next build` (2 erreurs `react/no-find-dom-node` dans du vendor minifié).
- Vérification : `npx tsc --noEmit` exit 0 ; `cd scripts && npm test` 40/40 ; `git diff --check` OK ; lint source propre ; validation runtime de `pricing-leads.js` et `service-seo.js` (require + labels accentués). `npm run build` complet : très long (>10 min) et tué silencieusement en tâche de fond par l'outillage — relancé via nohup, résultat à confirmer avant déploiement.
- Constat process : les commandes lancées après `cd scripts` gardent ce cwd pour les appels suivants — plusieurs greps/builds ont échoué en silence à cause de ça. Toujours préfixer par `cd` absolu.
- Reste (P1, validé par l'utilisateur) : origine canonique www partout, `lang` dynamique sur /en, x-default, OG/Twitter localisés, sitemap sans URL redirigée ni route legacy cassée, 404 sur locales inconnues, navigation globale des pages secondaires, accessibilité menu/modal/cibles, upgrade Next 14.2.5 + headers sécurité.
- P1 fondations SEO/i18n exécuté le même jour (commit séparé) :
  - Origine canonique : `baseUrlFallback` et `NEXT_PUBLIC_SITE_URL` (.env.local + .env.example) passés en `https://www.rayanstudios.com`. Toutes les URLs dérivées (canonical, hreflang, sitemap, OG, JSON-LD) suivent via `getSiteUrl()`. **Action hébergeur restante : env var + redirection apex->www permanente (308).**
  - `lang` serveur : restructuration en route groups. `src/app/(localized)/[locale]/` porte `<html lang={locale}>` (layout racine propre), `src/app/(default)/` (redirect racine, pages légales, /site/*) porte `lang="fr"`. Métadonnées/fonts/GA/CookieConsent partagés via `src/app/_shared/root.tsx`. Ancien `src/app/layout.tsx` supprimé.
  - 404 : `dynamicParams = false` sur `[locale]` -> `/de`, `/foo`, `/llms.txt` répondent 404 (avant : redirect vers /en). Effet de bord assumé : `/FR` majuscule ne redirige plus, 404.
  - Route legacy `/a-propos-methodologie-preuves` : page redirect supprimée, remplacée par un redirect `next.config.mjs` (`permanent: true`) -> 308 avec en-tête `Location` valide (le `redirect()` RSC statique perdait le Location).
  - Sitemap : racine redirigée et route legacy retirées ; hreflang + `x-default` sur /fr et /en ; `lastmod` par défaut = date de build ; `NEXT_PUBLIC_SITE_LAST_MODIFIED` passé à 2026-08-09.
  - Canonical : défaut `canonical: "/"` retiré du layout racine (les pages légales n'héritent plus du canonical accueil) ; canonical + meta description propres sur /cgv, /mentions-legales, /politique-confidentialite ; title CGV -> « Conditions générales de vente ».
  - Homepage : title sans double marque (template ajoute « | Rayan Studio »), OG/Twitter localisés (og:locale `en_US` sur /en, og:url par page, titres/descriptions par langue), `x-default` dans les alternates. Calque EN « Perception diagnosis » -> "First-impression audit".
  - Vérification P1 sur build production réel (`next build` + `next start` + curl) : lang fr/en/cgv corrects, canonical www, og:locale/og:url par locale, hreflang + x-default dans le head et le sitemap, 308 avec Location, 404 sur locales inconnues, `tsc` 0, `next lint` 0, `git diff --check` OK.
  - Piège outillage : `next build` lancé via le wrapper de tâche de fond de l'outil meurt silencieusement (0 octet de log) et deux builds concurrents se corrompent mutuellement (`ENOENT` sur rename dans `.next/`). Lancer via `nohup npx next build > log &` et attendre le PID. Les erreurs `tsc` sur `.next/types` après déplacement de routes sont du cache stale : `rm -rf .next` avant de conclure.
- Suite P1 (navigation, accessibilité, JSON-LD, sécurité) exécutée dans la foulée sur la branche `audit-p0-p1` (PR #4) :
  - Navigation globale : `Navbar` + `Footer` ajoutés sur ServiceSeoPage, LocalSeoLanding (70 pages locales), page À propos et les 3 pages légales, avec `id="main-content"` sur chaque `<main>`. CTA réparés via `secondaryHref` dans `service-seo.js` (« Voir la checklist » -> page checklist, « Voir le coût » -> page coût, « Voir la méthode » -> À propos ; fallback `#tarifs`).
  - Accessibilité : menu mobile avec Échap, focus trap Tab/Shift+Tab, focus initial et restauration sur le bouton, backdrop passé sous la barre (header `z-[80]`, backdrop `z-[-1]` dans son contexte) pour garder le bouton fermer cliquable, cible 44px, aria-label localisés, `aria-controls`. Modal tarifs : focus initial sur Fermer, restauration au déclencheur, bouton 44px. Skip link global (`.skip-link` dans globals.css, lien dans `RootBody`). Champs `Input`/`Textarea` à 16px (`text-base`) contre le zoom iOS. `autocomplete` (given-name/email/url) sur Contact et modal tarifs. `role="status"`/`role="alert"` sur les messages de succès/erreur des deux formulaires.
  - Contraste : `text-[#d94f2b]` -> `text-[#c2461f]` (~4,6:1 sur crème) et `text-[#8a7d6f]` -> `text-[#6f6355]` partout (43 + 16 occurrences). Les aplats/bordures/ombres corail `#d94f2b` inchangés — seule la couleur de texte a bougé.
  - JSON-LD homepage : `LocalBusiness` sans adresse supprimé, WhatsApp déplacé de `sameAs` vers `contactPoint`, ajout `Person` (fondateur), `WebSite`, `WebPage` avec `inLanguage`, entités reliées par `@id`.
  - Sécurité : headers globaux via `next.config.mjs` (`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`, CSP en **Report-Only** — à observer avant passage en bloquant). Next upgradé `14.2.5` -> `^14.2.35` (corrige GHSA-f82v-jwr5-mffw et la série 14.x). `npm audit` (registre npmjs ; le miroir npmmirror ne supporte pas l'audit) : 3 high restants (nanoid/postcss transitifs de next + advisories 14.x tardifs) corrigés uniquement par Next 15/16 — migration majeure = chantier séparé à décider.
  - Vérification : build 95/95 pages, `tsc` 0, `next lint` 0, 40/40 tests scripts, smoke test `next start` : headers présents, navbar/footer sur toutes les pages secondaires, skip link rendu, CTA checklist correct, 200/404 conformes.
- Batch consentement/perf/SEO local (même branche, commit suivant) :
  - GA chargé **uniquement après consentement** : nouveaux `AnalyticsLoader.tsx` (monte gtag si localStorage `accepted` ou événement `rs-consent-granted`) et `ManageCookiesButton.tsx` (footer, rouvre la bannière via `rs-open-consent`). `RootBody` ne contient plus de script GA inline. Les événements trackés avant consentement sont silencieusement ignorés (`trackEvent` no-op sans `window.gtag`).
  - Animations : `Reveal` 0,75s -> 0,4s, opacité initiale 0,2 (plus de sections invisibles après scroll rapide), seuil 0,2, y 14. Boucles infinies supprimées : indicateur « Explorer » du hero et carte flottante ProblemSolution rendus statiques. `SoapBubbles.tsx` (mort) supprimé.
  - Assets : PNG réalisations redimensionnés 1600px en place via `sips` (8,3 Mo -> 3,3 Mo ; sips ne sait pas encoder WebP, conversion AVIF/WebP source reste à faire avec sharp si besoin). `stampeo.png` (non référencé) et `hero/blue-atmosphere.mp4` (836 Ko, non référencé) supprimés.
  - SEO local : les 70 pages `/site/{secteur}/{ville}` passent en `robots: noindex, follow` et sortent du sitemap (15 URLs restantes). Décision réversible documentée en commentaire dans le template et `sitemap.ts` — conforme à la reco audit tant que le contenu n'est pas réellement distinct par ville.
  - Vérification : build vert, smoke test — zéro `googletagmanager` dans le HTML initial, sitemap sans `/site/`, `noindex, follow` rendu sur page locale, lien « Gérer les cookies » présent, lint 0, 40/40 tests.
- P2 identité/offres (décisions utilisateur : site 100 % studio clients, PAS de parcours recruteur — il a un portfolio séparé ; remote uniquement) :
  - Matières réelles extraites du portfolio `portfolio-rayan-sekkat.vercel.app` : ingénieur full-stack 5+ ans, ex-STMicroelectronics (DevOps 2024) et UNYC (2020-2023), Master EPSI, basé à Séoul, FR natif / EN C1 / KO notions, LinkedIn `linkedin.com/in/rayan-sekkat-3911a9294`. Pick4Me, Pont Factur-X et GoodCall = ses produits réels en production.
  - `brand.ts` : ajout `linkedinUrl` + `portfolioUrl`.
  - À propos : section « Autorité externe & cohérence » remplacée par « Qui réalise le travail ? » (bio réelle, langues, liens Profil technique/LinkedIn/WhatsApp/email).
  - Hero : ligne solo -> « Studio indépendant de Rayan Sekkat, ingénieur full-stack ».
  - Showcase : badges `segment` (jargon interne « CHR ») remplacés par statuts honnêtes — Pick4Me/DocExtract/Factur-X « Produit du studio — en production », Manteigaria « Concept — refonte non commandée ». Designations « Référence d'exécution » clarifiées. **DocExtract étiqueté « Produit du studio » par déduction (absent du portfolio, pas d'attribution publique sur getdocextract.com) — à faire corriger par Rayan si faux.**
  - Tarifs : périmètre précisé (Express : 1 page/4 sections, 2 révisions, 1-2 sem ; Refonte Pro : 5 pages, migration/redirections, 2-3 sem) + bloc « Valable pour toutes les offres » (propriété client totale, coûts externes sans marge, prix HT + devis écrit, Séoul/remote compatible France). **Valeurs proposées par Claude, non corrigées explicitement par Rayan — à valider à la relecture de la PR.**
  - Footer : liens « Profil technique » + LinkedIn. JSON-LD Person : `jobTitle` + `sameAs`.
  - Confirmations utilisateur reçues ensuite : DocExtract **est** un produit du studio (étiquette validée) ; GoodCall ajouté au showcase (capture goodcall.gg via navigateur, badge « Produit du studio — en production », position 2 pour préserver le test « premier projet = Pick4Me »). Périmètre des offres explicité à l'utilisateur, pas de correction demandée à ce stade.
  - Toujours manquant : statut légal (SIREN/adresse) pour compléter les mentions légales ; témoignages clients attribués (aucun affiché — rien d'inventé).
- P3 perf (même branche) :
  - Hero et Navbar rendus **statiques au SSR** : suppression des variants framer-motion d'entrée (le HTML serveur contenait `opacity:0` inline -> contenu invisible jusqu'à hydratation + animation, cause principale du LCP mobile 4,7 s de l'audit). Hero n'importe plus framer-motion du tout. Micro-animations par item de Services supprimées. Le menu mobile (AnimatePresence) et les hovers restent.
  - `.cv-auto` (content-visibility: auto + contain-intrinsic-size 900px) appliqué aux 8 sections sous le fold de la homepage.
  - `WebVitalsReporter.tsx` : `useReportWebVitals` -> event GA `web_vitals` (LCP/CLS/INP/FCP/TTFB + rating). Ne part que si consentement (trackEvent no-op sans gtag). Donne enfin des Core Web Vitals terrain.
  - Mesure Lighthouse locale (localhost non throttlé, `npx lighthouse --preset=perf` mobile) avant/après : score 95 -> 99, TBT 182 -> 57 ms, LCP 1933 -> 1764 ms, CLS stable 0,022. Le gain réel attendu en prod throttlée est surtout sur le LCP (paint SSR immédiat).
  - Reste 1 `opacity:0` SSR : TextRotate du Showcase, sous le fold + cv-auto, sans impact LCP.
  - P3 non couvert (bloqué ou décision) : enrichissement réel des 70 pages locales (contenu distinct par ville), témoignages externes, raccourcissement agressif de la homepage mobile (-25-35 % = choix design à valider visuellement).
- P3 suite (décisions utilisateur : 0 client réel -> aucun témoignage ; raccourcir mobile ; enrichir pages locales) :
  - **0 client, cohérence totale** : Testimonials réécrit — « Retours synthétisés »/« Les retours les plus fréquents » (retours inexistants) -> eyebrow « Engagements », cartes reformulées en engagements de conception, et phrase de transparence assumée : studio jeune côté clients, engagements mesurables plutôt que témoignages, premiers cas documentés publiés avec accord. FAQ « Avec quels types de commerces travaillez-vous ? » -> « À quels types de commerces le studio s'adresse-t-il ? » (HomePage JSON-LD + Faq.tsx).
  - **Pages locales enrichies puis réindexées** : `local-seo-content.js` — quartiers réels par ville (`districts`, 4 par ville, vérifiables : Le Marais/la Presqu'île/le Vieux-Port…), `districtsLine`, meta description avec quartiers, et `SECTOR_FAQ_BUILDERS` (3 Q/R par secteur, ville+quartiers injectés dans les réponses -> contenu distinct par combinaison, ~371 mots vs ~213 avant). `LocalSeoLanding` : breadcrumb visible + BreadcrumbList/FAQPage JSON-LD, labels -> vrais H2, section FAQ, maillage interne (9 autres villes du secteur + 6 autres secteurs de la ville + 3 services) — fin des 70 pages orphelines. `noindex` retiré, pages réintégrées au sitemap (85 URLs). Les patterns grammaticaux quartiers utilisent « un quartier comme X, Y ou Z » (compatible articles variés).
  - **Mobile raccourci (~-1 800 px estimés)** : hero — grille technique + 3 mini-cards masquées sous `sm` ; Tarifs — « Ce qui est inclus » replié dans un `<details>` natif sur mobile (liste complète dès `sm`) ; Contact — bloc « Ce que je regarde d'abord » masqué sur mobile (le livrable reste) ; cartes Engagements sans min-height mobile. Mesure exacte 390px non obtenue (le pool navigateur ruflo fixe le viewport à 756px, iframe bloquée) — estimation par éléments retirés. Coupes plus agressives (sections entières) = à valider visuellement avec l'utilisateur.
  - Vérification : build 95/95, tsc 0, lint 0, 40/40 tests, smoke : quartiers/FAQ/maillage/breadcrumb rendus sur /site/restaurant/lyon, 0 noindex, sitemap 85 URLs dont 70 locales.
- Corrections post-review PR #4 (review externe 8,5/10, REQUEST CHANGES — 6 tasks toutes appliquées) :
  - Révocation Analytics effective en session : `hasAnalyticsConsent()` + `CONSENT_KEY` centralisés dans `analytics.ts`, `trackEvent` vérifie le consentement à chaque appel, événement `rs-consent-revoked` émis au refus, `AnalyticsLoader` repasse `enabled=false`. L'event `cookie_consent: declined` supprimé (contradictoire : tracker un refus de tracking).
  - Modal tarifs : focus trap Tab/Shift+Tab ajouté (ref `modalRef` sur le dialog, cycle sur les focusables), aligné sur le comportement du menu mobile.
  - Skip-link localisé (`RootBody` accepte `locale`, EN via le layout localisé). x-default -> `/fr` (metadata + sitemap) au lieu de la racine 307. `eslint-config-next` aligné `^14.2.35`.
  - CI GitHub Actions créée : `.github/workflows/ci.yml` — npm ci, lint, tsc, tests scripts (avec leur propre `npm ci`), build (env `NEXT_PUBLIC_SITE_URL` www). Recommandation review non appliquée automatiquement : exiger la CI verte sur `main` (réglage GitHub côté utilisateur).
  - Titre + description PR #4 réécrits pour refléter le scope réel P0→P3.
  - Non traité (backlog assumé par la review) : pages légales EN, hausse des prix conseillée (790/1490/2500/59 — décision commerciale utilisateur), passage CSP en mode bloquant après observation.
- PR #4 mergée dans main (`60616b1`), branche supprimée. CI verte (verify 1m20 + Vercel). Actions hébergeur transmises à l'utilisateur (env vars www, redirect 308, Search Console).
- Nouvelle offre « Application sur mesure » (décision utilisateur, validée en local avant push) : 3e carte Services (grille 3 colonnes, titre « Trois offres, un objectif »), nouvelle paire service-seo `/fr/application-web-sur-mesure` + `/en/custom-web-application` (copy volontairement large : « toute tâche qui vous fait perdre du temps », faisabilité annoncée au diagnostic, honnêteté « si un outil existant fait mieux et moins cher, je vous le dis »), carte Tarifs « Sur mesure » élargie aux applications métier. Test `scripts/service-seo.test.js` mis à jour (listes de routes exactes). Retouches visuelles demandées après test local : badge hero « REFONTE » rentré dans le cadre (`right-3`, px-4, 11px — il était tronqué à droite par l'overflow), badge « Pensé TPE » supprimé des cartes Services (boutons Détails/CTA en 2 boutons égaux `flex-1`), label proof « Pensé TPE »/« Built for small business » -> « Fonctionnement »/« How it works ». **Directive de style utilisateur : plus aucun tiret cadratin « — » dans les textes du site (« ça fait trop AI ») — 39 occurrences remplacées par virgules/deux-points/parenthèses/points selon contexte. À respecter dans toute future copy.**
- **CI de prospection hebdomadaire (branche `prospection-v1`, GO utilisateur avec amendements)** : nouveau pipeline `scripts/prospection/` (Node, package scripts) + routes Next `/api/unsubscribe` et `/api/webhooks/resend`. Détails complets : `scripts/prospection/README.md`. Points clés :
  - Interdits permanents actés : pas de réécriture d'historique Git ni push forcé sans nouvelle autorisation ; `SEND_ENABLED=false` tant que la procédure d'activation du README n'est pas déroulée ; aucun envoi réel effectué pendant le développement.
  - Lot 0 : `daily-outreach` désactivé (`disabled_manually`, YAML intact), `contacted.json` retiré du HEAD (`git rm --cached`) + ignoré, copie locale `~/rayan-studio-archives/contacted-20260809.json` (SHA vérifié). Audit : seul fichier à PII prospects. Nettoyage de l'HISTORIQUE Git : plan présenté, non exécuté, autorisation dédiée requise.
  - Règle CLAUDE.md amendée par l'utilisateur : LLM autorisé uniquement sur données publiques minimisées (signaux structurés, courts extraits nettoyés, offre, URLs de preuve) — jamais email/nom de personne/adresse/ID prospect/page intégrale ; le nom d'entreprise lui-même reste local via placeholder. Provider OpenAI, modèle via `OPENAI_MODEL` obligatoire.
  - Garanties construites et testées (115 tests, service Postgres en CI pour les migrations) : identité multi-clés `business_identity_keys` avec fusion incertaine = fail closed ; suppression durable HMAC only ; dry-run = brouillons `DRAFT` jamais bloquants (index unique partiel sur les messages réels) ; envoi exactement-une-fois (réservation atomique, clé Resend stable réutilisée sur timeout, `POSSIBLY_SENT` terminal bloquant) ; SSRF guard complet IPv4/IPv6 avec re-validation par redirection ; robots.txt respecté ; désinscription GET=confirmation POST=effectif + one-click RFC 8058, jetons signés durables à secret dédié ; webhooks Resend signés (Svix) et idempotents (`email_provider_events`) ; plafond 20 borné en dur ; 8 politiques pays codées toutes désactivées, activation manuelle pays par pays (FR d'abord, CH quasi-opt-in signalé, QC/MA/TN off).
  - Workflow `weekly-prospection.yml` : mardi 09:17 Europe/Paris, dispatch avec dry_run défaut true, `SEND_ENABLED`/`ENABLED_COUNTRIES` = variables de dépôt jamais des inputs. Rapports agrégés sans PII.
  - Review externe round 1 (REQUEST CHANGES) : 3 bloquants confirmés et corrigés (commit 39e22c1) — prospects consommés par le dry-run (sélection ENRICHED + réutilisation d'audits <14j), email rattachable à la mauvaise entreprise (upsertContactSafely + trigger SQL migration 002), association Brave non vérifiée (verifyWebsiteMatch nom+ancrage local, sinon pas d'association ; display_name ajouté). Importants corrigés : source_url exacte du contact, course webhook (processed_at + réconciliation), reprise RESERVED (même clé, fenêtre 24h), timeout/backoff réels, critères refonte assainis (newestCopyrightYear, CMS non déclencheur), top-20 par confiance, Création Express hors V1 + Playwright reporté (documenté honnêtement), clamp fail-closed 0, pool concurrence 4, extraits sans adresse/CP/tél, corps 70-135 mots. Non traité assumé : épinglage IP anti-DNS-rebinding (mitigation partielle documentée). 120 tests.
  - Actions restantes côté utilisateur : passer le repo en privé ; créer Neon + secrets/vars GitHub et Vercel ; sous-domaine `outreach.rayanstudios.com` (SPF/DKIM, DMARC p=none puis durcir) ; exécuter l'import legacy ; dérouler la procédure d'activation du README ; autorisation dédiée pour le nettoyage d'historique.
- **Décision commerciale utilisateur (conseil d'un ami, contre ma recommandation documentée) : retirer tous les prix affichés, accent sur devis gratuit sous 24h.** Branche `prix-sur-devis` : les 3 offres et la maintenance passent en « Devis gratuit sous 24h » / « Sur devis, selon le périmètre » ; libellé « Tarifs » -> « Offres » (nav + eyebrow) ; bloc commun -> « Devis gratuit, écrit et sans engagement, envoyé sous 24h » ; page SEO coût : fourchettes 700/1200 EUR remplacées par des formulations qualitatives, FAQ vitrine réorientée devis 24h ; CTA « Voir les tarifs » -> « Voir les offres ». `priceRange: "€€"` conservé dans le JSON-LD. L'ancre `#tarifs` et le slug de la page coût inchangés (pas de casse d'URLs). Si les leads chutent, la recommandation inverse (ré-afficher des planchers, éventuellement relevés à 790/1490) est documentée ci-dessus.

### 2026-08-04

- Alignement de l'outillage Claude Code sur le projet `goodcall`: ajout de `.claude/settings.json` (10 types de hooks, statusline, env `CLAUDE_FLOW_*`), `.claude/loop-engineering.md`, `.mcp.json` (serveur MCP `ruflo`), `.codex/hooks.json`, fusion de `.codex/config.toml` (shell environment policy + `mcp_servers.ruflo`), mise a jour de 10 helpers dans `.claude/helpers/` dont `ruflo-hook.cjs` qui etait absent, et ajout de 10 skills `source-command-agents-*` dans `.agents/skills/`. Les agents mobile-UX de goodcall, `.superpowers/` et `.stitch/` n'ont pas ete repris car specifiques a ce projet.
- Creation de `CLAUDE.md` a la racine: brief permanent d'invariants (produit, stack, sources de verite, commandes, acquis SEO/contact/tracking a ne pas casser, env vars, regles acquisition, regles de travail sur le worktree). Il pointe vers ce fichier pour le detail et l'historique.
- Correction d'une erreur de ce fichier: le honeypot du formulaire de contact est `companyWebsite` (`src/app/api/contact/route.ts:64`), pas `website`. `siteUrl` est un vrai champ visible optionnel. La liste des champs formulaire a ete completee avec les noms reels et le caractere requis/optionnel.
- Verification: `cd scripts && npm test` OK (40 tests, 0 echec), tous les JSON de config valides (`settings.json`, `.mcp.json`, `.codex/hooks.json`, `settings.local.json`), tous les chemins `helpers/*` references par les hooks existent, `statusline.cjs` et `hook-handler.cjs` s'executent en exit 0. Sauvegarde de l'ancienne config dans le scratchpad de session avant ecrasement.
- P0 credibilite: suppression des resultats chiffres inventes. L'utilisateur a confirme que les chiffres etaient faux. Il y en avait **7**, pas 3: `kpiBySector` dans `src/app/site/[sector]/[city]/page.tsx` donnait un chiffre par secteur (restaurant +28%, cafe +24 messages, hotel +41%, boulangerie +26%, patisserie +29%, bar +23%, commerce-local +25%), affiche sur les 70 pages locales sous le label **"Resultat observe"** (`LocalSeoLanding.tsx`). Le meme chiffre apparaissait donc sur les 10 villes d'un meme secteur.
- Correction appliquee: `kpiBySector` -> `objectiveBySector` avec des objectifs sans chiffre; label "Resultat observe" -> "Priorite secteur"; cle de donnees `kpi`/`proof` renommee en `objective` dans `local-seo-content.js` et `.d.ts` (renommage volontaire pour empecher qu'un chiffre soit reinjecte plus tard sous un label "preuve"). Section "Preuves" de `a-propos-methodologie-preuves` remplacee par "Ce que je mesure apres une refonte" (baseline avant lancement, actions suivies, Search Console sur la propriete du client, point a 30 jours). Ligne defensive "mur de faux portraits" retiree de `Testimonials.tsx`.
- Verification P0: `npx tsc --noEmit` exit 0; `cd scripts && npm test` 40/40; `git diff --check` OK; validation runtime de `buildLocalSeoContent` (cle `objective` presente, `proof` absente, aucun motif `+N %` / `+N messages` dans la sortie); grep de controle sans occurrence residuelle des 7 chiffres ni de la cle `kpi` dans `src/` et `scripts/`.
- `npm run build` complet non termine: tue plusieurs fois par timeout d'outil et par un lancement concurrent. Le type-check ayant ete valide separement via `tsc --noEmit`, la couverture est equivalente pour ce chantier, mais un `npm run build` de bout en bout reste a lancer avant deploiement.
- Reste a faire (P1 SEO technique, non commence): `<html lang="fr">` en dur dans `layout.tsx:123` sert du `lang=fr` sur `/en`; `openGraph.locale: "fr_FR"` global jamais surcharge par locale; badge "Refonte" en dur `Hero.tsx:155`; aria-label "Ouvrir le menu" non localise `Navbar.tsx:111`; `canonical: "/"` sur une URL de simple redirection; pas de `x-default`; `LocalBusiness` sans adresse physique (`addressCountry` seul) a remplacer par `ProfessionalService`; `NEXT_PUBLIC_SITE_URL` doit passer en `https://www.rayanstudios.com` **cote hebergeur** (la prod sert www, toutes les URLs derivees pointent vers le non-www).
- Hygiene repo constatee: `out/` contient trois copies (`_next/`, `_next 2/`, `_next 3/`, doublons Finder) et n'est pas exclu d'ESLint, d'ou 2 erreurs `react/no-find-dom-node` dans du vendor minifie sans rapport avec le code source.
- Non verifie: les hooks `.claude/settings.json` et le serveur MCP `ruflo` ne sont pas encore actifs dans cette session — ils ne se chargent qu'au demarrage de Claude Code, donc leur comportement reel reste a confirmer apres redemarrage. Aucun `npm run build` ni `npm run lint` lance: cette session n'a touche aucun fichier de `src/`.
