"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const CONSENT_KEY = "rayan_cookie_consent_v1";

function updateConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    setIsEnglish(window.location.pathname.startsWith("/en"));
    const saved = window.localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted") {
      updateConsent(true);
      return;
    }
    if (saved === "declined") {
      updateConsent(false);
      return;
    }
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[calc(100vw-1.5rem)] rounded-none border border-[#2a231d]/14 bg-[#fffaf0]/94 p-4 shadow-[6px_6px_0_rgba(42,35,29,0.1)] backdrop-blur-xl sm:max-w-4xl">
      <p className="text-sm text-[#63584d]">
        {isEnglish
          ? "We use analytics cookies to improve the website. You can accept or decline these cookies."
          : "Nous utilisons des cookies de mesure d'audience pour améliorer le site. Vous pouvez accepter ou refuser ces cookies."}
        {" "}
        <Link href="/politique-confidentialite" className="font-black text-[#d94f2b] underline underline-offset-2">
          {isEnglish ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          type="button"
          className="rounded-none border border-[#17120f] bg-[#17120f] px-4 py-2 text-sm font-black text-[#fffaf0]"
          onClick={() => {
            window.localStorage.setItem(CONSENT_KEY, "accepted");
            updateConsent(true);
            trackEvent("cookie_consent", { choice: "accepted" });
            setVisible(false);
          }}
        >
          {isEnglish ? "Accept" : "Accepter"}
        </button>
        <button
          type="button"
          className="rounded-none border border-[#2a231d]/14 bg-[#fffaf0] px-4 py-2 text-sm font-black text-[#63584d]"
          onClick={() => {
            window.localStorage.setItem(CONSENT_KEY, "declined");
            updateConsent(false);
            trackEvent("cookie_consent", { choice: "declined" });
            setVisible(false);
          }}
        >
          {isEnglish ? "Decline" : "Refuser"}
        </button>
      </div>
    </aside>
  );
}
