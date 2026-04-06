import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rayanstudio.fr"),
  title: {
    default: "Rayan Studio | Création et refonte de sites premium",
    template: "%s | Rayan Studio",
  },
  description:
    "Freelance web spécialisé dans la création et la refonte de sites vitrines premium pour commerces locaux français (restaurants, cafés, hôtels, boulangeries, pâtisseries, bars).",
  applicationName: "Rayan Studio",
  keywords: [
    "freelance web",
    "création site vitrine",
    "refonte site internet",
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
  authors: [{ name: "Rayan Sekkat", url: "https://rayanstudio.fr" }],
  creator: "Rayan Sekkat",
  publisher: "Rayan Studio",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: "/",
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
    title: "Rayan Studio | Création et refonte de sites premium",
    description:
      "Création et refonte de sites premium pour commerces locaux français. Direction visuelle, UX orientée conversion, développement Next.js.",
    siteName: "Rayan Studio",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Rayan Studio - Création et refonte de sites premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayan Studio | Création et refonte de sites premium",
    description:
      "Freelance web pour commerces locaux: création/refonte de sites premium, design haut de gamme et conversion.",
    images: ["/twitter-image"],
  },
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
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
