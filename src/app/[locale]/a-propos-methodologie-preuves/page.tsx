import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";

const faqFr = [
  {
    q: "Qui accompagnez-vous ?",
    a: "J'accompagne les petites entreprises, artisans, indépendants et commerces locaux qui ont un site daté ou pas encore de vrai site.",
  },
  {
    q: "Quelle est votre méthode ?",
    a: "Diagnostic de perception, structure, direction visuelle, développement, SEO local, DNS, hébergement/VPS puis mise en ligne.",
  },
  {
    q: "Comment mesurez-vous les résultats ?",
    a: "Je mesure les demandes entrantes, les clics WhatsApp, les prises de contact et les signaux business observables sur 30 jours.",
  },
  {
    q: "Pourquoi vous plutôt qu'une agence généraliste ?",
    a: "Vous gardez un interlocuteur unique, une exécution design/dev directe, et la partie technique prise en charge sans lourdeur d'agence.",
  },
];

const faqEn = [
  {
    q: "Who do you support?",
    a: "I support small businesses, independents and local businesses with a dated website or no proper website yet.",
  },
  {
    q: "What is your method?",
    a: "Perception diagnosis, structure, visual direction, development, local SEO, DNS, hosting/VPS and clean launch.",
  },
  {
    q: "How do you measure results?",
    a: "I track inbound inquiries, WhatsApp clicks, contact requests, and observable business signals over 30 days.",
  },
  {
    q: "Why you instead of a general agency?",
    a: "You keep one direct point of contact, focused design/dev execution, and the technical setup handled without agency heaviness.",
  },
];

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const en = isEnglish(locale);

  return {
    title: en ? "About, methodology and proof" : "À propos, méthodologie et preuves",
    description: en
      ? "Discover the Rayan Studio method for website redesign, technical launch, and trust signals for small businesses."
      : "Découvrez la méthode Rayan Studio pour refondre un site, gérer la mise en ligne technique et rassurer les petites entreprises.",
    alternates: {
      canonical: `/${locale}/a-propos-methodologie-preuves`,
      languages: {
        fr: "/fr/a-propos-methodologie-preuves",
        en: "/en/a-propos-methodologie-preuves",
      },
    },
  };
}

export default function AboutMethodPage({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;

  if (params.locale !== locale) {
    redirect(`/${locale}/a-propos-methodologie-preuves`);
  }

  const en = isEnglish(locale);
  const faq = en ? faqEn : faqFr;
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}#professional-service`,
        name: BRAND.name,
        url: `${siteUrl}/${locale}`,
        email: BRAND.email,
        telephone: BRAND.phoneRaw,
        areaServed: "France",
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}#local-business`,
        name: BRAND.name,
        url: `${siteUrl}/${locale}`,
        email: BRAND.email,
        telephone: BRAND.phoneRaw,
        founder: BRAND.founder,
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}#service-offer`,
        serviceType: en ? "Premium showcase website creation and redesign" : "Création et refonte de sites vitrines premium",
        provider: { "@id": `${siteUrl}#professional-service` },
        areaServed: "France",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/${locale}/a-propos-methodologie-preuves#faq`,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen px-4 pb-14 pt-28 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-5xl">
        <p className="inline-flex rounded-none border border-[#2a231d]/14 bg-[#fffaf0] px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#d94f2b] shadow-[3px_3px_0_rgba(42,35,29,0.08)]">
          {BRAND.name}
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold text-[#17120f] md:text-5xl">
          {en ? "About / Methodology / Proof" : "À propos / Méthodologie / Preuves"}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[#63584d]">
          {en
            ? "I redesign dated websites and create first proper websites for small businesses. Goal: clarify the offer, strengthen trust, handle the technical launch, and convert more visitors into qualified inquiries."
            : "Je refonds les sites datés et je crée les premiers vrais sites pour petites entreprises. Objectif: clarifier l'offre, renforcer la confiance, gérer la mise en ligne technique et transformer plus de visiteurs en demandes qualifiées."}
        </p>

        <section className="mt-8 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/86 p-5 shadow-[7px_7px_0_rgba(42,35,29,0.08)]">
          <h2 className="font-display text-2xl font-semibold text-[#17120f]">{en ? "Methodology" : "Méthodologie"}</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#63584d]">
            <li>{en ? "1. Perception + conversion diagnosis of your current website." : "1. Diagnostic perception + conversion du site actuel."}</li>
            <li>{en ? "2. Structure and visual direction adapted to your business." : "2. Structure et direction visuelle adaptées à votre activité."}</li>
            <li>{en ? "3. UX redesign to make key actions immediate." : "3. Refonte UX pour rendre les actions clés immédiates."}</li>
            <li>{en ? "4. SEO, DNS, hosting/VPS and deployment handled." : "4. SEO, DNS, hébergement/VPS et déploiement pris en charge."}</li>
          </ul>
        </section>

        <section className="mt-6 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/86 p-5 shadow-[7px_7px_0_rgba(42,35,29,0.08)]">
          <h2 className="font-display text-2xl font-semibold text-[#17120f]">{en ? "Proof" : "Preuves"}</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#63584d]">
            <li>
              {en
                ? "Independent hotel: +41% inquiries (January 2026, source: form leads)."
                : "Hôtel indépendant: +41% de demandes (janvier 2026, source leads formulaires)."}
            </li>
            <li>
              {en
                ? "Neighborhood cafe: +24 WhatsApp messages (December 2025, WhatsApp Business export)."
                : "Café de quartier: +24 messages WhatsApp (décembre 2025, export WhatsApp Business)."}
            </li>
            <li>
              {en
                ? "Artisan bakery: +26% orders/catering requests (February 2026)."
                : "Boulangerie artisanale: +26% de commandes/demandes traiteur (février 2026)."}
            </li>
          </ul>
        </section>

        <section className="mt-6 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/86 p-5 shadow-[7px_7px_0_rgba(42,35,29,0.08)]">
          <h2 className="font-display text-2xl font-semibold text-[#17120f]">{en ? "FAQ (Q/A format)" : "FAQ (format Q/R)"}</h2>
          <div className="mt-4 space-y-3">
            {faq.map((item) => (
              <article key={item.q} className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] p-4">
                <p className="text-sm font-semibold text-[#17120f]">{item.q}</p>
                <p className="mt-2 text-sm text-[#63584d]">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/86 p-5 shadow-[7px_7px_0_rgba(42,35,29,0.08)]">
          <h2 className="font-display text-2xl font-semibold text-[#17120f]">
            {en ? "External authority & consistency" : "Autorité externe & cohérence"}
          </h2>
          <p className="mt-3 text-sm text-[#63584d]">
            {en
              ? `The same brand information is used across the entire site and in structured schema: ${BRAND.name}, ${BRAND.email}, ${BRAND.phoneDisplay}, ${siteUrl}.`
              : `Les mêmes informations de marque sont utilisées sur tout le site et dans les schémas structurés: ${BRAND.name}, ${BRAND.email}, ${BRAND.phoneDisplay}, ${siteUrl}.`}
          </p>
          <p className="mt-2 text-sm text-[#63584d]">
            {en ? "Direct contact:" : "Contact direct:"}{" "}
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#d94f2b] underline">
              WhatsApp
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
