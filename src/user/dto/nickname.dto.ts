import { IsString, Length } from 'class-validator';

export class NicknameDto {
  @Length(3, 8)
  @IsString()
  readonly nickname: string;
}
