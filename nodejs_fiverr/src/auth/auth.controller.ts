import {
  Controller,
  Post,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger/dist';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { ContentAuthDto, NguoiDungLoginDto, NguoiDungSignupDto } from './dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //dangnhap
  @ApiBody({ type: NguoiDungLoginDto })
  @Post('/dangnhap')
  async login(@Req() req: Request): Promise<ContentAuthDto> {
    const { email, pass_word } = req.body;
    let checkLogin = await this.authService.login(email, pass_word);
    if (checkLogin.check) {
      throw new HttpException(
        { message: checkLogin.message, content: checkLogin.content },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        { message: checkLogin.message, content: checkLogin.content },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  //dangky
  @ApiBody({ type: NguoiDungSignupDto })
  @Post('/dangky')
  async signup(@Req() req: Request): Promise<ContentAuthDto> {
    const {
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification,
    } = req.body;

    let checkSignup = await this.authService.signup(
      name,
      email,
      pass_word,
      phone,
      birth_day,
      gender.toString(),
      role,
      skill.toString(),
      certification.toString(),
    );
    if (checkSignup.check) {
      console.log('checkSignup: ', checkSignup.content);
      // checkSignup.content.gender =;
      throw new HttpException(
        { message: checkSignup.message, content: checkSignup.content },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkSignup.message,
          content: checkSignup.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
