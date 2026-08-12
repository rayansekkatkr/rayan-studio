import { BRAND } from "@/lib/brand";
import type { ContactSubmission, ProjectSubmission } from "./types";

export function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type RenderedEmail = {
  subject: string;
  textContent: string;
  htmlContent: string;
  tags: string[];
};

function htmlField(label: string, value: string, multiline = false): string {
  const safe = multiline ? escapeHtml(value).replaceAll("\n", "<br/>") : escapeHtml(value);
  return `<p><strong>${label}:</strong>${multiline ? "<br/>" : " "}${safe}</p>`;
}

export function renderContactEmail(value: ContactSubmission): RenderedEmail {
  const subject = `Contact - ${BRAND.name}: ${value.subject}`.slice(0, 200);

  const textContent = [
    `Nouveau message de contact ${BRAND.name}`,
    `Nom: ${value.name}`,
    `Email: ${value.email}`,
    `Sujet: ${value.subject}`,
    `Locale: ${value.locale}`,
    "",
    "Message:",
    value.message,
  ].join("\n");

  const htmlContent = [
    `<h2>Nouveau message de contact ${escapeHtml(BRAND.name)}</h2>`,
    htmlField("Nom", value.name),
    htmlField("Email", value.email),
    htmlField("Sujet", value.subject),
    htmlField("Locale", value.locale),
    htmlField("Message", value.message, true),
  ].join("\n");

  return { subject, textContent, htmlContent, tags: ["lead-rayan-studio-contact"] };
}

export function renderProjectEmail(value: ProjectSubmission): RenderedEmail {
  const subject = `Nouveau projet - ${BRAND.name}`;
  const budget = value.budget || (value.locale === "fr" ? "Non renseigné" : "Not provided");

  const textContent = [
    `Nouvelle demande de projet ${BRAND.name}`,
    `TYPE: ${value.projectType}`,
    `ÉTAT DU PROJET: ${value.stage}`,
    `TIMING: ${value.timing}`,
    `NOM: ${value.name}`,
    `ENTREPRISE: ${value.company}`,
    `EMAIL: ${value.email}`,
    `BUDGET: ${budget}`,
    `Locale: ${value.locale}`,
    "",
    "OBJECTIF:",
    value.objective,
  ].join("\n");

  const htmlContent = [
    `<h2>Nouvelle demande de projet ${escapeHtml(BRAND.name)}</h2>`,
    htmlField("Type", value.projectType),
    htmlField("État du projet", value.stage),
    htmlField("Timing", value.timing),
    htmlField("Nom", value.name),
    htmlField("Entreprise", value.company),
    htmlField("Email", value.email),
    htmlField("Budget", budget),
    htmlField("Locale", value.locale),
    htmlField("Objectif", value.objective, true),
  ].join("\n");

  return { subject, textContent, htmlContent, tags: ["lead-rayan-studio-project"] };
}
