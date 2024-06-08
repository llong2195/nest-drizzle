import { DrizzleConfig } from 'drizzle-orm';
import { ClientConfig, PoolConfig } from 'pg';

export interface DrizzlePGConfig {
  pg: {
    connection: 'client' | 'pool';
    config?: ClientConfig | PoolConfig;
    // Todo: implement this next version
    replication?: {
      primaryDb: ClientConfig | PoolConfig;
      replicas: ClientConfig | PoolConfig[];
    };
  };
  config?: DrizzleConfig<any> | undefined;
}
