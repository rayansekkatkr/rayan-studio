import { Check } from "lucide-react";
import type { InsightBlock } from "@/content/insights";

export function InsightBlocks({ blocks }: { blocks: InsightBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return block.level === 2 ? (
              <h2 key={index} className="pt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                {block.text}
              </h2>
            ) : (
              <h3 key={index} className="pt-2 text-xl font-semibold tracking-tight">
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p key={index} className="text-lg leading-relaxed text-rs-muted">
                {block.text}
              </p>
            );
          case "list":
            return (
              <ul key={index} className="list-disc space-y-2 pl-6">
                {block.items.map((item) => (
                  <li key={item} className="text-lg leading-relaxed text-rs-muted">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "checklist":
            return (
              <ul key={index} className="space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-relaxed text-rs-muted">
                    <Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-rs-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside
                key={index}
                className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border-strong)] bg-rs-subtle p-6"
              >
                <p className="text-base font-semibold text-rs-fg">{block.title}</p>
                <p className="mt-2 text-base leading-relaxed text-rs-muted">{block.body}</p>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
