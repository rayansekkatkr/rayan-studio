"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  // After a choice, keep keyboard and screen-reader users in the page instead of dropping
  // focus to <body> when the bar unmounts (WCAG 2.4.3).
  function dismiss() {
    setVisible(false);
    const main = document.getElementById("main-content");
    if (main) {
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
    }
  }
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

  // Publish the bar height as --consent-h so the page can reserve that space: focused
  // elements and the last content never sit under the fixed bar (WCAG 2.4.11).
  const barRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const bar = barRef.current;
    if (!visible || !bar) {
      root.style.removeProperty("--consent-h");
      return;
    }
    const publish = () => root.style.setProperty("--consent-h", `${bar.offsetHeight}px`);
    publish();
    if (typeof ResizeObserver === "undefined") return () => root.style.removeProperty("--consent-h");
    const observer = new ResizeObserver(publish);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-h");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    // Compact bar along the bottom edge: it must never hide the hero paths or the page CTAs.
    <aside
      ref={barRef}
      data-consent-bar
      aria-label={isEnglish ? "Cookie consent" : "Consentement aux cookies"}
      className="rs-theme-dark fixed inset-x-0 bottom-0 z-[80] border-t border-[var(--rs-border)] bg-rs-bg text-rs-fg"
    >
      <div className="mx-auto flex max-w-[var(--rs-container)] flex-col gap-2.5 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-3.5 md:px-8">
      <p className="text-sm leading-snug text-rs-muted">
        <span className="font-semibold text-rs-fg">Cookies.</span>{" "}
        {isEnglish
          ? "Audience measurement (analytics cookies), only if you accept them. No advertising."
          : "Des cookies de mesure d'audience, uniquement si vous les acceptez. Aucune publicité."}{" "}
        <Link
          href={legalPath(isEnglish ? "en" : "fr", "privacy")}
          className="inline-block py-1 font-semibold text-rs-fg underline underline-offset-4"
        >
          {isEnglish ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          className="min-h-11 flex-1 bg-rs-fg px-5 text-sm font-bold text-[var(--rs-dark)] transition-colors duration-150 hover:bg-rs-accent active:bg-rs-accent-hover active:text-[var(--rs-dark-fg)] active:duration-0 hover:text-[var(--rs-dark-fg)] sm:flex-none"
          onClick={() => {
            saveConsent("accepted");
            window.dispatchEvent(new Event("rs-consent-granted"));
            updateConsent(true);
            trackEvent("cookie_consent", { choice: "accepted" });
            dismiss();
          }}
        >
          {isEnglish ? "Accept" : "Accepter"}
        </button>
        <button
          type="button"
          className="min-h-11 flex-1 border border-rs-fg px-5 text-sm font-bold text-rs-fg transition-colors duration-150 hover:bg-rs-fg hover:text-[var(--rs-dark)] sm:flex-none"
          onClick={() => {
            saveConsent("declined");
            window.dispatchEvent(new Event("rs-consent-revoked"));
            updateConsent(false);
            dismiss();
          }}
        >
          {isEnglish ? "Decline" : "Refuser"}
        </button>
      </div>
      </div>
    </aside>
  );
}
