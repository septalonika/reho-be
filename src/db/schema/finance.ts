import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  numeric,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { profiles } from "./auth";
import { services } from "./schedule";

export const transactionTypeEnum = pgEnum("transaction_type", ["income", "expense"]);

export const financeCategories = pgTable("finance_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: transactionTypeEnum("type").notNull(),
  name: text("name").notNull(),
  active: boolean("active").notNull().default(true),
});

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: transactionTypeEnum("type").notNull(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => financeCategories.id),
  amount: numeric("amount", { precision: 15, scale: 2 }).notNull(),
  transactionDate: date("transaction_date").notNull(),
  description: text("description"),
  serviceId: uuid("service_id").references(() => services.id, { onDelete: "set null" }),
  recordedBy: uuid("recorded_by").references(() => profiles.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
