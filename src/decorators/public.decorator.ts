import { SetMetadata } from '@nestjs/common';

import { MetadataEnum } from '../enums/metadata.enum';

export const Public = () => SetMetadata(MetadataEnum.IS_PUBLIC_KEY, true);
