import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Recipe } from '../../recipe/entity/recipe.entity';
import { Post } from '../../post/entity/post.entity';
import { RecipeBookmark } from '../../recipe/entity/recipe-bookmark.entity';
import { RecipePreference } from '../../recipe/entity/recipe-preference.entity';
import { PostEvaluation } from '../../post/entity/post-evaluation.entity';
import { Comment } from '../../post/entity/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 8, unique: true, nullable: false })
  nickname: string;

  @Column({ length: 150, nullable: false })
  password: string;

  @Column({ length: 15, nullable: false, unique: true })
  phone: string;

  @Column({
    length: 200,
    nullable: true,
    default:
      'https://cdn.pixabay.com/photo/2014/11/27/12/24/coffee-547490_960_720.png',
  })
  image: string;

  @OneToMany(
    (type) => RecipeBookmark,
    (recipe_bookmark: RecipeBookmark) => recipe_bookmark.user,
  )
  recipe_bookmarks: RecipeBookmark[];

  @OneToMany((type) => Recipe, (recipe: Recipe) => recipe.user)
  recipes: Recipe[];

  @OneToMany(
    (type) => RecipePreference,
    (recipe_preference: RecipePreference) => recipe_preference.user,
  )
  recipe_preferences: RecipePreference[];

  @OneToMany((type) => Post, (post: Post) => post.user)
  posts: Post[];

  @OneToMany(
    (type) => PostEvaluation,
    (post_evaluation: PostEvaluation) => post_evaluation.user,
  )
  post_evaluations: PostEvaluation[];

  @OneToMany((type) => Comment, (comment: Comment) => comment.user)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
