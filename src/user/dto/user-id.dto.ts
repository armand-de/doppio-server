import { IsString, IsUUID } from 'class-validator';

export class UserIdDto {
  @IsString()
  @IsUUID()
  readonly userId: string;
}
