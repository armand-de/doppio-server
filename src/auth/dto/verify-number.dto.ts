import { IsNumberString, Length } from 'class-validator';

export class VerifyNumberDto {
  @Length(6, 6)
  @IsNumberString()
  readonly verifyNumber: string;
}
