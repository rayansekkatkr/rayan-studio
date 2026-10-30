import type { ProjectRecord } from "./types";

// Public demonstrator (github.com/rayansekkatkr/ops-knowledge-agent). The documents are
// those of a fictional company; every figure below comes from the repository README.
export const opsKnowledgeAgent: ProjectRecord = {
  key: "ops-knowledge-agent",
  slug: "ops-knowledge-agent",
  title: "Ops Knowledge Agent",
  kind: "demo",
  year: "2026",
  liveUrl: "https://github.com/rayansekkatkr/ops-knowledge-agent",
  links: [
    {
      label: { fr: "Voir le code sur GitHub", en: "See the code on GitHub" },
      href: "https://github.com/rayansekkatkr/ops-knowledge-agent",
    },
  ],
  heroImage: "/realisations/ops-agent.webp",
  tone: "dark",
  categories: {
    fr: ["IA générative", "RAG", "MCP", "Copilot Studio"],
    en: ["Generative AI", "RAG", "MCP", "Copilot Studio"],
  },
  summary: {
    fr: "Projet de démonstration : un même ensemble de documents internes rendu interrogeable de trois façons, un agent Copilot Studio, un pipeline RAG en Python et un serveur MCP, avec une synchronisation des connaissances par GitHub Actions.",
    en: "Demonstration project: one set of internal documents made answerable three ways, a Copilot Studio agent, a Python RAG pipeline and an MCP server, with knowledge kept in sync by GitHub Actions.",
  },
  role: {
    fr: "Conçu et développé par le studio, code public sur GitHub",
    en: "Designed and built by the studio, public code on GitHub",
  },
  status: {
    fr: "Démonstrateur, documents d'une entreprise fictive",
    en: "Demonstrator, documents of a fictional company",
  },
  technologies: ["Copilot Studio", "Power Automate", "Python", "RAG", "MCP", "OpenAI / Azure OpenAI", "GitHub Actions"],
  challenge: {
    fr: [
      "Montrer sur un cas réaliste comment rendre la documentation d'une équipe d'exploitation interrogeable par une IA : des réponses sourcées, et rien d'inventé quand l'information n'est pas dans les documents.",
    ],
    en: [
      "Show on a realistic case how to make an operations team's documentation answerable by AI: cited answers, and nothing made up when the information is not in the documents.",
    ],
  },
  solution: {
    fr: [
      "Un agent Copilot Studio en low-code, limité aux documents (recherche web et réponses non sourcées désactivées), qui ouvre un incident via un flux Power Automate.",
      "Un pipeline RAG en Python : découpage par section, embeddings ou TF-IDF hors ligne, génération qui cite chaque fait, et aucun appel au modèle sous un seuil de pertinence.",
      "Un serveur MCP qui expose la recherche, la réponse sourcée et un contrôle d'endpoint à n'importe quel client MCP, y compris l'agent Copilot Studio.",
      "Une évaluation de la recherche sur 10 questions de référence, utilisée comme garde-fou dans GitHub Actions avant chaque synchronisation des connaissances vers l'agent.",
    ],
    en: [
      "A low-code Copilot Studio agent restricted to the documents (web search and ungrounded answers turned off) that opens an incident through a Power Automate flow.",
      "A Python RAG pipeline: section-based chunking, embeddings or offline TF-IDF, generation that cites every fact, and no model call below a relevance threshold.",
      "An MCP server exposing search, cited answers and an endpoint check to any MCP client, including the Copilot Studio agent.",
      "A retrieval evaluation on 10 reference questions, used as a gate in GitHub Actions before every knowledge sync to the agent.",
    ],
  },
  capabilities: [
    {
      title: { fr: "Agent low-code", en: "Low-code agent" },
      body: {
        fr: "Copilot Studio pour aller vite, avec des réponses sourcées et une action métier.",
        en: "Copilot Studio to move fast, with cited answers and a business action.",
      },
    },
    {
      title: { fr: "RAG en code", en: "RAG in code" },
      body: {
        fr: "Un pipeline lisible et évalué, prêt à passer sur une recherche hybride.",
        en: "A readable, evaluated pipeline, ready to move to hybrid search.",
      },
    },
    {
      title: { fr: "Interopérabilité MCP", en: "MCP interoperability" },
      body: {
        fr: "Les mêmes outils disponibles dans l'agent et dans les IDE.",
        en: "The same tools available in the agent and in IDEs.",
      },
    },
  ],
  productUx: { fr: [], en: [] },
  engineering: {
    fr: [
      { title: "Garde-fou de pertinence", body: "Sous un score minimal, aucune réponse générée : moins d'hallucinations et moins de coût." },
      { title: "CI des connaissances", body: "Chaque modification de document est évaluée, puis poussée vers l'agent par l'API Dataverse." },
    ],
    en: [
      { title: "Relevance guardrail", body: "Below a minimum score, no generated answer: fewer hallucinations and lower cost." },
      { title: "Knowledge CI", body: "Every document change is evaluated, then pushed to the agent through the Dataverse API." },
    ],
  },
  outcome: {
    fr: [
      "Base de référence hors ligne : la bonne section arrive en première position pour 9 questions sur 10. L'écart restant est documenté, et c'est précisément ce que corrigent les embeddings ou la recherche hybride.",
    ],
    en: [
      "Offline baseline: the right section comes first for 9 questions out of 10. The remaining gap is documented, and it is exactly what embeddings or hybrid search fix.",
    ],
  },
  gallery: [],
};
