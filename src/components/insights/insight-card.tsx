import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InsightRecord } from "@/content/insights";
import type { Locale } from "@/lib/i18n";
import { insightPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  articles: { fr: "Article", en: "Article" },
  guides: { fr: "Guide", en: "Guide" },
  checklists: { fr: "Checklist", en: "Checklist" },
  templates: { fr: "Template", en: "Template" },
  tools: { fr: "Outil", en: "Tool" },
};

export function InsightCard({
  locale,
  insight,
  featured = false,
}: {
  locale: Locale;
  insight: InsightRecord;
  featured?: boolean;
}) {
  const fr = locale === "fr";

  return (
    <Link
      href={insightPath(locale, insight.category, insight.slug[locale])}
      data-featured-insight={featured ? insight.key : undefined}
      className={cn(
        "group flex flex-col rounded-[var(--rs-radius-md)] border bg-rs-surface p-6 transition-colors duration-150 hover:border-rs-accent",
        featured ? "border-[var(--rs-border-strong)]" : "border-[var(--rs-border)]",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
        {CATEGORY_LABELS[insight.category][locale]}
      </p>
      <p className={cn("mt-3 font-semibold leading-snug", featured ? "text-2xl" : "text-xl")}>
        {insight.title[locale]}
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-rs-muted">
        {insight.description[locale]}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rs-accent">
        {fr ? "Lire" : "Read"}
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
