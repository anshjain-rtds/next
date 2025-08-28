import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// export const users = sqliteTable("users", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   name: text("name").notNull(),
//   email: text("email").notNull().unique(),
// });

export const snippet = sqliteTable("snippet",{
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  code: text("code").notNull(),
});