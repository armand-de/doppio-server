import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        synchronize: true,
        type: 'mysql',
        charset: 'utf8_general_ci',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
