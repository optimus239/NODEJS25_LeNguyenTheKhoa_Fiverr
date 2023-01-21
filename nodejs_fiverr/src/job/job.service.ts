import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { check } from 'prettier';
import { ResponseBodyDto } from 'src/dto';
import { ResponseAllJobDto } from './dto';

@Injectable()
export class JobService {
  prisma = new PrismaClient();

  async getJob(): Promise<ResponseAllJobDto> {
    let data = await this.prisma.congViec.findMany();
    return {
      content: data,
    };
  }

  async postJob(
    ten_cong_viec: string,
    danh_gia: number,
    gia_tien: number,
    hinh_anh: string,
    mo_ta: string,
    mo_ta_ngan: string,
    sao_cong_viec: number,
    ma_chi_tiet_loai: number,
    nguoi_tao: number,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.congViec.create({
      data: {
        ten_cong_viec,
        danh_gia,
        gia_tien,
        hinh_anh,
        mo_ta,
        mo_ta_ngan,
        sao_cong_viec,
        ma_chi_tiet_loai,
        nguoi_tao,
      },
    });
    return {
      check: true,
      message: 'Tạo mới thành công',
      content: {
        data,
      },
    };
  }

  async paginationSearchJob(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.congViec.findMany({
      skip: pageIndex || 0,
      take: pageSize || 10,
      where: {
        ten_cong_viec: {
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

  async getJobById(id: number): Promise<ResponseBodyDto> {
    let data = await this.prisma.congViec.findFirst({
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

  async putJobById(
    id: number,
    ten_cong_viec: string,
    danh_gia: number,
    gia_tien: number,
    hinh_anh: string,
    mo_ta: string,
    mo_ta_ngan: string,
    sao_cong_viec: number,
    ma_chi_tiet_loai: number,
    nguoi_tao: number,
  ): Promise<ResponseBodyDto> {
    let checkDetailJobId = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: { id: ma_chi_tiet_loai },
    });
    let checkUserId = await this.prisma.nguoiDung.findFirst({
      where: {
        id: nguoi_tao,
      },
    });
    if (checkDetailJobId && checkUserId) {
      let data = await this.prisma.congViec.update({
        where: { id },
        data: {
          ten_cong_viec,
          danh_gia,
          gia_tien,
          hinh_anh,
          mo_ta,
          mo_ta_ngan,
          sao_cong_viec,
          ma_chi_tiet_loai,
          nguoi_tao,
        },
      });
      return {
        check: true,
        message: 'Thay đổi thành công',
        content: data,
      };
    } else {
      return {
        check: false,
        message: 'Mã chi tiết loại hoặc người tạo không tồn tại',
        content: '',
      };
    }
  }

  async deleteJob(id: number): Promise<ResponseBodyDto> {
    let checkJobById = await this.prisma.congViec.findFirst({
      where: { id },
    });
    if (!checkJobById) {
      return {
        check: false,
        message: 'Xóa thất bại',
        content: '',
      };
    } else {
      await this.prisma.congViec.delete({
        where: { id },
      });
      return {
        check: true,
        message: 'Xóa thành công',
        content: '',
      };
    }
  }

  async uploadAvatarJob(
    id: number,
    filename: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.congViec.findFirst({
      where: { id },
    });
    if (data) {
      let uploadData = await this.prisma.congViec.update({
        data: {
          hinh_anh: filename,
        },
        where: { id },
      });
      return {
        check: true,
        message: 'Thêm ảnh thành công',
        content: {
          uploadData,
        },
      };
    } else {
      return {
        check: false,
        message: 'Thêm ảnh không thành công',
        content: '',
      };
    }
  }

  async getListJobType(): Promise<ResponseBodyDto> {
    let data = await this.prisma.loaiCongViec.findMany({
      include: {
        ChiTietLoaiCongViec: true,
      },
    });
    return {
      check: true,
      message: '',
      content: data,
    };
  }

  async getDetailJobTypeById(
    ma_loai_cong_viec: number,
  ): Promise<ResponseBodyDto> {
    let checkId = await this.prisma.loaiCongViec.findFirst({
      where: {
        id: ma_loai_cong_viec,
      },
    });

    if (checkId) {
      let data = await this.prisma.loaiCongViec.findUnique({
        where: { id: ma_loai_cong_viec },
        include: {
          ChiTietLoaiCongViec: true,
        },
      });
      return {
        check: true,
        message: '',
        content: data,
      };
    } else {
      return {
        check: false,
        message: 'Không tìm thấy mã loại công việc',
        content: '',
      };
    }
  }

  async getJobByJobTypeId(ma_chi_tiet_loai: number): Promise<ResponseBodyDto> {
    let checkId = await this.prisma.loaiCongViec.findFirst({
      where: {
        id: ma_chi_tiet_loai,
      },
    });
    if (checkId) {
      let listId = await this.prisma.congViec.findMany({
        where: {
          ma_chi_tiet_loai,
        },
        include: {
          ChiTietLoaiCongViec: {
            include: {
              LoaiCongViec: true,
            },
          },
          NguoiDung: {
            select: { name: true },
          },
        },
      });
      const listJobByIdJobType = listId.map((val) => ({
        id: val.id,
        congViec: {
          id: val.id,
          ten_cong_viec: val.ten_cong_viec,
          danh_gia: val.danh_gia,
          gia_tien: val.gia_tien,
          hinh_anh: val.hinh_anh,
          mo_ta: val.mo_ta,
          mo_ta_ngan: val.mo_ta_ngan,
          sao_cong_viec: val.sao_cong_viec,
          ma_chi_tiet_loai: val.ma_chi_tiet_loai,
          nguoi_tao: val.nguoi_tao,
        },
        ten_chi_tiet: val.ChiTietLoaiCongViec.ten_chi_tiet,
        ten_loai_cong_viec:
          val.ChiTietLoaiCongViec.LoaiCongViec.ten_loai_cong_viec,
        name: val.NguoiDung.name,
      }));
      return {
        check: true,
        message: '',
        content: listJobByIdJobType,
      };
    } else {
      return {
        check: false,
        message: 'Không tìm thấy mã chi tiết loại',
        content: '',
      };
    }
  }

  async getJobByJobId(ma_cong_viec: number): Promise<ResponseBodyDto> {
    let checkId = await this.prisma.congViec.findFirst({
      where: {
        id: ma_cong_viec,
      },
    });
    if (checkId) {
      let listId = await this.prisma.congViec.findMany({
        where: {
          id: ma_cong_viec,
        },
        include: {
          ChiTietLoaiCongViec: {
            include: {
              LoaiCongViec: true,
            },
          },
          NguoiDung: {
            select: { name: true },
          },
        },
      });
      const listJobByIdJobType = listId.map((val) => ({
        id: val.id,
        congViec: {
          id: val.id,
          ten_cong_viec: val.ten_cong_viec,
          danh_gia: val.danh_gia,
          gia_tien: val.gia_tien,
          hinh_anh: val.hinh_anh,
          mo_ta: val.mo_ta,
          mo_ta_ngan: val.mo_ta_ngan,
          sao_cong_viec: val.sao_cong_viec,
          ma_chi_tiet_loai: val.ma_chi_tiet_loai,
          nguoi_tao: val.nguoi_tao,
        },
        ten_chi_tiet: val.ChiTietLoaiCongViec.ten_chi_tiet,
        ten_loai_cong_viec:
          val.ChiTietLoaiCongViec.LoaiCongViec.ten_loai_cong_viec,
        name: val.NguoiDung.name,
      }));
      return {
        check: true,
        message: '',
        content: listJobByIdJobType,
      };
    } else {
      return {
        check: false,
        message: 'Không tìm thấy mã công việc',
        content: '',
      };
    }
  }

  async getListJobByName(ten_cong_viec: string): Promise<ResponseBodyDto> {
    let listId = await this.prisma.congViec.findMany({
      where: {
        ten_cong_viec: {
          contains: ten_cong_viec,
        },
      },
      include: {
        ChiTietLoaiCongViec: {
          include: {
            LoaiCongViec: true,
          },
        },
        NguoiDung: {
          select: { name: true },
        },
      },
    });
    const listJobByName = listId.map((val) => ({
      id: val.id,
      congViec: {
        id: val.id,
        ten_cong_viec: val.ten_cong_viec,
        danh_gia: val.danh_gia,
        gia_tien: val.gia_tien,
        hinh_anh: val.hinh_anh,
        mo_ta: val.mo_ta,
        mo_ta_ngan: val.mo_ta_ngan,
        sao_cong_viec: val.sao_cong_viec,
        ma_chi_tiet_loai: val.ma_chi_tiet_loai,
        nguoi_tao: val.nguoi_tao,
      },
      ten_chi_tiet: val.ChiTietLoaiCongViec.ten_chi_tiet,
      ten_loai_cong_viec:
        val.ChiTietLoaiCongViec.LoaiCongViec.ten_loai_cong_viec,
      name: val.NguoiDung.name,
    }));
    return {
      check: true,
      message: '',
      content: listJobByName,
    };
  }
}
