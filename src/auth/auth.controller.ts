import {
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinUserDto } from './dto/join-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GetProfileResponse } from './interface/get-profile-response.interface';
import { StatusResponse } from './interface/status-response.interface';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginResponse } from './interface/login-response.interface';

const response = { success: true };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  public async joinUser(
    @Body() joinUserDto: JoinUserDto,
  ): Promise<StatusResponse> {
    return await this.authService.joinUser(joinUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async loginUser(@Req() req: any): Promise<LoginResponse> {
    try {
      const { nickname, phone } = req.user;
      const { accessToken } = await this.authService.getJwtAccessToken({
        nickname,
        phone,
      });
      return { accessToken };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/verify')
  public async verifyUser(
    @Body() verifyUserDto: VerifyUserDto,
  ): Promise<StatusResponse> {
    return await this.authService.verifyUser(verifyUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  public async getProfile(@Req() req: any): Promise<GetProfileResponse> {
    return req.user;
  }

  @Delete('/logout')
  public async logoutUser(
    @Res({ passthrough: true }) res,
  ): Promise<StatusResponse> {
    try {
      res.cookie('Authorization', '', { maxAge: 0 });
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return response;
  }
}
