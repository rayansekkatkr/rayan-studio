import { Button } from "@/components/ui/button";
import { BRAND, getSiteUrl } from "@/lib/brand";
import type { LocalSeoContent } from "@/lib/local-seo-content";

type LocalSeoLandingProps = {
  city: string;
  sector: string;
  content: LocalSeoContent;
};

export function LocalSeoLanding({ city, sector, content }: LocalSeoLandingProps) {
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
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
  };

  return (
    <main className="min-h-screen px-4 pb-12 pt-28 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-5xl">
        <p className="inline-flex rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/84 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#d94f2b]">
          {city} • {sector}
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold leading-tight text-[#17120f] md:text-5xl">{content.title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-[#63584d]">{content.subtitle}</p>

        <div className="mt-8 grid gap-4 rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/80 p-5 shadow-[6px_6px_0_rgba(42,35,29,0.08)] md:grid-cols-3">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#8a7d6f]">Objectif</p>
            <p className="mt-2 text-sm font-semibold text-[#17120f]">Plus de demandes locales qualifiées</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#8a7d6f]">Délai</p>
            <p className="mt-2 text-sm font-semibold text-[#17120f]">Première direction en 72h</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#8a7d6f]">Résultat observé</p>
            <p className="mt-2 text-sm font-semibold text-[#17120f]">{content.proof}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
          <section className="rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/82 p-5 shadow-[6px_6px_0_rgba(42,35,29,0.08)]">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#d94f2b]">Contexte local</p>
            <p className="mt-3 text-sm leading-7 text-[#63584d]">{content.localContext}</p>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#342b24]">{content.sectorIntent}</p>
          </section>

          <section className="rounded-none border border-[#2a231d]/14 bg-[#17120f] p-5 text-[#fffaf0] shadow-[6px_6px_0_rgba(217,79,43,0.32)]">
            <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#f0a064]">Points à corriger</p>
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
          <p className="text-[11px] font-black uppercase tracking-[0.12em] text-[#8a7d6f]">Checklist de page locale</p>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {content.checklist.map((item, index) => (
              <div key={item} className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#d94f2b]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-black text-[#17120f]">{item}</p>
              </div>
            ))}
          </div>
        </section>

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

        <div className="mt-10 grid gap-3 border border-[#2a231d]/14 bg-[#fffaf0]/80 p-4 md:grid-cols-3">
          {[
            { href: "/fr/refonte-site-internet", label: "Refonte de site internet" },
            { href: "/fr/creation-site-vitrine", label: "Création de site vitrine" },
            { href: "/fr/site-internet-petite-entreprise", label: "Site internet petite entreprise" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-none border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-3 text-sm font-black text-[#17120f] transition hover:-translate-y-0.5 hover:text-[#d94f2b]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
