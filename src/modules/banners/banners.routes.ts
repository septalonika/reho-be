import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import { createBannerSchema, updateBannerSchema } from "./banners.schema";
import * as ctrl from "./banners.controller";

const EDITORS = ["super_admin", "content_editor"];

export const bannersRouter = Router();

bannersRouter.get("/", asyncHandler(ctrl.listActive));

bannersRouter.get("/all", requireAuth, requireRole(EDITORS), asyncHandler(ctrl.listAll));

bannersRouter.post(
  "/",
  requireAuth,
  requireRole(EDITORS),
  validateBody(createBannerSchema),
  asyncHandler(ctrl.create)
);

bannersRouter.patch(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  validateBody(updateBannerSchema),
  asyncHandler(ctrl.update)
);

bannersRouter.delete(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  asyncHandler(ctrl.remove)
);
