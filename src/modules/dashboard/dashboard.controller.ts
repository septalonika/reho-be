import { Request, Response } from "express";
import { getDashboardStats } from "./dashboard.service";

export async function stats(req: Request, res: Response) {
  const role = req.userSession!.user.role;
  res.json(await getDashboardStats(role));
}
