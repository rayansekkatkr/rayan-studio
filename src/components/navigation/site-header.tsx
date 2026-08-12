"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { getNavigation, type NavMenuKey } from "@/content/navigation";
import type { Locale } from "@/lib/i18n";
import { startProjectPath } from "@/lib/site-routes";
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
  const inverse = topTheme === "dark" && !solid;

  return (
    <header
      data-top-theme={topTheme}
      data-surface={solid ? "solid" : "transparent"}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-200",
        hidden && !openMenu && !mobileOpen && "-translate-y-full",
      )}
      onMouseLeave={closeMenus}
    >
      <div
        className={cn(
          "relative transition-colors duration-200",
          solid
            ? "border-b border-[var(--rs-border)] bg-rs-surface/90 backdrop-blur"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[var(--rs-container)] items-center justify-between px-5 md:px-8">
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
                      ? "text-rs-accent"
                      : inverse
                        ? "text-[var(--rs-dark-fg)] hover:text-[var(--rs-dark-muted)]"
                        : "text-rs-fg hover:text-rs-accent",
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
              href={startProjectPath(locale)}
              event={{
                ctaId: "nav_start_project",
                source: "site_header",
                destination: startProjectPath(locale),
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
              {fr ? "Parler de votre projet" : "Start a project"}
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
