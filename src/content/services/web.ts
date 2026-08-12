import type { ServiceRecord } from "./types";

export const web: ServiceRecord = {
  key: "web",
  slug: { fr: "sites-web-refonte", en: "premium-websites-redesign" },
  eyebrow: { fr: "Sites premium & refonte", en: "Premium websites & redesign" },
  title: {
    fr: "Votre site est souvent le premier contact avec votre entreprise. Il doit être au niveau de ce que vous faites réellement.",
    en: "Your website is often the first contact with your company. It should match the quality of what you actually do.",
  },
  description: {
    fr: "Création et refonte de sites premium pour entreprises et commerces : direction visuelle, développement, performance et SEO, avec une mise en ligne accompagnée de bout en bout.",
    en: "Creation and redesign of premium websites for companies and local businesses: visual direction, development, performance and SEO, with launch support end to end.",
  },
  problem: {
    fr: "Un site daté ou peu convaincant fait perdre des clients avant même le premier échange : il ne reflète ni la qualité de votre travail ni le sérieux de votre entreprise.",
    en: "A dated or unconvincing website loses clients before the first exchange: it reflects neither the quality of your work nor the seriousness of your company.",
  },
  useCases: {
    fr: [
      { title: "Direction visuelle", body: "Une identité en ligne cohérente avec votre positionnement réel." },
      { title: "UX et interface", body: "Des parcours simples qui amènent le visiteur vers le contact ou l'action." },
      { title: "Développement", body: "Un site rapide, propre et durable, sans dépendance à un constructeur fermé." },
      { title: "Responsive", body: "Une expérience soignée sur mobile, tablette et desktop." },
      { title: "Performance", body: "Des pages qui se chargent vite, y compris sur mobile en conditions réelles." },
      { title: "SEO", body: "Des fondations saines pour être trouvé sur les recherches qui comptent pour vous." },
      { title: "Analytics", body: "Une mesure simple et respectueuse du consentement pour comprendre ce qui fonctionne." },
      { title: "Migration et mise en ligne", body: "Domaine, hébergement, redirections : la bascule sans casse depuis votre site actuel." },
    ],
    en: [
      { title: "Visual direction", body: "An online identity consistent with your real positioning." },
      { title: "UX and interface", body: "Simple journeys that lead visitors toward contact or action." },
      { title: "Development", body: "A fast, clean, durable website with no lock-in to a closed builder." },
      { title: "Responsive", body: "A polished experience on mobile, tablet and desktop." },
      { title: "Performance", body: "Pages that load fast, including on mobile in real conditions." },
      { title: "SEO", body: "Healthy foundations to be found on the searches that matter to you." },
      { title: "Analytics", body: "Simple, consent-respecting measurement to understand what works." },
      { title: "Migration and launch", body: "Domain, hosting, redirects: switching from your current site without breakage." },
    ],
  },
  approach: {
    fr: [
      "Comprendre votre activité et vos clients avant de parler de design.",
      "Concevoir une direction visuelle spécifique, pas un template rebadgé.",
      "Développer avec la performance et le SEO en contrainte dès le départ.",
      "Accompagner la mise en ligne : domaine, redirections, suivi après lancement.",
    ],
    en: [
      "Understand your business and your clients before talking about design.",
      "Design a specific visual direction, not a rebadged template.",
      "Develop with performance and SEO as constraints from the start.",
      "Support the launch: domain, redirects, post-launch follow-up.",
    ],
  },
  engineering: {
    fr: [
      "Sites développés sur mesure, sans dépendance à un CMS fermé.",
      "Métadonnées, données structurées et sitemap gérés proprement.",
      "Formulaires protégés côté serveur contre le spam et les abus.",
      "Hébergement et DNS configurés et documentés pour vous.",
    ],
    en: [
      "Custom-built websites with no closed CMS dependency.",
      "Metadata, structured data and sitemap handled properly.",
      "Forms protected server side against spam and abuse.",
      "Hosting and DNS configured and documented for you.",
    ],
  },
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  proofProjects: ["manteigaria"],
  faq: {
    fr: [
      {
        question: "Refonte ou nouveau site : comment décider ?",
        answer: "Après un état des lieux honnête de votre site actuel : contenu, image renvoyée, technique. Parfois une refonte suffit, parfois repartir proprement est plus rentable. La recommandation est argumentée avant tout engagement.",
      },
      {
        question: "Que devient mon site actuel pendant le projet ?",
        answer: "Il reste en ligne jusqu'à la bascule. La migration est préparée : contenus repris, redirections en place, aucune coupure visible pour vos visiteurs.",
      },
      {
        question: "Pourrai-je modifier le site moi-même ensuite ?",
        answer: "Cela dépend du périmètre choisi : les contenus qui doivent évoluer souvent sont identifiés au cadrage et rendus modifiables en conséquence.",
      },
    ],
    en: [
      {
        question: "Redesign or new website: how to decide?",
        answer: "After an honest assessment of your current site: content, image projected, technical state. Sometimes a redesign is enough, sometimes a clean restart is more cost-effective. The recommendation is argued before any commitment.",
      },
      {
        question: "What happens to my current site during the project?",
        answer: "It stays online until the switch. The migration is prepared: content carried over, redirects in place, no visible interruption for your visitors.",
      },
      {
        question: "Will I be able to edit the site myself afterwards?",
        answer: "It depends on the chosen scope: content that needs frequent updates is identified during framing and made editable accordingly.",
      },
    ],
  },
};
