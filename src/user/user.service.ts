import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { ReturnUser } from '../auth/interface/return-user.interface';
import bcrypt from 'bcrypt';

const getUserSelectList: (keyof User)[] = ['nickname', 'phone', 'image'];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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

  async findByLogin({ nickname, password }: LoginUserDto): Promise<ReturnUser> {
    const user = await this.getUserByNickname({
      nickname,
      select: ['password', ...getUserSelectList],
    });

    if (
      user &&
      (await this.getIsPasswordEqual({
        input: password,
        password: user.password,
      }))
    ) {
      const { nickname, phone, image } = user;
      return { nickname, phone, image };
    }

    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
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

  private async getIsPasswordEqual({ input, password }) {
    return await bcrypt.compare(input, password);
  }
}
