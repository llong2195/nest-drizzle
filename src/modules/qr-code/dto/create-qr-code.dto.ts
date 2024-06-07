import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class QRCodeDto {
  @ApiProperty({
    description: 'text',
    required: true,
    default: 'qrcode',
  })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({
    description: 'size',
    required: false,
    default: 200,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  size: number;
}
