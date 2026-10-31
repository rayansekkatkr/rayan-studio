import { ClosingCta } from "@/components/ui/closing-cta";
import type { Locale } from "@/lib/i18n";
import { quotePath, startProjectPath } from "@/lib/site-routes";

export function FinalCta({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <ClosingCta
      locale={locale}
      ctaId="final_free_quote"
      source="home_final_cta"
      className="pt-4"
      href={quotePath(locale)}
      label={fr ? "Demander un devis gratuit" : "Get a free quote"}
      secondary={{
        label: fr ? "Projet d'application ? Parlons-en" : "Application project? Let's talk",
        href: startProjectPath(locale),
        ctaId: "final_start_project",
      }}
      title={fr ? "Vous avez quelque chose à construire ?" : "Do you have something to build?"}
      body={
        fr
          ? "Parlons de votre projet, de votre idée ou du problème que vous cherchez à résoudre. Réponse sous 24 h ouvrées."
          : "Let's talk about your project, your idea or the problem you are trying to solve. Reply within 24 business hours."
      }
    />
  );
}
