import { Button } from "@/components/ui/button";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { localSeoCities, localSeoSectors, type LocalSeoCitySlug, type LocalSeoSectorSlug } from "@/lib/local-seo";
import type { LocalSeoContent } from "@/lib/local-seo-content";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

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
      <Navbar locale="fr" />
      <main id="main-content" className="min-h-screen px-4 pb-12 pt-28 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Fil d'Ariane" className="text-xs font-black uppercase tracking-[0.1em] text-[#6f6355]">
          <a href="/fr" className="transition-colors hover:text-[#c2461f]">
            Accueil
          </a>
          <span aria-hidden="true"> / </span>
          <span>{sector}</span>
          <span aria-hidden="true"> / </span>
          <span className="text-[#17120f]">{city}</span>
        </nav>

        <p className="mt-4 inline-flex rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/84 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#c2461f]">
          {city} • {sector}
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold leading-tight text-[#17120f] md:text-5xl">{content.title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-[#63584d]">{content.subtitle}</p>
        {content.districtsLine ? (
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#63584d]">{content.districtsLine}</p>
        ) : null}

        <div className="mt-8 grid gap-4 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/80 p-5 shadow-[6px_6px_0_rgba(42,35,29,0.08)] md:grid-cols-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">Objectif</p>
            <p className="mt-2 text-sm font-semibold text-[#17120f]">Plus de demandes locales qualifiées</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">Délai</p>
            <p className="mt-2 text-sm font-semibold text-[#17120f]">Première direction en 72h</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">Priorité secteur</p>
            <p className="mt-2 text-sm font-semibold text-[#17120f]">{content.objective}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/82 p-5 shadow-[6px_6px_0_rgba(42,35,29,0.08)]">
            <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-[#c2461f]">Contexte local à {city}</h2>
            <p className="mt-3 text-sm leading-7 text-[#63584d]">{content.localContext}</p>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#342b24]">{content.sectorIntent}</p>
          </section>

          <section className="rounded-none border border-[#2a231d]/14 bg-[#17120f] p-5 text-[#fffaf0] shadow-[6px_6px_0_rgba(217,79,43,0.32)]">
            <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-[#f0a064]">Points à corriger</h2>
            <div className="mt-3 space-y-2">
              {content.painPoints.map((point) => (
                <p key={point} className="text-sm font-semibold leading-6 text-[#f7ead8]">
                  {point}
                </p>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/80 p-5">
          <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">Checklist de page locale</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {content.checklist.map((item, index) => (
              <div key={item} className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#c2461f]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-black text-[#17120f]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {content.faq.length > 0 ? (
          <section className="mt-8 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/82 p-5 shadow-[6px_6px_0_rgba(42,35,29,0.08)]">
            <h2 className="font-display text-2xl font-semibold text-[#17120f]">
              Questions fréquentes : {sector.toLowerCase()} à {city}
            </h2>
            <div className="mt-4 space-y-3">
              {content.faq.map((entry) => (
                <article key={entry.question} className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] p-4">
                  <h3 className="text-sm font-black text-[#17120f]">{entry.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#63584d]">{entry.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href="/fr#contact">Recevoir un diagnostic adapté à mon activité</a>
          </Button>
          <Button asChild variant="outline">
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer">
              Parler sur WhatsApp
            </a>
          </Button>
        </div>
        <p className="mt-4 max-w-2xl text-sm font-semibold text-[#63584d]">{content.ctaIntro}</p>

        <section className="mt-10 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/80 p-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">Services liés</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {[
              { href: "/fr/refonte-site-internet", label: "Refonte de site internet" },
              { href: "/fr/creation-site-vitrine", label: "Création de site vitrine" },
              { href: "/fr/site-internet-petite-entreprise", label: "Site internet petite entreprise" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-3 text-sm font-black text-[#17120f] transition hover:-translate-y-0.5 hover:text-[#c2461f]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/80 p-4">
          <h2 className="text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">
            Site {sector.toLowerCase()} dans d&apos;autres villes
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {otherCities.map((item) => (
              <a
                key={item.slug}
                href={`/site/${sectorSlug}/${item.slug}`}
                className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-1.5 text-xs font-black text-[#17120f] transition-colors hover:text-[#c2461f]"
              >
                {item.label}
              </a>
            ))}
          </div>
          <h2 className="mt-5 text-[11px] font-black uppercase tracking-[0.12em] text-[#6f6355]">
            Autres activités à {city}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {otherSectors.map((item) => (
              <a
                key={item.slug}
                href={`/site/${item.slug}/${citySlug}`}
                className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-1.5 text-xs font-black text-[#17120f] transition-colors hover:text-[#c2461f]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>
      </div>
      </main>
      <Footer locale="fr" />
    </>
  );
}
