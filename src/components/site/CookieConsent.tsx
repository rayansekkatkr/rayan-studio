"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readConsent, saveConsent, trackEvent } from "@/lib/analytics";
import { legalPath } from "@/lib/site-routes";

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
    if (readConsent() === null) {
      setVisible(true);
    }

    const reopen = () => setVisible(true);
    window.addEventListener("rs-open-consent", reopen);
    return () => window.removeEventListener("rs-open-consent", reopen);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label={isEnglish ? "Cookie consent" : "Consentement aux cookies"}
      className="rs-theme-dark fixed inset-x-3 bottom-3 z-[80] bg-rs-bg p-5 text-rs-fg shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[27rem] sm:p-6"
    >
      <p className="text-[2.25rem] font-black leading-[0.9] tracking-[-0.05em]">Cookies</p>
      <p className="mt-3 text-sm leading-relaxed text-rs-muted">
        {isEnglish
          ? "Audience measurement (analytics cookies), only if you accept them. No advertising."
          : "Des cookies de mesure d'audience, uniquement si vous les acceptez. Aucune publicité."}{" "}
        <Link
          href={legalPath(isEnglish ? "en" : "fr", "privacy")}
          className="font-semibold text-rs-fg underline underline-offset-4"
        >
          {isEnglish ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="bg-rs-fg px-5 py-3 text-sm font-bold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent hover:text-white"
          onClick={() => {
            saveConsent("accepted");
            window.dispatchEvent(new Event("rs-consent-granted"));
            updateConsent(true);
            trackEvent("cookie_consent", { choice: "accepted" });
            setVisible(false);
          }}
        >
          {isEnglish ? "Accept" : "Accepter"}
        </button>
        <button
          type="button"
          className="border border-rs-fg px-5 py-3 text-sm font-bold text-rs-fg transition-colors duration-150 hover:bg-rs-fg hover:text-[var(--rs-dark)]"
          onClick={() => {
            saveConsent("declined");
            window.dispatchEvent(new Event("rs-consent-revoked"));
            updateConsent(false);
            setVisible(false);
          }}
        >
          {isEnglish ? "Decline" : "Refuser"}
        </button>
      </div>
    </aside>
  );
}
