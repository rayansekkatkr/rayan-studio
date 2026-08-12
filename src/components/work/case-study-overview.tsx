import { Container } from "@/components/ui/container";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export function CaseStudyOverview({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  const fr = locale === "fr";

  const entries: Array<{ label: string; value: string }> = [];
  entries.push({ label: fr ? "Projet" : "Project", value: project.title });
  entries.push({
    label: "Type",
    value: project.categories[locale].join(" · "),
  });
  entries.push({ label: fr ? "Rôle" : "Role", value: project.role[locale] });
  if (project.year) {
    entries.push({ label: fr ? "Année" : "Year", value: project.year });
  }
  if (project.status) {
    entries.push({ label: fr ? "Statut" : "Status", value: project.status[locale] });
  }

  return (
    <Container>
      <dl className="grid gap-6 border-t border-[var(--rs-border)] pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {entries.map((entry) => (
          <div key={entry.label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">
              {entry.label}
            </dt>
            <dd className="mt-2 text-base font-medium text-rs-fg">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
