import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BRAND } from "@/lib/brand";
import { startProjectPath, workPath } from "@/lib/site-routes";

// Statically prerendered once for every unknown URL, so the locale of the
// request is not known here: French first, with an English way out.
export function NotFoundContent() {
  return (
    <main id="main-content" className="rs-theme-dark flex min-h-screen flex-col bg-rs-bg text-rs-fg">
      <Container className="flex h-16 items-center">
        <Link href="/fr" className="text-sm font-bold uppercase tracking-[0.22em] text-rs-fg">
          {BRAND.name}
        </Link>
      </Container>
      <Container className="flex flex-1 flex-col justify-center py-24">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-rs-muted">Erreur 404</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.04] tracking-tight md:text-5xl">
          Cette page n&apos;existe pas.
        </h1>
        <p className="mt-6 max-w-[var(--rs-reading)] text-lg leading-relaxed text-rs-muted">
          Le lien est peut-être ancien ou mal saisi. Les pages principales du studio restent accessibles
          ci-dessous.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 rounded-full bg-rs-fg px-7 py-3.5 text-base font-semibold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-rs-fg"
          >
            Retour à l&apos;accueil
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
          <Link
            href={workPath("fr")}
            className="inline-flex items-center rounded-full border border-[var(--rs-border-strong)] px-7 py-3.5 text-base font-medium text-rs-fg transition-colors duration-150 hover:border-rs-accent hover:text-rs-accent-fg"
          >
            Voir les réalisations
          </Link>
          <Link
            href={startProjectPath("fr")}
            className="inline-flex items-center gap-2 py-3.5 text-base font-semibold text-rs-accent-fg transition-colors duration-150 hover:text-rs-fg"
          >
            Démarrer un projet
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <p lang="en" className="mt-14 border-t border-[var(--rs-border)] pt-6 text-sm text-rs-muted">
          This page does not exist.{" "}
          <Link
            href="/en"
            hrefLang="en"
            className="text-rs-fg underline underline-offset-4 transition-colors duration-150 hover:text-rs-accent-fg"
          >
            Go to the English homepage
          </Link>
        </p>
      </Container>
    </main>
  );
}
