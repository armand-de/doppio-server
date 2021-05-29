import { IsMobilePhone, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3)
  @MaxLength(8)
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
