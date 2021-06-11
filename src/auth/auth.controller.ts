import {
  HttpException,
  HttpStatus,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinUserDto } from './dto/join-user.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GetProfileResponse } from './interface/get-profile-response.interface';
import { StatusResponse } from '../types/status-response';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LoginResponse } from './interface/login-response.interface';
import { SUCCESS_RESPONSE } from '../utils/success-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async authorization(): Promise<StatusResponse> {
    return SUCCESS_RESPONSE;
  }

  @Post('/join')
  async joinUser(@Body() joinUserDto: JoinUserDto): Promise<StatusResponse> {
    return await this.authService.joinUser(joinUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async loginUser(@Req() req: any): Promise<LoginResponse> {
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
}
