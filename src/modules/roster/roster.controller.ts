import { Request, Response } from "express";
import * as service from "./roster.service";

export async function getByService(req: Request, res: Response) {
  res.json(await service.getRosterByServiceId(req.params.serviceId));
}

export async function create(req: Request, res: Response) {
  try {
    res.status(201).json(await service.createRosterAssignment(req.body));
  } catch {
    res.status(409).json({ error: "Assignment already exists" });
  }
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteRosterAssignment(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
