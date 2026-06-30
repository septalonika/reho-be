import { eq, asc, desc } from "drizzle-orm";
import { db } from "../../config/db";
import { galleryAlbums, galleryItems } from "../../db/schema/content";
import { extractYouTubeId, getYouTubeThumbnail } from "../../utils/youtube";
import type {
  CreateAlbumInput,
  UpdateAlbumInput,
  CreateGalleryItemInput,
  UpdateGalleryItemInput,
} from "./gallery.schema";

export async function listAlbums() {
  return db.select().from(galleryAlbums).orderBy(desc(galleryAlbums.eventDate));
}

export async function getAlbumById(id: string) {
  const [album] = await db
    .select()
    .from(galleryAlbums)
    .where(eq(galleryAlbums.id, id))
    .limit(1);
  if (!album) return null;

  const items = await db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.albumId, id))
    .orderBy(asc(galleryItems.sortOrder));

  return { ...album, items };
}

export async function createAlbum(input: CreateAlbumInput) {
  const [row] = await db.insert(galleryAlbums).values(input).returning();
  return row;
}

export async function updateAlbum(id: string, input: UpdateAlbumInput) {
  const [row] = await db
    .update(galleryAlbums)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(galleryAlbums.id, id))
    .returning();
  return row ?? null;
}

export async function deleteAlbum(id: string) {
  const [row] = await db
    .delete(galleryAlbums)
    .where(eq(galleryAlbums.id, id))
    .returning({ id: galleryAlbums.id });
  return row ?? null;
}

export async function createGalleryItem(input: CreateGalleryItemInput) {
  let youtubeVideoId: string | undefined;
  let thumbnailUrl: string | undefined;

  if (input.type === "youtube" && input.youtubeUrl) {
    const id = extractYouTubeId(input.youtubeUrl);
    if (!id) throw new Error("Invalid YouTube URL");
    youtubeVideoId = id;
    thumbnailUrl = getYouTubeThumbnail(id);
  }

  if (input.type === "image" && input.imageUrl) {
    thumbnailUrl = input.imageUrl;
  }

  const [row] = await db
    .insert(galleryItems)
    .values({
      albumId: input.albumId,
      type: input.type,
      title: input.title,
      youtubeVideoId,
      imageUrl: input.imageUrl,
      thumbnailUrl,
      sortOrder: input.sortOrder ?? 0,
    })
    .returning();

  return row;
}

export async function updateGalleryItem(id: string, input: UpdateGalleryItemInput) {
  const [row] = await db
    .update(galleryItems)
    .set(input)
    .where(eq(galleryItems.id, id))
    .returning();
  return row ?? null;
}

export async function deleteGalleryItem(id: string) {
  const [row] = await db
    .delete(galleryItems)
    .where(eq(galleryItems.id, id))
    .returning({ id: galleryItems.id });
  return row ?? null;
}
