import dynamic from "next/dynamic";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";
import { FunnelTracking } from "./FunnelTracking";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";

const ProblemSolution = dynamic(() => import("@/components/site/ProblemSolution").then((mod) => mod.ProblemSolution));
const Services = dynamic(() => import("@/components/site/Services").then((mod) => mod.Services));
const Showcase = dynamic(() => import("@/components/site/Showcase").then((mod) => mod.Showcase));
const Process = dynamic(() => import("@/components/site/Process").then((mod) => mod.Process));
const Pricing = dynamic(() => import("@/components/site/Pricing").then((mod) => mod.Pricing));
const Testimonials = dynamic(() => import("@/components/site/Testimonials").then((mod) => mod.Testimonials));
const Faq = dynamic(() => import("@/components/site/Faq").then((mod) => mod.Faq));
const Contact = dynamic(() => import("@/components/site/Contact").then((mod) => mod.Contact));
const Footer = dynamic(() => import("@/components/site/Footer").then((mod) => mod.Footer));

export function HomePage({ locale }: { locale: Locale }) {
  const en = isEnglish(locale);
  const siteUrl = getSiteUrl();
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

  const faqEntries = en
    ? [
        {
          name: "How long does a project take?",
          text: "Most projects are delivered within 1 to 3 weeks depending on scope. A first visual direction is usually presented within 72 hours.",
        },
        {
          name: "Can we keep content from my current site?",
          text: "Yes. Relevant content is kept and then restructured to improve clarity, hierarchy, and conversion.",
        },
        {
          name: "Is the site optimized for mobile?",
          text: "Yes. Mobile is treated as a priority with strong readability and clear actions.",
        },
        {
          name: "Which businesses do you work with?",
          text: "Mainly restaurants, cafes, hotels, bakeries, pastry shops, bars, and local businesses in France.",
        },
      ]
    : [
        {
          name: "Combien de temps prend un projet ?",
          text: "La plupart des projets sont livrés entre 1 et 3 semaines selon le périmètre. Une première direction visuelle est généralement présentée sous 72h.",
        },
        {
          name: "Puis-je garder certains contenus de mon site actuel ?",
          text: "Oui. Les contenus pertinents sont conservés, puis la structure, la hiérarchie et le ton sont retravaillés pour améliorer lisibilité et impact.",
        },
        {
          name: "Le site est-il optimisé mobile ?",
          text: "Oui. L'expérience mobile est traitée en priorité pour garantir lisibilité, rapidité et parcours fluide.",
        },
        {
          name: "Avec quels types de commerces travaillez-vous ?",
          text: "Principalement restaurants, cafés, hôtels, boulangeries, pâtisseries, bars et commerces locaux en France.",
        },
      ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#professional-service`,
        name: BRAND.name,
        description: en
          ? "Freelance web specialist in high-end website creation and redesign for French local businesses."
          : "Freelance web spécialisé en création et refonte de sites vitrines haut de gamme pour commerces locaux français.",
        url: `${siteUrl}/${locale}`,
        areaServed: servedCities.map((city) => ({
          "@type": "City",
          name: city,
        })),
        address: {
          "@type": "PostalAddress",
          addressCountry: "FR",
        },
        availableLanguage: ["fr", "en"],
        email: BRAND.email,
        telephone: BRAND.phoneRaw,
        priceRange: "€€",
        founder: {
          "@type": "Person",
          name: BRAND.founder,
        },
        sameAs: [BRAND.whatsappUrl],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}#local-business`,
        name: BRAND.name,
        url: `${siteUrl}/${locale}`,
        email: BRAND.email,
        telephone: BRAND.phoneRaw,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service-main`,
        serviceType: en ? "Premium showcase website creation and redesign" : "Création et refonte de site vitrine premium",
        provider: {
          "@id": `${siteUrl}#professional-service`,
        },
        areaServed: "France",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/${locale}#faq`,
        mainEntity: faqEntries.map((entry) => ({
          "@type": "Question",
          name: entry.name,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.text,
          },
        })),
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden isolate">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="pointer-events-none fixed inset-0 -z-20 hero-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 hero-vignette" />
      <FunnelTracking />

      <div className="relative z-10">
        <Navbar locale={locale} />
        <Hero locale={locale} />
        <ProblemSolution locale={locale} />
        <Services locale={locale} />
        <Showcase locale={locale} />
        <Process locale={locale} />
        <Pricing locale={locale} />
        <Testimonials locale={locale} />
        <Faq locale={locale} />
        <Contact locale={locale} />
        <Footer locale={locale} />
      </div>
    </main>
  );
}

