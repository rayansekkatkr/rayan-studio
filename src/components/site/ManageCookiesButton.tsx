"use client";

export function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="uppercase tracking-[0.15em] transition-colors hover:text-[#c2461f]"
      onClick={() => window.dispatchEvent(new Event("rs-open-consent"))}
    >
      {label}
    </button>
  );
}
