import { Logger, Module } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client, Pool } from 'pg';
import { catchError, defer, lastValueFrom, retry } from 'rxjs';

import { DRIZZLE_CONNECTION } from './drizzle.constants';
import { DrizzlePGConfig } from './drizzle.interface';
import {
  ConfigurableDrizzleModule,
  DRIZZLE_OPTIONS,
} from './drizzle.module-builder';

const logger = new Logger('DrizzleModule');
@Module({
  providers: [
    {
      provide: DRIZZLE_CONNECTION,
      inject: [DRIZZLE_OPTIONS],
      useFactory: (options: DrizzlePGConfig) => {
        return lastValueFrom(
          defer(async () => {
            if (options.pg.connection === 'client') {
              const client = new Client(options.pg.config);
              await client.connect();
              return drizzle(client, options?.config);
            }

            const pool = new Pool(options.pg.config);
            const client = drizzle(pool, options?.config);

            try {
              await client.execute(sql.raw(`select 1`));
              return client;
            } catch (error) {
              logger.error('Unable to connect to the database', error);
              throw error;
            }
          }).pipe(
            retry({ count: 10, delay: 1000 }),
            catchError(err => {
              throw err;
            }),
          ),
        );
      },
    },
  ],
  exports: [DRIZZLE_CONNECTION],
})
export class DrizzleModule extends ConfigurableDrizzleModule {}
