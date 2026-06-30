import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Backend client used only to validate user JWTs via auth.getUser(token).
// No session persistence — this is a stateless API.
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
