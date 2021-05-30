import { IsString, MaxLength, MinLength } from 'class-validator';

export class NicknameDto {
  @MinLength(3)
  @MaxLength(8)
  @IsString()
  readonly nickname: string;
}
