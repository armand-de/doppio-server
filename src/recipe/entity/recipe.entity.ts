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
import { RecipePreference } from './recipe-preference.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  image: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column('text', { nullable: false })
  ingredients: string;

  @Column('text', { nullable: false })
  contents: string;

  @Column('tinyint', { nullable: false })
  category: number;

  @Column('boolean', { nullable: false, default: false })
  useOven: boolean;

  @Column('int', { nullable: false })
  time: number;

  @ManyToOne((type) => User, (user: User) => user.recipes)
  @JoinColumn({ name: 'userId' })
  user: User;

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
