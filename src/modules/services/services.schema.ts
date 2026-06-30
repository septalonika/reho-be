import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["raya", "pemuda", "anak", "doa", "khusus"]),
  serviceDate: z.string(),
  startTime: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  liturgy: z.record(z.unknown()).optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const listServicesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  upcoming: z.coerce.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ListServicesQuery = z.infer<typeof listServicesQuerySchema>;
