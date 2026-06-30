import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

// public.profiles mirrors Supabase auth.users (Supabase owns auth.users).
// id === auth.users.id. App-level role lives here, not in Supabase Auth.
// Rows are lazily created by the backend on first authenticated request
// (see src/auth/profile.ts). Bootstrap a super_admin by updating role manually.
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  fullName: text("full_name"),
  role: text("role").notNull().default("content_editor"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
