import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgWithReplicas } from 'drizzle-orm/pg-core';

export interface DrizzlePGConfig {
  connection: () => Promise<NodePgDatabase | PgWithReplicas<any>>;
}
