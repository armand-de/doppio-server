import { IsOptional, MaxLength } from 'class-validator';
import { OptionalUserIdDto } from './optional-user-id.dto';

export class UpdateUserDto extends OptionalUserIdDto {
  @IsOptional()
  @MaxLength(200)
  readonly image: string;
}
