import type { InsightRecord } from "./types";

export const redesignOrNew: InsightRecord = {
  key: "redesign-or-new",
  category: "articles",
  slug: { fr: "refonte-ou-nouveau-site", en: "redesign-or-new-website" },
  title: {
    fr: "Refonte ou nouveau site : comment décider ?",
    en: "Redesign or rebuild: how should you decide?",
  },
  description: {
    fr: "Les critères concrets pour choisir entre faire évoluer un site existant et repartir sur une base neuve, sans casser l'acquis SEO.",
    en: "Concrete criteria for choosing between evolving an existing website and rebuilding, without breaking your SEO equity.",
  },
  publishedAt: "2026-08-12",
  relatedService: "web",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "Un site qui a cinq ans n'est pas forcément à refaire, et un site récent n'est pas forcément à garder. La décision se prend sur trois plans : la structure du contenu, l'expérience utilisateur et l'état technique. C'est leur combinaison qui tranche.",
      },
      { type: "heading", level: 2, text: "Garder quand la structure et la technique tiennent" },
      {
        type: "paragraph",
        text: "Si l'architecture des pages correspond encore à ce que vous vendez, que le site est administrable et que la base technique n'impose pas de contournements permanents, une refonte visuelle et éditoriale suffit souvent. On garde les URLs, on garde l'acquis, on modernise la surface.",
      },
      { type: "heading", level: 2, text: "Reconstruire quand tout lâche en même temps" },
      {
        type: "list",
        items: [
          "L'arborescence ne reflète plus l'offre réelle et chaque ajout la déforme davantage.",
          "Le parcours mobile fait perdre des demandes : contact caché, pages lentes, formulaires pénibles.",
          "La technique bloque : dépendances mortes, hébergement fragile, impossibilité de modifier sans casser.",
          "Quand ces trois plans échouent ensemble, réparer coûte plus cher que reconstruire proprement.",
        ],
      },
      { type: "heading", level: 2, text: "Auditer le risque SEO avant de toucher aux URLs" },
      {
        type: "paragraph",
        text: "Avant toute décision, listez les pages qui reçoivent réellement du trafic et des liens. Chaque URL modifiée devra rediriger vers un équivalent réel, pas vers l'accueil. Si personne ne peut produire cette liste, l'audit vient avant la refonte.",
      },
      { type: "heading", level: 2, text: "Décider sur des faits, pas sur la lassitude" },
      {
        type: "paragraph",
        text: "« On ne supporte plus notre site » est un signal, pas un diagnostic. Confrontez la lassitude esthétique aux faits : demandes entrantes, comportement mobile, coûts de maintenance. La bonne décision est celle que vous pouvez argumenter sans parler de goûts.",
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "A five-year-old website does not automatically need a rebuild, and a recent one is not automatically worth keeping. The decision happens on three planes: content structure, user experience and technical state. Their combination decides.",
      },
      { type: "heading", level: 2, text: "Keep it when structure and technology hold" },
      {
        type: "paragraph",
        text: "If the page architecture still matches what you sell, the site is maintainable and the technical base does not force permanent workarounds, a visual and editorial redesign is often enough. You keep the URLs, keep the equity, modernize the surface.",
      },
      { type: "heading", level: 2, text: "Rebuild when everything fails together" },
      {
        type: "list",
        items: [
          "The information architecture no longer reflects the real offer and every addition distorts it further.",
          "The mobile journey loses enquiries: hidden contact, slow pages, painful forms.",
          "The technology blocks you: dead dependencies, fragile hosting, changes that break things.",
          "When these three planes fail together, repairing costs more than rebuilding cleanly.",
        ],
      },
      { type: "heading", level: 2, text: "Audit SEO risk before touching URLs" },
      {
        type: "paragraph",
        text: "Before any decision, list the pages that actually receive traffic and links. Every changed URL must redirect to a genuine equivalent, not the homepage. If nobody can produce that list, the audit comes before the redesign.",
      },
      { type: "heading", level: 2, text: "Decide with evidence, not aesthetic fatigue" },
      {
        type: "paragraph",
        text: "We cannot stand our website anymore is a signal, not a diagnosis. Confront aesthetic fatigue with facts: incoming enquiries, mobile behavior, maintenance costs. The right decision is the one you can argue without talking about taste.",
      },
    ],
  },
};
