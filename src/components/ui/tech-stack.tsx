import { Eyebrow } from "@/components/ui/eyebrow";
import { TechChips } from "@/components/ui/tech-chips";
import { TECH_STACK } from "@/content/stack";
import type { Locale } from "@/lib/i18n";

export function TechStack({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const fr = locale === "fr";
  return (
    <div>
      <Eyebrow>{fr ? "Technologies utilisées" : "Technologies we use"}</Eyebrow>
      {compact ? null : (
        <h2 className="mt-4 max-w-2xl text-[1.75rem] font-semibold tracking-tight md:text-3xl">
          {fr ? "Une stack éprouvée en production, choisie selon votre projet." : "A stack proven in production, chosen for your project."}
        </h2>
      )}
      <div className={compact ? "mt-5 space-y-5" : "mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"}>
        {TECH_STACK.map((group) => (
          <div key={group.label.en}>
            <p className="text-sm font-semibold text-rs-fg">{group.label[locale]}</p>
            <TechChips items={group.items} className="mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}
