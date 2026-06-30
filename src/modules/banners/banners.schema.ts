import { z } from "zod";

export const createBannerSchema = z.object({
  title: z.string().min(1),
  imageUrl: z.string().url(),
  linkUrl: z.string().url().optional(),
  active: z.boolean().default(true),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
});

export const updateBannerSchema = createBannerSchema.partial();

export type CreateBannerInput = z.infer<typeof createBannerSchema>;
export type UpdateBannerInput = z.infer<typeof updateBannerSchema>;
