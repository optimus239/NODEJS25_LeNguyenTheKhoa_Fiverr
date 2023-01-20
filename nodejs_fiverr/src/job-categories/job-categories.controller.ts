import {
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JobCategoriesService } from './job-categories.service';
import { Get, Post, Req, Delete, Put } from '@nestjs/common';
import { ResponseBodyDto } from 'src/dto';
import { JobCategoriesDto, ResponseAllJobCategoriesDto } from './dto';
import { Request } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard('tokenkhoa'))
@ApiTags('LoaiCongViec')
@Controller('api/loai-cong-viec')
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Get()
  async getJobCategories(): Promise<ResponseAllJobCategoriesDto> {
    return this.jobCategoriesService.getJobCategories();
  }

  @ApiBody({ type: JobCategoriesDto })
  @Post()
  async postJobCategory(@Req() req: Request): Promise<ResponseBodyDto> {
    const { ten_loai_cong_viec } = req.body;
    let checkPostJobCategory = await this.jobCategoriesService.postJobCategory(
      ten_loai_cong_viec,
    );
    throw new HttpException(
      {
        message: checkPostJobCategory.message,
        content: checkPostJobCategory.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  @Get('phan-trang-tim-kiem')
  async paginationAndSearchJobCategories(
    @Req() req: Request,
  ): Promise<ResponseBodyDto> {
    const pageIndex = Number(req.query.pageIndex);
    const pageSize = Number(req.query.pageSize);
    const keyword = req.query.keyword.toString();
    let checkPaginationAndSearchJobCategories =
      await this.jobCategoriesService.paginationSearchJobCategories(
        pageIndex,
        pageSize,
        keyword,
      );
    throw new HttpException(
      {
        message: checkPaginationAndSearchJobCategories.message,
        content: checkPaginationAndSearchJobCategories.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getJobCategoriesById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkJobCategoriesById =
      await this.jobCategoriesService.getJobCategoriesById(id);
    if (checkJobCategoriesById.check) {
      throw new HttpException(
        {
          message: checkJobCategoriesById.message,
          content: checkJobCategoriesById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJobCategoriesById.message,
          content: checkJobCategoriesById.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: JobCategoriesDto })
  @Put(':id')
  async putJobCategoriesById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    const { ten_loai_cong_viec } = req.body;
    let checkputJobCategoriesById =
      await this.jobCategoriesService.putJobCategoriesById(
        id,
        ten_loai_cong_viec,
      );
    throw new HttpException(
      {
        message: checkputJobCategoriesById.message,
        content: checkputJobCategoriesById.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteJobCategories(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkDeleteJobCategories =
      await this.jobCategoriesService.deleteJobCategories(id);
    if (checkDeleteJobCategories.check) {
      throw new HttpException(
        {
          message: checkDeleteJobCategories.message,
          content: checkDeleteJobCategories.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkDeleteJobCategories.message,
          content: checkDeleteJobCategories.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
