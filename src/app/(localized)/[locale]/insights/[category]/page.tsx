import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { InsightCard } from "@/components/insights/insight-card";
import { ProjectReadinessTool } from "@/components/insights/project-readiness-tool";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getInsightsByCategory } from "@/content/insights";
import { SUPPORTED_LOCALES, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";
import {
  insightPath,
  resolveInsightCategorySlug,
  type InsightCategoryKey,
} from "@/lib/site-routes";

const CATEGORIES: InsightCategoryKey[] = ["articles", "guides", "checklists", "templates", "tools"];

const CATEGORY_META: Record<InsightCategoryKey, Record<Locale, { title: string; description: string }>> = {
  articles: {
    fr: { title: "Articles", description: "Analyses et points de vue concrets sur la conception et la refonte de produits digitaux." },
    en: { title: "Articles", description: "Concrete analysis and viewpoints on designing and rebuilding digital products." },
  },
  guides: {
    fr: { title: "Guides pratiques", description: "Des guides concrets pour préparer un SaaS, cadrer un MVP et choisir la bonne approche." },
    en: { title: "Practical guides", description: "Concrete guides to prepare a SaaS, frame an MVP and choose the right approach." },
  },
  checklists: {
    fr: { title: "Checklists", description: "Des checklists actionnables pour lancer une application ou refondre un site sans rien oublier." },
    en: { title: "Checklists", description: "Actionable checklists to launch an application or redesign a website without missing anything." },
  },
  templates: {
    fr: { title: "Templates", description: "Des trames prêtes à copier pour cadrer vos projets digitaux." },
    en: { title: "Templates", description: "Ready-to-copy templates to frame your digital projects." },
  },
  tools: {
    fr: { title: "Outils", description: "Des outils légers et gratuits pour évaluer la préparation de votre projet." },
    en: { title: "Tools", description: "Light, free tools to assess how prepared your project is." },
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    CATEGORIES.map((category) => ({
      locale,
      category: insightPath(locale, category).split("/").pop() as string,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const category = resolveInsightCategorySlug(locale, p.category);
  if (!category) return {};
  const meta = CATEGORY_META[category][locale];
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return buildLocalizedMetadata({
    locale,
    title: meta.title,
    description: meta.description,
    path: insightPath(locale, category),
    alternatePath: insightPath(otherLocale, category),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string; category: string }> }) {
  const p = await params;
  const locale = normalizeLocale(p.locale) as Locale;
  const category = resolveInsightCategorySlug(locale, p.category);
  if (!category) notFound();
  const fr = locale === "fr";
  const meta = CATEGORY_META[category][locale];
  const insights = getInsightsByCategory(category);

  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Insights</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {meta.description}
          </p>
        </Container>
      </div>
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          {category === "tools" ? (
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {fr ? "Votre projet est-il prêt ?" : "Is your project ready?"}
              </h2>
              <p className="mt-2 max-w-[var(--rs-reading)] text-base leading-relaxed text-rs-muted">
                {fr
                  ? "Répondez à cinq questions pour situer la préparation de votre projet. Rien n'est enregistré."
                  : "Answer five questions to see how prepared your project is. Nothing is stored."}
              </p>
              <div className="mt-8">
                <ProjectReadinessTool locale={locale} />
              </div>
              <h2 className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {fr ? "Guides utiles" : "Useful guides"}
              </h2>
              <div className="mt-5 grid gap-6 md:grid-cols-3">
                {getInsightsByCategory("guides").map((insight) => (
                  <InsightCard key={insight.key} locale={locale} insight={insight} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <InsightCard key={insight.key} locale={locale} insight={insight} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </CommercialPageShell>
  );
}
