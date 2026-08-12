import type { InsightRecord } from "./types";

export const applicationLaunchChecklist: InsightRecord = {
  key: "application-launch-checklist",
  category: "checklists",
  slug: { fr: "checklist-lancement-application", en: "application-launch-checklist" },
  title: {
    fr: "Checklist avant le lancement d'une application",
    en: "Application launch checklist",
  },
  description: {
    fr: "Les vérifications concrètes à faire avant de mettre une application en production : configuration, accès, sauvegardes, observabilité et plan de retour arrière.",
    en: "Concrete checks before shipping an application to production: configuration, access, backups, observability and rollback plan.",
  },
  publishedAt: "2026-08-12",
  relatedService: "devops",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "La veille d'un lancement, la question n'est pas « est-ce que tout marche ? » mais « que se passe-t-il quand quelque chose casse ? ». Cette checklist couvre les points qui font la différence entre un incident géré et une nuit blanche.",
      },
      { type: "heading", level: 2, text: "Environnements et configuration" },
      {
        type: "checklist",
        items: [
          "Production, préproduction et développement sont séparés, avec des secrets distincts.",
          "Aucune clé ou secret n'est présent dans le code ou l'historique git.",
          "Les variables d'environnement de production sont documentées et sauvegardées.",
          "Le domaine, les DNS et le certificat SSL sont vérifiés et renouvelables.",
        ],
      },
      { type: "heading", level: 2, text: "Authentification et permissions" },
      {
        type: "checklist",
        items: [
          "Chaque rôle a été testé avec un compte réel de ce rôle, pas seulement en admin.",
          "Les parcours de récupération de mot de passe et d'invitation fonctionnent.",
          "Les routes d'administration sont inaccessibles sans le bon rôle.",
        ],
      },
      { type: "heading", level: 2, text: "Sauvegardes" },
      {
        type: "checklist",
        items: [
          "Les sauvegardes de la base sont automatiques et datées.",
          "Une restauration complète a été testée au moins une fois, pas seulement configurée.",
          "Les fichiers utilisateurs (uploads) sont couverts, pas uniquement la base.",
        ],
      },
      { type: "heading", level: 2, text: "Observabilité et états d'erreur" },
      {
        type: "checklist",
        items: [
          "Les erreurs serveur sont journalisées avec assez de contexte pour diagnostiquer.",
          "Une alerte prévient quelqu'un quand le site ou l'API tombe.",
          "Les pages d'erreur utilisateur sont propres : pas de stack trace, un chemin de sortie.",
          "Les états vides et les échecs de paiement affichent un message utile.",
        ],
      },
      { type: "heading", level: 2, text: "Analytics, consentement et SEO" },
      {
        type: "checklist",
        items: [
          "La mesure d'audience respecte le consentement et ne se charge pas avant accord.",
          "Les pages publiques ont titre, description et balises sociales corrects.",
          "Le sitemap et robots.txt reflètent les vraies pages publiques.",
        ],
      },
      { type: "heading", level: 2, text: "Retour arrière et responsabilités" },
      {
        type: "checklist",
        items: [
          "Un déploiement peut être annulé rapidement, et la procédure est écrite.",
          "Une personne précise est responsable du support au lancement, avec un canal connu.",
          "Les accès critiques (hébergeur, DNS, base) sont détenus par plus d'une personne.",
        ],
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "The night before a launch, the question is not does everything work, but what happens when something breaks. This checklist covers the points that separate a managed incident from a sleepless night.",
      },
      { type: "heading", level: 2, text: "Environments and configuration" },
      {
        type: "checklist",
        items: [
          "Production, staging and development are separated, with distinct secrets.",
          "No key or secret lives in the code or the git history.",
          "Production environment variables are documented and backed up.",
          "Domain, DNS and SSL certificate are verified and renewable.",
        ],
      },
      { type: "heading", level: 2, text: "Authentication and permissions" },
      {
        type: "checklist",
        items: [
          "Every role was tested with a real account of that role, not only as admin.",
          "Password recovery and invitation journeys work.",
          "Admin routes are unreachable without the right role.",
        ],
      },
      { type: "heading", level: 2, text: "Backups" },
      {
        type: "checklist",
        items: [
          "Database backups are automatic and dated.",
          "A full restore was tested at least once, not just configured.",
          "User files (uploads) are covered, not only the database.",
        ],
      },
      { type: "heading", level: 2, text: "Observability and error states" },
      {
        type: "checklist",
        items: [
          "Server errors are logged with enough context to diagnose.",
          "An alert reaches someone when the site or API goes down.",
          "User-facing error pages are clean: no stack trace, a way out.",
          "Empty states and payment failures show a useful message.",
        ],
      },
      { type: "heading", level: 2, text: "Analytics, consent and SEO" },
      {
        type: "checklist",
        items: [
          "Audience measurement respects consent and does not load before agreement.",
          "Public pages have correct titles, descriptions and social tags.",
          "Sitemap and robots.txt reflect the real public pages.",
        ],
      },
      { type: "heading", level: 2, text: "Rollback and ownership" },
      {
        type: "checklist",
        items: [
          "A deployment can be reverted quickly, and the procedure is written down.",
          "A specific person owns launch support, with a known channel.",
          "Critical access (hosting, DNS, database) is held by more than one person.",
        ],
      },
    ],
  },
};
