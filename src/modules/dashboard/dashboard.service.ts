import { sql, gte, and, lte, eq, count } from "drizzle-orm";
import { db } from "../../config/db";
import { services } from "../../db/schema/schedule";
import { devotionals, bulletins } from "../../db/schema/content";
import { transactions } from "../../db/schema/finance";

export async function getDashboardStats(role: string) {
  const today = new Date().toISOString().slice(0, 10);
  const firstOfMonth = today.slice(0, 7) + "-01";

  const [[upcoming], [draftDevo], [draftBull]] = await Promise.all([
    db.select({ total: count() }).from(services).where(gte(services.serviceDate, today)),
    db.select({ total: count() }).from(devotionals).where(eq(devotionals.status, "draft")),
    db.select({ total: count() }).from(bulletins).where(eq(bulletins.status, "draft")),
  ]);

  const canViewFinance = role === "super_admin" || role === "finance_manager";

  let monthlyBalance: number | null = null;
  if (canViewFinance) {
    const [summary] = await db
      .select({
        income: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'income' THEN ${transactions.amount} ELSE 0 END), 0)`,
        expense: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'expense' THEN ${transactions.amount} ELSE 0 END), 0)`,
      })
      .from(transactions)
      .where(
        and(
          gte(transactions.transactionDate, firstOfMonth),
          lte(transactions.transactionDate, today)
        )
      );
    monthlyBalance =
      parseFloat(summary?.income ?? "0") - parseFloat(summary?.expense ?? "0");
  }

  return {
    upcomingServices: Number(upcoming?.total ?? 0),
    draftContent: Number(draftDevo?.total ?? 0) + Number(draftBull?.total ?? 0),
    monthlyBalance,
  };
}
