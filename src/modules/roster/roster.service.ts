import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { rosterAssignments, members } from "../../db/schema/schedule";
import type { CreateRosterAssignmentInput } from "./roster.schema";

export async function getRosterByServiceId(serviceId: string) {
  return db
    .select({
      id: rosterAssignments.id,
      serviceId: rosterAssignments.serviceId,
      role: rosterAssignments.role,
      createdAt: rosterAssignments.createdAt,
      member: {
        id: members.id,
        fullName: members.fullName,
        phone: members.phone,
        email: members.email,
      },
    })
    .from(rosterAssignments)
    .innerJoin(members, eq(rosterAssignments.memberId, members.id))
    .where(eq(rosterAssignments.serviceId, serviceId))
    .orderBy(rosterAssignments.role);
}

export async function createRosterAssignment(input: CreateRosterAssignmentInput) {
  const [row] = await db.insert(rosterAssignments).values(input).returning();
  return row;
}

export async function deleteRosterAssignment(id: string) {
  const [row] = await db
    .delete(rosterAssignments)
    .where(eq(rosterAssignments.id, id))
    .returning({ id: rosterAssignments.id });
  return row ?? null;
}
