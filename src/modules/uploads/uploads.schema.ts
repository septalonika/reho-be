import { z } from "zod";

export const presignSchema = z.object({
  filename: z.string().min(1),
  contentType: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ]),
  folder: z.enum(["banners", "devotionals", "gallery", "birthdays", "bulletins"]),
});

export type PresignInput = z.infer<typeof presignSchema>;
