# Prospection plateformes freelance

Ce module transforme l'idee de prospection type Malt / Codeur en workflow utilisable dans le projet Rayan Studio.

## Objectif

- Reperer des missions publiques de creation/refonte de site, full-stack web, API integration, maintenance, DevOps, CI/CD et deploiement.
- Garder uniquement les missions en teletravail, car Rayan travaille depuis la Coree du Sud.
- Scorer les opportunites selon leur proximite avec l'offre Rayan Studio.
- Generer un brouillon de reponse manuelle avec lien portfolio.
- Eviter l'envoi automatique sur les plateformes: la reponse doit rester relue, adaptee et envoyee a la main.

## Commande locale

Depuis `scripts/`:

```bash
npm run opportunities
```

Sans configuration, le script cherche automatiquement sur un catalogue de plateformes publiques:

- Codeur
- 404Works
- Freelancer
- PeoplePerHour
- RemoteOK

Upwork et We Work Remotely restent disponibles si tu les forces via `FREELANCE_PLATFORMS=upwork,weworkremotely`, mais ils ne sont pas dans le catalogue automatique car leurs pages publiques renvoient souvent HTTP 403 dans GitHub Actions.

Il utilise des recherches autour de ton profil full-stack / DevOps:

- remote full-stack web developer;
- remote DevOps deployment;
- remote API integration;
- remote Docker / Kubernetes deployment;
- teletravail developpeur full-stack;
- remote Next.js / React / Node;
- remote website maintenance;
- remote website redesign;
- remote SaaS admin dashboard;
- remote CI/CD pipeline;
- remote VPS / cloud deployment;
- refonte, maintenance et creation de site.

## Filtre teletravail uniquement

Par defaut, le script applique `FREELANCE_REQUIRE_REMOTE=true`.

Une mission est gardee seulement si:

- la mission mentionne explicitement `remote`, `fully remote`, `teletravail`, `a distance`, `distanciel`, etc.;
- ou elle vient d'une plateforme garantie remote-only comme RemoteOK, ou We Work Remotely si tu la forces manuellement;
- et elle ne mentionne pas `sur site`, `presentiel`, `hybride`, `on-site`, `in office`, `local candidates` ou `relocation`.

Les missions sans mention claire de teletravail sont exclues du rapport. Une simple page de recherche contenant le mot `remote` ne suffit pas si la mission elle-meme ne le confirme pas. Le JSON expose `remotePolicy`, `remoteRejectedCount`, `remoteStatus`, `remoteReason` et `remoteOnly` pour comprendre ce qui a ete garde ou rejete.

Le rapport est ecrit dans:

```text
scripts/freelance-opportunities-report.json
```

Chaque candidat contient:

- `score` et `fit`
- les raisons de scoring
- `remoteOnly`, `remoteStatus` et `remoteReason`
- l'URL de la mission
- `proposalDraft`, humanise automatiquement, a coller puis personnaliser dans la plateforme

## Extraction email / telephone des offres

Une deuxieme commande peut scanner les pages d'offres retenues pour chercher des emails ou numeros de telephone publics:

```bash
npm run freelance:contacts
```

Elle lit:

```text
scripts/freelance-valid-offers.json
```

Puis elle ecrit:

```text
scripts/freelance-contact-queue.json
scripts/freelance-contact-queue.md
```

Le script extrait:

- les emails visibles dans le HTML ou les liens `mailto:`;
- les numeros internationaux visibles au format `+...`;
- un message email humanise en anglais pour les plateformes anglophones.

Par securite, l'envoi automatique est desactive par defaut. Chaque contact email sort avec `status: "needs_approval"` et `approved: false`.

Pour envoyer reellement, il faut volontairement:

1. relire le contact;
2. passer `approved` a `true` pour ce contact dans `scripts/freelance-contact-queue.json`;
3. lancer avec `FREELANCE_CONTACT_SEND_APPROVED=true`;
4. fournir `GMAIL_USER` et `GMAIL_APP_PASSWORD`.

Si aucune adresse email publique n'est trouvee, aucun email n'est envoye.

## Humanizer

Les brouillons passent par `scripts/message-humanizer.js` avant d'etre ecrits dans le rapport.

Le humanizer:

- retire les tournures trop marketing ou trop "agence";
- garde les faits utiles: nom, URL, lien portfolio, sortie/desabonnement;
- produit du texte simple, court, relisible avant envoi;
- sert aussi aux emails froids dans `scripts/outreach.js`.

## Sources possibles

Le mode recommande est le mode automatique sans variable. Les options ci-dessous servent seulement a reduire ou remplacer la recherche.

Option 1: limiter les plateformes.

```bash
FREELANCE_PLATFORMS="codeur,404works,freelancer" npm run opportunities
```

Option 2: changer les mots-cles generes.

```bash
FREELANCE_SEARCH_QUERIES="refonte site internet,maintenance wordpress,deploiement site web" npm run opportunities
```

Option 3: URLs publiques precises via variable d'environnement.

```bash
FREELANCE_SEARCH_URLS="https://plateforme.example/recherche/refonte-site
https://plateforme.example/recherche/site-vitrine"
```

Option 4: fichier JSON si une plateforme demande une connexion ou rend mal le HTML public.

```json
{
  "sources": [
    {
      "name": "Malt recherche refonte",
      "htmlPath": "../tmp/malt-refonte.html"
    },
    {
      "name": "Codeur creation site",
      "url": "https://plateforme.example/projects/site-vitrine"
    }
  ]
}
```

Puis:

```bash
FREELANCE_SOURCE_FILE=../tmp/freelance-sources.json npm run opportunities
```

## GitHub Action

Le workflow `.github/workflows/freelance-opportunities.yml` peut etre lance manuellement sans URL.

Le cron tourne du lundi au vendredi a 08:00 UTC et cherche automatiquement sur le catalogue par defaut. La variable `FREELANCE_REQUIRE_REMOTE` est forcee a `true` dans le workflow. Les variables GitHub `FREELANCE_PLATFORMS` et `FREELANCE_SEARCH_QUERIES` servent seulement a ajuster le catalogue sans modifier le code.

## Regles de qualite

- Ne pas spammer: le module produit des brouillons, pas des messages automatiques.
- Garder le message court et concret.
- Toujours relire la mission avant de repondre.
- Ne jamais repondre a une mission sur place ou hybride: uniquement teletravail.
- Prioriser les demandes qui correspondent au CV: full-stack web, plateformes SaaS/admin, API, paiements, Docker, CI/CD, VPS/cloud, maintenance, deploiement, refonte et SEO local.
- Ignorer les demandes uniquement logo, social media ou community management.
- Utiliser le portfolio comme preuve, puis proposer une lecture rapide du besoin avant devis.
