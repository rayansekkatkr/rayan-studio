import type { InsightRecord } from "./types";

export const mvpV1: InsightRecord = {
  key: "mvp-v1",
  category: "guides",
  slug: { fr: "mvp-fonctionnalites-v1", en: "mvp-v1-features" },
  title: {
    fr: "MVP : quelles fonctionnalités garder pour la V1 ?",
    en: "MVP: which features belong in V1?",
  },
  description: {
    fr: "Une méthode simple pour trancher ce qui entre dans la première version d'un produit et ce qui attend, sans sacrifier l'exploitabilité.",
    en: "A simple method to decide what goes into a product's first version and what waits, without sacrificing operability.",
  },
  publishedAt: "2026-08-12",
  relatedService: "mvp",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "La plupart des MVP échouent par excès : trop de fonctionnalités, trop de cas particuliers, trop de mois avant la mise en ligne. La bonne question n'est pas « que peut-on construire ? » mais « quel comportement unique prouve que le produit vaut quelque chose ? ».",
      },
      { type: "heading", level: 2, text: "Définir le comportement qui prouve la valeur" },
      {
        type: "paragraph",
        text: "Identifiez l'action que l'utilisateur doit réussir pour que le produit ait servi à quelque chose : réserver, commander, générer, pronostiquer. La V1 est le chemin le plus court vers cette action. Tout le reste se juge par rapport à elle.",
      },
      { type: "heading", level: 2, text: "Séparer le parcours indispensable du confort" },
      {
        type: "list",
        items: [
          "Indispensable : sans cette étape, l'action principale échoue.",
          "Confort : l'action réussit sans, mais moins agréablement.",
          "Le confort se reporte en V2, même quand il est facile à développer.",
          "Une fonctionnalité facile mais inutile reste une charge de maintenance.",
        ],
      },
      { type: "heading", level: 2, text: "Garder l'administration et le support visibles" },
      {
        type: "paragraph",
        text: "Corriger une donnée, désactiver un compte, comprendre pourquoi un envoi a échoué : ces gestes ne sont pas optionnels, même en V1. Un MVP sans outils d'exploitation transforme chaque incident en intervention dans la base de données.",
      },
      { type: "heading", level: 2, text: "Reporter les automatisations secondaires" },
      {
        type: "paragraph",
        text: "Beaucoup d'automatisations peuvent commencer en manuel : un email envoyé à la main, un rapprochement fait chaque semaine. Automatisez quand le volume le justifie, pas avant. Le manuel assumé est un choix de V1 parfaitement valide.",
      },
      { type: "heading", level: 2, text: "Fixer un critère de sortie de V1" },
      {
        type: "paragraph",
        text: "Décidez avant le lancement ce qui déclenchera la suite : un seuil d'usage, un retour récurrent, un segment qui paie. Sans critère explicite, la V1 s'étire indéfiniment et la V2 ne commence jamais.",
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "Most MVPs fail by excess: too many features, too many edge cases, too many months before launch. The right question is not what can we build, but which single behavior proves the product is worth something.",
      },
      { type: "heading", level: 2, text: "Define the behavior that proves value" },
      {
        type: "paragraph",
        text: "Identify the action a user must complete for the product to have been useful: book, order, generate, predict. The V1 is the shortest path to that action. Everything else is judged against it.",
      },
      { type: "heading", level: 2, text: "Separate the essential workflow from convenience" },
      {
        type: "list",
        items: [
          "Essential: without this step, the core action fails.",
          "Convenience: the action succeeds without it, just less pleasantly.",
          "Convenience moves to V2, even when it is easy to build.",
          "An easy but unnecessary feature is still a maintenance burden.",
        ],
      },
      { type: "heading", level: 2, text: "Keep administration and support visible" },
      {
        type: "paragraph",
        text: "Fixing a record, deactivating an account, understanding why a delivery failed: these actions are not optional, even in V1. An MVP without operational tools turns every incident into a database intervention.",
      },
      { type: "heading", level: 2, text: "Postpone secondary automation" },
      {
        type: "paragraph",
        text: "Many automations can start manual: an email sent by hand, a weekly reconciliation. Automate when volume justifies it, not before. Deliberate manual work is a perfectly valid V1 choice.",
      },
      { type: "heading", level: 2, text: "Set a V1 exit criterion" },
      {
        type: "paragraph",
        text: "Decide before launch what will trigger the next phase: a usage threshold, a recurring request, a paying segment. Without an explicit criterion, the V1 stretches forever and the V2 never starts.",
      },
    ],
  },
};
