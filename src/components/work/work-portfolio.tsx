"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, type ProjectKey, type ProjectRecord } from "@/content/projects";
import { WORK_FILTERS, WORK_PLATFORMS, WORK_THEMES, type WorkFilter } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { projectImageAlt } from "./project-labels";
import { StatusBadge, StatusPill } from "./status-badge";

type Filter = "all" | WorkFilter;

const FILTERS: Array<{ id: Filter; label: Record<Locale, string> }> = [
  { id: "all", label: { fr: "Tous les projets", en: "All projects" } },
  { id: "apps", label: { fr: "Applications & SaaS", en: "Applications & SaaS" } },
  { id: "web", label: { fr: "Sites & design", en: "Websites & design" } },
  { id: "ai", label: { fr: "IA", en: "AI" } },
  { id: "devops", label: { fr: "DevOps", en: "DevOps" } },
];

// Editorial rows: the flagship on its own, then asymmetric pairs, then the technical work.
const ROWS: Array<{ keys: ProjectKey[]; spans: string[] }> = [
  { keys: ["pick4me"], spans: ["lg:col-span-12"] },
  { keys: ["pont-facturx", "goodcall"], spans: ["lg:col-span-7", "lg:col-span-5"] },
  { keys: ["docextract", "manteigaria"], spans: ["lg:col-span-5", "lg:col-span-7"] },
];
const TECHNICAL: ProjectKey[] = ["ops-knowledge-agent", "ci-cd-platform", "product-infrastructure"];
const FEATURED_ATTR: ProjectKey[] = ["pick4me", "pont-facturx", "goodcall"];

function matches(key: string, filter: Filter) {
  return filter === "all" || (WORK_FILTERS[key] ?? []).includes(filter);
}

function project(key: ProjectKey) {
  return getProject(key) as ProjectRecord;
}

function CardTitle({ project: p, light, size }: { project: ProjectRecord; light: boolean; size: "xl" | "lg" }) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 font-bold tracking-tight transition-colors duration-200",
        size === "xl" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
        light ? "group-hover:text-[#b9b8f7]" : "group-hover:text-rs-accent-fg",
      )}
    >
      {p.title}
      <ArrowUpRight
        aria-hidden
        className="h-6 w-6 shrink-0 opacity-50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </span>
  );
}

function Browser({ src, alt, sizes, className, dark }: { src: string; alt: string; sizes: string; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "block overflow-hidden rounded-2xl border shadow-[0_30px_70px_-40px_rgba(9,9,12,0.6)] transition-transform duration-500 ease-out",
        dark ? "border-white/10" : "border-[var(--rs-border)]",
        className,
      )}
    >
      <Image src={src} alt={alt} width={1600} height={900} sizes={sizes} className="block h-auto w-full" />
    </span>
  );
}

function FeatureCard({ p, locale }: { p: ProjectRecord; locale: Locale }) {
  const fr = locale === "fr";
  const theme = WORK_THEMES[p.key];
  return (
    <Link
      href={workPath(locale, p.slug)}
      data-work-project={p.key}
      className="group grid overflow-hidden rounded-[var(--rs-radius-lg)] border border-[var(--rs-border)] p-6 md:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-12 lg:p-14"
      style={{ background: theme?.surface }}
    >
      <span className="block">
        <StatusBadge project={p} locale={locale} suffix={WORK_PLATFORMS[p.key]?.[locale]} />
        <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
          {p.categories[locale].join(" · ")}
        </span>
        <span className="mt-2 block">
          <CardTitle project={p} light={false} size="xl" />
        </span>
        <span className="mt-3 block text-base leading-relaxed text-rs-muted md:text-lg">{p.summary[locale]}</span>
        <span className="mt-5 flex flex-wrap gap-2">
          {p.technologies.slice(0, 5).map((tech) => (
            <span key={tech} className="rounded-full border border-[var(--rs-border)] bg-white/70 px-3 py-1 text-xs font-medium">
              {tech}
            </span>
          ))}
        </span>
        <span className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg">
          {fr ? "Lire l'étude de cas" : "Read the case study"}
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </span>
      <span className="relative mt-10 block lg:mt-0">
        <Browser
          src={p.heroImage}
          alt={projectImageAlt(p, locale)}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="w-[90%] group-hover:scale-[1.015]"
        />
        {p.heroCompanion ? (
          <span className="absolute -bottom-4 right-0 block w-[26%] overflow-hidden rounded-[1.6rem] border border-[var(--rs-border)] shadow-[0_40px_80px_-30px_rgba(9,9,12,0.6)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
            <Image
              src={p.heroCompanion.src}
              alt={p.heroCompanion.alt[locale]}
              width={p.heroCompanion.width}
              height={p.heroCompanion.height}
              sizes="(min-width: 1024px) 16vw, 26vw"
              className="block h-auto w-full"
            />
          </span>
        ) : null}
      </span>
    </Link>
  );
}

function ProductCard({ p, locale, span }: { p: ProjectRecord; locale: Locale; span: string }) {
  const theme = WORK_THEMES[p.key] ?? { surface: "#ffffff", ink: "dark" as const };
  const light = theme.ink === "light";
  const screens = p.screens?.flatMap((group) => group.items) ?? [];
  const attr = FEATURED_ATTR.includes(p.key) ? { "data-work-project": p.key } : {};

  // Concept with a single photo-like capture: full-bleed image, text over a gradient.
  if (p.key === "manteigaria") {
    return (
      <Link
        href={workPath(locale, p.slug)}
        {...attr}
        className={cn("group relative block min-h-[26rem] overflow-hidden rounded-[var(--rs-radius-lg)] md:min-h-[32rem]", span)}
        style={{ background: theme.surface }}
      >
        <Image
          src={p.heroImage}
          alt={projectImageAlt(p, locale)}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover object-left-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(9,9,12,0.92)] via-[rgba(9,9,12,0.3)] to-transparent" />
        <span className="absolute inset-x-6 bottom-6 block text-white md:inset-x-9 md:bottom-8">
          <StatusPill tone="concept">{p.status?.[locale] ?? ""}</StatusPill>
          <span className="mt-3 block">
            <CardTitle project={p} light size="lg" />
          </span>
          <span className="mt-2 block max-w-lg text-base leading-relaxed text-white/80">{p.summary[locale]}</span>
        </span>
      </Link>
    );
  }

  const collage = screens.length >= 3;
  return (
    <Link
      href={workPath(locale, p.slug)}
      {...attr}
      className={cn(
        "group relative flex min-h-[30rem] flex-col overflow-hidden rounded-[var(--rs-radius-lg)] p-7 md:min-h-[35rem] md:p-10",
        !light && theme.surface === "#ffffff" && "border border-[var(--rs-border)]",
        light ? "text-[#f7f7f4]" : "text-rs-fg",
        span,
      )}
      style={{ background: theme.surface }}
    >
      <span className="relative z-10 block">
        <StatusBadge project={p} locale={locale} suffix={WORK_PLATFORMS[p.key]?.[locale]} />
        <span className="mt-4 block">
          <CardTitle project={p} light={light} size="lg" />
        </span>
        <span className={cn("mt-2 block max-w-md text-base leading-relaxed", light ? "text-white/70" : "text-black/65")}>
          {p.summary[locale]}
        </span>
      </span>
      {collage ? (
        <span className="relative mt-8 block flex-1">
          <Browser dark={light} src={screens[0].src} alt={screens[0].alt[locale]} sizes="40vw" className="w-[66%] group-hover:-translate-y-1" />
          <Browser
            dark={light}
            src={screens[2].src}
            alt={screens[2].alt[locale]}
            sizes="30vw"
            className="absolute right-0 top-10 w-[50%] group-hover:-translate-y-2"
          />
          <Browser
            dark={light}
            src={screens[1].src}
            alt={screens[1].alt[locale]}
            sizes="35vw"
            className="absolute -bottom-16 left-[16%] w-[56%] group-hover:-translate-y-1.5"
          />
        </span>
      ) : (
        <span className="relative mt-8 block flex-1">
          <Browser
            dark={light}
            src={(screens[1] ?? screens[0])?.src ?? p.heroImage}
            alt={(screens[1] ?? screens[0])?.alt[locale] ?? projectImageAlt(p, locale)}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="absolute -bottom-12 -right-12 left-0 group-hover:-translate-y-1.5 md:-bottom-16"
          />
        </span>
      )}
    </Link>
  );
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
            <span key={tech} className="rounded-full bg-rs-bg px-2.5 py-1 text-[11px] font-medium">
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
                "rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-150",
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

      <div className="mt-8 space-y-6">
        {ROWS.map((row) => {
          const visible = row.keys.filter((key) => matches(key, filter));
          if (visible.length === 0) return null;
          return (
            <div key={row.keys.join("-")} className="grid gap-6 lg:grid-cols-12">
              {visible.map((key) => {
                const p = project(key);
                if (key === "pick4me") {
                  return (
                    <div key={key} className="lg:col-span-12">
                      <FeatureCard p={p} locale={locale} />
                    </div>
                  );
                }
                const span = visible.length === 1 ? "lg:col-span-12" : row.spans[row.keys.indexOf(key)];
                return <ProductCard key={key} p={p} locale={locale} span={span} />;
              })}
            </div>
          );
        })}
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
