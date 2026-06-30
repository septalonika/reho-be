import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";
import { getOrCreateProfile } from "../auth/profile";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = header.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const profile = await getOrCreateProfile(data.user.id, data.user.email ?? null);

  req.userSession = {
    user: { id: profile.id, email: profile.email ?? "", role: profile.role },
  };
  next();
};
