import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { FaqPage } from "@/components/studio/faq-page";
import { MethodPage } from "@/components/studio/method-page";
import { OffersPage } from "@/components/studio/offers-page";
import { RayanPage } from "@/components/studio/rayan-page";
import { StudioPage } from "@/components/studio/studio-page";
import { FAQ_CONTENT } from "@/content/studio";
import { getSiteUrl } from "@/lib/brand";
import { SUPPORTED_LOCALES, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildLocalizedMetadata } from "@/lib/seo";
import { resolveStudioSlug, studioPath, type StudioPageKey } from "@/lib/site-routes";

const IMPLEMENTED_KEYS: StudioPageKey[] = ["studio", "rayan", "method", "offers", "faq"];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    IMPLEMENTED_KEYS.map((key) => ({ locale, slug: studioPath(locale, key).split("/").pop() as string })),
  );
}

const PAGE_META: Record<StudioPageKey, Record<Locale, { title: string; description: string }>> = {
  studio: {
    fr: {
      title: "Rayan Studio, studio indépendant",
      description:
        "Un studio indépendant pour concevoir, construire et faire évoluer des produits digitaux. Moins d'intermédiaires, plus de continuité.",
    },
    en: {
      title: "Rayan Studio, independent studio",
      description:
        "An independent studio to design, build and evolve digital products. Fewer intermediaries, more continuity.",
    },
  },
  rayan: {
    fr: {
      title: "Rayan Sekkat, Software Engineer & Founder",
      description:
        "Ingénieur logiciel full-stack et fondateur de Rayan Studio : applications web, SaaS, sites premium et DevOps.",
    },
    en: {
      title: "Rayan Sekkat, Software Engineer & Founder",
      description:
        "Full-stack software engineer and founder of Rayan Studio: web applications, SaaS, premium websites and DevOps.",
    },
  },
  method: {
    fr: {
      title: "Notre méthode",
      description:
        "Discover, Design, Build, Launch, Improve : une méthode en cinq étapes, du cadrage à la mise en production.",
    },
    en: {
      title: "Our method",
      description:
        "Discover, Design, Build, Launch, Improve: a five-stage method from framing to production.",
    },
  },
  offers: {
    fr: {
      title: "Offres",
      description:
        "Applications, MVP, sites premium et accompagnement continu : des engagements construits autour du périmètre réel de votre projet.",
    },
    en: {
      title: "Offers",
      description:
        "Applications, MVP, premium websites and ongoing partnership: engagements built around the real scope of your project.",
    },
  },
  faq: {
    fr: {
      title: "FAQ",
      description:
        "Reprise de projet, propriété du code, hébergement, devis, démarrage : les réponses aux questions fréquentes.",
    },
    en: {
      title: "FAQ",
      description:
        "Project takeover, code ownership, hosting, quotes, getting started: answers to frequent questions.",
    },
  },
};

function buildFaqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CONTENT[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const key = resolveStudioSlug(locale, p.slug);
  if (!key) return {};
  const meta = PAGE_META[key][locale];
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return buildLocalizedMetadata({
    locale,
    title: meta.title,
    description: meta.description,
    path: studioPath(locale, key),
    alternatePath: studioPath(otherLocale, key),
  });
}

const PAGES: Record<StudioPageKey, (locale: Locale) => React.ReactNode> = {
  studio: (locale) => <StudioPage locale={locale} />,
  rayan: (locale) => <RayanPage locale={locale} />,
  method: (locale) => <MethodPage locale={locale} />,
  offers: (locale) => <OffersPage locale={locale} />,
  faq: (locale) => <FaqPage locale={locale} />,
};

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const key = resolveStudioSlug(locale, p.slug);
  if (!key) notFound();
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: fr ? "Accueil" : "Home", path: `${siteUrl}/${locale}` },
    { name: "Studio", path: `${siteUrl}${studioPath(locale, "studio")}` },
    { name: PAGE_META[key][locale].title, path: `${siteUrl}${studioPath(locale, key)}` },
  ]);

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {key === "faq" ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(locale)) }}
        />
      ) : null}
      {PAGES[key](locale)}
    </CommercialPageShell>
  );
}
