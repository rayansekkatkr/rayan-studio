"use client";

export function ManageCookiesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="transition-colors duration-150 hover:text-rs-accent"
      onClick={() => window.dispatchEvent(new Event("rs-open-consent"))}
    >
      {label}
    </button>
  );
}
