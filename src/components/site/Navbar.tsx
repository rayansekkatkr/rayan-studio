"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";

export function Navbar({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const [mobileOpen, setMobileOpen] = useState(false);
  const switchTo = en ? "fr" : "en";
  const switchLabel = en ? "FR" : "EN";
  const links = [
    { label: en ? "Problem / Solution" : "Problème / Solution", href: `/${locale}#probleme-solution` },
    { label: en ? "Services" : "Services", href: `/${locale}#services` },
    { label: en ? "Work" : "Réalisations", href: `/${locale}#realisations` },
    { label: en ? "Process" : "Process", href: `/${locale}#process` },
    { label: en ? "Pricing" : "Tarifs", href: `/${locale}#tarifs` },
    { label: en ? "About" : "À propos", href: `/${locale}/a-propos-methodologie-preuves` },
    { label: en ? "Contact" : "Contact", href: `/${locale}#contact` },
  ];

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(236,244,255,0.68))] px-4 py-3 shadow-[0_16px_30px_rgba(123,157,217,0.2)] backdrop-blur-2xl md:px-6"
      >
        <Link
          href={`/${locale}#hero`}
          className="group inline-flex max-w-[72vw] items-center truncate font-display text-xs font-semibold uppercase tracking-[0.08em] text-slate-800 sm:max-w-none sm:text-sm sm:tracking-[0.16em] md:text-base"
        >
          <span className="truncate transition-colors duration-300 group-hover:text-slate-950">{BRAND.name}</span>
        </Link>

        <ul className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/${switchTo}`}
          className="hidden rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 md:inline-flex"
          aria-label={en ? "Passer en français" : "Switch to English"}
        >
          {switchLabel}
        </Link>

        <Button asChild size="sm" className="group hidden sm:inline-flex">
          <Link href={`/${locale}#contact`}>
            {en ? "Start now" : "Démarrer"}
            <ArrowUpRight size={15} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Button>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-700 lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 top-[calc(100%+10px)] max-h-[75svh] overflow-y-auto rounded-2xl border border-white/95 bg-white/97 p-3 shadow-[0_24px_44px_rgba(74,105,161,0.28)] backdrop-blur-xl lg:hidden"
            >
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white/85 hover:text-slate-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${switchTo}`}
                className="mt-1 block rounded-xl border border-white/80 bg-white/80 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
                onClick={closeMenu}
              >
                {en ? "Passer en français" : "Switch to English"}
              </Link>
              <Button asChild size="sm" className="mt-2.5 w-full">
                <a href={`/${locale}#contact`} onClick={closeMenu}>
                  {en ? "Start now" : "Démarrer"}
                  <ArrowUpRight size={15} className="ml-1" />
                </a>
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
