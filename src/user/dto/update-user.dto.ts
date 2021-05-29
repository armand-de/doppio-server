import {
  IsMobilePhone,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsUUID()
  readonly id: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(8)
  @IsString()
  readonly nickname: string;

  @IsOptional()
  @MinLength(7)
  @MaxLength(30)
  @IsString()
  readonly password: string;

  @IsOptional()
  @MinLength(7)
  @MaxLength(15)
  @IsMobilePhone()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @MaxLength(200)
  @IsUrl()
  readonly image: string;
}
