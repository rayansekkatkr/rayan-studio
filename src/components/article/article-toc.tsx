"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; label: string };

/** Sticky "on this page" list; the entry of the section being read is highlighted. */
export function ArticleToc({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rs-muted">{title}</p>
      <ol className="mt-4 border-l-2 border-[var(--rs-border)]">
        {items.map((item, index) => (
          <li key={item.id} className="-ml-0.5">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "block border-l-2 py-2 pl-4 text-sm transition-colors duration-150",
                active === item.id
                  ? "border-rs-accent font-semibold text-rs-fg"
                  : "border-transparent text-rs-muted hover:text-rs-fg",
              )}
            >
              <span className="mr-2 text-xs font-bold text-rs-accent-fg">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
