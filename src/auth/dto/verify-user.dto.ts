import {
  IsMobilePhone,
  IsNumberString, IsString,
  Length,
  MaxLength,
  MinLength
} from 'class-validator';

export class VerifyUserDto {
  @MinLength(7)
  @MaxLength(15)
  @IsMobilePhone()
  @IsString()
  phone: string;

  @Length(6)
  @IsNumberString()
  verifyNumber: string;
}
