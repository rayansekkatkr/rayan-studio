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
        <p className="inline-flex rounded-full border border-[#d6e6ff] bg-[#eef5ff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#2f6dff]">
          {city} • {sector}
        </p>
        <h1 className="font-display mt-5 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-lg text-slate-600">{subtitle}</p>

        <div className="mt-8 grid gap-4 rounded-3xl border border-white/85 bg-white/80 p-5 shadow-[0_20px_36px_rgba(121,156,214,0.18)] md:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Objectif</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Plus de demandes locales qualifiées</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Délai</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Première direction en 72h</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Résultat observé</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{kpi}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href="/#contact">Recevoir une maquette adaptée à mon commerce</a>
          </Button>
          <Button asChild variant="outline">
            <a href={BRAND.whatsappUrl} target="_blank" rel="noreferrer">
              Parler sur WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
