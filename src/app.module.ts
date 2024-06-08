import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentModule } from './components/component.module';
import { DatabaseModule } from './database/database.module';
import { EnvEnum } from './enums/app.enum';
import { AllExceptionFilter } from './filter/exception.filter';
import { ThrottlerBehindProxyGuard } from './guards/throttler-behind-proxy.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { LoggerModule } from './logger/logger.module';
import { QrCodeModule } from './modules/qr-code/qr-code.module';
import { UserModule } from './modules/user/user.module';
import { isEnv } from './utils/util';
import { ValidatorsModule } from './validators/validators.module';

const providers = [] as Provider[];

if (isEnv(EnvEnum.Production)) {
  providers.push({
    provide: APP_GUARD,
    useClass: ThrottlerBehindProxyGuard,
  });
} else {
  providers.push({
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          throttlers: [
            {
              ttl: config.get<number>('THROTTLE_TTL'),
              limit: config.get<number>('THROTTLE_LIMIT'),
            },
          ],
          ignoreUserAgents: [
            // Don't throttle request that have 'googlebot' defined in them.
            // Example user agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
            /googlebot/gi,

            // Don't throttle request that have 'bingbot' defined in them.
            // Example user agent: Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)
            new RegExp('bingbot', 'gi'),
          ],
        }) as ThrottlerModuleOptions,
    }),
    LoggerModule,
    ComponentModule,
    DatabaseModule,
    ValidatorsModule,
    QrCodeModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    ...providers,
  ],
})
export class AppModule {}
