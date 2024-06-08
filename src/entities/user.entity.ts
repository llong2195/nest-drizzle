import {
  date,
  pgTable,
  smallint,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const UserEntity = pgTable(
  'user',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    fullName: varchar('full_name'),
    password: varchar('password'),
    email: varchar('email').notNull(),
    socialId: varchar('social_id').notNull(),
    providerType: smallint('provider_type').default(0).notNull(),
    roleId: uuid('role_id'),
    birthDay: date('birth_day'),
    gender: smallint('gender').default(1).notNull(),
    phone: varchar('phone'),
    avatar: varchar('avatar'),
    status: smallint('status').default(1).notNull(),
    verifyOtp: smallint('verify_otp').default(0).notNull(),
    verifyKyc: smallint('verify_kyc').default(0).notNull(),
    rememberToken: smallint('remember_token').default(0).notNull(),
    lastActive: timestamp('last_active', {
      withTimezone: true,
      mode: 'string',
    })
      .defaultNow()
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
  },
  table => {
    return {
      unq_user_email: uniqueIndex('unq_user_email').using('btree', table.email),
      unq_user_social_id: uniqueIndex('unq_user_social_id').using(
        'btree',
        table.socialId,
      ),
      unq_user_phone: uniqueIndex('unq_user_phone').using('btree', table.phone),
    };
  },
);
