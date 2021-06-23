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
import { StatusResponse } from '../types/status-response';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entity/recipe.entity';
import { RecipeIncludePreference } from './interface/recipe-include-preference.interface';
import { GetCountResponse } from '../utils/get-count-response.interface';
import { RequestRecipePreferenceDto } from './dto/request-recipe-preference.dto';
import { GetIsExistResponse } from '../utils/get-is-exist-response.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyRecipeList(@Req() req: any): Promise<Recipe[]> {
    const { id } = req.user;
    return await this.recipeService.getMyRecipeList(id);
  }

  @Get()
  async getRecipeList(
    @Query('start', ParseIntPipe) start: number,
    @Query('keyword') keyword?: string,
    @Query('category') category?: number,
  ): Promise<Recipe[]> {
    return await this.recipeService.getRecipeList({ start, keyword, category });
  }

  @Get('count')
  async getCountOfRecipe(): Promise<GetCountResponse> {
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
  ): Promise<StatusResponse> {
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
  ): Promise<StatusResponse> {
    return await this.recipeService.deleteRecipe(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('preference/:id')
  async getMyRecipePreferenceIsExist(
    @Req() req: any,
    @Param('id', ParseIntPipe) recipeId: number,
  ): Promise<GetIsExistResponse> {
    const { id: userId } = req.user;
    return {
      isExist: !!(await this.recipeService.getPreferenceByRecipeIdAndUserId({
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
  ): Promise<StatusResponse> {
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
  ): Promise<StatusResponse> {
    const { id: userId } = req.user;
    return await this.recipeService.deleteRecipePreference({
      recipeId,
      userId,
    });
  }
}
