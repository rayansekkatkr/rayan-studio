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
  return new NextRequest("http://localhost/api/project", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validPayload = {
  locale: "fr",
  projectType: "application",
  stage: "existing-product",
  objective: "Construire une plateforme métier.",
  timing: "1-3-months",
  name: "Rayan",
  company: "Studio",
  email: "rayan@example.com",
};

describe("/api/project", () => {
  beforeEach(() => {
    resetRateLimitForTests();
    sendBrevoLeadEmail.mockReset().mockResolvedValue(undefined);
  });

  it("returns a successful no-op for honeypot without provider call", async () => {
    const response = await POST(makeRequest({ ...validPayload, companyWebsite: "http://bot.example" }));
    expect(response.status).toBe(200);
    expect(sendBrevoLeadEmail).not.toHaveBeenCalled();
  });

  it("rejects an invalid project type", async () => {
    const response = await POST(makeRequest({ ...validPayload, projectType: "nope" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_PROJECT_TYPE");
  });

  it("rejects an invalid stage", async () => {
    const response = await POST(makeRequest({ ...validPayload, stage: "nope" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_STAGE");
  });

  it("rejects an invalid timing", async () => {
    const response = await POST(makeRequest({ ...validPayload, timing: "nope" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("INVALID_TIMING");
  });

  it("rejects missing required fields", async () => {
    const response = await POST(makeRequest({ ...validPayload, objective: "" }));
    expect(response.status).toBe(400);
    expect((await response.json()).code).toBe("MISSING_FIELDS");
  });

  it("rate limits the sixth same-flow request", async () => {
    for (let i = 0; i < 5; i += 1) {
      expect((await POST(makeRequest(validPayload, "5.5.5.5"))).status).toBe(200);
    }
    const sixth = await POST(makeRequest(validPayload, "5.5.5.5"));
    expect(sixth.status).toBe(429);
  });

  it("keeps contact and project rate limits independent", async () => {
    for (let i = 0; i < 5; i += 1) {
      expect((await POST(makeRequest(validPayload, "4.4.4.4"))).status).toBe(200);
    }
    const { POST: contactPost } = await import("../contact/route");
    const contactRequest = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "4.4.4.4" },
      body: JSON.stringify({
        locale: "fr",
        name: "Rayan",
        email: "rayan@example.com",
        subject: "Question",
        message: "Bonjour",
      }),
    });
    expect((await contactPost(contactRequest)).status).toBe(200);
  });

  it("calls the provider once with the project tag for a valid request", async () => {
    const response = await POST(makeRequest(validPayload));
    expect(response.status).toBe(200);
    expect(sendBrevoLeadEmail).toHaveBeenCalledTimes(1);
    const call = sendBrevoLeadEmail.mock.calls[0][0] as { tags: string[] };
    expect(call.tags).toEqual(["lead-rayan-studio-project"]);
  });

  it("returns 502 SEND_FAILED on provider failure", async () => {
    const { LeadProviderError } = await vi.importActual<typeof import("@/lib/forms/brevo")>(
      "@/lib/forms/brevo",
    );
    sendBrevoLeadEmail.mockRejectedValue(new LeadProviderError("EMAIL_PROVIDER_ERROR", "boom"));
    const response = await POST(makeRequest(validPayload, "3.3.3.3"));
    expect(response.status).toBe(502);
    expect((await response.json()).code).toBe("SEND_FAILED");
  });
});
