import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { asyncHandler } from "../../utils/asyncHandler";
import * as ctrl from "./dashboard.controller";

export const dashboardRouter = Router();

dashboardRouter.get("/stats", requireAuth, asyncHandler(ctrl.stats));
