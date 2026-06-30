import { eq, and, lte, gte, or, isNull, asc, desc } from "drizzle-orm";
import { db } from "../../config/db";
import { banners } from "../../db/schema/content";
import type { CreateBannerInput, UpdateBannerInput } from "./banners.schema";

export async function listActiveBanners() {
  const today = new Date().toISOString().slice(0, 10);

  return db
    .select()
    .from(banners)
    .where(
      and(
        eq(banners.active, true),
        or(isNull(banners.startDate), lte(banners.startDate, today)),
        or(isNull(banners.endDate), gte(banners.endDate, today))
      )
    )
    .orderBy(asc(banners.sortOrder), desc(banners.createdAt));
}

export async function listAllBanners() {
  return db.select().from(banners).orderBy(asc(banners.sortOrder), desc(banners.createdAt));
}

export async function getBannerById(id: string) {
  const [row] = await db.select().from(banners).where(eq(banners.id, id)).limit(1);
  return row ?? null;
}

export async function createBanner(input: CreateBannerInput) {
  const [row] = await db.insert(banners).values(input).returning();
  return row;
}

export async function updateBanner(id: string, input: UpdateBannerInput) {
  const [row] = await db
    .update(banners)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(banners.id, id))
    .returning();
  return row ?? null;
}

export async function deleteBanner(id: string) {
  const [row] = await db
    .delete(banners)
    .where(eq(banners.id, id))
    .returning({ id: banners.id });
  return row ?? null;
}
