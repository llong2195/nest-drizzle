import { Logger } from 'drizzle-orm';
import { LoggerService } from './custom.logger';

export class DbCustomLogger implements Logger {
  constructor(private logger: LoggerService) {}

  /**
   * Logs query and parameters used in it.
   * @param {string} query - The query that was executed.
   * @param {unknown[]} [parameters] - []
   * @param {QueryRunner} [queryRunner] - The QueryRunner instance that is used to execute queries.
   */
  logQuery(query: string, parameters?: unknown[]): void {
    this.logger.log('logQuery->>>:', [query, parameters]);
  }
}
