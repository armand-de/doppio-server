import { IsString } from 'class-validator';

export class DeleteRecipeRequestDto {
  @IsString()
  recipeId: string;
}
