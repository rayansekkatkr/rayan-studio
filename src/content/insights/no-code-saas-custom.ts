import type { InsightRecord } from "./types";

export const noCodeSaasCustom: InsightRecord = {
  key: "no-code-saas-custom",
  category: "guides",
  slug: { fr: "no-code-saas-ou-sur-mesure", en: "no-code-saas-or-custom-development" },
  title: {
    fr: "No-code, SaaS existant ou développement sur mesure ?",
    en: "No-code, existing SaaS or custom development?",
  },
  description: {
    fr: "Comment choisir entre un outil existant, une solution no-code et un développement sur mesure, en comparant propriété, intégrations, maintenance et coût de sortie.",
    en: "How to choose between an existing tool, a no-code solution and custom development, comparing ownership, integrations, maintenance and exit cost.",
  },
  publishedAt: "2026-08-12",
  relatedService: "applications",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "Ces trois options sont toutes de bons choix, chacune dans son cas. La mauvaise décision, c'est de choisir par principe : tout-no-code par peur du développement, ou tout-sur-mesure par réflexe. Voici les critères qui départagent réellement.",
      },
      { type: "heading", level: 2, text: "Un SaaS existant quand le workflow est standard" },
      {
        type: "paragraph",
        text: "Facturation, prise de rendez-vous, newsletter, CRM simple : si votre besoin ressemble à celui de milliers d'entreprises, un outil du marché sera plus complet, plus fiable et moins cher que tout ce que vous pourriez faire construire. L'adopter, c'est accepter son workflow.",
      },
      { type: "heading", level: 2, text: "Le no-code quand la vitesse de validation prime" },
      {
        type: "paragraph",
        text: "Pour tester une idée, un formulaire connecté à une base et quelques automatisations valident un besoin en jours. Le no-code excelle tant que le volume reste modéré et que le workflow reste proche des blocs standard. C'est un excellent outil d'apprentissage avant d'investir.",
      },
      { type: "heading", level: 2, text: "Le sur mesure quand le workflow est différenciant" },
      {
        type: "paragraph",
        text: "Si votre façon de travailler est précisément ce qui vous distingue, la tordre pour rentrer dans un outil générique détruit l'avantage. Le sur mesure se justifie quand le workflow, les intégrations ou le produit lui-même sont votre différenciation, ou quand le produit est votre business.",
      },
      { type: "heading", level: 2, text: "Comparer sur quatre axes" },
      {
        type: "list",
        items: [
          "Propriété : qui possède les données, le code et la relation client ? Que se passe-t-il si l'éditeur ferme ou change ses prix ?",
          "Intégrations : l'option se connecte-t-elle proprement à vos outils, ou par des rustines fragiles ?",
          "Maintenance : abonnements et limites d'un côté, responsabilité du code de l'autre. Aucune option n'est gratuite dans le temps.",
          "Coût de sortie : migrer depuis un SaaS fermé ou un no-code propriétaire peut coûter plus cher que le développement évité.",
        ],
      },
      {
        type: "callout",
        title: "Les trajectoires mixtes sont normales",
        body: "Beaucoup de bons produits commencent en no-code pour valider, puis passent au sur mesure quand le volume ou la différenciation le justifie. Prévoir cette trajectoire dès le début évite de la subir.",
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "All three options are good choices, each in its own case. The wrong decision is choosing on principle: all-no-code out of fear of development, or all-custom by reflex. Here are the criteria that actually decide.",
      },
      { type: "heading", level: 2, text: "An existing SaaS when the workflow is standard" },
      {
        type: "paragraph",
        text: "Invoicing, appointment booking, newsletters, simple CRM: if your need looks like that of thousands of companies, an off-the-shelf tool will be more complete, more reliable and cheaper than anything you could have built. Adopting it means accepting its workflow.",
      },
      { type: "heading", level: 2, text: "No-code when validation speed matters most" },
      {
        type: "paragraph",
        text: "To test an idea, a form connected to a database and a few automations validate a need in days. No-code shines while volume stays moderate and the workflow stays close to standard blocks. It is an excellent learning tool before investing.",
      },
      { type: "heading", level: 2, text: "Custom development when the workflow differentiates you" },
      {
        type: "paragraph",
        text: "If the way you work is precisely what sets you apart, twisting it to fit a generic tool destroys the advantage. Custom development is justified when the workflow, the integrations or the product itself are your differentiation, or when the product is your business.",
      },
      { type: "heading", level: 2, text: "Compare on four axes" },
      {
        type: "list",
        items: [
          "Ownership: who owns the data, the code and the customer relationship? What happens if the vendor shuts down or changes pricing?",
          "Integrations: does the option connect cleanly to your tools, or through fragile patches?",
          "Maintenance: subscriptions and limits on one side, code responsibility on the other. No option is free over time.",
          "Exit cost: migrating away from a closed SaaS or a proprietary no-code platform can cost more than the development you avoided.",
        ],
      },
      {
        type: "callout",
        title: "Mixed trajectories are normal",
        body: "Many good products start in no-code to validate, then move to custom development when volume or differentiation justifies it. Planning that trajectory from the start beats enduring it.",
      },
    ],
  },
};
