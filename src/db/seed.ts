import { sql } from "drizzle-orm";
import { db } from "../config/db";
import { financeCategories } from "./schema/finance";
import { profiles } from "./schema/auth";

async function seed() {
  // Finance categories
  await db
    .insert(financeCategories)
    .values([
      { type: "income", name: "Perpuluhan" },
      { type: "income", name: "Persembahan Mingguan" },
      { type: "income", name: "Donasi" },
      { type: "expense", name: "Operasional" },
      { type: "expense", name: "Gaji" },
      { type: "expense", name: "Sosial" },
    ])
    .onConflictDoNothing();

  // Backfill super_admin from auth.users
  await db.execute(sql`
    insert into public.profiles (id, email, role)
    select id, email, 'super_admin'
    from auth.users
    where email = 'septalonika@gmail.com'
    on conflict (id) do update set role = 'super_admin'
  `);

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
