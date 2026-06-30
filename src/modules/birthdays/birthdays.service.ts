import { eq, sql } from "drizzle-orm";
import { db } from "../../config/db";
import { birthdays } from "../../db/schema/content";
import type {
  CreateBirthdayInput,
  UpdateBirthdayInput,
  ListBirthdaysQuery,
} from "./birthdays.schema";

export async function listBirthdays(query: ListBirthdaysQuery) {
  const rows = await db.select().from(birthdays).orderBy(birthdays.birthDate);

  if (query.month) {
    return rows.filter((r) => {
      const month = new Date(r.birthDate).getMonth() + 1;
      return month === query.month;
    });
  }

  return rows;
}

export async function getBirthdayById(id: string) {
  const [row] = await db.select().from(birthdays).where(eq(birthdays.id, id)).limit(1);
  return row ?? null;
}

export async function createBirthday(input: CreateBirthdayInput) {
  const [row] = await db.insert(birthdays).values(input).returning();
  return row;
}

export async function updateBirthday(id: string, input: UpdateBirthdayInput) {
  const [row] = await db
    .update(birthdays)
    .set(input)
    .where(eq(birthdays.id, id))
    .returning();
  return row ?? null;
}

export async function deleteBirthday(id: string) {
  const [row] = await db
    .delete(birthdays)
    .where(eq(birthdays.id, id))
    .returning({ id: birthdays.id });
  return row ?? null;
}
