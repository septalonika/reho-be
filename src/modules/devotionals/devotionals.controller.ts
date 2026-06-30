import { Request, Response } from "express";
import * as service from "./devotionals.service";

export async function list(req: Request, res: Response) {
  const isAdmin = !!req.userSession;
  const result = await service.listDevotionals(req.query as never, isAdmin);
  res.json(result);
}

export async function getBySlug(req: Request, res: Response) {
  const row = await service.getDevotionalBySlug(req.params.slug);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function create(req: Request, res: Response) {
  const authorId = req.userSession!.user.id;
  const row = await service.createDevotional(req.body, authorId);
  res.status(201).json(row);
}

export async function update(req: Request, res: Response) {
  const row = await service.updateDevotional(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteDevotional(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
