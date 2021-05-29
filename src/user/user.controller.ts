import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/get/:id')
  async getUserById(@Param() params): Promise<User> {
    return await this.userService.getUserById(params.id);
  }

  @Get('/exist/phone/:phone')
  async getIsExistUserByPhone(@Param() { phone }: PhoneDto): Promise<boolean> {
    return await this.userService.getUserIsExistByPhone({ phone });
  }

  @Get('/exist/nickname/:nickname')
  async getIsExistUserByNickname(
    @Param() { nickname }: NicknameDto,
  ): Promise<boolean> {
    return await this.userService.getUserIsExistByNickname({ nickname });
  }
}
