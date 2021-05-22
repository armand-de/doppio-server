import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigModule } from './database-config.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `env/${process.env.NODE_ENV === 'test' ? 'test' : 'dev'}.env`,
      ],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
