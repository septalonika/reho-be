import { z } from "zod";

export const createRosterAssignmentSchema = z.object({
  serviceId: z.string().uuid(),
  memberId: z.string().uuid(),
  role: z.enum([
    "worship_leader",
    "singer",
    "bass",
    "guitar",
    "keyboard",
    "drum",
    "usher",
    "kolektan",
  ]),
});

export type CreateRosterAssignmentInput = z.infer<typeof createRosterAssignmentSchema>;
