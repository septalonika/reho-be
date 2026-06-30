import { eq, gte, desc, asc, count, and } from "drizzle-orm";
import { db } from "../../config/db";
import { services } from "../../db/schema/schedule";
import type {
  CreateServiceInput,
  UpdateServiceInput,
  ListServicesQuery,
} from "./services.schema";

export async function listServices(query: ListServicesQuery) {
  const { page, limit, upcoming } = query;
  const offset = (page - 1) * limit;

  const today = new Date().toISOString().slice(0, 10);
  const where = upcoming ? gte(services.serviceDate, today) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(services)
      .where(where)
      .orderBy(upcoming ? asc(services.serviceDate) : desc(services.serviceDate))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(services).where(where),
  ]);

  return { data: rows, total: Number(total), page, limit };
}

export async function getServiceById(id: string) {
  const [row] = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return row ?? null;
}

export async function createService(input: CreateServiceInput) {
  const [row] = await db.insert(services).values(input).returning();
  return row;
}

export async function updateService(id: string, input: UpdateServiceInput) {
  const [row] = await db
    .update(services)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(services.id, id))
    .returning();
  return row ?? null;
}

export async function deleteService(id: string) {
  const [row] = await db
    .delete(services)
    .where(eq(services.id, id))
    .returning({ id: services.id });
  return row ?? null;
}
