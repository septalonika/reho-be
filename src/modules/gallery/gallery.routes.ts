import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createAlbumSchema,
  updateAlbumSchema,
  createGalleryItemSchema,
  updateGalleryItemSchema,
} from "./gallery.schema";
import * as ctrl from "./gallery.controller";

const EDITORS = ["super_admin", "content_editor"];

export const galleryRouter = Router();

galleryRouter.get("/", asyncHandler(ctrl.listAlbums));
galleryRouter.get("/:id", asyncHandler(ctrl.getAlbum));

galleryRouter.post(
  "/",
  requireAuth,
  requireRole(EDITORS),
  validateBody(createAlbumSchema),
  asyncHandler(ctrl.createAlbum)
);

galleryRouter.patch(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  validateBody(updateAlbumSchema),
  asyncHandler(ctrl.updateAlbum)
);

galleryRouter.delete(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  asyncHandler(ctrl.deleteAlbum)
);

galleryRouter.post(
  "/items",
  requireAuth,
  requireRole(EDITORS),
  validateBody(createGalleryItemSchema),
  asyncHandler(ctrl.createItem)
);

galleryRouter.patch(
  "/items/:itemId",
  requireAuth,
  requireRole(EDITORS),
  validateBody(updateGalleryItemSchema),
  asyncHandler(ctrl.updateItem)
);

galleryRouter.delete(
  "/items/:itemId",
  requireAuth,
  requireRole(EDITORS),
  asyncHandler(ctrl.deleteItem)
);
