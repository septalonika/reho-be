import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody, validateQuery } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createBulletinSchema,
  updateBulletinSchema,
  listBulletinsQuerySchema,
} from "./bulletins.schema";
import * as ctrl from "./bulletins.controller";

const EDITORS = ["super_admin", "content_editor"];

export const bulletinsRouter = Router();

bulletinsRouter.get(
  "/",
  validateQuery(listBulletinsQuerySchema),
  asyncHandler(ctrl.list)
);

bulletinsRouter.get("/:slug", asyncHandler(ctrl.getBySlug));

bulletinsRouter.post(
  "/",
  requireAuth,
  requireRole(EDITORS),
  validateBody(createBulletinSchema),
  asyncHandler(ctrl.create)
);

bulletinsRouter.patch(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  validateBody(updateBulletinSchema),
  asyncHandler(ctrl.update)
);

bulletinsRouter.delete(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  asyncHandler(ctrl.remove)
);
