import { eq } from "drizzle-orm";
import { db } from "../../config/db";
import { members } from "../../db/schema/schedule";
import type { CreateMemberInput, UpdateMemberInput } from "./members.schema";

export async function listMembers() {
  return db.select().from(members).orderBy(members.fullName);
}

export async function getMemberById(id: string) {
  const [row] = await db.select().from(members).where(eq(members.id, id)).limit(1);
  return row ?? null;
}

export async function createMember(input: CreateMemberInput) {
  const [row] = await db.insert(members).values(input).returning();
  return row;
}

export async function updateMember(id: string, input: UpdateMemberInput) {
  const [row] = await db
    .update(members)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(members.id, id))
    .returning();
  return row ?? null;
}

export async function deleteMember(id: string) {
  const [row] = await db
    .delete(members)
    .where(eq(members.id, id))
    .returning({ id: members.id });
  return row ?? null;
}
