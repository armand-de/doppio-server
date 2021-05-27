import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { ReturnUser } from '../auth/interface/return-user.interface';
import bcrypt from 'bcrypt';
import { GetCheckOverlapDataOfUserResponse } from './interface/get-check-overlap-data-of-user-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const getUserSelectList: (keyof User)[] = ['nickname', 'phone', 'image'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<void> {
    const { id } = updateUserDto;
    await this.userRepository.update({ id }, updateUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: getUserSelectList,
    });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: getUserSelectList,
    });
  }

  async findByLogin({
    nickname,
    password: input,
  }: LoginUserDto): Promise<ReturnUser> {
    const user = await this.getUserByNickname({
      nickname,
      select: ['password', ...getUserSelectList],
    });

    if (
      user &&
      (await this.getIsPasswordEqual({
        input,
        password: user.password,
      }))
    ) {
      delete user['password'];
      return user;
    }

    throw new UnauthorizedException();
  }

  private async getUserByNickname({
    nickname,
    select,
  }: {
    nickname: string;
    select: (keyof User)[];
  }): Promise<User> {
    return await this.userRepository.findOne({
      where: { nickname },
      select,
    });
  }

  private async getIsPasswordEqual({
    input,
    password,
  }: {
    input: string;
    password: string;
  }): Promise<boolean> {
    return await bcrypt.compare(input, password);
  }

  private async getUserDataByDynamicData(dynamicDto: any): Promise<User> {
    return await this.userRepository.findOne({
      where: dynamicDto,
      select: getUserSelectList,
    });
  }

  async getCheckOverlapDataOfUserByDynamicData(
    dynamicDto: any,
  ): Promise<GetCheckOverlapDataOfUserResponse> {
    return {
      isExist: !!(await this.userRepository.findOne({
        where: dynamicDto,
        select: ['id'],
      })),
    };
  }
}
