import { Container } from "@/components/ui/container";
import type { Locale } from "@/lib/i18n";

export function ExpertiseStrip({ locale }: { locale: Locale }) {
  return (
    <div className="border-b border-t border-[var(--rs-border)] bg-rs-bg py-6">
      <Container>
        <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-rs-muted">
          {locale === "fr"
            ? "Product design · Ingénierie logicielle · Web · Automatisation · Cloud"
            : "Product Design · Software Engineering · Web · Automation · Cloud"}
        </p>
      </Container>
    </div>
  );
}
