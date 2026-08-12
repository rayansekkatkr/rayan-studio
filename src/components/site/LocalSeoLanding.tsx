import { SiteFooter } from "@/components/navigation/site-footer";
import { SiteHeader } from "@/components/navigation/site-header";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { localSeoCities, localSeoSectors, type LocalSeoCitySlug, type LocalSeoSectorSlug } from "@/lib/local-seo";
import type { LocalSeoContent } from "@/lib/local-seo-content";
import { servicePath, startProjectPath } from "@/lib/site-routes";

type LocalSeoLandingProps = {
  city: string;
  citySlug: LocalSeoCitySlug;
  sector: string;
  sectorSlug: LocalSeoSectorSlug;
  content: LocalSeoContent;
};

export function LocalSeoLanding({ city, citySlug, sector, sectorSlug, content }: LocalSeoLandingProps) {
  const siteUrl = getSiteUrl();
  const pagePath = `/site/${sectorSlug}/${citySlug}`;
  const otherCities = localSeoCities.filter((item) => item.slug !== citySlug);
  const otherSectors = localSeoSectors.filter((item) => item.slug !== sectorSlug);

  const relatedServices = [
    { href: servicePath("fr", "web"), label: "Sites premium & refonte" },
    { href: "/fr/insights/checklists/checklist-refonte-site-internet", label: "Checklist de refonte" },
    { href: startProjectPath("fr"), label: "Démarrer un projet" },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}${pagePath}#service`,
        serviceType: `Création de site ${sector.toLowerCase()} à ${city}`,
        areaServed: {
          "@type": "City",
          name: city,
        },
        provider: {
          "@type": "ProfessionalService",
          name: BRAND.name,
          url: siteUrl,
          telephone: BRAND.phoneRaw,
          email: BRAND.email,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}${pagePath}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${siteUrl}/fr` },
          { "@type": "ListItem", position: 2, name: `${sector} à ${city}`, item: `${siteUrl}${pagePath}` },
        ],
      },
      ...(content.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}${pagePath}#faq`,
              mainEntity: content.faq.map((entry) => ({
                "@type": "Question",
                name: entry.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: entry.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <SiteHeader locale="fr" topTheme="light" />
      <main id="main-content" className="min-h-screen bg-rs-bg px-4 pb-16 pt-28 text-rs-fg md:px-8 md:pt-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="text-xs font-semibold uppercase tracking-[0.12em] text-rs-muted">
            <a href="/fr" className="transition-colors duration-150 hover:text-rs-accent">
              Accueil
            </a>
            <span aria-hidden="true"> / </span>
            <span>{sector}</span>
            <span aria-hidden="true"> / </span>
            <span className="text-rs-fg">{city}</span>
          </nav>

          <p className="mt-4 inline-flex rounded-full border border-[var(--rs-border)] bg-rs-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-rs-accent">
            {city} · {sector}
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-rs-fg md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-rs-muted">{content.subtitle}</p>
          {content.districtsLine ? (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-rs-muted">{content.districtsLine}</p>
          ) : null}

          <div className="mt-8 grid gap-4 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5 md:grid-cols-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">Objectif</p>
              <p className="mt-2 text-sm font-semibold text-rs-fg">Plus de demandes locales qualifiées</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">Délai</p>
              <p className="mt-2 text-sm font-semibold text-rs-fg">Première direction en 72h</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">Priorité secteur</p>
              <p className="mt-2 text-sm font-semibold text-rs-fg">{content.objective}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
            <section className="rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-accent">
                Contexte local à {city}
              </h2>
              <p className="mt-3 text-sm leading-7 text-rs-muted">{content.localContext}</p>
              <p className="mt-4 text-sm font-semibold leading-7 text-rs-fg">{content.sectorIntent}</p>
            </section>

            <section className="rs-theme-dark rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-bg p-5 text-rs-fg">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-accent">
                Points à corriger
              </h2>
              <div className="mt-3 space-y-2">
                {content.painPoints.map((point) => (
                  <p key={point} className="text-sm font-medium leading-6">
                    {point}
                  </p>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-8 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">
              Checklist de page locale
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {content.checklist.map((item, index) => (
                <div key={item} className="rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-subtle px-3 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rs-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-rs-fg">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {content.faq.length > 0 ? (
            <section className="mt-8 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-5">
              <h2 className="text-2xl font-semibold tracking-tight text-rs-fg">
                Questions fréquentes : {sector.toLowerCase()} à {city}
              </h2>
              <div className="mt-4 space-y-3">
                {content.faq.map((entry) => (
                  <article key={entry.question} className="rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-subtle p-4">
                    <h3 className="text-sm font-semibold text-rs-fg">{entry.question}</h3>
                    <p className="mt-2 text-sm leading-6 text-rs-muted">{entry.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={startProjectPath("fr")}
              className="inline-flex items-center rounded-full bg-rs-fg px-6 py-3 text-sm font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
            >
              Recevoir un diagnostic adapté à mon activité
            </a>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] px-6 py-3 text-sm font-medium text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent"
            >
              Parler sur WhatsApp
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-sm font-medium text-rs-muted">{content.ctaIntro}</p>

          <section className="mt-10 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">Services liés</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {relatedServices.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-[var(--rs-radius-sm)] border border-[var(--rs-border)] bg-rs-subtle px-3 py-3 text-sm font-semibold text-rs-fg transition-colors duration-150 hover:text-rs-accent"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-rs-surface p-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">
              Site {sector.toLowerCase()} dans d&apos;autres villes
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {otherCities.map((item) => (
                <a
                  key={item.slug}
                  href={`/site/${sectorSlug}/${item.slug}`}
                  className="rounded-full border border-[var(--rs-border)] bg-rs-subtle px-3 py-1.5 text-xs font-semibold text-rs-fg transition-colors duration-150 hover:text-rs-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <h2 className="mt-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-rs-muted">
              Autres activités à {city}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {otherSectors.map((item) => (
                <a
                  key={item.slug}
                  href={`/site/${item.slug}/${citySlug}`}
                  className="rounded-full border border-[var(--rs-border)] bg-rs-subtle px-3 py-1.5 text-xs font-semibold text-rs-fg transition-colors duration-150 hover:text-rs-accent"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter locale="fr" />
    </>
  );
}
