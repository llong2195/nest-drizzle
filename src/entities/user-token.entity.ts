import {
  index,
  pgTable,
  smallint,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const user_token = pgTable(
  'user_token',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    user_id: uuid('user_id').notNull(),
    token: varchar('token').notNull(),
    type: smallint('type').default(0).notNull(),
    status: smallint('status').default(1).notNull(),
    ip_address: varchar('ip_address'),
    expires_at: timestamp('expires_at', { withTimezone: true, mode: 'string' }),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => {
    return {
      idx_user_token_token: index('idx_user_token_token').using(
        'btree',
        table.token,
      ),
      idx_user_token_user_id: index('idx_user_token_user_id').using(
        'btree',
        table.user_id,
      ),
    };
  },
);
