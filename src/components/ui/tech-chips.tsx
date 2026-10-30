import {
  Bot,
  BrainCircuit,
  Braces,
  Cloud,
  CodeXml,
  FlaskConical,
  KeyRound,
  LibraryBig,
  ScanText,
  Sparkles,
  Webhook,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { TECH_ICONS } from "@/content/tech-icons";
import { cn } from "@/lib/utils";

// Generic icons for technologies that have no official mark in simple-icons
// (vendor marks removed at the owner's request, or concepts rather than products).
const GENERIC_ICONS: Record<string, LucideIcon> = {
  AWS: Cloud,
  ChatGPT: Sparkles,
  "OpenAI / Azure OpenAI": Sparkles,
  "Copilot Studio": Bot,
  "Microsoft 365 Copilot": Bot,
  "Power Automate": Workflow,
  Playwright: FlaskConical,
  RAG: LibraryBig,
  LLM: BrainCircuit,
  OCR: ScanText,
  API: Braces,
  APIs: Braces,
  REST: Braces,
  Webhooks: Webhook,
  SSO: KeyRound,
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const brand = TECH_ICONS[name];
  if (brand) {
    return (
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={cn("h-4 w-4 shrink-0", className)}
        style={{ color: brand.color ?? undefined }}
        fill="currentColor"
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const Icon = GENERIC_ICONS[name] ?? CodeXml;
  return <Icon aria-hidden className={cn("h-4 w-4 shrink-0 text-rs-accent-fg", className)} />;
}

export function TechChips({ items, className }: { items: string[]; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--rs-border)] bg-rs-surface py-1.5 pl-3 pr-3.5 text-sm font-medium text-rs-fg"
        >
          <TechIcon name={item} />
          {item}
        </li>
      ))}
    </ul>
  );
}
