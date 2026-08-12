import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { STUDIO_CONTENT } from "@/content/studio";
import type { Locale } from "@/lib/i18n";
import { startProjectPath, studioPath } from "@/lib/site-routes";

export function StudioPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = STUDIO_CONTENT[locale];

  return (
    <article>
      <div className="rs-theme-dark bg-rs-bg pb-16 pt-32 text-rs-fg md:pb-20 md:pt-40">
        <Container>
          <Eyebrow>{fr ? "Le studio" : "The studio"}</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {content.hero.title}
          </h1>
          <p className="mt-8 text-2xl font-semibold text-rs-accent md:text-3xl">{content.hero.keyIdea}</p>
        </Container>
      </div>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <p className="max-w-[var(--rs-reading)] text-xl leading-relaxed text-rs-fg">
            {content.hero.body}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {content.principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6"
              >
                <h2 className="text-xl font-semibold">{principle.title}</h2>
                <p className="mt-2 text-base leading-relaxed text-rs-muted">{principle.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={studioPath(locale, "rayan")}
              className="inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Rencontrer Rayan Sekkat" : "Meet Rayan Sekkat"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href={startProjectPath(locale)}
              className="inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Démarrer un projet" : "Start a project"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </article>
  );
}
