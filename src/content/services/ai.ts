import type { ServiceRecord } from "./types";

// Rolling out generative AI assistants (Claude, ChatGPT, Microsoft 365 Copilot)
// and custom LLM assistants. No client reference yet: proof stays on the
// studio's own products. Product capabilities are described generically and
// checked against each vendor's business offer during the project.
export const ai: ServiceRecord = {
  key: "ai",
  slug: { fr: "ia-generative-entreprise", en: "generative-ai-business" },
  eyebrow: { fr: "IA générative en entreprise", en: "Generative AI for business" },
  title: {
    fr: "Mettre Claude, ChatGPT ou Copilot au travail dans votre entreprise, avec des règles claires pour vos données.",
    en: "Put Claude, ChatGPT or Copilot to work in your company, with clear rules for your data.",
  },
  description: {
    fr: "Choix et déploiement de l'assistant IA adapté à vos équipes (Claude, ChatGPT, Microsoft 365 Copilot), assistants sur mesure branchés sur vos documents, cadrage RGPD et formation des équipes.",
    en: "Choosing and rolling out the right AI assistant for your teams (Claude, ChatGPT, Microsoft 365 Copilot), custom assistants connected to your documents, GDPR framing and team training.",
  },
  problem: {
    fr: "Vos équipes utilisent déjà l'IA, souvent avec des comptes personnels et sans règle sur les données qu'elles y collent. Les offres se multiplient, et personne n'a le temps de les comparer, de les configurer et de former les équipes.",
    en: "Your teams already use AI, often on personal accounts and with no rule on the data they paste into it. Offers keep multiplying, and nobody has the time to compare them, configure them and train the teams.",
  },
  useCases: {
    fr: [
      {
        title: "Choix de l'outil",
        body: "Claude, ChatGPT ou Microsoft 365 Copilot comparés sur vos cas réels, vos outils existants et votre budget.",
      },
      {
        title: "Déploiement des comptes",
        body: "Espace entreprise, connexion unique (SSO), gestion des utilisateurs et des droits, réglages de conservation des données.",
      },
      {
        title: "Connecteurs",
        body: "L'assistant relié à vos documents et à vos outils (Google Drive, SharePoint, Slack, CRM), selon ce que l'offre choisie permet.",
      },
      {
        title: "Assistant sur mesure",
        body: "Un assistant interne qui répond à partir de vos documents, via l'API du modèle, hébergé dans votre cloud.",
      },
      {
        title: "Automatisations avec un LLM",
        body: "Tri d'emails, résumés de documents, extraction de données, brouillons de réponses validés par un humain.",
      },
      {
        title: "Charte d'usage et RGPD",
        body: "Quelles données peuvent y aller, qui a accès à quoi, ce qui est journalisé, et ce que prévoit le contrat de l'éditeur.",
      },
      {
        title: "Formation des équipes",
        body: "Des ateliers sur les cas réels de chaque métier. L'AI Act demande aux entreprises qui utilisent l'IA d'aider leurs équipes à s'y former (article 4).",
      },
    ],
    en: [
      {
        title: "Choosing the tool",
        body: "Claude, ChatGPT or Microsoft 365 Copilot compared on your real use cases, your existing tools and your budget.",
      },
      {
        title: "Account rollout",
        body: "Business workspace, single sign-on (SSO), user and permission management, data retention settings.",
      },
      {
        title: "Connectors",
        body: "The assistant connected to your documents and tools (Google Drive, SharePoint, Slack, CRM), as far as the chosen offer allows.",
      },
      {
        title: "Custom assistant",
        body: "An internal assistant that answers from your documents, through the model's API, hosted in your cloud.",
      },
      {
        title: "LLM-powered automations",
        body: "Email triage, document summaries, data extraction, draft replies approved by a person.",
      },
      {
        title: "Usage policy and GDPR",
        body: "Which data may go in, who can access what, what is logged, and what the vendor's contract says.",
      },
      {
        title: "Team training",
        body: "Workshops built on each team's real tasks. The EU AI Act asks companies that use AI to help their staff build AI literacy (Article 4).",
      },
    ],
  },
  approach: {
    fr: [
      "Partir des tâches réelles de vos équipes, pas de l'outil à la mode.",
      "Tester avec un petit groupe avant de déployer à toute l'entreprise.",
      "Préférer l'offre entreprise de l'éditeur aux comptes personnels, et vérifier ce que son contrat prévoit pour vos données.",
      "Mesurer l'usage après quelques semaines, puis ajuster.",
    ],
    en: [
      "Start from your teams' real tasks, not from the tool everyone talks about.",
      "Pilot with a small group before rolling out to the whole company.",
      "Prefer the vendor's business offer to personal accounts, and check what its contract says about your data.",
      "Measure usage after a few weeks, then adjust.",
    ],
  },
  engineering: {
    fr: [
      "Connexion unique et comptes gérés depuis votre annuaire (Google Workspace, Microsoft Entra ID), quand l'offre le permet.",
      "Assistants sur mesure : clés d'API côté serveur, seulement les données que vous choisissez, réponses qui citent leurs sources.",
      "Journalisation et plafonds de coût pour les usages via l'API.",
      "Configuration documentée et passation à votre équipe.",
    ],
    en: [
      "Single sign-on and accounts managed from your directory (Google Workspace, Microsoft Entra ID), when the offer supports it.",
      "Custom assistants: API keys kept server side, only the data you choose, answers that cite their sources.",
      "Logging and cost caps for API usage.",
      "Documented configuration and handover to your team.",
    ],
  },
  technologies: ["Claude", "ChatGPT", "Microsoft 365 Copilot", "API", "RAG", "SSO"],
  proofProjects: ["docextract", "pont-facturx"],
  faq: {
    fr: [
      {
        question: "Claude, ChatGPT ou Copilot : lequel choisir ?",
        answer:
          "Cela dépend de vos outils et de vos usages. Si vos équipes vivent dans Microsoft 365, Copilot s'intègre à Outlook, Teams et SharePoint. Claude et ChatGPT ne dépendent pas de votre suite bureautique et proposent aussi des connecteurs. On compare sur vos cas réels pendant un test.",
      },
      {
        question: "Nos données servent-elles à entraîner les modèles ?",
        answer:
          "Dans les offres entreprise de ces éditeurs, non par défaut. Ce n'est pas forcément le cas des comptes personnels. On vérifie ensemble les conditions de l'offre retenue avant le déploiement.",
      },
      {
        question: "Faut-il un développeur pour déployer un de ces outils ?",
        answer:
          "Pas forcément pour l'outil lui-même. Un développeur devient utile pour la connexion unique, les connecteurs vers vos outils internes et les assistants sur mesure.",
      },
      {
        question: "Est-ce compatible avec le RGPD ?",
        answer:
          "Cela dépend de l'offre, de l'hébergement des données et de ce que vous y mettez. Nous vous aidons à poser les règles et à rassembler les documents de l'éditeur ; la validation juridique reste celle de votre DPO ou de votre juriste.",
      },
    ],
    en: [
      {
        question: "Claude, ChatGPT or Copilot: which one should we pick?",
        answer:
          "It depends on your tools and how you work. If your teams live in Microsoft 365, Copilot integrates with Outlook, Teams and SharePoint. Claude and ChatGPT do not depend on your office suite and offer their own connectors. We compare them on your real use cases during a pilot.",
      },
      {
        question: "Is our data used to train the models?",
        answer:
          "In these vendors' business offers, not by default. That is not necessarily true of personal accounts. We check the terms of the chosen offer together before the rollout.",
      },
      {
        question: "Do we need a developer to roll out one of these tools?",
        answer:
          "Not necessarily for the tool itself. A developer becomes useful for single sign-on, connectors to your internal tools and custom assistants.",
      },
      {
        question: "Is it GDPR compliant?",
        answer:
          "It depends on the offer, where the data is hosted and what you put into it. We help you set the rules and gather the vendor's documentation; the legal sign-off stays with your DPO or legal counsel.",
      },
    ],
  },
};
