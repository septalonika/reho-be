import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../config/env";

// Migration uses a separate non-pooled connection (prepare: false still needed for Supabase)
async function main() {
  const client = postgres(env.DATABASE_URL, { prepare: false, max: 1 });
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: "src/db/migrations" });
  await client.end();
  console.log("Migration complete");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
