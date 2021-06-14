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
import { Comment } from '../../comment/entity/comment.entity';
import { PostPreference } from './post-preference.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40, nullable: false })
  title: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('text', { nullable: false })
  contents: string;

  @OneToMany((type) => Comment, (comment: Comment) => comment.post, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(
    (type) => PostPreference,
    (post_preference: PostPreference) => post_preference.post,
    {
      cascade: true,
    },
  )
  post_preference: PostPreference[];

  @ManyToOne((type) => User, (user: User) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn({ name: 'created_at', nullable: false })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  updatedDate: Date;
}
