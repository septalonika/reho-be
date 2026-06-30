import { Request, Response } from "express";
import * as service from "./bulletins.service";

export async function list(req: Request, res: Response) {
  const isAdmin = !!req.userSession;
  res.json(await service.listBulletins(req.query as never, isAdmin));
}

export async function getBySlug(req: Request, res: Response) {
  const row = await service.getBulletinBySlug(req.params.slug);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createBulletin(req.body));
}

export async function update(req: Request, res: Response) {
  const row = await service.updateBulletin(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteBulletin(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
