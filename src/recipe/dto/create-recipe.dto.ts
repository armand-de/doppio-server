import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { OptionalUserIdDto } from './optional-user-id.dto';

export class CreateRecipeDto extends OptionalUserIdDto {
  @IsOptional()
  userId: string;

  @Length(3, 20)
  @IsString()
  readonly name: string;

  @MaxLength(200)
  @IsOptional()
  @IsString()
  readonly thumbnail: string;

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
