"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import {
  resolveInsightCategorySlug,
  resolveServiceSlug,
  resolveStudioSlug,
  contactPath,
  insightPath,
  servicePath,
  startProjectPath,
  studioPath,
  workPath,
} from "@/lib/site-routes";
import { cn } from "@/lib/utils";

function equivalentPath(pathname: string | null, from: Locale, to: Locale): string {
  if (!pathname || !pathname.startsWith(`/${from}`)) return `/${to}`;
  const rest = pathname.slice(`/${from}`.length).replace(/\/+$/, "");
  if (rest === "" || rest === "/") return `/${to}`;
  const segments = rest.split("/").filter(Boolean);

  if (segments[0] === "services" && segments[1]) {
    const key = resolveServiceSlug(from, segments[1]);
    return key ? servicePath(to, key) : `/${to}`;
  }
  if (segments[0] === "work") {
    return workPath(to, segments[1]);
  }
  if (segments[0] === "studio" && segments[1]) {
    const key = resolveStudioSlug(from, segments[1]);
    return key ? studioPath(to, key) : `/${to}`;
  }
  if (segments[0] === "insights") {
    if (!segments[1]) return insightPath(to);
    const key = resolveInsightCategorySlug(from, segments[1]);
    return key ? insightPath(to, key) : insightPath(to);
  }
  if (segments[0] === "contact") return contactPath(to);
  if (rest === "/demarrer-un-projet" || rest === "/start-a-project") return startProjectPath(to);
  return `/${to}`;
}

type LanguageSwitchProps = {
  locale: Locale;
  className?: string;
  /** "inverse" renders light foreground for use over a dark transparent header. */
  tone?: "default" | "inverse";
};

export function LanguageSwitch({ locale, className, tone = "default" }: LanguageSwitchProps) {
  const pathname = usePathname();
  const inverse = tone === "inverse";
  const activeClass = inverse ? "text-[var(--rs-dark-fg)]" : "text-rs-fg";
  const mutedClass = inverse ? "text-[var(--rs-dark-muted)]" : "text-rs-muted";
  const idleClass = inverse
    ? "text-[var(--rs-dark-muted)] transition-colors duration-150 hover:text-[var(--rs-dark-fg)]"
    : "text-rs-muted transition-colors duration-150 hover:text-rs-fg";

  return (
    <div className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      {(["fr", "en"] as const).map((target, index) => (
        <span key={target} className="flex items-center">
          {index > 0 ? <span aria-hidden className={cn("mx-1", mutedClass)}>/</span> : null}
          {target === locale ? (
            <span aria-current="true" className={activeClass}>
              {target.toUpperCase()}
            </span>
          ) : (
            <Link
              href={equivalentPath(pathname, locale, target)}
              className={idleClass}
              aria-label={target === "fr" ? "Version française" : "English version"}
            >
              {target.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
