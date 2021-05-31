import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf
} from 'class-validator';

export class CreatePostRequestDto {
  @IsNotEmpty()
  @MaxLength(40)
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @ValidateIf((text: string) => text.trim() !== '')
  @IsString()
  readonly contents: string;
}
