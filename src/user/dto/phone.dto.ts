import { IsMobilePhone, IsString, MaxLength, MinLength } from 'class-validator';

export class PhoneDto {
  @MinLength(3)
  @MaxLength(15)
  @IsMobilePhone()
  @IsString()
  readonly phone: string;
};
