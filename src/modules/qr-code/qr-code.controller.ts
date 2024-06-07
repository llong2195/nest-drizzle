import { Controller, Get, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { generateQR } from '@/utils/util';
import { QRCodeDto } from './dto/create-qr-code.dto';

@ApiTags('v1/qr-code')
@Controller('v1/qr-code')
export class QrCodeController {
  @Get()
  async getQRCode(
    @Query() param: QRCodeDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const qr = await generateQR(param.text, param.size);
    reply.header('Content-Type', 'image/png');
    return new StreamableFile(qr);
  }
}
