import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n";
import type {
  ContactSubmission,
  ProjectStage,
  ProjectSubmission,
  ProjectTiming,
  ProjectType,
  ValidationResult,
} from "./types";

const LIMITS = {
  name: 100,
  email: 160,
  subject: 160,
  message: 5000,
  company: 160,
  budget: 120,
  objective: 6000,
} as const;

const PROJECT_TYPES: readonly ProjectType[] = [
  "application",
  "mvp",
  "website",
  "automation",
  "backend",
  "devops",
  "other",
];
const PROJECT_STAGES: readonly ProjectStage[] = [
  "idea",
  "requirements",
  "design",
  "existing-product",
  "in-development",
];
const PROJECT_TIMINGS: readonly ProjectTiming[] = ["asap", "1-3-months", "3-6-months", "undefined"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sanitizeText(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input.trim().slice(0, maxLength);
}

function normalizeSubmittedLocale(input: unknown): Locale {
  return SUPPORTED_LOCALES.includes(input as Locale) ? (input as Locale) : "fr";
}

export function validateContactSubmission(
  payload: unknown,
): ValidationResult<ContactSubmission> {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, code: "INVALID_REQUEST" };
  }
  const raw = payload as Record<string, unknown>;

  const name = sanitizeText(raw.name, LIMITS.name);
  const email = sanitizeText(raw.email, LIMITS.email);
  const subject = sanitizeText(raw.subject, LIMITS.subject);
  const message = sanitizeText(raw.message, LIMITS.message);

  if (!name || !email || !subject || !message) {
    return { ok: false, code: "MISSING_FIELDS" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, code: "INVALID_EMAIL" };
  }

  return {
    ok: true,
    value: {
      locale: normalizeSubmittedLocale(raw.locale),
      name,
      email,
      subject,
      message,
    },
  };
}

export function validateProjectSubmission(
  payload: unknown,
): ValidationResult<ProjectSubmission> {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, code: "INVALID_REQUEST" };
  }
  const raw = payload as Record<string, unknown>;

  const projectType = sanitizeText(raw.projectType, 40) as ProjectType;
  const stage = sanitizeText(raw.stage, 40) as ProjectStage;
  const timing = sanitizeText(raw.timing, 40) as ProjectTiming;
  const objective = sanitizeText(raw.objective, LIMITS.objective);
  const name = sanitizeText(raw.name, LIMITS.name);
  const company = sanitizeText(raw.company, LIMITS.company);
  const email = sanitizeText(raw.email, LIMITS.email);
  const budget = sanitizeText(raw.budget, LIMITS.budget);

  if (!projectType || !PROJECT_TYPES.includes(projectType)) {
    return { ok: false, code: "INVALID_PROJECT_TYPE" };
  }
  if (!stage || !PROJECT_STAGES.includes(stage)) {
    return { ok: false, code: "INVALID_STAGE" };
  }
  if (!timing || !PROJECT_TIMINGS.includes(timing)) {
    return { ok: false, code: "INVALID_TIMING" };
  }
  if (!objective || !name || !company || !email) {
    return { ok: false, code: "MISSING_FIELDS" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, code: "INVALID_EMAIL" };
  }

  return {
    ok: true,
    value: {
      locale: normalizeSubmittedLocale(raw.locale),
      projectType,
      stage,
      objective,
      timing,
      name,
      company,
      email,
      budget: budget || undefined,
    },
  };
}
