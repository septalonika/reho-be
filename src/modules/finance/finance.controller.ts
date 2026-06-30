import { Request, Response } from "express";
import * as service from "./finance.service";

export async function listCategories(_req: Request, res: Response) {
  res.json(await service.listCategories());
}

export async function listTransactions(req: Request, res: Response) {
  res.json(await service.listTransactions(req.query as never));
}

export async function createTransaction(req: Request, res: Response) {
  const userId = req.userSession!.user.id;
  res.status(201).json(await service.createTransaction(req.body, userId));
}

export async function updateTransaction(req: Request, res: Response) {
  const row = await service.updateTransaction(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function deleteTransaction(req: Request, res: Response) {
  const row = await service.deleteTransaction(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}

export async function getSummary(req: Request, res: Response) {
  res.json(await service.getFinancialSummary(req.query as never));
}
