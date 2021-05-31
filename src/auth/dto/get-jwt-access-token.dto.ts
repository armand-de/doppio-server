import { IntersectionType } from '@nestjs/mapped-types';
import { NicknameDto } from '../../user/dto/nickname.dto';
import { PhoneDto } from '../../user/dto/phone.dto';

export class GetJwtAccessTokenDto extends IntersectionType(
  NicknameDto,
  PhoneDto,
) {}
