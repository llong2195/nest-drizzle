import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LoggerService } from '@/logger/custom.logger';
import { isDev } from '@/utils/util';

@Module({
  imports: [],
})
export class DatabaseModule {}
