import { Request, Response } from "express";
import * as service from "./uploads.service";

export async function presign(req: Request, res: Response) {
  const result = await service.generatePresignedUrl(req.body);
  res.json(result);
}
