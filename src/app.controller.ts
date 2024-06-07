import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

import { AppService } from './app.service';

@ApiTags('/')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('healthz')
  selfCheck(): unknown {
    return 'ok';
  }

  @Get('/header')
  async profile(@Req() req: FastifyRequest) {
    return req.headers;
  }
}
