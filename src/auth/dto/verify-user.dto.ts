import {
  IsMobilePhone,
  IsNumberString, IsString,
  Length,
  MaxLength,
  MinLength
} from 'class-validator';

export class VerifyUserDto {
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

  @Length(6)
  @IsNumberString()
  readonly verifyNumber: string;
}
