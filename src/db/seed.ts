import { db } from "../config/db";
import { financeCategories } from "./schema/finance";

async function seed() {
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

  console.log("Seed complete");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
