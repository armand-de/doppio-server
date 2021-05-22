import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

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
}
