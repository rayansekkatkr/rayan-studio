import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";
import { ContactAside } from "./contact-aside";

/**
 * Form + side panel. The form sits in a card stretched to the height of the panel,
 * so the two columns end at the same line instead of leaving an empty area under a short step.
 */
export function ContactLayout({
  locale,
  source,
  children,
}: {
  locale: Locale;
  source: "project" | "contact";
  children: ReactNode;
}) {
  return (
    <div className="bg-rs-bg py-16 md:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-8">
          <div className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6 shadow-[0_24px_60px_-40px_rgba(9,9,12,0.35)] md:p-10">
            {children}
          </div>
          <ContactAside locale={locale} source={source} />
        </div>
      </Container>
    </div>
  );
}
