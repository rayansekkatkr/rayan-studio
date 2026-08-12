import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import { AnalyticsLoader } from "@/components/site/AnalyticsLoader";
import { CookieConsent } from "@/components/site/CookieConsent";
import { WebVitalsReporter } from "@/components/site/WebVitalsReporter";
import { BRAND, getSiteUrl } from "@/lib/brand";
import { getGoogleSiteVerification } from "@/lib/seo-verification";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const sharedMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${BRAND.name} | Studio software, SaaS et expériences web sur mesure`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "Studio indépendant qui conçoit et développe applications, plateformes SaaS et sites web premium, avec un interlocuteur unique du cadrage à la mise en production.",
  applicationName: BRAND.name,
  keywords: [
    "studio software",
    "développement application web",
    "développement SaaS",
    "création MVP",
    "API backend",
    "automatisation IA",
    "DevOps cloud",
    "site web premium",
    "refonte site internet",
    "création site vitrine",
    "freelance web",
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
  verification: {
    google: getGoogleSiteVerification(),
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    title: `${BRAND.name} | Studio software, SaaS et expériences web sur mesure`,
    description:
      "Applications, plateformes SaaS et sites web premium conçus et développés par un studio indépendant, du cadrage à la mise en production.",
    siteName: BRAND.name,
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: `${BRAND.name} - Studio software et web`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Studio software, SaaS et expériences web sur mesure`,
    description:
      "Applications, plateformes SaaS et sites web premium conçus et développés par un studio indépendant, du cadrage à la mise en production.",
    images: ["/twitter-image"],
  },
};

export const sharedViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function RootBody({ children, locale = "fr" }: { children: React.ReactNode; locale?: "fr" | "en" }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <body className={`${sansFont.variable} ${serifFont.variable} antialiased`}>
      <a href="#main-content" className="skip-link">
        {locale === "en" ? "Skip to main content" : "Aller au contenu principal"}
      </a>
      {gaId ? <AnalyticsLoader gaId={gaId} /> : null}
      {gaId ? <WebVitalsReporter /> : null}
      {children}
      {gaId ? <CookieConsent /> : null}
    </body>
  );
}
