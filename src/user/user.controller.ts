import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { GetCheckOverlapDataOfUserResponse } from './interface/get-check-overlap-data-of-user-response.interface';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  public async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/get/:id')
  public async getUserById(@Param() params): Promise<User> {
    return await this.userService.getUserById(params.id);
  }

  @Get('/check-overlap/phone/:phone')
  public async getCheckOverlapDataOfUserByPhone(
    @Param() phoneDto: PhoneDto,
  ): Promise<GetCheckOverlapDataOfUserResponse> {
    return await this.userService.getCheckOverlapDataOfUserByDynamicData(
      PhoneDto,
    );
  }

  @Get('/check-overlap/nickname/:nickname')
  public async getCheckOverlapDataOfUserByNickname(
    @Param() nicknameDto: NicknameDto,
  ): Promise<GetCheckOverlapDataOfUserResponse> {
    return await this.userService.getCheckOverlapDataOfUserByDynamicData(
      nicknameDto,
    );
  }
}
