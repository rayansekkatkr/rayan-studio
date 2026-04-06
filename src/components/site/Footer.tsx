import { BRAND } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";

export function Footer({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  return (
    <footer className="px-4 pb-10 md:px-8">
      <div className="glass-panel mx-auto flex w-full max-w-7xl flex-col gap-4 rounded-2xl px-5 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {BRAND.name}. {en ? "All rights reserved." : "Tous droits réservés."}
        </p>
        <div className="flex flex-wrap items-center justify-end gap-5 text-xs uppercase tracking-[0.15em] md:ml-auto">
          <a href={`/${locale}#hero`} className="transition-colors hover:text-slate-800">
            {en ? "Home" : "Accueil"}
          </a>
          <a href={`/${locale}#services`} className="transition-colors hover:text-slate-800">
            {en ? "Services" : "Services"}
          </a>
          <a href={`/${locale}#contact`} className="transition-colors hover:text-slate-800">
            {en ? "Contact" : "Contact"}
          </a>
          <a href="/mentions-legales" className="transition-colors hover:text-slate-800">
            {en ? "Legal notice" : "Mentions légales"}
          </a>
          <a href="/politique-confidentialite" className="transition-colors hover:text-slate-800">
            {en ? "Privacy policy" : "Politique de confidentialité"}
          </a>
          <a href={`/${locale}/a-propos-methodologie-preuves`} className="transition-colors hover:text-slate-800">
            {en ? "About" : "À propos"}
          </a>
          <a href="/cgv" className="transition-colors hover:text-slate-800">
            CGV
          </a>
        </div>
      </div>
    </footer>
  );
}
