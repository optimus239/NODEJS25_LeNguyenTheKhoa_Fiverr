import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { FileUploadDto, ResponseBodyDto, UploadDataDto } from 'src/dto';
import { JobDto, ResponseAllJobDto } from './dto';
import { JobService } from './job.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('tokenkhoa'))
@ApiTags('CongViec')
@Controller('api/cong-viec')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async GetJob(): Promise<ResponseAllJobDto> {
    return this.jobService.getJob();
  }

  @ApiBody({ type: JobDto })
  @Post()
  async postJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      ma_chi_tiet_loai,
      nguoi_tao,
    } = req.body;
    console.log('req.body: ', req.body);
    let checkPostJob = await this.jobService.postJob(
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      ma_chi_tiet_loai,
      nguoi_tao,
    );
    throw new HttpException(
      {
        message: checkPostJob.message,
        content: checkPostJob.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  @Get('phan-trang-tim-kiem')
  async paginationSearchJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const pageIndex = Number(req.query.pageIndex);
    const pageSize = Number(req.query.pageSize);
    const keyword = req.query.keyword.toString();
    let checkPaginationSearchJob = await this.jobService.paginationSearchJob(
      pageIndex,
      pageSize,
      keyword,
    );
    throw new HttpException(
      {
        message: checkPaginationSearchJob.message,
        content: checkPaginationSearchJob.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getJobById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkJobById = await this.jobService.getJobById(id);
    if (checkJobById.check) {
      throw new HttpException(
        {
          message: checkJobById.message,
          content: checkJobById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkJobById.message,
          content: checkJobById.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: JobDto })
  @Put(':id')
  async putJobById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    const {
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      ma_chi_tiet_loai,
      nguoi_tao,
    } = req.body;
    let checkPutJobById = await this.jobService.putJobById(
      id,
      ten_cong_viec,
      danh_gia,
      gia_tien,
      hinh_anh,
      mo_ta,
      mo_ta_ngan,
      sao_cong_viec,
      ma_chi_tiet_loai,
      nguoi_tao,
    );
    if (checkPutJobById.check) {
      throw new HttpException(
        {
          message: checkPutJobById.message,
          content: checkPutJobById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkPutJobById.message,
          content: checkPutJobById.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteJob(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkDeleteJob = await this.jobService.deleteJob(id);
    if (checkDeleteJob.check) {
      throw new HttpException(
        {
          message: checkDeleteJob.message,
          content: checkDeleteJob.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkDeleteJob.message,
          content: checkDeleteJob.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file',
    type: FileUploadDto,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/img',
        filename(req, file, callback) {
          let date = new Date();
          callback(null, `${date.getTime()}-${file.originalname}`);
        },
      }),
    }),
  )
  @Post('upload-hinh-cong-viec/:id')
  @ApiParam({ name: 'id', type: Number })
  async upload(
    @Req() req: Request,
    @UploadedFile() file: UploadDataDto,
  ): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkUploadAvatar = await this.jobService.uploadAvatarJob(
      id,
      file.filename,
    );
    if (checkUploadAvatar) {
      throw new HttpException(
        {
          message: checkUploadAvatar.message,
          content: checkUploadAvatar.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkUploadAvatar.message,
          content: checkUploadAvatar.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiConsumes()
  @Get('/menu/lay-menu-loai-cong-viec')
  async getListJobType(): Promise<ResponseBodyDto> {
    let checkGetListJobType = await this.jobService.getListJobType();
    throw new HttpException(
      {
        message: checkGetListJobType.message,
        content: checkGetListJobType.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'ma_loai_cong_viec', type: Number })
  @Get('lay-chi-tiet-loai-cong-viec/:ma_loai_cong_viec')
  async getMenuJobCategory(@Req() req: Request): Promise<ResponseBodyDto> {
    const ma_loai_cong_viec = Number(req.params.ma_loai_cong_viec);
    let checkGetDetailJobTypeById = await this.jobService.getDetailJobTypeById(
      ma_loai_cong_viec,
    );
    if (checkGetDetailJobTypeById.check) {
      throw new HttpException(
        {
          message: checkGetDetailJobTypeById.message,
          content: checkGetDetailJobTypeById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkGetDetailJobTypeById.message,
          content: checkGetDetailJobTypeById.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'ma_chi_tiet_loai', type: Number })
  @Get('lay-cong-viec-theo-chi-tiet-loai/:ma_chi_tiet_loai')
  async getJobByJobTypeId(@Req() req: Request): Promise<ResponseBodyDto> {
    let ma_chi_tiet_loai = Number(req.params.ma_chi_tiet_loai);
    let checkGetJobByIdDetailJobType = await this.jobService.getJobByJobTypeId(
      ma_chi_tiet_loai,
    );
    if (checkGetJobByIdDetailJobType.check) {
      throw new HttpException(
        {
          message: checkGetJobByIdDetailJobType.message,
          content: checkGetJobByIdDetailJobType.content,
          datetime: new Date(),
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkGetJobByIdDetailJobType.message,
          content: checkGetJobByIdDetailJobType.content,
          datetime: new Date(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'ma_cong_viec', type: Number })
  @Get('lay-cong-viec-chi-tiet/:ma_cong_viec')
  async getJobByJobId(@Req() req: Request): Promise<ResponseBodyDto> {
    let ma_cong_viec = Number(req.params.ma_cong_viec);
    let checkGetJobByJobId = await this.jobService.getJobByJobId(ma_cong_viec);
    if (checkGetJobByJobId.check) {
      throw new HttpException(
        {
          message: checkGetJobByJobId.message,
          content: checkGetJobByJobId.content,
          datetime: new Date(),
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkGetJobByJobId.message,
          content: checkGetJobByJobId.content,
          datetime: new Date(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'ten_cong_viec', type: String })
  @Get('lay-danh-sach-cong-viec-theo-ten/:ten_cong_viec')
  async getJobByName(@Req() req: Request): Promise<ResponseBodyDto> {
    let ten_cong_viec = req.params.ten_cong_viec;
    let checkGetJobByName = await this.jobService.getListJobByName(
      ten_cong_viec,
    );
    throw new HttpException(
      {
        message: checkGetJobByName.message,
        content: checkGetJobByName.content,
        datetime: new Date(),
      },
      HttpStatus.OK,
    );
  }
}
