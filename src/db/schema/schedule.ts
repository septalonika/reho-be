import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  date,
  time,
  pgEnum,
  unique,
  jsonb,
} from "drizzle-orm/pg-core";

export const serviceTypeEnum = pgEnum("service_type", [
  "raya",
  "pemuda",
  "anak",
  "doa",
  "khusus",
]);

export const rosterRoleEnum = pgEnum("roster_role", [
  "worship_leader",
  "singer",
  "bass",
  "guitar",
  "keyboard",
  "drum",
  "usher",
  "kolektan",
]);

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: serviceTypeEnum("type").notNull(),
  serviceDate: date("service_date").notNull(),
  startTime: time("start_time"),
  location: text("location"),
  description: text("description"),
  liturgy: jsonb("liturgy"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  email: text("email"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const rosterAssignments = pgTable(
  "roster_assignments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    serviceId: uuid("service_id")
      .notNull()
      .references(() => services.id, { onDelete: "cascade" }),
    memberId: uuid("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    role: rosterRoleEnum("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    uniqueAssignment: unique().on(t.serviceId, t.memberId, t.role),
  })
);
