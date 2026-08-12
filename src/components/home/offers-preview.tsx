import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Locale } from "@/lib/i18n";
import { studioPath } from "@/lib/site-routes";

export function OffersPreview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const offers = fr
    ? [
        { title: "Applications & plateformes", body: "Produits web et SaaS conçus autour de votre métier." },
        { title: "MVP & lancement", body: "Une première version crédible, mise en production rapidement." },
        { title: "Sites premium & refonte", body: "Un site au niveau de ce que vous faites réellement." },
        { title: "Accompagnement continu", body: "Évolutions, fiabilité et suivi après la mise en ligne." },
      ]
    : [
        { title: "Applications & platforms", body: "Web products and SaaS designed around your business." },
        { title: "MVP & launch", body: "A credible first version, shipped to production quickly." },
        { title: "Premium websites & redesign", body: "A website that matches the quality of what you do." },
        { title: "Ongoing partnership", body: "Evolutions, reliability and follow-up after launch." },
      ];

  return (
    <div className="bg-rs-subtle py-[var(--rs-section-space)] lg:flex lg:min-h-[100svh] lg:items-center">
      <Container>
        <Eyebrow>{fr ? "Offres" : "Offers"}</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
          {fr ? "Quatre façons de travailler ensemble." : "Four ways to work together."}
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-6"
            >
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-rs-muted">{offer.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base font-medium text-rs-fg">
          {fr ? "Première réponse sous 24h ouvrées." : "First response within 24 business hours."}
        </p>
        <p className="mt-2 max-w-[var(--rs-reading)] text-sm leading-relaxed text-rs-muted">
          {fr
            ? "Une proposition détaillée avec périmètre, planning et budget vous est envoyée après un premier échange de cadrage."
            : "A detailed proposal with scope, planning and budget is sent after a first framing conversation."}
        </p>
        <TrackedLink
          href={studioPath(locale, "offers")}
          event={{
            ctaId: "home_offers",
            source: "home_offers_preview",
            destination: studioPath(locale, "offers"),
            locale,
          }}
          className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-rs-accent transition-colors duration-150 hover:text-rs-fg"
        >
          {fr ? "Voir les offres" : "View offers"}
          <ArrowRight aria-hidden className="h-4 w-4" />
        </TrackedLink>
      </Container>
    </div>
  );
}
