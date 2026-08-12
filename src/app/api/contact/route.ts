import { NextRequest, NextResponse } from "next/server";
import { LeadProviderError, sendBrevoLeadEmail } from "@/lib/forms/brevo";
import { renderContactEmail } from "@/lib/forms/email-rendering";
import { isRateLimited } from "@/lib/forms/rate-limit";
import { validateContactSubmission } from "@/lib/forms/validation";

const ERROR_MESSAGES: Record<string, { status: number; error: string }> = {
  INVALID_REQUEST: { status: 400, error: "Requête invalide." },
  MISSING_FIELDS: { status: 400, error: "Merci de remplir tous les champs." },
  INVALID_EMAIL: { status: 400, error: "Adresse email invalide." },
  RATE_LIMITED: { status: 429, error: "Trop de tentatives. Réessayez dans quelques minutes." },
  EMAIL_CONFIG_MISSING: { status: 500, error: "Configuration email manquante côté serveur." },
  SEND_FAILED: { status: 502, error: "L'envoi a échoué. Vos informations sont conservées, vous pouvez réessayer." },
};

function errorResponse(code: keyof typeof ERROR_MESSAGES) {
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

  const validation = validateContactSubmission(payload);
  if (!validation.ok) {
    return errorResponse(
      validation.code === "INVALID_EMAIL"
        ? "INVALID_EMAIL"
        : validation.code === "MISSING_FIELDS"
          ? "MISSING_FIELDS"
          : "INVALID_REQUEST",
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(`contact:${ip}`)) {
    return errorResponse("RATE_LIMITED");
  }

  const rendered = renderContactEmail(validation.value);

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
