import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { RayanPage } from "@/components/studio/rayan-page";
import { StudioPage } from "@/components/studio/studio-page";
import { SUPPORTED_LOCALES, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";
import { resolveStudioSlug, studioPath, type StudioPageKey } from "@/lib/site-routes";

// Lot 02 Task 4 boundary: only the studio and rayan keys ship here.
// Task 5 extends this list atomically once Method, Offers and FAQ components exist.
const IMPLEMENTED_KEYS: StudioPageKey[] = ["studio", "rayan"];

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    IMPLEMENTED_KEYS.map((key) => ({ locale, slug: studioPath(locale, key).split("/").pop() as string })),
  );
}

const TITLES: Record<"studio" | "rayan", Record<Locale, { title: string; description: string }>> = {
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
};

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const key = resolveStudioSlug(locale, params.slug);
  if (!key || !IMPLEMENTED_KEYS.includes(key)) return {};
  const meta = TITLES[key as "studio" | "rayan"][locale];
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return buildLocalizedMetadata({
    locale,
    title: meta.title,
    description: meta.description,
    path: studioPath(locale, key),
    alternatePath: studioPath(otherLocale, key),
  });
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;
  const key = resolveStudioSlug(locale, params.slug);
  if (!key || !IMPLEMENTED_KEYS.includes(key)) notFound();

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      {key === "studio" ? <StudioPage locale={locale} /> : <RayanPage locale={locale} />}
    </CommercialPageShell>
  );
}
