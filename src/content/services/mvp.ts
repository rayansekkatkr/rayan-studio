import type { ServiceRecord } from "./types";

export const mvp: ServiceRecord = {
  key: "mvp",
  slug: { fr: "mvp-produits-digitaux", en: "mvp-digital-products" },
  eyebrow: { fr: "MVP & produits digitaux", en: "MVP & digital products" },
  title: {
    fr: "Passer d'une idée à un vrai produit, sans construire six mois de fonctionnalités inutiles.",
    en: "Turn an idea into a real product without spending six months building unnecessary features.",
  },
  description: {
    fr: "Cadrage, priorisation et développement d'une première version prête pour la production : assez complète pour convaincre, assez focalisée pour sortir vite.",
    en: "Framing, prioritization and development of a first production-ready version: complete enough to convince, focused enough to ship fast.",
  },
  problem: {
    fr: "Beaucoup de projets échouent avant d'exister : trop de fonctionnalités prévues, trop de temps avant la première mise en ligne, et plus de budget quand les vrais retours utilisateurs arrivent.",
    en: "Many projects fail before existing: too many planned features, too much time before the first release, and no budget left when real user feedback arrives.",
  },
  useCases: {
    fr: [
      { title: "Définition du périmètre", body: "Séparer ce qui est indispensable à la V1 de ce qui peut attendre." },
      { title: "Priorisation", body: "Un ordre de construction guidé par la valeur pour l'utilisateur, pas par la facilité technique." },
      { title: "Cadrage UX et produit", body: "Des parcours simples qui montrent la valeur du produit dès la première utilisation." },
      { title: "Première version en production", body: "Un produit réel, utilisable et hébergé, pas un prototype jetable." },
      { title: "Architecture évolutive", body: "Une base technique qui accepte la suite : nouvelles fonctionnalités, plus d'utilisateurs." },
    ],
    en: [
      { title: "Scope definition", body: "Separate what the V1 truly needs from what can wait." },
      { title: "Prioritization", body: "A build order driven by user value, not technical convenience." },
      { title: "UX and product framing", body: "Simple journeys that show the product's value from first use." },
      { title: "First production version", body: "A real, usable, hosted product, not a throwaway prototype." },
      { title: "Evolvable architecture", body: "A technical base ready for what comes next: new features, more users." },
    ],
  },
  approach: {
    fr: [
      "Atelier de cadrage : objectif, utilisateurs, périmètre minimum crédible.",
      "Découpage en versions : ce que la V1 prouve, ce que la V2 ajoute.",
      "Développement resserré avec des points d'étape réguliers.",
      "Lancement en production et itérations à partir de l'usage réel.",
    ],
    en: [
      "Framing workshop: objective, users, minimum credible scope.",
      "Version slicing: what V1 proves, what V2 adds.",
      "Focused development with regular checkpoints.",
      "Production launch and iterations based on real usage.",
    ],
  },
  engineering: {
    fr: [
      "Un socle technique standard et éprouvé plutôt qu'une expérimentation risquée.",
      "Des choix réversibles : la V1 n'enferme pas le produit dans une impasse technique.",
      "Mise en production dès le départ : hébergement, domaine, suivi des erreurs.",
    ],
    en: [
      "A standard, proven technical base rather than a risky experiment.",
      "Reversible choices: the V1 does not lock the product into a dead end.",
      "Production from the start: hosting, domain, error monitoring.",
    ],
  },
  technologies: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL"],
  proofProjects: ["goodcall"],
  faq: {
    fr: [
      {
        question: "Mon idée est encore floue, est-ce trop tôt ?",
        answer: "Non. Le cadrage sert justement à transformer une idée en périmètre concret : vous n'avez pas besoin d'arriver avec un cahier des charges parfait.",
      },
      {
        question: "Que contient exactement la première version ?",
        answer: "Le minimum qui prouve la valeur du produit auprès de vrais utilisateurs. Le contenu exact est défini ensemble pendant le cadrage, avant tout développement.",
      },
      {
        question: "Que se passe-t-il après le MVP ?",
        answer: "Vous décidez : itérer avec le studio, internaliser, ou faire une pause. Le code et les accès vous appartiennent dans tous les cas.",
      },
    ],
    en: [
      {
        question: "My idea is still vague, is it too early?",
        answer: "No. Framing exists precisely to turn an idea into a concrete scope: you do not need to arrive with a perfect specification.",
      },
      {
        question: "What exactly does the first version contain?",
        answer: "The minimum that proves the product's value with real users. The exact content is defined together during framing, before any development.",
      },
      {
        question: "What happens after the MVP?",
        answer: "You decide: iterate with the studio, bring it in house, or pause. The code and access belong to you in every case.",
      },
    ],
  },
};
