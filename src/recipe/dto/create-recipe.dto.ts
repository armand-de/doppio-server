import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRecipeDto {
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  readonly name: string;

  @IsOptional()
  @MaxLength(200)
  @IsString()
  readonly image: string;

  @IsOptional()
  @MaxLength(30)
  @IsString()
  readonly description: string;

  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly category: number;

  @IsNumber()
  readonly time: number;
}
