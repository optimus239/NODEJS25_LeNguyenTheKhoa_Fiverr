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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { FileUploadDto, ResponseBodyDto, UploadDataDto } from 'src/dto';
import { DetailJobCategoryService } from './detail-job-category.service';
import {
  DetailJobCategoryDto,
  PostDetailJobCategoryDto,
  ResponseDetailJobCategoryDto,
} from './dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('tokenkhoa'))
@ApiTags('ChiTietLoaiCongViec')
@Controller('api/chi-tiet-loai-cong-viec')
export class DetailJobCategoryController {
  constructor(
    private readonly detailJobCategoryService: DetailJobCategoryService,
  ) {}

  @Get()
  async getDetailJobCategory(
    @Req() req: Request,
  ): Promise<ResponseDetailJobCategoryDto> {
    return this.detailJobCategoryService.getDetailJobCategory();
  }

  @ApiBody({ type: PostDetailJobCategoryDto })
  @Post()
  async postDetailJobCategory(@Req() req: Request): Promise<ResponseBodyDto> {
    const { ten_chi_tiet } = req.body;
    const checkPostDetailJobCategory =
      await this.detailJobCategoryService.postDetailJobCategory(ten_chi_tiet);
    throw new HttpException(
      {
        message: checkPostDetailJobCategory.message,
        content: checkPostDetailJobCategory.content,
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
    let checkPaginationSearchDetailJobCategory =
      await this.detailJobCategoryService.paginationSearchDetailJobCategory(
        pageIndex,
        pageSize,
        keyword,
      );
    throw new HttpException(
      {
        message: checkPaginationSearchDetailJobCategory.message,
        content: checkPaginationSearchDetailJobCategory.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getDetailJobCategoryById(
    @Req() req: Request,
  ): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkJobCategoriesById =
      await this.detailJobCategoryService.getDetailJobCategoryById(id);
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
  @ApiBody({ type: PostDetailJobCategoryDto })
  @Put(':id')
  async putDetailJobCategoryById(
    @Req() req: Request,
  ): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    const { ten_chi_tiet } = req.body;
    let checkPutDetailJobCategoryById =
      await this.detailJobCategoryService.putDetailJobCategoryById(
        id,
        ten_chi_tiet,
      );
    throw new HttpException(
      {
        message: checkPutDetailJobCategoryById.message,
        content: checkPutDetailJobCategoryById.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteDetailJobCategory(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkDeleteDetailJobCategory =
      await this.detailJobCategoryService.deleteDetailJobCategory(id);
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

  @ApiBody({ type: PostDetailJobCategoryDto })
  @Post()
  async postGroupDetailJobCategory(
    @Req() req: Request,
  ): Promise<ResponseBodyDto> {
    const { ten_chi_tiet } = req.body;
    const checkPostDetailJobCategory =
      await this.detailJobCategoryService.postDetailJobCategory(ten_chi_tiet);
    throw new HttpException(
      {
        message: checkPostDetailJobCategory.message,
        content: checkPostDetailJobCategory.content,
      },
      HttpStatus.OK,
    );
  }

  //upload file
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
  @Post('upload-hinh-nhom-loai-cong-viec/:id')
  @ApiParam({ name: 'id', type: Number })
  async upload(
    @Req() req: Request,
    @UploadedFile() file: UploadDataDto,
  ): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkUploadAvatar =
      await this.detailJobCategoryService.uploadAvatarDetailJobCategory(
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

  @ApiParam({ name: 'id' })
  @ApiBody({ type: DetailJobCategoryDto })
  @Put('sua-nhom-chi-tiet-loai/:id')
  async putDetailJobCategoryByGroup(
    @Req() req: Request,
  ): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    const { ten_chi_tiet, ma_loai_cong_viec } = req.body;
    const checkPut =
      await this.detailJobCategoryService.putDetailJobCategoryByGroup(
        id,
        ten_chi_tiet,
        ma_loai_cong_viec,
      );
    throw new HttpException(
      {
        message: checkPut.message,
        content: checkPut.content,
      },
      HttpStatus.OK,
    );
  }
}
