import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RAYAN_CONTENT } from "@/content/studio";
import { BRAND } from "@/lib/brand";
import type { Locale } from "@/lib/i18n";

export function RayanPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = RAYAN_CONTENT[locale];

  return (
    <article>
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>{fr ? "Fondateur" : "Founder"}</Eyebrow>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">{content.name}</h1>
          <p className="mt-3 text-xl font-medium text-rs-muted">{content.role}</p>
        </Container>
      </div>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="max-w-[var(--rs-reading)] space-y-5">
            {content.overview.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-rs-fg">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {content.focusTitle}
              </h2>
              <ul className="mt-4 space-y-3">
                {content.focusAreas.map((area) => (
                  <li key={area} className="border-t border-[var(--rs-border)] pt-3 text-base text-rs-fg">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {content.experienceTitle}
              </h2>
              <ul className="mt-4 space-y-3">
                {content.experience.map((item) => (
                  <li key={item.title} className="border-t border-[var(--rs-border)] pt-3">
                    <p className="text-base font-semibold text-rs-fg">{item.title}</p>
                    <p className="mt-1 text-sm text-rs-muted">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {content.contextTitle}
            </h2>
            <ul className="mt-4 space-y-2">
              {content.context.map((line) => (
                <li key={line} className="text-base text-rs-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-5">
            <a
              href={BRAND.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              LinkedIn
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <a
              href={BRAND.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              Portfolio
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <Link
              href={`/${locale}/work`}
              className="inline-flex items-center gap-1.5 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Voir les projets du studio" : "See the studio's work"}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </article>
  );
}
