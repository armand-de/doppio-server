import { IsString, Length } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { PhoneDto } from './phone.dto';
import { NicknameDto } from './nickname.dto';

export class CreateUserDto extends IntersectionType(NicknameDto, PhoneDto) {
  @Length(7, 30)
  @IsString()
  readonly password: string;
}
