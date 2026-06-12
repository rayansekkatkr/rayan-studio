import { BRAND } from "@/lib/brand";
import { isEnglish, type Locale } from "@/lib/i18n";
import { getServiceSeoPagesByLocale } from "@/lib/service-seo";

export function Footer({ locale = "fr" }: { locale?: Locale }) {
  const en = isEnglish(locale);
  const serviceLinks = getServiceSeoPagesByLocale(locale);

  return (
    <footer className="px-4 pb-10 md:px-8">
      <div className="glass-panel mx-auto grid w-full max-w-7xl gap-5 rounded-none px-5 py-5 text-sm text-[#63584d] lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p>
            © {new Date().getFullYear()} {BRAND.name}. {en ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em]">
            <a href={`/${locale}#hero`} className="transition-colors hover:text-[#d94f2b]">
              {en ? "Home" : "Accueil"}
            </a>
            <a href={`/${locale}#services`} className="transition-colors hover:text-[#d94f2b]">
              {en ? "Services" : "Services"}
            </a>
            <a href={`/${locale}#contact`} className="transition-colors hover:text-[#d94f2b]">
              {en ? "Contact" : "Contact"}
            </a>
            <a href={`/${locale}/a-propos-methodologie-preuves`} className="transition-colors hover:text-[#d94f2b]">
              {en ? "About" : "À propos"}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] lg:justify-end">
            {serviceLinks.map((service) => (
              <a key={service.path} href={service.path} className="transition-colors hover:text-[#d94f2b]">
                {service.eyebrow}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.15em] lg:justify-end">
            <a href="/mentions-legales" className="transition-colors hover:text-[#d94f2b]">
              {en ? "Legal notice" : "Mentions légales"}
            </a>
            <a href="/politique-confidentialite" className="transition-colors hover:text-[#d94f2b]">
              {en ? "Privacy policy" : "Politique de confidentialité"}
            </a>
            <a href="/cgv" className="transition-colors hover:text-[#d94f2b]">
              CGV
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
