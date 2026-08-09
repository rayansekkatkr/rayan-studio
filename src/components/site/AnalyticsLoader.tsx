"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "rayan_cookie_consent_v1";

export function AnalyticsLoader({ gaId }: { gaId: string }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(CONSENT_KEY) === "accepted") {
      setEnabled(true);
      return;
    }

    const enable = () => setEnabled(true);
    window.addEventListener("rs-consent-granted", enable);
    return () => window.removeEventListener("rs-consent-granted", enable);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
