import type { InsightRecord } from "./types";

export const projectBriefTemplate: InsightRecord = {
  key: "project-brief-template",
  category: "templates",
  slug: { fr: "template-cahier-des-charges-digital", en: "digital-project-brief-template" },
  title: {
    fr: "Template de cahier des charges digital",
    en: "Digital project brief template",
  },
  description: {
    fr: "Une trame en neuf sections pour décrire un projet digital utilement : problème, utilisateurs, workflow, périmètre, contraintes et critères de réussite.",
    en: "A nine-section template to describe a digital project usefully: problem, users, workflow, scope, constraints and success criteria.",
  },
  publishedAt: "2026-08-12",
  relatedService: "mvp",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "Un bon cahier des charges n'est pas un document de cent pages : c'est une trame qui force à répondre aux questions qui fâchent avant le développement. Copiez ces neuf sections et remplissez-les honnêtement, y compris avec des « on ne sait pas encore ».",
      },
      { type: "heading", level: 2, text: "1. Le problème" },
      {
        type: "paragraph",
        text: "Décrivez le problème en quelques phrases, sans mentionner de solution. Qui le subit, à quelle fréquence, et qu'est-ce que ça coûte aujourd'hui en temps ou en argent ?",
      },
      { type: "heading", level: 2, text: "2. Les utilisateurs" },
      {
        type: "paragraph",
        text: "Listez chaque type d'utilisateur et ce qu'il vient faire. Précisez qui utilise l'outil tous les jours et qui ne s'y connecte qu'occasionnellement.",
      },
      { type: "heading", level: 2, text: "3. Le processus actuel" },
      {
        type: "paragraph",
        text: "Comment le travail se fait aujourd'hui : outils, fichiers, échanges, ressaisies. C'est la base de comparaison pour juger si le futur produit améliore vraiment les choses.",
      },
      { type: "heading", level: 2, text: "4. Le workflow souhaité" },
      {
        type: "paragraph",
        text: "Racontez le parcours idéal étape par étape, du déclencheur au résultat. Un paragraphe par étape suffit ; s'il en faut dix, le périmètre est sans doute trop large.",
      },
      { type: "heading", level: 2, text: "5. Le périmètre indispensable" },
      {
        type: "list",
        items: [
          "Les fonctionnalités sans lesquelles le produit ne sert à rien.",
          "Ce qui est explicitement reporté à plus tard.",
          "Ce qui restera manuel volontairement.",
        ],
      },
      { type: "heading", level: 2, text: "6. Les intégrations" },
      {
        type: "paragraph",
        text: "Les outils existants auxquels le produit doit se connecter : paiement, comptabilité, email, calendrier. Précisez lesquels sont bloquants dès le départ.",
      },
      { type: "heading", level: 2, text: "7. Les contraintes" },
      {
        type: "paragraph",
        text: "Hébergement imposé, données sensibles, réglementation, budget, compatibilités. Une contrainte connue tôt est un choix d'architecture ; découverte tard, c'est une réécriture.",
      },
      { type: "heading", level: 2, text: "8. Le timing" },
      {
        type: "paragraph",
        text: "Y a-t-il une échéance réelle (salon, saison, fin de contrat d'un outil actuel) ou une simple préférence ? Les deux se gèrent, mais pas de la même façon.",
      },
      { type: "heading", level: 2, text: "9. La définition du succès" },
      {
        type: "paragraph",
        text: "À quoi verrez-vous que le projet est réussi trois mois après la mise en ligne ? Utilisateurs actifs, demandes traitées, temps économisé : choisissez des signaux observables.",
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "A good project brief is not a hundred-page document: it is a template that forces the hard questions before development. Copy these nine sections and fill them honestly, including with we do not know yet.",
      },
      { type: "heading", level: 2, text: "1. The problem" },
      {
        type: "paragraph",
        text: "Describe the problem in a few sentences, without mentioning a solution. Who suffers from it, how often, and what does it cost today in time or money?",
      },
      { type: "heading", level: 2, text: "2. The users" },
      {
        type: "paragraph",
        text: "List each type of user and what they come to do. Specify who uses the tool daily and who only connects occasionally.",
      },
      { type: "heading", level: 2, text: "3. The current process" },
      {
        type: "paragraph",
        text: "How the work is done today: tools, files, exchanges, re-entry. This is the baseline for judging whether the future product really improves things.",
      },
      { type: "heading", level: 2, text: "4. The desired workflow" },
      {
        type: "paragraph",
        text: "Tell the ideal journey step by step, from trigger to outcome. One paragraph per step is enough; if you need ten, the scope is probably too wide.",
      },
      { type: "heading", level: 2, text: "5. The must-have scope" },
      {
        type: "list",
        items: [
          "The features without which the product is useless.",
          "What is explicitly postponed.",
          "What will deliberately stay manual.",
        ],
      },
      { type: "heading", level: 2, text: "6. The integrations" },
      {
        type: "paragraph",
        text: "The existing tools the product must connect to: payment, accounting, email, calendar. Specify which ones are blocking from day one.",
      },
      { type: "heading", level: 2, text: "7. The constraints" },
      {
        type: "paragraph",
        text: "Imposed hosting, sensitive data, regulation, budget, compatibilities. A constraint known early is an architecture choice; discovered late, it is a rewrite.",
      },
      { type: "heading", level: 2, text: "8. The timing" },
      {
        type: "paragraph",
        text: "Is there a real deadline (trade show, season, end of a current tool's contract) or a simple preference? Both can be managed, but not the same way.",
      },
      { type: "heading", level: 2, text: "9. The definition of success" },
      {
        type: "paragraph",
        text: "How will you know the project succeeded three months after launch? Active users, handled requests, time saved: choose observable signals.",
      },
    ],
  },
};
