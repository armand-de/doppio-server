import { IsString, IsUUID } from 'class-validator';

export class RecipeIdDto {
  @IsString()
  @IsUUID()
  recipeId: string;
}
