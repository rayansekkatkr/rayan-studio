import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export function CapabilitiesGrid({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";

  return (
    <Container>
      <Eyebrow>{fr ? "Ce que nous avons construit" : "What we built"}</Eyebrow>
      <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {project.capabilities.map((capability) => (
          <div key={capability.title.en} className="border-t border-[var(--rs-border)] pt-4">
            <h3 className="text-lg font-semibold">{capability.title[locale]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rs-muted">{capability.body[locale]}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
