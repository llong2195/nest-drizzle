import { Logger, Module } from '@nestjs/common';
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
            try {
              return await options.connection();
            } catch (error) {
              logger.error('Unable to connect to the database', error?.stack);
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
