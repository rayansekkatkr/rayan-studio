# Prospection hebdomadaire — Rayan Studios

Pipeline B2B faible volume : découverte (SIRENE + Brave), audit de sites
(protégé SSRF), qualification LLM à données minimisées, envoi Resend
« exactement une fois », désinscription et webhooks hébergés dans le site
Next. Maximum 20 emails/semaine, fail closed partout.

## Architecture

```
run.js (hebdo, GitHub Actions)
  ├─ providers/sirene.js      découverte France (officiel, 30 req/min)
  ├─ providers/brave.js       site officiel (URL seule, rien d'autre persisté)
  ├─ ingest.js                identité multi-clés, conflit = fail closed
  ├─ crawl.js + ssrf-guard.js audit 3 pages max, robots.txt, signaux datés
  ├─ qualify.js               LLM OpenAI : signaux structurés uniquement,
  │                           jamais d'email/nom/adresse/ID, placeholders
  └─ send.js                  garde-fous cumulatifs, outbox atomique,
                              idempotence Resend, POSSIBLY_SENT terminal
src/app/api/unsubscribe       GET = confirmation, POST = effectif (RFC 8058)
src/app/api/webhooks/resend   signature Svix, événements idempotents
```

Base : Neon PostgreSQL (source de vérité durable). Migrations :
`npm run prospection:migrate`.

## Secrets et variables

Secrets GitHub (jamais dans le dépôt ni les logs) :

| Secret | Rôle |
|---|---|
| `PROSPECTION_DATABASE_URL` | Neon, endpoint direct (Actions) — le site Vercel utilise l'endpoint **pooled** |
| `SUPPRESSION_HMAC_SECRET` | Empreintes de suppression (≥16 caractères) |
| `UNSUBSCRIBE_TOKEN_SECRET` | Jetons de désinscription — **distinct** du précédent |
| `SIRENE_API_KEY` | portail-api.insee.fr |
| `BRAVE_SEARCH_API_KEY` | Brave Search |
| `OPENAI_API_KEY` | Qualification |
| `RESEND_API_KEY` | Envoi |
| `RESEND_WEBHOOK_SECRET` | Signature Svix du webhook |

Variables GitHub (`vars`, non secrètes) :

| Variable | Valeur initiale |
|---|---|
| `OPENAI_MODEL` | modèle économique compatible sorties JSON — jamais codé en dur |
| `RESEND_FROM` | `Rayan — Rayan Studios <rayan@outreach.rayanstudios.com>` |
| `RESEND_REPLY_TO` | `rayan.sekkat@gmail.com` |
| `SEND_ENABLED` | `false` (défaut obligatoire) |
| `SEND_DNS_VERIFIED` | `false` tant que SPF/DKIM/DMARC non confirmés |
| `ENABLED_COUNTRIES` | vide au départ, puis `FR`, etc. |

Côté Vercel (routes) : `DATABASE_URL` (pooled), `SUPPRESSION_HMAC_SECRET`,
`UNSUBSCRIBE_TOKEN_SECRET`, `RESEND_WEBHOOK_SECRET`.

## Import du legacy (une fois, avant toute activation)

```bash
cd scripts
DATABASE_URL=... SUPPRESSION_HMAC_SECRET=... node prospection/import-legacy.js
# Attendu : ~562 emails + ~553 domaines insérés en HMAC (reason legacy_import)
```

Le fichier `contacted.json` reste local (copie de sûreté :
`~/rayan-studio-archives/`). Ne jamais le recommiter.

## Dry run

```bash
cd scripts
DRY_RUN=true DATABASE_URL=... SUPPRESSION_HMAC_SECRET=... \
UNSUBSCRIBE_TOKEN_SECRET=... SIRENE_API_KEY=... BRAVE_SEARCH_API_KEY=... \
OPENAI_API_KEY=... OPENAI_MODEL=... node prospection/run.js
```

Le dry run découvre, audite, qualifie et écrit des brouillons `DRAFT`
(`dry_run=true`) qui **ne bloquent jamais** un envoi réel futur. Aucun
appel Resend. Le rapport de sortie ne contient que des agrégats.

## DNS avant tout envoi réel (`outreach.rayanstudios.com`)

1. Ajouter le domaine `outreach.rayanstudios.com` dans Resend.
2. Poser les enregistrements fournis : SPF (TXT) et DKIM (3 CNAME/TXT).
3. DMARC : suivre la recommandation Resend en vigueur — démarrer en
   `p=none; rua=mailto:...` pour observer les rapports pendant la phase de
   validation, puis durcir vers `p=quarantine` une fois SPF, DKIM et
   l'alignement confirmés sur plusieurs envois.
4. Vérifier le statut « verified » dans Resend, puis seulement
   `SEND_DNS_VERIFIED=true`.

## Procédure d'activation (dans cet ordre, jamais autrement)

1. Import legacy exécuté et vérifié (comptes attendus).
2. Deux dry runs complets : le second ne produit aucun nouveau brouillon
   pour les mêmes entreprises (preuve de déduplication).
3. Webhook Resend configuré vers
   `https://www.rayanstudios.com/api/webhooks/resend` + test de signature.
4. Test manuel de `/api/unsubscribe` (GET = page, POST = suppression).
5. DNS validés (ci-dessus) → `SEND_DNS_VERIFIED=true`.
6. Checklist pays France documentée et validée → en base :
   `UPDATE country_policies SET enabled=true, policy_version='fr-v1', activated_at=now() WHERE country_code='FR';`
   et variable `ENABLED_COUNTRIES=FR`.
7. Enfin `SEND_ENABLED=true`. Premier run réel avec `MAX_SENDS=5`.

Belgique/Luxembourg/Monaco : activation individuelle, même procédure.
Suisse : régime proche opt-in (LCD art. 3) — validation dédiée obligatoire.
Québec (CASL), Maroc, Tunisie : désactivés, travaux dédiés requis.

## Arrêt d'urgence

- Immédiat : variable GitHub `SEND_ENABLED=false` (bloque tout envoi même
  si le workflow tourne déjà au prochain garde-fou).
- Total : `gh workflow disable weekly-prospection.yml`.
- Un prospect signale un problème : l'ajouter à `suppression_list`
  (reason `manual`) via HMAC de son email/domaine.

## Rétention des données (base privée Neon)

| Donnée | Durée | Nettoyage |
|---|---|---|
| Extraits/audits (`website_audits`) | 12 mois | purge trimestrielle |
| Contacts jamais sollicités | 6 mois après découverte | purge trimestrielle |
| Brouillons dry-run | 3 mois | purge trimestrielle |
| Messages envoyés (`outreach_messages`) | 24 mois (preuve de conformité) | purge annuelle |
| Événements Resend | 12 mois | purge trimestrielle |
| `suppression_list` (HMAC) | illimitée — c'est sa fonction | jamais |

## Garanties de test

`npm test` (scripts/) : 115 tests dont identité multi-sources, dédup
legacy, SSRF (IPv4/IPv6/redirections), minimisation LLM, injection,
réservation atomique, retry même clé, POSSIBLY_SENT, signatures webhook.
En CI, un service Postgres exécute aussi la migration base vide/existante.
