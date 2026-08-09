import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getProspectionPool } from "@/lib/prospection-db";

import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hmacSuppression(value: string): string {
  const secret = process.env.SUPPRESSION_HMAC_SECRET;
  if (!secret) throw new Error("SUPPRESSION_HMAC_SECRET manquant.");
  return crypto.createHmac("sha256", secret).update(value, "utf8").digest("hex");
}

function confirmationPage(token: string): string {
  const safeToken = token.replace(/[^a-zA-Z0-9._-]/g, "");
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Se désinscrire</title>
<style>body{font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem;color:#17120f;background:#f5f1e8}
button{background:#17120f;color:#fffaf0;border:none;padding:.9rem 1.6rem;font-size:1rem;font-weight:700;cursor:pointer}</style>
</head><body>
<h1>Se désinscrire</h1>
<p>Confirmez pour ne plus jamais recevoir d'email de prospection de Rayan Studios. C'est gratuit et immédiat.</p>
<form method="POST" action="/api/unsubscribe">
  <input type="hidden" name="token" value="${safeToken}">
  <button type="submit">Confirmer ma désinscription</button>
</form>
</body></html>`;
}

// GET : page de confirmation UNIQUEMENT. Les scanners d'emails ouvrent
// les liens : un GET ne doit jamais désinscrire.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token") || "";
  const outreachId = verifyUnsubscribeToken(token);
  if (!outreachId) {
    return new NextResponse("Lien invalide.", { status: 400 });
  }
  return new NextResponse(confirmationPage(token), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

// POST : désinscription effective. Accepte le formulaire de confirmation
// et le one-click RFC 8058 (List-Unsubscribe-Post), qui envoie un POST
// avec le corps "List-Unsubscribe=One-Click" sur l'URL du lien.
export async function POST(request: NextRequest) {
  let token = request.nextUrl.searchParams.get("token") || "";
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData().catch(() => null);
    const formToken = form?.get("token");
    if (typeof formToken === "string" && formToken) token = formToken;
  }

  const outreachId = verifyUnsubscribeToken(token);
  if (!outreachId) {
    return new NextResponse("Lien invalide.", { status: 400 });
  }

  const pool = getProspectionPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const { rows } = await client.query(
      `SELECT om.business_id, c.email_hmac, b.canonical_domain
       FROM outreach_messages om
       JOIN contacts c ON c.id = om.contact_id
       JOIN businesses b ON b.id = om.business_id
       WHERE om.id = $1`,
      [outreachId],
    );
    if (rows.length === 0) {
      await client.query("ROLLBACK");
      return new NextResponse("Lien invalide.", { status: 400 });
    }
    const { business_id: businessId, email_hmac: emailHmac, canonical_domain: domain } = rows[0];

    await client.query(
      `INSERT INTO suppression_list (kind, value_hmac, reason, source)
       VALUES ('email', $1, 'unsubscribed', 'unsubscribe_route')
       ON CONFLICT (kind, value_hmac) DO NOTHING`,
      [emailHmac],
    );
    if (domain) {
      await client.query(
        `INSERT INTO suppression_list (kind, value_hmac, reason, source)
         VALUES ('domain', $1, 'unsubscribed', 'unsubscribe_route')
         ON CONFLICT (kind, value_hmac) DO NOTHING`,
        [hmacSuppression(domain)],
      );
    }
    await client.query(
      `UPDATE businesses SET status = 'UNSUBSCRIBED', updated_at = now() WHERE id = $1`,
      [businessId],
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }

  return new NextResponse(
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Désinscription confirmée</title></head>
<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1rem">
<h1>C'est fait.</h1><p>Vous ne recevrez plus d'email de prospection de Rayan Studios.</p></body></html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
