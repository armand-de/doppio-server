import { Recipe } from '../entity/recipe.entity';

export interface RecipeIncludePreference extends Recipe {
  preference?: number;
}
