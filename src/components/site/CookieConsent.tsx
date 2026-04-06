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
    <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto w-full max-w-4xl rounded-2xl border border-white/85 bg-white/92 p-4 shadow-[0_20px_40px_rgba(109,141,196,0.25)] backdrop-blur-xl">
      <p className="text-sm text-slate-700">
        {isEnglish
          ? "We use analytics cookies to improve the website. You can accept or decline these cookies."
          : "Nous utilisons des cookies de mesure d'audience pour améliorer le site. Vous pouvez accepter ou refuser ces cookies."}
        {" "}
        <Link href="/politique-confidentialite" className="font-semibold text-[#2f6dff] underline underline-offset-2">
          {isEnglish ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          type="button"
          className="rounded-full border border-[#d6e6ff] bg-[#eef5ff] px-4 py-2 text-sm font-semibold text-[#2f6dff]"
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
          className="rounded-full border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
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
