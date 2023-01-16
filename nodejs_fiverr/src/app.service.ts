import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { NguoiDungDto } from './dto';

@Injectable()
export class AppService {
  prisma = new PrismaClient();
  getHello(): string {
    return 'Hello World!';
  }
}
