import { NextRequest, NextResponse } from "next/server";
import { BRAND } from "@/lib/brand";
import { getContactSendErrorMessage } from "@/lib/contact-errors";

type ContactPayload = {
  firstName?: string;
  projectType?: string;
  businessType?: string;
  email?: string;
  siteUrl?: string;
  message?: string;
  companyWebsite?: string;
};

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(input: string, maxLen: number) {
  return input.trim().slice(0, maxLen);
}

function escapeHtml(text: string) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessaie dans quelques minutes." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if ((payload.companyWebsite || "").trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const firstName = sanitize(payload.firstName || "", 80);
  const projectType = sanitize(payload.projectType || "", 80);
  const businessType = sanitize(payload.businessType || "", 120);
  const email = sanitize(payload.email || "", 160);
  const siteUrl = sanitize(payload.siteUrl || "", 300);
  const message = sanitize(payload.message || "", 4000);

  if (!firstName || !businessType || !email || !message) {
    return NextResponse.json({ error: "Merci de remplir tous les champs." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || BRAND.name;
  const toEmail = process.env.BREVO_TO_EMAIL;
  const subject = process.env.BREVO_SUBJECT || `Nouveau lead qualifié — ${BRAND.name}`;

  if (!brevoApiKey || !senderEmail || !toEmail) {
    return NextResponse.json({ error: "Configuration email manquante côté serveur." }, { status: 500 });
  }

  const safeFirstName = escapeHtml(firstName);
  const safeProjectType = escapeHtml(projectType || "Non précisé");
  const safeBusinessType = escapeHtml(businessType);
  const safeEmail = escapeHtml(email);
  const safeSiteUrl = escapeHtml(siteUrl || "Non fourni");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

  const textContent = [
    `Nouveau lead ${BRAND.name}`,
    `Prénom: ${firstName}`,
    `Besoin principal: ${projectType || "Non précisé"}`,
    `Type de commerce: ${businessType}`,
    `Email: ${email}`,
    `URL du site actuel: ${siteUrl || "Non fourni"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlContent = `
    <h2>Nouveau lead ${BRAND.name}</h2>
    <p><strong>Prénom:</strong> ${safeFirstName}</p>
    <p><strong>Besoin principal:</strong> ${safeProjectType}</p>
    <p><strong>Type de commerce:</strong> ${safeBusinessType}</p>
    <p><strong>Email:</strong> ${safeEmail}</p>
    <p><strong>URL du site actuel:</strong> ${safeSiteUrl}</p>
    <p><strong>Message:</strong><br/>${safeMessage}</p>
  `;

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to: [{ email: toEmail }],
      replyTo: { email, name: firstName },
      subject,
      textContent,
      htmlContent,
      tags: ["lead-rayan-studio"],
    }),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("[contact] Brevo API error", {
      status: response.status,
      statusText: response.statusText,
      body: responseBody.slice(0, 1000),
    });

    return NextResponse.json(
      {
        error: getContactSendErrorMessage({
          status: response.status,
          body: responseBody,
          isProduction: process.env.NODE_ENV === "production",
        }),
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
