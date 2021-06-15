import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { ReturnUser } from '../auth/interface/return-user.interface';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';
import { USER_GET_SELECT, USER_SELECT } from '../utils/data-select';
import { StatusResponse } from '../types/status-response';
import { SUCCESS_RESPONSE } from '../utils/success-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
  }

  async updateUser({
    userId,
    ...updateUserDto
  }: UpdateUserDto): Promise<StatusResponse> {
    try {
      const user = await this.userRepository.findOne(userId);
      await this.userRepository.save({ ...user, ...updateUserDto });
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async deleteUser(id: string): Promise<StatusResponse> {
    console.log(id);
    try {
      await this.userRepository.delete({ id });
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
    return SUCCESS_RESPONSE;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: USER_SELECT,
    });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: USER_GET_SELECT,
    });
  }

  async getUserByPhone(phoneDto: PhoneDto): Promise<User> {
    return await this.userRepository.findOne({
      where: phoneDto,
      select: USER_SELECT,
    });
  }

  async getUserByNickname({ nickname }: NicknameDto): Promise<User> {
    return await this.userRepository.findOne({
      where: { nickname },
      select: USER_GET_SELECT,
    });
  }

  async findByLogin({
    nickname,
    password: input,
  }: LoginUserDto): Promise<ReturnUser> {
    const user = await this.getUserDataByDynamicData({
      where: { nickname },
      select: ['password', ...USER_SELECT],
    });

    if (
      user &&
      (await UserService.getIsPasswordEqual({
        input,
        password: user.password,
      }))
    ) {
      delete user['password'];
      return user;
    }

    throw new UnauthorizedException();
  }

  async getUserIsExistByPhone(phoneDto: PhoneDto): Promise<boolean> {
    return !!(await this.getUserByPhone(phoneDto));
  }

  async getUserIsExistByNickname(nicknameDto: NicknameDto): Promise<boolean> {
    return !!(await this.getUserByNickname(nicknameDto));
  }

  private static async getIsPasswordEqual({
    input,
    password,
  }: {
    input: string;
    password: string;
  }): Promise<boolean> {
    return await bcrypt.compare(input, password);
  }

  private async getUserDataByDynamicData({
    where,
    select,
  }: {
    where: PhoneDto | NicknameDto | { id: string };
    select: (keyof User)[];
  }): Promise<User> {
    return await this.userRepository.findOne({ where, select });
  }
}
