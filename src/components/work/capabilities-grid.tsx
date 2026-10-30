import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BALANCED_GRID, balancedSpan } from "@/components/ui/balanced-grid";

export function CapabilitiesGrid({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";

  return (
    <Container>
      <Eyebrow>{fr ? "Ce que nous avons construit" : "What we built"}</Eyebrow>
      <div className={cn("mt-6 grid gap-4 sm:grid-cols-2", BALANCED_GRID)}>
        {project.capabilities.map((capability, index) => (
          <div
            key={capability.title.en}
            className={cn(
              "rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5",
              balancedSpan(index, project.capabilities.length),
            )}
          >
            <p className="text-xs font-semibold tracking-[0.18em] text-rs-accent-fg">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-lg font-semibold">{capability.title[locale]}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rs-muted">{capability.body[locale]}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
