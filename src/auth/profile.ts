import { eq } from "drizzle-orm";
import { db } from "../config/db";
import { profiles } from "../db/schema/auth";

// Look up the app profile for a Supabase user; lazily create it on first sight.
// Default role is content_editor — promote to super_admin manually in the DB.
export async function getOrCreateProfile(id: string, email: string | null) {
  const [existing] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);
  if (existing) return existing;

  await db.insert(profiles).values({ id, email }).onConflictDoNothing();

  const [row] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, id))
    .limit(1);
  return row;
}
