import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @MinLength(3)
  @MaxLength(8)
  @IsString()
  readonly nickname: string;

  @MinLength(7)
  @MaxLength(30)
  @IsString()
  readonly password: string;
}
