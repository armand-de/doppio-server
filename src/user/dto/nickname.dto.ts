import { IsString, MaxLength, MinLength } from 'class-validator';

export class NicknameDto {
  @MinLength(3)
  @MaxLength(7)
  @IsString()
  readonly nickname: string;
}
