import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
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
  @IsString()
  readonly contents: string;
}
