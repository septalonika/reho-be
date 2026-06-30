import { z } from "zod";

export const createDevotionalSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  bibleVerse: z.string().optional(),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().url().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  devotionalDate: z.string().optional(),
});

export const updateDevotionalSchema = createDevotionalSchema.partial();

export const listDevotionalsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  status: z.enum(["draft", "published"]).optional(),
});

export type CreateDevotionalInput = z.infer<typeof createDevotionalSchema>;
export type UpdateDevotionalInput = z.infer<typeof updateDevotionalSchema>;
export type ListDevotionalsQuery = z.infer<typeof listDevotionalsQuerySchema>;
