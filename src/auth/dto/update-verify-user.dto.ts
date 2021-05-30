import { IsNumberString, IsString, Length } from 'class-validator';

export class UpdateVerifyUserDto {
  @IsString()
  readonly id: string;

  @Length(6)
  @IsNumberString()
  readonly verifyNumber: string;
};
