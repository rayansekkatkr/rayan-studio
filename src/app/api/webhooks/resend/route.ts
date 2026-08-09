import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { getProspectionPool } from "@/lib/prospection-db";

import { verifyResendSignature, planTransition } from "@/lib/resend-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hmacSuppression(value: string): string {
  const secret = process.env.SUPPRESSION_HMAC_SECRET;
  if (!secret) throw new Error("SUPPRESSION_HMAC_SECRET manquant.");
  return crypto.createHmac("sha256", secret).update(value, "utf8").digest("hex");
}

export async function POST(request: NextRequest) {
  const payload = await request.text();
  const verification = verifyResendSignature({
    payload,
    headers: {
      "svix-id": request.headers.get("svix-id") || "",
      "svix-timestamp": request.headers.get("svix-timestamp") || "",
      "svix-signature": request.headers.get("svix-signature") || "",
    },
    secret: process.env.RESEND_WEBHOOK_SECRET,
  });
  if (!verification.valid) {
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  let event: { type?: string; data?: { email_id?: string } };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const transition = planTransition(event.type || "");
  if (!transition.record) {
    return NextResponse.json({ ignored: true }, { status: 200 });
  }

  const pool = getProspectionPool();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Idempotence : un événement rejoué ne produit qu'une transition.
    const inserted = await client.query(
      `INSERT INTO email_provider_events (provider, event_id, event_type, payload)
       VALUES ('resend', $1, $2, $3::jsonb)
       ON CONFLICT (provider, event_id) DO NOTHING
       RETURNING id`,
      [verification.eventId, event.type, JSON.stringify({ email_id: event.data?.email_id || null })],
    );
    if (inserted.rows.length === 0) {
      await client.query("COMMIT");
      return NextResponse.json({ duplicate: true }, { status: 200 });
    }

    if (transition.businessStatus && event.data?.email_id) {
      const { rows } = await client.query(
        `SELECT om.business_id, c.email_hmac, b.canonical_domain
         FROM outreach_messages om
         JOIN contacts c ON c.id = om.contact_id
         JOIN businesses b ON b.id = om.business_id
         WHERE om.resend_email_id = $1`,
        [event.data.email_id],
      );
      if (rows.length > 0) {
        const { business_id: businessId, email_hmac: emailHmac, canonical_domain: domain } = rows[0];
        await client.query(
          `UPDATE businesses SET status = $2, updated_at = now() WHERE id = $1`,
          [businessId, transition.businessStatus],
        );
        await client.query(
          `INSERT INTO suppression_list (kind, value_hmac, reason, source)
           VALUES ('email', $1, $2, 'resend_webhook')
           ON CONFLICT (kind, value_hmac) DO NOTHING`,
          [emailHmac, transition.suppressionReason],
        );
        if (domain && transition.suppressionReason === "complained") {
          await client.query(
            `INSERT INTO suppression_list (kind, value_hmac, reason, source)
             VALUES ('domain', $1, 'complained', 'resend_webhook')
             ON CONFLICT (kind, value_hmac) DO NOTHING`,
            [hmacSuppression(domain)],
          );
        }
      }
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK").catch(() => undefined);
    throw error;
  } finally {
    client.release();
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
