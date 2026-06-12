import { Button } from "@/components/ui/button";
import { BRAND, getSiteUrl } from "@/lib/brand";

type LocalSeoLandingProps = {
  city: string;
  sector: string;
  title: string;
  subtitle: string;
  kpi: string;
};

export function LocalSeoLanding({ city, sector, title, subtitle, kpi }: LocalSeoLandingProps) {
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
        <h1 className="font-display mt-5 text-4xl font-semibold leading-tight text-[#17120f] md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-[#63584d]">{subtitle}</p>

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
            <p className="mt-2 text-sm font-semibold text-[#17120f]">{kpi}</p>
          </div>
        </div>

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
