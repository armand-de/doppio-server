import {
  IsMobilePhone,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateVerifyUserDto {
  @MinLength(7)
  @MaxLength(15)
  @IsMobilePhone()
  @IsString()
  readonly phone: string;

  @Length(6)
  @IsNumberString()
  readonly verifyNumber: string;
}
