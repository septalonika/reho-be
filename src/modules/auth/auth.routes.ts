import { Router } from "express";
import { validateBody } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginSchema, refreshSchema } from "./auth.schema";
import * as ctrl from "./auth.controller";

export const authRouter = Router();

authRouter.post("/login", validateBody(loginSchema), asyncHandler(ctrl.loginHandler));
authRouter.post("/refresh", validateBody(refreshSchema), asyncHandler(ctrl.refreshHandler));
