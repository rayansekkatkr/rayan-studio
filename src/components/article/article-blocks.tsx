import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & { [key: `data-${string}`]: string | undefined };

/** A numbered block of the reading column; its id is the target of the table of contents. */
export function ArticleBlock({
  id,
  index,
  title,
  children,
  className,
  ...rest
}: { id: string; index: number; title: string; children: ReactNode } & SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-28", className)} {...rest}>
      <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted after:h-px after:flex-1 after:bg-[var(--rs-border)]">
        <span className="text-rs-accent-fg">{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/** Large statement with an accent rule; `highlight` (an exact substring) takes the accent colour. */
export function PullQuote({
  id,
  eyebrow,
  text,
  highlight,
  children,
  className,
  ...rest
}: { id: string; eyebrow: string; text: string; highlight?: string; children?: ReactNode } & SectionProps) {
  const at = highlight ? text.indexOf(highlight) : -1;
  return (
    <section id={id} className={cn("scroll-mt-28 border-l-4 border-rs-accent pl-6 md:pl-8", className)} {...rest}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">{eyebrow}</p>
      <p className="mt-4 text-2xl font-medium leading-snug tracking-tight md:text-[2rem] md:leading-[1.3]">
        {at >= 0 && highlight ? (
          <>
            {text.slice(0, at)}
            <span className="text-rs-accent-fg">{highlight}</span>
            {text.slice(at + highlight.length)}
          </>
        ) : (
          text
        )}
      </p>
      {children}
    </section>
  );
}

/** Two-column grid of numbered items with outlined numbers. `trailing` fills the last cell of an odd list. */
export function NumberedGrid({
  items,
  trailing,
}: {
  items: Array<{ title: string; body: string }>;
  trailing?: ReactNode;
}) {
  const odd = items.length % 2 === 1;
  return (
    <div className="grid border-t border-[var(--rs-border)] sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.title}
          className={cn(
            "grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 border-b border-[var(--rs-border)] py-6 sm:pr-7",
            index % 2 === 1 && "sm:border-l sm:pl-7",
            // An odd list without a trailing cell: the last item takes the full row.
            odd && !trailing && index === items.length - 1 && "sm:col-span-2",
          )}
        >
          <span aria-hidden className="num-outline text-[2.1rem] font-bold leading-none tracking-tight">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-rs-muted">{item.body}</p>
          </div>
        </div>
      ))}
      {odd && trailing ? (
        <div className="flex items-center border-b border-[var(--rs-border)] py-6 sm:border-l sm:pl-7">{trailing}</div>
      ) : null}
    </div>
  );
}

/** Vertical steps with large gradient numerals. */
export function BigSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="border-t border-[var(--rs-border)]">
      {steps.map((step, index) => (
        <li
          key={step}
          className="grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-6 border-b border-[var(--rs-border)] py-5 md:grid-cols-[6rem_minmax(0,1fr)]"
        >
          <span aria-hidden className="num-gradient text-6xl font-bold leading-none tracking-tighter md:text-7xl">
            {index + 1}
          </span>
          <p className="text-base leading-relaxed md:text-lg">{step}</p>
        </li>
      ))}
    </ol>
  );
}

/** Simple numbered rows (solution points, engineering principles). */
export function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="border-t border-[var(--rs-border)]">
      {items.map((item, index) => (
        <li
          key={item}
          className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 border-b border-[var(--rs-border)] py-5 text-base leading-relaxed md:text-lg"
        >
          <span className="pt-1 text-sm font-bold text-rs-accent-fg">{String(index + 1).padStart(2, "0")}</span>
          {item}
        </li>
      ))}
    </ol>
  );
}
