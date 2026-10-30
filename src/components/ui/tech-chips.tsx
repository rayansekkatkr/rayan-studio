import { cn } from "@/lib/utils";

export function TechChips({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-[var(--rs-border)] bg-rs-surface px-3.5 py-1.5 text-sm font-medium text-rs-fg"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
