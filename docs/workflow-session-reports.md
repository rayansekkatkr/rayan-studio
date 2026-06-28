# Rapports de session des workflows

Chaque workflow d'acquisition ecrit un rapport de session a la fin du run.

## Fichiers generes

```text
scripts/workflow-session-reports/daily-outreach-latest.md
scripts/workflow-session-reports/daily-outreach-latest.json
scripts/workflow-session-reports/freelance-opportunities-latest.md
scripts/workflow-session-reports/freelance-opportunities-latest.json
```

Les fichiers `.md` sont faits pour lecture rapide. Les fichiers `.json` gardent les memes informations de maniere exploitable.

## Contenu

Chaque rapport contient:

- nom du workflow;
- statut de la session;
- event GitHub Actions;
- branche, commit, acteur et lien du run;
- statut du rapport metier;
- nombre de sources/recherches;
- nombre de fiches/offres scannees;
- nombre de candidates;
- nombre d'emails envoyes/prepares;
- erreurs principales.

## Comportement en cas d'erreur

L'etape de rapport utilise `if: always()`.

Si la recherche d'opportunites ou l'outreach email echoue, le workflow essaie quand meme d'ecrire un rapport de session avec le statut et les erreurs disponibles.

Les workflows commitent automatiquement le dossier:

```text
scripts/workflow-session-reports/
```
