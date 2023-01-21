import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseBodyDto } from 'src/dto';
import { ResponseHireJobDto } from './dto';

@Injectable()
export class HireJobService {
  prisma = new PrismaClient();

  async getHireJob(): Promise<ResponseHireJobDto> {
    let data = await this.prisma.thueCongViec.findMany();
    return { content: data };
  }

  async postHireJob(
    ma_cong_viec: number,
    ma_nguoi_thue: number,
    ngay_thue: Date,
    hoan_thanh: boolean,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.thueCongViec.create({
      data: {
        ma_cong_viec,
        ma_nguoi_thue,
        ngay_thue,
        hoan_thanh,
      },
    });
    return {
      check: true,
      message: 'Thêm mới thành công',
      content: data,
    };
  }

  async getHireJobById(id: number) {
    let checkId = await this.prisma.thueCongViec.findFirst({
      where: { id },
    });
    if (checkId) {
      return {
        check: true,
        message: 'Lấy dữ liệu thành công',
        content: checkId,
      };
    } else {
      return {
        check: true,
        message: 'Không tìm thấy id',
        content: '',
      };
    }
  }

  async putHireJob(
    id: number,
    ma_cong_viec: number,
    ma_nguoi_thue: number,
    ngay_thue: Date,
    hoan_thanh: boolean,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.thueCongViec.update({
      where: { id },
      data: {
        ma_cong_viec,
        ma_nguoi_thue,
        ngay_thue,
        hoan_thanh,
      },
    });
    return {
      check: true,
      message: 'Thay đổi thành công',
      content: data,
    };
  }

  async deleteHireJob(id: number): Promise<ResponseBodyDto> {
    let checkId = await this.prisma.thueCongViec.findFirst({
      where: { id },
    });
    if (!checkId) {
      return {
        check: false,
        message: 'Xóa thất bại',
        content: '',
      };
    } else {
      await this.prisma.thueCongViec.delete({
        where: { id },
      });
      return {
        check: true,
        message: 'Xóa thành công',
        content: '',
      };
    }
  }

  async getHired(): Promise<ResponseBodyDto> {
    let data = await this.prisma.thueCongViec.findMany({
      include: {
        CongViec: true,
      },
    });
    return {
      check: true,
      message: '',
      content: data,
    };
  }

  async postDoneJob(id: number): Promise<ResponseBodyDto> {
    let data = await this.prisma.thueCongViec.findFirst({
      where: { id },
    });
    if (data.hoan_thanh) {
      return {
        check: false,
        message: '',
        content: data,
      };
    } else {
      await this.prisma.thueCongViec.update({
        where: {
          id,
        },
        data: {
          hoan_thanh: true,
        },
      });
      return {
        check: true,
        message: '',
        content: {
          id: data.id,
          ma_cong_viec: data.ma_cong_viec,
          ma_nguoi_thue: data.ma_nguoi_thue,
          ngay_thue: data.ngay_thue,
          hoan_thanh: true,
        },
      };
    }
  }
}
