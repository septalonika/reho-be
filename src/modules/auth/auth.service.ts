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
    refresh_token: data.session.refresh_token,
    expires_at: data.session.expires_at,
    user: { id: data.user.id, email: data.user.email },
  };
}

export async function refresh(refreshToken: string) {
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session) {
    throw Object.assign(new Error("Sesi tidak valid"), { status: 401 });
  }

  return {
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_at: data.session.expires_at,
  };
}
