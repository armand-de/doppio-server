import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

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

  @Column('bigint', { nullable: false })
  time: number;

  @ManyToOne((type) => User, (users: User) => users.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
