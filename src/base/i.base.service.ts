import { Table } from 'drizzle-orm';

export interface IBaseService<Entity extends Table> {
  _findById(id: string);

  _findByIds(ids: string[]);

  _update(id: string, data: Partial<Entity['$inferSelect']>);

  _delete(id: string);

  _store(data: Entity);
}
