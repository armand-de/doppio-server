import { IntersectionType } from '@nestjs/mapped-types';
import { NicknameDto } from '../../user/dto/nickname.dto';
import { PasswordDto } from '../../user/dto/password.dto';

export class LoginUserDto extends IntersectionType(NicknameDto, PasswordDto) {}
