import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetRateLimitForTests } from "@/lib/forms/rate-limit";

const sendBrevoLeadEmail = vi.fn();

vi.mock("@/lib/forms/brevo", async () => {
  const actual = await vi.importActual<typeof import("@/lib/forms/brevo")>("@/lib/forms/brevo");
  return {
    ...actual,
    sendBrevoLeadEmail: (...args: unknown[]) => sendBrevoLeadEmail(...args),
  };
});

import { POST } from "./route";

function makeRequest(body: unknown, ip = "9.9.9.9") {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validPayload = {
  locale: "fr",
  name: "Rayan",
  email: "rayan@example.com",
  subject: "Question",
  message: "Bonjour, j'ai une question.",
};

describe("/api/contact", () => {
  beforeEach(() => {
    resetRateLimitForTests();
    sendBrevoLeadEmail.mockReset().mockResolvedValue(undefined);
  });

  it("returns 400 INVALID_REQUEST on malformed JSON", async () => {
    const response = await POST(makeRequest("{not json"));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_REQUEST");
  });

  it("returns a successful no-op for honeypot submissions without calling the provider", async () => {
    const response = await POST(makeRequest({ ...validPayload, companyWebsite: "http://bot.example" }));
    expect(response.status).toBe(200);
    expect((await response.json()).ok).toBe(true);
    expect(sendBrevoLeadEmail).not.toHaveBeenCalled();
  });

  it("does not consume rate limit for honeypot submissions", async () => {
    for (let i = 0; i < 10; i += 1) {
      const response = await POST(
        makeRequest({ ...validPayload, companyWebsite: "http://bot.example" }, "8.8.8.8"),
      );
      expect(response.status).toBe(200);
    }
    const legit = await POST(makeRequest(validPayload, "8.8.8.8"));
    expect(legit.status).toBe(200);
  });

  it("returns 400 MISSING_FIELDS when a field is absent", async () => {
    const response = await POST(makeRequest({ ...validPayload, subject: "" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("MISSING_FIELDS");
  });

  it("returns 400 INVALID_EMAIL for an invalid email", async () => {
    const response = await POST(makeRequest({ ...validPayload, email: "nope" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_EMAIL");
  });

  it("rate limits the sixth valid request from the same IP", async () => {
    for (let i = 0; i < 5; i += 1) {
      const response = await POST(makeRequest(validPayload, "7.7.7.7"));
      expect(response.status).toBe(200);
    }
    const sixth = await POST(makeRequest(validPayload, "7.7.7.7"));
    expect(sixth.status).toBe(429);
    expect((await sixth.json()).code).toBe("RATE_LIMITED");
  });

  it("calls the provider exactly once for a valid request", async () => {
    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(200);
    expect(sendBrevoLeadEmail).toHaveBeenCalledTimes(1);
  });

  it("returns 502 SEND_FAILED without leaking provider internals", async () => {
    const { LeadProviderError } = await vi.importActual<typeof import("@/lib/forms/brevo")>(
      "@/lib/forms/brevo",
    );
    sendBrevoLeadEmail.mockRejectedValue(
      new LeadProviderError("EMAIL_PROVIDER_ERROR", "Brevo responded 500 secret-detail"),
    );
    const response = await POST(makeRequest(validPayload, "6.6.6.6"));
    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body.code).toBe("SEND_FAILED");
    expect(JSON.stringify(body)).not.toContain("secret-detail");
  });
});
