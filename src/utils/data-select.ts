import { User } from '../user/entity/user.entity';
import { Recipe } from '../recipe/entity/recipe.entity';
import { Post } from '../post/entity/post.entity';

export const USER_SELECT: (keyof User)[] = ['nickname', 'phone', 'image', 'id'];

export const RECIPE_LIST_SELECT: (keyof Recipe)[] = [
  'id',
  'name',
  'time',
  'useOven',
  'category',
  'image',
  'thumbnail',
];

export const RECIPE_GET_SELECT: (keyof Recipe)[] = [
  'id',
  'name',
  'time',
  'thumbnail',
  'user',
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
];

export const POST_GET_SELECT: (keyof Post)[] = [
  'id',
  'title',
  'image',
  'contents',
  'createdDate',
];
