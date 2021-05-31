import { IsMobilePhone, IsString, Length } from 'class-validator';

export class PhoneDto {
  @Length(7, 15)
  @IsMobilePhone()
  @IsString()
  readonly phone: string;
}
