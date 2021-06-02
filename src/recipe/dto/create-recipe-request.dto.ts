import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength
} from 'class-validator';

export class CreateRecipeRequestDto {
  @Length(3, 20)
  @IsString()
  readonly name: string;

  @IsOptional()
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

  @IsOptional()
  @IsBoolean()
  readonly useOven: boolean;
}
