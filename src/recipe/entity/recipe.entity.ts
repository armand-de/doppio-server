import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { RecipeBookmark } from './recipe-bookmark.entity';
import { RecipePreference } from './recipe-preference.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string', { length: 30, nullable: false })
  title: string;

  @Column('string', { length: 60 })
  description: string;

  @Column('text', { nullable: false })
  contents: string;

  @Column('tinyint', { nullable: false })
  category: number;

  @Column('unsigned big int', { nullable: false })
  time: number;

  @ManyToOne((type) => User, (user: User) => user.recipes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(
    (type) => RecipeBookmark,
    (recipe_bookmark: RecipeBookmark) => recipe_bookmark.recipe,
  )
  recipe_bookmarks: RecipeBookmark[];

  @OneToMany(
    (type) => RecipePreference,
    (recipe_preference: RecipePreference) => recipe_preference.recipe,
  )
  recipe_preferences: RecipePreference[];

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
