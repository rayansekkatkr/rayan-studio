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

- Prenom.
- Besoin principal: creation, refonte, pas encore sur.
- Type de commerce.
- Email.
- Message.
- Honeypot `website`.

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
