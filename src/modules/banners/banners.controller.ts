import { Request, Response } from "express";
import * as service from "./banners.service";

export async function listActive(_req: Request, res: Response) {
  res.json(await service.listActiveBanners());
}

export async function listAll(_req: Request, res: Response) {
  res.json(await service.listAllBanners());
}

export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createBanner(req.body));
}

export async function update(req: Request, res: Response) {
  const row = await service.updateBanner(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteBanner(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
