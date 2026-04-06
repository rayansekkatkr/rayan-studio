"use client";

import VerticalTabs from "@/components/ui/vertical-tabs";
import { isEnglish, type Locale } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);

  return (
    <section id="process" className="section-screen px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            eyebrow="Process"
            title={en ? "A clear 4-step process" : "Un process clair en 4 étapes"}
            description={
              en
                ? "You always know what happens next. Each step is simple, concrete, and validated with you."
                : "Vous savez toujours ce qui se passe ensuite. Chaque étape est simple, concrète, et validée avec vous."
            }
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-7">
            <VerticalTabs locale={locale} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
