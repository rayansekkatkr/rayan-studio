"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, type ProjectKey, type ProjectRecord } from "@/content/projects";
import { WORK_PLATFORMS, WORK_THEMES } from "@/content/visuals";
import type { Locale } from "@/lib/i18n";
import { workPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { projectImageAlt } from "./project-labels";
import { StatusBadge, StatusPill } from "./status-badge";

// Projects that carry the featured data attribute (stable order checked by tests).
const FEATURED_KEYS: ProjectKey[] = ["pick4me", "pont-facturx", "goodcall"];

export function Browser({ src, alt, sizes, className, dark }: { src: string; alt: string; sizes: string; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "block overflow-hidden rounded-none border shadow-[0_30px_70px_-40px_rgba(9,9,12,0.6)] transition-transform duration-500 ease-out",
        dark ? "border-white/10" : "border-[var(--rs-border)]",
        className,
      )}
    >
      <Image src={src} alt={alt} width={1600} height={900} sizes={sizes} className="block h-auto w-full" />
    </span>
  );
}


/** Right-hand visual of a slide, composed from the product's real screens. */
function SlideVisual({ p, locale, light }: { p: ProjectRecord; locale: Locale; light: boolean }) {
  const screens = p.screens?.flatMap((group) => group.items) ?? [];
  if (p.heroCompanion) {
    return (
      <span className="relative block">
        <Browser src={p.heroImage} alt={projectImageAlt(p, locale)} sizes="(min-width: 1024px) 55vw, 100vw" className="w-[88%] group-hover:scale-[1.015]" />
        <span className="absolute -bottom-4 right-0 block w-[26%] overflow-hidden rounded-[1.6rem] border border-[var(--rs-border)] shadow-[0_40px_80px_-30px_rgba(9,9,12,0.6)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <Image
            src={p.heroCompanion.src}
            alt={p.heroCompanion.alt[locale]}
            width={p.heroCompanion.width}
            height={p.heroCompanion.height}
            sizes="(min-width: 1024px) 15vw, 26vw"
            className="block h-auto w-full"
          />
        </span>
      </span>
    );
  }
  if (screens.length >= 3) {
    return (
      <span className="relative block pb-[18%]">
        <Browser dark={light} src={screens[0].src} alt={screens[0].alt[locale]} sizes="40vw" className="w-[70%] group-hover:-translate-y-1" />
        <Browser dark={light} src={screens[2].src} alt={screens[2].alt[locale]} sizes="30vw" className="absolute right-0 top-[12%] w-[48%] group-hover:-translate-y-2" />
        <Browser dark={light} src={screens[1].src} alt={screens[1].alt[locale]} sizes="35vw" className="absolute bottom-0 left-[18%] w-[54%] group-hover:-translate-y-1.5" />
      </span>
    );
  }
  if (screens.length === 2) {
    return (
      <span className="relative block pb-[14%]">
        <Browser dark={light} src={screens[0].src} alt={screens[0].alt[locale]} sizes="40vw" className="w-[78%] group-hover:-translate-y-1" />
        <Browser dark={light} src={screens[1].src} alt={screens[1].alt[locale]} sizes="30vw" className="absolute bottom-0 right-0 w-[52%] group-hover:-translate-y-2" />
      </span>
    );
  }
  return <Browser dark={light} src={p.heroImage} alt={projectImageAlt(p, locale)} sizes="(min-width: 1024px) 55vw, 100vw" className="group-hover:-translate-y-1" />;
}

function ProductSlide({
  p,
  locale,
  position,
  total,
  label,
  featuredAttr,
  peek = false,
}: {
  p: ProjectRecord;
  locale: Locale;
  position: number;
  total: number;
  label?: string;
  featuredAttr?: "data-work-project" | "data-featured-project";
  peek?: boolean;
}) {
  const fr = locale === "fr";
  const theme = WORK_THEMES[p.key] ?? { surface: "#ffffff", ink: "dark" as const };
  const light = theme.ink === "light";
  const attr = featuredAttr && FEATURED_KEYS.includes(p.key) ? { [featuredAttr]: p.key } : {};
  const photo = p.key === "manteigaria";

  return (
    <Link
      href={workPath(locale, p.slug)}
      {...attr}
      aria-roledescription={fr ? "diapositive" : "slide"}
      aria-label={`${p.title}, ${position} / ${total}`}
      className={cn(
        "group relative grid min-h-[34rem] shrink-0 content-start lg:min-h-[66svh] lg:content-center snap-start overflow-hidden rounded-[var(--rs-radius-lg)] p-6 md:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-center lg:gap-12 lg:p-14",
        peek ? "w-[88%] lg:w-[82%]" : "w-full",
        theme.surface === "#ffffff" && "border border-[var(--rs-border)]",
        light ? "text-[#f7f7f4]" : "text-rs-fg",
      )}
      style={{ background: theme.surface }}
    >
      {photo ? (
        <>
          <Image
            src={p.heroImage}
            alt={projectImageAlt(p, locale)}
            fill
            sizes="100vw"
            className="object-cover object-left-top opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-[rgba(9,9,12,0.94)] via-[rgba(9,9,12,0.8)] to-[rgba(9,9,12,0.45)] md:bg-gradient-to-r md:from-[rgba(9,9,12,0.92)] md:via-[rgba(9,9,12,0.55)] md:to-transparent" />
        </>
      ) : null}
      <span data-project-copy className="relative z-10 block">
        {photo ? <StatusPill tone="concept">{p.status?.[locale] ?? ""}</StatusPill> : <StatusBadge project={p} locale={locale} suffix={WORK_PLATFORMS[p.key]?.[locale]} />}
        <span className={cn("mt-5 block text-xs font-semibold uppercase tracking-[0.18em]", light ? "text-white/60" : "text-black/50")}>
          {label ?? p.categories[locale].join(" · ")}
        </span>
        <span
          className={cn(
            "mt-2 flex items-center gap-3 text-4xl font-bold tracking-tight transition-colors duration-200 md:text-5xl",
            light ? "group-hover:text-[#b9b8f7]" : "group-hover:text-rs-accent-fg",
          )}
        >
          {p.title}
          <ArrowUpRight aria-hidden className="h-6 w-6 shrink-0 opacity-50 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
        <span className={cn("mt-3 block max-w-md text-base leading-relaxed md:text-lg", light ? "text-white/75" : "text-black/65")}>
          {p.summary[locale]}
        </span>
        <span className="mt-5 flex flex-wrap gap-2">
          {p.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className={cn("rounded-none px-3 py-1 text-xs font-medium", light ? "border border-white/15 bg-white/5" : "border border-black/10 bg-white/70")}
            >
              {tech}
            </span>
          ))}
        </span>
        <span className={cn("mt-6 inline-flex items-center gap-2 text-base font-semibold", light ? "text-[#b9b8f7]" : "text-rs-accent-fg")}>
          {fr ? "Lire l'étude de cas" : "Read the case study"}
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </span>
      {photo ? null : (
        <span data-project-media className="relative mt-10 block lg:mt-0">
          <SlideVisual p={p} locale={locale} light={light} />
        </span>
      )}
    </Link>
  );
}

export function ProductCarousel({
  locale,
  keys,
  labels,
  featuredAttr,
  ariaLabel,
  peek = false,
}: {
  locale: Locale;
  keys: ProjectKey[];
  /** Optional line shown above each title instead of the categories (e.g. "Site du produit"). */
  labels?: Partial<Record<ProjectKey, string>>;
  featuredAttr?: "data-work-project" | "data-featured-project";
  ariaLabel?: string;
  /** Narrower slides so the next product shows at the edge, like a film strip. */
  peek?: boolean;
}) {
  const fr = locale === "fr";
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const projects = keys.map((key) => getProject(key)).filter((p): p is ProjectRecord => p !== null);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, keys.length - 1));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const slide = track.children[clamped] as HTMLElement | undefined;
    track.scrollTo({ left: slide ? slide.offsetLeft - track.offsetLeft : 0, behavior: reduce ? "auto" : "smooth" });
  }, [keys.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Slide width plus the 1.5rem gap between slides.
    const onScroll = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const step = first ? first.offsetWidth + 24 : track.clientWidth;
      setActive(Math.round(track.scrollLeft / Math.max(step, 1)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
    // The carousel is remounted (key) when the filter changes, so this runs once per list.
  }, []);

  if (projects.length === 0) return null;

  return (
    <section aria-roledescription={fr ? "carrousel" : "carousel"} aria-label={ariaLabel ?? (fr ? "Produits du studio" : "Studio products")}>
      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(active + 1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(active - 1);
          }
        }}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth rounded-[var(--rs-radius-lg)] outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-rs-accent [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p, index) => (
          <ProductSlide key={p.key} p={p} locale={locale} position={index + 1} total={projects.length} label={labels?.[p.key]} featuredAttr={featuredAttr} peek={peek} />
        ))}
      </div>

      {projects.length > 1 ? (
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-2">
            {projects.map((p, index) => (
              <li key={p.key}>
                <button
                  type="button"
                  aria-current={active === index ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={cn(
                    "relative overflow-hidden rounded-none px-4 py-2 text-sm font-medium transition-colors duration-150",
                    active === index ? "bg-rs-fg text-rs-bg" : "border border-[var(--rs-border)] bg-rs-surface text-rs-muted hover:text-rs-fg",
                  )}
                >
                  {p.title}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <span className="text-sm tabular-nums text-rs-muted">
              {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label={fr ? "Projet précédent" : "Previous project"}
              className="flex h-11 w-11 items-center justify-center rounded-none border border-[var(--rs-border)] bg-rs-surface transition-colors duration-150 hover:border-rs-fg disabled:opacity-40"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === projects.length - 1}
              aria-label={fr ? "Projet suivant" : "Next project"}
              className="flex h-11 w-11 items-center justify-center rounded-none bg-rs-fg text-rs-bg transition-colors duration-150 hover:bg-rs-accent disabled:opacity-40"
            >
              <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
