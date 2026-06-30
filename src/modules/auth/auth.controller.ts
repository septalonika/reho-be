import { Request, Response } from "express";
import { login } from "./auth.service";

export async function loginHandler(req: Request, res: Response) {
  try {
    const result = await login(req.body);
    res.json(result);
  } catch (err) {
    const e = err as Error & { status?: number };
    res.status(e.status ?? 500).json({ error: e.message });
  }
}
