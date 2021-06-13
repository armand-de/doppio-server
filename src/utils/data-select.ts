import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { Post } from '../post/entity/post.entity';
import { Comment } from '../comment/entity/comment.entity';

export const USER_GET_SELECT: (keyof User)[] = ['nickname', 'image', 'id'];
export const USER_SELECT: (keyof User)[] = [...USER_GET_SELECT, 'phone'];

export const RECIPE_LIST_SELECT: (keyof Recipe)[] = [
  'id',
  'name',
  'time',
  'useOven',
  'category',
  'thumbnail',
];

export const RECIPE_GET_SELECT: (keyof Recipe)[] = [
  'id',
  'name',
  'time',
  'thumbnail',
  'useOven',
  'description',
  'image',
  'ingredients',
  'contents',
  'category',
  'createdDate',
];

export const POST_LIST_SELECT: (keyof Post)[] = [
  'id',
  'title',
  'image',
  'createdDate',
  'user',
];

export const POST_GET_SELECT: (keyof Post)[] = [
  'id',
  'title',
  'image',
  'user',
  'contents',
  'createdDate',
];

export const COMMENT_SELECT: (keyof Comment)[] = [
  'id',
  'user',
  'contents',
  'createdDate',
];
