import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getInsight } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { insightPath } from "@/lib/site-routes";

const KIND_LABELS = { guides: "Guide", articles: "Article", checklists: "Checklist", templates: "Template", tools: "Tool" } as const;

export function InsightsPreview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const entries = (["prepare-saas", "application-launch-checklist", "redesign-or-new"] as const).map(
    (key, index) => {
      const insight = getInsight(key);
      return {
        kind: KIND_LABELS[insight.category as keyof typeof KIND_LABELS],
        title: insight.title[locale],
        href: insightPath(locale, insight.category, insight.slug[locale]),
        featured: index === 0,
      };
    },
  );

  return (
    <div className="bg-rs-bg py-[var(--rs-section-space)]">
      <Container>
        <Eyebrow>Insights</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {fr ? "Des ressources utiles avant de vous lancer." : "Useful resources before you start."}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {entries.map((entry) => (
            <TrackedLink
              key={entry.title}
              href={entry.href}
              event={{
                ctaId: "home_insights",
                source: "home_insights_preview",
                destination: entry.href,
                locale,
              }}
              className={
                entry.featured
                  ? "group rounded-[var(--rs-radius-md)] border border-[var(--rs-border-strong)] bg-rs-surface p-6 transition-colors duration-150 hover:border-rs-accent md:row-span-2"
                  : "group rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 transition-colors duration-150 hover:border-rs-accent"
              }
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">{entry.kind}</p>
              <p className="mt-3 text-xl font-semibold leading-snug">{entry.title}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rs-accent">
                {fr ? "Lire" : "Read"}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </TrackedLink>
          ))}
        </div>
      </Container>
    </div>
  );
}
