import { Recipe } from '../../recipe/entity/recipe.entity';
import { Post } from '../../post/entity/post.entity';
import { RecipeBookmark } from '../../recipe/entity/recipe-bookmark.entity';
import { RecipePreference } from '../../recipe/entity/recipe-preference.entity';
import { PostEvaluation } from '../../post/entity/post-evaluation.entity';
import { Comment } from '../../post/entity/comment.entity';
export declare class User {
    id: string;
    nickname: string;
    password: string;
    phone: string;
    image: string;
    recipes: Recipe[];
    recipe_bookmarks: RecipeBookmark[];
    recipe_preferences: RecipePreference[];
    posts: Post[];
    post_evaluations: PostEvaluation[];
    comments: Comment[];
    createdDate: Date;
    updatedDate: Date;
}
