import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entity/recipe.entity';
import { RecipePreference } from './entity/recipe-preference.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipePreference, User])],
  controllers: [RecipeController],
  providers: [RecipeService, UserService],
})
export class RecipeModule {}
