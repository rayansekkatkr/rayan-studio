import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  theme?: "light" | "dark";
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, theme = "light", children }: PageHeroProps) {
  const dark = theme === "dark";

  return (
    <div
      className={cn(
        "pb-16 pt-32 md:pb-24 md:pt-40",
        dark ? "rs-theme-dark bg-rs-bg text-rs-fg" : "bg-rs-bg text-rs-fg",
      )}
    >
      <Container>
        {eyebrow ? <Eyebrow className={cn(dark && "text-rs-muted")}>{eyebrow}</Eyebrow> : null}
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
          {description}
        </p>
        {children}
      </Container>
    </div>
  );
}
