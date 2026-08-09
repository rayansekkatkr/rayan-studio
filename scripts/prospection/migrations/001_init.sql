-- Prospection hebdomadaire : schéma initial.
-- Contraintes d'identité multi-niveaux : la base empêche physiquement
-- deux enregistrements pour la même entreprise et deux premiers envois.

CREATE TABLE IF NOT EXISTS country_policies (
  country_code   text PRIMARY KEY,
  enabled        boolean NOT NULL DEFAULT false,
  policy_version text,
  legal_basis    text,
  notes          text,
  activated_at   timestamptz
);

INSERT INTO country_policies (country_code, enabled, notes) VALUES
  ('FR',    false, 'Activation après validation checklist France'),
  ('BE-FR', false, 'Belgique francophone : validation individuelle requise'),
  ('CH-FR', false, 'Suisse romande : LCD art. 3, régime proche opt-in, validation dédiée'),
  ('LU',    false, 'Luxembourg : validation individuelle requise'),
  ('MC',    false, 'Monaco : politique propre, non héritée de la France'),
  ('CA-QC', false, 'Québec : CASL à implémenter et valider avant activation'),
  ('MA',    false, 'Maroc : loi 09-08, recherche dédiée requise'),
  ('TN',    false, 'Tunisie : INPDP, recherche dédiée requise')
ON CONFLICT (country_code) DO NOTHING;

CREATE TABLE IF NOT EXISTS campaign_runs (
  id          uuid PRIMARY KEY,
  dry_run     boolean NOT NULL,
  git_sha     text,
  started_at  timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  stats       jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS businesses (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_domain     text,
  name_normalized      text NOT NULL,
  country_code         text NOT NULL REFERENCES country_policies (country_code),
  city                 text,
  postal_code          text,
  language_verified    boolean NOT NULL DEFAULT false,
  status               text NOT NULL DEFAULT 'DISCOVERED'
    CHECK (status IN ('DISCOVERED','ENRICHED','QUALIFIED','RESERVED','SENT','SKIPPED',
                      'SEND_FAILED','POSSIBLY_SENT','BOUNCED','UNSUBSCRIBED','COMPLAINED','BLOCKED')),
  status_reason        text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS uq_businesses_domain
  ON businesses (canonical_domain) WHERE canonical_domain IS NOT NULL;

-- Identités multi-sources. L'unicité (kind, value_hmac) garantit qu'une
-- même identité ne peut jamais référencer deux entreprises. Un conflit
-- inter-entreprises détecté à l'insertion = fail closed (pas de fusion
-- automatique, pas d'envoi).
CREATE TABLE IF NOT EXISTS business_identity_keys (
  id          bigserial PRIMARY KEY,
  business_id uuid NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  kind        text NOT NULL
    CHECK (kind IN ('domain','siren','siret','normalized_identity','legacy_domain','provider_id')),
  value_hmac  text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kind, value_hmac)
);
CREATE INDEX IF NOT EXISTS ix_identity_keys_business ON business_identity_keys (business_id);

-- Traçabilité brute des fournisseurs (SIREN en clair, etc.) : base privée.
CREATE TABLE IF NOT EXISTS business_external_ids (
  id          bigserial PRIMARY KEY,
  business_id uuid NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  provider    text NOT NULL,
  external_id text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, external_id)
);

CREATE TABLE IF NOT EXISTS contacts (
  id                  bigserial PRIMARY KEY,
  business_id         uuid NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  email               text NOT NULL,
  email_hmac          text NOT NULL,
  source_url          text NOT NULL,
  is_functional_alias boolean NOT NULL DEFAULT false,
  collected_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email_hmac)
);

CREATE TABLE IF NOT EXISTS website_audits (
  id          bigserial PRIMARY KEY,
  business_id uuid NOT NULL REFERENCES businesses (id) ON DELETE CASCADE,
  page_url    text NOT NULL,
  method      text NOT NULL CHECK (method IN ('http','playwright')),
  fetched_at  timestamptz NOT NULL DEFAULT now(),
  signals     jsonb NOT NULL DEFAULT '{}'::jsonb,
  evidence    jsonb NOT NULL DEFAULT '[]'::jsonb
);
CREATE INDEX IF NOT EXISTS ix_audits_business ON website_audits (business_id);

-- Outbox. dry_run=true : brouillon inoffensif, n'empêche jamais un vrai
-- envoi futur. L'unicité "exactement une première prise de contact par
-- entreprise" ne porte que sur les messages réels (index partiel).
CREATE TABLE IF NOT EXISTS outreach_messages (
  id                        uuid PRIMARY KEY,
  business_id               uuid NOT NULL REFERENCES businesses (id),
  contact_id                bigint NOT NULL REFERENCES contacts (id),
  run_id                    uuid REFERENCES campaign_runs (id),
  campaign                  text NOT NULL CHECK (campaign IN ('refonte','creation','application')),
  dry_run                   boolean NOT NULL DEFAULT false,
  status                    text NOT NULL DEFAULT 'RESERVED'
    CHECK (status IN ('RESERVED','SENT','SEND_FAILED','POSSIBLY_SENT','DRAFT')),
  subject                   text NOT NULL,
  body                      text NOT NULL,
  evidence_url              text NOT NULL,
  provider_idempotency_key  text NOT NULL,
  resend_email_id           text,
  attempt_count             integer NOT NULL DEFAULT 0,
  last_attempt_at           timestamptz,
  last_error_code           text,
  next_retry_at             timestamptz,
  reserved_at               timestamptz NOT NULL DEFAULT now(),
  sent_at                   timestamptz,
  CONSTRAINT dry_run_status CHECK (NOT dry_run OR status = 'DRAFT')
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_outreach_one_real_message_per_business
  ON outreach_messages (business_id) WHERE dry_run = false;
CREATE UNIQUE INDEX IF NOT EXISTS uq_outreach_idempotency_key
  ON outreach_messages (provider_idempotency_key) WHERE dry_run = false;

-- Suppression durable : HMAC uniquement, jamais de valeur en clair.
CREATE TABLE IF NOT EXISTS suppression_list (
  id          bigserial PRIMARY KEY,
  kind        text NOT NULL CHECK (kind IN ('email','domain','business_fingerprint')),
  value_hmac  text NOT NULL,
  reason      text NOT NULL CHECK (reason IN ('legacy_import','unsubscribed','bounced','complained','manual')),
  source      text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (kind, value_hmac)
);

-- Idempotence des webhooks Resend : un événement rejoué ne produit
-- qu'une seule transition.
CREATE TABLE IF NOT EXISTS email_provider_events (
  id          bigserial PRIMARY KEY,
  provider    text NOT NULL,
  event_id    text NOT NULL,
  event_type  text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  payload     jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (provider, event_id)
);
