import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { insightPath } from "@/lib/site-routes";

export function InsightsPreview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const entries = fr
    ? [
        { kind: "Guide", title: "Comment préparer un projet SaaS", href: insightPath(locale, "guides"), featured: true },
        { kind: "Checklist", title: "Lancer un MVP", href: insightPath(locale, "checklists"), featured: false },
        { kind: "Guide", title: "Refonte ou reconstruction ?", href: insightPath(locale, "guides"), featured: false },
      ]
    : [
        { kind: "Guide", title: "How to prepare a SaaS project", href: insightPath(locale, "guides"), featured: true },
        { kind: "Checklist", title: "Launching an MVP", href: insightPath(locale, "checklists"), featured: false },
        { kind: "Guide", title: "Redesign or rebuild?", href: insightPath(locale, "guides"), featured: false },
      ];

  return (
    <div className="bg-rs-bg py-[var(--rs-section-space)]">
      <Container>
        <Eyebrow>Insights</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {fr ? "Des ressources utiles avant de vous lancer." : "Useful resources before you start."}
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {entries.map((entry) => (
            <Link
              key={entry.title}
              href={entry.href}
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
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
