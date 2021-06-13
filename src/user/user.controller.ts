import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';
import { GetIsExistUserResponse } from './interface/get-is-exist-user-response.interface';
import { StatusResponse } from '../types/status-response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get/:id')
  async getUserById(@Param() params): Promise<User> {
    return await this.userService.getUserById(params.id);
  }

  @Get('/exist/phone/:phone')
  async getIsExistUserByPhone(
    @Param() { phone }: PhoneDto,
  ): Promise<GetIsExistUserResponse> {
    return {
      isExist: await this.userService.getUserIsExistByPhone({ phone }),
    };
  }

  @Get('/exist/nickname/:nickname')
  async getIsExistUserByNickname(
    @Param() { nickname }: NicknameDto,
  ): Promise<GetIsExistUserResponse> {
    return {
      isExist: await this.userService.getUserIsExistByNickname({ nickname }),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async update(
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<StatusResponse> {
    const { id: userId } = req;
    return await this.userService.updateUser({ userId, ...updateUserDto });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async delete(@Req() req: any): Promise<StatusResponse> {
    const { id } = req.user;
    return await this.userService.deleteUser(id);
  }
}
