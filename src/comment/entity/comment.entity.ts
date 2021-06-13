import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../../post/entity/post.entity';
import { User } from '../../user/entity/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 200, nullable: false })
  contents: string;

  @ManyToOne((type) => User, (user: User) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne((type) => Post, (post: Post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
