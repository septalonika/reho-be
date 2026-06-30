import { Request, Response } from "express";
import * as service from "./gallery.service";

export async function listAlbums(_req: Request, res: Response) {
  res.json(await service.listAlbums());
}

export async function getAlbum(req: Request, res: Response) {
  const row = await service.getAlbumById(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function createAlbum(req: Request, res: Response) {
  res.status(201).json(await service.createAlbum(req.body));
}

export async function updateAlbum(req: Request, res: Response) {
  const row = await service.updateAlbum(req.params.id, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function deleteAlbum(req: Request, res: Response) {
  const row = await service.deleteAlbum(req.params.id);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}

export async function createItem(req: Request, res: Response) {
  try {
    res.status(201).json(await service.createGalleryItem(req.body));
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
}

export async function updateItem(req: Request, res: Response) {
  const row = await service.updateGalleryItem(req.params.itemId, req.body);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json(row);
}

export async function deleteItem(req: Request, res: Response) {
  const row = await service.deleteGalleryItem(req.params.itemId);
  if (!row) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ deleted: true });
}
