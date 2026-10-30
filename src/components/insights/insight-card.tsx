import Image from "next/image";
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

// Decorative covers, one per insight so the grid never repeats the same photo side by side.
const INSIGHT_IMAGES: Record<string, string> = {
  "prepare-saas": "/images/devices.webp",
  "mvp-v1": "/images/wireframe.webp",
  "no-code-saas-custom": "/images/code.webp",
  "application-launch-checklist": "/services/devops.webp",
  "legacy-redesign-checklist": "/services/web.webp",
  "redesign-or-new": "/images/desk-night.webp",
  "cra-reporting-checklist": "/services/cra.webp",
  "project-brief-template": "/images/notebook.webp",
};

const CATEGORY_IMAGES: Record<string, string> = {
  articles: "/images/code.webp",
  guides: "/images/wireframe.webp",
  checklists: "/images/desk-night.webp",
  templates: "/images/notebook.webp",
  tools: "/images/network-cubes.webp",
};

function coverFor(insight: InsightRecord) {
  return INSIGHT_IMAGES[insight.key] ?? CATEGORY_IMAGES[insight.category] ?? "/images/lines-blue.webp";
}

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
        "group flex flex-col overflow-hidden rounded-[var(--rs-radius-md)] border bg-rs-surface transition-colors duration-150 hover:border-rs-accent",
        featured ? "border-[var(--rs-border-strong)]" : "border-[var(--rs-border)]",
      )}
    >
      <div className={cn("relative overflow-hidden bg-[var(--rs-dark)]", featured ? "aspect-[2/1] lg:aspect-auto lg:min-h-[18rem] lg:flex-1" : "aspect-[3/1]")}>
        <Image
          src={coverFor(insight)}
          alt=""
          fill
          sizes={featured ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className={cn("flex flex-col p-6", !featured && "flex-1")}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
          {CATEGORY_LABELS[insight.category][locale]}
        </p>
        <p className={cn("mt-3 font-semibold leading-snug", featured ? "text-2xl" : "text-xl")}>
          {insight.title[locale]}
        </p>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-rs-muted">
          {insight.description[locale]}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rs-accent-fg">
          {fr ? "Lire" : "Read"}
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
