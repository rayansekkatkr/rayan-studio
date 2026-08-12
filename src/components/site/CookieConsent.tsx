"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_KEY, trackEvent } from "@/lib/analytics";

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
    if (saved !== "accepted" && saved !== "declined") {
      setVisible(true);
    }

    const reopen = () => setVisible(true);
    window.addEventListener("rs-open-consent", reopen);
    return () => window.removeEventListener("rs-open-consent", reopen);
  }, []);

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-[calc(100vw-1.5rem)] rounded-[var(--rs-radius-md)] border border-[var(--rs-border)] bg-[var(--rs-mega-surface)] p-4 shadow-[0_16px_40px_-24px_rgba(11,11,14,0.4)] backdrop-blur-xl sm:max-w-4xl">
      <p className="text-sm text-rs-muted">
        {isEnglish
          ? "We use analytics cookies to improve the website. You can accept or decline these cookies."
          : "Nous utilisons des cookies de mesure d'audience pour améliorer le site. Vous pouvez accepter ou refuser ces cookies."}
        {" "}
        <Link href="/politique-confidentialite" className="font-semibold text-rs-accent underline underline-offset-2">
          {isEnglish ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <button
          type="button"
          className="rounded-full bg-rs-fg px-5 py-2.5 text-sm font-semibold text-rs-bg transition-colors duration-150 hover:bg-rs-accent"
          onClick={() => {
            window.localStorage.setItem(CONSENT_KEY, "accepted");
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
          className="rounded-full border border-[var(--rs-border-strong)] bg-rs-surface px-5 py-2.5 text-sm font-semibold text-rs-fg transition-colors duration-150 hover:border-rs-accent"
          onClick={() => {
            window.localStorage.setItem(CONSENT_KEY, "declined");
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
