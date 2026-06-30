import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import { createMemberSchema, updateMemberSchema } from "./members.schema";
import * as ctrl from "./members.controller";

const ALL_ADMIN = ["super_admin", "content_editor", "finance_manager", "service_coordinator"];

export const membersRouter = Router();

membersRouter.get("/", requireAuth, requireRole(ALL_ADMIN), asyncHandler(ctrl.list));

membersRouter.post(
  "/",
  requireAuth,
  requireRole(["super_admin", "service_coordinator"]),
  validateBody(createMemberSchema),
  asyncHandler(ctrl.create)
);

membersRouter.patch(
  "/:id",
  requireAuth,
  requireRole(["super_admin", "service_coordinator"]),
  validateBody(updateMemberSchema),
  asyncHandler(ctrl.update)
);

membersRouter.delete(
  "/:id",
  requireAuth,
  requireRole(["super_admin"]),
  asyncHandler(ctrl.remove)
);
