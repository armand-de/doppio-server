import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ReturnUser } from '../interface/return-user.interface';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'nickname',
      passwordField: 'password',
    });
  }

  async validate(
    nickname: string,
    password: string,
    done: CallableFunction,
  ): Promise<ReturnUser> {
    const loginUserDto: LoginUserDto = { nickname, password };
    const user = await this.userService.findByLogin(loginUserDto);
    return done(null, user);
  }
}
