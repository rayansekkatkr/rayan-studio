-- Corrections post-review : nom d'affichage, réconciliation des webhooks,
-- intégrité contact/entreprise au niveau base.

-- Nom commercial d'affichage (l'email utilisait la version normalisée en
-- minuscules). name_normalized reste la clé d'identité.
ALTER TABLE businesses ADD COLUMN IF NOT EXISTS display_name text;
UPDATE businesses SET display_name = name_normalized WHERE display_name IS NULL;

-- Événements webhook : NULL = reçu mais pas encore apparié à un message
-- (course webhook/envoi). Réconciliés au début de chaque run.
ALTER TABLE email_provider_events ADD COLUMN IF NOT EXISTS processed_at timestamptz;

-- Un message ne peut référencer qu'un contact appartenant à la même
-- entreprise : impossible d'envoyer à l'entreprise A un message construit
-- pour l'entreprise B.
CREATE OR REPLACE FUNCTION check_outreach_contact_business()
RETURNS trigger AS $$
DECLARE
  contact_business uuid;
BEGIN
  SELECT business_id INTO contact_business FROM contacts WHERE id = NEW.contact_id;
  IF contact_business IS NULL OR contact_business <> NEW.business_id THEN
    RAISE EXCEPTION 'contact % does not belong to business %', NEW.contact_id, NEW.business_id
      USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_outreach_contact_business ON outreach_messages;
CREATE TRIGGER trg_outreach_contact_business
  BEFORE INSERT OR UPDATE OF contact_id, business_id ON outreach_messages
  FOR EACH ROW EXECUTE FUNCTION check_outreach_contact_business();
