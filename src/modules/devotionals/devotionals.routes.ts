import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody, validateQuery } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createDevotionalSchema,
  updateDevotionalSchema,
  listDevotionalsQuerySchema,
} from "./devotionals.schema";
import * as ctrl from "./devotionals.controller";

const EDITORS = ["super_admin", "content_editor"];

export const devotionalsRouter = Router();

devotionalsRouter.get(
  "/",
  validateQuery(listDevotionalsQuerySchema),
  asyncHandler(ctrl.list)
);

devotionalsRouter.get("/:slug", asyncHandler(ctrl.getBySlug));

devotionalsRouter.post(
  "/",
  requireAuth,
  requireRole(EDITORS),
  validateBody(createDevotionalSchema),
  asyncHandler(ctrl.create)
);

devotionalsRouter.patch(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  validateBody(updateDevotionalSchema),
  asyncHandler(ctrl.update)
);

devotionalsRouter.delete(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  asyncHandler(ctrl.remove)
);
