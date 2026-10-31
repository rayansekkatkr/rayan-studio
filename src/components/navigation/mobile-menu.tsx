"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PrimaryNavLink } from "@/content/navigation";
import type { Locale } from "@/lib/i18n";
import { quotePath } from "@/lib/site-routes";
import { LanguageSwitch } from "./language-switch";

type MobileMenuProps = {
  id: string;
  locale: Locale;
  links: PrimaryNavLink[];
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ id, locale, links, onClose }: MobileMenuProps) {
  const fr = locale === "fr";
  const containerRef = useRef<HTMLDivElement>(null);

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
        <ul className="divide-y divide-[var(--rs-border)] border-y border-[var(--rs-border)]">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight text-rs-fg"
              >
                {link.label}
                <ArrowRight aria-hidden className="h-5 w-5 text-rs-muted" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between gap-4">
          <LanguageSwitch locale={locale} />
        </div>
        <Link
          href={quotePath(locale)}
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center bg-rs-fg px-6 py-3.5 text-base font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
        >
          {fr ? "Demander un devis gratuit" : "Get a free quote"}
        </Link>
      </nav>
    </div>
  );
}
