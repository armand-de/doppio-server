import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigModule } from './database-config.module';
import { ConfigModule } from '@nestjs/config';
import { RecipeModule } from './recipe/recipe.module';
import { PostModule } from './post/post.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    MorganModule,
    UserModule,
    AuthModule,
    DatabaseConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `env/${
          process.env.NODE_ENV === 'production'
            ? 'prod'
            : process.env.NODE_ENV === 'test'
            ? 'test'
            : 'dev'
        }.env`,
      ],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    RecipeModule,
    PostModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
  ],
})
export class AppModule {}
