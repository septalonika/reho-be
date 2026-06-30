import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody, validateQuery } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createBirthdaySchema,
  updateBirthdaySchema,
  listBirthdaysQuerySchema,
} from "./birthdays.schema";
import * as ctrl from "./birthdays.controller";

const EDITORS = ["super_admin", "content_editor"];

export const birthdaysRouter = Router();

birthdaysRouter.get(
  "/",
  validateQuery(listBirthdaysQuerySchema),
  asyncHandler(ctrl.list)
);

birthdaysRouter.post(
  "/",
  requireAuth,
  requireRole(EDITORS),
  validateBody(createBirthdaySchema),
  asyncHandler(ctrl.create)
);

birthdaysRouter.patch(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  validateBody(updateBirthdaySchema),
  asyncHandler(ctrl.update)
);

birthdaysRouter.delete(
  "/:id",
  requireAuth,
  requireRole(EDITORS),
  asyncHandler(ctrl.remove)
);
