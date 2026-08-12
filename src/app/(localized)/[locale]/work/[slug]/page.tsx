import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { CaseStudyPage } from "@/components/work/case-study-page";
import { ProjectSummaryPage } from "@/components/work/project-summary-page";
import { resolveProjectPage } from "@/components/work/resolve-project-page";
import { PROJECTS } from "@/content/projects";
import { getSiteUrl } from "@/lib/brand";
import { SUPPORTED_LOCALES, normalizeLocale, type Locale } from "@/lib/i18n";
import { buildBreadcrumbJsonLd, buildLocalizedMetadata } from "@/lib/seo";
import { workPath } from "@/lib/site-routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    PROJECTS.map((project) => ({ locale, slug: project.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = normalizeLocale(params.locale) as Locale;
  const resolved = resolveProjectPage(params.slug);
  if (!resolved) return {};
  const { project } = resolved;
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  return buildLocalizedMetadata({
    locale,
    title: `${project.title} | ${project.categories[locale].join(" · ")}`,
    description: project.summary[locale],
    path: workPath(locale, project.slug),
    alternatePath: workPath(otherLocale, project.slug),
    image: project.heroImage,
  });
}

export default function Page({ params }: { params: { locale: string; slug: string } }) {
  const locale = normalizeLocale(params.locale) as Locale;
  const resolved = resolveProjectPage(params.slug);
  if (!resolved) notFound();
  const { kind, project } = resolved;
  const siteUrl = getSiteUrl();
  const fr = locale === "fr";

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: fr ? "Accueil" : "Home", path: `${siteUrl}/${locale}` },
    { name: "Work", path: `${siteUrl}${workPath(locale)}` },
    { name: project.title, path: `${siteUrl}${workPath(locale, project.slug)}` },
  ]);

  return (
    <CommercialPageShell locale={locale} headerTopTheme={kind === "case-study" && project.tone === "dark" ? "dark" : "light"}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {kind === "case-study" ? (
        <CaseStudyPage locale={locale} project={project} />
      ) : (
        <ProjectSummaryPage locale={locale} project={project} />
      )}
    </CommercialPageShell>
  );
}
