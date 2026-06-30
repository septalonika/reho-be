import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "../config/db";

async function main() {
  await migrate(db, { migrationsFolder: "src/db/migrations" });
  console.log("Migration complete");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
