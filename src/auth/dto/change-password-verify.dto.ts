import { IntersectionType } from '@nestjs/mapped-types';
import { PhoneDto } from '../../user/dto/phone.dto';
import { VerifyNumberDto } from './verify-number.dto';
import { PasswordDto } from '../../user/dto/password.dto';

export class ChangePasswordVerifyDto extends IntersectionType(
  PhoneDto,
  IntersectionType(VerifyNumberDto, PasswordDto),
) {}
