"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, Server, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { isEnglish, type Locale } from "@/lib/i18n";

const copy = {
  fr: {
    label: "Audit, refonte et mise en ligne pour petites entreprises",
    title: "Votre site date. Je le transforme en vitrine claire et prete a vendre.",
    subtitle:
      "Refonte ou premier site pour TPE: direction visuelle, SEO local, DNS, hebergement ou VPS et deploiement inclus, avec un interlocuteur unique.",
    primaryCta: "Demander un diagnostic gratuit",
    mobilePrimaryCta: "Diagnostic gratuit",
    secondaryCta: "Voir les transformations",
    craft: "Design · SEO · DNS · Hebergement · Deploiement",
    scroll: "Explorer",
    beforeTitle: "Avant",
    afterTitle: "Apres",
    beforeItems: ["Image datee", "Mobile peu clair", "Technique floue"],
    afterItems: ["DA plus credible", "SEO local pose", "Contact evident"],
    diagnosticTitle: "Diagnostic inclus",
    diagnosticItems: ["Audit visuel", "Parcours mobile", "SEO / DNS / deploiement"],
    dossierTitle: "Dossier de refonte",
    dossierSubtitle: "Plan de relance web",
    techTitle: "Technique prise en charge",
    techItems: ["SEO local inspecte", "DNS / hebergement", "VPS si besoin", "Deploiement propre"],
    solo: "Studio independant, pas une grosse agence",
  },
  en: {
    label: "Audit, redesign and launch for small businesses",
    title: "Your website feels dated. I turn it into a clear storefront ready to sell.",
    subtitle:
      "Redesign or first website for small businesses: visual direction, local SEO, DNS, hosting or VPS and deployment included, with one direct point of contact.",
    primaryCta: "Request a free diagnosis",
    mobilePrimaryCta: "Free diagnosis",
    secondaryCta: "View transformations",
    craft: "Design · SEO · DNS · Hosting · Launch",
    scroll: "Explore",
    beforeTitle: "Before",
    afterTitle: "After",
    beforeItems: ["Dated image", "Weak mobile path", "Unclear technical setup"],
    afterItems: ["More credible direction", "Local SEO set", "Obvious contact"],
    diagnosticTitle: "Included diagnosis",
    diagnosticItems: ["Visual audit", "Mobile journey", "SEO / DNS / deployment"],
    dossierTitle: "Redesign file",
    dossierSubtitle: "Web relaunch plan",
    techTitle: "Technical setup handled",
    techItems: ["Local SEO checked", "DNS / hosting", "VPS if needed", "Clean deployment"],
    solo: "Independent studio, not a big agency",
  },
};

const intro = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { delayChildren: 0.12, staggerChildren: 0.1 },
  },
};

const introItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const t = en ? copy.en : copy.fr;
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate min-h-[84dvh] max-w-full overflow-hidden bg-[#f8f5ee] px-4 pb-5 pt-28 text-[#17120f] md:px-8 md:pt-24 lg:px-10 lg:pb-6 lg:pt-24"
    >
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(120deg,rgba(245,241,232,0.96)_0%,rgba(232,224,210,0.9)_52%,rgba(247,238,224,0.96)_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(23,18,15,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(23,18,15,0.008)_1px,transparent_1px)] bg-[size:96px_96px]"
      />
      <div
        aria-hidden="true"
        className="hidden"
      />

      <motion.div
        variants={intro}
        animate="show"
        className="relative z-10 mx-auto grid min-h-[calc(84dvh-6rem)] w-full max-w-7xl items-center gap-5 overflow-hidden lg:grid-cols-[0.98fr_1.02fr]"
      >
        <div className="min-w-0 py-3 md:py-4 lg:py-0">
          <motion.p
            variants={introItem}
            className="inline-flex max-w-full border border-[#2a231d]/12 bg-[#fffaf0]/78 px-3 py-1.5 text-[10px] font-black uppercase leading-relaxed tracking-[0.16em] text-[#d94f2b] shadow-[3px_3px_0_rgba(42,35,29,0.1)] md:text-[11px]"
          >
            {t.label}
          </motion.p>

          <motion.h1
            variants={introItem}
            className="font-display mt-4 max-w-[16ch] text-[clamp(1.85rem,7.4vw,4.45rem)] font-semibold leading-[0.98] tracking-[-0.01em] text-[#17120f] sm:leading-[0.93]"
          >
            {t.title}
          </motion.h1>

          <motion.p
            variants={introItem}
            className="mt-4 max-w-xl text-[14px] leading-6 text-[#63584d] sm:text-[15px] sm:leading-6"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            variants={introItem}
            className="mt-5 flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href={`/${locale}#contact`}
              onClick={() => trackEvent("cta_click", { location: "hero", cta: "free_diagnosis", locale })}
              className="inline-flex min-h-12 w-full items-center justify-center border border-[#17120f] bg-[#17120f] px-5 text-center text-sm font-black text-[#fffaf0] shadow-[6px_6px_0_rgba(217,79,43,0.72)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_rgba(217,79,43,0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d94f2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1e8] sm:w-auto sm:px-6"
            >
              <span className="sm:hidden">{t.mobilePrimaryCta}</span>
              <span className="hidden sm:inline">{t.primaryCta}</span>
              <ArrowRight size={16} className="ml-2 shrink-0" />
            </a>
            <a
              href={`/${locale}#realisations`}
              onClick={() => trackEvent("cta_click", { location: "hero", cta: "view_transformations", locale })}
              className="inline-flex min-h-12 w-full items-center justify-center border border-[#2a231d]/22 bg-[#fffaf0]/74 px-5 text-sm font-black text-[#17120f] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fffaf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d94f2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1e8] sm:w-auto sm:px-6"
            >
              {t.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            variants={introItem}
            className="mt-5 grid max-w-3xl gap-3 border-t border-[#2a231d]/14 pt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[#63584d] md:grid-cols-[1fr_auto]"
          >
            <p>{t.craft}</p>
            <p className="text-[#17120f]">{t.solo}</p>
          </motion.div>
        </div>

        <motion.div
          variants={introItem}
          className="relative mb-3 min-h-[320px] border border-[#2a231d]/14 bg-[#fffaf0] p-2.5 shadow-[8px_8px_0_rgba(42,35,29,0.1)] md:p-3 lg:mb-0"
        >
          <div className="absolute -right-3 -top-3 hidden border border-[#2a231d]/14 bg-[#d94f2b] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[4px_4px_0_rgba(42,35,29,0.12)] sm:block">
            Refonte
          </div>

          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#2a231d]/12 pb-2.5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d94f2b]">{t.dossierTitle}</p>
              <p className="font-display text-lg font-semibold leading-tight text-[#17120f]">{t.dossierSubtitle}</p>
            </div>
            <p className="border border-[#2a231d]/14 bg-[#f5f1e8] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#63584d]">
              01 / Diagnostic
            </p>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <AuditPanel title={t.beforeTitle} tone="dark" items={t.beforeItems} />
            <AuditPanel title={t.afterTitle} tone="light" items={t.afterItems} />
          </div>

          <div className="mt-2.5 border border-[#2a231d]/14 bg-[#f5f1e8] p-2.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center bg-[#17120f] text-[#fffaf0]">
                <Search size={17} />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d94f2b]">
                  {t.diagnosticTitle}
                </p>
                <p className="font-display text-base font-semibold text-[#17120f]">
                  {en ? "A clear action list before building." : "Une liste d'actions avant de coder."}
                </p>
              </div>
            </div>

            <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
              {t.diagnosticItems.map((item) => (
                <div key={item} className="flex items-center gap-2 border border-[#2a231d]/12 bg-[#fffaf0] px-2.5 py-2 text-xs font-semibold text-[#342b24]">
                  <CheckCircle2 size={15} className="text-[#d94f2b]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2.5 border border-[#2a231d]/14 bg-[#17120f] p-2.5 text-[#fffaf0]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#f0a064]">{t.techTitle}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-4">
              {t.techItems.map((item, index) => (
                <div key={item} className="border border-white/14 bg-white/7 px-2.5 py-1.5 text-[10px] font-black uppercase leading-snug tracking-[0.08em] text-[#f7ead8]">
                  <span className="mb-1 block text-[#f0a064]">0{index + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
            {[
              { icon: Sparkles, label: en ? "New image" : "Image neuve" },
              { icon: Server, label: en ? "Launch handled" : "Mise en ligne" },
              { icon: ArrowRight, label: en ? "More contact" : "Contact clair" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 border border-[#2a231d]/14 bg-[#17120f] p-2 text-[#fffaf0]">
                <item.icon size={16} className="text-[#f0a064]" />
                <p className="text-[10px] font-black uppercase tracking-[0.12em]">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.a
        href={`/${locale}#services`}
        aria-label={t.scroll}
        className="absolute bottom-3 right-5 z-20 hidden items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#63584d] md:flex"
        animate={reducedMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>{t.scroll}</span>
        <span className="h-10 w-px bg-current" />
      </motion.a>
    </section>
  );
}

function AuditPanel({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "dark" | "light";
  items: string[];
}) {
  const dark = tone === "dark";

  return (
    <div
      className={`min-h-[116px] border p-2.5 ${
        dark
          ? "border-[#17120f] bg-[#17120f] text-[#fffaf0]"
          : "border-[#2a231d]/16 bg-[#f5f1e8] text-[#17120f]"
      }`}
    >
      <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${dark ? "text-[#f0a064]" : "text-[#d94f2b]"}`}>
        {title}
      </p>
      <div className="mt-3 space-y-1.5">
        {items.map((item, index) => (
          <div
            key={item}
            className={`flex items-center gap-2 border px-2.5 py-1.5 text-xs font-semibold ${
              dark ? "border-white/14 bg-white/7 text-[#f7ead8]" : "border-[#2a231d]/12 bg-[#fffaf0] text-[#342b24]"
            }`}
          >
            <span className={`text-xs font-black ${dark ? "text-[#f0a064]" : "text-[#d94f2b]"}`}>
              0{index + 1}
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
