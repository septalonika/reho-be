import { z } from "zod";

export const createBirthdaySchema = z.object({
  memberName: z.string().min(1),
  birthDate: z.string(),
  photoUrl: z.string().url().optional(),
  note: z.string().optional(),
});

export const updateBirthdaySchema = createBirthdaySchema.partial();

export const listBirthdaysQuerySchema = z.object({
  month: z.coerce.number().min(1).max(12).optional(),
});

export type CreateBirthdayInput = z.infer<typeof createBirthdaySchema>;
export type UpdateBirthdayInput = z.infer<typeof updateBirthdaySchema>;
export type ListBirthdaysQuery = z.infer<typeof listBirthdaysQuerySchema>;
