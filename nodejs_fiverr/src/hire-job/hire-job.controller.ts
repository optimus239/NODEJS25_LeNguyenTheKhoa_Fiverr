import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseBodyDto } from 'src/dto';
import { HireJobDto, ResponseHireJobDto } from './dto';
import { HireJobService } from './hire-job.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('tokenkhoa'))
@ApiTags('ThueCongViec')
@Controller('api/thue-cong-viec')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @Get()
  async getHireJob(): Promise<ResponseHireJobDto> {
    return this.hireJobService.getHireJob();
  }

  @ApiBody({ type: HireJobDto })
  @Post()
  async postHireJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const { ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh } = req.body;
    const checkPostHireJob = await this.hireJobService.postHireJob(
      ma_cong_viec,
      ma_nguoi_thue,
      ngay_thue,
      hoan_thanh,
    );
    throw new HttpException(
      {
        message: checkPostHireJob.message,
        content: checkPostHireJob.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getHireJobById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkGetHireJobById = await this.hireJobService.getHireJobById(id);
    if (checkGetHireJobById.check) {
      throw new HttpException(
        {
          message: checkGetHireJobById.message,
          content: checkGetHireJobById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkGetHireJobById.message,
          content: checkGetHireJobById.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: HireJobDto })
  @Put(':id')
  async putHireJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    const { ma_cong_viec, ma_nguoi_thue, ngay_thue, hoan_thanh } = req.body;
    let checkPutHireJob = await this.hireJobService.putHireJob(
      id,
      ma_cong_viec,
      ma_nguoi_thue,
      ngay_thue,
      hoan_thanh,
    );
    throw new HttpException(
      {
        message: checkPutHireJob.message,
        content: checkPutHireJob.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteHireJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkDeleteDetailJobCategory = await this.hireJobService.deleteHireJob(
      id,
    );
    if (checkDeleteDetailJobCategory.check) {
      throw new HttpException(
        {
          message: checkDeleteDetailJobCategory.message,
          content: checkDeleteDetailJobCategory.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkDeleteDetailJobCategory.message,
          content: checkDeleteDetailJobCategory.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiConsumes()
  @Get('lay-danh-sach-cong-viec/da-thue')
  async getListHired(): Promise<ResponseBodyDto> {
    let checkGetListHired = await this.hireJobService.getHired();
    throw new HttpException(
      {
        message: checkGetListHired.message,
        content: checkGetListHired.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Post('hoan-thanh-cong-viec/:id')
  async postDoneJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkPostDoneJob = await this.hireJobService.postDoneJob(id);
    throw new HttpException(
      {
        message: checkPostDoneJob.message,
        content: checkPostDoneJob.content,
      },
      HttpStatus.OK,
    );
  }
}
