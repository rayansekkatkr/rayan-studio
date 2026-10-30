import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Atmospheric background photo, shaded so the text stays readable. Decorative. */
  image?: string;
  children?: React.ReactNode;
  titleClassName?: string;
  className?: string;
};

/** Dark page header shared by the inner pages. */
export function PageHero({ eyebrow, title, lead, image, children, titleClassName, className }: PageHeroProps) {
  return (
    <div className={cn("rs-theme-dark relative isolate overflow-hidden bg-rs-bg pb-16 pt-28 text-rs-fg md:pb-24 md:pt-36", className)}>
      {image ? (
        <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-60" />
      ) : null}
      <div aria-hidden className={cn("absolute inset-0 -z-10", image ? "page-hero-shade" : "hero-glow")} />
      <Container>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className={cn(
            "mt-4 max-w-4xl text-[1.75rem] font-semibold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {lead ? (
          <div className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">{lead}</div>
        ) : null}
        {children}
      </Container>
    </div>
  );
}
