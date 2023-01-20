import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseBodyDto } from 'src/dto';
import { DetailJobCategoryDto, ResponseDetailJobCategoryDto } from './dto';

@Injectable()
export class DetailJobCategoryService {
  prisma = new PrismaClient();

  async getDetailJobCategory(): Promise<ResponseDetailJobCategoryDto> {
    let data = await this.prisma.chiTietLoaiCongViec.findMany();
    return {
      content: data,
    };
  }

  async postDetailJobCategory(ten_chi_tiet: string): Promise<ResponseBodyDto> {
    let data = await this.prisma.chiTietLoaiCongViec.create({
      data: {
        ten_chi_tiet,
      },
    });
    return {
      check: true,
      message: 'Thêm mới thành công',
      content: {
        id: data.id,
        ten_chi_tiet: data.ten_chi_tiet,
      },
    };
  }

  async paginationSearchDetailJobCategory(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.chiTietLoaiCongViec.findMany({
      skip: pageIndex || 0,
      take: pageSize || 10,
      where: {
        ten_chi_tiet: {
          contains: keyword || '',
        },
      },
    });
    return {
      check: true,
      message: '',
      content: data,
    };
  }

  async getDetailJobCategoryById(id: number): Promise<ResponseBodyDto> {
    let data = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: { id },
    });
    if (data) {
      return {
        check: true,
        message: 'Lấy dữ liệu thành công',
        content: data,
      };
    } else {
      return {
        check: true,
        message: 'Không tìm thấy id',
        content: '',
      };
    }
  }

  async putDetailJobCategoryById(
    id: number,
    ten_chi_tiet: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.chiTietLoaiCongViec.update({
      where: { id },
      data: {
        ten_chi_tiet,
      },
    });
    return {
      check: true,
      message: 'Thay đổi thành công',
      content: data,
    };
  }

  async deleteDetailJobCategory(id: number): Promise<ResponseBodyDto> {
    let checkDetailJobCategoryById =
      await this.prisma.chiTietLoaiCongViec.findFirst({
        where: { id },
      });
    if (!checkDetailJobCategoryById) {
      return {
        check: false,
        message: 'Xóa thất bại',
        content: '',
      };
    } else {
      await this.prisma.chiTietLoaiCongViec.delete({
        where: { id },
      });
      return {
        check: true,
        message: 'Xóa thành công',
        content: '',
      };
    }
  }

  async uploadAvatarDetailJobCategory(
    id: number,
    filename: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.chiTietLoaiCongViec.findMany({
      where: { id },
    });
    if (data) {
      await this.prisma.chiTietLoaiCongViec.update({
        data: {
          hinh_anh: filename,
        },
        where: { id },
      });
      return {
        check: true,
        message: 'Thêm ảnh thành công',
        content: data,
      };
    } else {
      return {
        check: false,
        message: 'Thêm ảnh không thành công',
        content: '',
      };
    }
  }

  async putDetailJobCategoryByGroup(
    id: number,
    ten_chi_tiet: string,
    ma_loai_cong_viec: number,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.chiTietLoaiCongViec.update({
      where: { id },
      data: {
        id,
        ten_chi_tiet,
        ma_loai_cong_viec,
      },
    });
    return {
      check: true,
      message: 'Thay đổi thành công',
      content: data,
    };
  }
}
