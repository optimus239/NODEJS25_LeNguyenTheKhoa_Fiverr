import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { NguoiDungDto } from './dto';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private config: ConfigService,
  ) {}
}
