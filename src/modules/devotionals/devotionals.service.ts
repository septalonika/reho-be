import { eq, desc, and, count } from "drizzle-orm";
import { db } from "../../config/db";
import { devotionals } from "../../db/schema/content";
import { uniqueSlug } from "../../utils/slug";
import type {
  CreateDevotionalInput,
  UpdateDevotionalInput,
  ListDevotionalsQuery,
} from "./devotionals.schema";

export async function listDevotionals(query: ListDevotionalsQuery, isAdmin: boolean) {
  const { page, limit, status } = query;
  const offset = (page - 1) * limit;

  const conditions = [];
  if (!isAdmin) conditions.push(eq(devotionals.status, "published"));
  if (status) conditions.push(eq(devotionals.status, status));

  const where = conditions.length ? and(...conditions) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select()
      .from(devotionals)
      .where(where)
      .orderBy(desc(devotionals.devotionalDate), desc(devotionals.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(devotionals).where(where),
  ]);

  return { data: rows, total: Number(total), page, limit };
}

export async function getDevotionalBySlug(slug: string) {
  const [row] = await db
    .select()
    .from(devotionals)
    .where(eq(devotionals.slug, slug))
    .limit(1);
  return row ?? null;
}

export async function getDevotionalById(id: string) {
  const [row] = await db
    .select()
    .from(devotionals)
    .where(eq(devotionals.id, id))
    .limit(1);
  return row ?? null;
}

export async function createDevotional(input: CreateDevotionalInput, authorId: string) {
  const slug = uniqueSlug(input.title);
  const publishedAt =
    input.status === "published" ? new Date() : null;

  const [row] = await db
    .insert(devotionals)
    .values({ ...input, slug, authorId, publishedAt })
    .returning();

  return row;
}

export async function updateDevotional(id: string, input: UpdateDevotionalInput) {
  const existing = await getDevotionalById(id);
  if (!existing) return null;

  const publishedAt =
    input.status === "published" && existing.status !== "published"
      ? new Date()
      : existing.publishedAt;

  const [row] = await db
    .update(devotionals)
    .set({ ...input, publishedAt, updatedAt: new Date() })
    .where(eq(devotionals.id, id))
    .returning();

  return row;
}

export async function deleteDevotional(id: string) {
  const [row] = await db
    .delete(devotionals)
    .where(eq(devotionals.id, id))
    .returning({ id: devotionals.id });
  return row ?? null;
}
