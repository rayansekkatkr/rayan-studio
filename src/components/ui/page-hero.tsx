import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GiantWord } from "@/components/ui/giant-word";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Optional page name set in giant type above the title (direction A signature). */
  word?: string;
  /** @deprecated Direction A has no photo behind page titles; kept so older callers compile. */
  image?: string;
  children?: React.ReactNode;
  titleClassName?: string;
  className?: string;
};

/**
 * Page header, direction A: light background, optional giant page name, a real h1,
 * and a heavy rule underneath. No dark band and no background photo.
 */
export function PageHero({ eyebrow, title, lead, word, children, titleClassName, className }: PageHeroProps) {
  return (
    <div data-page-hero className={cn("pt-28 md:pt-36", className)}>
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        {word ? (
          <div className="mt-3 overflow-x-clip">
            <GiantWord text={word} />
          </div>
        ) : null}
        <div
          className={cn(
            "border-b border-rs-fg pb-9",
            word ? "mt-7 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16" : "mt-5",
          )}
        >
          <h1
            className={cn(
              word
                ? "text-xl font-bold leading-snug tracking-tight md:text-2xl"
                : "max-w-5xl text-[2.5rem] font-extrabold leading-[0.98] tracking-[-0.045em] md:text-6xl lg:text-7xl",
              titleClassName,
            )}
          >
            {title}
          </h1>
          <div>
            {lead ? (
              <div className={cn("max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted", !word && "mt-6")}>{lead}</div>
            ) : null}
            {children}
          </div>
        </div>
      </Container>
    </div>
  );
}
