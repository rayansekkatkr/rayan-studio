import { Contact } from "@/components/site/Contact";
import { Faq } from "@/components/site/Faq";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Navbar } from "@/components/site/Navbar";
import { Pricing } from "@/components/site/Pricing";
import { ProblemSolution } from "@/components/site/ProblemSolution";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { Showcase } from "@/components/site/Showcase";
import { Testimonials } from "@/components/site/Testimonials";

export default function Home() {
  const servedCities = [
    "Paris",
    "Lyon",
    "Marseille",
    "Lille",
    "Bordeaux",
    "Nantes",
    "Toulouse",
    "Nice",
    "Strasbourg",
    "Montpellier",
  ];

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rayan Studio",
    description:
      "Freelance web spécialisé en création et refonte de sites vitrines haut de gamme pour commerces locaux français.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://rayanstudio.fr",
    areaServed: servedCities.map((city) => ({
      "@type": "City",
      name: city,
    })),
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
    availableLanguage: ["fr"],
    email: "rayan.sekkat@gmail.com",
    telephone: "+33636365696",
    serviceType: [
      "Création de site internet",
      "Refonte de site existant",
      "Web design haut de gamme",
      "UX orientée conversion",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services web pour commerces locaux",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Création de site internet",
          price: "500",
          priceCurrency: "EUR",
        },
        {
          "@type": "Offer",
          name: "Refonte de site existant",
          price: "1000",
          priceCurrency: "EUR",
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien de temps prend un projet ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La plupart des projets sont livrés entre 1 et 3 semaines selon le périmètre. Une première direction visuelle est généralement présentée sous 72h.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je garder certains contenus de mon site actuel ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. Les contenus pertinents sont conservés, puis la structure, la hiérarchie et le ton sont retravaillés pour améliorer lisibilité et impact.",
        },
      },
      {
        "@type": "Question",
        name: "Le site est-il optimisé mobile ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui. L'expérience mobile est traitée en priorité pour garantir lisibilité, rapidité et parcours fluide.",
        },
      },
      {
        "@type": "Question",
        name: "Avec quels types de commerces travaillez-vous ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Principalement restaurants, cafés, hôtels, boulangeries, pâtisseries, bars et commerces locaux en France.",
        },
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden isolate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="pointer-events-none fixed inset-0 -z-20 hero-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 hero-vignette" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProblemSolution />
        <Services />
        <Showcase />
        <Process />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
