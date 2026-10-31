"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getProject, type ProjectKey, type ProjectRecord } from "@/content/projects";
import { WORK_FILTERS, type WorkFilter } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { ProductCarousel } from "./product-carousel";
import { StatusBadge, StatusPill } from "./status-badge";

type Filter = "all" | WorkFilter;

const FILTERS: Array<{ id: Filter; label: Record<Locale, string> }> = [
  { id: "all", label: { fr: "Tous les projets", en: "All projects" } },
  { id: "apps", label: { fr: "Applications & SaaS", en: "Applications & SaaS" } },
  { id: "web", label: { fr: "Sites & design", en: "Websites & design" } },
  { id: "ai", label: { fr: "IA", en: "AI" } },
  { id: "devops", label: { fr: "DevOps", en: "DevOps" } },
];

// Products shown one at a time in the carousel, flagship first.
const PRODUCTS: ProjectKey[] = ["pick4me", "pont-facturx", "goodcall", "docextract", "manteigaria"];
const TECHNICAL: ProjectKey[] = ["ops-knowledge-agent", "ci-cd-platform", "product-infrastructure"];

function matches(key: string, filter: Filter) {
  return filter === "all" || (WORK_FILTERS[key] ?? []).includes(filter);
}

function project(key: ProjectKey) {
  return getProject(key) as ProjectRecord;
}

export function WorkPortfolio({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [filter, setFilter] = useState<Filter>("all");
  const products = PRODUCTS.filter((key) => matches(key, filter));
  const indexed = [...PRODUCTS, ...TECHNICAL].filter((key) => matches(key, filter)).map(project);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={fr ? "Filtrer les réalisations" : "Filter the work"} className="flex flex-wrap border-b border-rs-fg">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "px-5 py-3 text-sm font-semibold transition-colors duration-150",
                filter === item.id ? "bg-rs-fg text-rs-bg" : "text-rs-muted hover:text-rs-fg",
              )}
            >
              {item.label[locale]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill tone="live">{fr ? "Produit en ligne" : "Live product"}</StatusPill>
          <StatusPill tone="concept">Concept</StatusPill>
          <StatusPill tone="tech">{fr ? "Projet technique" : "Technical project"}</StatusPill>
          <StatusPill tone="mission">{fr ? "Mission client" : "Client engagement"}</StatusPill>
        </div>
      </div>

      <div className="mt-8">
        <ProductCarousel key={products.join("-")} locale={locale} keys={products} featuredAttr="data-work-project" peek />
      </div>

      {indexed.length > 0 ? (
        <section className="mt-16" aria-labelledby="index-projets">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">{fr ? "Index des projets" : "Project index"}</p>
              <h2 id="index-projets" className="mt-3 text-[1.75rem] font-semibold tracking-tight md:text-4xl">
                {fr ? "Tous les projets, IA, DevOps et infrastructure compris." : "Every project, AI, DevOps and infrastructure included."}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-rs-muted">
              {fr
                ? "Chaque ligne indique ce que le projet est réellement : produit en ligne, démonstrateur, mission client ou concept."
                : "Each row states what the project really is: live product, demonstrator, client engagement or concept."}
            </p>
          </div>
          <table className="mt-8 w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rs-fg text-xs font-semibold uppercase tracking-[0.16em] text-rs-muted">
                <th scope="col" className="py-3 pr-4 font-semibold">{fr ? "Projet" : "Project"}</th>
                <th scope="col" className="hidden py-3 pr-4 font-semibold md:table-cell">Type</th>
                <th scope="col" className="hidden py-3 pr-4 font-semibold lg:table-cell">Stack</th>
                <th scope="col" className="py-3 font-semibold">{fr ? "Statut" : "Status"}</th>
              </tr>
            </thead>
            <tbody>
              {indexed.map((p) => (
                <tr key={p.key} className="group border-b border-[var(--rs-border)]">
                  <td className="py-5 pr-4">
                    <Link
                      href={workPath(locale, p.slug)}
                      className="inline-flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-rs-accent-fg md:text-2xl"
                    >
                      {p.title}
                      <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-rs-muted group-hover:text-rs-accent-fg" />
                    </Link>
                  </td>
                  <td className="hidden py-5 pr-4 text-sm text-rs-muted md:table-cell">{p.categories[locale].slice(0, 2).join(" · ")}</td>
                  <td className="hidden py-5 pr-4 text-sm lg:table-cell">{p.technologies.slice(0, 3).join(" · ")}</td>
                  <td className="py-5">
                    <StatusBadge project={p} locale={locale} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </div>
  );
}
