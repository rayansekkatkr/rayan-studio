import { Container } from "@/components/ui/container";

export function ExpertiseStrip() {
  return (
    <div className="border-b border-t border-[var(--rs-border)] bg-rs-bg py-6">
      <Container>
        <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-rs-muted">
          Product Design · Software Engineering · Web · Automation · Cloud
        </p>
      </Container>
    </div>
  );
}
