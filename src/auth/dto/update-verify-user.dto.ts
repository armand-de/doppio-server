import { IsString, IsUUID } from 'class-validator';
import { VerifyNumberDto } from './verify-number.dto';

export class UpdateVerifyUserDto extends VerifyNumberDto {
  @IsString()
  @IsUUID()
  readonly id: string;
};
