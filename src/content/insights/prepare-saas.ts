import type { InsightRecord } from "./types";

export const prepareSaas: InsightRecord = {
  key: "prepare-saas",
  category: "guides",
  slug: { fr: "preparer-projet-saas", en: "prepare-saas-project" },
  title: {
    fr: "Comment préparer un projet SaaS",
    en: "How to prepare a SaaS project",
  },
  description: {
    fr: "Ce qu'il faut clarifier avant de développer un SaaS : problème, utilisateurs, périmètre V1, données, exploitation et trajectoire d'évolution.",
    en: "What to clarify before building a SaaS: problem, users, V1 scope, data, operations and evolution path.",
  },
  publishedAt: "2026-08-12",
  featured: true,
  relatedService: "applications",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "Si votre futur SaaS a déjà besoin de trois rôles, de paiements, de notifications et d'une interface d'administration, le premier risque n'est probablement pas le choix du framework : c'est le périmètre. Ce guide liste ce qu'il faut clarifier avant d'écrire la première ligne de code.",
      },
      { type: "heading", level: 2, text: "Le problème avant les fonctionnalités" },
      {
        type: "paragraph",
        text: "Un SaaS solide part d'un problème précis que des gens paient déjà pour résoudre, mal ou lentement. Formulez ce problème en une phrase, sans citer une seule fonctionnalité. Si la phrase ne tient pas sans mots comme « dashboard » ou « IA », le produit n'est pas encore défini.",
      },
      { type: "heading", level: 2, text: "Utilisateurs principaux et rôles" },
      {
        type: "list",
        items: [
          "Qui utilise le produit chaque semaine ? Ce sont eux qui décident de sa survie.",
          "Qui paie ? Ce n'est pas toujours l'utilisateur quotidien.",
          "Quels rôles ont des droits différents : client, opérateur, administrateur ?",
          "Qui a besoin de voir sans modifier : direction, comptabilité, support ?",
        ],
      },
      { type: "heading", level: 2, text: "Le périmètre de la V1" },
      {
        type: "paragraph",
        text: "La V1 doit prouver la valeur du produit avec le parcours le plus court possible. Tout ce qui n'est pas indispensable à ce parcours passe en V2 : personnalisation avancée, exports sophistiqués, intégrations secondaires. Un périmètre V1 honnête tient sur une page.",
      },
      { type: "heading", level: 2, text: "Données et intégrations" },
      {
        type: "list",
        items: [
          "Quelles données le produit crée, lit et transforme ?",
          "D'où viennent les données existantes : fichiers, autre outil, saisie manuelle ?",
          "Quelles intégrations sont bloquantes dès la V1 : paiement, email, calendrier, ERP ?",
          "Qui est propriétaire des données et où doivent-elles être hébergées ?",
        ],
      },
      { type: "heading", level: 2, text: "Exploitation et administration" },
      {
        type: "paragraph",
        text: "Un SaaS se gère au quotidien : créer un compte, corriger une donnée, rembourser un paiement, répondre à un client bloqué. Prévoyez dès le cadrage qui fera ces gestes et avec quels outils. Une V1 sans interface d'administration se paie très cher en support manuel.",
      },
      { type: "heading", level: 2, text: "Lancement et évolution" },
      {
        type: "paragraph",
        text: "Décidez à l'avance ce qui déclenchera la V2 : un nombre d'utilisateurs actifs, un retour récurrent, un segment qui paie. Un produit préparé ainsi évolue par décisions successives, pas par empilement de demandes.",
      },
      {
        type: "callout",
        title: "Le risque n'est pas le framework",
        body: "Sur un SaaS complexe, le périmètre mal défini coûte presque toujours plus cher que le choix technique. Cadrez le périmètre d'abord : la stack se choisit bien quand on sait ce qu'elle doit porter.",
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "If your future SaaS already needs three roles, payments, notifications and an admin interface, the first risk is probably not the framework: it is scope. This guide lists what to clarify before writing the first line of code.",
      },
      { type: "heading", level: 2, text: "The problem before the features" },
      {
        type: "paragraph",
        text: "A solid SaaS starts from a precise problem people already pay to solve, badly or slowly. Phrase that problem in one sentence with no feature words in it. If the sentence cannot stand without words like dashboard or AI, the product is not defined yet.",
      },
      { type: "heading", level: 2, text: "Primary users and roles" },
      {
        type: "list",
        items: [
          "Who uses the product every week? They decide whether it survives.",
          "Who pays? Not always the daily user.",
          "Which roles need different rights: customer, operator, administrator?",
          "Who needs to see without editing: management, accounting, support?",
        ],
      },
      { type: "heading", level: 2, text: "V1 scope" },
      {
        type: "paragraph",
        text: "The V1 must prove the product's value with the shortest possible journey. Everything not essential to that journey moves to V2: advanced customization, sophisticated exports, secondary integrations. An honest V1 scope fits on one page.",
      },
      { type: "heading", level: 2, text: "Data and integrations" },
      {
        type: "list",
        items: [
          "What data does the product create, read and transform?",
          "Where does existing data come from: files, another tool, manual entry?",
          "Which integrations are blocking from V1: payment, email, calendar, ERP?",
          "Who owns the data and where must it be hosted?",
        ],
      },
      { type: "heading", level: 2, text: "Operations and administration" },
      {
        type: "paragraph",
        text: "A SaaS is operated daily: creating an account, fixing a record, refunding a payment, unblocking a customer. Decide during framing who performs these actions and with which tools. A V1 without an admin interface is paid for in expensive manual support.",
      },
      { type: "heading", level: 2, text: "Launch and evolution" },
      {
        type: "paragraph",
        text: "Decide in advance what will trigger V2: a number of active users, a recurring request, a paying segment. A product prepared this way evolves through successive decisions, not through piled-up feature requests.",
      },
      {
        type: "callout",
        title: "The risk is not the framework",
        body: "On a complex SaaS, poorly defined scope almost always costs more than the technical choice. Frame the scope first: the stack is easy to choose once you know what it has to carry.",
      },
    ],
  },
};
