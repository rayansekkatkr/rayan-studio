import { CommercialPageShell } from "@/components/layout/commercial-page-shell";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { LegalDoc } from "@/content/legal";
import type { Locale } from "@/lib/i18n";

export function LegalDocument({ locale, doc }: { locale: Locale; doc: LegalDoc }) {
  return (
    <CommercialPageShell locale={locale} headerTopTheme="dark">
      <div className="rs-theme-dark bg-rs-bg pb-12 pt-32 text-rs-fg md:pb-16 md:pt-40">
        <Container>
          <Eyebrow>{doc.eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            {doc.title}
          </h1>
          <p className="mt-6 text-sm text-rs-muted">{doc.updated}</p>
        </Container>
      </div>
      <div className="bg-rs-bg py-[var(--rs-section-space)]">
        <Container>
          <div className="max-w-[var(--rs-reading)] space-y-10 text-base leading-relaxed text-rs-muted">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-rs-fg">{section.heading}</h2>
                <div className="mt-3 space-y-3 [&_a]:font-semibold [&_a]:text-rs-accent [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </div>
    </CommercialPageShell>
  );
}
