import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verify } from './entity/verify.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verify])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
