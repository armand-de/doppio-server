import { User } from '../../user/entity/user.entity';
import { RecipeBookmark } from './recipe-bookmark.entity';
import { RecipePreference } from './recipe-preference.entity';
export declare class Recipe {
    id: string;
    name: string;
    image: string;
    description: string;
    contents: string;
    category: number;
    time: number;
    user: User;
    recipe_bookmarks: RecipeBookmark[];
    recipe_preferences: RecipePreference[];
    createdDate: Date;
    updatedDate: Date;
}
