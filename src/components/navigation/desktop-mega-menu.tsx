"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { NavMenu } from "@/content/navigation";
import { cn } from "@/lib/utils";

type DesktopMegaMenuProps = {
  menu: NavMenu;
  panelId: string;
  onNavigate: () => void;
};

export function DesktopMegaMenu({ menu, panelId, onNavigate }: DesktopMegaMenuProps) {
  return (
    <div
      id={panelId}
      className={cn(
        "absolute inset-x-0 top-full border-b border-[var(--rs-border)] bg-rs-surface/95 shadow-[0_24px_48px_-32px_rgba(11,11,14,0.35)] backdrop-blur",
      )}
    >
      <div className="mx-auto grid w-full max-w-[var(--rs-container)] gap-10 px-5 py-10 md:grid-cols-[repeat(3,minmax(0,1fr))] md:px-8">
        <div
          className={cn(
            "grid gap-10",
            menu.featured ? "md:col-span-2" : "md:col-span-3",
            menu.groups.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2",
          )}
        >
          {menu.groups.map((group) => (
            <div key={group.label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {group.label}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className="text-[18px] font-medium leading-snug text-rs-fg transition-colors duration-150 hover:text-rs-accent focus-visible:text-rs-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {menu.featured ? (
          <Link
            href={menu.featured.href}
            onClick={onNavigate}
            className="group flex flex-col justify-between rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-bg p-6 transition-colors duration-150 hover:border-[var(--rs-border-strong)]"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rs-muted">
                {menu.featured.eyebrow}
              </p>
              <p className="mt-3 text-xl font-semibold text-rs-fg">{menu.featured.title}</p>
            </div>
            {menu.featured.image ? (
              <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)]">
                <Image
                  src={menu.featured.image}
                  alt={menu.featured.title}
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
              </div>
            ) : null}
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-rs-accent">
              {menu.featured.cta}
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
