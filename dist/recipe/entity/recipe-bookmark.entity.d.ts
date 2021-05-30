import { User } from '../../user/entity/user.entity';
import { Recipe } from './recipe.entity';
export declare class RecipeBookmark {
    id: string;
    user: User;
    recipe: Recipe;
    createdDate: Date;
    updatedDate: Date;
}
