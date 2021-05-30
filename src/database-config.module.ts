import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Post } from './post/entity/post.entity';
import { Comment } from './post/entity/comment.entity';
import { Recipe } from './recipe/entity/recipe.entity';
import { RecipePreference } from './recipe/entity/recipe-preference.entity';
import { RecipeBookmark } from './recipe/entity/recipe-bookmark.entity';
import { PostEvaluation } from './post/entity/post-evaluation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        port: parseInt(config.get('DB_PORT')),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        host: config.get<string>('DB_HOST'),
        autoLoadEntities: true,
        entities: [
          User,
          Post,
          Comment,
          Recipe,
          RecipePreference,
          RecipeBookmark,
          PostEvaluation,
        ],
        synchronize: true,
        type: 'mysql',
        charset: 'utf8_general_ci',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
