import { IsString } from 'class-validator';

export class CreateRecipePreferenceRequestDto {
  @IsString()
  recipeId: string;
}
