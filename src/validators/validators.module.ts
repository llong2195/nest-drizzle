import { Module } from '@nestjs/common';

import { CompareValidator } from './compare.validator';

@Module({
  providers: [CompareValidator],
  exports: [CompareValidator],
})
export class ValidatorsModule {}
