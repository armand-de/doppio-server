import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { IStatusResponse } from '../types/response';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entity/recipe.entity';
import { RecipeIncludePreference } from './interface/recipe-include-preference.interface';
import { RequestRecipePreferenceDto } from './dto/request-recipe-preference.dto';
import { IExistResponse, ICountResponse } from '../types/response';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(
    @Query('start', ParseIntPipe) start: number,
    @Query('keyword') keyword?: string,
    @Query('category') category?: number,
  ): Promise<Recipe[]> {
    return await this.recipeService.getRecipes({ start, keyword, category });
  }

  @Get('/user-id/:userId')
  async getRecipesByUserId(@Param('userId') userId: string): Promise<Recipe[]> {
    return await this.recipeService.getRecipesByUserId(userId);
  }

  @Get('count')
  async getCountOfRecipe(): Promise<ICountResponse> {
    const count = await this.recipeService.getCountOfRecipe();
    return { count };
  }

  @Get(':id')
  async getRecipeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RecipeIncludePreference> {
    return await this.recipeService.getRecipeById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRecipe(
    @Req() req: any,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<IStatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.createRecipe({
      userId,
      ...createRecipeDto,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteRecipe(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IStatusResponse> {
    return await this.recipeService.deleteRecipe(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preference/:id')
  async getMyRecipePreferenceIsExist(
    @Req() req: any,
    @Param('id', ParseIntPipe) recipeId: number,
  ): Promise<IExistResponse> {
    const { id: userId } = req.user;
    return {
      exist: !!(await this.recipeService.getPreferenceByRecipeIdAndUserId({
        recipeId,
        userId,
      })),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('preference')
  async createRecipePreference(
    @Req() req: any,
    @Body() { recipeId }: RequestRecipePreferenceDto,
  ): Promise<IStatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.createRecipePreference({
      recipeId,
      userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('preference/:id')
  async deleteRecipePreference(
    @Req() req: any,
    @Param('id', ParseIntPipe) recipeId: number,
  ): Promise<IStatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.deleteRecipePreference({
      recipeId,
      userId,
    });
  }
}
