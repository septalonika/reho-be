import { z } from "zod";

export const createBulletinSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  periodDate: z.string(),
  pdfUrl: z.string().url().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export const updateBulletinSchema = createBulletinSchema.partial();

export const listBulletinsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  status: z.enum(["draft", "published"]).optional(),
});

export type CreateBulletinInput = z.infer<typeof createBulletinSchema>;
export type UpdateBulletinInput = z.infer<typeof updateBulletinSchema>;
export type ListBulletinsQuery = z.infer<typeof listBulletinsQuerySchema>;
