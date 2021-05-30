import {
  Column,
  CreateDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Post } from './post.entity';

@Entity('post_evaluations')
export class PostEvaluation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('tinyint', { nullable: false })
  method: 1 | -1;

  @ManyToOne((type) => User, (user: User) => user.post_evaluations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Post, (post: Post) => post.post_evaluations)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
