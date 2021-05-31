import { IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { VerifyNumberDto } from './verify-number.dto';

export class VerifyUserDto extends IntersectionType(
  CreateUserDto,
  VerifyNumberDto,
) {}
