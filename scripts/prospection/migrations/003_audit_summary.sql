-- La réutilisation d'audit doit recharger les signaux FUSIONNÉS du site,
-- pas ceux de la dernière page insérée (qui peut être la page contact).
-- Une ligne « summary » par audit porte les signaux fusionnés.
ALTER TABLE website_audits ADD COLUMN IF NOT EXISTS is_summary boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS ix_audits_summary ON website_audits (business_id, fetched_at DESC) WHERE is_summary;
