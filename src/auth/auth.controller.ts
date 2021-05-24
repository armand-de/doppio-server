import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoinUserDto } from './dto/join-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JoinResponse } from './interface/join-response.interface';
import { LoginResponse } from './interface/login-response.interface';
import { VerifyUserDto } from './dto/verify-user.dto';
import { VerifyResponse } from './interface/verify-response.interface';
import { GetMyUserInfoResponse } from './interface/get-my-user-info-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/join')
  public async joinUser(
    @Body() joinUserDto: JoinUserDto,
  ): Promise<JoinResponse> {
    return await this.authService.joinUser(joinUserDto);
  }

  @Post('/login')
  public async loginUser(@Body() body: LoginUserDto): Promise<LoginResponse> {
    return {};
  }

  @Post('/entity')
  public async verifyUser(@Body() body: VerifyUserDto): Promise<VerifyResponse> {
    return {};
  }

  @Post('/re-entity')
  public async ReVerifyUser(@Body() body: VerifyUserDto): Promise<VerifyResponse> {
    return {};
  }

  @Get('/my')
  public async getMyUserInfo(@Req() req: any): Promise<GetMyUserInfoResponse> {
    return {};
  }
}
