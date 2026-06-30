import { Request, Response } from "express";
import * as service from "./birthdays.service";

export async function list(req: Request, res: Response) {
  res.json(await service.listBirthdays(req.query as never));
}

export async function create(req: Request, res: Response) {
  res.status(201).json(await service.createBirthday(req.body));
}

export async function update(req: Request, res: Response) {
  const row = await service.updateBirthday(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function remove(req: Request, res: Response) {
  const row = await service.deleteBirthday(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
