import { IsOptional } from 'class-validator';
import { UserIdDto } from '../../user/dto/user-id.dto';

export class OptionalUserIdDto extends UserIdDto {
  @IsOptional()
  userId: string;
}
