import { IntersectionType } from '@nestjs/mapped-types';
import { PhoneDto } from '../../user/dto/phone.dto';
import { VerifyNumberDto } from './verify-number.dto';

export class CreateVerifyUserDto extends IntersectionType(
  PhoneDto,
  VerifyNumberDto,
) {}
