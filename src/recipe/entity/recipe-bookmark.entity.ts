import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Recipe } from './recipe.entity';

@Entity('recipe_bookmarks')
export class RecipeBookmark {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user: User) => user.recipe_bookmarks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Recipe, (recipe: Recipe) => recipe.recipe_bookmarks)
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipe;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
