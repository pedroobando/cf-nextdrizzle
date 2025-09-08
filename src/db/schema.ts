import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// export interface IPersona {
//   id: string;
//   fullname: string;
//   dni: string;
//   email: string;
//   phone: string;
//   roll: userType;
//   active: boolean;
// }

export const people = sqliteTable('people', {
  // id is autoincremental
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  fullname: text('fullname').notNull(),
  dni: text('dni'),
  email: text('email').notNull(),
  phone: text().notNull(),
  roll: text().notNull(),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),

  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
});
