import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
import { CookieConsent } from "@/components/site/CookieConsent";
import { BRAND, getSiteUrl } from "@/lib/brand";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BRAND.name} | Refonte de sites pour petites entreprises`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Studio indépendant pour refondre un site daté ou créer le premier site d'une petite entreprise: design, SEO local, DNS, hébergement, VPS et mise en ligne.",
  applicationName: BRAND.name,
  keywords: [
    "freelance web",
    "création site vitrine",
    "refonte site internet",
    "refonte site web petite entreprise",
    "site internet TPE",
    "site vitrine artisan",
    "audit site internet",
    "deploiement site web",
    "hebergement vps site",
    "site commerce local",
    "site restaurant",
    "site café",
    "site hôtel",
    "site boulangerie",
    "site pâtisserie",
    "site bar",
    "commerces locaux",
    "agence web restaurant",
    "site vitrine paris",
    "site vitrine lyon",
    "site vitrine marseille",
    "webdesigner freelance",
    "next.js",
  ],
  authors: [{ name: BRAND.founder, url: getSiteUrl() }],
  creator: BRAND.founder,
  publisher: BRAND.name,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: `${BRAND.name} | Refonte de sites pour petites entreprises`,
    description:
      "Refonte et création de sites pour petites entreprises: direction visuelle, SEO local, DNS, hébergement, VPS et mise en ligne.",
    siteName: BRAND.name,
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} - Refonte de sites pour petites entreprises`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Refonte de sites pour petites entreprises`,
    description:
      "Studio indépendant pour petites entreprises: refonte de site daté, SEO local, DNS, hébergement, VPS et déploiement.",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="fr">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('consent', 'default', {
                  analytics_storage: 'denied',
                  ad_storage: 'denied',
                  ad_user_data: 'denied',
                  ad_personalization: 'denied',
                  wait_for_update: 500
                });
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        {children}
        {gaId ? <CookieConsent /> : null}
      </body>
    </html>
  );
}
