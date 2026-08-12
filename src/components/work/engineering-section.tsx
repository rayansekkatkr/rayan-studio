import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ProjectRecord } from "@/content/projects";
import type { Locale } from "@/lib/i18n";

export function EngineeringSection({ locale, project }: { locale: Locale; project: ProjectRecord }) {
  return (
    <Container>
      <Eyebrow>Engineering</Eyebrow>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {project.engineering[locale].map((item) => (
          <div
            key={item.title}
            className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] p-6"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-rs-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
