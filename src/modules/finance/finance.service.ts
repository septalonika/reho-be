import { eq, and, gte, lte, desc, count, sql } from "drizzle-orm";
import { db } from "../../config/db";
import { transactions, financeCategories } from "../../db/schema/finance";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
  ListTransactionsQuery,
  ReportQuery,
} from "./finance.schema";

export async function listCategories() {
  return db
    .select()
    .from(financeCategories)
    .where(eq(financeCategories.active, true))
    .orderBy(financeCategories.type, financeCategories.name);
}

export async function listTransactions(query: ListTransactionsQuery) {
  const { page, limit, type, categoryId, from, to } = query;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (type) conditions.push(eq(transactions.type, type));
  if (categoryId) conditions.push(eq(transactions.categoryId, categoryId));
  if (from) conditions.push(gte(transactions.transactionDate, from));
  if (to) conditions.push(lte(transactions.transactionDate, to));

  const where = conditions.length ? and(...conditions) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        transaction: transactions,
        category: financeCategories,
      })
      .from(transactions)
      .innerJoin(financeCategories, eq(transactions.categoryId, financeCategories.id))
      .where(where)
      .orderBy(desc(transactions.transactionDate))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(transactions).where(where),
  ]);

  return { data: rows, total: Number(total), page, limit };
}

export async function getTransactionById(id: string) {
  const [row] = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, id))
    .limit(1);
  return row ?? null;
}

export async function createTransaction(input: CreateTransactionInput, userId: string) {
  const [row] = await db
    .insert(transactions)
    .values({
      ...input,
      amount: String(input.amount),
      recordedBy: userId,
    })
    .returning();
  return row;
}

export async function updateTransaction(id: string, input: UpdateTransactionInput) {
  const [row] = await db
    .update(transactions)
    .set({
      ...input,
      amount: input.amount !== undefined ? String(input.amount) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, id))
    .returning();
  return row ?? null;
}

export async function deleteTransaction(id: string) {
  const [row] = await db
    .delete(transactions)
    .where(eq(transactions.id, id))
    .returning({ id: transactions.id });
  return row ?? null;
}

export async function getFinancialSummary(query: ReportQuery) {
  const { from, to } = query;

  const conditions = and(
    gte(transactions.transactionDate, from),
    lte(transactions.transactionDate, to)
  );

  const [summary] = await db
    .select({
      totalIncome: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'income' THEN ${transactions.amount} ELSE 0 END), 0)`,
      totalExpense: sql<string>`COALESCE(SUM(CASE WHEN ${transactions.type} = 'expense' THEN ${transactions.amount} ELSE 0 END), 0)`,
    })
    .from(transactions)
    .where(conditions);

  const byCategory = await db
    .select({
      categoryId: transactions.categoryId,
      categoryName: financeCategories.name,
      type: transactions.type,
      total: sql<string>`SUM(${transactions.amount})`,
    })
    .from(transactions)
    .innerJoin(financeCategories, eq(transactions.categoryId, financeCategories.id))
    .where(conditions)
    .groupBy(transactions.categoryId, financeCategories.name, transactions.type)
    .orderBy(transactions.type, financeCategories.name);

  const totalIncome = parseFloat(summary?.totalIncome ?? "0");
  const totalExpense = parseFloat(summary?.totalExpense ?? "0");

  return {
    period: { from, to },
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    byCategory: byCategory.map((r) => ({
      ...r,
      total: parseFloat(r.total),
    })),
  };
}
