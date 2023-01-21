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
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseBodyDto } from 'src/dto';
import { CommentService } from './comment.service';
import { CommentDto, ResponseCommentDto } from './dto/comment.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('tokenkhoa'))
@ApiTags('BinhLuan')
@Controller('api/binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getComment(): Promise<ResponseCommentDto> {
    return this.commentService.getComment();
  }

  @ApiBody({ type: CommentDto })
  @Post()
  async postComment(@Req() req: Request): Promise<ResponseBodyDto> {
    const {
      ma_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    } = req.body;
    const checkPostComment = await this.commentService.postComment(
      ma_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    );
    if (checkPostComment.check) {
      throw new HttpException(
        {
          message: checkPostComment.message,
          content: checkPostComment.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkPostComment.message,
          content: checkPostComment.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CommentDto })
  @Put(':id')
  async putComment(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    const {
      ma_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    } = req.body;
    let checkPutComment = await this.commentService.putComment(
      id,
      ma_cong_viec,
      ma_nguoi_binh_luan,
      ngay_binh_luan,
      noi_dung,
      sao_binh_luan,
    );
    throw new HttpException(
      {
        message: checkPutComment.message,
        content: checkPutComment.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Delete(':id')
  async deleteComment(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkDeleteComment = await this.commentService.deleteComment(id);
    if (checkDeleteComment.check) {
      throw new HttpException(
        {
          message: checkDeleteComment.message,
          content: checkDeleteComment.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkDeleteComment.message,
          content: checkDeleteComment.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'ma_cong_viec', type: Number })
  @Get('lay-binh-luan-theo-cong-viec/:ma_cong_viec')
  async getCommentByJobId(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.ma_cong_viec);
    let checkGetCommentByJobId = await this.commentService.getCommentByJobId(
      id,
    );
    throw new HttpException(
      {
        message: checkGetCommentByJobId.message,
        content: checkGetCommentByJobId.content,
      },
      HttpStatus.OK,
    );
  }
}
