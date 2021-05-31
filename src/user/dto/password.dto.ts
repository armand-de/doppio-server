import { IsString, Length } from 'class-validator';

export class PasswordDto {
  @Length(7, 30)
  @IsString()
  readonly password: string;
}
