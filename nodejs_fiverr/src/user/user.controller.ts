import {
  Controller,
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Get, Post, Req, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ContentAuthDto, NguoiDungSignupDto } from 'src/auth/dto';
import { NguoiDungDto, ResponseBodyDto } from 'src/dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UploadedFile } from '@nestjs/common/decorators';

@ApiBearerAuth()
@UseGuards(AuthGuard('tokenkhoa'))
@ApiTags('NguoiDung')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //get users
  @Get()
  async getUser(): Promise<NguoiDungDto[]> {
    return this.userService.getUser();
  }

  @ApiBody({ type: NguoiDungSignupDto })
  @Post()
  async postUser(@Req() req: Request): Promise<ContentAuthDto> {
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

    let checkPostUser = await this.userService.postUser(
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
    if (checkPostUser.check) {
      throw new HttpException(
        { message: checkPostUser.message, content: checkPostUser.content },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkPostUser.message,
          content: checkPostUser.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiQuery({ name: 'id', type: Number })
  @Delete('')
  async deleteUser(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.query.id);
    let checkDeleteUser = await this.userService.deleteUser(id);
    if (checkDeleteUser.check) {
      throw new HttpException(
        { message: checkDeleteUser.message, content: checkDeleteUser.content },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkDeleteUser.message,
          content: checkDeleteUser.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  @Get('phan-trang-tim-kiem')
  async getPageAndSearchUser(@Req() req: Request): Promise<ResponseBodyDto> {
    const pageIndex = Number(req.query.pageIndex);
    const pageSize = Number(req.query.pageSize);
    const keyword = req.query.keyword.toString();
    let checkGetPageAndSearchUser = await this.userService.getPageAndSearchUser(
      pageIndex,
      pageSize,
      keyword,
    );
    throw new HttpException(
      {
        message: checkGetPageAndSearchUser.message,
        content: checkGetPageAndSearchUser.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'id', type: Number })
  @Get(':id')
  async getUserById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);
    let checkGetUserById = await this.userService.getUserById(id);
    if (checkGetUserById.check) {
      throw new HttpException(
        {
          message: checkGetUserById.message,
          content: checkGetUserById.content,
        },
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        {
          message: checkGetUserById.message,
          content: checkGetUserById.content,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: NguoiDungDto })
  @Put(':id')
  async putUserById(@Req() req: Request): Promise<ResponseBodyDto> {
    const id = Number(req.params.id);

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
    let checkPutUserById = await this.userService.putUserById(
      id,
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
    throw new HttpException(
      {
        message: checkPutUserById.message,
        content: checkPutUserById.content,
      },
      HttpStatus.OK,
    );
  }

  @ApiParam({ name: 'TenNguoiDung', type: String })
  @Get('search/:TenNguoiDung')
  async searchUserByName(@Req() req: Request): Promise<ResponseBodyDto> {
    const name = req.params.TenNguoiDung;
    let checkSearchUserByName = await this.userService.searchUserByName(name);
    throw new HttpException(
      {
        message: checkSearchUserByName.message,
        content: checkSearchUserByName.content,
      },
      HttpStatus.OK,
    );
  }
}
