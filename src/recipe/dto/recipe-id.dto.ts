import { IsNumberString } from 'class-validator';

export class RecipeIdDto {
  @IsNumberString()
  recipeId: number;
}
