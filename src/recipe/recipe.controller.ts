import { Controller, Get, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('/create')
  public async create() {

  }
}
