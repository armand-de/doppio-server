import { Recipe } from '../entity/recipe.entity';

export interface RecipeIncludePreferenceCount extends Recipe {
  preference?: number;
}
