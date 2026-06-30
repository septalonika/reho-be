import { Router } from "express";
import { requireAuth } from "../../middleware/requireAuth";
import { requireRole } from "../../middleware/requireRole";
import { validateBody, validateQuery } from "../../middleware/validate";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  createTransactionSchema,
  updateTransactionSchema,
  listTransactionsQuerySchema,
  reportQuerySchema,
} from "./finance.schema";
import * as ctrl from "./finance.controller";

const FINANCE = ["super_admin", "finance_manager"];

export const financeRouter = Router();

financeRouter.use(requireAuth, requireRole(FINANCE));

financeRouter.get("/categories", asyncHandler(ctrl.listCategories));

financeRouter.get(
  "/transactions",
  validateQuery(listTransactionsQuerySchema),
  asyncHandler(ctrl.listTransactions)
);

financeRouter.post(
  "/transactions",
  validateBody(createTransactionSchema),
  asyncHandler(ctrl.createTransaction)
);

financeRouter.patch(
  "/transactions/:id",
  validateBody(updateTransactionSchema),
  asyncHandler(ctrl.updateTransaction)
);

financeRouter.delete("/transactions/:id", asyncHandler(ctrl.deleteTransaction));

financeRouter.get(
  "/reports/summary",
  validateQuery(reportQuerySchema),
  asyncHandler(ctrl.getSummary)
);
