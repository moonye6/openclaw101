import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const tursoUrl = process.env.TURSO_DATABASE_URL || 'file:local.db';
const tursoAuthToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url: tursoUrl,
  authToken: tursoAuthToken,
});

export const db = drizzle(client, { schema });

export * from './schema';
