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
import { RecipePreference } from '../../recipe/entity/recipe-preference.entity';
import { PostPreference } from '../../post/entity/post-preference.entity';
import { Comment } from '../../comment/entity/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 8, unique: true, nullable: false })
  nickname: string;

  @Column({ length: 150, nullable: false, select: false })
  password: string;

  @Column({ length: 15, nullable: false, unique: true, select: false })
  phone: string;

  @Column({
    length: 200,
    nullable: true,
  })
  image: string;

  @OneToMany((type) => Recipe, (recipe: Recipe) => recipe.user, {
    cascade: true,
  })
  recipes: Recipe[];

  @OneToMany(
    (type) => RecipePreference,
    (recipe_preference: RecipePreference) => recipe_preference.user,
    {
      cascade: true,
    },
  )
  recipe_preferences: RecipePreference[];

  @OneToMany((type) => Post, (post: Post) => post.user, {
    cascade: true,
  })
  posts: Post[];

  @OneToMany(
    (type) => PostPreference,
    (post_preference: PostPreference) => post_preference.user,
    {
      cascade: true,
    },
  )
  post_preference: PostPreference[];

  @OneToMany((type) => Comment, (comment: Comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at', nullable: false, select: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false, select: false })
  updatedDate: Date;
}
