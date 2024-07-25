import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from '@/entities/schema';
import { DrizzleModule } from '@/libs/drizzle/drizzle.module';
import { LoggerService } from '@/logger/custom.logger';
import { DbCustomLogger } from '@/logger/db-custom.logger';

@Module({
  imports: [
    DrizzleModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get('DATABASE_HOST'),
          user: configService.get('DATABASE_USERNAME'),
          port: configService.get('DATABASE_PORT'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DB_NAME'),
        });

        return {
          connection: async () => {
            const client = drizzle(pool, {
              logger: new DbCustomLogger(new LoggerService('DatabaseModule')),
              schema: schema,
            });

            await client.execute(sql.raw(`select 1`));
            return client;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
