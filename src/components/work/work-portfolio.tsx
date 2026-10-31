"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { getProject, type ProjectKey, type ProjectRecord } from "@/content/projects";
import { WORK_FILTERS, type WorkFilter } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { projectImageAlt } from "./project-labels";
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

function TechCard({ p, locale }: { p: ProjectRecord; locale: Locale }) {
  return (
    <Link
      href={workPath(locale, p.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface transition-colors duration-200 hover:border-[var(--rs-border-strong)]"
    >
      <span className="relative block aspect-[16/9] overflow-hidden bg-[var(--rs-dark)]">
        <Image
          src={p.heroImage}
          alt={projectImageAlt(p, locale)}
          fill
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </span>
      <span className="flex flex-1 flex-col p-6">
        <span className="flex items-center gap-2">
          <StatusBadge project={p} locale={locale} suffix={p.year} />
        </span>
        <span className="mt-3 flex items-center justify-between gap-3 text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-rs-accent-fg">
          {p.title}
          <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-rs-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rs-accent-fg" />
        </span>
        <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-rs-muted">{p.summary[locale]}</span>
        <span className="mt-3 block text-xs font-medium text-rs-muted">{p.role[locale]}</span>
        <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {p.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-none bg-rs-bg px-2.5 py-1 text-[11px] font-medium">
              {tech}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

export function WorkPortfolio({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [filter, setFilter] = useState<Filter>("all");
  const products = PRODUCTS.filter((key) => matches(key, filter));
  const technical = TECHNICAL.filter((key) => matches(key, filter)).map(project);

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={fr ? "Filtrer les réalisations" : "Filter the work"} className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-none px-4 py-2.5 text-sm font-medium transition-colors duration-150",
                filter === item.id
                  ? "bg-rs-fg text-rs-bg"
                  : "border border-[var(--rs-border)] bg-rs-surface hover:border-[var(--rs-border-strong)]",
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
        <ProductCarousel key={products.join("-")} locale={locale} keys={products} featuredAttr="data-work-project" />
      </div>

      {technical.length > 0 ? (
        <div className="mt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {fr ? "Projets techniques" : "Technical projects"}
              </p>
              <h2 className="mt-3 text-[1.75rem] font-semibold tracking-tight md:text-4xl">
                {fr ? "Derrière les écrans : IA, DevOps et infrastructure" : "Behind the screens: AI, DevOps and infrastructure"}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-rs-muted">
              {fr
                ? "IA, CI/CD et infrastructure : les projets qui montrent comment le studio met en production."
                : "AI, CI/CD and infrastructure: the projects that show how the studio ships to production."}
            </p>
          </div>
          <div className={cn("mt-8 grid gap-6 md:grid-cols-2", technical.length >= 3 && "lg:grid-cols-3")}>
            {technical.map((p) => (
              <TechCard key={p.key} p={p} locale={locale} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
