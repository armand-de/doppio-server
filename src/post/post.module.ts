import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entity/post.entity';
import { User } from '../user/entity/user.entity';
import { PostPreference } from './entity/post-preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostPreference])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
