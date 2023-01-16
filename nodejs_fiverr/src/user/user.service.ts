import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CheckSignupDto } from 'src/auth/dto';
import { NguoiDungDto, ResponseBodyDto } from 'src/dto';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async getUser(): Promise<NguoiDungDto[]> {
    let data = await this.prisma.nguoiDung.findMany();
    return data;
  }

  async postUser(
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
  ): Promise<CheckSignupDto> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: { email },
    });
    if (checkEmail) {
      return {
        check: false,
        message: 'Yêu cầu không hợp lệ !',
        content: 'Email bị trùng',
      };
    } else {
      await this.prisma.nguoiDung.create({
        data: {
          name,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role: 'USER',
          skill,
          certification,
        },
      });
      console.log('checkEmail');
      return {
        check: true,
        message: 'Đăng ký thành công !',
        content: {
          name,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role: 'USER',
          skill,
          certification,
        },
      };
    }
  }

  async deleteUser(id: number): Promise<ResponseBodyDto> {
    let checkUserId = await this.prisma.nguoiDung.findFirst({
      where: { id },
    });
    if (!checkUserId) {
      return {
        check: false,
        message: 'Xóa thất bại',
        content: '',
      };
    } else {
      await this.prisma.nguoiDung.delete({
        where: { id },
      });
      return {
        check: true,
        message: 'Xóa thành công',
        content: '',
      };
    }
  }

  async getPageAndSearchUser(
    pageIndex: number,
    pageSize: number,
    keyword: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.nguoiDung.findMany({
      skip: pageIndex || 0,
      take: pageSize || 10,
      where: {
        name: {
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

  async getUserById(id: number): Promise<ResponseBodyDto> {
    let data = await this.prisma.nguoiDung.findFirst({
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
        check: false,
        message: 'Không tìm thấy id',
        content: '',
      };
    }
  }

  async putUserById(
    id: number,
    name: string,
    email: string,
    pass_word: string,
    phone: string,
    birth_day: string,
    gender: string,
    role: string,
    skill: string,
    certification: string,
  ): Promise<ResponseBodyDto> {
    let data = await this.prisma.nguoiDung.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        pass_word,
        phone,
        birth_day,
        gender,
        role,
        skill,
        certification,
      },
    });
    return {
      check: true,
      message: 'Thay đổi thành công',
      content: data,
    };
  }

  async searchUserByName(name: string): Promise<ResponseBodyDto> {
    let data = await this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
    return {
      check: true,
      message: '',
      content: data,
    };
  }
}
