import { Pool } from "pg";

// Pool Postgres pour les routes prospection (désinscription, webhook).
// Utiliser l'endpoint POOLED de Neon dans DATABASE_URL côté Vercel.
let pool: Pool | null = null;

export function getProspectionPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL manquant.");
    }
    pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 8000 });
  }
  return pool;
}
