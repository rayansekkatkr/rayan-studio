"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { getNavigation, type NavMenuKey } from "@/content/navigation";
import type { Locale } from "@/lib/i18n";
import { quotePath } from "@/lib/site-routes";
import { cn } from "@/lib/utils";
import { DesktopMegaMenu } from "./desktop-mega-menu";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";

const MOBILE_MENU_ID = "mobile-site-menu";

type SiteHeaderProps = {
  locale: Locale;
  /** Foreground contrast for the transparent top state, set by the page hosting the header. */
  topTheme?: "light" | "dark";
};

export function SiteHeader({ locale, topTheme = "light" }: SiteHeaderProps) {
  const fr = locale === "fr";
  const menus = getNavigation(locale);
  const [openMenu, setOpenMenu] = useState<NavMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const triggerRefs = useRef<Partial<Record<NavMenuKey, HTMLButtonElement | null>>>({});
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenus = useCallback(() => {
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolled(y >= 24);
      if (y > 120 && y > lastScrollY.current) {
        setHidden(true);
        setOpenMenu(null);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
        return;
      }
      if (openMenu) {
        const trigger = triggerRefs.current[openMenu];
        setOpenMenu(null);
        trigger?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, openMenu]);

  const solid = scrolled || openMenu !== null || mobileOpen;
  // Once the page scrolls, the bar detaches into a floating pill. The open
  // mobile menu keeps the full-width bar it is anchored to.
  const floating = scrolled && !mobileOpen;
  const inverse = topTheme === "dark" && !solid;

  return (
    <header
      data-top-theme={topTheme}
      data-surface={solid ? "solid" : "transparent"}
      data-floating={floating ? "true" : "false"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,padding] duration-300",
        floating && "px-3 pt-3",
        hidden && !openMenu && !mobileOpen && "-translate-y-[calc(100%+3rem)]",
      )}
      onMouseLeave={closeMenus}
    >
      <div
        className={cn(
          "relative transition-all duration-300",
          floating
            ? "mx-auto max-w-[min(var(--rs-container),76rem)] rounded-full border border-[var(--rs-border)] bg-[var(--rs-header-surface)] shadow-[0_16px_40px_-24px_rgba(11,11,14,0.45)] backdrop-blur-md"
            : solid
              ? "border-b border-[var(--rs-border)] bg-[var(--rs-header-surface)] backdrop-blur"
              : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full max-w-[var(--rs-container)] items-center justify-between transition-all duration-300",
            floating ? "h-14 pl-6 pr-2.5" : "h-16 px-5 md:px-8",
          )}
        >
          <Link
            href={`/${locale}`}
            onClick={closeMenus}
            className={cn(
              "text-sm font-bold uppercase tracking-[0.22em]",
              inverse ? "text-[var(--rs-dark-fg)]" : "text-rs-fg",
            )}
          >
            RAYAN STUDIO
          </Link>

          <nav aria-label={fr ? "Navigation principale" : "Main navigation"} className="hidden items-center gap-1 lg:flex">
            {menus.map((menu) => {
              const expanded = openMenu === menu.key;
              const panelId = `mega-menu-${menu.key}`;
              return (
                <button
                  key={menu.key}
                  ref={(node) => {
                    triggerRefs.current[menu.key] = node;
                  }}
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpenMenu(expanded ? null : menu.key)}
                  onMouseEnter={() => {
                    if (openMenu) setOpenMenu(menu.key);
                  }}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150",
                    expanded
                      ? "text-rs-accent-fg"
                      : inverse
                        ? "text-[var(--rs-dark-fg)] hover:text-[var(--rs-dark-muted)]"
                        : "text-rs-fg hover:text-rs-accent-fg",
                  )}
                >
                  {menu.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <LanguageSwitch locale={locale} tone={inverse ? "inverse" : "default"} />
            <TrackedLink
              href={quotePath(locale)}
              event={{
                ctaId: "nav_free_quote",
                source: "site_header",
                destination: quotePath(locale),
                locale,
              }}
              onClick={closeMenus}
              className={cn(
                "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-150",
                inverse
                  ? "bg-[var(--rs-dark-fg)] text-[var(--rs-dark)] hover:bg-rs-accent hover:text-[var(--rs-dark-fg)]"
                  : "bg-rs-fg text-rs-bg hover:bg-rs-accent",
              )}
            >
              {fr ? "Demander un devis gratuit" : "Get a free quote"}
            </TrackedLink>
          </div>

          <button
            ref={mobileButtonRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={mobileOpen ? (fr ? "Fermer le menu" : "Close menu") : fr ? "Ouvrir le menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden",
              inverse ? "text-[var(--rs-dark-fg)]" : "text-rs-fg",
            )}
          >
            {mobileOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>

        {menus.map((menu) =>
          openMenu === menu.key ? (
            <DesktopMegaMenu
              key={menu.key}
              menu={menu}
              floating={floating}
              panelId={`mega-menu-${menu.key}`}
              onNavigate={closeMenus}
            />
          ) : null,
        )}
      </div>

      {mobileOpen ? (
        <MobileMenu
          id={MOBILE_MENU_ID}
          locale={locale}
          menus={menus}
          onClose={() => setMobileOpen(false)}
        />
      ) : null}
    </header>
  );
}
