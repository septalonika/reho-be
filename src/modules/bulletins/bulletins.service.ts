import { eq, and, desc, count } from "drizzle-orm";
import { db } from "../../config/db";
import { bulletins } from "../../db/schema/content";
import { uniqueSlug } from "../../utils/slug";
import type {
  CreateBulletinInput,
  UpdateBulletinInput,
  ListBulletinsQuery,
} from "./bulletins.schema";

export async function listBulletins(query: ListBulletinsQuery, isAdmin: boolean) {
  const { page, limit, status } = query;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (!isAdmin) conditions.push(eq(bulletins.status, "published"));
  if (status) conditions.push(eq(bulletins.status, status));

  const where = conditions.length ? and(...conditions) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(bulletins)
      .where(where)
      .orderBy(desc(bulletins.periodDate), desc(bulletins.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(bulletins).where(where),
  ]);

  return { data: rows, total: Number(total), page, limit };
}

export async function getBulletinBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(bulletins)
    .where(eq(bulletins.slug, slug))
    .limit(1);
  return row ?? null;
}

export async function getBulletinById(id: string) {
  const [row] = await db
    .select()
    .from(bulletins)
    .where(eq(bulletins.id, id))
    .limit(1);
  return row ?? null;
}

export async function createBulletin(input: CreateBulletinInput) {
  const slug = uniqueSlug(input.title);
  const publishedAt = input.status === "published" ? new Date() : null;

  const [row] = await db
    .insert(bulletins)
    .values({ ...input, slug, publishedAt })
    .returning();

  return row;
}

export async function updateBulletin(id: string, input: UpdateBulletinInput) {
  const existing = await getBulletinById(id);
  if (!existing) return null;

  const publishedAt =
    input.status === "published" && existing.status !== "published"
      ? new Date()
      : existing.publishedAt;

  const [row] = await db
    .update(bulletins)
    .set({ ...input, publishedAt, updatedAt: new Date() })
    .where(eq(bulletins.id, id))
    .returning();

  return row;
}

export async function deleteBulletin(id: string) {
  const [row] = await db
    .delete(bulletins)
    .where(eq(bulletins.id, id))
    .returning({ id: bulletins.id });
  return row ?? null;
}
