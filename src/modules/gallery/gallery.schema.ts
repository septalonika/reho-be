import { z } from "zod";

export const createAlbumSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  coverUrl: z.string().url().optional(),
  eventDate: z.string().optional(),
});

export const updateAlbumSchema = createAlbumSchema.partial();

export const createGalleryItemSchema = z.object({
  albumId: z.string().uuid().optional(),
  type: z.enum(["youtube", "image"]),
  title: z.string().optional(),
  youtubeUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  sortOrder: z.number().int().default(0),
});

export const updateGalleryItemSchema = createGalleryItemSchema.partial();

export type CreateAlbumInput = z.infer<typeof createAlbumSchema>;
export type UpdateAlbumInput = z.infer<typeof updateAlbumSchema>;
export type CreateGalleryItemInput = z.infer<typeof createGalleryItemSchema>;
export type UpdateGalleryItemInput = z.infer<typeof updateGalleryItemSchema>;
