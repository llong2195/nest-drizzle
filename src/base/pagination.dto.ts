import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { MessageCode } from '@/constants/message-code';
import { ConvertToNumber } from '@/utils/transformers.util';

export class PaginationResponse<T = any> {
  statusCode: number;
  message: string;
  data: {
    items: T | T[] | unknown | any;
    meta: {
      pagination: {
        currentPage: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    };
  };

  constructor(
    items: T[] | T | null = [],
    meta = {
      pagination: {
        currentPage: 0,
        limit: 0,
        total: 0,
        totalPages: 0,
      },
    },
    message = MessageCode.SUCCESS,
    statusCode = 200,
  ) {
    this.message = message;
    this.data = { items: items, meta: meta };
    this.statusCode = statusCode;
  }
}

export class PaginationOption {
  @ApiProperty({
    default: 1,
    required: false,
    description: 'Page number',
  })
  @IsInt()
  @Type(() => Number)
  @ConvertToNumber()
  @IsOptional()
  @Min(0)
  page: number;

  @ApiProperty({
    default: 10,
    required: false,
    description: 'Limit result number',
  })
  @IsInt()
  @Type(() => Number)
  @ConvertToNumber()
  @IsOptional()
  @Min(1)
  @Max(1000)
  limit: number;
}
