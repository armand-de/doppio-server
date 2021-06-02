import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { StatusResponse } from '../types/status-response';
import { CreateRecipeRequestDto } from './dto/create-recipe-request.dto';
import { Recipe } from './entity/recipe.entity';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('/list/:step')
  async getRecipeList(
    @Param('step', ParseIntPipe) step: number,
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipeList(step);
  }

  @Get('/get/id/:id')
  async getRecipeById(@Param('id') id: string): Promise<Recipe> {
    return this.recipeService.getRecipeById(id);
  }

  @Get('/get/id/:id/user')
  async getRecipeIncludeUserById(@Param('id') id: string): Promise<Recipe> {
    return await this.recipeService.getRecipeIncludeUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createRecipe(
    @Req() req: any,
    @Body() createRecipeRequestDto: CreateRecipeRequestDto,
  ): Promise<StatusResponse> {
    const { id } = req.user;
    return this.recipeService.createRecipe({
      userId: id,
      ...createRecipeRequestDto,
    });
  }
}
