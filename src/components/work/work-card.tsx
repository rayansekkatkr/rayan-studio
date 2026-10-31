import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { projectImageAlt, projectStatusBadge } from "./project-labels";

const TONE_DOT: Record<string, string> = {
  live: "text-[#136b33] before:bg-[#22a05a]",
  concept: "text-[#8a4f0e] before:bg-[#d98a2b]",
  tech: "text-[#4644b8] before:bg-[#5957d9]",
  mission: "text-[#2b527e] before:bg-[#3f78b5]",
};

/** Small status line used across direction A: a coloured dot and a short label. */
export function StatusDot({ project, locale, className, long = false }: { project: ProjectRecord; locale: Locale; className?: string; long?: boolean }) {
  const status = projectStatusBadge(project, locale);
  // `long`: concepts show their full honest label ("Concept, refonte non commandée").
  const label = long && project.kind === "concept" && project.status ? project.status[locale] : status.label;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[13px] font-semibold before:h-1.5 before:w-1.5 before:rounded-full before:content-['']",
        TONE_DOT[status.tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

export function WorkCard({
  p,
  locale,
  featured,
  featuredAttr = "data-featured-project",
  heightClass,
  label,
}: {
  p: ProjectRecord;
  locale: Locale;
  featured?: boolean;
  featuredAttr?: "data-featured-project" | "data-work-project";
  heightClass: string;
  /** Replaces the first category, e.g. an honest label on a landing page. */
  label?: string;
}) {
  return (
    <Link
      href={workPath(locale, p.slug)}
      {...(featured ? { [featuredAttr]: p.key } : {})}
      className="group block"
    >
      <span data-project-media className={cn("relative block overflow-hidden bg-rs-subtle", heightClass)}>
        <Image
          src={p.heroImage}
          alt={projectImageAlt(p, locale)}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </span>
      <span data-project-copy className="flex flex-wrap items-baseline justify-between gap-3 pt-4">
        <span className="inline-flex items-center gap-2 text-2xl font-bold tracking-[-0.03em] group-hover:text-rs-accent-fg md:text-[1.75rem]">
          {p.title}
          <ArrowUpRight aria-hidden className="h-5 w-5 opacity-40 transition-opacity group-hover:opacity-100" />
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <span className="border border-[var(--rs-border)] px-2.5 py-1 text-[13px] font-medium">{label ?? p.categories[locale][0]}</span>
          <StatusDot project={p} locale={locale} long />
        </span>
      </span>
    </Link>
  );
}


const PLATFORMS: Partial<Record<string, Record<Locale, string>>> = {
  pick4me: { fr: "iOS · Android · web", en: "iOS · Android · web" },
  "pont-facturx": { fr: "SaaS B2B", en: "B2B SaaS" },
  goodcall: { fr: "Mobile et web", en: "Mobile and web" },
  docextract: { fr: "SaaS B2B", en: "B2B SaaS" },
};

/** Full-width project, used for the flagship of a list (home, work page). */
export function FeatureProject({
  p,
  locale,
  featured = true,
  featuredAttr = "data-featured-project",
  priority = false,
}: {
  p: ProjectRecord;
  locale: Locale;
  featured?: boolean;
  featuredAttr?: "data-featured-project" | "data-work-project";
  priority?: boolean;
}) {
  return (
    <Link
      href={workPath(locale, p.slug)}
      {...(featured ? { [featuredAttr]: p.key } : {})}
      className="group relative block h-[26rem] overflow-hidden bg-rs-subtle md:h-[40rem]"
    >
      <span data-project-media className="absolute inset-0">
        <Image
          src={p.heroImage}
          alt={projectImageAlt(p, locale)}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.015]"
        />
      </span>
      {p.heroCompanion ? (
        <span className="absolute -bottom-10 right-[8%] hidden w-[19%] overflow-hidden rounded-[2.2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] md:block">
          <Image
            src={p.heroCompanion.src}
            alt={p.heroCompanion.alt[locale]}
            width={p.heroCompanion.width}
            height={p.heroCompanion.height}
            sizes="20vw"
            className="h-auto w-full"
          />
        </span>
      ) : null}
      <span data-project-copy className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 bg-rs-bg px-4 py-3 text-sm font-semibold md:bottom-6 md:left-6">
        {p.title}
        <StatusDot project={p} locale={locale} long />
        {PLATFORMS[p.key] ? <span className="font-medium text-rs-muted">{PLATFORMS[p.key]![locale]}</span> : null}
      </span>
    </Link>
  );
}
