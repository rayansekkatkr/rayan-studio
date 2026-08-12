import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  validateContactSubmission,
  validateProjectSubmission,
} from "@/lib/forms/validation";
import { isRateLimited, resetRateLimitForTests } from "@/lib/forms/rate-limit";
import {
  escapeHtml,
  renderContactEmail,
  renderProjectEmail,
} from "@/lib/forms/email-rendering";
import { sendBrevoLeadEmail } from "@/lib/forms/brevo";

describe("validation", () => {
  it("accepts a valid contact submission and trims values", () => {
    expect(
      validateContactSubmission({
        locale: "fr",
        name: " Rayan ",
        email: "rayan@example.com",
        subject: "Question",
        message: "Bonjour",
      }),
    ).toEqual({
      ok: true,
      value: expect.objectContaining({ name: "Rayan" }),
    });
  });

  it("rejects an invalid email", () => {
    expect(
      validateContactSubmission({
        locale: "fr",
        name: "Rayan",
        email: "not-an-email",
        subject: "Question",
        message: "Bonjour",
      }),
    ).toEqual({ ok: false, code: "INVALID_EMAIL" });
  });

  it("rejects missing contact fields", () => {
    expect(
      validateContactSubmission({
        locale: "fr",
        name: "",
        email: "rayan@example.com",
        subject: "Question",
        message: "Bonjour",
      }),
    ).toEqual({ ok: false, code: "MISSING_FIELDS" });
  });

  it("enforces maximum lengths", () => {
    const result = validateContactSubmission({
      locale: "fr",
      name: "a".repeat(500),
      email: "rayan@example.com",
      subject: "Question",
      message: "Bonjour",
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.name).toHaveLength(100);
  });

  it("rejects an unknown project type", () => {
    expect(
      validateProjectSubmission({
        locale: "en",
        projectType: "unknown",
        stage: "idea",
        objective: "Build a platform",
        timing: "1-3-months",
        name: "Rayan",
        company: "Studio",
        email: "rayan@example.com",
      }),
    ).toEqual({ ok: false, code: "INVALID_PROJECT_TYPE" });
  });

  it("rejects unknown stage and timing", () => {
    const base = {
      locale: "en",
      projectType: "mvp",
      stage: "idea",
      objective: "Build a platform",
      timing: "asap",
      name: "Rayan",
      company: "Studio",
      email: "rayan@example.com",
    };
    expect(validateProjectSubmission({ ...base, stage: "nope" })).toEqual({
      ok: false,
      code: "INVALID_STAGE",
    });
    expect(validateProjectSubmission({ ...base, timing: "nope" })).toEqual({
      ok: false,
      code: "INVALID_TIMING",
    });
  });

  it("accepts a project submission without budget", () => {
    const result = validateProjectSubmission({
      locale: "fr",
      projectType: "application",
      stage: "existing-product",
      objective: "Objectif du projet",
      timing: "asap",
      name: "Rayan",
      company: "Studio",
      email: "rayan@example.com",
    });
    expect(result.ok).toBe(true);
  });
});

describe("escaping and email rendering", () => {
  it("escapes script and quotes", () => {
    const escaped = escapeHtml('<script>"x"</script>');
    expect(escaped).not.toContain("<script>");
    expect(escaped).toContain("&lt;script&gt;");
    expect(escaped).toContain("&quot;x&quot;");
  });

  it("renders contact email with escaped HTML and the contact tag", () => {
    const rendered = renderContactEmail({
      locale: "fr",
      name: "<b>Rayan</b>",
      email: "rayan@example.com",
      subject: "Question <script>",
      message: "Bonjour <img src=x>",
    });
    expect(rendered.tags).toEqual(["lead-rayan-studio-contact"]);
    expect(rendered.htmlContent).not.toContain("<b>Rayan</b>");
    expect(rendered.htmlContent).not.toContain("<img");
    expect(rendered.htmlContent).toContain("&lt;b&gt;Rayan&lt;/b&gt;");
    expect(rendered.textContent).toContain("Bonjour <img src=x>");
  });

  it("renders project email with the project tag and optional budget placeholder", () => {
    const rendered = renderProjectEmail({
      locale: "fr",
      projectType: "application",
      stage: "idea",
      objective: "Construire <script> une plateforme",
      timing: "asap",
      name: "Rayan",
      company: "Studio",
      email: "rayan@example.com",
    });
    expect(rendered.tags).toEqual(["lead-rayan-studio-project"]);
    expect(rendered.htmlContent).not.toContain("<script>");
    expect(rendered.textContent).toContain("Non renseigné");
  });

  it("never renders the honeypot value", () => {
    const rendered = renderContactEmail({
      locale: "fr",
      name: "Rayan",
      email: "rayan@example.com",
      subject: "Question",
      message: "Bonjour",
      companyWebsite: "http://spam-bot.example",
    });
    expect(rendered.htmlContent).not.toContain("spam-bot");
    expect(rendered.textContent).not.toContain("spam-bot");
  });
});

describe("rate limiting", () => {
  beforeEach(() => resetRateLimitForTests());

  it("allows five requests and limits the sixth per key", () => {
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited("contact:1.2.3.4")).toBe(false);
    }
    expect(isRateLimited("contact:1.2.3.4")).toBe(true);
    expect(isRateLimited("project:1.2.3.4")).toBe(false);
  });

  it("expires entries outside the 10 minute window", () => {
    const start = 1_000_000;
    for (let i = 0; i < 5; i += 1) {
      expect(isRateLimited("contact:ip", start + i)).toBe(false);
    }
    expect(isRateLimited("contact:ip", start + 10 * 60 * 1000 + 1)).toBe(false);
  });
});

describe("brevo provider boundary", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = {
      ...env,
      BREVO_API_KEY: "test-key",
      BREVO_SENDER_EMAIL: "sender@example.com",
      BREVO_SENDER_NAME: "Rayan Studio",
      BREVO_TO_EMAIL: "to@example.com",
    };
  });

  afterEach(() => {
    process.env = env;
    vi.unstubAllGlobals();
  });

  it("posts the rendered email with tags to Brevo", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    await sendBrevoLeadEmail({
      replyTo: { email: "rayan@example.com", name: "Rayan" },
      subject: "Sujet",
      textContent: "Texte",
      htmlContent: "<p>&lt;b&gt;Rayan&lt;/b&gt;</p>",
      tags: ["lead-rayan-studio-contact"],
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.brevo.com/v3/smtp/email");
    const body = JSON.parse((options as RequestInit).body as string);
    expect(body.tags).toEqual(["lead-rayan-studio-contact"]);
    expect(body.htmlContent).toContain("&lt;b&gt;Rayan&lt;/b&gt;");
  });

  it("throws EMAIL_CONFIG_MISSING when configuration is absent", async () => {
    delete process.env.BREVO_API_KEY;
    await expect(
      sendBrevoLeadEmail({
        replyTo: { email: "a@b.co", name: "A" },
        subject: "s",
        textContent: "t",
        htmlContent: "<p>t</p>",
        tags: [],
      }),
    ).rejects.toMatchObject({ code: "EMAIL_CONFIG_MISSING" });
  });

  it("throws EMAIL_PROVIDER_ERROR on non-2xx without leaking the body", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("secret provider detail", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      sendBrevoLeadEmail({
        replyTo: { email: "a@b.co", name: "A" },
        subject: "s",
        textContent: "t",
        htmlContent: "<p>t</p>",
        tags: [],
      }),
    ).rejects.toMatchObject({ code: "EMAIL_PROVIDER_ERROR" });
  });
});
