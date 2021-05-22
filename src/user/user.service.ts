import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

const getUserSelectList: (keyof User)[] = ['nickname', 'phone'];

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
}
