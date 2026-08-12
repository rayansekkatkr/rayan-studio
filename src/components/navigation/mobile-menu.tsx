"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavMenu } from "@/content/navigation";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./language-switch";

type MobileMenuProps = {
  id: string;
  locale: Locale;
  menus: NavMenu[];
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ id, locale, menus, onClose }: MobileMenuProps) {
  const fr = locale === "fr";
  const containerRef = useRef<HTMLDivElement>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const first = container.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab" || !container) return;
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className="fixed inset-0 top-16 z-40 overflow-y-auto bg-rs-bg lg:hidden"
    >
      <nav
        aria-label={fr ? "Navigation mobile" : "Mobile navigation"}
        className="flex min-h-full flex-col px-5 py-6"
      >
        <ul className="divide-y divide-[var(--rs-border)]">
          {menus.map((menu) => {
            const expanded = openSection === menu.key;
            return (
              <li key={menu.key}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`mobile-section-${menu.key}`}
                  onClick={() => setOpenSection(expanded ? null : menu.key)}
                  className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-rs-fg"
                >
                  {menu.label}
                  <ChevronDown
                    aria-hidden
                    className={cn("h-5 w-5 text-rs-muted transition-transform duration-200", expanded && "rotate-180")}
                  />
                </button>
                {expanded ? (
                  <div id={`mobile-section-${menu.key}`} className="pb-4">
                    {menu.groups.map((group) => (
                      <div key={group.label} className="mb-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rs-muted">
                          {group.label}
                        </p>
                        <ul className="mt-2 space-y-2">
                          {group.links.map((link) => (
                            <li key={`${link.href}-${link.label}`}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="block py-1 text-base text-rs-fg"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4">
          <LanguageSwitch locale={locale} />
        </div>
        <Link
          href={startProjectPath(locale)}
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-rs-fg px-6 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
        >
          {fr ? "Parler de votre projet" : "Start a project"}
        </Link>
      </nav>
    </div>
  );
}
