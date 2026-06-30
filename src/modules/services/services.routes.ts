import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody, validateQuery } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createServiceSchema,
  updateServiceSchema,
  listServicesQuerySchema,
} from "./services.schema";
import { rosterRouter } from "../roster/roster.routes";
import * as ctrl from "./services.controller";

const COORDINATORS = ["super_admin", "service_coordinator"];

export const servicesRouter = Router();

servicesRouter.get(
  "/",
  validateQuery(listServicesQuerySchema),
  asyncHandler(ctrl.list)
);

servicesRouter.get("/:id", asyncHandler(ctrl.getById));

servicesRouter.post(
  "/",
  requireAuth,
  requireRole(COORDINATORS),
  validateBody(createServiceSchema),
  asyncHandler(ctrl.create)
);

servicesRouter.patch(
  "/:id",
  requireAuth,
  requireRole(COORDINATORS),
  validateBody(updateServiceSchema),
  asyncHandler(ctrl.update)
);

servicesRouter.delete(
  "/:id",
  requireAuth,
  requireRole(COORDINATORS),
  asyncHandler(ctrl.remove)
);

// nested: /services/:serviceId/roster
servicesRouter.use("/:serviceId/roster", rosterRouter);
