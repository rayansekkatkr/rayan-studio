import type { InsightRecord } from "./types";

export const legacyRedesignChecklist: InsightRecord = {
  key: "legacy-redesign-checklist",
  category: "checklists",
  slug: { fr: "checklist-refonte-site-internet", en: "website-redesign-checklist" },
  title: {
    fr: "Checklist avant de refondre un site internet",
    en: "Website redesign checklist",
  },
  description: {
    fr: "Avant de refaire un site, séparez ce qui relève du design, du message, du parcours client et de la technique : première impression, mobile, SEO, DNS, redirections et plan de lancement.",
    en: "Before rebuilding a website, separate design, message, customer journey and technical issues: first impression, mobile, SEO, DNS, redirects and launch plan.",
  },
  publishedAt: "2026-08-12",
  relatedService: "web",
  blocks: {
    fr: [
      {
        type: "paragraph",
        text: "Avant de refaire un site, il faut savoir ce qui bloque vraiment. Cette checklist aide à séparer les problèmes de design, de message, de parcours client et de technique, pour que la refonte corrige les bonnes choses.",
      },
      { type: "heading", level: 2, text: "Première impression" },
      {
        type: "checklist",
        items: [
          "Le site donne-t-il une image actuelle et crédible de l'entreprise ?",
          "Un visiteur comprend-il en quelques secondes ce que vous proposez ?",
          "Les photos, couleurs et textes ressemblent-ils vraiment à votre activité ?",
        ],
      },
      { type: "heading", level: 2, text: "Clarté de l'offre" },
      {
        type: "checklist",
        items: [
          "Chaque prestation importante a-t-elle une page ou une section claire ?",
          "Le visiteur sait-il quoi faire ensuite : appeler, écrire, demander un devis ?",
          "Les éléments de réassurance (réalisations, méthode) sont-ils visibles ?",
        ],
      },
      { type: "heading", level: 2, text: "Parcours mobile" },
      {
        type: "checklist",
        items: [
          "Le téléphone, WhatsApp ou le formulaire sont-ils accessibles sans chercher ?",
          "Les titres restent-ils lisibles sur petit écran ?",
          "Les boutons sont-ils assez clairs pour déclencher une demande ?",
        ],
      },
      { type: "heading", level: 2, text: "Base technique et SEO" },
      {
        type: "checklist",
        items: [
          "Les pages importantes ont-elles un titre, une description et une structure propres ?",
          "Les DNS, l'hébergement et le certificat SSL sont-ils maîtrisés et documentés ?",
          "Le sitemap, le robots.txt et la Search Console sont-ils correctement configurés ?",
          "Savez-vous quelles pages reçoivent du trafic aujourd'hui ?",
        ],
      },
      { type: "heading", level: 2, text: "Redirections et lancement" },
      {
        type: "checklist",
        items: [
          "Chaque ancienne URL importante a-t-elle une redirection prévue vers un équivalent réel ?",
          "La bascule est-elle planifiée : qui, quand, avec quel retour arrière possible ?",
          "Le site actuel reste-t-il en ligne jusqu'à la mise en production du nouveau ?",
        ],
      },
    ],
    en: [
      {
        type: "paragraph",
        text: "Before rebuilding a website, you need to know what is actually failing. This checklist separates design, message, customer journey and technical issues, so the redesign fixes the right things.",
      },
      { type: "heading", level: 2, text: "First impression" },
      {
        type: "checklist",
        items: [
          "Does the site project a current, credible image of the company?",
          "Does a visitor understand within seconds what you offer?",
          "Do the photos, colors and copy genuinely look like your business?",
        ],
      },
      { type: "heading", level: 2, text: "Offer clarity" },
      {
        type: "checklist",
        items: [
          "Does every important service have a clear page or section?",
          "Does the visitor know what to do next: call, write, request a quote?",
          "Are reassurance elements (work, method) visible?",
        ],
      },
      { type: "heading", level: 2, text: "Mobile journey" },
      {
        type: "checklist",
        items: [
          "Are phone, WhatsApp or the form reachable without searching?",
          "Do headings stay readable on a small screen?",
          "Are buttons clear enough to trigger an enquiry?",
        ],
      },
      { type: "heading", level: 2, text: "Technical base and SEO" },
      {
        type: "checklist",
        items: [
          "Do the important pages have clean titles, descriptions and structure?",
          "Are DNS, hosting and the SSL certificate under control and documented?",
          "Are the sitemap, robots.txt and Search Console configured correctly?",
          "Do you know which pages receive traffic today?",
        ],
      },
      { type: "heading", level: 2, text: "Redirects and launch" },
      {
        type: "checklist",
        items: [
          "Does every important old URL have a planned redirect to a genuine equivalent?",
          "Is the switch planned: who, when, with what rollback option?",
          "Does the current site stay online until the new one is in production?",
        ],
      },
    ],
  },
};
