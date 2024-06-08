import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DrizzlePGConfig } from './drizzle.interface';

export const {
  ConfigurableModuleClass: ConfigurableDrizzleModule,
  MODULE_OPTIONS_TOKEN: DRIZZLE_OPTIONS,
} = new ConfigurableModuleBuilder<DrizzlePGConfig>()
  .setClassMethodName('forRoot')
  .setExtras({}, definition => ({
    ...definition,
    global: true,
  }))
  .build();
