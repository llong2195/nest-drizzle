import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        return {
          pg: {
            connection: 'pool',
            config: {
              host: configService.get<string>('DATABASE_HOST') || 'localhost',
              port: configService.get<number>('DATABASE_PORT') || 5432,
              user:
                configService.get<string>('DATABASE_USERNAME') || 'postgres',
              password:
                configService.get<string>('DATABASE_PASSWORD') || 'password',
              database:
                configService.get<string>('DATABASE_DB_NAME') || 'example',
              ssl: true,
            },
          },
          config: {
            logger: new DbCustomLogger(new LoggerService()),
            schema: schema,
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
