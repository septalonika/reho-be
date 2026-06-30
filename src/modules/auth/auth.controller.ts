import { Request, Response } from "express";
import { login, refresh } from "./auth.service";

export async function loginHandler(req: Request, res: Response) {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    const e = err as Error & { status?: number };
    res.status(e.status ?? 500).json({ error: e.message });
  }
}

export async function refreshHandler(req: Request, res: Response) {
  try {
    const result = await refresh(req.body.refresh_token);
    res.json(result);
  } catch (err) {
    const e = err as Error & { status?: number };
    res.status(e.status ?? 500).json({ error: e.message });
  }
}
