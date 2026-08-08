"use client";

import VerticalTabs from "@/components/ui/vertical-tabs";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);

  return (
    <section id="process" className="section-screen section-fit px-4 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow={en ? "Process · 5 steps" : "Process · 5 étapes"}
            title={en ? "A clear process in 5 steps" : "Un process clair en 5 étapes"}
            description={
              en
                ? "From diagnosis to deployment, you always know what happens next. I handle the technical parts without making you carry them."
                : "Du diagnostic au déploiement, vous savez toujours ce qui se passe ensuite. Je gère la partie technique sans vous la faire porter."
            }
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-5 md:mt-7">
            <VerticalTabs locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
