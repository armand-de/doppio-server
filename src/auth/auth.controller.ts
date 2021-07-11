import {
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinUserDto } from './dto/join-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { IStatusResponse } from '../types/response';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ILoginResponse } from './interface/login-response.interface';
import { SUCCESS_RESPONSE } from '../utils/success-response';
import { PhoneDto } from '../user/dto/phone.dto';
import { ChangePasswordVerifyDto } from "./dto/change-password-verify.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async authorization(): Promise<IStatusResponse> {
    return SUCCESS_RESPONSE;
  }

  @Post('/join')
  async joinUser(@Body() joinUserDto: JoinUserDto): Promise<IStatusResponse> {
    return await this.authService.joinUser(joinUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Req() req: any): Promise<ILoginResponse> {
    try {
      const { id, phone } = req.user;
      const accessToken = await this.authService.getJwtAccessToken({
        id,
        phone,
      });
      return { accessToken };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/verify')
  async verifyUser(
    @Body() verifyUserDto: VerifyUserDto,
  ): Promise<IStatusResponse> {
    return await this.authService.verifyUser(verifyUserDto);
  }

  @Post('/password')
  async changePasswordRequest(
    @Body() { phone }: PhoneDto,
  ): Promise<IStatusResponse> {
    return await this.authService.changePasswordRequest(phone);
  }

  @Put('/password')
  async changePasswordVerify(
    @Body() changePasswordVerifyDto: ChangePasswordVerifyDto,
  ): Promise<IStatusResponse> {
    return await this.authService.changePasswordVerify(changePasswordVerifyDto);
  }
}
