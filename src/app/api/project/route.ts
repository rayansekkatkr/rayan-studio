import { NextRequest, NextResponse } from "next/server";
import { LeadProviderError, sendBrevoLeadEmail } from "@/lib/forms/brevo";
import { renderProjectEmail } from "@/lib/forms/email-rendering";
import { isRateLimited } from "@/lib/forms/rate-limit";
import { validateProjectSubmission } from "@/lib/forms/validation";
import type { ValidationErrorCode } from "@/lib/forms/types";

const ERROR_MESSAGES: Record<string, { status: number; error: string }> = {
  INVALID_REQUEST: { status: 400, error: "Requête invalide." },
  MISSING_FIELDS: { status: 400, error: "Merci de remplir tous les champs requis." },
  INVALID_EMAIL: { status: 400, error: "Adresse email invalide." },
  INVALID_PROJECT_TYPE: { status: 400, error: "Type de projet invalide." },
  INVALID_STAGE: { status: 400, error: "État du projet invalide." },
  INVALID_TIMING: { status: 400, error: "Timing invalide." },
  RATE_LIMITED: { status: 429, error: "Trop de tentatives. Réessayez dans quelques minutes." },
  EMAIL_CONFIG_MISSING: { status: 500, error: "Configuration email manquante côté serveur." },
  SEND_FAILED: { status: 502, error: "L'envoi a échoué. Vos réponses sont conservées, vous pouvez réessayer." },
};

function errorResponse(code: ValidationErrorCode | "RATE_LIMITED" | "EMAIL_CONFIG_MISSING" | "SEND_FAILED") {
  const entry = ERROR_MESSAGES[code];
  return NextResponse.json({ error: entry.error, code }, { status: entry.status });
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return errorResponse("INVALID_REQUEST");
  }

  const honeypot =
    typeof (payload as Record<string, unknown>)?.companyWebsite === "string"
      ? ((payload as Record<string, unknown>).companyWebsite as string).trim()
      : "";
  if (honeypot !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const validation = validateProjectSubmission(payload);
  if (!validation.ok) {
    return errorResponse(validation.code);
  }

  const ip = getClientIp(request);
  if (isRateLimited(`project:${ip}`)) {
    return errorResponse("RATE_LIMITED");
  }

  const rendered = renderProjectEmail(validation.value);

  try {
    await sendBrevoLeadEmail({
      replyTo: { email: validation.value.email, name: validation.value.name },
      subject: rendered.subject,
      textContent: rendered.textContent,
      htmlContent: rendered.htmlContent,
      tags: rendered.tags,
    });
  } catch (error) {
    if (error instanceof LeadProviderError && error.code === "EMAIL_CONFIG_MISSING") {
      return errorResponse("EMAIL_CONFIG_MISSING");
    }
    return errorResponse("SEND_FAILED");
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
