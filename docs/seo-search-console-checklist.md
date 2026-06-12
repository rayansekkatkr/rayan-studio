# SEO Search Console Checklist

Derniere mise a jour: 2026-06-13

Objectif: rendre le SEO mesurable apres deploiement, verifier que Google peut crawler le site, puis suivre les pages qui commencent a recevoir des impressions.

## 1. Verification Google Search Console

1. Aller dans Google Search Console.
2. Ajouter une propriete pour `https://rayanstudios.com`.
3. Choisir la methode de verification par balise HTML.
4. Copier uniquement la valeur du `content`, par exemple:

```html
<meta name="google-site-verification" content="abc123" />
```

Valeur a garder: `abc123`.

5. Ajouter cette variable dans l'environnement de production:

```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abc123
```

6. Redeployer le site.
7. Verifier que la balise est presente dans le HTML:

```bash
curl -s https://rayanstudios.com/fr | grep "google-site-verification"
```

8. Retourner dans Search Console et cliquer sur verifier.

## 2. Sitemap Et Crawl

Soumettre ce sitemap dans Search Console:

```text
https://rayanstudios.com/sitemap.xml
```

Verifier aussi:

```bash
curl -I https://rayanstudios.com/robots.txt
curl -I https://rayanstudios.com/sitemap.xml
curl -s https://rayanstudios.com/robots.txt
```

Le `robots.txt` doit referencer le sitemap et ne pas bloquer les pages importantes.

## 3. Pages Prioritaires A Inspecter

Dans Search Console, utiliser "Inspection de l'URL" pour:

```text
https://rayanstudios.com/fr
https://rayanstudios.com/en
https://rayanstudios.com/fr/refonte-site-internet
https://rayanstudios.com/fr/creation-site-vitrine
https://rayanstudios.com/fr/site-internet-petite-entreprise
https://rayanstudios.com/en/website-redesign
https://rayanstudios.com/en/small-business-website
https://rayanstudios.com/site/restaurant/paris
https://rayanstudios.com/site/hotel/paris
https://rayanstudios.com/site/boulangerie/paris
```

Demander l'indexation uniquement pour les pages propres et utiles.

## 4. Requetes A Suivre

FR:

```text
refonte site internet petite entreprise
creation site vitrine petite entreprise
site internet restaurant paris
site internet hotel paris
site vitrine commerce local
freelance refonte site internet
```

EN:

```text
website redesign small business
small business website design
website redesign for local business
restaurant website redesign
```

## 5. Rythme De Suivi

- Semaine 1: verifier l'indexation des pages principales et corriger les erreurs.
- Semaine 2: regarder les premieres impressions, meme sans clics.
- Semaine 4: renforcer les pages qui ont des impressions mais un CTR faible.
- Mois 2: creer du contenu d'autorite autour des requetes qui ressortent.

## 6. Signaux A Surveiller

- Pages decouvertes mais non indexees.
- Pages indexees mais sans impressions.
- Requetes avec impressions et position 8-30.
- CTR faible sur pages avec impressions.
- Pages locales trop proches ou jugees peu utiles.

## 7. Prochaine Phase Contenu

Quand Search Console remonte des impressions, prioriser:

1. Une page cas client detaillee Pick4Me.
2. Un guide "Combien coute une refonte de site pour petite entreprise ?".
3. Un guide "Checklist avant de refaire son site".
4. Une page "Refonte site internet restaurant".
5. Une page "Website redesign for small businesses".
