import { Inject } from '@nestjs/common';

import { DRIZZLE_CONNECTION } from './drizzle.constants';

export const InjectConnection = () => Inject(DRIZZLE_CONNECTION);
