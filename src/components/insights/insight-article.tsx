import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { INSIGHTS, type InsightRecord } from "@/content/insights";
import { getService } from "@/content/services";
import type { Locale } from "@/lib/i18n";
import { insightPath, servicePath, startProjectPath } from "@/lib/site-routes";
import { InsightBlocks } from "./insight-blocks";
import { InsightCard } from "./insight-card";

function relatedInsights(current: InsightRecord): InsightRecord[] {
  const sameCategory = INSIGHTS.filter(
    (insight) => insight.key !== current.key && insight.category === current.category,
  );
  const sameService = INSIGHTS.filter(
    (insight) =>
      insight.key !== current.key &&
      insight.category !== current.category &&
      insight.relatedService === current.relatedService,
  );
  return [...sameCategory, ...sameService].slice(0, 3);
}

export function InsightArticle({ locale, insight }: { locale: Locale; insight: InsightRecord }) {
  const fr = locale === "fr";
  const service = getService(insight.relatedService);
  const related = relatedInsights(insight);

  return (
    <article>
      <div className="rs-theme-dark bg-rs-bg pb-14 pt-32 text-rs-fg md:pb-16 md:pt-40">
        <Container>
          <Eyebrow>Insights</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {insight.title[locale]}
          </h1>
          <p className="mt-5 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {insight.description[locale]}
          </p>
          <p className="mt-4 text-sm text-rs-muted">
            {fr ? "Publié le " : "Published "}
            {insight.publishedAt}
          </p>
        </Container>
      </div>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="max-w-[var(--rs-reading)]">
            <InsightBlocks blocks={insight.blocks[locale]} />
          </div>

          <footer className="mt-16 border-t border-[var(--rs-border)] pt-10">
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href={servicePath(locale, insight.relatedService)}
                className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
              >
                {fr ? `Service lié : ${service.eyebrow.fr}` : `Related service: ${service.eyebrow.en}`}
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link
                href={startProjectPath(locale)}
                className="inline-flex items-center gap-2 rounded-full bg-rs-fg px-6 py-3 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
              >
                {fr ? "Parler de votre projet" : "Start a project"}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>

            {related.length > 0 ? (
              <div className="mt-12">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                  {fr ? "À lire ensuite" : "Read next"}
                </h2>
                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  {related.map((item) => (
                    <InsightCard key={item.key} locale={locale} insight={item} />
                  ))}
                </div>
              </div>
            ) : null}

            <p className="mt-10">
              <Link
                href={insightPath(locale)}
                className="text-sm font-medium text-rs-muted transition-colors duration-150 hover:text-rs-fg"
              >
                {fr ? "Tous les insights" : "All insights"}
              </Link>
            </p>
          </footer>
        </Container>
      </div>
    </article>
  );
}
