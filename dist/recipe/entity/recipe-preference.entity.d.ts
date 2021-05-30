import { User } from '../../user/entity/user.entity';
import { Recipe } from './recipe.entity';
export declare class RecipePreference {
    id: string;
    recipe: Recipe;
    user: User;
    createdDate: Date;
    updatedDate: Date;
}
