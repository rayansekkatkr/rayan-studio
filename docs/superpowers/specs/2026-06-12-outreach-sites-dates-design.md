# Outreach Sites Dates Design

## Objectif

Ameliorer le workflow d'outreach pour viser d'abord les petites entreprises avec un site existant mais probablement date. Le but est de demarrer avec une cible automatisable: Google Places fournit le site, le script extrait l'email, puis l'email propose un diagnostic de refonte clair.

Depuis la v3, la recherche n'est plus limitee a une ville par jour. Le script lance plusieurs recherches nationales de type `restaurant France`, `boulangerie France`, etc., puis extrait davantage d'emails dans le rapport tout en gardant une limite d'envoi separee.

Depuis la v4, la recherche ne s'arrete plus a la France. Elle couvre des marches francophones et anglophones, avec categories traduites et email FR/EN selon la langue du marche.

## Approche Validee

Priorite 1: sites dates avec email trouvable.

Cette approche est choisie car elle permet:

- d'envoyer rapidement des emails plus pertinents;
- de rester proche de la nouvelle promesse du site Rayan Studio;
- d'eviter de forcer l'automatisation sur les entreprises sans site, souvent plus difficiles a contacter proprement.

## Changements Fonctionnels

- Ajouter un mode `DRY_RUN` pour tester sans envoyer d'email.
- Ajouter un scoring simple de prospects selon la presence d'un site, d'un email, d'un telephone et d'une adresse.
- Ajouter un rapport de campagne quotidien dans `scripts/outreach-report.json`.
- Recentrer l'email sur le diagnostic de site date, la clarification du message, le mobile, le SEO local, DNS et deploiement.
- Ne pas inscrire un prospect dans `contacted.json` quand le mode dry-run est actif.
- Remplacer la rotation `categorie + ville` par une extraction nationale multi-categories.
- Separer le volume d'extraction (`MAX_EMAILS_TO_EXTRACT`, `MAX_PLACES_TO_SCAN`) du volume d'envoi (`MAX_EMAILS_PER_DAY`).
- Ajouter des marches francophones: France, Belgique francophone, Suisse romande, Luxembourg, Quebec.
- Ajouter des marches anglophones: United Kingdom, Ireland, United States, Canada, Australia, New Zealand.
- Envoyer un message francais pour les marches francophones et un message anglais pour les marches anglophones.

## Limites Volontaires

- Pas encore de prospection "sans site" automatisee.
- Pas de CRM ni dashboard.
- Pas d'IA de personnalisation profonde a ce stade.
- Pas de modification des secrets GitHub Actions.
- Pas d'envoi massif illimite: l'extraction peut augmenter, mais l'envoi reste plafonne pour proteger la delivrabilite.
- Les recherches internationales augmentent les enjeux de delivrabilite et de conformite. Garder `DRY_RUN=true` au debut et valider les rapports avant envoi.

## Verification

- `node --check scripts/outreach.js`
- `npm test` depuis `scripts/`
- `DRY_RUN=true MAX_EMAILS_PER_DAY=1 node scripts/outreach.js` si les secrets Google sont disponibles.
- `npm run lint`
- `npm run build`
