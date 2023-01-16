import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaClient } from '@prisma/client';
import { CheckLoginDto, CheckSignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}
  private prisma: PrismaClient = new PrismaClient();
  async login(email: string, pass_word: string): Promise<CheckLoginDto> {
    let checkEmail = await this.prisma.nguoiDung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      if (checkEmail.pass_word === pass_word) {
        let token = this.jwt.sign(
          {},
          { expiresIn: '1y', secret: this.config.get('SECRET_KEY') },
        );
        return {
          check: true,
          message: 'Đăng nhập thành công',
          content: {
            user: checkEmail,
            token,
          },
        };
      } else {
        return {
          check: false,
          message: 'Yêu cầu không hợp lệ',
          content: 'Email hoặc mật khẩu không đúng',
        };
      }
    } else {
      return {
        check: false,
        message: 'Yêu cầu không hợp lệ',
        content: 'Email hoặc mật khẩu không đúng',
      };
    }
  }

  async signup(
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
}
