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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PhoneDto } from './dto/phone.dto';
import { NicknameDto } from './dto/nickname.dto';

const USER_SELECT: (keyof User)[] = ['nickname', 'phone', 'image', 'id'];

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
      select: USER_SELECT,
    });
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      select: USER_SELECT,
    });
  }

  async getUserByPhone(phoneDto: PhoneDto): Promise<User> {
    return await this.userRepository.findOne({
      where: phoneDto,
      select: USER_SELECT,
    });
  }

  async getUserByNickname({ nickname }: NicknameDto): Promise<User> {
    return await this.userRepository.findOne({ nickname });
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

  async getUserIsExistByPhone(phoneDto: PhoneDto): Promise<boolean> {
    return !!(await this.getUserByPhone(phoneDto));
  }

  async getUserIsExistByNickname(nicknameDto: NicknameDto): Promise<boolean> {
    return !!(await this.getUserByNickname(nicknameDto));
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
