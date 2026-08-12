import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FEATURED_INSIGHT, getInsightsByCategory } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { insightPath } from "@/lib/site-routes";
import { InsightCard } from "./insight-card";

export function InsightsIndex({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const guides = getInsightsByCategory("guides").filter((insight) => !insight.featured);
  const articles = getInsightsByCategory("articles");
  const checklists = getInsightsByCategory("checklists");
  const templates = getInsightsByCategory("templates");

  return (
    <div>
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>Insights</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {fr
              ? "Guides, ressources et retours d'expérience pour mieux construire vos produits digitaux."
              : "Guides, resources and practical thinking for building better digital products."}
          </h1>
        </Container>
      </div>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <InsightCard locale={locale} insight={FEATURED_INSIGHT} featured />
            <div className="grid gap-6">
              {[...guides, ...articles].slice(0, 2).map((insight) => (
                <InsightCard key={insight.key} locale={locale} insight={insight} />
              ))}
            </div>
          </div>

          <h2 className="mt-16 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
            {fr ? "Ressources" : "Resources"}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...checklists, ...templates].map((insight) => (
              <InsightCard key={insight.key} locale={locale} insight={insight} />
            ))}
          </div>

          <div className="mt-16 rounded-[var(--rs-radius-lg)] border border-[var(--rs-border)] bg-rs-surface p-8">
            <Eyebrow>{fr ? "Outils" : "Tools"}</Eyebrow>
            <p className="mt-3 text-2xl font-semibold tracking-tight">
              {fr ? "Votre projet est-il prêt ?" : "Is your project ready?"}
            </p>
            <p className="mt-2 max-w-[var(--rs-reading)] text-base leading-relaxed text-rs-muted">
              {fr
                ? "Cinq questions rapides pour savoir si votre projet est prêt pour une discussion produit et technique."
                : "Five quick questions to see whether your project is ready for a product and technical conversation."}
            </p>
            <Link
              href={insightPath(locale, "tools")}
              className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Utiliser l'outil" : "Use the tool"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </div>
  );
}
