import { IsMobilePhone, IsString, MaxLength, MinLength } from 'class-validator';

export class JoinUserDto {
  @MinLength(3)
  @MaxLength(7)
  @IsString()
  readonly nickname: string;

  @MinLength(7)
  @MaxLength(30)
  @IsString()
  readonly password: string;

  @MinLength(7)
  @MaxLength(15)
  @IsMobilePhone()
  @IsString()
  readonly phone: string;
}
