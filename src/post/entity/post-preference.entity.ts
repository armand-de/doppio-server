import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Post } from './post.entity';

@Entity('post_preferences')
export class PostPreference {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => User, (user: User) => user.post_preference)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Post, (post: Post) => post.post_preference)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
