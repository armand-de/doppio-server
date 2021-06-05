import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateRecipeRequestDto {
  @Length(3, 20)
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @Length(1, 100)
  @IsString()
  readonly description: string;

  @IsString()
  readonly ingredients: string;

  @IsString()
  readonly contents: string;

  @IsNumber()
  readonly category: number;

  @IsNumber()
  readonly time: number;

  @IsOptional()
  @IsBoolean()
  readonly useOven: boolean;
}
