-- Migration 0001: Leads table (Architecture.md §6.3)
CREATE TABLE IF NOT EXISTS leads (
  id                TEXT PRIMARY KEY,               -- crypto.randomUUID()
  created_at        TEXT NOT NULL,                  -- ISO 8601 UTC
  name              TEXT NOT NULL,
  email             TEXT NOT NULL,
  company           TEXT,
  phone             TEXT,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('email','whatsapp')),
  services          TEXT NOT NULL,                  -- JSON array of slugs
  budget_band       TEXT,
  timeline          TEXT,
  message           TEXT NOT NULL,
  utm               TEXT,                           -- JSON object
  landing_path      TEXT,
  referrer          TEXT,
  consent_version   TEXT NOT NULL,                  -- privacy notice version acknowledged
  ip_hash           TEXT NOT NULL,                  -- SHA-256(IP + IP_HASH_SALT); raw IP never stored
  status            TEXT NOT NULL DEFAULT 'received'
                    CHECK (status IN ('received','notified','email_failed'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at);
CREATE INDEX IF NOT EXISTS idx_leads_ip_created ON leads (ip_hash, created_at);
