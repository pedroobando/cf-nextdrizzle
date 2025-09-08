// lib/db.ts
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';
import * as schema from './schema';

export const d1Database = getCloudflareContext().env.DB as D1Database;

export type DzD1Database = DrizzleD1Database<typeof schema> & { $client: D1Database };

export const dbc = () => {
  const db = drizzle(d1Database, { schema }) as DzD1Database;
  return db;
};
// export const getdata = (db: DzD1Database) => db;
