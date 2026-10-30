import type { Locale } from "@/lib/i18n";

// Technologies actually used on the studio's products and engagements (see the work pages).
export const TECH_STACK: Array<{ label: Record<Locale, string>; items: string[] }> = [
  { label: { fr: "Front-end & mobile", en: "Front-end & mobile" }, items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Flutter"] },
  { label: { fr: "Back-end & API", en: "Back-end & APIs" }, items: ["Node.js", "NestJS", "Python", "FastAPI", "Django", "Celery"] },
  { label: { fr: "Données", en: "Data" }, items: ["PostgreSQL", "Redis", "Prisma", "SQLAlchemy", "MinIO"] },
  { label: { fr: "DevOps & cloud", en: "DevOps & cloud" }, items: ["Docker", "Kubernetes", "Terraform", "Ansible", "GitLab CI", "GitHub Actions", "AWS", "Vercel"] },
  { label: { fr: "IA & LLM", en: "AI & LLMs" }, items: ["Claude", "OpenAI / Azure OpenAI", "Mistral", "Copilot Studio", "RAG", "MCP"] },
  { label: { fr: "Paiements & services", en: "Payments & services" }, items: ["Stripe", "Socket.IO", "Firebase", "Brevo"] },
];
