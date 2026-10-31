import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FAQ_CONTENT } from "@/content/studio";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { NightBand } from "@/components/ui/night-band";
import { PAGE_HERO_PHOTOS } from "@/content/visuals";

export function FaqPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const items = FAQ_CONTENT[locale];

  return (
    <article>
      <NightBand image={PAGE_HERO_PHOTOS.faq} className="pt-28 md:pt-36">
        <Container className="page-hero-rule">
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="mt-5 max-w-5xl text-[2.5rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-6xl">
            {fr ? "Questions fréquentes" : "Frequently asked questions"}
          </h1>
        </Container>
      </NightBand>

      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="max-w-3xl divide-y divide-[var(--rs-border)]">
            {items.map((item) => (
              <details key={item.question} data-faq-item className="group py-6">
                <summary className="cursor-pointer list-none text-xl font-semibold text-rs-fg">
                  {item.question}
                </summary>
                <p className="mt-3 max-w-[var(--rs-reading)] text-base leading-relaxed text-rs-muted">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <Link
            href={startProjectPath(locale)}
            className="mt-12 inline-flex items-center gap-2 rounded-none bg-rs-fg px-7 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
          >
            {fr ? "Parler de votre projet" : "Start a project"}
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </Container>
      </div>
    </article>
  );
}
