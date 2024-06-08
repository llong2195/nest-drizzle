import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { BaseService } from '@/base/base.service';
import * as schema from '@/entities/schema';
import { UserEntity } from '@/entities/user.entity';
import { InjectConnection } from '@/libs/drizzle/drizzle.decorator';
import { LoggerService } from '@/logger/custom.logger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService extends BaseService<typeof schema, typeof UserEntity> {
  constructor(
    @InjectConnection() connection: NodePgDatabase<typeof schema>,
    logger: LoggerService,
  ) {
    super(connection, UserEntity, logger);
  }
  create(createUserDto: CreateUserDto) {
    return this._store(createUserDto);
  }

  findAll() {
    return this.connection.select().from(UserEntity).execute();
  }

  findOne(id: string) {
    return this._findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this._update(id, updateUserDto);
  }

  remove(id: string) {
    return this._delete(id);
  }
}
