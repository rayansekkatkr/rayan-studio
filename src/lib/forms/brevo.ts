import { BRAND } from "@/lib/brand";

export type LeadProviderErrorCode = "EMAIL_CONFIG_MISSING" | "EMAIL_PROVIDER_ERROR";

export class LeadProviderError extends Error {
  code: LeadProviderErrorCode;

  constructor(code: LeadProviderErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = "LeadProviderError";
  }
}

export async function sendBrevoLeadEmail(input: {
  replyTo: { email: string; name: string };
  subject: string;
  textContent: string;
  htmlContent: string;
  tags: string[];
}): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || BRAND.name;
  const toEmail = process.env.BREVO_TO_EMAIL;

  if (!apiKey || !senderEmail || !toEmail) {
    throw new LeadProviderError("EMAIL_CONFIG_MISSING", "Missing Brevo configuration");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: senderName },
      to: [{ email: toEmail }],
      replyTo: input.replyTo,
      subject: input.subject,
      textContent: input.textContent,
      htmlContent: input.htmlContent,
      tags: input.tags,
    }),
  });

  if (!response.ok) {
    const responseBody = await response.text();
    console.error("[lead] Brevo API error", {
      status: response.status,
      statusText: response.statusText,
      body: responseBody.slice(0, 1000),
    });
    throw new LeadProviderError("EMAIL_PROVIDER_ERROR", `Brevo responded ${response.status}`);
  }
}
