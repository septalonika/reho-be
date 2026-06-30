import { supabase } from "../../config/supabase";
import type { LoginInput } from "./auth.schema";

export async function login(input: LoginInput) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error || !data.session) {
    throw Object.assign(new Error("Email atau password salah"), { status: 401 });
  }

  return {
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
    user: { id: data.user.id, email: data.user.email },
  };
}
