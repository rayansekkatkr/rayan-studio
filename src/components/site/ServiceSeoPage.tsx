import { ArrowRight, Check, FileSearch, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, getSiteUrl } from "@/lib/brand";

type ServiceSeoSection = {
  title: string;
  items: string[];
};

type ServiceSeoFaq = {
  question: string;
  answer: string;
};

type ServiceSeoPageData = {
  locale: "fr" | "en";
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  proofLabel: string;
  proofValue: string;
  sections: ServiceSeoSection[];
  process: string[];
  faq: ServiceSeoFaq[];
};

export function ServiceSeoPage({ page }: { page: ServiceSeoPageData }) {
  const en = page.locale === "en";
  const siteUrl = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${siteUrl}${page.path}#service`,
        name: page.title,
        description: page.description,
        serviceType: page.eyebrow,
        provider: {
          "@type": "ProfessionalService",
          name: BRAND.name,
          url: siteUrl,
          email: BRAND.email,
          telephone: BRAND.phoneRaw,
        },
        areaServed: en ? ["France", "United Kingdom", "Ireland", "Canada"] : "France",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}${page.path}#faq`,
        mainEntity: page.faq.map((entry) => ({
          "@type": "Question",
          name: entry.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: entry.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-16 pt-28 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pointer-events-none fixed inset-0 -z-20 hero-aurora" />
      <div className="pointer-events-none fixed inset-0 -z-10 hero-vignette" />

      <div className="mx-auto max-w-7xl">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <a
              href={`/${page.locale}`}
              className="inline-flex rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/84 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-[#d94f2b] transition hover:-translate-y-0.5"
            >
              {page.eyebrow}
            </a>
            <h1 className="font-display mt-6 max-w-4xl text-5xl font-semibold leading-[0.98] text-[#17120f] md:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#63584d]">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={`/${page.locale}#contact`}>
                  {page.primaryCta}
                  <ArrowRight size={15} className="ml-2" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`/${page.locale}#tarifs`}>{page.secondaryCta}</a>
              </Button>
            </div>
          </div>

          <div className="border border-[#2a231d]/14 bg-[#fffaf0]/86 p-5 shadow-[10px_10px_0_rgba(42,35,29,0.1)]">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#d94f2b]">{page.proofLabel}</p>
            <p className="font-display mt-3 text-2xl font-semibold leading-tight text-[#17120f]">{page.proofValue}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {page.process.map((step, index) => (
                <div key={step} className="border border-[#2a231d]/12 bg-[#f5f1e8] px-3 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#d94f2b]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-black text-[#17120f]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article key={section.title} className="border border-[#2a231d]/14 bg-[#fffaf0]/82 p-5">
              <div className="inline-flex rounded-none border border-[#2a231d]/14 bg-[#17120f] p-2 text-[#fffaf0]">
                <FileSearch size={18} />
              </div>
              <h2 className="font-display mt-5 text-2xl font-semibold text-[#17120f]">{section.title}</h2>
              <div className="mt-5 space-y-3">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm leading-6 text-[#63584d]">
                    <span className="mt-1 rounded-none bg-[#17120f] p-1 text-[#fffaf0]">
                      <Check size={11} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="border border-[#2a231d]/14 bg-[#17120f] p-5 text-[#fffaf0]">
            <div className="inline-flex rounded-none border border-[#fffaf0]/16 bg-[#fffaf0] p-2 text-[#17120f]">
              <MessageSquareText size={18} />
            </div>
            <h2 className="font-display mt-5 text-3xl font-semibold">
              {en ? "Questions before starting" : "Questions avant de démarrer"}
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#f7ead8]">
              {en
                ? "These pages are built for search, but the offer stays practical: understand the business, clarify the message, then launch cleanly."
                : "Ces pages servent le SEO, mais l'offre reste concrète: comprendre l'activité, clarifier le message, puis mettre en ligne proprement."}
            </p>
          </div>

          <div className="space-y-3">
            {page.faq.map((entry) => (
              <article key={entry.question} className="border border-[#2a231d]/14 bg-[#fffaf0]/84 p-4">
                <h3 className="text-base font-black text-[#17120f]">{entry.question}</h3>
                <p className="mt-2 text-sm leading-6 text-[#63584d]">{entry.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
