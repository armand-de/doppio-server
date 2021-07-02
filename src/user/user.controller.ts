import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';
import { IExistResponse, IStatusResponse } from '../types/response';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyUser(@Req() req: any): Promise<User> {
    return req.user;
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return await this.userService.getUserById(userId);
  }

  @Get('/exist/phone/:phone')
  async getIsExistUserByPhone(
    @Param() { phone }: PhoneDto,
  ): Promise<IExistResponse> {
    return {
      exist: !!(await this.userService.getUserByPhone(phone)),
    };
  }

  @Get('/exist/nickname/:nickname')
  async getIsExistUserByNickname(
    @Param() { nickname }: NicknameDto,
  ): Promise<IExistResponse> {
    return {
      exist: !!(await this.userService.getUserByNickname(nickname)),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IStatusResponse> {
    const { id: userId } = req;
    return await this.userService.updateUser({ userId, ...updateUserDto });
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Req() req: any): Promise<IStatusResponse> {
    const { id } = req.user;
    return await this.userService.deleteUser(id);
  }
}
