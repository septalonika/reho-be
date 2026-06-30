import { Request, Response } from "express";
import * as service from "./services.service";

export async function list(req: Request, res: Response) {
  res.json(await service.listServices(req.query as never));
}

export async function getById(req: Request, res: Response) {
  const row = await service.getServiceById(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createService(req.body));
}

export async function update(req: Request, res: Response) {
  const row = await service.updateService(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteService(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
