import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { OptionalUserIdDto } from './optional-user-id.dto';

export class UpdateUserDto extends OptionalUserIdDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(8)
  @IsString()
  readonly nickname: string;

  @IsOptional()
  @MaxLength(200)
  readonly image: string;
}
