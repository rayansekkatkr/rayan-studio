import Link from "next/link";
import { ManageCookiesButton } from "@/components/site/ManageCookiesButton";
import { getNavigation } from "@/content/navigation";
import type { Locale } from "@/lib/i18n";
import { contactPath, startProjectPath } from "@/lib/site-routes";
import { LanguageSwitch } from "./language-switch";

export function SiteFooter({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const menus = getNavigation(locale);
  const year = new Date().getFullYear();

  const legalLinks = [
    { label: fr ? "Mentions légales" : "Legal notice", href: "/mentions-legales" },
    { label: fr ? "Politique de confidentialité" : "Privacy policy", href: "/politique-confidentialite" },
    { label: "CGV", href: "/cgv" },
  ];

  return (
    <footer className="border-t border-[var(--rs-border)] bg-rs-bg">
      <div className="mx-auto w-full max-w-[var(--rs-container)] px-5 py-14 md:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="max-w-xs">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-rs-fg">RAYAN STUDIO</p>
            <p className="mt-4 text-sm leading-relaxed text-rs-muted">
              {fr
                ? "Studio indépendant : applications, plateformes et sites web premium, du cadrage à la mise en production."
                : "Independent studio: applications, platforms and premium websites, from framing to production."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {menus.map((menu) => (
              <div key={menu.key}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rs-muted">
                  {menu.label}
                </p>
                <ul className="mt-3 space-y-2">
                  {menu.groups.flatMap((group) => group.links).map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-rs-fg transition-colors duration-150 hover:text-rs-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--rs-border)] pt-6 text-sm text-rs-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link href={startProjectPath(locale)} className="transition-colors duration-150 hover:text-rs-fg">
              {fr ? "Démarrer un projet" : "Start a project"}
            </Link>
            <Link href={contactPath(locale)} className="transition-colors duration-150 hover:text-rs-fg">
              {fr ? "Nous contacter" : "Contact us"}
            </Link>
            {legalLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors duration-150 hover:text-rs-fg">
                {link.label}
              </a>
            ))}
            <ManageCookiesButton label={fr ? "Gérer les cookies" : "Manage cookies"} />
          </div>
          <div className="flex items-center gap-6">
            <LanguageSwitch locale={locale} />
            <p>© {year} Rayan Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
