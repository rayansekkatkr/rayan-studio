"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { type MouseEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";

export function Navbar({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const switchTo = en ? "fr" : "en";
  const switchLabel = en ? "FR" : "EN";
  const links = [
    { label: en ? "Services" : "Services", href: `/${locale}#services` },
    { label: en ? "Work" : "Réalisations", href: `/${locale}#realisations` },
    { label: en ? "Pricing" : "Tarifs", href: `/${locale}#tarifs` },
    { label: en ? "About" : "À propos", href: `/${locale}/a-propos-methodologie-preuves` },
    { label: "FAQ", href: `/${locale}#faq` },
    { label: en ? "Contact" : "Contact", href: `/${locale}#contact` },
  ];

  const closeMenu = () => setMobileOpen(false);
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split("#")[1];
    if (!hash) return;

    const target = document.getElementById(hash);
    if (!target) return;

    event.preventDefault();
    closeMenu();

    const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
    const viewportHeight = window.innerHeight;
    const targetRect = target.getBoundingClientRect();
    const targetStyles = window.getComputedStyle(target);
    const sectionHeight = targetRect.height;
    const sectionPaddingTop = parseFloat(targetStyles.paddingTop) || 0;
    const sectionPaddingBottom = parseFloat(targetStyles.paddingBottom) || 0;
    const targetTop = targetRect.top + window.scrollY;
    const contentTop = targetTop + sectionPaddingTop;
    const contentHeight = Math.max(0, sectionHeight - sectionPaddingTop - sectionPaddingBottom);
    const navGap = headerBottom + 22;
    const availableHeight = viewportHeight - navGap - 24;
    const nextTop =
      contentHeight <= availableHeight
        ? contentTop - Math.max(navGap, (viewportHeight - contentHeight) / 2)
        : contentTop - navGap;

    window.history.pushState(null, "", href);
    window.scrollTo({ top: Math.max(0, nextTop), behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex w-full min-w-0 max-w-7xl items-center justify-between rounded-none border border-[#2a231d]/20 bg-[#fffaf0] px-4 py-3 shadow-[7px_7px_0_rgba(42,35,29,0.12)] md:px-6"
      >
        <Link
          href={`/${locale}#hero`}
          onClick={(event) => scrollToSection(event, `/${locale}#hero`)}
          className="group inline-flex max-w-[72vw] items-center gap-3 truncate text-[#17120f] sm:max-w-none"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center border border-[#2a231d]/18 bg-[#17120f] text-[10px] font-black uppercase tracking-[0.08em] text-[#fffaf0] shadow-[3px_3px_0_rgba(217,79,43,0.42)]">
            RS
          </span>
          <span className="brand-wordmark truncate text-[1.35rem] leading-none transition-colors duration-300 group-hover:text-[#d94f2b] md:text-[1.5rem]">
            {BRAND.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-2.5 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(event) => scrollToSection(event, link.href)}
                className="rounded-none px-2.5 py-1.5 text-sm font-black text-[#4c4036] transition-colors hover:bg-[#17120f] hover:text-[#fffaf0]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/${switchTo}`}
          className="hidden rounded-none border border-[#2a231d]/14 bg-[#fffaf0] px-3 py-1.5 text-xs font-black uppercase tracking-[0.12em] text-[#4c4036] md:inline-flex"
          aria-label={en ? "Passer en français" : "Switch to English"}
        >
          {switchLabel}
        </Link>

        <Button asChild size="sm" className="group hidden sm:inline-flex">
          <Link href={`/${locale}#contact`} onClick={(event) => scrollToSection(event, `/${locale}#contact`)}>
            {en ? "Audit" : "Diagnostic"}
            <ArrowUpRight size={15} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-none border border-[#2a231d]/14 bg-[#fffaf0] text-[#17120f] lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <AnimatePresence>
          {mobileOpen ? (
            <>
              <motion.button
                type="button"
                aria-label={en ? "Close menu overlay" : "Fermer l'arriere-plan du menu"}
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[60] bg-slate-900/18 lg:hidden"
              />

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-4 top-[6.2rem] z-[70] max-h-[72svh] overflow-y-auto rounded-none border border-[#2a231d]/14 bg-[#fffaf0] p-3 shadow-[10px_10px_0_rgba(42,35,29,0.12)] lg:hidden"
              >
                <ul className="space-y-1.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => scrollToSection(event, link.href)}
                        className="block rounded-none px-3 py-2 text-sm font-bold text-[#63584d] transition-colors hover:bg-[#17120f] hover:text-[#fffaf0]"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${switchTo}`}
                  className="mt-2 block rounded-none border border-[#2a231d]/14 bg-[#f5f1e8] px-3 py-2 text-center text-xs font-black uppercase tracking-[0.12em] text-[#63584d]"
                  onClick={closeMenu}
                >
                  {en ? "Passer en français" : "Switch to English"}
                </Link>
                <Button asChild size="sm" className="mt-2.5 w-full">
                  <a href={`/${locale}#contact`} onClick={(event) => scrollToSection(event, `/${locale}#contact`)}>
                    {en ? "Audit" : "Diagnostic"}
                    <ArrowUpRight size={15} className="ml-1" />
                  </a>
                </Button>
              </motion.div>
            </>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
