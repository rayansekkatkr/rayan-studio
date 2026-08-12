import type { ServiceRecord } from "./types";

export const automation: ServiceRecord = {
  key: "automation",
  slug: { fr: "automatisation-ia", en: "automation-ai" },
  eyebrow: { fr: "Automatisation & IA", en: "Automation & AI" },
  title: {
    fr: "Automatiser ce qui coûte du temps avant d'ajouter de l'IA là où elle apporte réellement quelque chose.",
    en: "Automate what wastes time first, then apply AI where it creates real value.",
  },
  description: {
    fr: "Automatisation de vos processus répétitifs et IA appliquée à des cas concrets : extraction, classification et analyse de documents, toujours au service d'un gain mesurable de temps.",
    en: "Automation of your repetitive processes and AI applied to concrete cases: document extraction, classification and analysis, always in service of a measurable time gain.",
  },
  problem: {
    fr: "Des heures perdues chaque semaine en saisies, copier-coller et vérifications manuelles, et des promesses d'IA génériques qui ne correspondent pas à vos vrais processus.",
    en: "Hours lost every week on data entry, copy-paste and manual checks, plus generic AI promises that do not match your real processes.",
  },
  useCases: {
    fr: [
      { title: "Workflows automatisés", body: "Les étapes répétitives de vos processus exécutées sans intervention manuelle." },
      { title: "Génération de documents", body: "Devis, rapports et courriers produits automatiquement à partir de vos données." },
      { title: "Synchronisation d'outils", body: "Vos logiciels reliés entre eux : fini la double saisie." },
      { title: "APIs et connecteurs", body: "Des ponts fiables entre vos systèmes internes et externes." },
      { title: "Extraction de données", body: "Les informations clés extraites automatiquement de vos documents métier." },
      { title: "Classification et analyse", body: "Tri, catégorisation et analyse assistée de volumes documentaires." },
      { title: "Génération assistée", body: "Des contenus préparés par IA puis validés par un humain, quand le cas s'y prête." },
    ],
    en: [
      { title: "Automated workflows", body: "The repetitive steps of your processes executed without manual intervention." },
      { title: "Document generation", body: "Quotes, reports and letters produced automatically from your data." },
      { title: "Tool synchronization", body: "Your software connected together: no more double entry." },
      { title: "APIs and connectors", body: "Reliable bridges between your internal and external systems." },
      { title: "Data extraction", body: "Key information extracted automatically from your business documents." },
      { title: "Classification and analysis", body: "Sorting, categorization and assisted analysis of document volumes." },
      { title: "Assisted generation", body: "AI-prepared content validated by a human, where the case fits." },
    ],
  },
  approach: {
    fr: [
      "Identifier d'abord les tâches qui coûtent réellement du temps, chiffres à l'appui.",
      "Automatiser le déterministe avant d'introduire de l'IA.",
      "N'utiliser l'IA que là où elle est mesurablement meilleure que la règle simple.",
      "Garder un contrôle humain sur les décisions qui engagent l'entreprise.",
    ],
    en: [
      "First identify the tasks that truly cost time, with numbers.",
      "Automate the deterministic before introducing AI.",
      "Use AI only where it is measurably better than a simple rule.",
      "Keep human control over decisions that commit the company.",
    ],
  },
  engineering: {
    fr: [
      "Automatisations supervisées : journaux, alertes et reprise sur erreur.",
      "Traitement des données pensé pour la confidentialité : vos documents ne partent pas n'importe où.",
      "Intégrations robustes avec vos outils existants plutôt qu'un remplacement forcé.",
    ],
    en: [
      "Supervised automations: logs, alerts and error recovery.",
      "Data processing designed for confidentiality: your documents do not travel anywhere.",
      "Robust integrations with your existing tools rather than a forced replacement.",
    ],
  },
  technologies: ["Node.js", "TypeScript", "APIs", "OCR", "LLM"],
  proofProjects: ["docextract", "pont-facturx"],
  faq: {
    fr: [
      {
        question: "Faut-il changer nos outils actuels ?",
        answer: "Rarement. L'approche par défaut est de connecter et d'automatiser autour de vos outils existants, pas de tout remplacer.",
      },
      {
        question: "L'IA est-elle obligatoire dans ces projets ?",
        answer: "Non. Beaucoup de gains viennent d'automatisations simples et déterministes. L'IA n'est ajoutée que si elle apporte une valeur mesurable sur votre cas.",
      },
      {
        question: "Que deviennent nos données ?",
        answer: "Elles restent sous votre contrôle. Les traitements sont conçus pour limiter les transferts, et tout usage d'un service externe est explicite et validé avec vous.",
      },
    ],
    en: [
      {
        question: "Do we have to change our current tools?",
        answer: "Rarely. The default approach is to connect and automate around your existing tools, not replace everything.",
      },
      {
        question: "Is AI mandatory in these projects?",
        answer: "No. Many gains come from simple, deterministic automations. AI is added only if it brings measurable value to your case.",
      },
      {
        question: "What happens to our data?",
        answer: "It stays under your control. Processing is designed to limit transfers, and any use of an external service is explicit and validated with you.",
      },
    ],
  },
};
