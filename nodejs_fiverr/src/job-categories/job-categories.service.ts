import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseBodyDto } from 'src/dto';
import { JobCategoriesDto, ResponseAllJobCategoriesDto } from './dto';

@Injectable()
export class JobCategoriesService {
  prisma = new PrismaClient();

  async getJobCategories(): Promise<ResponseAllJobCategoriesDto> {
    let data = await this.prisma.loaiCongViec.findMany();
    return {
      content: data,
    };
  }

  async postJobCategory(ten_loai_cong_viec: string): Promise<ResponseBodyDto> {
    let data = await this.prisma.loaiCongViec.create({
      data: {
        ten_loai_cong_viec,
      },
    });

    return {
      check: true,
      message: 'Thêm mới thành công',
      content: {
        id: data.id,
        ten_loai_cong_viec: ten_loai_cong_viec,
      },
    };
  }

  async paginationSearchJobCategories(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.loaiCongViec.findMany({
      skip: pageIndex || 0,
      take: pageSize || 10,
      where: {
        ten_loai_cong_viec: {
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

  async getJobCategoriesById(id: number): Promise<ResponseBodyDto> {
    let data = await this.prisma.loaiCongViec.findFirst({
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

  async putJobCategoriesById(
    id: number,
    ten_loai_cong_viec: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.loaiCongViec.update({
      where: { id },
      data: {
        ten_loai_cong_viec,
      },
    });
    return {
      check: true,
      message: 'Thay đổi thành công',
      content: data,
    };
  }

  async deleteJobCategories(id: number): Promise<ResponseBodyDto> {
    let checkJobCategoryById = await this.prisma.loaiCongViec.findFirst({
      where: { id },
    });
    if (!checkJobCategoryById) {
      return {
        check: false,
        message: 'Xóa thất bại',
        content: '',
      };
    } else {
      await this.prisma.loaiCongViec.delete({
        where: { id },
      });
      return {
        check: true,
        message: 'Xóa thành công',
        content: '',
      };
    }
  }
}
