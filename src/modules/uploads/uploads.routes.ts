import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import { presignSchema } from "./uploads.schema";
import * as ctrl from "./uploads.controller";

const ALL_ADMIN = ["super_admin", "content_editor", "finance_manager", "service_coordinator"];

export const uploadsRouter = Router();

uploadsRouter.post(
  "/presign",
  requireAuth,
  requireRole(ALL_ADMIN),
  validateBody(presignSchema),
  asyncHandler(ctrl.presign)
);
