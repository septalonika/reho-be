import { Request, Response } from "express";
import * as service from "./members.service";

export async function list(_req: Request, res: Response) {
  res.json(await service.listMembers());
}

export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createMember(req.body));
}

export async function update(req: Request, res: Response) {
  const row = await service.updateMember(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteMember(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
