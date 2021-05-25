import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinUserDto } from './dto/join-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponse } from './interface/login-response.interface';
import { VerifyUserDto } from './dto/verify-user.dto';
import { GetMyUserInfoResponse } from './interface/get-my-user-info-response.interface';
import { StatusResponse } from './interface/status-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  public async joinUser(
    @Body() joinUserDto: JoinUserDto,
  ): Promise<StatusResponse> {
    return await this.authService.joinUser(joinUserDto);
  }

  @Post('/login')
  public async loginUser(@Body() body: LoginUserDto): Promise<LoginResponse> {
    return {};
  }

  @Post('/verify')
  public async verifyUser(
    @Body() body: VerifyUserDto,
  ): Promise<StatusResponse> {
    return {};
  }

  @Post('/re-verify')
  public async ReVerifyUser(
    @Body() body: VerifyUserDto,
  ): Promise<StatusResponse> {
    return {};
  }

  @Get('/my-info')
  public async getMyUserInfo(@Req() req: any): Promise<GetMyUserInfoResponse> {
    return {};
  }

  @Post('/logout')
  public async logoutUser(): Promise<StatusResponse> {
    return {};
  }
}
