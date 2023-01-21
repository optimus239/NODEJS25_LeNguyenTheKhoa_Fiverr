import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseBodyDto } from 'src/dto';
import { ResponseCommentDto } from './dto';

@Injectable()
export class CommentService {
  prisma = new PrismaClient();

  async getComment(): Promise<ResponseCommentDto> {
    let data = await this.prisma.binhLuan.findMany();
    return {
      content: data,
    };
  }

  async postComment(
    ma_cong_viec: number,
    ma_nguoi_binh_luan: number,
    ngay_binh_luan: Date,
    noi_dung: string,
    sao_binh_luan: number,
  ): Promise<ResponseBodyDto> {
    let checkJobId = await this.prisma.congViec.findFirst({
      where: {
        id: ma_cong_viec,
      },
    });
    let checkUserId = await this.prisma.nguoiDung.findFirst({
      where: {
        id: ma_nguoi_binh_luan,
      },
    });
    if (checkJobId && checkUserId) {
      let data = await this.prisma.binhLuan.create({
        data: {
          ma_cong_viec,
          ma_nguoi_binh_luan,
          ngay_binh_luan,
          noi_dung,
          sao_binh_luan,
        },
      });
      return {
        check: true,
        message: 'Thêm mới thành công',
        content: data,
      };
    } else {
      return {
        check: false,
        message: 'Không tìm thấy mã công việc hoặc mã người bình luận',
        content: '',
      };
    }
  }

  async putComment(
    id: number,
    ma_cong_viec: number,
    ma_nguoi_binh_luan: number,
    ngay_binh_luan: Date,
    noi_dung: string,
    sao_binh_luan: number,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.binhLuan.update({
      where: { id },
      data: {
        ma_cong_viec,
        ma_nguoi_binh_luan,
        ngay_binh_luan,
        noi_dung,
        sao_binh_luan,
      },
    });
    return {
      check: true,
      message: 'Thay đổi thành công',
      content: data,
    };
  }

  async deleteComment(id: number): Promise<ResponseBodyDto> {
    let checkId = await this.prisma.binhLuan.findFirst({
      where: { id },
    });
    if (!checkId) {
      return {
        check: false,
        message: 'Xóa thất bại',
        content: '',
      };
    } else {
      await this.prisma.binhLuan.delete({
        where: { id },
      });
      return {
        check: true,
        message: 'Xóa thành công',
        content: '',
      };
    }
  }

  async getCommentByJobId(id: number) {
    let checkId = await this.prisma.binhLuan.findMany({
      where: { ma_cong_viec: id },
      include: {
        NguoiDung: true,
      },
    });
    const listComment = checkId.map((val) => ({
      ngay_binh_luan: val.ngay_binh_luan,
      noi_dung: val.noi_dung,
      sao_binh_luan: val.sao_binh_luan,
      ten_nguoi_binh_luan: val.NguoiDung.name,
    }));
    return {
      check: true,
      message: '',
      content: listComment,
    };
  }
}
