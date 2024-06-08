import { eq, inArray, Table } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { PAGE_SIZE } from '@/configs/config';
import { LoggerService } from '@/logger/custom.logger';
import { IBaseService } from './i.base.service';
import { PaginationResponse } from './pagination.dto';

export class BaseService<
  TSchema extends Record<string, unknown>,
  Entity extends Table,
> implements IBaseService<Entity>
{
  protected readonly connection: NodePgDatabase<TSchema>;
  protected readonly logger: LoggerService;
  protected readonly entity: Entity;

  constructor(
    connection: NodePgDatabase<TSchema>,
    entity: Entity,
    logger: LoggerService,
  ) {
    this.connection = connection;
    this.entity = entity;
    this.logger = logger;
  }

  async _findById(id: string): Promise<Entity['$inferSelect']> {
    const data = await this.connection
      .select()
      .from(this.entity)
      .where(eq(this.entity['id'], id))
      .execute();
    return data.at(0);
  }

  _findByIds(ids: string[]): Promise<Entity['$inferSelect'][]> {
    return this.connection
      .select()
      .from(this.entity)
      .where(inArray(this.entity['id'], ids))
      .execute();
  }

  _update(
    id: string,
    data: Partial<Entity['$inferSelect']>,
  ): Promise<Entity['$inferSelect']> {
    return this.connection
      .update(this.entity)
      .set(data)
      .where(eq(this.entity['id'], id))
      .returning()
      .execute();
  }

  _delete(id: string): Promise<Entity['$inferSelect']> {
    return this.connection
      .delete(this.entity)
      .where(eq(this.entity['id'], id))
      .returning()
      .execute();
  }

  _store(data: Entity['$inferInsert']): Promise<Entity['$inferSelect']> {
    return this.connection
      .insert(this.entity)
      .values(data)
      .returning()
      .execute();
  }

  /**
   * It takes an array of items, a total number of items, a page number, and a page size, and returns
   * a paginated response object
   * @param {T[]} items - The items to be paginated.
   * @param {number} total - The total number of items in the database.
   * @param {number} [page=1] - The current page number
   * @param {number} limit - The number of items per page.
   * @returns {PaginationResponse} A new instance of the PaginationResponse class.
   */
  pagination<T>(
    items: T[],
    total: number,
    page = 1,
    limit = PAGE_SIZE,
  ): PaginationResponse<T> {
    const totalPage = Math.ceil(total / limit);
    if (total <= 0 || page > totalPage) {
      return new PaginationResponse([], {
        pagination: {
          currentPage: page,
          limit: limit,
          total: 0,
          totalPages: 0,
        },
      });
    }

    return new PaginationResponse(items, {
      pagination: {
        currentPage: Number(page),
        limit: limit,
        total: total,
        totalPages: totalPage,
      },
    });
  }
}
