import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { isEnglish, normalizeLocale, type Locale } from "@/lib/i18n";

const faqFr = [
  {
    q: "Qui accompagnez-vous ?",
    a: "J'accompagne principalement les commerces locaux: restaurants, cafés, hôtels, boulangeries, pâtisseries, bars et commerces de proximité.",
  },
  {
    q: "Quelle est votre méthode ?",
    a: "Audit de perception, direction visuelle, refonte UX orientée conversion, puis mise en ligne avec suivi de performance.",
  },
  {
    q: "Comment mesurez-vous les résultats ?",
    a: "Je mesure les demandes entrantes, les clics WhatsApp, les prises de contact et les signaux business observables sur 30 jours.",
  },
  {
    q: "Pourquoi vous plutôt qu'une agence généraliste ?",
    a: "Positionnement focalisé commerces locaux + exécution design/dev premium + accompagnement direct avec un interlocuteur unique.",
  },
];

const faqEn = [
  {
    q: "Who do you support?",
    a: "I mainly support local businesses: restaurants, cafes, hotels, bakeries, pastry shops, bars, and neighborhood businesses.",
  },
  {
    q: "What is your method?",
    a: "Perception audit, visual direction, conversion-focused UX redesign, then launch with performance follow-up.",
  },
  {
    q: "How do you measure results?",
    a: "I track inbound inquiries, WhatsApp clicks, contact requests, and observable business signals over 30 days.",
  },
  {
    q: "Why you instead of a general agency?",
    a: "Local-business focus + premium design/dev execution + direct support with one single point of contact.",
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
      ? "Discover the Rayan Studio method, proof of results, and trust signals for local businesses."
      : "Découvrez la méthode Rayan Studio, les preuves de résultats et les éléments de confiance pour les commerces locaux.",
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
        <p className="inline-flex rounded-full border border-[#d6e6ff] bg-[#eef5ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
          {BRAND.name}
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold text-slate-900 md:text-5xl">
          {en ? "About / Methodology / Proof" : "À propos / Méthodologie / Preuves"}
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-600">
          {en
            ? "I design premium showcase websites for French local businesses. Goal: clarify your offer, strengthen trust, and convert more visitors into qualified inquiries."
            : "Je conçois des sites vitrines premium pour commerces locaux français. Mon objectif: clarifier l'offre, renforcer la confiance et transformer plus de visiteurs en demandes qualifiées."}
        </p>

        <section className="mt-8 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_20px_36px_rgba(121,156,214,0.18)]">
          <h2 className="font-display text-2xl font-semibold text-slate-900">{en ? "Methodology" : "Méthodologie"}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>{en ? "1. Perception + conversion audit of your current website." : "1. Audit perception + conversion du site actuel."}</li>
            <li>{en ? "2. Premium visual direction adapted to your business type." : "2. Direction visuelle premium adaptée à ton secteur."}</li>
            <li>{en ? "3. UX redesign to make key actions immediate." : "3. Refonte UX pour rendre les actions clés immédiates."}</li>
            <li>{en ? "4. Deployment and conversion signal follow-up." : "4. Déploiement et suivi des signaux de conversion."}</li>
          </ul>
        </section>

        <section className="mt-6 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_20px_36px_rgba(121,156,214,0.18)]">
          <h2 className="font-display text-2xl font-semibold text-slate-900">{en ? "Proof" : "Preuves"}</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
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

        <section className="mt-6 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_20px_36px_rgba(121,156,214,0.18)]">
          <h2 className="font-display text-2xl font-semibold text-slate-900">{en ? "FAQ (Q/A format)" : "FAQ (format Q/R)"}</h2>
          <div className="mt-4 space-y-3">
            {faq.map((item) => (
              <article key={item.q} className="rounded-2xl border border-white/90 bg-white/88 p-4">
                <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_20px_36px_rgba(121,156,214,0.18)]">
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            {en ? "External authority & consistency" : "Autorité externe & cohérence"}
          </h2>
          <p className="mt-3 text-sm text-slate-700">
            {en
              ? `The same brand information is used across the entire site and in structured schema: ${BRAND.name}, ${BRAND.email}, ${BRAND.phoneDisplay}, ${siteUrl}.`
              : `Les mêmes informations de marque sont utilisées sur tout le site et dans les schémas structurés: ${BRAND.name}, ${BRAND.email}, ${BRAND.phoneDisplay}, ${siteUrl}.`}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            {en ? "Direct contact:" : "Contact direct:"}{" "}
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#2f6dff] underline">
              WhatsApp
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
