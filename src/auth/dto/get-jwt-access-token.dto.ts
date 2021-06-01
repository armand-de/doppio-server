import { IsString, IsUUID } from 'class-validator';
import { PhoneDto } from '../../user/dto/phone.dto';

export class GetJwtAccessTokenDto extends PhoneDto {
  @IsString()
  @IsUUID()
  readonly id: string;
}
