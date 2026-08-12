import type { Locale } from "@/lib/i18n";

export type ContactSubmission = {
  locale: Locale;
  name: string;
  email: string;
  subject: string;
  message: string;
  companyWebsite?: string;
};

export type ProjectType = "application" | "mvp" | "website" | "automation" | "backend" | "devops" | "other";
export type ProjectStage = "idea" | "requirements" | "design" | "existing-product" | "in-development";
export type ProjectTiming = "asap" | "1-3-months" | "3-6-months" | "undefined";

export type ProjectSubmission = {
  locale: Locale;
  projectType: ProjectType;
  stage: ProjectStage;
  objective: string;
  timing: ProjectTiming;
  name: string;
  company: string;
  email: string;
  budget?: string;
  companyWebsite?: string;
};

export type ValidationErrorCode =
  | "INVALID_REQUEST"
  | "MISSING_FIELDS"
  | "INVALID_EMAIL"
  | "INVALID_PROJECT_TYPE"
  | "INVALID_STAGE"
  | "INVALID_TIMING";

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; code: ValidationErrorCode };
