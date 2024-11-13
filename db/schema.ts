import { sql } from "drizzle-orm";
import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: text("name").notNull(),
  datetime: timestamp("datetime", { precision: 3 }).notNull(),
  datetimeString: timestamp("datetime_string", {
    precision: 3,
    mode: "string",
  }).notNull(),
  datetimeWithTimeZone: timestamp("datetime_with_time_zone", {
    precision: 3,
    withTimezone: true,
  }).notNull(),
  datetimeStringWithTimeZone: timestamp("datetime_string_with_time_zone", {
    precision: 3,
    mode: "string",
    withTimezone: true,
  }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3 }).$onUpdate(
    () => sql`now()`
  ),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
