import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Comment } from './comment.entity';
import { PostEvaluation } from './post-evaluation.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, nullable: false })
  title: string;

  @Column('text', { nullable: false })
  contents: string;

  @OneToMany((type) => Comment, (comment: Comment) => comment.post)
  comments: Comment[];

  @OneToMany(
    (type) => PostEvaluation,
    (post_evaluation: PostEvaluation) => post_evaluation.post,
  )
  post_evaluations: PostEvaluation[];

  @ManyToOne((type) => User, (user: User) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
