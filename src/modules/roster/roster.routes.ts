import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import { createRosterAssignmentSchema } from "./roster.schema";
import * as ctrl from "./roster.controller";

const COORDINATORS = ["super_admin", "service_coordinator"];

// mounted at /services/:serviceId/roster (mergeParams: true)
export const rosterRouter = Router({ mergeParams: true });

rosterRouter.get("/", asyncHandler(ctrl.getByService));

rosterRouter.post(
  "/",
  requireAuth,
  requireRole(COORDINATORS),
  validateBody(createRosterAssignmentSchema),
  asyncHandler(ctrl.create)
);

rosterRouter.delete(
  "/:id",
  requireAuth,
  requireRole(COORDINATORS),
  asyncHandler(ctrl.remove)
);
