import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { METHOD_CONTENT } from "@/content/studio";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { NightBand } from "@/components/ui/night-band";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";

export function MethodPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const content = METHOD_CONTENT[locale];

  return (
    <article>
      <NightBand image={PAGE_HERO_PHOTOS.method} className="pt-28 md:pt-36">
        <Container className="page-hero-rule">
          <Eyebrow>{fr ? "Méthode" : "Method"}</Eyebrow>
          <h1 className="mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
            {content.intro}
          </p>
        </Container>
      </NightBand>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <ol className="space-y-10">
            {content.stages.map((stage) => (
              <li key={stage.number} className="grid gap-3 border-t border-[var(--rs-border)] pt-6 md:grid-cols-[8rem_1fr]">
                <div>
                  <p className="text-sm font-semibold text-rs-accent-fg">{stage.number}</p>
                  <p className="mt-1 text-2xl font-semibold">{stage.name}</p>
                </div>
                <p className="max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-16 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-8">
            <p className="text-xl font-semibold">{content.reassurance}</p>
            <Link
              href={startProjectPath(locale)}
              className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
            >
              {fr ? "Parler de votre projet" : "Start a project"}
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </div>
    </article>
  );
}
