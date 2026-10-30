import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

/** Rendered inside the case study container, next to the Product & UX column. */
export function EngineeringSection({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  return (
    <div>
      <Eyebrow>Engineering</Eyebrow>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {project.engineering[locale].map((item) => (
          <div
            key={item.title}
            className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5"
          >
            <h3 className="text-base font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-rs-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
