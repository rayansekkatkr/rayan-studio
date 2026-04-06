"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";

const links = [
  { label: "Problème / Solution", href: "#probleme-solution" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Process", href: "#process" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "À propos", href: "/a-propos-methodologie-preuves" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenu = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel relative mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(236,244,255,0.68))] px-4 py-3 shadow-[0_16px_30px_rgba(123,157,217,0.2)] backdrop-blur-2xl md:px-6"
      >
        <a
          href="#hero"
          className="group inline-flex items-center font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-800 md:text-base"
        >
          <span className="transition-colors duration-300 group-hover:text-slate-950">{BRAND.name}</span>
        </a>

        <ul className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-white/70 hover:text-slate-900"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button asChild size="sm" className="group hidden sm:inline-flex">
          <a href="#contact">
            Démarrer
            <ArrowUpRight size={15} className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Button>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-700 lg:hidden"
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
              className="absolute left-0 right-0 top-[calc(100%+10px)] rounded-2xl border border-white/90 bg-white/88 p-3 shadow-[0_20px_35px_rgba(123,157,217,0.22)] backdrop-blur-2xl lg:hidden"
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
              <Button asChild size="sm" className="mt-2.5 w-full">
                <a href="#contact" onClick={closeMenu}>
                  Démarrer
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
